import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CountUp from "react-countup";
import MainChart from "./MainChart";

import { calculateBalance } from "../Utils";
import DashboardInfoCard from "./DashboardInfoCard";

export default function MainOverview(props) {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col
            lg={{ span: 2, order: "first" }}
            xs={{ span: 12, order: "last" }}
            className="mainOverviewFirstColumn"
          >
            <Col>
              <DashboardInfoCard
                graphData={props.graphData}
                parsed={props.parsed}
                content={parseInt(
                  calculateBalance(props.parsed).balance.toFixed(2)
                )}
              >
                Total Balance
              </DashboardInfoCard>
              <DashboardInfoCard
                graphData={props.graphData}
                parsed={props.parsed}
                content={parseInt(
                  calculateBalance(props.parsed).positiveBalance.toFixed(2)
                )}
              >
                Incomes
              </DashboardInfoCard>
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
          </Col>
          <Col
            lg={10}
            xs={{ span: 12, order: "first" }}
            style={{ minHeight: "25vh" }}
          >
            <MainChart graphData={props.graphData}></MainChart>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
