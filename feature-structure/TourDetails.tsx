"use client";

import { Heading, Text } from "rds-ui-system";

import TourDetailsComp from "@/components/Tours/TourDetailsComp";
import { StatusDone, StatusOpen, StatusStarted } from "@/components/UI";
import { useAppContext } from "@/context/appContext";
import useFetch from "@/hooks/useFetch";
import { convertToNormalDate } from "@/util/goodies";

type PickupStatus = "CONFIRMED" | "COMPLETED" | "CANCELLED";
type Booking = { id: string; sequence?: string; updatedAt?: string; pickupStatus: PickupStatus };
type Tour = { readableId: string; createdAt?: string; booking: Booking[]; rider?: { user?: { firstName?: string; lastName?: string } } };

function getTourStatus(bookings: Booking[]): "complete" | "open" | "in-progress" | null {
	if (bookings.length === 0) return null;
	const statuses = new Set(bookings.map((booking) => booking.pickupStatus));
	if (statuses.size === 1 && (statuses.has("COMPLETED") || statuses.has("CANCELLED"))) return "complete";
	if (!statuses.has("COMPLETED")) return "open";
	return "in-progress";
}

export default function TourDetailsList({ params }: { params: { id: string } }) {
	const { currentTenant } = useAppContext();
	const { data, error, isLoading } = useFetch<Tour>(`/api/tours/${encodeURIComponent(params.id)}?currentTenant=${encodeURIComponent(currentTenant)}`);
	if (isLoading) return <div className="p-2">Tour wird geladen</div>;
	if (error || !data) return <div className="p-2">Tour konnte nicht geladen werden.</div>;

	const confirmed = data.booking.filter((booking) => booking.pickupStatus === "CONFIRMED").toSorted((left, right) => Number(left.sequence ?? 0) - Number(right.sequence ?? 0));
	const activity = data.booking.filter((booking) => booking.pickupStatus !== "CONFIRMED").toSorted((left, right) => Date.parse(left.updatedAt ?? "") - Date.parse(right.updatedAt ?? ""));
	const status = getTourStatus(data.booking);

	return <div className="mx-auto w-full bg-white p-2 md:w-[90vw]">
		<Text bold><button type="button" className="cursor-pointer" onClick={() => history.back()}>Tour</button> &nbsp;&gt; Tour Details</Text>
		<div className="flex items-center space-x-4"><Text><span className="font-semibold">Tour ID</span> {data.readableId}, {convertToNormalDate(data.createdAt)}</Text><Text><span className="font-semibold">Fahrer</span> {data.rider?.user?.firstName} {data.rider?.user?.lastName}</Text>{status === "complete" && <StatusDone />}{status === "open" && <StatusOpen />}{status === "in-progress" && <StatusStarted />}</div>
		<Heading variant="h3">Austehende Abholungen</Heading>
		{confirmed.map((booking) => <TourDetailsComp key={booking.id} data={booking} />)}
		<Heading variant="h3">Tour Aktivitäten</Heading>
		{activity.map((booking) => <TourDetailsComp key={booking.id} data={booking} />)}
	</div>;
}
