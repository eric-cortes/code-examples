import { Button, Heading, Icon, Modal, Radio, Text } from 'rds-ui-system';
import { ChangeEvent, ReactElement, useMemo, useState } from 'react';
import { PlanDTO } from '../../../api';
import {
  AdiutabyteSolution,
  MixedPlannerOutputPlan,
} from '../../../repository/adiutabyte/types';
import { Spinner } from '../../UI/Spinner/Spinner';

interface Props {
  data: PlanDTO;
  onPlanSelected: (planId?: string) => void;
  isSelected: boolean;
}

export default function Plan({
  data,
  isSelected,
  onPlanSelected,
}: Props): ReactElement {
  const [openError, setOpenError] = useState(false);
  const [planInfo, setPlanInfo] = useState(false);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    // if this is unchecked without being the selected element, ignore (loop)
    // if (!isSelected && !event.target.checked) return;
    onPlanSelected(event.target.checked ? data.id : undefined);
  };

  const responseData = useMemo(() => {
    if (data.status === 'SUBMITTED' || !data.requestData) {
      return {};
    }
    const response = JSON.parse(data.responseData) as AdiutabyteSolution;
    if (
      Object.hasOwn(response, 'errorID') ||
      !Object.hasOwn(response, 'info')
    ) {
      return {};
    }
    const success = response as MixedPlannerOutputPlan;
    return {
      balance: (
        <Text>
          {success.info.balance
            .split(/\n+/)
            .map((item, i) => [i !== 0 && <br />, item])}
        </Text>
      ),
      relax: (
        <Text>
          {success.info.relax
            .split(/\n+/)
            .map((item, i) => [i !== 0 && <br />, item])}
        </Text>
      ),
      time: (
        <Text>
          {success.info.time
            .split(/\n+/)
            .map((item, i) => [i !== 0 && <br />, item])}
        </Text>
      ),
      violations: (
        <Text>
          {success.statistics.timeWindowViolationTaskIDs?.join(', ') ||
            'Keine Information'}
        </Text>
      ),
    };
  }, [data.requestData, data.responseData, data.status]);

  return (
    <>
      <div
        key={data.id + '-item'}
        className="items-center space-y-2 md:space-y-0 lg:space-y-0 w-full grid-cols-7 gap-2 my-0 
                md:grid lg:grid place-items-center lg:items-center [&>*]:mb-0 [&>*]:lg:mb-0 relative"
      >
        <div className="mx-[0.2em]">
          {data.status === 'SUBMITTED' ? (
            <Spinner />
          ) : (
            <Radio
              id="select plan"
              checked={isSelected}
              onChange={handleCheckboxChange}
            />
          )}
        </div>
        <div className="flex space-x-3 md:space-x-0 [&>:first-child]:md:hidden">
          <Icon name="Info" />
          <Text>{data.readableId}</Text>
        </div>
        <div className="flex space-x-3 md:space-x-0 [&>:first-child]:md:hidden">
          <Icon name="AccountCircle" />
          <Text>{data.summary?.bookings?.length}</Text>
          {data.status === 'ERROR' && (
            <div
              className="[&>*]:[&>*]:[&>*]:[&>*]:fill-brand-color-error hover:cursor-pointer"
              onClick={() => {
                setOpenError(true);
              }}
            >
              <Icon name="Error" />
            </div>
          )}
        </div>
        <div className="flex space-x-3 md:space-x-0 [&>:first-child]:md:hidden">
          <Icon name="Schedule" />
          <Text>{data.summary?.tours?.length}</Text>
        </div>
        <div className="flex space-x-3 md:space-x-0 [&>:first-child]:md:hidden">
          <Icon name="Warning" />
          <Text>{data.summary?.onTime}%</Text>
        </div>
        <div className="flex space-x-3 md:space-x-0 [&>:first-child]:md:hidden">
          <Icon name="Place" />
          <Text>{data.summary?.totalDistance} km</Text>
        </div>
        {openError && (
          <div
            className="fixed w-[20em] md:w-[20em] h-[18em] overflow-scroll bg-white border 
                            border-brand-color-error rounded-md margin-auto right-[2em] md:right-[10em] bottom-[10em] p-0"
          >
            <div className="absolute z-40 top-2 right-0 [&>*]:[&>*]:[&>*]:[&>*]:[&>*]:[&>*]:fill-brand-color-error">
              <Button
                type="button"
                variant="ICON"
                iconName="Close"
                onClick={() => {
                  setOpenError(false);
                }}
              />
            </div>
            <div className="p-4 mt-4">
              <Text>{data.error}</Text>
            </div>
          </div>
        )}
        <div className="absolute -top-[0.5em] md:top-0 right-0 flex justify-end md:relative">
          <Button
            type="button"
            variant="ICON"
            iconName="MoreHoriz"
            isOutlined
            customClasses="w-[3em]"
            onClick={() => {
              setPlanInfo(true);
            }}
          />
        </div>
      </div>
      {planInfo && (
        <Modal
          key={data.id + '-info'}
          width="80vw"
          height="80vh"
          customClasses="overflow-scroll"
          onClick={() => {
            setPlanInfo(false);
          }}
        >
          <div className="space-y-2 overflow-hidden">
            <Heading variant="h2">Tour Plan Details</Heading>
            <Heading variant="h3">Balance</Heading>
            {responseData.balance ?? 'Keine Information'}
            <Heading variant="h3">Relax</Heading>
            {responseData.relax ?? 'Keine Information'}
            <Heading variant="h3">Time</Heading>
            {responseData.time ?? 'Keine Information'}
            <Heading variant="h3">Time Window Violation Task IDs</Heading>
            {responseData.violations ?? 'Keine Information'}
          </div>
        </Modal>
      )}
    </>
  );
}
