import styles from "./Steps.module.scss";
import choose from "../../assets/steps/choose.svg";
import choice from "../../assets/steps/choice.svg";
import sparkles from "../../assets/steps/sparkles.svg";
import earrings from "../../assets/steps/earrings.svg";
import arrow from "../../assets/steps/right-arrow.svg";
import useWindowResize from "../../hooks/useWindowResize";

const Steps = () => {
  const windowWidth = useWindowResize();
  return (
    <>
      <div className={styles["proccess-section"]}>
        <div className={styles.header}>
          <h1>
            Your <span>Enchanting</span>
            <span> Proccess</span>
          </h1>
          <p>
            Women should never go without earrings. Passing on them is an
            opportunity missed.
          </p>
        </div>
        <div className={styles.steps}>
          <div className={styles["steps__step"]}>
            <div className={styles["img-container"]}>
              <img src={choose} loading="lazy" alt="choices" />
            </div>{" "}
            <h2>Check Out Our Shop</h2>
            <p>
              Start by taking a look at our online store. See all the cool
              handmade jewelry we have just for you!
            </p>
          </div>

          {windowWidth > 768 ? (
            <span className={styles.arrow}>
              <img src={arrow} loading="lazy" alt="right-arrow" />
            </span>
          ) : (
            ""
          )}
          <div className={styles["steps__step"]}>
            <div className={styles["img-container"]}>
              <img src={choice} loading="lazy" alt="best-choice" />
            </div>{" "}
            <h2>Pick Your Favorite Pair</h2>
            <p>
              Choose a pair that you really like – something that feels just
              right for you.
            </p>
          </div>
          {windowWidth > 768 ? (
            <span className={styles.arrow}>
              <img src={arrow} loading="lazy" alt="right-arrow" />
            </span>
          ) : (
            ""
          )}
          <div className={styles["steps__step"]}>
            <div className={styles["img-container"]}>
              <img src={earrings} loading="lazy" alt="pair-of-earrings" />
            </div>
            <h2>Put Them On</h2>
            <p>
              Once you've picked your favorite, put them on! Wear your new
              jewelry proudly.
            </p>
          </div>

          {windowWidth > 768 ? (
            <span className={styles.arrow}>
              <img src={arrow} loading="lazy" alt="right-arrow" />
            </span>
          ) : (
            ""
          )}
          <div className={styles["steps__step"]}>
            <div className={styles["img-container"]}>
              <img src={sparkles} loading="lazy" alt="sparkles" />
            </div>
            <h2>Feel Awesome</h2>
            <p>
              Let it boost your confidence and make you look even more amazing.
              Get ready to stand out and shine in your own way!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Steps;
