import { React, useState, useEffect } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import MainChart from "./components/MainChart";
import MainNavbar from "./components/MainNavbar";
import MainCard from "./components/MainCard";
import MyResponsivePie from "./components/MyResponsivePie";

import ScrollTopArrow from "./components/ScrollTopArrow";

import {
  parseDataForGraphUsage,
  logExpenses,
  calculateBalance,
  prepareExpensesData,
} from "./Utils";
import DynamicCard from "./components/DynamicCard";
import AddCardModal from "./components/AddCardModal";

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

  const prepareTop10Expenses = prepareExpensesData(parsed)
    .slice(0, 10)
    .map((item) => {
      return {
        id: item.item,
        value: Math.abs(item.amount),
      };
    });

  const prepareTop10Incomes = prepareExpensesData(parsed)
    .slice(-10)
    .filter((item) => item.amount > 0)
    .map((item) => {
      return {
        id: item.item,
        value: Math.abs(item.amount),
      };
    });
  useEffect(() => {
    if (parsed && parsed.length !== 0) {
      setGraphData(parseDataForGraphUsage(parsed));
    }
  }, [parsed]);

  return (
    <div className="App">
      <MainNavbar parsed={parsed} setParsed={setParsed}></MainNavbar>

      <Container>
        <br />
        <h3>Dashboard</h3>

        <Row>
          <MainChart graphData={graphData}></MainChart>
        </Row>
        <Row>
          <MainCard
            cardIcon="far fa-money-bill-alt fa-2x"
            cardHeader="Income/Losses over time"
            bg="primary"
            cardTitle="Total income/losses in selected  time period:"
            cardText={
              graphData.length !== 0
                ? parseInt(calculateBalance(parsed).balance.toFixed(2))
                : 0
            }
          ></MainCard>
          <MainCard
            cardIcon="fas fa-arrow-down fa-2x"
            cardHeader="Total losses"
            bg="danger"
            cardTitle="Total losses in selected time period:"
            cardText={
              graphData.length !== 0
                ? parseInt(calculateBalance(parsed).negativeBalance.toFixed(2))
                : 0
            }
          ></MainCard>
          <MainCard
            cardIcon="fas fa-arrow-up fa-2x"
            cardHeader="Total income"
            bg="success"
            cardTitle="Total income in selected time period:"
            cardText={
              graphData.length !== 0
                ? parseInt(calculateBalance(parsed).positiveBalance.toFixed(2))
                : 0
            }
          ></MainCard>
        </Row>
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
                    prepareTop10Expenses.length >= 10
                      ? 10
                      : prepareTop10Expenses.length
                  } expenses in selected time period:`}
                </Card.Header>
                <Card.Body style={{ minHeight: "20em" }}>
                  <MyResponsivePie
                    data={prepareTop10Expenses}
                    color={"#E74C3C"}
                  ></MyResponsivePie>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={4}>
              <Card>
                <Card.Header>
                  {`Top ${
                    prepareTop10Incomes.length >= 10
                      ? 10
                      : prepareTop10Incomes.length
                  } incomes in selected time period:`}
                </Card.Header>
                <Card.Body style={{ minHeight: "20em" }}>
                  <MyResponsivePie
                    data={prepareTop10Incomes}
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
