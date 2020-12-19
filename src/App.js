import { React, useState, useEffect } from "react";
import AddFileForm from "./components/AddFileForm";

import { LineChart } from "react-chartkick";
import "chart.js";

function App() {
  const [parsed, setParsed] = useState("");
  const [graphData, setGraphData] = useState({});

  useEffect(() => {
    const myObj = {};
    const logAll = (data) => {
      if (data) {
        data.forEach((dataObj) => {
          if (!isNaN(Date.parse(dataObj["#Data operacji"]))) {
            myObj[dataObj["#Data operacji"]] = dataObj[
              "#Saldo po operacji"
            ].replace(" ", "");
          }
        });
      }
    };

    logAll(parsed);
    setGraphData(myObj);
  }, [parsed]);

  return (
    <div className="App">
      <h1>Welcome to expenses analyzer!</h1>
      <h2>Add file to analyze:</h2>
      <AddFileForm parsed={parsed} setParsed={setParsed}></AddFileForm>
      <LineChart
        style={{ width: "50%" }}
        data={graphData}
        decimal=","
        min={null}
        width="50%"
      ></LineChart>
    </div>
  );
}

export default App;
