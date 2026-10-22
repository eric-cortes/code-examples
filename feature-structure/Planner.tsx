'use client';
import GoogleMap from '@/components/MapGoogle/GoogleMap';
import Bookings from '@/components/Planner/Bookings/Bookings';
import type { BookingData } from '@/components/Planner/Bookings/Booking';
import type { TeamData } from '@/components/Planner/Teams/Team';
import Plans from '@/components/Planner/Plans/Plans';
import Teams from '@/components/Planner/Teams/Teams';
import { useAppContext } from '@/context/appContext';
import useObjectsStore from '@/stores/objectsStore';
import { convertToISOString, convertToYYYYMMDD } from '@/util/goodies';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button, Select } from 'rds-ui-system';
import { SyntheticEvent, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { mutate } from 'swr';
import { Loader } from '../Loader/Loader';

type StrategyOption = { id: string; value: string };
type Plan = { id: string; readableId?: string; summary?: { tours: never[] } };

export default function Planner() {
    const { userRole, currentTenant } = useAppContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (userRole === process.env.NEXT_PUBLIC_DRIVER_ROLE_ID) {
            redirect('/tours/overview');
        }
    }, [userRole]);

    const responsibilities = useObjectsStore((state) => state.objectsData.objectStatus.data) as Array<{ id: string }>;

    //Start Component
    const bookingDateString = typeof window !== 'undefined' ? localStorage.getItem('bookingDate') : null;
    const bookingDate = bookingDateString ? new Date(bookingDateString) : new Date();
    const [startDate, setStartDate] = useState<Date>(bookingDate);

    useEffect(() => {
        if (isNaN(bookingDate.getTime())) {
            setStartDate(new Date());
        }
    }, [bookingDate]);

    const dataSourceRiders: never[] = [];
    const [buttonLabelCreatePlan, setButtonLabelCreatePlan] = useState('Plan erstellen');
    const [buttonLabelCreateTour, setButtonLabelCreateTour] = useState('Tour erstellen');

    const strategyOptions = [
        { id: '0', name: 'Eko-orientiert (bevorzugt kurze Wege)', value: 'Eko-orientiert (bevorzugt kurze Wege)' },
        {
            id: '1',
            name: 'Flottenorientiert (reduzieren die Anzahl der notwendigen Fahrer)',
            value: 'Flottenorientiert (reduzieren die Anzahl der notwendigen Fahrer)'
        }
    ];

    const [strategy, setStrategy] = useState('');
    const [selectedStrategyId, setSelectedStrategyId] = useState<number | null>(null);
    const [selectedStrategyOption, setSelectedStrategy] = useState<string | null>(
        'Eko-orientiert (bevorzugt kurze Wege'
    );
    const handleStrategySelect = (selectedOption: StrategyOption) => {
        setSelectedStrategyId(Number(selectedOption.id));
        if (selectedStrategyOption === selectedOption.value) {
            setSelectedStrategy(null);
        } else {
            setSelectedStrategy(selectedOption.value);
            setStrategy(selectedOption.value);
        }
    };

    const currentPlanDate = convertToISOString(startDate) ?? new Date().toISOString();
    const currentBookingDate = convertToYYYYMMDD(startDate) ?? "";

    function setBookingDate(date: Date) {
        const currentBookingDate = convertToYYYYMMDD(date);
        localStorage.setItem('bookingDate', currentBookingDate);
    }

    function clearFields() {
        setSelectedStrategyId(null);
        setStrategy('');
        setBookings([]);
        setTeams([]);
        setSelectedPlan([]);
    }

    const formattedDate = convertToYYYYMMDD(currentPlanDate) ?? "";

    const getObjectReadableIds = (ids: string[]) =>
        ids.filter((id) => responsibilities.some((responsibility) => responsibility.id === id));

    /// Driver HomebaseLat HomebaseLng
    async function handleCreatePlan(event: SyntheticEvent) {
        const drivers = teams.flatMap((team) => {
            return (
                team.drivers.map((driverId) => ({
                    id: driverId,
                    responsibilityIds: getObjectReadableIds(team.responsibilities),
                    lat: team.homebaseLat,
                    lng: team.homebaseLng,
                }))
            )
        });

        const bookingsArray = bookings.map((booking) => booking.id)
        event.preventDefault();
        const updatedData = {
            optimizationStrategy: selectedStrategyId,
            tightSchedule: false,
            enablePlanSplitting: true,
            plannedDate: formattedDate,
            bookingIds: bookingsArray,
            drivers: drivers,
        };
        setButtonLabelCreatePlan('Plan wird erstellt!');
        try {
            const headers = {
                'Content-Type': 'application/json'
            };
            const res = await fetch(`/api/plans?tenantId=${currentTenant}`, {
                method: 'POST',
                headers,
                body: JSON.stringify(updatedData)
            });
            if (res.ok) {
                setButtonLabelCreatePlan('Plan erstellt!');
                mutate(`/api/plans?day=${currentBookingDate}&tenantId=${currentTenant}`)
                setTimeout(() => {
                    setButtonLabelCreatePlan('Plan erstellen');
                    clearFields();
                }, 2000);
            } else {
                setButtonLabelCreatePlan('Error');
                throw new Error('Failed to update item name');
            }
        } catch (error) {
            console.error('Error updating:', error);
            setButtonLabelCreatePlan('Error');
        }
    }

    async function handleCreateTour(event: SyntheticEvent) {
        if (!selectedPlan) return;
        setIsLoading(true)
        setButtonLabelCreateTour('wird erstellt')
        const updatedData = {
            id: selectedPlan.id
        }
        try {
            const headers = {
                'Content-Type': 'application/json'
            };
            const res = await fetch(`/api/plans/${selectedPlan.id}?tenantId=${currentTenant}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify(updatedData)
            });
            if (res.ok) {
                setButtonLabelCreateTour('erstellt!')
                setTimeout(() => {
                    setButtonLabelCreateTour('erstellen')
                    setIsLoading(false)
                    clearFields();
                }, 1500);
            }
        } catch (error) {
            console.error('Error creating tours:', error);
        }
    }

    const [bookings, setBookings] = useState<BookingData[]>([]);
    const [teams, setTeams] = useState<TeamData[]>([]);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

    const showCreatePlan = bookings.length > 0 && teams.length > 0 && selectedStrategyId !== null;
    const showCreateTour = selectedPlan !== null;

    return (
        <>
            {isLoading && (
                <>
                    <div className='p-10'>
                        Aufträge werden geladen
                    </div>
                    <Loader />
                </>
            )}
            <div className="md:flex md:max-w-[95vw] md:mx-auto pt-4 pb-[6em]">
                <div className="md:w-[50%] space-y-[1.5em] mb-4">
                    <div className="px-2 space-y-4 sm:space-y-0 [&>*]:sm:w-1/2 sm:flex sm:space-x-1">
                        <div className="relative">
                            <div className="absolute top-[-0.5em] z-[9] left-[0.7em] flex items-center rounded justify-start px-1 bg-white">
                                <p className="text-xs text-left text-black">Datum auswählen</p>
                            </div>
                            <DatePicker
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                selected={startDate}
                                calendarClassName="planner-calendar h-[30em]"
                                className="h-[3em]"
                                disabledKeyboardNavigation
                                onChange={(date) => {
                                    if (!date) return;
                                    setStartDate(date);
                                    setBookingDate(date);
                                    clearFields();
                                }}
                                dateFormat="dd/MM/yyyy"
                            />
                        </div>
                        <div>
                            <Button
                                type="button"
                                variant="ICONPLUS"
                                isOutlined
                                iconName="Add"
                                customClasses="w-full"
                                isDisabled
                            >
                                <Link href="/order-import">
                                    Aufträge Importieren
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div className="px-2 space-y-4">
                        <Select
                            id="strategy"
                            label="Optimierungsstrategie"
                            boxText={strategy ? strategy : 'Bitte auswählen'}
                            prepopulatedId={1}
                            onSelectionChange={handleStrategySelect}
                            options={strategyOptions}
                            selectedOptions={selectedStrategyOption}
                        />
                    </div>
                    <Bookings
                        currentPlanDate={currentPlanDate}
                        currentBookingDate={currentBookingDate}
                        bookings={bookings}
                        setBookings={setBookings}
                        currentTenant={currentTenant}
                    />
                    <Teams teams={teams} setTeams={setTeams} />
                </div>
                <div className="md:w-[50%] space-y-[0.5em]">
                    <div
                        className={`h-[30em] lg:h-[39.5em] md:h-[39.5em] w-[96vw] relative md:w-[100%] mx-auto rounded overflow-hidden hover:cursor-pointer`}>
                        <GoogleMap
                            bookingData={bookings}
                            dataSourceSelectedPlan={selectedPlan?.summary?.tours}
                            dataSourceRiders={dataSourceRiders}
                        />
                    </div>
                    <Plans
                        currentPlanDate={currentPlanDate}
                        currentBookingDate={currentBookingDate}
                        selectedPlan={selectedPlan}
                        setSelectedPlan={setSelectedPlan}
                    />
                </div>
            </div>
            <div
                className={`fixed z-50 w-full px-2 py-2 space-y-1 
                    bg-white md:space-y-0 md:space-x-2 md:flex transition-all duration-200 
                    ${showCreatePlan || showCreateTour ? 'bottom-0' : '-bottom-[10em]'
                    }`}>
                <div className="md:w-1/2">
                    {showCreatePlan && (
                        <Button
                            type="button"
                            variant="ICONPLUS"
                            isOutlined
                            iconName="Add"
                            customClasses="border-brand-color-800 bg-brand-color-800 w-full text-black hover:text-black"
                            onClick={handleCreatePlan}>
                            {buttonLabelCreatePlan}
                        </Button>
                    )}
                </div>
                <div className="md:w-1/2">
                    {showCreateTour && (
                        <Button
                            type="button"
                            variant="ICONPLUS"
                            isOutlined
                            iconName="Add"
                            customClasses="w-full"
                            onClick={handleCreateTour}
                        >
                            Tour aus Plan {selectedPlan.readableId} {buttonLabelCreateTour}
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
}
