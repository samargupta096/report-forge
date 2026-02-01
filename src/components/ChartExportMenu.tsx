
import React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { downloadAsCSV, downloadAsXLSX } from "@/lib/exportUtils";
import html2canvas from "html2canvas";

type ChartExportMenuProps = {
  chartType: string;
  chartTitle: string;
  chartId: string;
};

function getChartExportData(chartType: string): { headers: string[]; data: Record<string, any>[] } {
  switch (chartType) {
    case "Bar Chart":
    case "Line Chart":
    case "Pie Chart":
      return {
        headers: ["Label", "Value"],
        data: ["A", "B", "C", "D", "E", "F"].map((label) => ({
          label,
          value: Math.floor(Math.random() * 100) + 1,
        })),
      };
    case "Area Chart":
      return {
        headers: ["Month", "UV", "PV"],
        data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month) => ({
          month,
          uv: Math.floor(Math.random() * 100) + 40,
          pv: Math.floor(Math.random() * 50) + 20,
        })),
      };
    case "Scatter Chart":
      return {
        headers: ["X", "Y", "Z"],
        data: Array.from({ length: 8 }).map(() => ({
          x: Math.floor(Math.random() * 80),
          y: Math.floor(Math.random() * 80),
          z: Math.floor(Math.random() * 200) + 30,
        })),
      };
    case "Stacked Bar Chart":
      return {
        headers: ["Label", "Value1", "Value2"],
        data: ["A", "B", "C", "D", "E", "F"].map((label) => ({
          label,
          value1: Math.floor(Math.random() * 100) + 10,
          value2: Math.floor(Math.random() * 100) + 10,
        })),
      };
    default:
      return {
        headers: ["Label", "Value"],
        data: ["A", "B", "C", "D"].map((label) => ({
          label,
          value: Math.floor(Math.random() * 100) + 1,
        })),
      };
  }
}

async function handleExportJPG(chartId: string, chartTitle: string) {
  const el = document.getElementById(chartId);
  if (!el) {
    alert("Chart area not found for export.");
    return;
  }
  try {
    const canvas = await html2canvas(el, { backgroundColor: "#fff", useCORS: true, scale: 2 });
    const dataURL = canvas.toDataURL("image/jpeg", 0.92);
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `${chartTitle.replace(/\s+/g, "_")}.jpg`;
    link.click();
  } catch (err) {
    alert("Error exporting chart image.");
    console.error(err);
  }
}

const ChartExportMenu: React.FC<ChartExportMenuProps> = ({ chartType, chartTitle, chartId }) => {
  const { headers, data } = getChartExportData(chartType);

  const handleExportCSV = () => {
    downloadAsCSV(data, headers, `${chartTitle.replace(/\s+/g, "_")}.csv`);
  };

  const handleExportXLSX = () => {
    downloadAsXLSX(data, headers, `${chartTitle.replace(/\s+/g, "_")}.xlsx`);
  };

  const handleExportJPGClick = () => {
    handleExportJPG(chartId, chartTitle);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="p-2"
          aria-label="Open export menu"
        >
          <Download className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white z-50 border shadow-lg min-w-[160px]"
        sideOffset={6}
      >
        <DropdownMenuItem onClick={handleExportXLSX}>
          Download Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportCSV}>
          Download CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportJPGClick}>
          Download JPG (Photo)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChartExportMenu;
