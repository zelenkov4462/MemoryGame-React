import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import { Card, Modal } from "./components";
import { ICard } from "./types";
import arr from "./const/const";
import cn from "classnames";

function App() {
  const [cards, setCards] = useState<ICard[]>([]);
  const [openCards, setOpenCards] = useState<ICard[]>([]);
  const [coincidence, setCoincidence] = useState(0);
  const [modal, setModal] = useState<boolean>(false);
  let [timeGame, setTimeGame] = useState(0);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isLevel, setIsLevel] = useState<boolean>(false);
  const [forDisplay, setForDisplay] = useState(false);

  function selectLevel(time: number) {
    setTimeGame(time);
    setIsLevel(true);
  }

  const handleReset = () => {
    startGame();
    setCards(arr.sort(() => Math.random() - 0.5));
  };

  const handleClickCard = (card: ICard, e: React.MouseEvent) => {
    e.stopPropagation();
    card.status = "active";
    console.log();

    if (openCards.length === 1 && openCards[0].id !== card.id) {
      setOpenCards((prev) => [...prev, card]);
    } else {
      setOpenCards([card]);
    }
  };

  const comparisonCards = () => {
    const [first, second] = openCards;

    if (first.image === second.image) {
      first.status = "matches";
      second.status = "matches";
      setCoincidence((prev) => prev + 1);
    } else {
      first.status = "";
      second.status = "";
    }
    setOpenCards([]);
  };

  useEffect(() => {
    if (openCards.length === 2) {
      setTimeout(comparisonCards, 500);
    }
  }, [openCards]);

  useEffect(() => {
    if (coincidence === arr.length / 2) {
      setModal(true);
    }
  }, [coincidence]);

  function startGame() {
    setInterval(decreaseTime, 1000);
    setTime(timeGame);
  }

  function finishGame() {
    setModal(true);
  }

  function decreaseTime() {
    if (timeGame === 0) {
      finishGame();
    } else {
      setTimeGame(--timeGame);
      let current = timeGame;
      if (current < 10) {
        setCurrentTime(`00:0${current}`);
      } else {
        setCurrentTime(`00:${current}`);
      }
    }
  }

  function setTime(value: number) {
    if (value < 10) {
      setCurrentTime(`00:0${value}`);
    } else {
      setCurrentTime(`00:${value}`);
    }
  }

  if (isLevel) {
    setTimeout(() => {
      setForDisplay(true);
    }, 1000);
  }

  return (
    <div className={styles.container}>
      <div
        className={cn(styles.level, {
          [styles.notActive]: isLevel,
          [styles.none]: forDisplay,
        })}
      >
        <div className={styles.title}>Выберите уровень</div>
        <div className={styles.btnContainer}>
          <button className={styles.btn} onClick={() => selectLevel(30)}>
            Легкий
          </button>
          <button className={styles.btn} onClick={() => selectLevel(20)}>
            Средний
          </button>
          <button className={styles.btn} onClick={() => selectLevel(10)}>
            Тяжелый
          </button>
        </div>
      </div>
      <div
        className={cn({
          [styles.btnStart]: isLevel,
        })}
      >
        <button
          onClick={handleReset}
          className={cn(styles.btn, {
            [styles.hide]: !isLevel,
          })}
        >
          Начать игру
        </button>
      </div>

      {modal ? (
        <Modal setVisible={setModal} visible={modal} />
      ) : (
        <div className={styles.fieldWrap}>
          {cards.length !== 0 && (
            <div className={styles.time}>Time: {currentTime} </div>
          )}
          <div className={styles.field}>
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                handleClickCard={handleClickCard}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
