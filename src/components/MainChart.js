import React from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from "recharts";

export default function MainChart(props) {
  return (
    <ResponsiveContainer>
      <AreaChart
        width={1200}
        data={props.graphData}
        margin={{ right: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2780E3" stopOpacity={0.4} />
            <stop offset="90%" stopColor="#2780E3" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis hide={true} dataKey="x" angle={30} dx={20} dy={20} />
        <YAxis hide={true} domain={["auto", "auto"]} />

        <Area
          type="monotone"
          dataKey="y"
          stroke="#2780E3"
          fillOpacity={1}
          fill="url(#colorUv)"
          name="Balance"
          unit="zł"
          strokeWidth={2}
        />
        <Tooltip />
        <Brush dataKey="x" height={20} stroke="#2780E3" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
