import styles from "./HomeCTA.module.scss";
import { useNavigate } from "react-router-dom";

const HomeCTA = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/Shop");
  };

  return (
    <section className={styles["cta-section"]}>
      <div className={styles["cta-content-left"]}>
        <h1>Join</h1>
        <h1>The Community</h1>
      </div>
      <div className={styles["cta-content-right"]}>
        <h2>Be one of us, wear SI'allure!</h2>
        <p>
          Explore our collections and find the piece that resonates with you.
          Your journey to self-expression begins here.
        </p>
        <button onClick={onClick}>Let's Shop</button>
      </div>
    </section>
  );
};

export default HomeCTA;
