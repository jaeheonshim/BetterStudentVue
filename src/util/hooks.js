import React from "react";

export const useInterval = (callback, delay) => {
    const savedCallback = React.useRef();
  
    React.useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    React.useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }, []);
  };