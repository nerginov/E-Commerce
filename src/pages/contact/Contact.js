import Form from "./Form";
import styles from "./Contact.module.scss";

const Contact = () => {
  return (
    <div className={styles.contactWrapper}>
      <h1 className={styles.header}>
        Contact Us. <br />
        It's a Piece of Cake!
      </h1>
      <Form className={styles.form} />
      <div className={styles["content-info"]}>
        <h2 className={styles["content-info--header"]}>
          Let's <span>talk</span> about <span>everything.</span>
        </h2>
        <p className={styles["content-info--paragraph"]}>
          Have questions, ideas, or want to discuss anything related to our
          products, delivery, or potential collaborations? <br />
          We're here to help and eager to hear from you. Feel free to reach out
          with any inquiries or thoughts you may have.
          <br />
          Your input matters to us, and we're excited to connect with you.
        </p>
      </div>
    </div>
  );
};

export default Contact;
