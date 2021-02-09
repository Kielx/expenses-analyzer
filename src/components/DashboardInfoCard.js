import React from "react";
import CountUp from "react-countup";

export default function DashboardInfoCard(props) {
  return (
    <div className="mb-3">
      <h3 className="mb-0">
        {props.graphData.length !== 0 ? (
          <CountUp end={props.content} duration={1} suffix={"zł"}></CountUp>
        ) : (
          0
        )}
      </h3>
      <h4 style={{ color: "#B5B7D0" }}>{props.children}</h4>
    </div>
  );
}
