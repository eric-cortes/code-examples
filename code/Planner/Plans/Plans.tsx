import { Heading, Text } from 'rds-ui-system';
import Plan from '@/components/Planner/Plans/Plan';
import 'react-datepicker/dist/react-datepicker.css';
import useFetch from '@/hooks/useFetch';
import { useState, useEffect } from 'react';
import { Loader } from '@/components/Loader/Loader';
import { mutate } from 'swr';
import { useAppContext } from '@/context/appContext';

interface Props {
    currentPlanDate: string
    currentBookingDate: string
    selectedPlan: []
    setSelectedPlan: (value: []) => void;
}

export default function PlansList({ setSelectedPlan, selectedPlan, currentBookingDate }: Props) {
    const { currentTenant } = useAppContext();
    const { data, error, isLoading } = useFetch(`/api/plans?day=${currentBookingDate}&tenantId=${currentTenant}`, {
        revalidateOnFocus: false
    });

    const displayDataPlansDisplay = data && data !== undefined

    const [dataSourcePlans, setDataSourcePlans] = useState<string[]>([]);
    const [errorPlans, setErrorPlans] = useState('')

    useEffect(() => {
        if (data) {
            const currentPlans = data;
            if (currentPlans && currentPlans.length > 0) {
                const lastItem = currentPlans[currentPlans.length - 1];
                if (lastItem.status === 'SUCCESS') {
                    setErrorPlans('');
                    console.log('SUCCESS Status Plans');
                    console.log('All Plans Set Up');
                    setDataSourcePlans(data);
                } else if (lastItem.status === 'SUBMITTED') {
                    setErrorPlans('');
                    console.log('SUBMITTED Status Plans');
                    console.log('Need Refresh Plans');
                    mutate(`/api/plans?day=${currentBookingDate}&tenantId=${currentTenant}`)
                } else if (lastItem.error !== '') {
                    console.log('Error Plans');
                    console.log(lastItem.error);
                    setDataSourcePlans(data);
                    setErrorPlans(lastItem.error);
                }
            } else {
                setDataSourcePlans([]);
            }
        }
    }, [data]);

    return (
        <>
            <div className="px-2 md:space-y-2">
                <Heading variant='h3'>Plans</Heading>
                <div className='md:h-[50.1vh] lg:h-[45.2vh] overflow-hidden rounded'>
                    <div className="md:my-[1em] w-[100%] mx-auto md:flex md:h-auto">
                        <div className="md:grid lg:grid grid-cols-5 gap-2 w-full [&>*]:font-semibold 
                            [&>*]:uppercase place-items-center py-[0.5em] [&>:not(:first-child)]:hidden [&>:not(:first-child)]:md:grid"
                        >
                            <div></div>
                            <Text>#</Text>
                            <Text>Abhlg.</Text>
                            <Text>Touren</Text>
                            <Text
                                customClasses='justify-self-center flex mx-1'
                            >
                                Mehr
                            </Text>
                        </div>
                    </div>
                    {dataSourcePlans && dataSourcePlans.length === 0 && !isLoading && (
                        <div className='p-10'>
                            Keine Pläne für dieses Datum
                        </div>
                    )}
                    {isLoading && (
                        <>
                            <div className='absolute p-10'>
                                Pläne werden geladen
                            </div>
                            <Loader pos='relative' />
                        </>
                    )}
                    <div className={`showScrollBars overflow-y-auto max-h-[50vh] md:pb-[8em] rounded transition-opacity duration-200 
                        border border-1 md:!border-0 ${displayDataPlansDisplay ? 'opacity-100' : 'opacity-0'}`}
                    >
                        {dataSourcePlans && (dataSourcePlans as Array<any>)
                            .slice()
                            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                            .map((item, i) => {

                                return (
                                    <div
                                        className='flex mb-2 cursor-default md:py-1 md:my-2 transition-color hover:bg-slate-100'
                                        key={i}
                                    >
                                        <Plan
                                            data={item}
                                            selectedPlan={selectedPlan}
                                            setSelectedPlan={setSelectedPlan}
                                        />
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div >
        </>
    );
}