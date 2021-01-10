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
    <ResponsiveContainer width={"100%"} height={400}>
      <AreaChart
        width={1200}
        data={props.graphData}
        margin={{ top: 50, right: 60, bottom: 50, left: 50 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2B3C4D" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#2B3C4D" stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <XAxis dataKey="x" angle={30} dx={20} dy={20} />
        <YAxis domain={["auto", "auto"]} />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />

        <Area
          type="monotone"
          dataKey="y"
          stroke="#263646"
          fillOpacity={1}
          fill="url(#colorUv)"
          name="Balance"
          unit="zł"
          strokeWidth={1}
        />
        <Tooltip />
      </AreaChart>
    </ResponsiveContainer>
  );
}
