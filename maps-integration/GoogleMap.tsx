import React, { useCallback, useMemo, useRef, useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";

import { useAppContext } from "@/context/appContext";

type Coordinates = { lat: number | string; lng: number | string };
type Booking = {
	id: string;
	name?: string;
	sequence?: number;
	pickupStatus?: string;
	location?: { latitude: number | string; longitude: number | string };
	lat?: number | string;
	lng?: number | string;
};
type Route = { id?: string; riderId?: string; rider?: { user?: { firstName?: string; lastName?: string } }; bookings?: Booking[] };
type Rider = { id: string; user?: { firstName?: string; lastName?: string } };

type Props = {
	routesData?: Route[];
	lat?: string;
	lng?: string;
	bookingData?: Booking[];
	dataSourceSelectedPlan?: Route[];
	dataSourceRiders?: Rider[];
};

type SelectedMarker = { lat: number; lng: number; info?: string };

const ROUTE_COLORS = ["#00671B", "#D10411", "#043ED1", "#FFCB42"];
const MAP_STYLE = { width: "100%", height: "100%" };

function getRouteColor(index: number, pickupStatus?: string): string {
	const color = ROUTE_COLORS[index % ROUTE_COLORS.length];
	return pickupStatus === "COMPLETED" ? `${color}80` : color;
}

function toPosition(coordinates?: Coordinates) {
	const lat = Number(coordinates?.lat);
	const lng = Number(coordinates?.lng);
	return Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
}

function getBookingPosition(booking: Booking) {
	return booking.location
		? toPosition({ lat: booking.location.latitude, lng: booking.location.longitude })
		: toPosition({ lat: booking.lat, lng: booking.lng });
}

function getMarkerIcon(color: string): google.maps.Symbol | undefined {
	if (typeof google === "undefined") return undefined;
	return {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: color,
		fillOpacity: 1,
		strokeColor: color,
		strokeWeight: 1,
		scale: 10,
	};
}

function getRouteBookings(route: Route): Booking[] {
	return route.bookings ?? [];
}

function GoogleMapPlanner({ routesData = [], bookingData = [], lat, lng, dataSourceSelectedPlan = [], dataSourceRiders = [] }: Props) {
	const { tenantCoord } = useAppContext();
	const [selectedMarker, setSelectedMarker] = useState<SelectedMarker | null>(null);
	const polylinesRef = useRef<google.maps.Polyline[]>([]);
	const center = toPosition({ lat: tenantCoord?.[1], lng: tenantCoord?.[0] }) ?? { lat: 0, lng: 0 };
	const standalonePosition = toPosition({ lat, lng });

	const drawPolylines = useCallback((map: google.maps.Map) => {
		polylinesRef.current.forEach((polyline) => polyline.setMap(null));
		const polylines = routesData.flatMap((route, routeIndex) => {
			const positions = getRouteBookings(route)
				.filter((booking, index, bookings) => index === 0 || !(bookings[index - 1].pickupStatus === "COMPLETED" && booking.pickupStatus === "COMPLETED"))
				.map(getBookingPosition)
				.filter((position): position is google.maps.LatLngLiteral => position !== null);
			if (positions.length < 2) return [];
			return [new google.maps.Polyline({ path: positions, geodesic: true, strokeColor: getRouteColor(routeIndex), strokeOpacity: 1, strokeWeight: 2, map })];
		});
		polylinesRef.current = polylines;
	}, [routesData]);

	const selectedRouteMarkers = useMemo(
		() => dataSourceSelectedPlan.flatMap((route, routeIndex) =>
			[...getRouteBookings(route)].sort((a, b) => (a.sequence ?? 0) - (b.sequence ?? 0)).map((booking) => ({ booking, route, routeIndex })),
		),
		[dataSourceSelectedPlan],
	);

	return (
		<GoogleMap
			mapContainerStyle={{ ...MAP_STYLE, opacity: tenantCoord?.length ? 1 : 0 }}
			center={center}
			zoom={11}
			options={{ mapTypeId: "roadmap", streetViewControl: false, mapTypeControl: false }}
			onLoad={(map) => drawPolylines(map)}
		>
			{bookingData.map((booking) => {
				const position = getBookingPosition(booking);
				return position ? <Marker key={`booking-${booking.id}`} position={position} title={booking.name} icon={getMarkerIcon("#000000")} options={{ zIndex: 1 }} /> : null;
			})}
			{standalonePosition && <Marker position={standalonePosition} title="Booking location" icon={getMarkerIcon("#000000")} options={{ zIndex: 1 }} />}
			{selectedRouteMarkers.map(({ booking, route, routeIndex }) => {
				const position = getBookingPosition(booking);
				if (!position) return null;
				const rider = dataSourceRiders.find((candidate) => candidate.id === route.riderId) ?? route.rider;
				const info = `Name: ${rider?.user?.firstName ?? "Unknown"} ${rider?.user?.lastName ?? ""} | Sequence: ${booking.sequence ?? "-"}`;
				return <Marker key={`plan-${route.id ?? routeIndex}-${booking.id}`} position={position} title={info} icon={getMarkerIcon(getRouteColor(routeIndex, booking.pickupStatus))} onClick={() => setSelectedMarker({ ...position, info })} options={{ zIndex: 2 }} />;
			})}
			{routesData.flatMap((route, routeIndex) => getRouteBookings(route).map((booking) => ({ booking, route, routeIndex }))).map(({ booking, route, routeIndex }) => {
				const position = getBookingPosition(booking);
				if (!position) return null;
				const info = `Name: ${route.rider?.user?.firstName ?? "Unknown"} ${route.rider?.user?.lastName ?? ""} | Sequence: ${booking.sequence ?? "-"}`;
				return <Marker key={`route-${route.id ?? routeIndex}-${booking.id}`} position={position} title={info} icon={getMarkerIcon(getRouteColor(routeIndex, booking.pickupStatus))} onClick={() => setSelectedMarker({ ...position, info })} options={{ zIndex: 3 }} />;
			})}
			{selectedMarker && <InfoWindow position={selectedMarker} onCloseClick={() => setSelectedMarker(null)}><div className="text-base"><p>{selectedMarker.info}</p></div></InfoWindow>}
		</GoogleMap>
	);
}

export default React.memo(GoogleMapPlanner);
