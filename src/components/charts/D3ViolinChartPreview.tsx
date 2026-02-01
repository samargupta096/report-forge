
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

// Mock data for 2 groups
function getViolinData() {
  const groupA = Array.from({ length: 40 }, () => Math.random() * 5 + 4);
  const groupB = Array.from({ length: 28 }, () => Math.random() * 3 + 6);
  return [
    { name: "A", values: groupA },
    { name: "B", values: groupB },
  ];
}

export default function D3ViolinChartPreview() {
  const ref = useRef<SVGSVGElement | null>(null);
  const width = 240, height = 144, margin = { top: 16, right: 18, bottom: 28, left: 18 };

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    const groups = getViolinData();
    const y = d3.scaleLinear().domain([0, 10]).range([height - margin.bottom, margin.top]);
    const x = d3.scalePoint().domain(groups.map(d => d.name)).range([margin.left, width - margin.right]).padding(1);

    // For each group, get kernel density as a new array
    function kernelDensityEstimator(kernel, X) {
      return function(V) {
        return X.map(x => [x, d3.mean(V, v => kernel(x - v))]);
      };
    }
    function kernelEpanechnikov(k) {
      return v => Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
    }

    const densities = groups.map(group => ({
      name: group.name,
      density: kernelDensityEstimator(kernelEpanechnikov(0.4), y.ticks(40))(group.values)
    }));

    // Draw violins using densities
    svg.selectAll(".violin")
      .data(densities)
      .join("g")
      .attr("transform", d => `translate(${x(d.name)},0)`)
      .append("path")
      .datum(d => d.density)
      .attr("fill", "#6366f1")
      .attr("stroke", "#222")
      .attr("stroke-width", 1)
      .attr("opacity", 0.7)
      .attr("d", d3.area()
        .x0(d => -d[1] * 48)
        .x1(d =>  d[1] * 48)
        .y(d => y(d[0]))
        .curve(d3.curveCatmullRom)
      );

    // y axis (value)
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5))
      .attr("font-size", 9);

    // x axis (group)
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .attr("font-size", 11);

  }, []);

  return (
    <div className="w-full h-40 flex items-center justify-center">
      <svg ref={ref} width={width} height={height} />
    </div>
  );
}
