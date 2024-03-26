import styles from "./Sort.module.scss";

const Sort = (props) => {
  return (
    <div className={`${styles["sort-dropdown"]} ${props.className}`}>
      <ul className={styles["sort-dropdown__choices"]}>
        <li>
          <button
            onClick={() => {
              props.onClick();
              props.choiceOnClick("lowToHigh");
            }}
          >
            Price, low to high
          </button>
        </li>

        <li>
          <button
            onClick={() => {
              props.onClick();
              props.choiceOnClick("highToLow");
            }}
          >
            Price, high to low
          </button>
        </li>

        <li>
          <button
            onClick={() => {
              props.onClick();
              props.choiceOnClick("oldToNew");
            }}
          >
            Date, old to new
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              props.onClick();
              props.choiceOnClick("newToOld");
            }}
          >
            Date, new to old
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sort;
