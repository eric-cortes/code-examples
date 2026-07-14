import { InfoOutlined } from '@mui/icons-material';
import { DateTime } from 'luxon';
import { Checkbox, Heading, Text } from 'rds-ui-system';
import { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBookingControllerGetList } from '../../../api';
import { PlanResource } from '../../../app/[lng]/planner/page';
import Booking from '../../../components/Planner/Bookings/Booking';
import { Box } from '../../../components/UI';

interface Props {
  onSelectionChanged: (selectedSet: string[]) => void;
  searchDate: DateTime;
  clearSelection: boolean;
  bookingStatus: PlanResource[];
}

export default function Bookings({
  onSelectionChanged,
  searchDate,
  clearSelection,
  bookingStatus,
}: Props): ReactElement {
  const { t } = useTranslation(['planner']);
  const bookingsQuery = useBookingControllerGetList({
    day: searchDate.toISODate() ?? '0000-00-00',
  });
  const [selectedBookings, setSelectedBookings] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    if (clearSelection) {
      setSelectedBookings(new Set());
    }
  }, [clearSelection]);

  const handleToggleBooking = (bookingId: string, selected: boolean) => {
    const newSet = new Set(selectedBookings);
    if (!selected) {
      newSet.delete(bookingId);
      setSelectedBookings(newSet);
    } else {
      newSet.add(bookingId);
      setSelectedBookings(newSet);
    }
  };

  const handleSelectAllBookings = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.checked) {
      setSelectedBookings(
        new Set((bookingsQuery.data?.data.bookings ?? []).map((it) => it.id)),
      );
    } else {
      setSelectedBookings(new Set());
    }
  };

  useEffect(() => {
    onSelectionChanged([...selectedBookings]);
  }, [onSelectionChanged, selectedBookings]);

  const allBookingsSelected =
    selectedBookings.size > 0 &&
    selectedBookings.size === bookingsQuery.data?.data.count;

  return (
    <div className="px-2 md:space-y-2">
      <Heading variant="h3">{t('booking.header.section')}</Heading>
      <div className="overflow-hidden rounded">
        <div className="md:my-[0em] w-[100%] mx-auto hidden md:visible md:flex md:h-auto">
          <div className="md:grid lg:grid grid-cols-9 gap-2 w-full [&>*]:font-semibold [&>*]:uppercase place-items-center py-[0.5em]">
            <Checkbox
              id="Checkbox All"
              onChange={handleSelectAllBookings}
              checked={allBookingsSelected}
            />
            <Text title={t('booking.header.status')}>
              <InfoOutlined />
            </Text>
            <Text customClasses="col-span-2">
              {t('booking.header.timeWindow')}
            </Text>
            <Text>{t('booking.header.capacity')}</Text>
            <Text>{t('booking.header.address')}</Text>
            <Text customClasses="col-span-2">{t('booking.header.name')}</Text>
            <Text>{t('booking.header.edit')}</Text>
          </div>
        </div>
        {bookingsQuery.data?.data.count === 0 && (
          <div className="p-10">{t('booking.noEntries')}</div>
        )}
        {!bookingsQuery.data?.data && (
          <div className="p-10">{t('booking.loading')}</div>
        )}
        <div className="overflow-y-auto max-h-[50vh] rounded">
          {bookingsQuery.data?.data.bookings
            .toSorted(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime(),
            )
            .map((item, i) => {
              return (
                <div
                  className="flex py-1 my-2 mb-2 cursor-default transition-color hover:bg-slate-100"
                  key={i}
                >
                  <Box customCss="md:p-0">
                    <Booking
                      data={item}
                      handleToggleBooking={handleToggleBooking}
                      isChecked={selectedBookings.has(item.id)}
                      status={bookingStatus.find(
                        (status) => status.resId === item.id,
                      )}
                    />
                  </Box>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
