
import React from "react";
import { ScatterChart, CartesianGrid, XAxis, YAxis, ZAxis, Tooltip as RechartsTooltip, Scatter, ResponsiveContainer } from "recharts";

function getScatterChartData() {
  return Array.from({ length: 8 }, () => ({
    x: Math.floor(Math.random() * 80),
    y: Math.floor(Math.random() * 80),
    z: Math.floor(Math.random() * 200) + 30,
  }));
}

export default function ScatterChartPreview() {
  const scatterData = getScatterChartData();
  return (
    <div className="w-full h-40">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart>
          <CartesianGrid />
          <XAxis dataKey="x" name="X Axis" />
          <YAxis dataKey="y" name="Y Axis" />
          <ZAxis dataKey="z" range={[60, 200]} name="Score"/>
          <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Series A" data={scatterData} fill="#6366f1" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
