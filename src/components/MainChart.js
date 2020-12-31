import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MainChart(props) {
  return (
    <ResponsiveContainer width={"100%"} height={400}>
      <LineChart
        width={1200}
        data={props.graphData}
        margin={{ top: 50, right: 60, bottom: 50, left: 50 }}
      >
        <XAxis dataKey="x" angle={30} dx={20} dy={20} />
        <YAxis domain={["auto", "auto"]} />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line
          type="basis"
          dataKey="y"
          stroke="blue"
          name="Saldo"
          unit="zł"
          dot={false}
          strokeWidth={2}
        />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}
