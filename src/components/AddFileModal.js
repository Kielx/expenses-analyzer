import { React, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import { readParseCSVFile } from "../Utils";

export default function AddFileModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let parsedFile;

  return (
    <>
      <Nav.Link variant="outline-light" onClick={handleShow}>
        Choose a file to analyze
      </Nav.Link>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pick a file you would like to analyze</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            onChange={async (event) => {
              parsedFile = await readParseCSVFile(event);
            }}
            type="file"
            accept=".csv"
          ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              props.setParsed(parsedFile);
              handleClose();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
