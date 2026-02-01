
import React from "react";
import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  CartesianGrid,
} from "recharts";

// Simple mock OHLC data for demo
const data = [
  { name: "Mon", open: 32, close: 35, high: 40, low: 30 },
  { name: "Tue", open: 35, close: 38, high: 41, low: 34 },
  { name: "Wed", open: 38, close: 33, high: 39, low: 31 },
  { name: "Thu", open: 33, close: 40, high: 44, low: 33 },
  { name: "Fri", open: 40, close: 42, high: 43, low: 39 },
];

// Custom candle "wick" shape for bar
function CandleBar({ x, y, width, height, fill, payload }) {
  const midX = x + width / 2;
  const o = payload.open;
  const c = payload.close;
  const h = payload.high;
  const l = payload.low;
  // y-coord mapping: higher value means lower on the chart
  const yHigh = y + ((Math.max(o, c) - h) / (h - l)) * height;
  const yLow = y + ((Math.max(o, c) - l + (Math.min(o, c) - Math.max(o, c))) / (h - l)) * height;
  const rectY = y + ((Math.max(o, c) - Math.max(o, c)) / (h - l)) * height;
  const rectHeight = Math.abs(o - c) / (h - l) * height || 2;

  return (
    <g>
      {/* Wick */}
      <line
        x1={midX}
        x2={midX}
        y1={y}
        y2={y + height}
        stroke="#666"
        strokeWidth={2}
      />
      {/* Candle body */}
      <rect
        x={x}
        y={rectY}
        width={width}
        height={rectHeight}
        fill={o > c ? "#f87171" : "#34d399"}
        stroke="#444"
        rx={1.5}
      />
    </g>
  );
}

export default function CandleStickChartPreview() {
  return (
    <div className="w-full h-52">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          {/* Candle bodies as bars with custom shape */}
          <Bar
            dataKey="close"
            minPointSize={6}
            barSize={18}
            shape={CandleBar}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
