import { useEffect } from "react";

function useClickOutside(ref, callback, isActive) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        isActive == true
      ) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, isActive]);
}

export default useClickOutside;

//use for pop-up components, to close when clicked outsiede of them. There is a condition for the component to be state(true) to call the callback, otherwide it will pop and close everytime you click somewhere in the site
