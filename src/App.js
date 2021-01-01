import { React, useState, useEffect } from "react";

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import MainChart from "./components/MainChart";
import MainNavbar from "./components/MainNavbar";
import MainCard from "./components/MainCard";

import { calculateBalance } from "./Utils";

function App() {
  const [parsed, setParsed] = useState("");
  const [graphData, setGraphData] = useState([]);
  const [val, setVal] = useState("");

  const logExpenses = (searchField) => {
    const regex = new RegExp(searchField + ".*", "gis");
    if (parsed) {
      let sum = 0;
      parsed.forEach((item) => {
        if (item["#Tytuł"]) {
          let found = item["#Tytuł"].match(regex);
          if (found) {
            sum += parseFloat(item["#Kwota"].replace(" ", ""));
          }
        }
      });
      console.log(sum);
    }
  };

  useEffect(() => {
    let temp = [
      {
        x: "2020-05-01",
        y: 1200,
      },
      {
        x: "2020-05-03",
        y: 1500,
      },
      {
        x: "2020-06-03",
        y: 900,
      },
      {
        x: "2020-06-31",
        y: 2100,
      },
    ];
    if (parsed) {
      temp = parsed.map((data) => {
        if (
          data["#Data operacji"] != null &&
          !isNaN(Date.parse(data["#Data operacji"]))
        ) {
          return {
            x: data["#Data operacji"],
            y: parseInt(data["#Saldo po operacji"].replace(" ", "")),
          };
        } else return null;
      });
    }

    temp = temp.filter((val) => val != null);
    setGraphData(temp);
  }, [parsed]);

  return (
    <div className="App">
      <MainNavbar parsed={parsed} setParsed={setParsed}></MainNavbar>
      <MainChart graphData={graphData}></MainChart>
      <Container fluid>
        <Row>
          <MainCard
            cardIcon={<i className="far fa-money-bill-alt fa-2x"></i>}
            cardHeader="Income/Losses over time"
            bg="primary"
            cardTitle="Total income/losses in selected  time period:"
            cardText={
              graphData.length !== 0
                ? calculateBalance(parsed).balance.toFixed(2)
                : "Insert a file first"
            }
          ></MainCard>
          <MainCard
            cardIcon={<i className="fas fa-arrow-down fa-2x"></i>}
            cardHeader="Total losses"
            bg="danger"
            cardTitle="Total losses in selected time period:"
            cardText={
              graphData.length !== 0
                ? calculateBalance(parsed).negativeBalance.toFixed(2)
                : "Insert a file first"
            }
          ></MainCard>
          <MainCard
            cardIcon={<i className="fas fa-arrow-up fa-2x"></i>}
            cardHeader="Total income"
            bg="success"
            cardTitle="Total income in selected time period:"
            cardText={
              graphData.length !== 0
                ? calculateBalance(parsed).positiveBalance.toFixed(2)
                : "Insert a file first"
            }
          ></MainCard>
        </Row>
      </Container>
      <form>
        <label>Testlabel</label>
        <input
          type="text"
          placeholder="Enter expense name:"
          value={val}
          onChange={(event) => {
            setVal(event.target.value);
          }}
        ></input>
        <button
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            logExpenses(val);
          }}
        >
          Print expenses to console!
        </button>
      </form>
    </div>
  );
}

export default App;
