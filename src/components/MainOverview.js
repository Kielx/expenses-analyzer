import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
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
            <Row>
              <Col sm={12}>
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

              <Col>
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

              <Col>
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
            </Row>
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
