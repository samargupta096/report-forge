
import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
  LabelList,
} from "recharts";

// Recharts doesn't have a built-in HeatMap, so use Cell coloring in a ComposedChart (with Bar shapes)
// Data grid: x = Region, y = Month, value = number

const sampleData = [
  { region: "North", Jan: 67, Feb: 45, Mar: 70, Apr: 55, May: 90, Jun: 62 },
  { region: "South", Jan: 30, Feb: 47, Mar: 68, Apr: 49, May: 75, Jun: 69 },
  { region: "East",  Jan: 55, Feb: 40, Mar: 55, Apr: 35, May: 60, Jun: 50 },
  { region: "West",  Jan: 42, Feb: 51, Mar: 80, Apr: 60, May: 82, Jun: 75 },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

// Helper for color scale (simple gradient green:red)
function getHeatColor(value: number, min: number, max: number) {
  // value scale: green (low), yellow (mid), red (high)
  const percent = (value - min) / (max - min + 0.01);
  if (percent < 0.33) return "#bbf7d0"; // light green
  if (percent < 0.66) return "#fde68a"; // yellow
  return "#fca5a5"; // light red
}

export default function HeatMapChartPreview() {
  // Flatten for min/max value
  const allValues = sampleData.flatMap(region =>
    months.map(month => region[month as keyof typeof region] as number)
  );
  const minVal = Math.min(...allValues);
  const maxVal = Math.max(...allValues);

  return (
    <div className="w-full h-40 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          layout="vertical"
          data={sampleData}
          margin={{ top: 10, right: 20, bottom: 10, left: 40 }}
        >
          <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
          <XAxis type="number" dataKey="x" hide />
          <YAxis
            type="category"
            dataKey="region"
            tick={{ fontSize: 12, fontWeight: 500, fill: "#6366f1" }}
            width={70}
          />
          <Tooltip
            formatter={(value, name, props) => [`${value}`, name]}
            labelFormatter={label => `Region: ${label}`}
            contentStyle={{ fontSize: 12 }}
          />
          <Legend
            payload={[
              { value: "Low", color: "#bbf7d0" },
              { value: "Medium", color: "#fde68a" },
              { value: "High", color: "#fca5a5" },
            ]}
            verticalAlign="top"
            height={24}
          />
          {
            // For each month, make a Bar with a cell for each region
            months.map(month => (
              <BarHeat
                key={month}
                month={month}
                minVal={minVal}
                maxVal={maxVal}
              />
            ))
          }
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

// Custom Bar that renders just the colored cells horizontally
import { Bar } from "recharts";
function BarHeat({
  month,
  minVal,
  maxVal,
}: {
  month: string;
  minVal: number;
  maxVal: number;
}) {
  return (
    <Bar
      dataKey={month}
      stackId="a"
      barSize={20}
      radius={[3, 3, 3, 3]}
      isAnimationActive={false}
    >
      <LabelList
        dataKey={month}
        position="center"
        style={{ fill: "#333", fontSize: 12 }}
      />
      {sampleData.map((entry, idx) => (
        <Cell
          key={idx}
          fill={getHeatColor(entry[month as keyof typeof entry] as number, minVal, maxVal)}
        />
      ))}
    </Bar>
  );
}
