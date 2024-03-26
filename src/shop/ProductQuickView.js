import styles from "./ProductQuickView.module.scss";
import Carousel from "react-multi-carousel";
import cart from "../assets/9025885_shopping_cart_icon.svg";
import { forwardRef, useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import QuantityErrorsModal from "../components/QuantityErrorsModal";

const ProductQuickView = forwardRef((props, ref) => {
  const [gotQuantityError, setGotQuantityError] = useState(false);
  const [quantityErrorMessage, setQuantityErrorMessage] = useState({});
  const [isIncrementDisabled, setIsIncrementDisabled] = useState(false); //disable icrement button until the fetch is complete

  //storing the product data from the clicked item
  const {
    quantityInStock,
    productName,
    productID,
    price,
    materials,
    dimensions,
    image,
    hoverImage,
    // additionalImage1,
    // additionalImage2,
  } = props.product;
  const images = [image, hoverImage]; //additionalImage1, additionalImage2

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  function reducer(state, action) {
    if (action.type === "increase_quantity") {
      return {
        ...state,
        quantity: state.quantity + 1,
      };
    }
    if (action.type === "decrease_quantity" && state.quantity > 1) {
      return {
        ...state,
        quantity: state.quantity - 1,
      };
    }
    return state;
  }
  const [state, dispatch] = useReducer(reducer, { quantity: 1 });

  //individual jigglingAnimation state
  const [isJiggling, setJiggling] = useState(false);

  //handle wuantity increment
  async function handleQuantityIncrement() {
    try {
      // Disable the increment button to prevent further clicks
      setIsIncrementDisabled(true);
      // Fetch the current quantity in stock from the server
      const response = await axios.get(
        `http://localhost:4000/api/products/${productID}/quantity`
      );

      const quantityInStock = response.data.quantityInStock;

      // Check if the new quantity exceeds the quantity in stock
      if (state.quantity + 1 > quantityInStock) {
        //gotQuantityError ? modal is open : modal is closed
        setGotQuantityError(true);
        //setting the error message to pass down to modal
        setQuantityErrorMessage({
          header: "UNABLE TO UPDATE QUANTITY",
          error:
            quantityInStock !== 0
              ? `Sorry, we currently only have ${quantityInStock} items available in stock.`
              : "Sorry, the product is currently out of stock",
          affectedProducts: "",
          errorResolve: "",
        });
        return;
      }

      // Dispatch action to increment the quantity
      dispatch({ type: "increase_quantity" });
    } catch (error) {
      console.error("Error fetching product quantity in stock:", error);
      // Handle error (display error message, etc.)
    } finally {
      // Re-enable the increment button after processing
      setIsIncrementDisabled(false);
    }
  }

  function generateProductURL(id, name) {
    // Replace spaces with dashes and encode the name
    const urlFriendlyName = encodeURIComponent(
      String(name).replace(/\s+/g, "-")
    );
    return `/product/${id}-${urlFriendlyName}`;
  }

  return (
    <>
      <div className={styles["product-quick-view"]}>
        {props.children}
        <div className={styles["content-wrapper"]} ref={ref}>
          <div className={styles.left}>
            <Carousel responsive={responsive}>
              {images.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:4000/${img}`}
                  alt={img}
                />
              ))}
            </Carousel>
            <Link to={generateProductURL(productID, productName)}>
              View Detailed Product Page
            </Link>
          </div>
          <div className={styles.right}>
            <div className={styles["product-info"]}>
              <h1>{productName}</h1>
              <p className={styles.price}>
                €{price}
                <br />
                <span>VAT included</span>
              </p>

              <h3>Dimensions:</h3>
              <ul>
                {dimensions && dimensions.width && (
                  <li>Width: ±{dimensions.width}mm</li>
                )}
                {dimensions && dimensions.height && (
                  <li>Height: ±{dimensions.height}mm</li>
                )}
              </ul>

              <h3>Materials:</h3>
              <ul>
                {materials &&
                  materials.map((material, index) => (
                    <li key={index}>{material}</li>
                  ))}
              </ul>
            </div>

            <div className={styles["product-action"]}>
              <div className={styles["customized-quantity-input"]}>
                <button
                  className={styles["quantity-decrease"]}
                  aria-label="Decrease Quantity"
                  onClick={() => {
                    dispatch({ type: "decrease_quantity" });
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max={quantityInStock} // the initial product fetched  quantity
                  value={state.quantity}
                  id={styles["quantity-input"]}
                  aria-label="Quantity"
                  readOnly
                />
                <button
                  className={styles["quantity-increase"]}
                  aria-label="Increase Quantity"
                  onClick={() => handleQuantityIncrement()}
                  disabled={isIncrementDisabled}
                >
                  +
                </button>
              </div>
              <button
                className={`${styles["add-to-cart-btn"]} ${
                  isJiggling && styles.active
                }`}
                onClick={() =>
                  quantityInStock > 0 &&
                  props.handleAddToCartClick(
                    isJiggling,
                    setJiggling,
                    state.quantity
                  )
                }
                style={quantityInStock < 1 ? { opacity: "0.7" } : {}}
              >
                {" "}
                <div className={styles["img-container"]}>
                  <img src={cart} alt="cart-icon" />
                </div>
                {quantityInStock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
          {gotQuantityError ? (
            <QuantityErrorsModal
              setModalVisibility={setGotQuantityError}
              quantityErrorMessage={quantityErrorMessage}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
});

export default ProductQuickView;
