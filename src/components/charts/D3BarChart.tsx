
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const width = 280;
const height = 160;

const data = [
  { category: "Apple", value: Math.floor(Math.random() * 80) + 20 },
  { category: "Banana", value: Math.floor(Math.random() * 80) + 20 },
  { category: "Cherry", value: Math.floor(Math.random() * 80) + 20 },
  { category: "Date", value: Math.floor(Math.random() * 80) + 20 },
  { category: "Elderberry", value: Math.floor(Math.random() * 80) + 20 },
];

const color = d3.scaleOrdinal<string>().domain(data.map(d=>d.category)).range(["#6366f1", "#16b981", "#fbbf24", "#f43f5e", "#818cf8"]);

export default function D3BarChart() {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.category))
      .range([32, width - 16])
      .padding(0.24);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)!])
      .range([height - 24, 16]);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.category)!)
      .attr("y", (d) => y(0))
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("rx", 5)
      .attr("fill", (d) => color(d.category) as string)
      .transition()
      .duration(900)
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => y(0) - y(d.value));

    // Add category labels
    svg
      .selectAll("text.category-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "category-label")
      .attr("x", (d) => x(d.category)! + x.bandwidth() / 2)
      .attr("y", height - 6)
      .attr("text-anchor", "middle")
      .attr("font-size", "11")
      .attr("fill", "#222")
      .text((d) => d.category);

    // Add value labels
    svg
      .selectAll("text.value-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "value-label")
      .attr("x", (d) => x(d.category)! + x.bandwidth() / 2)
      .attr("y", (d) => y(d.value) - 6)
      .attr("text-anchor", "middle")
      .attr("font-size", "11")
      .attr("font-weight", "bold")
      .attr("fill", "#6366f1")
      .text((d) => d.value);

    // Y Axis
    svg
      .append("g")
      .attr("transform", "translate(32,0)")
      .call(
        d3.axisLeft(y)
          .ticks(4)
          .tickFormat(d3.format("d"))
      )
      .attr("font-size", "11");

  }, []);

  return (
    <div className="w-full h-40 flex items-center justify-center">
      <svg ref={ref} width={width} height={height} />
    </div>
  );
}
