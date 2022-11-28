import { useContext, useRef, useEffect } from "react";
import { DataContext } from "../Context";
import * as d3 from 'd3';

export default function WestChart(props) {
    const data = useContext(DataContext);
    const westData = data[props.location];
    const ref = useRef();

    // Chart attributes
    const chartAttr = {
        height: 400,
        width: 500,
        ypadding: 105,
        xpadding: 50
    };

    useEffect(() => {
        // Creating the y axis scale
        const yScale = d3.scaleLinear()
        .domain([d3.min(westData, d => d[1]), d3.max(westData, d => d[1])])
        .range([chartAttr.height - chartAttr.ypadding, chartAttr.ypadding]);

        // Creating the x axis scale
        const xBand = d3.scaleBand()
        .domain(westData.map((d, i) => i))
        .range([chartAttr.xpadding, chartAttr.width - chartAttr.xpadding])
        .padding(0.3);

        const xAxisBand = d3.scaleBand()
        .domain(westData.map((d, i) => d[0]))
        .range([chartAttr.xpadding, chartAttr.width - chartAttr.xpadding])
        .padding(0.3);

        // Create the axes
        const yAxis = d3.axisLeft(yScale);
        const xAxis = d3.axisBottom(xAxisBand);

        const svgElement = d3.select(ref.current)
        .attr("width", chartAttr.width)
        .attr("height", chartAttr.height);

        // Adding and positioning the axxes
        svgElement
        .append("g")
        .attr("transform", "translate(" + chartAttr.xpadding + ", 0)")
        .call(yAxis)
        .append("g")
        .attr("transform", "translate(" + (0 - chartAttr.xpadding) + "," + (chartAttr.height - chartAttr.ypadding) + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-50)")

        // Adding the bar chart
        svgElement
        .selectAll("rect")
        .data(westData)
        .enter()
        .append("rect")
        .attr("fill", "#2B3A55")
        .attr("height", d => chartAttr.height - yScale(d[1]) - chartAttr.ypadding)
        .attr("width", xBand.bandwidth())
        .attr("x", (d, i) => xBand(i))
        .attr("y", d => yScale(d[1]))
        .append("title")
        .text(d => {
            return `${d[0]}: ${d[1]}`;
        })

        // Adding a title to the chart
        svgElement
        .append("text")
        .attr("x", chartAttr.width / 2)
        .attr("y", chartAttr.ypadding / 2)
        .attr("text-anchor", "middle")
        .style("text-decoration", "underline")
        .text(props.location.toUpperCase())

    }, []);

    return (
        <div>
            <svg ref={ref} className="chart-main" />
        </div>
    )
}