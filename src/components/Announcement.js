import React from "react";
import styles from "./AnnouncementBar.module.scss";
import svgCheck from "../assets/icons8-check.svg";

const Announcement = () => {
  return (
    <div className={styles["announcement-bar"]}>
      <div>
        <img src={svgCheck} loading="lazy" alt="check-svg" />{" "}
        <p>
          Free shipping on orders over <strong>50€</strong>
        </p>
      </div>
      <div>
        <img src={svgCheck} loading="lazy" alt="check-svg" />{" "}
        <p>
          Shipping to <strong>EU</strong> and <strong>UK</strong>
        </p>
      </div>
      <div>
        <img src={svgCheck} loading="lazy" alt="check-svg" />{" "}
        <p>
          Shipping within <strong>2-4 working days</strong>
        </p>
      </div>
    </div>
  );
};

export default Announcement;
