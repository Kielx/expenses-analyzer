import React from "react";
import Navbar from "react-bootstrap/Navbar";
import AddFileModal from "./AddFileModal";
import Nav from "react-bootstrap/Nav";

export default function MainNavbar(props) {
  return (
    <Navbar expand="lg" variant="light" bg="light">
      <Navbar.Brand href="#home">
        <i className="fas fa-chart-pie fa-2x"></i>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="d-none d-lg-block">
          <h2>Expenses Analyzer</h2>
        </Nav>
        <Nav className="ml-auto">
          <AddFileModal
            parsed={props.parsed}
            setParsed={props.setParsed}
          ></AddFileModal>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
