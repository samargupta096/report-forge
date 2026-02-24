import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Dummy data for cities
const cityData = [
  { name: "Mumbai", coords: [19.0760, 72.8777], sales: "₹1.2M" },
  { name: "Bengaluru", coords: [12.9716, 77.5946], sales: "₹900K" },
  { name: "Hyderabad", coords: [17.3850, 78.4867], sales: "₹750K" },
  { name: "Chennai", coords: [13.0827, 80.2707], sales: "₹600K" },
  { name: "Pune", coords: [18.5204, 73.8567], sales: "₹500K" },
];

export default function CityMapChart() {
  return (
    <div className="w-full h-40 sm:h-64 rounded overflow-hidden relative z-0">
      <MapContainer
        center={[17.5937, 76.9629]}
        zoom={4}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">Carto</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {cityData.map((city, idx) => (
          <Marker key={idx} position={city.coords as [number, number]}>
            <Popup>
              <strong>{city.name}</strong>
              <br />
              Sales: {city.sales}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
