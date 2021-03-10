import { React, useState, useEffect } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";

import MainNavbar from "./components/MainNavbar";
import MyResponsivePie from "./components/MyResponsivePie";
import HelloModal from "./components/HelloModal";
import SecondaryChart from "./components/SecondaryChart";

import ScrollTopArrow from "./components/ScrollTopArrow";

import {
  parseDataForGraphUsage,
  logExpenses,
  prepareTop10Expenses,
  prepareTop10Incomes,
  parseDataForGraphUsageIncome,
} from "./Utils";
import DynamicCard from "./components/DynamicCard";
import AddCardModal from "./components/AddCardModal";
import MainOverview from "./components/MainOverview";

function App() {
  const [parsed, setParsed] = useState("");
  const [graphData, setGraphData] = useState([]);
  const [graphDataIncome, setGraphDataIncome] = useState([]);
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
      setGraphDataIncome(parseDataForGraphUsageIncome(parsed));
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

          {parsed ? (
            <Row className=" mb-4">
              <Col xl={3}>
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
              <Col xl={3}>
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
                      color={"#2780E3"}
                    ></MyResponsivePie>
                  </Card.Body>
                </Card>
              </Col>

              <Col xl={6}>
                <Card className="shadow-sm">
                  <Card.Header>
                    {`Incomes/Expenses in selected time:`}
                  </Card.Header>
                  <Card.Body
                    className="p-0"
                    style={{
                      height: "20em",
                    }}
                  >
                    <SecondaryChart
                      graphData={graphDataIncome}
                      color={"#2780E3"}
                    ></SecondaryChart>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ) : (
            ""
          )}

          <div className="d-flex justify-content-between">
            <h3>Custom expense cards: </h3>
            <AddCardModal setCards={setCards}></AddCardModal>
          </div>

          <Row>{displayCards(cards)}</Row>
        </>
      )}
      <ScrollTopArrow></ScrollTopArrow>
    </Container>
  );
}

export default App;
