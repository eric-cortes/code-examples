import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

type Props = { lat?: string; lng?: string };

function toPosition(lat?: string, lng?: string) {
	const latitude = Number(lat);
	const longitude = Number(lng);
	return Number.isFinite(latitude) && Number.isFinite(longitude) ? { lat: latitude, lng: longitude } : null;
}

function BookingMap({ lat, lng }: Props) {
	const position = toPosition(lat, lng);
	return <GoogleMap mapContainerStyle={{ width: "100%", height: "100%" }} center={position ?? { lat: 0, lng: 0 }} zoom={16} options={{ mapTypeId: "roadmap", streetViewControl: false, mapTypeControl: false }}>
		{position && <Marker position={position} title="Booking location" />}
	</GoogleMap>;
}

export default React.memo(BookingMap);
