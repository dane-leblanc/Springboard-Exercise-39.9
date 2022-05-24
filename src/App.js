import React, { useState, useEffect } from "react";
import Card from "./Card.js";
import DrawButton from "./DrawButton.js";
import "./App.css";
import axios from "axios";

const BASE_URL = "http://deckofcardsapi.com/api/deck/";

function App() {
  const [currCardNum, setCurrCardNum] = useState(0);
  const [cardsArr, setCardsArr] = useState([]);

  useEffect(() => {
    console.log("beginning of useEffect");
    async function getData() {
      let deck = await axios.get(`${BASE_URL}new/draw/?count=52`);
      console.log("getting data");
      setCardsArr(deck.data.cards);
      console.log(deck.data);
    }
    getData();
  }, [setCardsArr]);

  return (
    <div className="App">
      <DrawButton
        onClick={function() {
          setCurrCardNum(currCardNum + 1);
        }}
      />
      {cardsArr.length > 0 ? (
        <Card currCardObj={cardsArr[currCardNum]} />
      ) : null}
    </div>
  );
}

export default App;
