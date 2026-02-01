import React from "react";
import BarChartPreview from "./charts/BarChartPreview";
import LineChartPreview from "./charts/LineChartPreview";
import PieChartPreview from "./charts/PieChartPreview";
import AreaChartPreview from "./charts/AreaChartPreview";
import ScatterChartPreview from "./charts/ScatterChartPreview";
import StackedBarChartPreview from "./charts/StackedBarChartPreview";
import HeatMapChartPreview from "./charts/HeatMapChartPreview";
import D3AdvancedChart from "./charts/D3AdvancedChart";
import D3PieChart from "./charts/D3PieChart";
import D3BarChart from "./charts/D3BarChart";
import D3IndiaMapChart from "./charts/D3IndiaMapChart";
import CandleStickChartPreview from "./charts/CandleStickChartPreview";
import CalendarHeatMapChartPreview from "./charts/CalendarHeatMapChartPreview";
import D3ViolinChartPreview from "./charts/D3ViolinChartPreview";
import D3SankeyChartPreview from "./charts/D3SankeyChartPreview";
import BubbleChartPreview from "./charts/BubbleChartPreview";
import ComboChartPreview from "./charts/ComboChartPreview";
import DonutChartPreview from "./charts/DonutChartPreview";
import TreemapChartPreview from "./charts/TreemapChartPreview";

type ChartPreviewProps = {
  type: string;
  onDataPointClick?: (info: { label: string; value: number }) => void;
  topRight?: React.ReactNode; // for export menu
  chartId?: string; // optional chartId for the container
};

export default function ChartPreview({ type, onDataPointClick, topRight, chartId }: ChartPreviewProps) {
  if (type === "Bar Chart") {
    return <BarChartPreview onDataPointClick={onDataPointClick} />;
  }
  if (type === "Line Chart") {
    return <LineChartPreview onDataPointClick={onDataPointClick} />;
  }
  if (type === "Pie Chart") {
    return <PieChartPreview onDataPointClick={onDataPointClick} />;
  }
  if (type === "Donut Chart") {
    return <DonutChartPreview onDataPointClick={onDataPointClick} />;
  }
  if (type === "Area Chart") {
    return <AreaChartPreview />;
  }
  if (type === "Bubble Chart") {
    return <BubbleChartPreview onDataPointClick={onDataPointClick} />;
  }
  if (type === "Combo Chart" || type === "Mixed / Combo Chart") {
    // Alias: "Combo Chart" and "Mixed / Combo Chart"
    return <ComboChartPreview onDataPointClick={onDataPointClick} />;
  }
  if (type === "Scatter Chart") {
    return <ScatterChartPreview />;
  }
  if (type === "Stacked Bar Chart") {
    return <StackedBarChartPreview />;
  }
  if (type === "Heat Map") {
    return <HeatMapChartPreview />;
  }
  if (type === "Calendar Heat Map") {
    return <CalendarHeatMapChartPreview />;
  }
  if (type === "Violin Chart") {
    return <D3ViolinChartPreview />;
  }
  if (type === "Sankey Chart") {
    return <D3SankeyChartPreview />;
  }
  if (type === "D3 Advanced Chart") {
    return <D3AdvancedChart />;
  }
  if (type === "D3 Pie Chart") {
    return <D3PieChart />;
  }
  if (type === "D3 Bar Chart") {
    return <D3BarChart />;
  }
  if (type === "D3 India Map") {
    return <D3IndiaMapChart />;
  }
  if (type === "Candle Stick") {
    return <CandleStickChartPreview />;
  }
  if (type === "Treemap") {
    return <TreemapChartPreview />;
  }
  // For Table/Summary etc
  return (
    <div id={chartId} className="w-full h-40 flex items-center justify-center bg-muted/30 rounded">
      <div className="flex justify-between w-full items-start p-2">
        <span className="text-muted-foreground text-center">
          [No chart for this type]
        </span>
        {topRight}
      </div>
    </div>
  );
}

export function ChartPreviewWithExport({
  type,
  onDataPointClick,
  topRight,
  chartId,
}: ChartPreviewProps) {
  // Returns chart preview and extra content to use in DashboardHome
  return (
    <div id={chartId} className="relative w-full h-40">
      {topRight && (
        <div className="absolute top-0 right-0 z-10 mt-1 mr-1">{topRight}</div>
      )}
      {/* Chart content below */}
      <div className="w-full h-full">
        <ChartPreview type={type} onDataPointClick={onDataPointClick} />
      </div>
    </div>
  );
}
