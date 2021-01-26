import React from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MainChart(props) {
  return (
    <ResponsiveContainer width={"99%"}>
      <AreaChart
        width={1200}
        data={props.graphData}
        margin={{ right: 5, bottom: 5 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#18BC9C" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#18BC9C" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <XAxis hide={true} dataKey="x" angle={30} dx={20} dy={20} />
        <YAxis domain={["auto", "auto"]} />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />

        <Area
          type="monotone"
          dataKey="y"
          stroke="#00A383"
          fillOpacity={1}
          fill="url(#colorUv)"
          name="Balance"
          unit="zł"
          strokeWidth={2}
        />
        <Tooltip />
      </AreaChart>
    </ResponsiveContainer>
  );
}
