import React from "react";
import styles from "./Hero.module.scss";
import logoName from "../../assets/Untitled_Artwork_only_name.png";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/Shop");
  };

  return (
    <section className={styles.hero}>
      <div className={styles["welcome-card"]}>
        <h1>
          <img src={logoName} loading="lazy" alt="logo" />
          <br /> <span>Handmade Clay Earrings</span>
        </h1>
        <p className={styles.slogan}>
          Unlock the Perfect Vision: <br />
          Our Earring Pairs, The Final Touch
        </p>
        <button onClick={onClick}>Visit The Shop</button>
      </div>
    </section>
  );
};

export default Hero;
