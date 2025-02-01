import {
  Assignment,
  AssignmentLate,
  AssignmentTurnedIn,
  ContentPaste,
} from '@mui/icons-material';
import { Button, Checkbox, Icon, Modal, Text } from 'rds-ui-system';
import {
  ChangeEvent,
  ReactElement,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { RiderDTO } from '../../../api';
import { PlanResource, ResourceStatus } from '../../../app/[lng]/planner/page';
import { useBreakpoint } from '../../../util/useBreakpoint';
import RiderEditForm from './RiderEditForm';

const ItemStatus: React.FC<{ planIds: string[]; status: ResourceStatus }> = ({
  planIds,
  status,
}) => {
  const { t } = useTranslation(['planner']);
  const icon = useMemo(() => {
    return planIds.length > 1 ? (
      <span title={t('rider.plannedMulti')}>
        <AssignmentLate style={{ color: '#FFCB42' }} />
      </span>
    ) : status === 'PLAN' ? (
      <span title={t('rider.plannedOnce')}>
        <Assignment style={{ color: '#043ED1' }} />
      </span>
    ) : status === 'TOUR' ? (
      <span title={t('rider.tourAssigned')}>
        <AssignmentTurnedIn style={{ color: '#00671B' }} />
      </span>
    ) : (
      <span title={t('rider.notPlanned')}>
        <ContentPaste style={{ color: '#C8C8C8' }} />
      </span>
    );
  }, [status, planIds, t]);

  return (
    <div className="flex flex-row items-center justify-self-center">
      <div className="flex flex-col items-center">
        {icon}
        <Text title={t('rider.assignedPlans')} customClasses="text-xs">
          {planIds.map((p) => '#' + p).join(', ')}
        </Text>
      </div>
    </div>
  );
};

interface Props {
  data: RiderDTO;
  onToggleRider: (riderId: string, selected: boolean) => void;
  isChecked: boolean;
  status?: PlanResource;
}

export default function Rider({
  data,
  onToggleRider,
  isChecked,
  status,
}: Props): ReactElement {
  const { t } = useTranslation(['planner']);
  const breakpoint = useBreakpoint();
  const [openModalEditRider, setOpenModalEditRider] = useState(false);

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

  const handleToggleRider = useCallback(
    (riderId: string) => (event: ChangeEvent<HTMLInputElement>) => {
      onToggleRider(riderId, event.target.checked);
    },
    [onToggleRider],
  );

  return (
    <>
      <div
        key={data.id}
        className="items-center space-y-2 md:space-y-0 lg:space-y-0 w-full grid-cols-9 gap-2 my-0 
                md:grid lg:grid place-items-center lg:items-center [&>*]:mb-0 [&>*]:lg:mb-0 relative"
      >
        <div className="mx-[0.2em]">
          <Checkbox
            id="Checkbox"
            onChange={handleToggleRider(data.id)}
            checked={isChecked}
          />
        </div>
        <div className="max-w-6">
          <ItemStatus planIds={status?.planId ?? []} status={status?.status} />
        </div>
        <div className="flex space-x-3 md:space-x-0 [&>:first-child]:md:hidden">
          <Icon name="AccountCircle" />
          <div className="flex">
            <Text customClasses="overflow-hidden relative inline-block whitespace-nowrap overflow-ellipsis w-[5em] text-center">
              {data.user.firstName} {data.user.lastName}
            </Text>
          </div>
        </div>
        <div className="flex space-x-3 md:space-x-0 [&>:first-child]:md:hidden col-span-2">
          <Icon name="Schedule" />
          <Text>
            {data.timeWindowStart || t('common:noValue')} -{' '}
            {data.timeWindowEnd || t('common:noValue')}
          </Text>
        </div>
        <div className="flex space-x-3 md:space-x-0 [&>:first-child]:md:hidden">
          <Icon name="Warning" />
          <Text>{data.maxDistance}</Text>
        </div>
        <div className="flex space-x-3 md:space-x-0 [&>:first-child]:md:hidden">
          <Icon name="Warning" />
          <Text>{data.capacity}</Text>
        </div>
        <div className="flex space-x-3 md:space-x-0 [&>:first-child]:md:hidden">
          <Icon name="Place" />
          <div className="flex">
            <Text customClasses="overflow-hidden relative inline-block whitespace-nowrap overflow-ellipsis w-[5em] text-center">
              {data.street} {data.houseNumber} {data.postalCode} {data.city}
            </Text>
          </div>
        </div>
        <div className="absolute -top-[0.5em] md:top-0 right-0 flex justify-end md:relative">
          <Button
            type="button"
            variant="ICON"
            iconName="Edit"
            isOutlined
            customClasses="w-[3em]"
            onClick={() => {
              setOpenModalEditRider(true);
            }}
          />
        </div>
      </div>
      {openModalEditRider && (
        <Modal
          width={getWidth(breakpoint)}
          onClick={() => {
            setOpenModalEditRider(false);
          }}
        >
          <RiderEditForm
            setOpenModalEditRider={setOpenModalEditRider}
            formData={data}
          />
        </Modal>
      )}
    </>
  );
}
