import React from "react";
import Navbar from "react-bootstrap/Navbar";
import AddFileModal from "./AddFileModal";

export default function MainNavbar(props) {
  return (
    <Navbar bg="primary" variant="dark" className="justify-content-between">
      <Navbar.Brand href="#home">
        <div>
          <i className="fas fa-chart-pie fa-2x"></i>
          {"    Expenses Analyzer"}{" "}
        </div>
      </Navbar.Brand>
      <AddFileModal
        parsed={props.parsed}
        setParsed={props.setParsed}
      ></AddFileModal>
    </Navbar>
  );
}
