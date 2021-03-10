import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Brush,
} from "recharts";

export default function SecondaryChart(props) {
  return (
    <ResponsiveContainer>
      <BarChart data={props.graphData} margin={0} padding={0}>
        <XAxis hide={true} dataKey="x" angle={30} dx={20} dy={20} />
        <YAxis hide={true} domain={["auto", "auto"]} />

        <Bar
          fill="#2780E3"
          type="monotone"
          dataKey="y"
          stroke={props.color}
          name="Income/Loss"
          unit="zł"
          strokeWidth={1.5}
        />
        <Tooltip />
        <Brush dataKey="x" height={20} stroke="#2780E3" />
      </BarChart>
    </ResponsiveContainer>
  );
}
