
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

// Simple SVG path GeoJSON for India outline (not detailed; demo use only)
const indiaGeoJson = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [68.17665, 7.96553], [97.40256, 7.96553], [97.40256, 35.49401], [68.17665, 35.49401], [68.17665, 7.96553]
        ]]
      },
      "properties": { "name": "India" }
    }
  ]
};
// For a real app, prefer fetching full-featured, more precise country geojson.

const width = 260;
const height = 140;

export default function D3IndiaMapChart() {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const projection = d3
      .geoMercator()
      .fitSize([width, height], indiaGeoJson as any);

    const path = d3.geoPath().projection(projection);

    svg.append("g")
      .selectAll("path")
      .data(indiaGeoJson.features)
      .enter()
      .append("path")
      .attr("d", path as any)
      .attr("fill", "#16b981")
      .attr("stroke", "#6366f1")
      .attr("stroke-width", 2);

    // Label
    svg.append("text")
      .text("India")
      .attr("x", width / 2)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .attr("font-size", 16)
      .attr("fill", "#6366f1")
      .attr("font-weight", "bold");
  }, []);

  return (
    <div className="w-full h-40 flex items-center justify-center">
      <svg ref={ref} width={width} height={height} />
    </div>
  );
}

