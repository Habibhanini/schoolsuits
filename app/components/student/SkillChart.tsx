import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { IoEllipsisHorizontal } from "react-icons/io5";

const SkillChart = () => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const data = [
        { axis: "Mandarin", value: 0.8 },
        { axis: "French", value: 0.9 },
        { axis: "Drama", value: 0.6 },
        { axis: "History", value: 0.3 },
        { axis: "Science", value: 0.85 },
        { axis: "Math", value: 0.85 },
      ];

      const width = 500;
      const height = 420;
      const margin = 80;
      const radius = Math.min(width / 2, height / 2) - margin;
      const levels = 2;

      const svg = d3
        .select(chartRef.current)
        .attr("width", width)
        .attr("height", height);

      const g = svg
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      const angleSlice = (Math.PI * 2) / data.length;

      const radialScale = d3.scaleLinear().domain([0, 1]).range([0, radius]);

      for (let i = 0; i < levels; i++) {
        const levelFactor = ((i + 1) / levels) * radius;
        g.selectAll(".levels")
          .data(data)
          .enter()
          .append("line")
          .attr(
            "x1",
            (d, i) => levelFactor * Math.cos(angleSlice * i - Math.PI / 2)
          )
          .attr(
            "y1",
            (d, i) => levelFactor * Math.sin(angleSlice * i - Math.PI / 2)
          )
          .attr(
            "x2",
            (d, i) => levelFactor * Math.cos(angleSlice * (i + 1) - Math.PI / 2)
          )
          .attr(
            "y2",
            (d, i) => levelFactor * Math.sin(angleSlice * (i + 1) - Math.PI / 2)
          )
          .attr("stroke", "#CDCDCD")
          .attr("stroke-width", "0.5px");
      }

      g.selectAll(".grid-lines")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", (d, i) => radius * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("y2", (d, i) => radius * Math.sin(angleSlice * i - Math.PI / 2))
        .attr("stroke", "#CDCDCD");

      const line = d3
        .lineRadial<{ axis: string; value: number }>()
        .radius((d) => radialScale(d.value))
        .angle((d, i) => i * angleSlice)
        .curve(d3.curveCardinalClosed);

      g.append("path")
        .datum(data)
        .attr("d", line)
        .attr("fill", "rgba(68, 134, 247, 0.3)")
        .attr("stroke", "#888")
        .attr("stroke-width", 1);

      data.forEach((d, i) => {
        g.append("text")
          .attr("x", radialScale(1.2) * Math.cos(angleSlice * i - Math.PI / 2))
          .attr("y", radialScale(1.2) * Math.sin(angleSlice * i - Math.PI / 2))
          .style("text-anchor", "middle")
          .style("font-size", "16px")
          .style("font-weight", "bold")
          .text(d.axis);

        g.append("text")
          .attr(
            "x",
            radialScale(d.value + 0.3) * Math.cos(angleSlice * i - Math.PI / 2)
          )
          .attr(
            "y",
            radialScale(d.value + 0.3) * Math.sin(angleSlice * i - Math.PI / 2)
          )
          .style("text-anchor", "bottom")
          .style("font-size", "20px")
          .style("font-weight", "bold")
          .style(
            "fill",
            d.axis === "History"
              ? "red"
              : d.axis === "Science"
              ? "orange"
              : "green"
          )
          .text(
            d.axis === "History"
              ? "Major Concerns"
              : d.axis === "Mandarin"
              ? "Some Concerns"
              : d.axis === "Drama"
              ? "Good"
              : "Excellent"
          );
      });
    }
  }, []);

  return (
    <div className="bg-white rounded-3xl shadow p-4 h-[390px] ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-extrabold font-playfair">Skills</h2>
        <button>
          <IoEllipsisHorizontal className="w-6 h-6" />
        </button>
      </div>
      <div className="flex items-center justify-center  h-[300px]">
        <svg ref={chartRef}></svg>
      </div>
    </div>
  );
};

export default SkillChart;
