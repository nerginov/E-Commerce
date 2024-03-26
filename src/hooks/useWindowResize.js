import { useEffect, useState } from "react";

function useWindowResize() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    // 3. Define a callback function 'handleResize'.
    const handleResize = () => {
      // 4. Update the 'windowWidth' state with the current window's inner width.
      setWindowWidth(window.innerWidth);
    };

    // 5. Add an event listener for the 'resize' event, calling 'handleResize' when it occurs.
    window.addEventListener("resize", handleResize);

    // 6. Clean up the event listener when the component unmounts.
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);
  return windowWidth;
}

export default useWindowResize;

//hook used to keep track of screen resizing, and use it for conditionaly rendar based on screen size
