import { React, useState, useEffect } from "react";
import AddFileForm from "./components/AddFileForm";
import MainChart from "./components/MainChart";

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
      { x: "2020-05-01", y: 3500 },
      { x: "2020-05-08", y: 2000 },
      { x: "2020-06-03", y: 3000 },
      { x: "2020-06-31", y: 200 },
      { x: "2020-07-01", y: 3300 },
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
      <h1>Welcome to expenses analyzer!</h1>
      <h2>Add file to analyze:</h2>
      <AddFileForm parsed={parsed} setParsed={setParsed}></AddFileForm>
      <MainChart graphData={graphData}></MainChart>
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
