import React from "react";

export default function CardDeleteButton(props) {
  return (
    <i
      className="fas fa-times-circle fa-2x"
      style={{ cursor: "pointer" }}
      onClick={(event) => {
        event.preventDefault();
        const myArr = [...props.cards];
        const index = myArr.findIndex(
          (index) => index.cardHeader === props.cardHeader
        );
        if (index !== -1) {
          myArr.splice(index, 1);
          props.setCards(myArr);
        }
      }}
    ></i>
  );
}
