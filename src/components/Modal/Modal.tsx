import React, { FC } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

interface IModal {
  setVisible: (arg: boolean) => void;
  visible: boolean;
}

export const Modal: FC<IModal> = ({ visible, setVisible }) => {
  return (
    <div
      className={cn(styles.modal, {
        [styles.active]: visible,
      })}
      onClick={() => {
        // setVisible(false);
        window.location.reload();
      }}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        Поздравляем!
        <button className={styles.btn} onClick={() => window.location.reload()}>
          Начать сначала
        </button>
      </div>
    </div>
  );
};
