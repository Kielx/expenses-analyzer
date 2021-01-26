import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CountUp from "react-countup";
import MainChart from "./MainChart";

import { calculateBalance } from "../Utils";

export default function MainOverview(props) {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col
            md={{ span: 2, order: "first" }}
            xs={{ span: 12, order: "last" }}
            className="mainOverviewFirstColumn"
          >
            <div style={{ display: "inline-flex" }}>
              <h3>
                {props.graphData.length !== 0 ? (
                  <CountUp
                    end={parseInt(
                      calculateBalance(props.parsed).balance.toFixed(2)
                    )}
                    duration={1}
                    suffix={"zł"}
                  ></CountUp>
                ) : (
                  0
                )}
              </h3>
            </div>
            <h4 style={{ color: "#B5B7D0" }}>Total Balance</h4>
            <hr />
            <h3>
              {props.graphData.length !== 0 ? (
                <CountUp
                  end={parseInt(
                    calculateBalance(props.parsed).positiveBalance.toFixed(2)
                  )}
                  duration={1}
                  suffix={"zł"}
                ></CountUp>
              ) : (
                0
              )}
            </h3>
            <h4 style={{ color: "#B5B7D0" }}>Income</h4>
            <hr />
            <h3>
              {props.graphData.length !== 0 ? (
                <CountUp
                  end={parseInt(
                    calculateBalance(props.parsed).negativeBalance.toFixed(2)
                  )}
                  duration={1}
                  suffix={"zł"}
                ></CountUp>
              ) : (
                0
              )}
            </h3>
            <h4 style={{ color: "#B5B7D0" }}>Losses</h4>
          </Col>
          <Col xs={12} md={10}>
            <MainChart graphData={props.graphData}></MainChart>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
