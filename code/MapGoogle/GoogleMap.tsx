import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useAppContext } from '@/context/appContext';

interface Props {
    routesData?: any;
    lat?: string;
    lng?: string;
    bookingData?: any;
    dataSourceSelectedPlan?: any
    dataSourceRiders?: any
}

const getColor = (index: number, pickupStatus: string) => {
    const colors = ['#00671B', '#D10411', '#043ED1', '#FFCB42'];
    const color = colors[index % colors.length];
    return pickupStatus === 'COMPLETED' ? `${color}80` : color;
};

const getPolylineColor = (index: number, pickupStatus: string) => {
    const colors = ['#00671B', '#D10411', '#043ED1', '#FFCB42'];
    const color = colors[index % colors.length];
    return pickupStatus === 'COMPLETED' ? `${color}80` : color;
};

function GoogleMapPlanner({ routesData, bookingData, lat, lng, dataSourceSelectedPlan, dataSourceRiders }: Props) {
    const { tenantCoord } = useAppContext();
    const [selectedMarker, setSelectedMarker] = useState<any>(null);

    const center = {
        lat: tenantCoord && !isNaN(tenantCoord[1]) ? tenantCoord[1] : 0,
        lng: tenantCoord && !isNaN(tenantCoord[0]) ? tenantCoord[0] : 0
    };

    const containerStyle = {
        width: '100%',
        height: '100%',
        opacity: tenantCoord.length > 0 ? '100' : '0'
    };

    const defaultIcon = typeof google !== 'undefined' ? {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#000000',
        fillOpacity: 1,
        strokeColor: '#000000',
        strokeWeight: 1,
        scale: 10
    } : undefined;

    const drawPolylines = (map: google.maps.Map) => {
        if (!routesData) return;

        routesData.forEach((route: any, tourIndex: number) => {
            const coordinates = route.booking
                .filter((booking: any, i: number, arr: any[]) => {
                    if (i === 0) return true;
                    return !(arr[i - 1].pickupStatus === 'COMPLETED' && booking.pickupStatus === 'COMPLETED');
                })
                .map((booking: any) => ({
                    lat: parseFloat(booking.lat),
                    lng: parseFloat(booking.lng),
                }));

            if (coordinates.length > 1) {
                const polylineColor = getPolylineColor(tourIndex, route.booking.some((b: any) => b.pickupStatus === 'COMPLETED') ? 'COMPLETED' : '');

                new google.maps.Polyline({
                    path: coordinates,
                    geodesic: true,
                    strokeColor: polylineColor,
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                    map: map,
                });
            }
        });
    };

    const zIndexMap = {
        bookingData: 1,
        dataSourceSelectedPlan: 2,
        routesData: 3
    };

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={11}
            options={{
                mapTypeId: 'roadmap',
                streetViewControl: false,
                mapTypeControl: false,
            }}
            onLoad={(map) => {
                drawPolylines(map);
            }}
        >
            {bookingData && bookingData.map((item: any) => {

                return (
                    <Marker
                        key={item.id}
                        position={{ lat: parseFloat(item.location.latitude), lng: parseFloat(item.location.longitude) }}
                        title={item.name}
                        icon={defaultIcon}
                        options={{ zIndex: zIndexMap.bookingData }}
                    />
                )
            })}
            {lat && lng && (
                <Marker
                    key='marker'
                    position={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
                    title='Default Marker'
                    icon={defaultIcon}
                    options={{ zIndex: zIndexMap.bookingData }}
                />
            )}
            {/* {dataSourceSelectedPlan && dataSourceSelectedPlan.map((item: any) =>
                item.booking.map((booking: any) => {
                    console.log(booking)
                    return (
                        <></>
                    )
                }))} */}

            {dataSourceSelectedPlan && dataSourceSelectedPlan.map((item: any, routeIndex: any) =>
                item.bookings.map((booking: any) => {

                    const color = getColor(routeIndex, booking.pickupStatus);
                    const icon = typeof google !== 'undefined' ? {
                        path: google.maps.SymbolPath.CIRCLE,
                        fillColor: color,
                        fillOpacity: 1,
                        strokeColor: color,
                        strokeWeight: 1,
                        scale: 10,
                    } : undefined;

                    return (
                        <Marker
                            key={booking.id}
                            position={{ lat: parseFloat(booking.location.latitude), lng: parseFloat(booking.location.longitude) }}
                            //title={`Name: ${route.rider?.user?.firstName || 'Unknown'} ${route.rider?.user?.lastName || ''} | Sequence: ${booking.sequence}`}
                            icon={icon}
                            onClick={() => setSelectedMarker({
                                lat: parseFloat(booking.location.latitude),
                                lng: parseFloat(booking.location.longitude),
                                //info: `Name: ${rider?.user?.firstName || 'Unknown'} ${rider?.user?.lastName || ''} | Sequence: ${booking.sequence}`
                            })}
                            options={{ zIndex: zIndexMap.dataSourceSelectedPlan }}
                        />
                    )
                }))}

            {dataSourceSelectedPlan && dataSourceSelectedPlan.flatMap((route: any, routeIndex: number) =>
                route.booking.sort((a: any, b: any) => a.sequence - b.sequence).map((booking: any) => {
                    const rider = dataSourceRiders && dataSourceRiders.find((rider: any) => rider.id === route.riderId);
                    const color = getColor(routeIndex, booking.pickupStatus);
                    const icon = typeof google !== 'undefined' ? {
                        path: google.maps.SymbolPath.CIRCLE,
                        fillColor: color,
                        fillOpacity: 1,
                        strokeColor: color,
                        strokeWeight: 1,
                        scale: 10,
                    } : undefined;

                    return (
                        <Marker
                            key={booking.id}
                            position={{ lat: parseFloat(booking.lat), lng: parseFloat(booking.lng) }}
                            title={`Name: ${route.rider?.user?.firstName || 'Unknown'} ${route.rider?.user?.lastName || ''} | Sequence: ${booking.sequence}`}
                            icon={icon}
                            onClick={() => setSelectedMarker({
                                lat: parseFloat(booking.lat),
                                lng: parseFloat(booking.lng),
                                info: `Name: ${rider?.user?.firstName || 'Unknown'} ${rider?.user?.lastName || ''} | Sequence: ${booking.sequence}`
                            })}
                            options={{ zIndex: zIndexMap.dataSourceSelectedPlan }}
                        />
                    );
                })
            )}
            {routesData && routesData.flatMap((route: any, routeIndex: number) =>
                route.booking.sort((a: any, b: any) => a.sequence - b.sequence).map((booking: any) => {
                    const color = getColor(routeIndex, booking.pickupStatus);
                    const icon = typeof google !== 'undefined' ? {
                        path: google.maps.SymbolPath.CIRCLE,
                        fillColor: color,
                        fillOpacity: 1,
                        strokeColor: color,
                        strokeWeight: 1,
                        scale: 10,
                    } : undefined;

                    return (
                        <Marker
                            key={booking.id}
                            position={{ lat: parseFloat(booking.lat), lng: parseFloat(booking.lng) }}
                            title={`Name: ${route.rider?.user?.firstName || 'Unknown'} ${route.rider?.user?.lastName || ''} | Sequence: ${booking.sequence}`}
                            icon={icon}
                            onClick={() => setSelectedMarker({
                                lat: parseFloat(booking.lat),
                                lng: parseFloat(booking.lng),
                                info: `Name: ${route.rider?.user?.firstName || 'Unknown'} ${route.rider?.user?.lastName || ''} | Sequence: ${booking.sequence}`
                            })}
                            options={{ zIndex: zIndexMap.routesData }}
                        />
                    );
                })
            )}
            {selectedMarker && (
                <InfoWindow
                    position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                    onCloseClick={() => setSelectedMarker(null)}
                >
                    <div style={{ fontSize: '1.2em' }}>
                        <p>{selectedMarker.info}</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}

export default React.memo(GoogleMapPlanner);
