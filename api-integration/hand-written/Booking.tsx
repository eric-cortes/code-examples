import Image from "next/image";
import { useState } from "react";
import { Button, Checkbox, Icon, Modal, Text } from "rds-ui-system";

import BookingEditForm from "./BookingEditForm";
import { convertToNormalDate } from "@/util/goodies";
import { useBreakpoint } from "@/util/useBreakpoint";

type ObjectStatus = { id: string; name: string };
type ObjectModel = { id: string; name: string; version: string };
type BookingData = {
	id: string;
	bookingDate?: string;
	imageUrl?: string;
	objectStatusIds?: string[];
	objectModelId?: string;
	locationAddress?: { street?: string; number?: string; postCode?: string; place?: string };
};

type Props = {
	data: BookingData;
	objectStatus: ObjectStatus[];
	objectModel: ObjectModel[];
	onToggle: (booking: BookingData) => void;
	isSelected: boolean;
	currentPlanDate: string;
	currentBookingDate: string;
};

function getModalWidth(breakpoint?: string): string {
	if (breakpoint === "lg" || breakpoint === "md") return "50em";
	return breakpoint === "sm" ? "36em" : "23em";
}

export default function Booking({ data, objectStatus, objectModel, onToggle, isSelected, currentPlanDate, currentBookingDate }: Props) {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const breakpoint = useBreakpoint();
	const imageUrl = data.imageUrl?.startsWith("https:") ? data.imageUrl : null;
	const statusNames = objectStatus.filter((status) => data.objectStatusIds?.includes(status.id)).map((status) => status.name).join(", ");
	const modelName = objectModel.find((model) => model.id === data.objectModelId)?.name;
	const address = [data.locationAddress?.street, data.locationAddress?.number, data.locationAddress?.postCode, data.locationAddress?.place].filter(Boolean).join(" ");

	return (
		<>
			<div className="relative flex w-full flex-col items-start gap-2 rounded bg-slate-100 p-2 md:grid md:grid-cols-8 md:place-items-center md:bg-transparent md:p-0">
				<div className="mx-[0.2em]"><Checkbox id={`booking-${data.id}`} onChange={() => onToggle(data)} checked={isSelected} /></div>
				<div className={`flex h-10 w-10 overflow-hidden rounded ${imageUrl ? "" : "bg-black"}`}>
					{imageUrl && <Image src={imageUrl} width={40} height={40} alt="Booking" className="object-cover" />}
				</div>
				<div className="col-span-2 flex max-w-full gap-3 overflow-hidden"><Text bold>Status</Text><Text title={statusNames}>{statusNames || "Nicht eingegeben"}</Text></div>
				<div className="flex gap-3"><Icon name="Place" /><Text>{convertToNormalDate(data.bookingDate) ?? "Nicht eingegeben"}</Text></div>
				<div className="col-span-2 flex max-w-full gap-3 overflow-hidden"><Icon name="CalendarToday" /><Text title={address}>{address || modelName || "Nicht eingegeben"}</Text></div>
				<Button type="button" variant="ICON" iconName="Edit" isOutlined customClasses="ml-auto w-[3em] md:mr-auto" onClick={() => setIsEditModalOpen(true)} />
			</div>
			{isEditModalOpen && (
				<Modal width={getModalWidth(breakpoint)} onClick={() => setIsEditModalOpen(false)} customClasses="overflow-scroll">
					<BookingEditForm setOpenModaEditBooking={setIsEditModalOpen} formData={data} currentPlanDate={currentPlanDate} currentBookingDate={currentBookingDate} />
				</Modal>
			)}
		</>
	);
}

export type { BookingData, ObjectModel, ObjectStatus };
