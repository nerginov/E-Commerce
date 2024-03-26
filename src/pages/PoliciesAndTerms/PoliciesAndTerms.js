import React, { useState } from "react";
import PrivacyPolicy from "./PrivacyPolicy";
import CookiePolicy from "./CookiePolicy";
import TermsAndConditions from "./TermsAndConditions";
import styles from "./PoliciesAndTerms.module.scss";
import useWindowResize from "../../hooks/useWindowResize";

const PoliciesAndTerms = () => {
  const windowWidth = useWindowResize();
  const [selectedTab, setSelectedTab] = useState("Privacy Policy");

  const handleTabClick = (tab) => {
    // Smooth scroll to the top of the window when a sidebar link is clicked
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setSelectedTab(tab);
  };

  // Function to render the appropriate component based on the selected tab
  const renderContent = () => {
    switch (selectedTab) {
      case "Privacy Policy":
        return <PrivacyPolicy />;
      case "Cookie Policy":
        return <CookiePolicy />;
      case "Terms and Conditions":
        return <TermsAndConditions />;
      default:
        return null;
    }
  };

  return (
    <div className={styles["terms-and-policies"]}>
      <div className={styles.content}>
        {windowWidth > 767 && (
          <div className={styles.sidebar}>
            <ul>
              <li
                onClick={() => handleTabClick("Privacy Policy")}
                className={
                  selectedTab === "Privacy Policy" ? styles.activeTab : ""
                }
              >
                Privacy Policy
              </li>
              <li
                onClick={() => handleTabClick("Cookie Policy")}
                className={
                  selectedTab === "Cookie Policy" ? styles.activeTab : ""
                }
              >
                Cookie Policy
              </li>
              <li
                onClick={() => handleTabClick("Terms and Conditions")}
                className={
                  selectedTab === "Terms and Conditions" ? styles.activeTab : ""
                }
              >
                Terms and Conditions
              </li>
            </ul>
          </div>
        )}
        <div className={styles["main-content"]}>{renderContent()}</div>
      </div>
    </div>
  );
};

export default PoliciesAndTerms;
