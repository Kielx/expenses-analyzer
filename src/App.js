import { React, useState, useEffect } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import MainChart from "./components/MainChart";
import MainNavbar from "./components/MainNavbar";
import MainCard from "./components/MainCard";
import MyResponsivePie from "./components/MyResponsivePie";

import {
  parseDataForGraphUsage,
  logExpenses,
  calculateBalance,
  prepareExpensesData,
} from "./Utils";
import DynamicCard from "./components/DynamicCard";
import AddCardModal from "./components/AddCardModal";
import ExpensesTable from "./components/ExpensesTable";

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
    const mappedCards = cardsList.map((card) => {
      return (
        <DynamicCard
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

  const onceAgainMapped = prepareExpensesData(parsed)
    .slice(0, 10)
    .map((item) => {
      return {
        id: item.item,
        value: Math.abs(item.amount),
      };
    });

  useEffect(() => {
    if (parsed.length !== 0) {
      setGraphData(parseDataForGraphUsage(parsed));
    }
  }, [parsed]);

  return (
    <div className="App">
      <MainNavbar parsed={parsed} setParsed={setParsed}></MainNavbar>
      <MainChart graphData={graphData}></MainChart>
      <Container fluid>
        <Row>
          <MainCard
            cardIcon="far fa-money-bill-alt fa-2x"
            cardHeader="Income/Losses over time"
            bg="primary"
            cardTitle="Total income/losses in selected  time period:"
            cardText={
              graphData.length !== 0
                ? calculateBalance(parsed).balance.toFixed(2)
                : "0"
            }
          ></MainCard>
          <MainCard
            cardIcon="fas fa-arrow-down fa-2x"
            cardHeader="Total losses"
            bg="danger"
            cardTitle="Total losses in selected time period:"
            cardText={
              graphData.length !== 0
                ? calculateBalance(parsed).negativeBalance.toFixed(2)
                : "0"
            }
          ></MainCard>
          <MainCard
            cardIcon="fas fa-arrow-up fa-2x"
            cardHeader="Total income"
            bg="success"
            cardTitle="Total income in selected time period:"
            cardText={
              graphData.length !== 0
                ? calculateBalance(parsed).positiveBalance.toFixed(2)
                : "0"
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
        {parsed ? (
          <Row style={{ height: 300 }}>
            <Col xs={12} md={6}>
              <MyResponsivePie data={onceAgainMapped}></MyResponsivePie>
            </Col>

            <Col xs={12} md={6}>
              <ExpensesTable data={prepareExpensesData(parsed)}></ExpensesTable>
            </Col>
          </Row>
        ) : (
          ""
        )}
      </Container>
    </div>
  );
}

export default App;
