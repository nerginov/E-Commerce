import styles from "./QuantityErrorsModal.module.scss";

//   alert(`Sorry, only ${quantityInStock} items available in stock.`);
// "Oops! It looks like some items in your cart are no longer available in the quantity you requested. This may be due to high demand or changes in availability since you added them to your cart.:\n\n" "\nTo proceed, you can review your cart and adjust the quantity of the affected items.\nThank you for shopping with us!\n")
const QuantityErrorsModal = ({ setModalVisibility, quantityErrorMessage }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles["error-modal"]}>
        <div className={styles["modal-content"]}>
          <h2>{quantityErrorMessage.header}</h2>
          <p>{quantityErrorMessage.error}</p>
          {quantityErrorMessage.affectedProducts ? (
            <ul>
              {quantityErrorMessage.affectedProducts.map((product, index) => (
                <li key={index}>&#x2022;{product}</li>
              ))}{" "}
            </ul>
          ) : (
            ""
          )}

          <p>{quantityErrorMessage.errorResolve}</p>
          {/* <p>{quantityErrorMessage}</p> */}
        </div>
        <button onClick={() => setModalVisibility(false)}>OKAY</button>
      </div>
    </div>
  );
};

export default QuantityErrorsModal;
