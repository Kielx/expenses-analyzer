import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import CountUp from "react-countup";

export default function MainCard(props) {
  return (
    <Col xs={12} md={6} lg={4}>
      <Card
        border={props.bg ? props.bg : ""}
        className="mb-2 "
        text={props.bg ? props.bg : ""}
      >
        <Card.Header as="h5" className={"d-flex justify-content-between"}>
          <>
            <div>
              {props.cardIcon ? <i className={props.cardIcon}></i> : ""}{" "}
              {props.cardHeader}
            </div>
          </>
        </Card.Header>
        <Card.Body>
          <Card.Title>{props.cardTitle}</Card.Title>
          <Card.Text>
            {props.cardText ? (
              <CountUp end={props.cardText} duration={1}></CountUp>
            ) : (
              "Current file contains no data about selected item."
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
