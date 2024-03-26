import styles from "./Care.module.scss";
import care from "../../assets/heart-care-icon.svg";
import { Link } from "react-router-dom";

const Care = () => {
  return (
    <div className={styles.care}>
      <h1 className={styles["care-header"]}>
        A Simple
        <img src={care} loading="lazy" alt="hand-holding-heart-icon" />
        Care Guide
      </h1>
      <p className={styles["care-intro"]}>
        Welcome to our wonderful world of earrings, created from a special
        material called polymer clay. These earrings are all handmade with care
        and can stay by your side for a long time – just follow some easy steps
        to keep them happy!
      </p>
      <p className={styles["care-suggest"]}>Here's what we suggest:</p>
      <ul>
        <li>
          <span> Rest Easy:</span> When it's time for bed, give your earrings a
          break and take them off.
        </li>
        <li>
          <span>No Bending, Please:</span> Polymer clay is flexible but not
          super tough. Avoid bending or twisting to maintain their shape.
        </li>
        <li>
          <span>Skip the Perfume and Spray:</span> Keep your earrings away from
          perfumes and hairsprays. They prefer staying scent-free!
        </li>
        <li>
          <span>Shower Break:</span> Earrings need a timeout during showers.
          Remember to take them off before getting wet.
        </li>
        <li>
          <span>Stay Dry on Swims:</span> Unlike like you, earrings don't like
          swimming pools, oceans, or baths. Keep them dry!
        </li>
        <li>
          <span>Watch out for Falls:</span> Accidents happen, but let's keep
          those drops to a minimum. It helps your earrings stay span.
        </li>
        <li>
          <span>Cozy Storage:</span> When not dazzling your ears, give your
          earrings a spot, out of direct sunlight.
        </li>
        <li>
          <span>Travel Buddies:</span> Planning a trip? Secure your earrings in
          a sturdy case within your suitcase for a worry-free journey.
        </li>
        <li>
          <span>Gentle Clean:</span>To keep your polymer clay earrings looking
          their best, a simple wipe with a soft, damp cloth is all it takes.
        </li>
      </ul>
      <p className={styles["car-outro"]}>
        Always keep in mind, a small amount of care can work magic in preserving
        their beauty. Therefore, show that care and allow them to accompany you
        on your journey.
      </p>

      <p>
        If you have any unanswered questions, please don't hesitate to{" "}
        <Link to="/contact">
          <span>contact us</span>.
        </Link>
      </p>
    </div>
  );
};

export default Care;
