
import React from "react";
import { Chart as ChartJS, BarController, LineController, BarElement, LineElement, CategoryScale, LinearScale, PointElement, Legend, Title, Tooltip } from "chart.js";
import { Chart } from "react-chartjs-2";
ChartJS.register(BarController, LineController, BarElement, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

type Props = {
  onDataPointClick?: (info: { label: string; value: number }) => void;
};

export default function ComboChartPreview({ onDataPointClick }: Props) {
  const labels = ["A", "B", "C", "D", "E"];
  const barData = [34, 58, 49, 72, 41];
  const lineData = [41, 65, 36, 89, 58];

  const data = {
    labels,
    datasets: [
      {
        type: "bar" as const,
        label: "Bar",
        data: barData,
        backgroundColor: "rgba(99, 102, 241, 0.6)",
        borderRadius: 7,
        borderWidth: 2,
      },
      {
        type: "line" as const,
        label: "Line",
        data: lineData,
        borderColor: "rgba(244, 63, 94, 0.9)",
        backgroundColor: "rgba(244, 63, 94, 0.12)",
        tension: 0.4,
        fill: false,
        pointBorderWidth: 3,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: false },
    },
    onClick: onDataPointClick
      ? (event: any, elements: any[], chart: any) => {
          // Support click on either bar or line
          if (elements && elements.length > 0) {
            const elem = elements[0];
            const i = elem.index;
            if (labels[i]) {
              // Prefer bar if available, else line
              let value = barData[i];
              if (elem.datasetIndex === 1) value = lineData[i];
              onDataPointClick({
                label: labels[i], value
              });
            }
          }
        }
      : undefined,
    scales: {
      y: { beginAtZero: true }
    }
  };

  return <Chart type="bar" data={data} options={options} height={160} />;
}
