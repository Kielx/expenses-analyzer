import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function SecondaryChart(props) {
  return (
    <ResponsiveContainer>
      <LineChart data={props.graphData} margin={0} padding={0}>
        <XAxis hide={true} dataKey="x" angle={30} dx={20} dy={20} />
        <YAxis hide={true} domain={["auto", "auto"]} />

        <Line
          dot={false}
          type="monotone"
          dataKey="y"
          stroke={props.color}
          fillOpacity={1}
          name="Balance"
          unit="zł"
          strokeWidth={2}
        />
        <Tooltip />
        <CartesianGrid strokeDasharray="1 20" />
      </LineChart>
    </ResponsiveContainer>
  );
}
