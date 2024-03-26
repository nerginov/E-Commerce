import styles from "./DetailedProduct.module.scss";
import Delivery from "../../pages/home/Delivery";
import PaymentMethods from "../../pages/home/PaymentMethods";
import Carousel from "react-multi-carousel";
import height from "../../assets/size-height-svgrepo-com.svg";
import width from "../../assets/size-width-svgrepo-com.svg";
import materials from "../../assets/material-svgrepo-com.svg";
import cart from "../../assets/9025885_shopping_cart_icon.svg";
import arrowDown from "../../assets/arrow-point-down-svgrepo-com.svg";
import arrowUp from "../../assets/up-arrow-svgrepo-com.svg";
import ShopItem from "../../shop/ShopItem/ShopItem";
import NewCollection from "../../components/NewCollection";
import { useRef, useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import QuantityErrorsModal from "../../components/QuantityErrorsModal";
import LazyLoader from "../../components/common/LazyLoader";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const DetailedProduct = (props) => {
  const [gotQuantityError, setGotQuantityError] = useState(false);
  const [quantityErrorMessage, setQuantityErrorMessage] = useState({});
  const { urlParameter } = useParams();
  const numericUrlParameter = urlParameter.split("-")[0];

  const [product, setProduct] = useState(null);
  const [productImagePaths, setProductImagePaths] = useState([]);
  const [productSuggestions, setProductSuggestions] = useState([]);
  const [isIncrementDisabled, setIsIncrementDisabled] = useState(false); //disable icrement button until the fetch is complete

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/products");
        const foundProduct = response.data.find(
          (p) => p.id === Number(numericUrlParameter)
        );
        setProduct(foundProduct);
        setProductSuggestions(
          response.data
            .filter((p) => p.id !== Number(numericUrlParameter))
            .slice(0, 4)
        );
        setProductImagePaths([
          foundProduct.main_image_path,
          // foundProduct.additional_image1_path,
          // foundProduct.additional_image2_path,
          foundProduct.hover_image_path,
        ]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

    // Reset state when URL changes
    return () => {
      dispatch({ type: "reset_quantity" });
      setProduct(null);
      setProductImagePaths([]);
      setProductSuggestions([]);
    };
  }, [urlParameter]);

  const [isJiggling, setJiggling] = useState(false);
  const [isActive, setIsActive] = useState(null);

  const [activeQuestionHeight, setActiveQuestionHeight] = useState(null);
  const handleIsActive = (questionID) => {
    setIsActive(isActive === questionID ? null : questionID);
  };
  const questionRefs = {
    return: useRef(null),
    shipping: useRef(null),
  };
  useEffect(() => {
    if (isActive && questionRefs[isActive] && questionRefs[isActive].current) {
      setActiveQuestionHeight(questionRefs[isActive].current.scrollHeight);
    }
  }, [isActive]);

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
    if (action.type === "reset_quantity") {
      return {
        ...state,
        quantity: 1,
      };
    }
    return state;
  }

  const [state, dispatch] = useReducer(reducer, { quantity: 1 });
  //handle quantity increment
  async function handleQuantityIncrement() {
    try {
      // Disable the increment button to prevent further clicks
      setIsIncrementDisabled(true);
      // Fetch the current quantity in stock from the server
      const response = await axios.get(
        `http://localhost:4000/api/products/${product.id}/quantity`
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

  const carouselRef = useRef(null);
  const handleImageClick = (index) => {
    if (carouselRef.current) {
      carouselRef.current.goToSlide(index + 1);
    }
  };

  const handleAddToCartClick = (isJiggling, setJiggling) => {
    if (isJiggling) {
      return;
    }

    setJiggling(true);

    setTimeout(() => {
      setJiggling(false);
    }, 1000);

    const productToAdd = {
      quantityInStock: product.quantity_in_stock, //using the data to set max value to input in cart
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: state.quantity,
      image: product.main_image_path,
    };

    props.addToCart(productToAdd);
  };

  useEffect(() => {
    dispatch({ type: "reset_quantity" });
  }, [urlParameter]);

  return (
    <>
      {product ? (
        <div className={styles["detailed-product"]}>
          <div className={styles["img-container"]}>
            <div className={styles["vertical-catalog"]}>
              {productImagePaths.map((path, index) => (
                <img
                  key={index}
                  src={`http://localhost:4000/${path}`}
                  alt={path}
                  onClick={() => handleImageClick(index + 1)}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>
            <div className={styles["carousel-container"]}>
              <Carousel
                ref={carouselRef}
                className={styles.carousel}
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={false}
                containerClass="container"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                  desktop: {
                    breakpoint: {
                      max: 3000,
                      min: 1024,
                    },
                    items: 1,
                  },
                  mobile: {
                    breakpoint: {
                      max: 464,
                      min: 0,
                    },
                    items: 1,
                  },
                  tablet: {
                    breakpoint: {
                      max: 1024,
                      min: 464,
                    },
                    items: 1,
                  },
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots
                sliderClass=""
                slidesToSlide={1}
                swipeable
              >
                {productImagePaths.map((path, index) => (
                  <img
                    key={index}
                    src={`http://localhost:4000/${path}`}
                    alt={path}
                    onClick={() => handleImageClick(index + 1)}
                    style={{
                      display: "block",
                      height: "100%",
                      margin: "auto",
                      width: "100%",
                    }}
                  />
                ))}
              </Carousel>
            </div>
          </div>

          <div className={styles["details-container"]}>
            {" "}
            <header>
              <h1>{product.name}</h1>
              <p>€{product.price}</p>{" "}
            </header>{" "}
            <div className={styles["product-info"]}>
              {" "}
              <div className={styles["product-description"]}>
                {" "}
                <p>
                  Meet our handmade earrings – each one has its own story. . We
                  make every earring by hand, from start to finish. That means
                  no two pairs are the same – just like you <br />
                  We put a lot of love and care into making each earring
                  special. They're inspired by everyday life, so you'll find a
                  piece of our world in every design. Our goal is for these
                  earrings to feel like a part of your journey, adding a little
                  bit of warmth and uniqueness to your style every day.
                </p>{" "}
              </div>{" "}
              <div className={styles["product-specifications"]}>
                {" "}
                <div>
                  <img src={height} alt="vertical-opposite-arrows" />
                  <p>Height</p>
                  <p>±{product.height}</p>{" "}
                </div>{" "}
                <div>
                  <img src={width} alt="horizontal-opposite-arrows" />
                  <p>Width</p>
                  <p>±{product.width}</p>{" "}
                </div>{" "}
                <div>
                  <img src={materials} alt="checklist" />
                  <p>Materials</p>{" "}
                  <ul>
                    {" "}
                    {product.materials &&
                      product.materials
                        .split(",")
                        .map((material, index) => (
                          <li key={index}>{material}</li>
                        ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className={styles.actions}>
              <div className={styles["customized-quantity-input"]}>
                <button
                  className={styles["quantity-decrease"]}
                  aria-label="Decrease Quantity"
                  aria-controls={styles["quantity-input"]}
                  onClick={() => {
                    dispatch({ type: "decrease_quantity" });
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.quantity_in_stock} //the quantity from the initial fetch
                  value={state.quantity}
                  id={styles["quantity-input"]}
                  aria-label="Quantity"
                  readOnly
                />
                <button
                  className={styles["quantity-increase"]}
                  aria-label="Increase Quantity"
                  aria-controls={styles["quantity-input"]}
                  onClick={() => handleQuantityIncrement()}
                  disabled={isIncrementDisabled}
                >
                  +
                </button>
              </div>
              <button
                onClick={() =>
                  product.quantity_in_stock > 0 &&
                  handleAddToCartClick(isJiggling, setJiggling)
                }
                className={`${styles["add-to-cart-btn"]} ${
                  isJiggling && styles.active
                }`}
                style={product.quantity_in_stock < 1 ? { opacity: "0.7" } : {}}
              >
                {" "}
                <div className={styles["img-container"]}>
                  <img src={cart} alt="cart-icon" />
                </div>
                {product.quantity_in_stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
          <div className={styles["shipping-and-return"]}>
            <div>
              <button
                onClick={() => handleIsActive("shipping")}
                aria-expanded={isActive === "shipping"}
                aria-controls="shipping"
              >
                Shipping & Handling{" "}
                <span>
                  <img
                    src={isActive === "shipping" ? arrowUp : arrowDown}
                    alt="arrow-tip"
                  />
                </span>
              </button>
              <p
                id="shipping"
                ref={questionRefs["shipping"]}
                aria-hidden={isActive !== "shipping"}
                style={{
                  height:
                    isActive === "shipping" ? `${activeQuestionHeight}px` : 0,
                  transition: "height .3s ease-in",
                }}
              >
                We currently only ship within Europe.
              </p>
            </div>
            <div>
              <button
                onClick={() => handleIsActive("return")}
                aria-expanded={isActive === "return"}
                aria-controls="return"
              >
                Returns{" "}
                <span>
                  <img
                    src={isActive === "return" ? arrowUp : arrowDown}
                    alt="arrow-tip"
                  />
                </span>
              </button>
              <p
                id="return"
                ref={questionRefs["return"]}
                aria-hidden={isActive !== "return"}
                style={{
                  height:
                    isActive === "return" ? `${activeQuestionHeight}px` : 0,
                  transition: "height .3s ease-in",
                }}
              >
                We accept returns in accordance with EU return policy laws.
                Under these regulations, you have the right to return products
                purchased from us within 14 days of receiving them. The returned
                items must be in their original condition and packaging
              </p>
            </div>
          </div>
          <div className={styles["care-instructions"]}>
            <h2>Care Instrucitons</h2>
            <p>
              Your polymer clay earrings are precious to us, and we want them to
              remain as stunning as the day you received them. Here's how you
              can maintain their beauty: store them in a clean, dry area away
              from other jewelry and sharp objects to prevent scratches. Avoid
              contact with water, chemicals, and makeup. If they become dirty,
              gently wipe them clean with a soft, damp cloth. <br />
              <br />
              Each pair of earrings is handmade with love, ensuring that no two
              are exactly alike. These slight imperfections add to their charm,
              making each pair truly unique. Rest assured, our earrings undergo
              careful quality checks to ensure they're durable and resilient,
              ready to accompany you through your everyday adventures.
              <br />
              <br />
              While your earrings can handle a little bending or dropping, we
              recommend handling them with care to preserve their beauty.
            </p>
          </div>
        </div>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}

      <Delivery className={styles.delivery}></Delivery>
      <LazyLoader>
        <section className={styles["suggestions"]}>
          <h1>You may also like</h1>
          <Carousel responsive={responsive}>
            {productSuggestions.map((product) => (
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
                margin="10px"
                addToCart={props.addToCart}
              />
            ))}
          </Carousel>
        </section>
      </LazyLoader>
      <NewCollection></NewCollection>
      <PaymentMethods></PaymentMethods>

      {gotQuantityError ? (
        <QuantityErrorsModal
          setModalVisibility={setGotQuantityError}
          quantityErrorMessage={quantityErrorMessage}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default DetailedProduct;
