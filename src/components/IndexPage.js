import React from "react";
import Footer from "./Footer";
import MainContent from "./MainContent";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function IndexPage() {
  return (
    <div id="wrapper">
      <Sidebar></Sidebar>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar></Navbar>
          <MainContent></MainContent>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}
