
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

// Simple force-directed network demo
const nodes = [
  { id: "Alice" },
  { id: "Bob" },
  { id: "Carol" },
  { id: "Dave" },
  { id: "Eve" },
];
const links = [
  { source: "Alice", target: "Bob" },
  { source: "Alice", target: "Carol" },
  { source: "Bob", target: "Dave" },
  { source: "Carol", target: "Dave" },
  { source: "Eve", target: "Alice" },
];

const width = 280;
const height = 160;

export default function D3AdvancedChart() {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // Clear before redrawing

    // Simulation setup
    const simulation = d3
      .forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(70))
      .force("charge", d3.forceManyBody().strength(-180))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Draw links
    const link = svg
      .append("g")
      .attr("stroke", "#6366f1")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 2);

    // Draw nodes
    const node = svg
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.8)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 14)
      .attr("fill", (d, i) => d3.schemeTableau10[i % 10])
      .call(
        d3
          .drag<SVGCircleElement, any>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    // Add labels
    const label = svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text(d => d.id)
      .attr("font-size", 12)
      .attr("fill", "#222")
      .attr("text-anchor", "middle")
      .attr("dy", 4)
      .attr("pointer-events", "none");

    simulation.on("tick", () => {
      link
        .attr("x1", d => (d as any).source.x)
        .attr("y1", d => (d as any).source.y)
        .attr("x2", d => (d as any).target.x)
        .attr("y2", d => (d as any).target.y);

      node.attr("cx", d => d.x as number).attr("cy", d => d.y as number);

      label
        .attr("x", d => d.x as number)
        .attr("y", d => d.y as number);
    });

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div className="w-full h-40 flex items-center justify-center">
      <svg ref={ref} width={width} height={height} />
    </div>
  );
}
