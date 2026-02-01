
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const size = 160;
const margin = 12;
const radius = (size - margin * 2) / 2;

const sampleData = [
  { label: "A", value: Math.floor(Math.random() * 100) + 20 },
  { label: "B", value: Math.floor(Math.random() * 100) + 20 },
  { label: "C", value: Math.floor(Math.random() * 100) + 20 },
  { label: "D", value: Math.floor(Math.random() * 100) + 20 }
];

const colors = ["#6366f1", "#16b981", "#fbbf24", "#f43f5e"];

export default function D3PieChart() {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const g = svg
      .append("g")
      .attr(
        "transform",
        `translate(${size / 2},${size / 2})`
      );

    const pie = d3.pie<any>().value((d) => d.value);
    const data_ready = pie(sampleData);

    const arc = d3
      .arc<any>()
      .innerRadius(0)
      .outerRadius(radius);

    // Animated Pie
    g.selectAll("path")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (_, i) => colors[i % colors.length])
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .transition()
      .duration(1000)
      .attrTween("d", function (d) {
        const i = d3.interpolate(
          { startAngle: 0, endAngle: 0 },
          d
        );
        return function (t) {
          return arc(i(t))!;
        };
      });

    // Add labels
    g.selectAll("text")
      .data(data_ready)
      .enter()
      .append("text")
      .text((d) => d.data.label)
      .attr("transform", (d) => {
        const centroid = arc.centroid(d);
        return `translate(${centroid[0]},${centroid[1]})`;
      })
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("fill", "#fff")
      .attr("font-size", 12);

  }, []);

  return (
    <div className="w-full h-40 flex items-center justify-center">
      <svg ref={ref} width={size} height={size} />
    </div>
  );
}
