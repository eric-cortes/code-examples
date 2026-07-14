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

function GoogleMapPlanner({ lat, lng }: Props) {
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
        >
            {lat && lng && (
                <Marker
                    key='marker'
                    position={{ lat: parseFloat(lat), lng: parseFloat(lng) }
                    }
                    title='Default Marker'
                    icon={defaultIcon}
                    options={{ zIndex: zIndexMap.bookingData }}
                />
            )}
            {selectedMarker && (
                <InfoWindow
                    position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                    onCloseClick={() => setSelectedMarker(null)
                    }
                >
                    <div style={{ fontSize: '1.2em' }}>
                        <p>{selectedMarker.info} </p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}

export default React.memo(GoogleMapPlanner);
