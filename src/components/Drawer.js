import { forwardRef } from "react";
import styles from "./Drawer.module.scss";

const Drawer = forwardRef((props, ref) => {
  const getDrawerState = () => {
    if (props.isDrawerActive && !props.isInitialRender) {
      return styles["active-drawer"];
    } else if (!props.isDrawerActive && !props.isInitialRender) {
      return styles["inactive-drawer"];
    } else {
      return "";
    }
  };

  return (
    <div
      className={`${styles.drawer} ${
        props.className || ""
      } ${getDrawerState()} `}
      ref={ref}
    >
      {props.children}
    </div>
  );
});

export default Drawer;
