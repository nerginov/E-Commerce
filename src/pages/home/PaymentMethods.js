import styles from "./PaymentMethods.module.scss";
import visa from "../../assets/payments/294654_visa_icon.svg";
import mastercard from "../../assets/payments/mc_symbol.svg";
import applepay from "../../assets/payments/apple-pay-logo-svgrepo-com.svg";
import googlepay from "../../assets/payments/google-pay-primary-logo-logo-svgrepo-com.svg";
import klarna from "../../assets/payments/Klarna marketing badge (pink rgb.svg).svg";
import sepa from "../../assets/payments/sepa-seeklogo.com.svg";
import giropay from "../../assets/payments/giropay.svg";

const PaymentMethods = () => {
  return (
    <div className={styles["payment-methods"]}>
      <img src={visa} loading="lazy" alt="visa-icon" />
      <img src={mastercard} loading="lazy" alt="mastercard-icon" />
      <img src={applepay} loading="lazy" alt="applepay-icon" />
      <img src={googlepay} loading="lazy" alt="googlepay-icon" />
      <img src={klarna} loading="lazy" alt="klarna-icon" />
      <img src={sepa} loading="lazy" alt="sepa-icon" />
      <img src={giropay} loading="lazy" alt="giropay-icon" />´
    </div>
  );
};

export default PaymentMethods;
