
import React from "react";
import { Bubble, getElementAtEvent } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BubbleController,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
ChartJS.register(BubbleController, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

type Props = {
  onDataPointClick?: (info: { label: string; value: number }) => void;
};

export default function BubbleChartPreview({ onDataPointClick }: Props) {
  const labels = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon"];
  const dataPoints = [
    { x: 10, y: 20, r: 11, label: "Alpha" },
    { x: 15, y: 10, r: 8, label: "Beta" },
    { x: 14, y: 16, r: 13, label: "Gamma" },
    { x: 12, y: 8, r: 10, label: "Delta" },
    { x: 18, y: 16, r: 6, label: "Epsilon" },
  ];

  const data = {
    datasets: [
      {
        label: "Demo Bubbles",
        data: dataPoints,
        backgroundColor: [
          "rgba(99, 102, 241, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(244, 63, 94, 0.7)",
          "rgba(234, 179, 8, 0.7)",
          "rgba(59, 130, 246, 0.7)",
        ],
        borderColor: [
          "rgba(99, 102, 241, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(244, 63, 94, 1)",
          "rgba(234, 179, 8, 1)",
          "rgba(59, 130, 246, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: { min: 6, max: 22 },
      y: { min: 5, max: 22 },
    },
    onClick: onDataPointClick
      ? (event: any, elements: any[], chart: any) => {
          const elem = getElementAtEvent(chart, event);
          if (elem && elem.length > 0) {
            const i = elem[0].index;
            const d = dataPoints[i];
            if (d) {
              onDataPointClick({
                label: d.label,
                value: d.r,
              });
            }
          }
        }
      : undefined,
  };

  return <Bubble data={data} options={options} height={160} />;
}
