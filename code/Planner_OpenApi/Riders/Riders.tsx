import { InfoOutlined } from '@mui/icons-material';
import { Checkbox, Heading, Text } from 'rds-ui-system';
import { ReactElement, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';
import { useRiderControllerGetList } from '../../../api';
import { PlanResource } from '../../../app/[lng]/planner/page';
import Rider from '../../../components/Planner/Riders/Rider';
import { Box } from '../../../components/UI';

interface Props {
  onSelectionChanged: (riderIds: string[]) => void;
  clearSelection: boolean;
  riderStatus: PlanResource[];
}

export default function Riders({
  onSelectionChanged,
  clearSelection,
  riderStatus,
}: Props): ReactElement {
  const { t } = useTranslation(['planner']);
  const riderQuery = useRiderControllerGetList();
  const [selectedRiders, setSelectedRiders] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (clearSelection) {
      setSelectedRiders(new Set());
    }
  }, [clearSelection]);

  const handleToggleRider = (riderId: string, selected: boolean) => {
    const newSet = new Set(selectedRiders);
    if (!selected) {
      newSet.delete(riderId);
      setSelectedRiders(newSet);
    } else {
      newSet.add(riderId);
      setSelectedRiders(newSet);
    }
  };

  const handleSelectAllRiders = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.checked) {
      setSelectedRiders(
        new Set((riderQuery.data?.data.riders ?? []).map((it) => it.id)),
      );
    } else {
      setSelectedRiders(new Set());
    }
  };

  useEffect(() => {
    onSelectionChanged([...selectedRiders]);
  }, [onSelectionChanged, selectedRiders]);

  return (
    <div className="px-2 md:space-y-2">
      <Heading variant="h3">{t('rider.header.section')}</Heading>
      <div className="overflow-hidden rounded">
        <div className="md:my-[0em] w-[100%] mx-auto hidden md:visible md:flex md:h-auto">
          <div className="md:grid lg:grid grid-cols-9 gap-2 w-full [&>*]:font-semibold [&>*]:uppercase place-items-center py-[0.5em]">
            <Checkbox
              id="Checkbox All"
              onChange={handleSelectAllRiders}
              checked={riderQuery.data?.data.count === selectedRiders.size}
            />
            <Text title={t('rider.header.status')}>
              <InfoOutlined />
            </Text>
            <Text>{t('rider.header.name')}</Text>
            <div className="col-span-2">
              <Text>{t('rider.header.timeWindow')}</Text>
            </div>
            <Text>{t('rider.header.maxDist')}</Text>
            <Text>{t('rider.header.capacity')}</Text>
            <Text>{t('rider.header.address')}</Text>
            <Text>{t('rider.header.edit')}</Text>
          </div>
        </div>
        {riderQuery.data?.data.count === 0 && (
          <div className="p-10">{t('rider.noRiders')}</div>
        )}
        {!riderQuery.data?.data.riders && (
          <div className="p-10">{t('rider.loading')}</div>
        )}
        <div className="overflow-y-auto max-h-[50vh] rounded">
          {riderQuery.data?.data.riders
            .toSorted((a, b) => a.user.lastName.localeCompare(b.user.lastName))
            .map((item, i) => {
              return (
                <div
                  className="flex py-1 my-2 cursor-default transition-color hover:bg-slate-100"
                  key={i}
                >
                  <Box customCss="md:p-0">
                    <Rider
                      data={item}
                      onToggleRider={handleToggleRider}
                      isChecked={selectedRiders.has(item.id)}
                      status={riderStatus.find((it) => it.resId === item.id)}
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
