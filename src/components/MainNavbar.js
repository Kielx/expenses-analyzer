import React from "react";
import Navbar from "react-bootstrap/Navbar";
import AddFileModal from "./AddFileModal";

export default function MainNavbar(props) {
  return (
    <Navbar bg="dark" variant="dark" className="justify-content-between">
      <Navbar.Brand href="#home">
        <img
          alt=""
          src="/logok128.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        Expenses Analyzer
      </Navbar.Brand>
      <AddFileModal
        parsed={props.parsed}
        setParsed={props.setParsed}
      ></AddFileModal>
    </Navbar>
  );
}
