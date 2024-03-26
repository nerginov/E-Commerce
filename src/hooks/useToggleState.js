import { useState, useEffect } from "react";

function useToggleState(initialState) {
  const [isActive, setIsActive] = useState(initialState);
  const [isInitialRender, setIsInitialRender] = useState(true);

  const toggleState = () => {
    setIsActive((prev) => !prev);
    setIsInitialRender(false);
  };

  useEffect(() => {
    document.body.style.overflow = isActive ? "hidden" : "auto";
  }, [isActive]);

  return [isActive, toggleState, isInitialRender];
}

export default useToggleState;

//custom state toggle management hook with additional overflow hidden/auto toggle on change. true=hidde, false=auto
//using the isInitialRender to avoid adding animation classNames on initial Render. Example: Drawer inactive transition is visible on  initial otherwise.
