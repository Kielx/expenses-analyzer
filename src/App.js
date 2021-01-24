import { React, useState, useEffect } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import MainNavbar from "./components/MainNavbar";
import MyResponsivePie from "./components/MyResponsivePie";

import ScrollTopArrow from "./components/ScrollTopArrow";

import {
  parseDataForGraphUsage,
  logExpenses,
  prepareTop10Expenses,
  prepareTop10Incomes,
} from "./Utils";
import DynamicCard from "./components/DynamicCard";
import AddCardModal from "./components/AddCardModal";
import MainOverview from "./components/MainOverview";

function App() {
  const [parsed, setParsed] = useState("");
  const [graphData, setGraphData] = useState([]);
  const [cards, setCards] = useState([
    {
      cardHeader: "Mcdonalds",
      cardIcon: "fas fa-hamburger fa-2x",
      bg: "warning",
    },
    {
      cardHeader: "Orlen",
      cardIcon: "fas fa-gas-pump fa-2x",
      bg: "danger",
    },
  ]);

  const displayCards = (cardsList) => {
    const mappedCards = cardsList.map((card, index) => {
      return (
        <DynamicCard
          key={index}
          cardHeader={card.cardHeader}
          cardTitle={card.cardTitle}
          cardText={logExpenses(card.cardHeader, parsed)}
          cards={cards}
          setCards={setCards}
          cardIcon={card.cardIcon}
          bg={card.bg}
        ></DynamicCard>
      );
    });
    return mappedCards;
  };

  useEffect(() => {
    if (parsed && parsed.length !== 0) {
      setGraphData(parseDataForGraphUsage(parsed));
    }
  }, [parsed]);

  return (
    <div className="App">
      <MainNavbar parsed={parsed} setParsed={setParsed}></MainNavbar>
      <Container fluid style={{ width: "90%" }}>
        <br />
        <h2>Dashboard</h2>
        <MainOverview graphData={graphData} parsed={parsed}></MainOverview>
        <hr />
        <div className="d-flex justify-content-between">
          <h3>Custom expense cards: </h3>
          <AddCardModal setCards={setCards}></AddCardModal>
        </div>
        <br />
        <Row>{displayCards(cards)}</Row>
        <hr />
        <h3> </h3>
        <br />
        {parsed ? (
          <Row>
            <Col xl={4}>
              <Card>
                <Card.Header>
                  {`Top ${
                    prepareTop10Expenses(parsed).length >= 10
                      ? 10
                      : prepareTop10Expenses(parsed).length
                  } expenses in selected time period:`}
                </Card.Header>
                <Card.Body style={{ minHeight: "20em" }}>
                  <MyResponsivePie
                    data={prepareTop10Expenses(parsed)}
                    color={"#E74C3C"}
                  ></MyResponsivePie>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={4}>
              <Card>
                <Card.Header>
                  {`Top ${
                    prepareTop10Incomes(parsed).length >= 10
                      ? 10
                      : prepareTop10Incomes(parsed).length
                  } incomes in selected time period:`}
                </Card.Header>
                <Card.Body style={{ minHeight: "20em" }}>
                  <MyResponsivePie
                    data={prepareTop10Incomes(parsed)}
                    color={"#18BC9C"}
                  ></MyResponsivePie>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          ""
        )}
      </Container>
      <ScrollTopArrow></ScrollTopArrow>
    </div>
  );
}

export default App;
