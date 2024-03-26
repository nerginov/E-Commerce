import styles from "./Filter.module.scss";
import { useState, useEffect, forwardRef, useRef } from "react";
import Drawer from "../components/Drawer";
import downArrow from "../assets/arrow-point-down-svgrepo-com.svg";
import upArrow from "../assets/up-arrow-svgrepo-com.svg";

const initialState = {
  isActive: "Price",
  minValue: 1,
  maxValue: 100,
  availabilityFilters: { inStock: false, outOfStock: false },
  typeFilters: { hops: false, studs: false },
};

const Filter = forwardRef((props, ref) => {
  const [isActive, setIsActive] = useState(initialState.isActive);
  const [minValue, setMinValue] = useState(initialState.minValue);
  const [maxValue, setMaxValue] = useState(initialState.maxValue);
  const [typeFilters, setTypeFilters] = useState(initialState.typeFilters);
  const [availabilityFilters, setAvailabilityFilters] = useState(
    initialState.availabilityFilters
  );
  //calculatin the number of active filters to display on filter button
  const numberOfActiveFilters =
    (typeFilters.hops ? 1 : 0) +
    (typeFilters.studs ? 1 : 0) +
    (availabilityFilters.inStock ? 1 : 0) +
    (availabilityFilters.outOfStock ? 1 : 0) +
    (minValue !== 1 || maxValue !== 100 ? 1 : 0);

  //handling one dropdown active at a time
  const handleSetIsActive = (dropDownID) => {
    setIsActive(dropDownID === isActive ? null : dropDownID); // if content === isActive means the user is clicking an already open content, so we have to close.
  };

  //handling the min value, and storing it in a state
  const handleMinChange = (e) => {
    const inputMinValue = e.target.value;
    const newMinValue = parseInt(inputMinValue, 10);
    if (newMinValue + 4 < maxValue) {
      setMinValue(newMinValue);
    }
  };

  //handling the max value, and storing it in a state
  const handleMaxChange = (e) => {
    const inputMaxValue = e.target.value;
    const newMaxValue = parseInt(inputMaxValue, 10);
    if (newMaxValue > minValue + 4) {
      setMaxValue(newMaxValue);
    }
  };

  //storing the active dropdown's height.Using the height for smoother transition(works only with exact height value)
  const [activeDropDownHeight, setActiveDropDownHeight] = useState(null);
  //storing refs of each dropdown
  const dropDownRefs = {
    Price: useRef(null),
    Availability: useRef(null),
    Type: useRef(null),
    Material: useRef(null),
  };

  //handle type filters
  const handleTypeFilters = (type) => {
    switch (type) {
      case "hops":
        setTypeFilters({ ...typeFilters, hops: !typeFilters.hops });
        break;
      case "studs":
        setTypeFilters({ ...typeFilters, studs: !typeFilters.studs });
        break;
    }
  };
  //handle availability filters
  const handleAvailabilityFilters = (type) => {
    switch (type) {
      case "inStock":
        setAvailabilityFilters({
          ...availabilityFilters,
          inStock: !availabilityFilters.inStock,
        });
        break;
      case "outOfStock":
        setAvailabilityFilters({
          ...availabilityFilters,
          outOfStock: !availabilityFilters.outOfStock,
        });
        break;
    }
  };

  //handle the showresults button
  const handleShowResults = () => {
    // Create an object with all the filter states
    const filterStates = {
      isActive,
      minValue,
      maxValue,
      typeFilters,
      availabilityFilters,
    };

    // If both inStock and outOfStock are checked, reset the availability filters to show both
    if (availabilityFilters.inStock && availabilityFilters.outOfStock) {
      filterStates.availabilityFilters = {
        inStock: initialState.inStock,
        outOfStock: initialState.outOfStock,
      };
    }

    // If both hops and studs are checked, reset the type filters to show both
    if (typeFilters.hops && typeFilters.studs) {
      filterStates.typeFilters = {
        hops: initialState.typeFilters.hops,
        studs: initialState.typeFilters.studs,
      };
    }

    // Pass the filter states to the parent component
    props.setFilterStates(filterStates);
  };

  //on isActive state change update the activedropdownheight's state with active dropdown's height.
  useEffect(() => {
    if (isActive && dropDownRefs[isActive] && dropDownRefs[isActive].current) {
      setActiveDropDownHeight(dropDownRefs[isActive].current.scrollHeight);
    }
  }, [isActive]);

  return (
    <Drawer
      className={`${styles["filter-drawer"]} `}
      ref={ref}
      isDrawerActive={props.isFilterActive}
      isInitialRender={props.isInitialRender}
    >
      {/* header */}
      <header className={styles["drawer-header"]}>
        <h1 className={styles["drawer-title"]}>FILTERS</h1>
        <button className={styles["drawer-close"]} onClick={props.onClick}>
          X
        </button>
      </header>
      {/* filters */}
      <div className={styles["drawer-content"]}>
        <div className={styles.filter}>
          <button
            className={styles.collapseBtn}
            aria-expanded={isActive === "Price"}
            aria-controls={styles["filter-price"]}
            onClick={() => handleSetIsActive("Price")}
          >
            Price{" "}
            <img src={isActive == "Price" ? upArrow : downArrow} alt="arrow" />
          </button>
          <div
            className={styles["filter-price"]}
            ref={dropDownRefs["Price"]}
            id={styles["filter-price"]}
            aria-hidden={isActive !== "Price"}
            style={{
              height: isActive === "Price" ? `${activeDropDownHeight}px` : 0,
              transition: "height .3s ease-in",
            }}
          >
            <div className={styles["price-slider-container"]}>
              <input
                type="range"
                id={styles.sliderMin}
                min="0"
                max="100"
                value={minValue}
                onChange={handleMinChange}
              ></input>
              <input
                type="range"
                id={styles.sliderMax}
                min="0"
                max="100"
                value={maxValue}
                onChange={handleMaxChange}
              ></input>
            </div>

            <div className={styles["inputs-grp"]}>
              <label htmlFor={styles.inputMin}>
                <span>€</span>
                <input
                  type="number"
                  id={styles.inputMin}
                  value={minValue}
                  onChange={() => handleMinChange()}
                  aria-controls={styles.range} // Associates with the range input
                  aria-valuemin="0" // Sets the minimum value htmlFor screen readers
                  readOnly
                />
              </label>

              <span className={styles.separator}>-</span>
              <label htmlFor={styles.inputMax}>
                <span>€</span>
                <input
                  type="number"
                  id={styles.inputMax}
                  value={maxValue}
                  onChange={() => handleMaxChange()}
                  aria-controls={styles.range} // Associates with the range input
                  aria-valuemax="100" // Sets the maximum value htmlFor screen readers
                  readOnly
                />
              </label>
            </div>
          </div>
        </div>

        <div className={styles.filter}>
          <button
            className={styles.collapseBtn}
            aria-expanded={isActive === "Availability"}
            aria-controls={styles.availability}
            onClick={() => handleSetIsActive("Availability")}
          >
            Availability{" "}
            <img
              src={isActive == "Availability" ? upArrow : downArrow}
              alt="arrow"
            />
          </button>

          <div
            className={styles.options}
            ref={dropDownRefs["Availability"]}
            id={styles.availability}
            aria-hidden={isActive !== "Availability"}
            style={{
              height:
                isActive === "Availability" ? `${activeDropDownHeight}px` : 0,
              transition: "height .3s ease-in",
            }}
          >
            <label htmlFor="inStock">
              <input
                type="checkbox"
                id="inStock"
                onChange={() => handleAvailabilityFilters("inStock")}
              ></input>
              In Stock
            </label>
            <label htmlFor="outOfStock">
              <input
                type="checkbox"
                id="outOfStock"
                onChange={() => handleAvailabilityFilters("outOfStock")}
              ></input>
              Out Of Stock
            </label>
          </div>
        </div>

        <div className={styles.filter}>
          <button
            className={styles.collapseBtn}
            aria-expanded={isActive === "Type"}
            aria-controls={styles.type}
            onClick={() => handleSetIsActive("Type")}
          >
            Product Type{" "}
            <img src={isActive == "Type" ? upArrow : downArrow} alt="arrow" />
          </button>

          <div
            className={styles.options}
            ref={dropDownRefs["Type"]}
            id={styles.type}
            aria-hidden={isActive !== "Type"}
            style={{
              height: isActive === "Type" ? `${activeDropDownHeight}px` : 0,
              transition: "height .3s ease-in",
            }}
          >
            <label htmlFor="hops">
              <input
                type="checkbox"
                id="hops"
                onChange={() => {
                  handleTypeFilters("hops");
                }}
              ></input>
              Hops
            </label>
            <label htmlFor="studs">
              <input
                type="checkbox"
                id="studs"
                onChange={() => {
                  handleTypeFilters("studs");
                }}
              ></input>
              Studs
            </label>
          </div>
        </div>
      </div>
      {/* footer */}
      <div className={styles["drawer-footer"]}>
        <button
          onClick={() => {
            handleShowResults();
            props.onUpdateFilterCount(numberOfActiveFilters);
            props.onClick();
          }}
        >
          Show Results
        </button>
      </div>
    </Drawer>
  );
});

export default Filter;
