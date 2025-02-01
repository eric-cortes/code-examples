import { Button, Heading, Input, Text } from 'rds-ui-system';
import { SyntheticEvent, useState } from 'react';
import Autocomplete from 'react-google-autocomplete';
import { useTranslation } from 'react-i18next';
import {
  BookingDTO,
  UpdateBookingDTO,
  useBookingControllerDelete,
  useBookingControllerUpdate,
} from '../../../api';
import { useAuthContext } from '../../../context/AuthContext';
import { Loader } from '../../Loader/Loader';

interface Props {
  setOpenModalEditBooking: (value: boolean) => void;
  formData: BookingDTO;
}

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export default function BookingEdit({
  setOpenModalEditBooking,
  formData,
}: Props): React.ReactElement {
  const { t } = useTranslation(['bookingEdit']);
  const { tenant } = useAuthContext();

  const [openDeleteBooking, setOpenDeleteBooking] = useState(false);

  const [editedData, setEditedData] = useState<UpdateBookingDTO>({
    name: formData.name,
    capacity: formData.capacity,
    city: formData.city,
    houseNumber: formData.houseNumber,
    lat: formData.lat,
    lng: formData.lng,
    postalCode: formData.postalCode,
    street: formData.street,
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

  const bookingUpdate = useBookingControllerUpdate();
  const bookingDelete = useBookingControllerDelete();

  const handlePlaceChange = (place: google.maps.places.PlaceResult) => {
    const componentMap: Record<string, string> = {};

    const updatedData = { ...editedData };
    if (place.geometry?.location) {
      updatedData.lat = place.geometry.location.lat().toPrecision(21);
      updatedData.lng = place.geometry.location.lng().toPrecision(21);
    } else {
      updatedData.lat = undefined;
      updatedData.lng = undefined;
    }

    place.address_components?.forEach((component: AddressComponent) => {
      component.types.forEach((type: string) => {
        if (
          ['street_number', 'route', 'locality', 'postal_code'].includes(type)
        ) {
          componentMap[type] = component.long_name;
        }
      });
    });

    updatedData.city = componentMap.locality || formData.city;
    updatedData.houseNumber =
      componentMap.street_number || formData.houseNumber;
    updatedData.postalCode = componentMap.postal_code || formData.postalCode;
    updatedData.street = componentMap.route || formData.street;

    setValidationErrors({
      streetNumber: !componentMap.street_number,
      route: !componentMap.route,
      locality: !componentMap.locality,
      postalCode: !componentMap.postal_code,
    });
  };

  const handleSave = (event: SyntheticEvent) => {
    event.preventDefault();

    if (bookingUpdate.isPending || bookingDelete.isPending) {
      return;
    }

    if (Object.values(validationErrors).some((x) => x)) {
      return;
    }

    bookingUpdate
      .mutateAsync({
        bookingId: formData.id,
        data: editedData,
      })
      .then(() => {
        setOpenModalEditBooking(false);
      })
      .catch((error: unknown) => {
        console.error('Error updating item:', error);
      });
  };

  const handleDelete = (event: SyntheticEvent) => {
    event.preventDefault();

    if (bookingUpdate.isPending || bookingDelete.isPending) {
      return;
    }

    bookingDelete
      .mutateAsync({
        bookingId: formData.id,
        formId: tenant.formIds[0],
      })
      .then(() => {
        setOpenModalEditBooking(false);
      })
      .catch((error: unknown) => {
        console.error('Error updating item name:', error);
      });
  };

  return (
    <>
      <form
        onSubmit={handleSave}
        className="w-full space-y-10 h-full overflow-y-auto"
        hidden={openDeleteBooking}
      >
        <Heading variant="h2">{t('title')}</Heading>
        <div className="flex flex-col space-y-2">
          <div className="h-full space-y-4">
            <div className="flex">
              <Input
                id="firstName"
                label={t('header.name')}
                placeholder={formData.name || t('common:noValue')}
                value={formData.name || ''}
                onChange={(e) => {
                  setEditedData({
                    ...editedData,
                    name: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex space-x-2">
              <div className="w-1/2">
                <Input
                  id="email"
                  label={t('header.email')}
                  placeholder={formData.email}
                  value={formData.email || ''}
                  onChange={(e) => {
                    setEditedData({
                      ...editedData,
                      email: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="w-1/2">
                <Input
                  id="phone"
                  label={t('header.phone')}
                  placeholder={formData.phone}
                  value={formData.phone || ''}
                  onChange={(e) => {
                    setEditedData({
                      ...editedData,
                      phone: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="w-1/2">
                <Input
                  id="capacity"
                  label={t('header.capacity')}
                  placeholder={formData.capacity.toString()}
                  value={formData.capacity || ''}
                  onChange={(e) => {
                    setEditedData({
                      ...editedData,
                      capacity: parseInt(e.target.value),
                    });
                  }}
                />
              </div>
              <div className="w-1/2">
                <Input
                  id="amount"
                  label={t('header.amount')}
                  placeholder={formData.pickupAmount}
                  value={formData.pickupAmount || ''}
                  onChange={(e) => {
                    setEditedData({
                      ...editedData,
                      pickupAmount: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <Input
              id="units"
              label={t('header.units')}
              placeholder={formData.pickupAssets}
              value={formData.pickupAssets || ''}
              onChange={(e) => {
                setEditedData({
                  ...editedData,
                  pickupAssets: e.target.value,
                });
              }}
            />
            <Input
              id="comment"
              label={t('header.comment')}
              placeholder={formData.comment}
              value={formData.comment || ''}
              onChange={(e) => {
                setEditedData({
                  ...editedData,
                  comment: e.target.value,
                });
              }}
            />
            <Input
              id="pickupLocation"
              label={t('header.pickupLocation')}
              placeholder={formData.pickupLocation}
              value={formData.pickupLocation || ''}
              onChange={(e) => {
                setEditedData({
                  ...editedData,
                  pickupLocation: e.target.value,
                });
              }}
            />
            <div
              className={`relative flex flex-col items-start justify-start flex-grow-0 flex-shrink-0 w-full bg-white rounded-tl rounded-tr h-14 `}
            >
              <div className="absolute label top-[-0.5em] left-[0.7em] flex items-center rounded justify-start px-1 bg-white">
                <p
                  className={`text-xs text-left ${validationErrors.streetNumber ? 'text-red-500' : 'text-[#373940]'}`}
                >
                  {t('header.address')}
                </p>
              </div>
              <Autocomplete
                options={{
                  types: ['address'],
                  componentRestrictions: { country: 'de' },
                }}
                defaultValue={`${formData.street} ${formData.houseNumber}, ${formData.city}`}
                onPlaceSelected={(place) => {
                  handlePlaceChange(place);
                }}
                className={`flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2.5 transition-all 
                                duration-400 rounded-md border border-1 ${validationErrors.streetNumber ? 'border-red-500' : 'border-[#373940]'} 
                                hover:outline outline-offset-0 outline-1 h-[3.1em] w-full px-[0.9em] hover:px-[0.9em] py-2`}
              />
              <div className="flex-grow w-[178px] text-xs text-left text-[#52555e] ml-[1em] mt-[0.1em] bg-white px-[0.5em]}">
                {validationErrors.streetNumber && (
                  <p style={{ color: 'red' }}>
                    {t('error.requiresHouseNumber')}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col space-y-2 [&>*]:w-full">
              <Button
                type="button"
                isOutlined
                variant="ICONPLUS"
                iconName="Delete"
                customClasses="border-brand-button"
                onClick={() => {
                  setOpenDeleteBooking(true);
                }}
              >
                {t('deleteBooking.action')}
              </Button>
              <Button
                id="save"
                type="submit"
                variant="ICONPLUS"
                iconName="Done"
                customClasses="bg-brand-button border-brand-button"
                isDisabled={validationErrors.streetNumber ? true : false}
                onClick={handleSave}
              >
                {t('common:save')}
              </Button>
            </div>
          </div>
        </div>
      </form>
      {openDeleteBooking && (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col space-y-4 bg-white my-auto h-[10em] p-4 m-8">
          <Text>{t('deleteBooking.message')}</Text>
          <div className="flex justify-between space-x-2">
            <Button
              type="button"
              isOutlined
              customClasses="border-brand-button"
              onClick={() => {
                setOpenDeleteBooking(false);
              }}
            >
              {t('common:cancel')}
            </Button>
            <Button
              type="submit"
              customClasses="bg-brand-button border-brand-button"
              onClick={handleDelete}
            >
              {t('common:delete')}
            </Button>
          </div>
        </div>
      )}
      {(bookingUpdate.isPending || bookingDelete.isPending) && <Loader />}
    </>
  );
}
