import useToggleState from "../hooks/useToggleState";
import styles from "./BurgerMenu.module.scss";
import Drawer from "./Drawer";
import BackDropFilter from "./BackDropFilter";
import { createPortal } from "react-dom";
import useClickOutside from "../hooks/useClickOutside";
import { useRef } from "react";
import { Link } from "react-router-dom";
const BurgerMenu = (props) => {
  const ref = useRef();
  const [isMenuActive, toggleMenu, isInitialRender] = useToggleState(false);
  useClickOutside(ref, toggleMenu, isMenuActive);

  return (
    <>
      <div className={styles["burger-menu"]} onClick={() => toggleMenu()}>
        <div className={styles.lines}>
          <span className={`${styles.line} ${styles["line--1"]}`}></span>
          <span className={`${styles.line} ${styles["line--2"]}`}></span>
          <span className={`${styles.line} ${styles["line--3"]}`}></span>
        </div>
      </div>

      {createPortal(
        <>
          <Drawer
            className={`${styles["menu-drawer"]} ${
              !isInitialRender && isMenuActive
                ? styles.leftSlideIn
                : !isInitialRender && !isMenuActive
                ? styles.leftSlideOut
                : ""
            }`}
            // id={
            //   !isInitialRender && isMenuActive
            //     ? styles.leftSlideIn
            //     : !isInitialRender && !isMenuActive
            //     ? styles.leftSlideOut
            //     : ""
            // }
            ref={ref}
            isDrawerActive={isMenuActive}
            isInitialRender={isInitialRender}
          >
            <button
              className={styles["drawer-close"]}
              onClick={() => toggleMenu()}
            >
              X
            </button>
            <div className={styles["navigation-options"]}>
              <ul>
                <li>
                  <Link to="/" onClick={() => toggleMenu()}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/Shop" onClick={() => toggleMenu()}>
                    Shop
                  </Link>
                </li>
                <li>
                  <Link to="/Care" onClick={() => toggleMenu()}>
                    Care Guide
                  </Link>
                </li>
                <li>
                  <Link to="/Contact" onClick={() => toggleMenu()}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/FAQ" onClick={() => toggleMenu()}>
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </Drawer>
          {isMenuActive && <BackDropFilter />}
        </>,
        document.getElementById("root")
      )}
    </>
  );
};

export default BurgerMenu;
