import styles from "./BackDropFilter.module.scss";

const BackDropFilter = (props) => {
  return <div className={styles.backdrop} onClick={props.onClick}></div>;
};

export default BackDropFilter;
