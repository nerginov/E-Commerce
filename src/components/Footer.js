import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer-links"]}>
        <Link to="/contact">Contact Us</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/policies-and-terms" onClick={() => window.scrollTo(0, 0)}>
          Cookie Policy
        </Link>
        <Link to="/policies-and-terms" onClick={() => window.scrollTo(0, 0)}>
          Privacy Policy
        </Link>
        <Link to="/policies-and-terms" onClick={() => window.scrollTo(0, 0)}>
          Terms and Conditions
        </Link>
      </div>
      <p className={styles["footer-copyright"]}>
        &copy; 2023 Cleysi. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
