import { React, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function HelloModal(props) {
  const [show, setShow] = useState(true);
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);
  const handleClose = () => setShow(false);
  // eslint-disable-next-line no-unused-vars
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!localStorage.getItem("doNotShowAgain")) {
      localStorage.setItem("doNotShowAgain", false);
    }
  }, []);

  return (
    <>
      <Modal
        // eslint-disable-next-line eqeqeq
        show={show && localStorage.getItem("doNotShowAgain") == "false"}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title>Welcome to expenses analyzer!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>
            Expenses analyzer is a safe way to analyze your expenses and incomes{" "}
          </h5>
          <p>
            App works by analyzing a .csv file with history from your bank. No
            information is sent anywhere. Whole magic happens in your browser,
            therefore your bank data is safe.
          </p>
          <h5>App usage</h5>
          <p>
            App is very easy to work with. Only thing that you need to do is to
            load the file into the browser using the button that is located at
            the top-right corner of your screen.
          </p>
          <img
            src={process.env.PUBLIC_URL + "/expenses-analyzer-ss1.png"}
            style={{ width: "40%", margin: "2vh auto", display: "block" }}
            alt="Depicting location of 'load default file' button in the top right corner of the page"
          ></img>
          <h5>
            I don't have/dont want to use my .csv file, but I still want to see
            how to app works!
          </h5>
          <p>
            If you don't want to use your own file, you can use the Load default
            file and get a feel of how the app works!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Form
            style={{ display: "inline-flex" }}
            onSubmit={(event) => {
              event.preventDefault();
              console.log(event);
              localStorage.setItem("doNotShowAgain", event.target[0].checked);
              handleClose();
            }}
          >
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                inline
                type="checkbox"
                label="Do not show this message again"
                onChange={(event) => {
                  setDoNotShowAgain(!doNotShowAgain);
                }}
                checked={doNotShowAgain}
              />
            </Form.Group>

            <Button variant="outline-danger" type="submit">
              Close
            </Button>
          </Form>
        </Modal.Footer>
      </Modal>
    </>
  );
}
