
import React from "react";
import { Pie, getElementAtEvent } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend, Title);

type Props = {
  onDataPointClick?: (info: { label: string; value: number }) => void;
};

export default function PieChartPreview({ onDataPointClick }: Props) {
  const labels = ["A", "B", "C", "D", "E", "F"];
  const chartDataArr = Array.from({ length: 6 }, () => Math.floor(Math.random() * 100) + 1);

  const data = {
    labels,
    datasets: [{
      label: "Sample Data",
      data: chartDataArr,
      backgroundColor: [
        "rgba(99, 102, 241, 0.7)",
        "rgba(16, 185, 129, 0.7)",
        "rgba(244, 63, 94, 0.7)",
        "rgba(234, 179, 8, 0.7)",
        "rgba(59, 130, 246, 0.7)",
        "rgba(139, 92, 246, 0.7)",
      ],
      borderColor: [
        "rgba(99, 102, 241,1)",
        "rgba(16,185,129,1)",
        "rgba(244,63,94,1)",
        "rgba(234,179,8,1)",
        "rgba(59,130,246,1)",
        "rgba(139,92,246,1)",
      ],
      borderWidth: 2,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: false },
    },
    onClick: onDataPointClick
      ? (event: any, elements: any[], chart: any) => {
          const elem = getElementAtEvent(chart, event);
          if (elem && elem.length > 0) {
            const i = elem[0].index;
            if (labels[i]) {
              onDataPointClick({
                label: labels[i],
                value: chartDataArr[i],
              });
            }
          }
        }
      : undefined,
  };

  return <Pie data={data} options={options} height={160} />;
}
