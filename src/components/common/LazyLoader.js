import React, { useRef, useEffect, useState } from "react";

const LazyLoader = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when target element becomes visible
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Unobserve target element to prevent unnecessary re-renders
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 } // Set threshold as needed
    );

    // Start observing target element
    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    // Cleanup function
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, []);

  return <div ref={targetRef}>{isVisible ? children : null}</div>;
};

export default LazyLoader;
