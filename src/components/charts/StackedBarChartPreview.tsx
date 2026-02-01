
import React from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip, Legend as RechartsLegend, ResponsiveContainer, Bar as RechartsBar } from "recharts";

function getStackedBarData() {
  const labels = ["A", "B", "C", "D", "E", "F"];
  return labels.map(label => ({
    label,
    value1: Math.floor(Math.random() * 100) + 10,
    value2: Math.floor(Math.random() * 100) + 10
  }));
}

export default function StackedBarChartPreview() {
  const stackedData = getStackedBarData();
  return (
    <div className="w-full h-40">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={stackedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <RechartsTooltip />
          <RechartsLegend />
          <RechartsBar dataKey="value1" stackId="a" fill="#6366f1" />
          <RechartsBar dataKey="value2" stackId="a" fill="#16b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
