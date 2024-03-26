import React from "react";
import styles from "./SuccessfulPayment.module.scss";

const SuccessfulPayment = () => {
  return (
    <div className={styles["main-success-container"]}>
      <div className={styles["check-container"]}>
        <div className={styles["check-background"]}>
          <svg
            viewBox="0 0 65 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 25L27.3077 44L58.5 7"
              stroke="white"
              strokeWidth="13"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className={styles["check-shadow"]}></div>
      </div>
      <div className={styles["text-container"]}>
        <p className={styles["success-text"]}>Payment Successful!</p>
        <p className={styles["success-subtext"]}>
          Thank you for your payment. Your order has been successfully
          processed.
        </p>
      </div>
    </div>
  );
};

export default SuccessfulPayment;
