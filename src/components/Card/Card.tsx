import React, { FC } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";
import { ICard } from "../../types";

interface ICardProps {
  card: ICard;
  handleClickCard: (card: ICard, e: React.MouseEvent) => void;
}

export const Card: FC<ICardProps> = ({ card, handleClickCard }) => {
  const itemClass = card.status ? card.status : "";

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleClickCard(card, e);
  };

  return (
    <div
      className={cn(styles.card, {
        [styles.active]: card.status === "active",
        [styles.matches]: card.status === "matches",
      })}
      // className={'card'+ itemClass}

      onClick={handleClick}
    >
      <img
        src={card.image}
        alt="img"
        className={styles.img}
        key={card.id}
      ></img>
    </div>
  );
};
