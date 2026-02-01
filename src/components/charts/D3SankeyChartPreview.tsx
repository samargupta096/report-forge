
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

// Simple Sankey demo, no d3-sankey so hardcoded layout for demo
const NODES = [{ id: "Start" }, { id: "A" }, { id: "B" }, { id: "End" }];
const LINKS = [
  { source: "Start", target: "A", value: 8 },
  { source: "Start", target: "B", value: 4 },
  { source: "A", target: "End", value: 5 },
  { source: "B", target: "End", value: 7 }
];

export default function D3SankeyChartPreview() {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const width = 260;
    const height = 110;
    const nodeRadius = 13;
    const nodeY = [height / 2, height / 4, (3 * height) / 4, height / 2];
    const nodeX = [30, 90, 90, 220];

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    svg.attr("width", width).attr("height", height);

    // Draw nodes
    svg.selectAll("circle")
      .data(NODES)
      .join("circle")
      .attr("cx", (d, i) => nodeX[i])
      .attr("cy", (d, i) => nodeY[i])
      .attr("r", nodeRadius)
      .attr("fill", (d, i) => d3.schemeTableau10[i % 10])
      .attr("stroke", "#444");

    // Draw labels
    svg.selectAll("text")
      .data(NODES)
      .join("text")
      .attr("x", (d, i) => nodeX[i])
      .attr("y", (d, i) => nodeY[i] - nodeRadius - 3)
      .attr("text-anchor", "middle")
      .attr("font-size", 10)
      .text(d => d.id);

    // Draw links
    LINKS.forEach(link => {
      const from = NODES.findIndex(n => n.id === link.source);
      const to = NODES.findIndex(n => n.id === link.target);
      svg.append("path")
        .attr("d", d3.line().curve(d3.curveBasis)([
          [nodeX[from] + nodeRadius, nodeY[from]],
          [nodeX[from] + 40, nodeY[from]],
          [nodeX[to] - 40, nodeY[to]],
          [nodeX[to] - nodeRadius, nodeY[to]]
        ]))
        .attr("stroke", "#6366f1")
        .attr("stroke-width", Math.max(3, link.value))
        .attr("fill", "none")
        .attr("opacity", 0.60);
    });
  }, []);

  return (
    <div className="w-full h-40 flex items-center justify-center">
      <svg ref={ref} />
    </div>
  );
}
