
import React from "react";
import { Line, getElementAtEvent } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

type Props = {
  onDataPointClick?: (info: { label: string; value: number }) => void;
};

export default function LineChartPreview({ onDataPointClick }: Props) {
  const labels = ["A", "B", "C", "D", "E", "F"];
  const chartDataArr = Array.from({ length: 6 }, () => Math.floor(Math.random() * 100) + 1);

  const data = {
    labels,
    datasets: [{
      label: "Sample Data",
      data: chartDataArr,
      borderColor: "rgba(99,102,241,1)",
      backgroundColor: "rgba(99,102,241,0.15)",
      pointBackgroundColor: "rgba(99,102,241,1)",
      pointBorderColor: "#fff",
      tension: 0.3,
      fill: true,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
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

  return <Line data={data} options={options} height={160} />;
}
