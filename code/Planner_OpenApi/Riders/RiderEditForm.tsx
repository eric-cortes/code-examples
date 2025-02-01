import { useQueryClient } from '@tanstack/react-query';
import { Button, Heading, Input, Select, Text } from 'rds-ui-system';
import { ReactElement, SyntheticEvent, useMemo, useState } from 'react';
import Autocomplete from 'react-google-autocomplete';
import { useTranslation } from 'react-i18next';
import {
  RiderDTO,
  UpdateRiderDTO,
  useRiderControllerDelete,
  useRiderControllerGetList,
  useRiderControllerUpdate,
} from '../../../api';
import { TimeSelect } from '../../../components/UI';
import { GoogleAPIKeyProvider } from '../../../context/GoogleAPIProvider';
import { Loader } from '../../Loader/Loader';

interface Props {
  setOpenModalEditRider: (value: boolean) => void;
  formData: RiderDTO;
}

interface GeoLocation {
  lat: number;
  lng: number;
}

interface GAddress {
  street_number?: string;
  route?: string;
  locality?: string;
  postal_code?: string;
}

interface SelectOption {
  id: string;
  name: string;
  value: string;
}

export default function Comments({
  setOpenModalEditRider,
  formData,
}: Props): ReactElement {
  const { t } = useTranslation(['riderEdit']);
  const riderQuery = useRiderControllerGetList();
  const queryClient = useQueryClient();

  const vehicleType = useMemo(
    () =>
      [
        { id: '0', name: t('vehicle.car'), value: '0' },
        { id: '1', name: t('vehicle.bike'), value: '1' },
        { id: '3', name: t('vehicle.truck'), value: '3' },
      ] as SelectOption[],
    [t],
  );

  const [openDeleteRider, setOpenDeleteRider] = useState(false);
  const [editedData, setEditedData] = useState<UpdateRiderDTO>({
    firstName: formData.user.firstName,
    lastName: formData.user.lastName,
    capacity: formData.capacity,
    city: formData.city,
    houseNumber: formData.houseNumber,
    lat: formData.lat,
    lng: formData.lng,
    postalCode: formData.postalCode,
    street: formData.street,
    maxDistance: formData.maxDistance,
    timeWindowStart: formData.timeWindowStart,
    timeWindowEnd: formData.timeWindowEnd,
    vehicleType: formData.vehicleType,
  });

  const [validationErrors, setValidationErrors] = useState<{
    address: boolean;
  }>({
    address: false,
  });

  const [address, setAddress] = useState<GAddress>({});

  const [latLng, setLatLng] = useState<GeoLocation>({
    lat: parseFloat(formData.lat),
    lng: parseFloat(formData.lng),
  });

  const handlePlaceChange = (place: google.maps.places.PlaceResult) => {
    setLatLng({
      lat: place.geometry?.location?.lat() ?? 0,
      lng: place.geometry?.location?.lng() ?? 0,
    });

    // filter for desired components if they have values, map to [key,value][],
    // and create an object from that. (if all components are present it's valid, thanks google)
    const components = ['street_number', 'route', 'locality', 'postal_code'];
    const address = Object.fromEntries(
      (place.address_components ?? [])
        .filter(
          (comp) =>
            comp.types.find((x) => components.includes(x)) && comp.long_name,
        )
        .map((comp) => [
          comp.types.find((x) => components.includes(x)),
          comp.long_name,
        ]),
    ) as GAddress;

    setAddress(address);
    setValidationErrors({
      address: !(
        address.locality &&
        address.postal_code &&
        address.route &&
        address.street_number
      ),
    });
  };

  const riderUpdate = useRiderControllerUpdate();
  const riderDelete = useRiderControllerDelete();

  const isLoading = riderUpdate.isPending || riderDelete.isPending;

  const handleSave = (event: SyntheticEvent) => {
    event.preventDefault();

    if (validationErrors.address || isLoading) {
      return;
    }

    const updatedData: UpdateRiderDTO = {
      firstName: editedData.firstName,
      lastName: editedData.lastName,
      capacity: Number(editedData.capacity),
      city: address.locality || formData.city,
      houseNumber: address.street_number || formData.houseNumber,
      lat: latLng.lat.toString(),
      lng: latLng.lng.toString(),
      postalCode: address.postal_code || formData.postalCode,
      street: address.route || formData.street,
      timeWindowStart: selectedStartTime,
      timeWindowEnd: selectedEndTime,
      maxDistance: Number(editedData.maxDistance),
      vehicleType: selectedVehicle?.value ?? '0',
    };

    riderUpdate
      .mutateAsync({
        riderId: formData.id,
        data: updatedData,
      })
      .then(() => {
        setEditedData({ ...updatedData });
        void queryClient.invalidateQueries({ queryKey: riderQuery.queryKey });
        setOpenModalEditRider(false);
      })
      .catch((error: unknown) => {
        console.error('Error updating item:', error);
      });
  };

  const handleDelete = (event: SyntheticEvent) => {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    riderDelete
      .mutateAsync({
        riderId: formData.id,
      })
      .then(() => {
        void queryClient.invalidateQueries({ queryKey: riderQuery.queryKey });
        setOpenDeleteRider(false);
        setOpenModalEditRider(false);
      })
      .catch((error: unknown) => {
        console.error('Error updating item name:', error);
      });
  };

  const [selectedStartTime, setSelectedStartTime] = useState<string>(
    formData.timeWindowStart,
  );
  const handleStartTimeChange = (selectedValue: {
    id: string;
    name: string;
  }) => {
    setSelectedStartTime(selectedValue.name);
  };

  const [selectedEndTime, setSelectedEndTime] = useState<string>(
    formData.timeWindowEnd,
  );
  const handleEndTimeChange = (selectedValue: { id: string; name: string }) => {
    setSelectedEndTime(selectedValue.name);
  };

  const [selectedVehicle, setSelectedVehicle] = useState<SelectOption>();
  const handleVehicleSelect = (selectedOption: {
    value: string;
    name: string;
  }) => {
    setSelectedVehicle(
      vehicleType.find((v) => v.value === selectedOption.value) ?? undefined,
    );
  };

  return (
    <>
      <form
        onSubmit={handleSave}
        className={`w-full space-y-10 transition-opacity duration-100
                    ${openDeleteRider ? 'opacity-0' : 'opacity-100'}`}
      >
        <Heading variant="h2">
          {t('title', {
            rider: `${formData.user.firstName} ${formData.user.lastName}`,
          })}
        </Heading>
        <div className="flex flex-col space-y-2">
          <div className="h-full space-y-4">
            <div className="flex">
              <Input
                id="name"
                label={t('header.firstName')}
                placeholder={formData.user.firstName || t('common:noValue')}
                value={editedData.firstName || ''}
                onChange={(e) => {
                  setEditedData({
                    ...editedData,
                    firstName: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex">
              <Input
                id="last name"
                label={t('header.lastName')}
                placeholder={formData.user.lastName}
                value={editedData.lastName || ''}
                onChange={(e) => {
                  setEditedData({
                    ...editedData,
                    lastName: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex w-full space-x-2">
              <div className="w-1/2">
                <Input
                  id="capacity"
                  label={t('header.capacity')}
                  placeholder={formData.capacity.toString()}
                  value={editedData.capacity ?? 0}
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
                  id="max distance"
                  label={t('header.maxDist')}
                  placeholder={formData.maxDistance.toString()}
                  value={editedData.maxDistance ?? 0}
                  onChange={(e) => {
                    setEditedData({
                      ...editedData,
                      maxDistance: parseInt(e.target.value),
                    });
                  }}
                />
              </div>
            </div>
            <div className="w-full">
              <Select
                label={t('header.vehicle')}
                boxText={selectedVehicle?.name ?? ''}
                id="select language"
                onSelectionChange={handleVehicleSelect}
                options={vehicleType}
                selectedOptions={selectedVehicle?.value}
              />
            </div>
            <div className="flex justify-between w-full space-x-2">
              <div className="w-[49%]">
                <TimeSelect
                  formDate={selectedStartTime}
                  label={t('header.shiftStart')}
                  onChange={handleStartTimeChange}
                />
              </div>
              <div className="w-[49%]">
                <TimeSelect
                  formDate={selectedEndTime}
                  label={t('header.shiftEnd')}
                  onChange={handleEndTimeChange}
                />
              </div>
            </div>
            <div
              className={`relative flex flex-col items-start justify-start flex-grow-0 flex-shrink-0 w-full bg-white rounded-tl rounded-tr h-14 `}
            >
              <div className="absolute label top-[-0.5em] left-[0.7em] flex items-center rounded justify-start px-1 bg-white">
                <p
                  className={`text-xs text-left ${validationErrors.address ? 'text-red-500' : 'text-[#373940]'}`}
                >
                  {t('header.address')}
                </p>
              </div>
              <GoogleAPIKeyProvider libraries={['places']}>
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
                                duration-400 rounded-md border border-1 ${validationErrors.address ? 'border-red-500' : 'border-[#373940]'} 
                                hover:outline outline-offset-0 outline-1 h-[3.1em] w-full px-[0.9em] hover:px-[0.9em] py-2`}
                />
              </GoogleAPIKeyProvider>
              <div className="flex-grow w-[178px] text-xs text-left text-[#52555e] ml-[1em] mt-[0.1em] bg-white px-[0.5em]}">
                {validationErrors.address && (
                  <p style={{ color: 'red' }}>{t('error.invalidAddress')}</p>
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
                  setOpenDeleteRider(true);
                }}
              >
                {t('deleteRider.action')}
              </Button>
              <Button
                id="save"
                type="submit"
                variant="ICONPLUS"
                iconName="Done"
                customClasses="bg-brand-button border-brand-button"
                onClick={handleSave}
              >
                {t('common:save')}
              </Button>
            </div>
          </div>
        </div>
      </form>
      {openDeleteRider && (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col space-y-4 bg-white my-auto h-[10em] p-4 m-8">
          <Text>{t('deleteRider.message')}</Text>
          <div className="flex justify-between space-x-2">
            <Button
              type="button"
              isOutlined
              customClasses="border-brand-button"
              onClick={() => {
                setOpenDeleteRider(false);
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
      {isLoading && <Loader />}
    </>
  );
}
