import { React, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function AddCardModal(props) {
  const [show, setShow] = useState(false);
  const [newCard, setNewCard] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    const name = event.target.name;
    setNewCard((newCard) => ({
      ...newCard,
      [name]: event.target.value,
    }));
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add expenses card
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new expense/income card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="AddCardModalForm.HeaderInput">
              <Form.Control
                type="text"
                placeholder="Enter expense/income you would like to display:"
                value={newCard.cardHeader}
                onChange={handleChange}
                name="cardHeader"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Background of card</Form.Label>
              <Form.Control
                name="bg"
                as="select"
                onChange={handleChange}
                id="addCardModalIconSelector"
              >
                <option value="">Default</option>
                <option value="primary" label="Blue">
                  Blue
                </option>
                <option value="warning">Yellow</option>
                <option value="success">Green</option>
                <option value="danger">Red</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Card Icon</Form.Label>
              <Form.Control
                name="cardIcon"
                as="select"
                onChange={handleChange}
                id="addCardModalIconSelector"
              >
                <option>None</option>
                <option value="fas fa-dollar-sign fa-2x">
                  &#xf155; Dollar
                </option>
                <option value="far fa-grin-beam-sweat fa-2x">
                  &#xf155; Leisure
                </option>
                <option value="fas fa-heartbeat fa-2x">&#xf21e; Health</option>
                <option value="fas fa-gas-pump fa-2x">&#xf52f; Gas</option>
                <option value="fas fa-bread-slice fa-2x">&#xf7ec; Food</option>
                <option value="fas fa-shopping-cart fa-2x">
                  &#xf07a; Shopping
                </option>
                <option value="fas fa-hamburger fa-2x">
                  &#xf805; Junk food
                </option>
              </Form.Control>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={(event) => {
                event.preventDefault();
                props.setCards((cards) => [...cards, newCard]);
              }}
            >
              Add expense
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
