import { React, useState, useEffect } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import MainNavbar from "./components/MainNavbar";
import MyResponsivePie from "./components/MyResponsivePie";
import HelloModal from "./components/HelloModal";

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
      document.body.style.backgroundColor = "#F5F6FA";
    }
  }, [parsed]);

  return (
    <Container className="App Container mt-3" fluid style={{ width: "95%" }}>
      <HelloModal></HelloModal>
      <MainNavbar parsed={parsed} setParsed={setParsed}></MainNavbar>
      {parsed.length <= 0 ? (
        <h2
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Please load a file to analyze
        </h2>
      ) : (
        <>
          <h2>Dashboard</h2>
          <MainOverview graphData={graphData} parsed={parsed}></MainOverview>

          <div className="d-flex justify-content-between">
            <h3>Custom expense cards: </h3>
            <AddCardModal setCards={setCards}></AddCardModal>
          </div>

          <Row>{displayCards(cards)}</Row>

          <h3> </h3>

          {parsed ? (
            <Row>
              <Col xl={4}>
                <Card className="shadow-sm mb-4">
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
                <Card className="shadow-sm">
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
        </>
      )}
      <ScrollTopArrow></ScrollTopArrow>
    </Container>
  );
}

export default App;
