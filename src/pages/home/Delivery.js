import delivery from "../../assets/package-sended-delivery-svgrepo-com.svg";
import deliveryReturn from "../../assets/package-return-logistic-svgrepo-com.svg";
import styles from "./Delivery.module.scss";
import useWindowResize from "../../hooks/useWindowResize";
import { Link } from "react-router-dom";

const Delivery = (props) => {
  const windowWidth = useWindowResize();

  return (
    <div className={`${styles["delivery-section"]} ${props.className}`}>
      <div className={styles.delivery}>
        <img src={delivery} loading="lazy" alt="deliver-box" />
        <p>
          Free delivery for orders over 50€ <br />
          <span>We deliver to whole EUROPE</span>
        </p>
      </div>
      <div className={styles.return}>
        <img src={deliveryReturn} loading="lazy" alt="deliver-return-box" />
        <p>
          14 Days return policy {windowWidth > 767 ? <br /> : " "}
          <span>
            find more <Link to="">Shipping and Return</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Delivery;
