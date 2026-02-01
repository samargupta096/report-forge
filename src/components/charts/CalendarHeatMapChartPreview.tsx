
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

// Simple calendar heatmap demo for the last month
function getCalendarData() {
  const today = new Date();
  return Array.from({ length: 35 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (34 - i));
    return {
      date: d3.timeFormat("%Y-%m-%d")(date),
      value: Math.floor(Math.random() * 5),
    };
  });
}

export default function CalendarHeatMapChartPreview() {
  const rawData = getCalendarData();
  const ref = useRef<SVGSVGElement | null>(null);

  // Add parsed field for each data point as a new array
  const parse = d3.timeParse("%Y-%m-%d");
  const data = rawData.map(d => ({
    ...d,
    parsed: parse(d.date)
  }));

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    const width = 240;
    const cell = 24;
    const height = cell * 7 + 24;
    svg.attr("width", width).attr("height", height);

    // x: weeks, y: day of week
    const weekFormat = d3.timeFormat("%U");
    const dayFormat = d3.timeFormat("%w");
    const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Weeks (x)
    const weeks = Array.from(new Set(data.map(d => weekFormat(d.parsed))));
    // Days (y)
    const days = [0, 1, 2, 3, 4, 5, 6];

    // Grid
    svg.append("g")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", d => weeks.indexOf(weekFormat(d.parsed)) * cell)
      .attr("y", d => (+dayFormat(d.parsed)) * cell + 18)
      .attr("width", cell - 2)
      .attr("height", cell - 2)
      .attr("fill", d => {
        if (d.value === 0) return "#f3f4f6";
        if (d.value === 1) return "#d1fae5";
        if (d.value === 2) return "#7dd3fc";
        if (d.value === 3) return "#6ee7b7";
        if (d.value === 4) return "#6366f1";
        return "#db2777";
      });

    // Day labels
    svg.append("g")
      .selectAll("text")
      .data(days)
      .join("text")
      .attr("x", 4)
      .attr("y", d => d * cell + cell + 4)
      .attr("fill", "#666")
      .attr("font-size", 10)
      .text(d => dayName[d]);

    // Tooltip on hover (simple)
    svg.selectAll("rect")
      .on("mouseover", function (event, d) {
        d3.select(this).attr("stroke", "#333").attr("stroke-width", 2);
      })
      .on("mouseout", function () {
        d3.select(this).attr("stroke", "none");
      });

  }, [data]);
  return (
    <div className="w-full h-40 flex justify-center items-center">
      <svg ref={ref} />
    </div>
  );
}
