import L, { LatLngExpression, LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import {
	MapContainer,
	Marker,
	TileLayer,
	useMap,
	useMapEvents
} from 'react-leaflet';

interface MapProps {
	center: LatLngExpression;
	onMapClick?: (e: LeafletMouseEvent) => void;
}

const MapEvents = ({
	onMapClick
}: {
	onMapClick?: (e: LeafletMouseEvent) => void;
}) => {
	useMapEvents({
		click: e => {
			if (onMapClick) {
				onMapClick(e);
			}
		}
	});
	return null;
};

const MapUpdater = ({ center }: { center: LatLngExpression }) => {
	const map = useMap();
	React.useEffect(() => {
		map.setView(center, map.getZoom());
	}, [center, map]);
	return null;
};

export const Map = ({
	center,
	markerPosition,
	onMapClick
}: MapProps & { markerPosition: LatLngExpression }) => {
	// Исправляем проблему с маркерами в Next.js
	const icon = L.icon({
		iconUrl: '/images/marker-icon.png',
		iconRetinaUrl: '/images/marker-icon-2x.png',
		shadowUrl: '/images/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
	});

	return (
		<MapContainer
			center={center}
			zoom={13}
			style={{ height: '100%', width: '100%', zIndex: 1 }}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			{markerPosition && <Marker position={markerPosition} icon={icon} />}
			<MapEvents onMapClick={onMapClick} />
			<MapUpdater center={center} />
		</MapContainer>
	);
};
