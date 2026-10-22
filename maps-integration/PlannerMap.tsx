import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

import { useAppContext } from "@/context/appContext";

type Props = { lat?: string; lng?: string };

function toPosition(lat?: string | number, lng?: string | number) {
	const latitude = Number(lat);
	const longitude = Number(lng);
	return Number.isFinite(latitude) && Number.isFinite(longitude) ? { lat: latitude, lng: longitude } : null;
}

function PlannerMap({ lat, lng }: Props) {
	const { tenantCoord } = useAppContext();
	const position = toPosition(lat, lng);
	const center = position ?? toPosition(tenantCoord?.[1], tenantCoord?.[0]) ?? { lat: 0, lng: 0 };
	return <GoogleMap mapContainerStyle={{ width: "100%", height: "100%" }} center={center} zoom={position ? 16 : 11} options={{ mapTypeId: "roadmap", streetViewControl: false, mapTypeControl: false }}>
		{position && <Marker position={position} title="Booking location" />}
	</GoogleMap>;
}

export default React.memo(PlannerMap);
