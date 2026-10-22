import Image from "next/image";
import { useState, type SyntheticEvent } from "react";
import { Button, Heading, Text } from "rds-ui-system";
import { mutate } from "swr";

import PlannerMap from "@/components/MapGoogle/PlannerMap";
import { useAppContext } from "@/context/appContext";
import useObjectsStore from "@/stores/objectsStore";
import { convertToNormalDate } from "@/util/goodies";

type Booking = {
	id: string;
	imageId?: string;
	imageUrl?: string;
	objectStatusIds?: string[];
	objectModelId?: string;
	objectCategoryId?: string;
	carId?: string;
	location?: { latitude: number | string; longitude: number | string };
	locationAddress?: { street?: string; number?: string; postCode?: string; locality?: string; place?: string; region?: string; country?: string };
	timestamp?: string;
	lastModified?: string;
	priority?: string;
};
type NamedResource = { id: string; name: string };
type Props = { setOpenModaEditBooking: (value: boolean) => void; formData: Booking; currentBookingDate: string };

export default function BookingEditForm({ setOpenModaEditBooking, formData, currentBookingDate }: Props) {
	const { currentTenant } = useAppContext();
	const { objectStatus, objectModel, objectCats } = useObjectsStore((state) => state.objectsData);
	const [saveState, setSaveState] = useState<"idle" | "saving" | "error">("idle");
	const isValidImageUrl = formData.imageUrl?.startsWith("https://") ?? false;
	const statuses = objectStatus.data as NamedResource[];
	const models = objectModel.data as NamedResource[];
	const categories = objectCats.data as NamedResource[];
	const statusNames = statuses.filter((status) => formData.objectStatusIds?.includes(status.id)).map((status) => status.name).join(", ");
	const modelName = models.find((model) => model.id === formData.objectModelId)?.name;
	const categoryName = categories.find((category) => category.id === formData.objectCategoryId)?.name;

	const save = async (event: SyntheticEvent) => {
		event.preventDefault();
		setSaveState("saving");
		try {
			const response = await fetch(`/api/booking/${encodeURIComponent(formData.id)}?tenantId=${encodeURIComponent(currentTenant)}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
			if (!response.ok) throw new Error("Unable to save booking");
			await mutate(`/api/booking?day=${currentBookingDate}&tenantid=${currentTenant}`);
			setOpenModaEditBooking(false);
		} catch {
			setSaveState("error");
		}
	};
	const address = [formData.locationAddress?.street, formData.locationAddress?.number, formData.locationAddress?.postCode, formData.locationAddress?.place].filter(Boolean).join(" ");

	return <form onSubmit={save} className="w-full space-y-4"><Heading variant="h2">Auftrag bearbeiten</Heading><div className="flex space-x-2"><div className="flex h-[10em] w-1/2 overflow-hidden rounded border bg-brand-grey-light md:h-[15em]">{isValidImageUrl ? <Image src={formData.imageUrl as string} width={500} height={500} alt="Booking" className="object-contain" /> : <Text customClasses="p-2">Kein Bild verfügbar</Text>}</div><div className="flex h-[10em] w-1/2 overflow-hidden rounded border md:h-[15em]"><PlannerMap lat={String(formData.location?.latitude ?? "")} lng={String(formData.location?.longitude ?? "")} /></div></div><div className="space-y-4"><Heading variant="h2">{categoryName || "Nicht eingegeben"}</Heading><div className="grid grid-cols-2 gap-2"><div><Text bold>Erstellt am</Text><Text>{convertToNormalDate(formData.timestamp) ?? "Nicht eingegeben"}</Text></div><div><Text bold>Aktualisiert am</Text><Text>{convertToNormalDate(formData.lastModified) ?? "Nicht eingegeben"}</Text></div><div><Text bold>Model</Text><Text>{modelName || "Nicht eingegeben"}</Text></div><div><Text bold>Status</Text><Text>{statusNames || "Keine Zuständigkeiten"}</Text></div></div><div><Text bold>Adresse</Text><Text>{address || "Nicht eingegeben"}</Text></div><div className="flex justify-between gap-1"><Button type="button" isOutlined variant="ICONPLUS" iconName="Close" customClasses="w-1/2 border-brand-button" onClick={() => setOpenModaEditBooking(false)}>Schliessen</Button><Button type="submit" variant="ICONPLUS" iconName="Done" customClasses="w-1/2 bg-brand-button border-brand-button" isDisabled={saveState === "saving"}>{saveState === "saving" ? "Speichert..." : "Speichern"}</Button></div>{saveState === "error" && <Text>Speichern fehlgeschlagen.</Text>}</div></form>;
}
