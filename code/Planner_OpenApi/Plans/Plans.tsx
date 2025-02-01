import { useQueryClient } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import { Heading, Icon, Text } from 'rds-ui-system';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';
import { PlanDTO, usePlanControllerGetList } from '../../../api';
import Plan from '../../../components/Planner/Plans/Plan';
import { Box } from '../../../components/UI';

interface Props {
  currentPlanDate: DateTime;
  selectedPlan?: PlanDTO;
  setSelectedPlan: (value?: PlanDTO) => void;
}

export default function PlansList({
  setSelectedPlan,
  selectedPlan,
  currentPlanDate,
}: Props): ReactElement {
  const { t } = useTranslation(['planner']);
  const [planningInProgress, setPlanningInProgress] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const planQuery = usePlanControllerGetList({
    day: currentPlanDate.toISODate() ?? '0000-00-00',
  });

  useEffect(() => {
    if (!planQuery.isLoading && planQuery.data) {
      const currentPlans = planQuery.data.data.plans;
      if (currentPlans.length > 0) {
        const lastItem = currentPlans[currentPlans.length - 1];

        if (lastItem.status === 'SUCCESS') {
          setPlanningInProgress(false);
        } else if (lastItem.status === 'SUBMITTED') {
          void queryClient.invalidateQueries({
            queryKey: planQuery.queryKey,
          });
          setPlanningInProgress(true);
        } else if (lastItem.error) {
          console.log('Error Plans');
          console.log(lastItem.error);
          setPlanningInProgress(false);
        }
      }
    }
  }, [
    planQuery.data,
    planQuery.dataUpdatedAt,
    planQuery.isLoading,
    planQuery.queryKey,
    queryClient,
  ]);

  const plans = planQuery.data?.data.plans;
  const hasErrors =
    plans?.some((item: PlanDTO) => item.status === 'ERROR') ?? false;

  const handlePlanSelected = useCallback(
    (planId?: string) => {
      const plan = planId
        ? planQuery.data?.data.plans.find((plan) => plan.id === planId)
        : undefined;
      setSelectedPlan(plan);
    },
    [planQuery.data?.data.plans, setSelectedPlan],
  );

  return (
    <div className="px-2 md:space-y-2">
      <Heading variant="h3">{t('plan.header.section')}</Heading>
      <div className="overflow-hidden rounded">
        <div className="md:my-[0em] w-[100%] mx-auto hidden md:visible md:flex md:h-auto">
          <div className="md:grid lg:grid grid-cols-7 gap-2 w-full [&>*]:font-semibold [&>*]:uppercase place-items-center py-[0.5em]">
            <div className="[&>*]:[&>*]:[&>*]:[&>*]:fill-brand-color-error hover:cursor-pointer">
              {hasErrors && <Icon name="Error" />}
            </div>
            <Text>{t('plan.header.id')}</Text>
            <Text>{t('plan.header.bookings')}</Text>
            <Text>{t('plan.header.tours')}</Text>
            <Text>{t('plan.header.timeliness')}</Text>
            <Text>{t('plan.header.distance')}</Text>
            <Text>{t('plan.header.more')}</Text>
          </div>
        </div>
        {plans?.length === 0 && !planningInProgress && (
          <div className="p-10">{t('plan.noEntries')}</div>
        )}
        {planQuery.isLoading && <div className="p-10">{t('plan.loading')}</div>}
        <div className="overflow-y-auto max-h-[50vh] rounded}">
          {plans
            ?.toSorted(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex py-1 my-2 mb-2 cursor-default transition-color hover:bg-slate-100"
                >
                  <Box customCss="md:p-0">
                    <Plan
                      data={item}
                      isSelected={item.id === selectedPlan?.id}
                      onPlanSelected={handlePlanSelected}
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
