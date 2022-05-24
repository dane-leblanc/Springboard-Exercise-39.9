import React from "react";
import "./Card.css";

function Card({ currCardObj }) {
  const cardImg = currCardObj.image;
  return <img src={cardImg} alt={currCardObj.name} />;
}

export default Card;
