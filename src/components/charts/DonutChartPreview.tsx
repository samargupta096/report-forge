
import React from "react";
import { Doughnut, getElementAtEvent } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend, Title);

type Props = {
  onDataPointClick?: (info: { label: string; value: number }) => void;
};

export default function DonutChartPreview({ onDataPointClick }: Props) {
  const labels = ["East", "West", "South", "North"];
  const chartDataArr = [124, 95, 150, 78];

  const data = {
    labels,
    datasets: [{
      label: "Donut Demo",
      data: chartDataArr,
      backgroundColor: [
        "rgba(99, 102, 241, 0.7)",
        "rgba(244, 63, 94, 0.7)",
        "rgba(16, 185, 129, 0.7)",
        "rgba(234, 179, 8, 0.7)",
      ],
      borderColor: [
        "rgba(99, 102, 241,1)",
        "rgba(244,63,94,1)",
        "rgba(16,185,129,1)",
        "rgba(234,179,8,1)",
      ],
      borderWidth: 2,
      cutout: "63%",
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: false },
    },
    cutout: "63%",
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

  return <Doughnut data={data} options={options} height={160} />;
}
