import styles from "./SearchBar.module.scss";
const SearchBar = (props) => {
  return (
    <>
      <input
        type="text"
        id={styles.search}
        name="search"
        placeholder="Search for a product..."
        onChange={props.handleSearch}
        ref={props.searchInputRef}
      ></input>
      <label htmlFor={styles.search} hidden>
        Search a product
      </label>
    </>
  );
};

export default SearchBar;
