import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import MainChart from "./MainChart";

import { calculateBalance } from "../Utils";
import DashboardInfoCard from "./DashboardInfoCard";

export default function MainOverview(props) {
  return (
    <Card className="shadow-sm mb-4">
      <Card.Body className="px-0">
        <Row>
          <Col sm={4} className="d-flex justify-content-center">
            <DashboardInfoCard
              graphData={props.graphData}
              parsed={props.parsed}
              content={parseInt(
                calculateBalance(props.parsed).balance.toFixed(2)
              )}
            >
              Total Balance
            </DashboardInfoCard>
          </Col>

          <Col sm={4} className="d-flex justify-content-center">
            <DashboardInfoCard
              graphData={props.graphData}
              parsed={props.parsed}
              content={parseInt(
                calculateBalance(props.parsed).positiveBalance.toFixed(2)
              )}
            >
              Incomes
            </DashboardInfoCard>
          </Col>

          <Col sm={4} className="d-flex justify-content-center">
            <DashboardInfoCard
              graphData={props.graphData}
              parsed={props.parsed}
              content={parseInt(
                calculateBalance(props.parsed).negativeBalance.toFixed(2)
              )}
            >
              Expenses
            </DashboardInfoCard>
          </Col>

          <Col style={{ minHeight: "25vh" }}>
            <MainChart graphData={props.graphData}></MainChart>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
