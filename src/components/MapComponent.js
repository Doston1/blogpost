import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const MapComponent = ({ lat, lng }) => {
  const mapRef = useRef(null);

  // I used useEffect because an issue I had of the map not showing the marker at the center.
  // Each time lat or lang change, the effect will re run and update the map center.
  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      const position = [lat, lng];
      map.setView(position, map.getZoom(), { animate: true }); // Update map center
    }
  }, [lat, lng]); // Re-run effect when lat or lng changes

  const customIcon = new L.Icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"), // Use the default Leaflet marker image
    iconSize: [25, 41], // Size of the marker
    iconAnchor: [12, 41], // Point of the marker that will correspond to the position
    popupAnchor: [1, -34], // Position of the popup relative to the marker
  });

  if (!lat || !lng) {
    return <div>Loading map...</div>;
  }

  return (
    <div className="leaflet-container">
      {/* Use the lat, lng as key to force a re-initialization of the map */}
      <MapContainer
        center={[lat, lng]}
        zoom={10}
        scrollWheelZoom={true}
        key={`${lat}-${lng}`} // Key forces re-initialization on location change
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance; // Store map instance
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={customIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
