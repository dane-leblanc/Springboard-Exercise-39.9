import React from "react";

function Card({ currCardObj }) {
  const cardImg = currCardObj.image;
  return <img src={cardImg} />;
}

export default Card;
