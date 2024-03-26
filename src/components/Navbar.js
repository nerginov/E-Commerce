import Announcement from "./Announcement";
import styles from "./Navbar.module.scss";
import logo1 from "../assets/Untitled_Artwork.png";
import cart from "../assets/shopping-cart.svg";
import BurgerMenu from "./BurgerMenu";
import { useEffect, useState } from "react";
import useWindowResize from "../hooks/useWindowResize";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const windowWidth = useWindowResize();
  const [animateCart, setAnimateCart] = useState(false);

  useEffect(() => {
    // Trigger animation when subtotal changes
    setAnimateCart(true);
    // Reset animation after a short delay
    const timeoutId = setTimeout(() => setAnimateCart(false), 500);
    return () => clearTimeout(timeoutId);
  }, [props.cartItemCount]);

  return (
    <>
      <div className={styles.navbar}>
        {windowWidth > 767 ? (
          <>
            <Link
              to="/"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              className={styles["img-container"]}
            >
              <img src={logo1} alt="logo" className={styles.logo} />
            </Link>
            <ul className={styles["nav-options"]}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/care">Care Guide</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/FAQ">FAQ</Link>
              </li>
            </ul>
          </>
        ) : (
          <div className={styles["left-wrapper"]}>
            <BurgerMenu></BurgerMenu>
            <Link to="/" className={styles["img-container"]}>
              <img src={logo1} alt="logo" className={styles.logo} />
            </Link>
          </div>
        )}
        <div className={styles["cart-wrapper"]} onClick={props.onClick}>
          <div className={styles.cart}>
            <img
              src={cart}
              alt="shopping-cart"
              className={styles["cart-svg"]}
            />
            <span
              className={`${styles["cart-counter"]} ${
                animateCart ? styles.animated : ""
              }`}
            >
              {props.cartItemCount}
            </span>
            <span className={styles["cart-amount"]}>
              €{props.subTotalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      <Announcement />
    </>
  );
};

export default Navbar;
