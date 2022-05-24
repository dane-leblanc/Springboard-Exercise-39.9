import React, { useState, useEffect, useRef } from "react";
import Card from "./Card.js";
import "./App.css";
import axios from "axios";

const BASE_URL = "http://deckofcardsapi.com/api/deck/";

function App() {
  const [currCardNum, setCurrCardNum] = useState(0);
  const [cardsArr, setCardsArr] = useState([]);
  const [autoDraw, setAutoDraw] = useState(false);
  const timeRef = useRef(null);

  useEffect(() => {
    async function getData() {
      let deck = await axios.get(`${BASE_URL}new/draw/?count=52`);
      setCardsArr(deck.data.cards);
    }
    getData();
  }, [setCardsArr]);

  useEffect(() => {
    if (autoDraw && !timeRef.current) {
      timeRef.current = setInterval(nextCard, 1000);
    }

    return () => {
      clearInterval(timeRef.current);
      timeRef.current = null;
    };
  }, [autoDraw, currCardNum]);

  const nextCard = () => {
    if (currCardNum < 51) {
      setCurrCardNum(currCardNum + 1);
    } else {
      setAutoDraw(false);
    }
  };

  const toggleAutoDraw = () => {
    setAutoDraw((auto) => !auto);
  };

  return (
    <div className="App">
      <div>
        <button className="App-btn" onClick={() => nextCard()}>
          Draw Card!
        </button>
      </div>
      <div>
        {cardsArr.length > 0 ? (
          <Card currCardObj={cardsArr[currCardNum]} />
        ) : null}
      </div>
      <div>
        <button className="App-btn" onClick={() => toggleAutoDraw()}>
          {autoDraw ? "Stop" : "Begin"} Auto-Draw
        </button>
      </div>
      <h2>There Are {51 - currCardNum} Cards Left in the Deck</h2>
    </div>
  );
}

export default App;
