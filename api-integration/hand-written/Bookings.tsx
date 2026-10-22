import { forwardRef, useEffect, useMemo, useRef, useState, type SyntheticEvent } from "react";
import DatePicker from "react-datepicker";
import { mutate } from "swr";
import { Button, Checkbox, Heading, Text } from "rds-ui-system";

import Booking, { type BookingData, type ObjectModel, type ObjectStatus } from "./Booking";
import { Loader } from "@/components/Loader/Loader";
import useFetch from "@/hooks/useFetch";
import useObjectsStore from "@/stores/objectsStore";

type Props = {
	currentBookingDate: string;
	currentPlanDate: string;
	currentTenant: string;
	selectedBookings: BookingData[];
	setSelectedBookings: React.Dispatch<React.SetStateAction<BookingData[]>>;
};

type DatePickerButtonProps = { onClick?: () => void; visible: boolean };
const DatePickerButton = forwardRef<HTMLButtonElement, DatePickerButtonProps>(({ onClick, visible }, ref) => (
	<Button ref={ref} type="button" customClasses={visible ? "visible" : "invisible"} onClick={onClick}>Datum ändern</Button>
));
DatePickerButton.displayName = "DatePickerButton";

export default function Bookings({ currentBookingDate, currentPlanDate, currentTenant, selectedBookings, setSelectedBookings }: Props) {
	const { objectsData } = useObjectsStore();
	const objectStatus = objectsData.objectStatus.data as ObjectStatus[];
	const objectModel = objectsData.objectModel.data as ObjectModel[];
	const [sortColumn, setSortColumn] = useState<"date" | "status" | "address">("date");
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
	const [startDate, setStartDate] = useState<Date | null>(new Date());
	const datePickerRef = useRef<DatePicker>(null);
	const endpoint = currentTenant && currentBookingDate ? `/api/booking?day=${currentBookingDate}&tenantid=${encodeURIComponent(currentTenant)}` : null;
	const { data: bookings = [], error, isLoading } = useFetch<BookingData[]>(endpoint, { keepPreviousData: true, revalidateOnFocus: false });

	useEffect(() => {
		const knownIds = new Set(bookings.map((booking) => booking.id));
		setSelectedBookings((current) => current.filter((booking) => knownIds.has(booking.id)));
	}, [bookings, setSelectedBookings]);

	const selectedIds = useMemo(() => new Set(selectedBookings.map((booking) => booking.id)), [selectedBookings]);
	const sortedBookings = useMemo(() => [...bookings].sort((left, right) => {
		const direction = sortDirection === "asc" ? 1 : -1;
		if (sortColumn === "date") return ((Date.parse(left.bookingDate ?? "") || 0) - (Date.parse(right.bookingDate ?? "") || 0)) * direction;
		const leftValue = sortColumn === "status" ? left.objectStatusIds?.join(",") ?? "" : left.locationAddress?.street ?? "";
		const rightValue = sortColumn === "status" ? right.objectStatusIds?.join(",") ?? "" : right.locationAddress?.street ?? "";
		return leftValue.localeCompare(rightValue) * direction;
	}), [bookings, sortColumn, sortDirection]);

	const toggleSort = (column: "date" | "status" | "address") => {
		setSortDirection((direction) => sortColumn === column && direction === "asc" ? "desc" : "asc");
		setSortColumn(column);
	};
	const toggleBooking = (booking: BookingData) => setSelectedBookings((current) => selectedIds.has(booking.id) ? current.filter(({ id }) => id !== booking.id) : [...current, booking]);
	const selectAll = (checked: boolean) => setSelectedBookings(checked ? bookings : []);
	const saveMove = async (event: SyntheticEvent) => {
		event.preventDefault();
		if (!startDate || selectedBookings.length === 0) return;
		const response = await fetch(`/api/booking/bulk?tenantId=${encodeURIComponent(currentTenant)}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ bookingDate: startDate.toISOString(), ids: selectedBookings.map(({ id }) => id) }),
		});
		if (!response.ok) throw new Error("Unable to move bookings");
		await mutate(endpoint);
		setSelectedBookings([]);
		datePickerRef.current?.setOpen(false);
	};

	return <div className="px-2 md:space-y-2">
		<div className="flex h-10 items-center justify-between"><Heading variant="h3">Aufträge</Heading><DatePicker ref={datePickerRef} selected={startDate} onChange={setStartDate} shouldCloseOnSelect={false} dateFormat="dd.MM.yyyy" customInput={<DatePickerButton visible={selectedBookings.length > 0} />}><button type="button" disabled={!startDate} onClick={(event) => void saveMove(event)}>Speichern</button></DatePicker></div>
		<div className="overflow-hidden rounded md:h-[26.5em]">
			<div className="grid grid-cols-8 place-items-center gap-2 py-2 font-semibold uppercase"><Checkbox id="select-all-bookings" onChange={(event: React.ChangeEvent<HTMLInputElement>) => selectAll(event.target.checked)} checked={bookings.length > 0 && selectedBookings.length === bookings.length} /><Text>Bild</Text><button type="button" className="col-span-2" onClick={() => toggleSort("status")}>Status</button><button type="button" onClick={() => toggleSort("date")}>Date</button><button type="button" className="col-span-2" onClick={() => toggleSort("address")}>Adresse</button><Text>Edit</Text></div>
			{error && <div className="p-10">Aufträge konnten nicht geladen werden.</div>}
			{isLoading && <Loader pos="relative" />}
			{!isLoading && !error && bookings.length === 0 && <div className="p-10">Keine Aufträge für dieses Datum</div>}
			<div className="showScrollBars max-h-[50vh] overflow-y-auto rounded">{sortedBookings.map((booking) => <div key={booking.id} className="mb-2 flex cursor-default md:my-2 md:py-1"><Booking data={booking} objectStatus={objectStatus} objectModel={objectModel} onToggle={toggleBooking} isSelected={selectedIds.has(booking.id)} currentPlanDate={currentPlanDate} currentBookingDate={currentBookingDate} /></div>)}</div>
		</div>
	</div>;
}
