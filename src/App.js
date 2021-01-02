import { React, useState, useEffect } from "react";

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import MainChart from "./components/MainChart";
import MainNavbar from "./components/MainNavbar";
import MainCard from "./components/MainCard";

import { parseDataForGraphUsage, logExpenses, calculateBalance } from "./Utils";
import DynamicCard from "./components/DynamicCard";

function App() {
  const [parsed, setParsed] = useState("");
  const [graphData, setGraphData] = useState([]);
  const [val, setVal] = useState("");
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

  useEffect(() => {
    setGraphData(parseDataForGraphUsage(parsed));
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
        <>
          <h3>Custom expense cards</h3>
          <form>
            <label>Testlabel</label>
            <input
              type="text"
              placeholder="Enter expense you would like to display:"
              value={val}
              onChange={(event) => {
                setVal(event.target.value);
              }}
            ></input>
            <button
              type="submit"
              onClick={(event) => {
                event.preventDefault();
                setCards((cards) => [...cards, { cardHeader: val }]);
              }}
            >
              Add expense
            </button>
          </form>
        </>
        <br />
        <Row>{displayCards(cards)}</Row>
      </Container>
    </div>
  );
}

export default App;
