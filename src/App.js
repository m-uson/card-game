import { useEffect, useState } from "react";
import Card from "./components/Card";

const cardImages = [
  {
    src: "/img/helmet-1.png",
    isMatched: false,
  },
  {
    src: "/img/potion-1.png",
    isMatched: false,
  },
  {
    src: "/img/ring-1.png",
    isMatched: false,
  },
  {
    src: "/img/scroll-1.png",
    isMatched: false,
  },
  {
    src: "/img/shield-1.png",
    isMatched: false,
  },
  {
    src: "/img/sword-1.png",
    isMatched: false,
  },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
  };

  const handleChoice = (card) => {
    if (choiceOne) {
      setChoiceTwo(card);
    } else {
      setChoiceOne(card);
    }
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    if (turns >= 12) {
      shuffleCards();
    }
    setDisabled(false);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prev) =>
          prev.map((card) => {
            if (choiceOne.src === card.src) {
              return { ...card, isMatched: true };
            }
            return card;
          })
        );
        setTimeout(resetTurn, 1000);
      } else {
        setTimeout(resetTurn, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <div className="flex">
        <h1>Magic Match</h1>
        <p>Your turns {turns}</p>
        <button onClick={shuffleCards}>New Game</button>
      </div>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            isFlipped={
              card === choiceOne || card === choiceTwo || card.isMatched
            }
            handleChoice={handleChoice}
            key={card.id}
            card={card}
            disabled={disabled}
            choiceOne={choiceOne}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
