import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

export default function MainCard(props) {
  return (
    <Col xs={12} md={6} lg={4}>
      <Card
        bg={props.bg ? props.bg : ""}
        className="mb-2"
        text={props.bg ? "white" : "dark"}
      >
        <Card.Header as="h5">
          {props.cardIcon} {props.cardHeader}
        </Card.Header>
        <Card.Body>
          <Card.Title>{props.cardTitle}</Card.Title>
          <Card.Text>
            {props.cardText
              ? props.cardText
              : "Some quick example text to build on the card title and make up the bulk of the card's content."}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
