import styles from "./ToolBar.module.scss";
import Sort from "./Sort";
import Filter from "./Filter";
import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import BackDropFilter from "../components/BackDropFilter";
import useToggleState from "../hooks/useToggleState";
import useClickOutside from "../hooks/useClickOutside";
import downArrow from "../assets/arrow-point-down-svgrepo-com.svg";
import upArrow from "../assets/up-arrow-svgrepo-com.svg";
import SearchBar from "../components/SearchBar";
import { useEffect } from "react";

const ToolBar = (props) => {
  const [isFilterActive, toggleFilter, isInitialRender] = useToggleState(false);
  const [isSortActive, setIsSortActive] = useState(false);
  const [animationClass, setAnimationClass] = useState();
  const filterRef = useRef(null);
  const sortRef = useRef(null);

  const toggleSort = () => {
    if (!isSortActive) {
      setAnimationClass("popup");
      setIsSortActive(true);
    } else {
      setAnimationClass("popout");
      setTimeout(() => {
        setIsSortActive(false);
      }, 200);
    }
  }; //not using the custom hook to avoid the scroll restriction set in it

  useClickOutside(sortRef, toggleSort, isSortActive);
  useClickOutside(filterRef, toggleFilter, isFilterActive);

  // Update the filter button count text state
  const [filterButtonCount, setFilterButtonCount] = useState();
  const updateFilterButtonCount = (numberOfActiveFilters) => {
    setFilterButtonCount(numberOfActiveFilters);
  };

  return (
    <div className={styles["shop-tool-bar"]}>
      <SearchBar
        handleSearch={props.handleSearch}
        searchInputRef={props.searchInputRef}
      ></SearchBar>
      <label htmlFor={styles.search} hidden>
        Search a product
      </label>
      <div className={styles.group}>
        {/* start of dropdown sort + toolbar part */}
        <div className={styles["customize-sort"]} ref={sortRef}>
          <button className={styles["sort-button"]} onClick={toggleSort}>
            Sort
            <img src={isSortActive ? upArrow : downArrow} alt="arrow" />
          </button>
          {isSortActive && (
            <Sort
              choiceOnClick={props.choiceOnClick}
              onClick={toggleSort}
              className={
                animationClass == "popup" ? styles.popup : styles.popout
              }
            />
          )}
        </div>
        {/* start of drawer filter * toolbar part*/}
        <div className={styles["customize-filter"]}>
          <button className={styles["filter-button"]} onClick={toggleFilter}>
            Filters<span>({filterButtonCount ? filterButtonCount : 0})</span>
          </button>

          <Filter
            onClick={toggleFilter}
            ref={filterRef}
            isFilterActive={isFilterActive}
            isInitialRender={isInitialRender}
            onUpdateFilterCount={updateFilterButtonCount}
            setFilterStates={props.setFilterStates}
          />

          {isFilterActive &&
            createPortal(<BackDropFilter />, document.getElementById("root"))}
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
