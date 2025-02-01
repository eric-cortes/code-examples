import {
  Assignment,
  AssignmentLate,
  AssignmentTurnedIn,
  ContentPaste,
} from '@mui/icons-material';
import { Button, Checkbox, Icon, Modal, Text } from 'rds-ui-system';
import { ChangeEvent, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BookingDTO } from '../../../api';
import { PlanResource } from '../../../app/[lng]/planner/page';
import { formatTime } from '../../../util/filterDateLogic';
import { useBreakpoint } from '../../../util/useBreakpoint';
import BookingEditForm from './BookingEditForm';

interface StatusProps {
  status?: PlanResource;
  sequence?: string;
}

const ItemStatus: React.FC<StatusProps> = ({ status, sequence }) => {
  const { t } = useTranslation(['planner']);
  const icon = useMemo(() => {
    return (status?.planId.length ?? 0) > 1 ? (
      <span title={t('booking.plannedMulti')}>
        <AssignmentLate style={{ color: '#FFCB42' }} />
      </span>
    ) : status?.status === 'PLAN' ? (
      <span title={t('booking.plannedOnce')}>
        <Assignment style={{ color: '#043ED1' }} />
      </span>
    ) : status?.status === 'TOUR' ? (
      <span title={t('booking.tourAssigned')}>
        <AssignmentTurnedIn style={{ color: '#00671B' }} />
      </span>
    ) : (
      <span title={t('booking.notPlanned')}>
        <ContentPaste style={{ color: '#C8C8C8' }} />
      </span>
    );
  }, [status, t]);

  return (
    <div className="flex flex-col items-center">
      {icon}
      <div className="flex flex-row items-center justify-self-center space-x-1">
        <Text title={t('booking.assignedPlans')} customClasses="text-xs">
          {status?.planId.map((p) => '#' + p).join(', ')}
        </Text>
        {status?.status === 'TOUR' && (
          <div
            title={t('booking.assignedSequence')}
            className="min-w-4 w-4 h-4 text-[0.6rem] bg-white rounded-full border border-black items-center justify-center flex font-semibold"
          >
            {sequence}
          </div>
        )}
      </div>
    </div>
  );
};

interface Props {
  data: BookingDTO;
  handleToggleBooking: (bookingId: string, selected: boolean) => void;
  isChecked: boolean;
  status?: PlanResource;
}

export default function Booking({
  data,
  handleToggleBooking,
  isChecked,
  status,
}: Props): React.ReactElement {
  const [openModalEditBooking, setOpenModalEditBooking] = useState(false);
  const convertedDateStart = formatTime(data.timeWindowStart);
  const convertedDateEnd = formatTime(data.timeWindowEnd);

  const breakpoint = useBreakpoint();
  const getWidth = (breakpoint?: string) => {
    if (breakpoint === 'lg') {
      return '40em';
    } else if (breakpoint === 'md') {
      return '40em';
    } else if (breakpoint === 'sm') {
      return '36em';
    } else {
      return '24em';
    }
  };

  const getHeight = (breakpoint?: string) => {
    if (breakpoint === 'lg') {
      return '48em';
    } else if (breakpoint === 'md') {
      return '48em';
    } else if (breakpoint === 'sm') {
      return '48em';
    } else {
      return '50em';
    }
  };

  return (
    <>
      <div
        key={data.id}
        className="items-center space-y-2 md:space-y-0 lg:space-y-0 w-full grid-cols-9 gap-2 my-0 
                md:grid lg:grid place-items-center [&>*]:mb-0 [&>*]:lg:mb-0 relative"
      >
        <div className="mx-[0.2em]">
          <Checkbox
            id="Checkbox in Booking"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleToggleBooking(data.id, event.target.checked);
            }}
            checked={isChecked}
          />
        </div>
        <ItemStatus status={status} sequence={data.sequence} />
        <div className="flex space-x-3 md:space-x-0 [&>:first-child]:md:hidden col-span-2">
          <Icon name="Schedule" />
          <Text>
            {convertedDateStart} - {convertedDateEnd}
          </Text>
        </div>
        <div className="flex space-x-3 md:space-x-0 [&>:first-child]:md:hidden">
          <Icon name="Warning" />
          <Text>{data.capacity}</Text>
        </div>
        <div className="flex space-x-3 md:space-x-0 [&>:first-child]:md:hidden">
          <Icon name="Place" />
          <div className="flex">
            <Text
              customClasses="overflow-hidden relative inline-block whitespace-nowrap overflow-ellipsis w-[5em] text-center"
              title={`${data.street} ${data.houseNumber} ${data.postalCode} ${data.city}`}
            >
              {data.street} {data.houseNumber} {data.postalCode} {data.city}
            </Text>
          </div>
        </div>
        <div className="flex space-x-3 md:space-x-0 [&>:first-child]:md:hidden col-span-2">
          <Icon name="AccountCircle" />
          <div className="flex">
            <Text
              customClasses="overflow-hidden relative inline-block whitespace-nowrap overflow-ellipsis w-[5em] text-center"
              title={data.name}
            >
              {data.name}
            </Text>
          </div>
        </div>
        <div className="absolute -top-[0.5em] md:top-0 right-0 flex justify-end m-0 md:relative">
          <Button
            type="button"
            variant="ICON"
            iconName="Edit"
            isOutlined
            customClasses="w-[3em]"
            onClick={() => {
              setOpenModalEditBooking(true);
            }}
          />
        </div>
      </div>
      {openModalEditBooking && (
        <Modal
          width={getWidth(breakpoint)}
          height={getHeight(breakpoint)}
          onClick={() => {
            setOpenModalEditBooking(false);
          }}
        >
          <BookingEditForm
            setOpenModalEditBooking={setOpenModalEditBooking}
            formData={data}
          />
        </Modal>
      )}
    </>
  );
}
