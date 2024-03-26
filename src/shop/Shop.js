import React, { useEffect, useRef, useState } from "react";
import styles from "./Shop.module.scss";
import ShopItem from "./ShopItem/ShopItem";
import ToolBar from "./ToolBar";
import axios from "axios";

const Shop = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  // Fetching products from the server on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/products");
        setAllProducts(response.data);
        setDisplayedProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const [filterStates, setFilterStates] = useState({
    minValue: 1,
    maxValue: 100,
    availabilityFilters: { inStock: false, outOfStock: false },
    typeFilters: { hops: false, studs: false },
  });

  // Function to apply filters to products
  const applyFiltersToProducts = (productsArray, filterStates) => {
    return productsArray.filter((product) => {
      const isPriceInRange =
        product.price >= filterStates.minValue &&
        product.price <= filterStates.maxValue;

      const isQuantityAvailable = product.quantity_in_stock > 0;

      let isAvailabilityFiltered = true;

      if (
        filterStates.availabilityFilters.inStock &&
        filterStates.availabilityFilters.outOfStock
      ) {
        // Both in stock and out of stock are selected, so no need to filter
      } else if (
        filterStates.availabilityFilters.inStock &&
        !isQuantityAvailable
      ) {
        isAvailabilityFiltered = false; // Not in stock but filtered for in stock
      } else if (
        filterStates.availabilityFilters.outOfStock &&
        isQuantityAvailable
      ) {
        isAvailabilityFiltered = false; // In stock but filtered for out of stock
      }

      const isHopsFiltered =
        !filterStates.typeFilters.hops ||
        (filterStates.typeFilters.hops && product.type === "hops");

      const isStudsFiltered =
        !filterStates.typeFilters.studs ||
        (filterStates.typeFilters.studs && product.type === "studs");

      return (
        isPriceInRange &&
        isAvailabilityFiltered &&
        isHopsFiltered &&
        isStudsFiltered
      );
    });
  };

  // Ref for search input field
  const searchInputRef = useRef(null);
  // Handler for searching products
  const handleSearch = () => {
    const inputValue = searchInputRef.current.value.toLowerCase();

    let filteredProducts = allProducts;
    if (inputValue) {
      filteredProducts = allProducts.filter((product) =>
        product.name.toLowerCase().includes(inputValue)
      );
    }

    setDisplayedProducts(
      applyFiltersToProducts(filteredProducts, filterStates)
    );
  };

  // Handler for sorting products
  const handleSort = (sortOption) => {
    setDisplayedProducts(sortProducts(displayedProducts, sortOption));
  };

  // Function to sort products based on the selected option
  const sortProducts = (productsArray, sortOption) => {
    let sortedProducts = [...productsArray];

    switch (sortOption) {
      case "lowToHigh":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "highToLow":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "oldToNew":
        sortedProducts.sort(
          (a, b) => new Date(b.add_date) - new Date(a.add_date)
        );
        break;
      case "newToOld":
        sortedProducts.sort(
          (a, b) => new Date(a.add_date) - new Date(b.add_date)
        );
        break;
      default:
        break;
    }

    return sortedProducts;
  };

  // Effect to apply filters whenever filter states change
  useEffect(() => {
    setDisplayedProducts(applyFiltersToProducts(allProducts, filterStates));
  }, [filterStates]);

  return (
    <div className={styles.shop}>
      <header className={styles.header}>
        <h1>Products</h1>
        <p>
          Each set of earrings is carefully and uniquely hand-made, which may
          result in slight differences.
          <br /> No two pairs are exactly the same, making every pair unique!
        </p>
      </header>

      <ToolBar
        handleSearch={handleSearch}
        searchInputRef={searchInputRef}
        choiceOnClick={handleSort}
        setFilterStates={setFilterStates}
      />
      <div className={styles["shop-products-container"]}>
        {displayedProducts.map((product) => (
          <ShopItem
            quantityInStock={product.quantity_in_stock}
            key={product.id}
            productName={product.name}
            price={product.price}
            productID={product.id}
            image={product.main_image_path}
            hoverImage={product.hover_image_path}
            additionalImage1={product.additional_image1_path}
            additionalImage2={product.additional_image2_path}
            dimensions={{ width: product.width, height: product.height }}
            materials={product.materials.split(",")}
            addToCart={props.addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Shop;
