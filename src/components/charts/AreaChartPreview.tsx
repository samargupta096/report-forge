
import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid, ResponsiveContainer } from "recharts";

function getAreaChartData() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return months.map((name) => ({
    name,
    uv: Math.floor(Math.random() * 100) + 40,
    pv: Math.floor(Math.random() * 50) + 20,
  }));
}

export default function AreaChartPreview() {
  const areaData = getAreaChartData();
  return (
    <div className="w-full h-40">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={areaData}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.7}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <RechartsTooltip />
          <Area type="monotone" dataKey="uv" stroke="#6366f1" fillOpacity={1} fill="url(#colorUv)" />
          <Area type="monotone" dataKey="pv" stroke="#16b981" fillOpacity={0.3} fill="#16b981" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
