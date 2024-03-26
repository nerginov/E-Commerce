import React from "react";
import styles from "./LoadingModal.module.scss";

const LoadingModal = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.spinner}></div>
        <div className={styles.text}>Loading...</div>
      </div>
    </div>
  );
};

export default LoadingModal;
