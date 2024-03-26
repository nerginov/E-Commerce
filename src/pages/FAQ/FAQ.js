import styles from "./FAQ.module.scss";
import downArrow from "../../assets/arrow-point-down-svgrepo-com.svg";
import upArrow from "../../assets/up-arrow-svgrepo-com.svg";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const [isActive, setIsActive] = useState(null);
  const handleIsActive = (questionID) => {
    setIsActive(isActive === questionID ? null : questionID);
  };

  const [activeQuestionHeight, setActiveQuestionHeight] = useState(null);
  const questionRefs = {
    "shipping-q-one": useRef(null),
    "shipping-q-two": useRef(null),
    "shipping-q-three": useRef(null),
    "shipping-q-four": useRef(null),
    "return-q-one": useRef(null),
    "return-q-two": useRef(null),
    "other-q-one": useRef(null),
  };
  useEffect(() => {
    if (isActive && questionRefs[isActive] && questionRefs[isActive].current) {
      setActiveQuestionHeight(questionRefs[isActive].current.scrollHeight);
    }
  }, [isActive]);

  return (
    <div className={styles.FAQ}>
      <header className={styles["FAQ-header"]}>
        <h1>FAQ</h1>
        <p>
          We've organized these frequently asked questions to provide you with
          quick and easy access to the answers you need. If you can't find the
          information you're looking for, please don't hesitate to reach out via
          our <Link to="/contact">Contact Form</Link>.
        </p>
      </header>
      <div className={styles.shipping}>
        <h2>SHIPPING</h2>
        <div className={styles["questions-container"]}>
          <div className={styles.question}>
            <button
              className={styles.collapseBtn}
              onClick={() => handleIsActive("shipping-q-one")}
              aria-expanded={isActive === "shipping-q-one"}
              aria-controls="shipping-q-one"
            >
              How long does order processing take?
              <img
                src={isActive === "shipping-q-one" ? upArrow : downArrow}
                alt="arrow-tip"
              />
            </button>
            <p
              id="shipping-q-one"
              aria-hidden={isActive !== "shipping-q-one"}
              style={{
                height:
                  isActive === "shipping-q-one"
                    ? `${activeQuestionHeight}px`
                    : 0,
                transition: "height .3s ease-in",
              }}
              ref={questionRefs["shipping-q-one"]}
            >
              The processing time to prepare your order for shipment is{" "}
              <strong> 1-3 business days.</strong>
            </p>
          </div>
        </div>
        <div className={styles["questions-container"]}>
          <div className={styles.question}>
            <button
              className={styles.collapseBtn}
              onClick={() => {
                handleIsActive("shipping-q-two");
              }}
              aria-expanded={isActive === "shipping-q-two"}
              aria-controls="shipping-q-two"
            >
              What is the expected delivery time?
              <img
                src={isActive === "shipping-q-two" ? upArrow : downArrow}
                alt="arrow-tip"
              />
            </button>
            <p
              id={styles["shipping-q-two"]}
              style={{
                height:
                  isActive === "shipping-q-two"
                    ? `${activeQuestionHeight}px`
                    : 0,
                transition: "height .3s ease-in",
              }}
              ref={questionRefs["shipping-q-two"]}
              aria-hidden={isActive !== "shipping-q-two"}
            >
              It depends on where you are. Domestic orders processed will take
              4-7 business days to arrive. International deliveries can take
              anywhere from 14 -30 days. Delivery details will be provided in
              your order confirmation email.
            </p>
          </div>
        </div>
        <div className={styles["questions-container"]}>
          <div className={styles.question}>
            <button
              className={styles.collapseBtn}
              onClick={() => handleIsActive("shipping-q-three")}
              aria-expanded={isActive === "shipping-q-three"}
              aria-controls="shipping-q-three"
            >
              How can I track my order?
              <img
                src={isActive === "shipping-q-three" ? upArrow : downArrow}
                alt="arrow-tip"
              />
            </button>
            <p
              id={styles["shipping-q-three"]}
              style={{
                height:
                  isActive === "shipping-q-three"
                    ? `${activeQuestionHeight}px`
                    : 0,
                transition: "height .3s ease-in",
              }}
              ref={questionRefs["shipping-q-three"]}
              aria-hidden={isActive !== "shipping-q-three"}
            >
              Once your order has been sent you will receive an email with an
              online tracking number.
            </p>
          </div>
        </div>
        <div className={styles["questions-container"]}>
          <div
            className={styles.question}
            onClick={() => handleIsActive("shipping-q-four")}
            aria-expanded={isActive === "shipping-q-four"}
            aria-controls="shipping-q-four"
          >
            <button className={styles.collapseBtn}>
              Do you offer worldwide shipping?
              <img
                src={isActive === "shipping-q-four" ? upArrow : downArrow}
                alt="arrow-tip"
              />
            </button>
            <p
              id={styles["shipping-q-four"]}
              style={{
                height:
                  isActive === "shipping-q-four"
                    ? `${activeQuestionHeight}px`
                    : 0,
                transition: "height .3s ease-in",
              }}
              aria-hidden={isActive !== "shipping-q-four"}
              ref={questionRefs["shipping-q-four"]}
            >
              Unfortunately, we currently only ship within Europe.
            </p>
          </div>
        </div>
      </div>
      <div className={styles["return"]}>
        <h2>RETURN</h2>
        <div className={styles["questions-container"]}>
          <div className={styles.question}>
            <button
              className={styles.collapseBtn}
              onClick={() => handleIsActive("return-q-one")}
              aria-expanded={isActive === "return-q-one"}
              aria-controls="return-q-one"
            >
              Do you accept Returns?
              <img
                src={isActive === "return-q-one" ? upArrow : downArrow}
                alt="arrow-tip"
              />
            </button>
            <p
              id="return-q-one"
              style={{
                height:
                  isActive === "return-q-one" ? `${activeQuestionHeight}px` : 0,
                transition: "height .3s ease-in",
              }}
              aria-hidden={isActive !== "return-q-one"}
              ref={questionRefs["return-q-one"]}
            >
              Yes, we accept returns in accordance with EU return policy laws.
              Under these regulations, you have the right to return products
              purchased from us within 14 days of receiving them. The returned
              items must be in their original condition and packaging.
            </p>
          </div>
        </div>
        <div className={styles["questions-container"]}>
          <div className={styles.question}>
            <button
              className={styles.collapseBtn}
              onClick={() => handleIsActive("return-q-two")}
              aria-expanded={isActive === "return-q-two"}
              aria-controls="return-q-two"
            >
              How to return a product?
              <img
                src={isActive === "return-q-two" ? upArrow : downArrow}
                alt="arrow-tip"
              />
            </button>
            <p
              id="return-q-two"
              style={{
                height:
                  isActive === "return-q-two" ? `${activeQuestionHeight}px` : 0,
                transition: "height .3s ease-in",
              }}
              aria-hidden={isActive !== "return-q-two"}
              ref={questionRefs["return-q-two"]}
            >
              Please reach out to us on <strong>orders@SI'allure.com</strong> or
              via our <Link to="/contact">Contact Form</Link> to inform us about
              your intention to return a product. We will guide you on how to
              prepare your return. This may include information on packaging,
              labeling, and the return shipping address.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.other}>
        <h2>OTHER</h2>
        <div className={styles["questions-container"]}>
          <div className={styles.question}>
            <button
              className={styles.collapseBtn}
              onClick={() => handleIsActive("other-q-one")}
              aria-expanded={isActive === "other-q-one"}
              aria-controls="other-q-one"
            >
              Are there any other questions?
              <img
                src={isActive === "other-q-one" ? upArrow : downArrow}
                alt="arrow-tip"
              />
            </button>
            <p
              id="other-q-one"
              style={{
                height:
                  isActive === "other-q-one" ? `${activeQuestionHeight}px` : 0,
                transition: "height .3s ease-in",
              }}
              aria-hidden={isActive !== "other-q-one"}
              ref={questionRefs["other-q-one"]}
            >
              Feel free to contact us through our
              <Link to="/contact"> Contact Form</Link>! We're here to assist you
              and will be happy to help with any inquiries you may have
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
