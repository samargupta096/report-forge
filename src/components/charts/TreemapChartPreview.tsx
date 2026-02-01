
import React from "react";
import { Treemap, ResponsiveContainer, Tooltip } from "recharts";

const demoData = [
  { name: "Asia", size: 400 },
  { name: "North America", size: 300 },
  { name: "Europe", size: 300 },
  { name: "Africa", size: 200 },
  { name: "Oceania", size: 278 },
  { name: "South America", size: 189 },
];

export default function TreemapChartPreview() {
  return (
    <div className="w-full h-40">
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          width={400}
          height={160}
          data={demoData}
          dataKey="size"
          aspectRatio={4/2}
          stroke="#fff"
          fill="#6366f1"
        >
          <Tooltip
            content={({ payload }) => {
              if (!payload || !payload[0]) return null;
              const { name, size } = payload[0].payload;
              return (
                <div className="bg-white border border-gray-200 px-2 py-1 rounded shadow-md text-xs">
                  <b>{name}</b>: {size}
                </div>
              );
            }}
          />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
}
