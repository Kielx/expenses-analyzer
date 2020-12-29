import { React, useState, useEffect } from "react";
import AddFileForm from "./AddFileForm";
import MainChart from "./MainChart";

export default function MainContent() {
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
    <div className="container-fluid">
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
      </div>
      {/* Content Row */}
      <div className="row">
        <AddFileForm parsed={parsed} setParsed={setParsed}></AddFileForm>
      </div>
      {/* Content Row */}
      <div className="row">
        {/* Area Chart */}
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            {/* Card Header - Dropdown */}
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                Earnings Overview
              </h6>
            </div>
            {/* Card Body */}
            <div className="card-body">
              <div className="chart-area">
                <MainChart graphData={graphData}></MainChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
