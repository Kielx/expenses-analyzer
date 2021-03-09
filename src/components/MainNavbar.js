import React from "react";
import Navbar from "react-bootstrap/Navbar";
import AddFileModal from "./AddFileModal";
import Nav from "react-bootstrap/Nav";
import { defaultFile } from "../defaultFile";

export default function MainNavbar(props) {
  return (
    <Navbar expand="lg" className="pb-4">
      <Navbar.Brand href="#home">
        <i className="fas fa-chart-pie fa-2x"></i>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="d-none d-lg-block">
          <h2 style={{ color: "black" }}>Expenses Analyzer</h2>
        </Nav>
        <Nav variant="pills" className="ml-auto">
          <Nav.Item>
            <Nav.Link onClick={() => props.setParsed(defaultFile)}>
              Load default file
            </Nav.Link>
          </Nav.Item>
          <AddFileModal
            parsed={props.parsed}
            setParsed={props.setParsed}
          ></AddFileModal>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
