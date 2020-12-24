import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function MainChart(props) {
  return (
    <LineChart
      width={800}
      height={400}
      data={props.graphData}
      margin={{ top: 5, right: 20, bottom: 50, left: 0 }}
      padding={20}
    >
      <XAxis dataKey="x" angle={30} dx={20} dy={20} />
      <YAxis domain={["auto", "auto"]} />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="y" stroke="blue" name="Saldo" unit="zł" />
      <Tooltip />
    </LineChart>
  );
}
