import { Button, Input, Heading, Text, Textarea, FilterChip } from 'rds-ui-system';
import { SyntheticEvent, useState } from 'react';
import PlannerMap from '@/components/MapGoogle/PlannerMap';
import Autocomplete from "react-google-autocomplete";
import Image from 'next/image'
import useObjetcsStore from '@/stores/objectsStore';
import { convertToNormalDate } from '@/util/goodies';
import { mutate } from 'swr';
import { useAppContext } from '@/context/appContext';

interface Props {
    setOpenModaEditBooking: (value: boolean) => void;
    formData: any;
    currentPlanDate: string
    currentBookingDate: string
}

interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
}

export default function BookingEdit({ setOpenModaEditBooking, formData, currentBookingDate }: Props) {
    const { objectsData: { objectStatus, objectCars, objectModel, objectCats }, } = useObjetcsStore();
    const { currentTenant } = useAppContext();
    const [buttonLabelSave, setButtonLabelSave] = useState('Speichern');
    const [buttonlabelDelete, setButtonLabelDelete] = useState('Löschen');
    const [openDeleteBooking, setOpenDeleteBooking] = useState(false);
    const [editedData, setEditedData] = useState<any>({
        name: formData.name,
        capacity: formData.capacity,
        id: formData.id,
        location: {
            latitude: formData.location.latitude,
            longitude: formData.location.longitude
        },
        locationAddress: {
            street: formData.street,
            number: formData.number,
            postCode: formData.postCode,
            locality: formData.locality,
            place: formData.place,
            region: formData.region,
            country: formData.country,
        }
    });

    const [validationErrors, setValidationErrors] = useState<{
        streetNumber: boolean;
        route: boolean;
        locality: boolean;
        postalCode: boolean;
    }>({
        streetNumber: false,
        route: false,
        locality: false,
        postalCode: false,
    });

    const [addressComponents, setAddressComponents] = useState<Record<string, string>>({});
    const [lat, setLat] = useState(formData.location.latitude);
    const [lng, setLng] = useState(formData.location.longitude);

    const handlePlaceChange = (place: google.maps.places.PlaceResult) => {
        const componentMap: Record<string, string> = {};
        const newLat = place.geometry?.location?.lat() ?? '';
        const newLng = place.geometry?.location?.lng() ?? '';

        setLat(newLat);
        setLng(newLng);

        place.address_components?.forEach((component: AddressComponent) => {
            component.types.forEach((type: string) => {
                if (['street_number', 'route', 'locality', 'postal_code'].includes(type)) {
                    componentMap[type] = component.long_name;
                }
            });
        });

        setAddressComponents(componentMap);
        setValidationErrors({
            streetNumber: !componentMap['street_number'],
            route: !componentMap['route'],
            locality: !componentMap['locality'],
            postalCode: !componentMap['postal_code'],
        });
    };

    const handleSave = async (event: SyntheticEvent) => {
        event.preventDefault();
        const updatedData = {
            //...editedData,
            id: formData.id,
            imageId: formData.imageId,
            objectStatusIds: formData.objectStatusIds,
            objectModelId: formData.objectModelId,
            objectCategoryId: formData.objectCategoryId,
            carId: formData.carId,
            location: {
                latitude: Number(formData.location.latitude),
                longitude: Number(formData.location.longitude),
            },
            timestamp: formData.timestamp,
            priority: formData.priority,
            locationAddress: {
                street: addressComponents['route'] || formData.locationAddress.street,
                number: addressComponents['street_number'] || formData.locationAddress.number,
                postCode: addressComponents['postal_code'] || formData.locationAddress.postCode,
                locality: formData.locationAddress.locality,
                place: addressComponents['locality'] || formData.locationAddress.place,
                region: formData.locationAddress.region,
                country: formData.locationAddress.country,
            }
        };
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const res = await fetch(`/api/booking/${formData.id}?tenantId=${currentTenant}`, {
                method: 'PUT', headers,
                body: JSON.stringify(updatedData),
            });
            if (res.ok) {
                mutate(`/api/booking?day=${currentBookingDate}&tenantid=${currentTenant}`)
                setButtonLabelDelete('Gelöscht!');
                setTimeout(() => {
                    setOpenModaEditBooking(false)
                }, 1500);
            } else {
                setButtonLabelDelete('Error');
                throw new Error('Failed to delete');
            }
            setButtonLabelSave('Gespeichert!');
        } catch (error) {
            console.error('Error updating item name:', error);
            setButtonLabelSave('Error');
        }
    };

    const handleDelete = async (event: SyntheticEvent) => {
        event.preventDefault();
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const res = await fetch(`/api/booking/${formData.id}?tenantId=${currentTenant}`, {
                method: 'DELETE', headers,
            });
            if (res.ok) {
                mutate(`/api/booking?day=${currentBookingDate}&tenantid=${currentTenant}`)
                setButtonLabelDelete('Gelöscht!');
                setTimeout(() => {
                    setOpenModaEditBooking(false)
                }, 1500);
            } else {
                setButtonLabelDelete('Error');
                throw new Error('Failed to delete');
            }
        } catch (error) {
            console.error('Error updating item name:', error);
            setButtonLabelDelete('Error');
        }
    }

    const isValidUrl = formData.imageUrl?.startsWith('http://') || formData.imageUrl?.startsWith('https://');

    const convertedCreatedDate = convertToNormalDate(formData.timestamp);
    const convertedUpdatedDate = convertToNormalDate(formData.lastModified);

    const filteredObjectStatus = Array.isArray(formData.objectStatusIds)
        ? objectStatus.filter((obj: any) => formData.objectStatusIds.includes(obj.id))
        : [];
    const objectStatusNames = filteredObjectStatus.map((obj: any) => obj.name).join(', ');

    const correctObjectModel = objectModel.find((model: any) => model.id === formData.objectModelId);
    const correctObjectCat = objectCats.find((cat: any) => cat.id === formData.objectCategoryId)

    return (
        <>
            <form
                onSubmit={handleSave}
                className={`w-full space-y-4 transition-opacity duration-100
                    ${openDeleteBooking ? 'opacity-0' : 'opacity-100'}`
                }>
                <Heading variant='h2'>Auftrag bearbeiten</Heading>
                <div className='flex space-x-2'>
                    <div className="flex border rounded overflow-hidden w-1/2 h-[10em] md:h-[15em] bg-brand-grey-light">
                        {isValidUrl ? (
                            <Image
                                src={formData.imageUrl}
                                width={500}
                                height={500}
                                alt="Picture of the author"
                                style={{ objectFit: 'contain' }}
                            />
                        ) : (
                            <Text
                                customClasses='p-2'
                            >
                                Invalid image URL, should start with https://
                            </Text>
                        )}
                    </div>
                    <div className="flex border rounded overflow-hidden w-1/2 h-[10em] md:h-[15em]">
                        <PlannerMap
                            bookingData={formData && formData}
                            lat={formData && formData.location.latitude}
                            lng={formData && formData.location.longitude}
                        />
                    </div>
                </div>
                <div className='flex flex-col space-y-2'>
                    <div className='h-full space-y-4'>
                        <div className='flex'>
                            {/* <Input
                                id='name'
                                label="Name"
                                placeholder={formData ? correctObjectCat?.name : 'Nicht eingegeben'}
                                value={formData.name || ''}
                                onChange={(e) =>
                                    setEditedData({
                                        ...editedData,
                                        name: e.target.value,
                                    })
                                }
                            /> */}
                            <Heading variant='h2'>{formData ? correctObjectCat?.name : 'Nicht eingegeben'}</Heading>
                        </div>
                        <div className='flex space-x-2'>
                            <div className='w-1/2'>
                                {/* <Input
                                    id='createdDate'
                                    label='Aufnahmedatum'
                                    placeholder={formData.createdAt && convertedCreatedDate}
                                    value={formData.createdAt && convertedCreatedDate || ''}
                                    onChange={(e) =>
                                        setEditedData({
                                            ...editedData,
                                            createdAt: e.target.value,
                                        })
                                    }
                                /> */}
                                <Text bold>Erstellt am</Text>
                                <Text>{formData.timestamp && convertedCreatedDate}</Text>
                            </div>
                            <div className='w-1/2'>
                                {/* <Input
                                    id='updatedDate'
                                    label='Änderungsdatum'
                                    placeholder={formData.createdAt && convertedUpdatedDate}
                                    value={formData.createdAt && convertedUpdatedDate || ''}
                                    onChange={(e) =>
                                        setEditedData({
                                            ...editedData,
                                            updatedAt: e.target.value,
                                        })
                                    }
                                /> */}
                                <Text bold>Aktualisiert am</Text>
                                <Text>{formData.lastModified && convertedUpdatedDate}</Text>
                            </div>
                        </div>
                        <div className='flex space-x-2'>
                            <div className='w-1/2'>
                                {/* <Input
                                    id='model'
                                    label='Model'
                                    placeholder={formData && formData.objectModel}
                                    value={formData.objectModel || ''}
                                    onChange={(e) =>
                                        setEditedData({
                                            ...editedData,
                                            objectModel: e.target.value,
                                        })
                                    }
                                /> */}
                                <Text bold>Model</Text>
                                <Text>{correctObjectModel?.name}</Text>
                            </div>
                            <div className='w-1/2'>
                                {/* <Input
                                    id='status'
                                    label='Status'
                                    placeholder={formData && formData.objectStatus}
                                    value={formData.objectStatus || ''}
                                    onChange={(e) =>
                                        setEditedData({
                                            ...editedData,
                                            objectStatus: e.target.value,
                                        })
                                    }
                                /> */}
                                <Text bold>Status</Text>
                                {/* <Text>{objectStatusNames}</Text> */}
                                <div className="[&>*]:mr-2 [&>*]:mb-2 [&>*]:space-y-2">
                                    {filteredObjectStatus.map((chip: any, i: any) => {

                                        return (
                                            <div
                                                key={i}
                                                //onClick={() => handleFilterStatusRemove(selectedStatusId)}
                                                className="inline-block">
                                                {/* <FilterChip label={chip?.name} /> */}
                                                <button
                                                    className="justify-start items-start h-8 overflow-hidden rounded-lg bg-[#d8e6f2] hover:bg-[#c2d6e7] 
                                                            transition-colors duration-300 w-auto inline-block undefined">
                                                    <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2 pl-3 pr-2 py-1.5">
                                                        <p className="flex-grow-0 flex-shrink-0 text-sm font-medium text-center text-black">{chip?.name}</p>
                                                    </div>
                                                </button>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        {/* <Textarea
                            id='comment'
                            label='Kommentar'
                            placeholder={formData && formData.comment !== '' ? formData.comment : 'Kein Kommentar'}
                            value={formData.comment || ''}
                            onChange={(e) =>
                                setEditedData({
                                    ...editedData,
                                    comment: e.target.value,
                                })
                            }
                        /> */}
                        {/* <div
                            className={`relative flex flex-col items-start justify-start flex-grow-0 flex-shrink-0 w-full bg-white rounded-tl rounded-tr h-14 `}
                        >
                            <div className="absolute label top-[-0.5em] left-[0.7em] flex items-center rounded justify-start px-1 bg-white">
                                <p className={`text-xs text-left ${validationErrors.streetNumber ? 'text-red-500' : 'text-[#373940]'}`}>
                                    Addresse eingeben
                                </p>
                            </div>
                            <Autocomplete
                                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string}
                                options={{
                                    types: ['address'],
                                    componentRestrictions: { country: 'de' },
                                }}
                                defaultValue={`${formData?.locationAddress.street} ${formData?.locationAddress.number}, ${formData?.locationAddress.region}`}
                                onPlaceSelected={(place) => {
                                    handlePlaceChange(place);
                                }}
                                className={`flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2.5 transition-all 
                                duration-400 rounded-md border border-1 ${validationErrors.streetNumber ? 'border-red-500' : 'border-[#373940]'} 
                                hover:outline outline-offset-0 outline-1 h-[3.1em] w-full px-[0.9em] hover:px-[0.9em] py-2`}
                            />
                            <div
                                className={`flex-grow w-[178px] text-xs text-left text-[#52555e] ml-[1em] mt-[0.1em] bg-white px-[0.5em]}`}
                            >
                                {validationErrors.streetNumber && (
                                    <p style={{ color: 'red' }}>Street number is required</p>
                                )}
                            </div>
                        </div> */}
                        <div className='flex flex-col'>
                            <Text bold>Adresse</Text>
                            {formData?.locationAddress.street} {formData?.locationAddress.number}, {formData?.locationAddress.region}
                        </div>
                        <div className='flex flex-col space-y-2 [&>*]:w-full'>
                            {/* <Button
                                type='button'
                                isOutlined
                                variant='ICONPLUS'
                                iconName='Delete'
                                customClasses="border-brand-button"
                                onClick={() => {
                                    setOpenDeleteBooking(true);
                                }}
                            >
                                Abholung löschen
                            </Button> */}
                            <div className="flex justify-between space-x-1">
                                <Button
                                    id="save"
                                    type="button"
                                    isOutlined
                                    variant='ICONPLUS'
                                    iconName='Close'
                                    customClasses="bg-brand-button border-brand-button w-1/2"
                                    isDisabled={validationErrors.streetNumber ? true : false}
                                    onClick={() => setOpenModaEditBooking(false)}
                                >
                                    Schliessen
                                </Button>
                                <Button
                                    id="save"
                                    type="submit"
                                    variant='ICONPLUS'
                                    iconName='Done'
                                    customClasses="bg-brand-button border-brand-button w-1/2"
                                    isDisabled={validationErrors.streetNumber ? true : false}
                                >
                                    {buttonLabelSave}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
            {openDeleteBooking && (
                <div className='fixed top-0 bottom-0 left-0 right-0 flex flex-col space-y-4 
                                    bg-white my-auto h-[10em] mx-2 md:mx-8 p-4 border rounded-md'>
                    <Text>Möchten Sie diese Buchung unwiderruflich Löschen?<br />
                        Der Kunde erhält dabei keine E-Mail!</Text>
                    <div className='flex justify-between space-x-2'>
                        <Button
                            type='button'
                            isOutlined
                            customClasses="border-brand-button"
                            onClick={() => {
                                setOpenDeleteBooking(false);
                            }}
                        >
                            Abbrechen
                        </Button>
                        <Button
                            type='submit'
                            customClasses="bg-brand-button border-brand-button"
                            onClick={handleDelete}
                        >
                            {buttonlabelDelete}
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
