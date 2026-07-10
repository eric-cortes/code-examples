import { Heading, Text, Checkbox, Button } from 'rds-ui-system';
import { forwardRef, LegacyRef, SyntheticEvent, useEffect, useRef, useState } from 'react';
import Booking from '@/components/Planner/Bookings/Booking';
import useFetch from '@/hooks/useFetch';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { mutate } from 'swr';
import { Loader } from '@/components/Loader/Loader';
import useObjetcsStore from '@/stores/objectsStore';

interface Props {
    currentBookingDate: string;
    bookings: any;
    setBookings: (value: any) => void;
    currentPlanDate: string;
    currentTenant: string;
}

export default function Bookings({ currentBookingDate, bookings, setBookings, currentPlanDate, currentTenant }: Props) {
    const [sortColumn, setSortColumn] = useState<string>('date');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const { objectsData: { objectStatus, objectModel }, } = useObjetcsStore();

    const { data: bookingsCurrentDate, error, isLoading } = useFetch(
        (currentTenant && currentBookingDate)
            ? `/api/booking?day=${currentBookingDate}&tenantid=${currentTenant}`
            : null,
        {
            keepPreviousData: true,
            revalidateOnFocus: false
        }
    );

    const dataSourceBookings = bookingsCurrentDate

    const handleAddBooking = (item: any) => {
        setBookings((prevBookings: any) => {
            if (prevBookings.includes(item)) {
                return prevBookings.filter((booking: any) => booking !== item);
            } else {
                return [...prevBookings, item];
            }
        });
    };

    const handleSelectAllBookings = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setBookings(dataSourceBookings);
        } else {
            setBookings([]);
        }
    };

    const handleSort = (column: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortColumn === column) {
            direction = sortDirection === 'asc' ? 'desc' : 'asc';
        }
        setSortColumn(column);
        setSortDirection(direction);
    };

    const sortedBookings = [...(dataSourceBookings || [])].sort((a, b) => {
        if (sortColumn === 'date') {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
        } else {
            const valueA = a[sortColumn]?.toString().toLowerCase() || '';
            const valueB = b[sortColumn]?.toString().toLowerCase() || '';
            if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
            if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        }
    });

    //// Move booking date
    const [startDate, setStartDate] = useState(new Date());
    const [convertedDateStr, setConvertedDateStr] = useState(startDate.toISOString());
    const datePickerRef = useRef<any>(null);

    useEffect(() => {
        setConvertedDateStr(startDate.toISOString());
    }, [startDate]);

    const closeDataPicker = () => {
        const simulateClick = new MouseEvent('mousedown', {
            view: window,
            bubbles: true,
            cancelable: true,
        });
        const outsideElement = document.getElementById('outside-element');
        if (outsideElement) {
            outsideElement.dispatchEvent(simulateClick);
        }
    };

    async function handleSave(event?: SyntheticEvent) {
        if (event) event.preventDefault();
        const newBookings = bookings.map((item: any) => item.id);
        const updatedData = {
            "bookingDate": convertedDateStr,
            "ids": newBookings,
        }
        try {
            const res = await fetch(`/api/booking/bulk?tenantId=${currentTenant}`, {
                method: 'PUT',
                body: JSON.stringify(updatedData)
            });
            if (res.ok === true) {
                mutate(`/api/booking?day=${currentBookingDate}&tenantid=${currentTenant}`)
                datePickerRef.current.setOpen(false);
                setBookings([])
            } else {
                throw new Error('Failed to update item name');
            }
        } catch (error) {
            console.error('Error updating item name:', error);
        }
    }

    const ExampleCustomInput = forwardRef(
        ({ onClick, className }: any, ref: LegacyRef<HTMLDivElement> | undefined) => (
            <div className={className} onClick={onClick} ref={ref}>
                <Button
                    type="button"
                    customClasses={`
                        ${bookings.length > 0
                            ? 'visible'
                            : 'hidden'}`
                    }
                >
                    Datum ändern
                </Button>
            </div>
        ),
    );
    ExampleCustomInput.displayName = 'ExampleCustomInput';

    const displayDataBookings = dataSourceBookings && dataSourceBookings.length > 0;

    return (
        <>
            <div className="px-2 md:space-y-2">
                <div className='flex items-center space-x-2 h-[2.5em] justify-between'>
                    <Heading variant="h3">Aufträge</Heading>
                    <div className='w-[10em]'>
                        <DatePicker
                            ref={datePickerRef}
                            withPortal
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            calendarClassName="move-bookings"
                            className="planner"
                            selected={startDate}
                            shouldCloseOnSelect={false}
                            dateFormat="dd.MM.yyyy"
                            onChange={(date: any) => {
                                setStartDate(date)
                            }}
                            customInput={<ExampleCustomInput />}
                        >
                            <div className="absolute z-10 left-[1.5em] bottom-[1em] space-x-4 w-1/2 h-[3em]">
                                <button
                                    disabled={!startDate}
                                    type="button"
                                    className={`${(!startDate)
                                        ? 'cursor-not-allowed pointer-events-none bg-[#e9e8ea]'
                                        : 'bg-black text-brand-white'}  rounded py-3 px-4`}
                                    onClick={() => {
                                        handleSave();
                                        closeDataPicker()
                                    }}>
                                    Speichern
                                </button>
                            </div>
                        </DatePicker>
                    </div>
                </div>
                <div className="md:h-[26.5em] lg:h-[26.5em] overflow-hidden rounded">
                    <div className="md:my-[1em] w-[100%] mx-auto md:flex md:h-auto">
                        <div className="flex justify-start md:!grid lg:!grid grid-cols-8 gap-2 w-full [&>*]:font-semibold
                            [&>*]:uppercase place-items-center py-[0.5em] [&>:not(:first-child)]:hidden [&>:not(:first-child)]:md:grid"
                        >
                            <div className='mx-[0.75em] flex space-x-3 [&>:last-child]:md:hidden'>
                                <Checkbox
                                    id="Checkbox All"
                                    onChange={handleSelectAllBookings}
                                    checked={bookings.length > 0}
                                />
                                <Text>Alle auswählen</Text>
                            </div>
                            <Text>Bild</Text>
                            {/* <div onClick={() => handleSort('objectModel')} className="cursor-pointer">
                                <Text>
                                    Objekt {sortColumn === 'objectModel' && (sortDirection === 'asc' ? '↑' : '↓')}
                                </Text>
                            </div> */}
                            <div onClick={() => handleSort('objectStatus')} className="col-span-2 cursor-pointer">
                                <Text>
                                    Status {sortColumn === 'objectStatus' && (sortDirection === 'asc' ? '↑' : '↓')}
                                </Text>
                            </div>
                            <div onClick={() => handleSort('date')} className="cursor-pointer">
                                <Text customClasses="col-span-2">
                                    Date {sortColumn === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
                                </Text>
                            </div>
                            <div onClick={() => handleSort('street')} className="col-span-2 cursor-pointer">
                                <Text customClasses="col-span-2">
                                    Adresse {sortColumn === 'street' && (sortDirection === 'asc' ? '↑' : '↓')}
                                </Text>
                            </div>
                            <Text>Edit</Text>
                        </div>
                    </div>
                    {dataSourceBookings && dataSourceBookings.length === 0 && !isLoading && (
                        <div className="p-10">Keine Aufträge für dieses Datum</div>
                    )}
                    {isLoading && (
                        <>
                            <div className='absolute p-10'>
                                Aufträge werden geladen
                            </div>
                            <Loader pos='relative' />
                        </>
                    )}
                    <div
                        className={`showScrollBars overflow-y-auto overflow-x-hidden max-h-[50vh] md:pb-[8em] rounded transition-opacity duration-200 
                            border border-1 md:!border-0 ${displayDataBookings ? 'opacity-100' : 'opacity-0'}`}
                    >
                        {sortedBookings.map((item, i) => (
                            <div
                                className="flex mb-2 cursor-default md:py-1 md:my-2 transition-color hover:bg-slate-100"
                                key={i}
                            >
                                <Booking
                                    data={item}
                                    objectStatus={objectStatus}
                                    objectModel={objectModel}
                                    handleAddBooking={handleAddBooking}
                                    isChecked={bookings.includes(item)}
                                    currentPlanDate={currentPlanDate}
                                    currentBookingDate={currentBookingDate}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
