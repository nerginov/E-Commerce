import arrivalsImg from "../assets/arrivals-img.jpeg";
import styles from "./NewCollection.module.scss";
import { Link } from "react-router-dom";

const NewCollection = () => {
  return (
    <div className={styles["new-collection"]}>
      <div className={styles["new-collection-CTA"]}>
        <p>Attention, Attention!</p>
        <p>
          <strong> New Collection</strong> <br />
        </p>
        <p>Dont Miss Out on Our Latest Unique Crafts!</p>
        <Link to="/Shop">Shop Now!</Link>
      </div>
      <div className={styles["img-container"]}>
        <img src={arrivalsImg} loading="lazy" alt="products-collection-img" />
      </div>
    </div>
  );
};

export default NewCollection;
