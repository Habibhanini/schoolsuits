import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { IoEllipsisHorizontal } from "react-icons/io5";

interface SkillData {
  subject: string;
  grade: number;
  color: string;
}

const SkillChart = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const data: SkillData[] = [
    { subject: "Mandarin", grade: 90, color: "#41a2aa" },
    { subject: "French", grade: 90, color: "#41a2aa" },
    { subject: "Drama", grade: 70, color: "#F09E7A" },
    { subject: "History", grade: 20, color: "#ff4c4c" },
    { subject: "Science", grade: 90, color: "#41a2aa" },
    { subject: "Science", grade: 90, color: "#41a2aa" },
  ];

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 300;
    const height = 300;
    const radius = Math.min(width / 2, height / 2) - 40;
    const levels = 3;
    const angleSlice = (Math.PI * 2) / data.length;

    // Remove previous chart
    svg.selectAll("*").remove();

    // Setup SVG with rotation
    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2}) rotate(0)`);

    // Create radar levels
    for (let level = 0; level < levels; level++) {
      const rLevel = ((level + 1) / levels) * radius;
      g.selectAll(".levels")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", (d, i) => rLevel * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("y1", (d, i) => rLevel * Math.sin(angleSlice * i - Math.PI / 2))
        .attr(
          "x2",
          (d, i) => rLevel * Math.cos(angleSlice * (i + 1) - Math.PI / 2)
        )
        .attr(
          "y2",
          (d, i) => rLevel * Math.sin(angleSlice * (i + 1) - Math.PI / 2)
        )
        .attr("stroke", "#ddd");
    }

    // Create subject axes
    g.selectAll(".axis")
      .data(data)
      .enter()
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", (d, i) => radius * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("y2", (d, i) => radius * Math.sin(angleSlice * i - Math.PI / 2))
      .attr("stroke", "#999");

    // Map data to numerical values for radar area
    const radarData = data.map((d) => ({
      angle: d.subject,
      value: (d.grade / 100) * radius,
      color: d.color,
    }));

    // Create radar area
    const radarLine = d3
      .lineRadial<{ angle: string; value: number; color: string }>()
      .radius((d) => d.value)
      .angle((d, i) => i * angleSlice);

    g.append("path")
      .datum(radarData)
      .attr("d", radarLine)
      .attr("fill", "#41a2aa")
      .attr("fill-opacity", 0.25)
      .attr("stroke", "#41a2aa")
      .attr("stroke-width", 2);

    // Draw the dots for each point
    g.selectAll(".dot")
      .data(radarData)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => d.value * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("cy", (d, i) => d.value * Math.sin(angleSlice * i - Math.PI / 2))
      .attr("r", 6)
      .attr("fill", (d) => d.color);

    // Add subject labels
    g.selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr(
        "x",
        (d, i) => (radius + 10) * Math.cos(angleSlice * i - Math.PI / 2)
      )
      .attr(
        "y",
        (d, i) => (radius + 10) * Math.sin(angleSlice * i - Math.PI / 2)
      )
      .text((d) => d.subject)
      .attr("font-size", "14px")
      .attr("fill", (d) => d.color)
      .style("text-anchor", "middle");
  }, [data]);

  return (
    <div className="bg-white rounded-3xl shadow p-4 h-[390px] ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-extrabold font-playfair">Skills</h2>
        <button>
          <IoEllipsisHorizontal className="w-6 h-6" />
        </button>
      </div>
      <div className="flex items-center justify-center">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
};

export default SkillChart;
