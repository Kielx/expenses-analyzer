import React from "react";
import Table from "react-bootstrap/Table";

export default function ExpensesTable(props) {
  const tab = props.data.slice(0, 10).map((item, index) => {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{item.item}</td>
        <td>{item.amount}</td>
      </tr>
    );
  });
  return (
    <Table size="sm" striped bordered hover responsive="xl">
      <thead>
        <tr>
          <th>#</th>
          <th>Name of expense</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>{tab}</tbody>
    </Table>
  );
}
