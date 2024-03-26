import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import styles from "./CookieConsentBanner.module.scss";
import CookiePolicy from "../pages/PoliciesAndTerms/CookiePolicy";
import useWindowResize from "../hooks/useWindowResize";

const CookieConsentPopup = () => {
  const [isVisible, setIsVisible] = useState(!Cookies.get("cookiesAccepted"));
  const [showCookiePolicy, setShowCookiePolicy] = useState(false); // State to control whether to show CookiePolicy
  const windowWidth = useWindowResize();

  const handleAcceptCookies = () => {
    Cookies.set("cookiesAccepted", "true", { expires: 365 });
    setIsVisible(false);
  };

  useEffect(() => {
    // Set overflow to hidden only if isVisible is true
    if (isVisible) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }

    // Reset overflow when the component unmounts or isVisible becomes false
    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [isVisible]);

  const handleViewCookiePolicy = () => {
    setShowCookiePolicy(true); // Set state to true to show CookiePolicy
  };

  const handleCloseCookiePolicy = () => {
    setShowCookiePolicy(false); // Set state to false to hide CookiePolicy
  };

  return (
    <>
      {isVisible && (
        <div className={styles.cookiePopup}>
          <div className={styles.cookiePopupContent}>
            <p>
              We use cookies to ensure that we give you the best experience on
              our website. If you continue to use this site, we will assume that
              you are happy with it.
            </p>
            <div className={styles.cookiePopupButtons}>
              <button
                className={styles.cookieButtonOK}
                onClick={() => {
                  handleAcceptCookies();
                  setShowCookiePolicy(false);
                }}
              >
                OK
              </button>
              <button
                className={styles.cookieButtonPolicy}
                onClick={
                  showCookiePolicy
                    ? handleCloseCookiePolicy
                    : handleViewCookiePolicy
                }
              >
                Cookie Policy
              </button>
            </div>
          </div>
          {showCookiePolicy && (
            <div className={styles.cookiePolicyModal}>
              <button
                className={styles.closeTop}
                onClick={handleCloseCookiePolicy}
              >
                X
              </button>
              <CookiePolicy />
              {windowWidth < 767 && (
                <button
                  className={styles.closeBottom}
                  onClick={handleCloseCookiePolicy}
                >
                  Close
                </button>
              )}
            </div>
          )}
        </div>
      )}
      {/* Conditionally render CookiePolicy modal */}
    </>
  );
};

export default CookieConsentPopup;
