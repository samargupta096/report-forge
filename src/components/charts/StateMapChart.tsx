import React from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Dummy data for states (simplified coordinates)
const stateData = [
  { name: "Maharashtra", coords: [19.7515, 75.7139], value: 120, color: "#ef4444" },
  { name: "Karnataka", coords: [15.3173, 75.7139], value: 85, color: "#3b82f6" },
  { name: "Delhi", coords: [28.7041, 77.1025], value: 150, color: "#10b981" },
  { name: "Tamil Nadu", coords: [11.1271, 78.6569], value: 95, color: "#f59e0b" },
  { name: "Gujarat", coords: [22.2587, 71.1924], value: 110, color: "#8b5cf6" },
];

export default function StateMapChart() {
  return (
    <div className="w-full h-40 sm:h-64 rounded overflow-hidden relative z-0">
      <MapContainer
        center={[22.5937, 78.9629]}
        zoom={3}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {stateData.map((state, idx) => (
          <CircleMarker
            key={idx}
            center={state.coords as [number, number]}
            pathOptions={{ color: state.color, fillColor: state.color, fillOpacity: 0.7 }}
            radius={Math.max(5, state.value / 10)}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={1}>
              <strong>{state.name}</strong>
              <br />
              Metric: {state.value}
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
