import React from "react";
import "./cart.css";

const Card = ({ card, handleChoice, isFlipped, disabled, choiceOne }) => {
  const handleClick = () => {
    if (!disabled && choiceOne?.id !== card.id) {
      handleChoice(card);
    }
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className={isFlipped ? "flipped" : "pointer"}>
        <img className="front" src={card.src} alt="card-front" />
        <img className="back" src="/img/cover.png" alt="card-back" />
      </div>
    </div>
  );
};

export default Card;
