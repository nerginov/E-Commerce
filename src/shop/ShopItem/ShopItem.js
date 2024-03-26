import styles from "./ShopItem.module.scss";
import cart from "../../assets/9025885_shopping_cart_icon.svg";
import { useState, React, useRef } from "react";
import { createPortal } from "react-dom";
import ProductQuickView from "../ProductQuickView";
import BackDropFilter from "../../components/BackDropFilter";
import { useEffect } from "react";
import useToggleState from "../../hooks/useToggleState";
import useClickOutside from "../../hooks/useClickOutside";
import useWindowResize from "../../hooks/useWindowResize";
import { useNavigate } from "react-router-dom";

const ShopItem = (props) => {
  const navigate = useNavigate();
  function generateProductURL(id, name) {
    // Replace spaces with dashes and encode the name
    const urlFriendlyName = encodeURIComponent(
      String(name).replace(/\s+/g, "-")
    );
    return `/product/${id}-${urlFriendlyName}`;
  }
  const redirectToDetailedProduct = () => {
    navigate(generateProductURL(props.productID, props.productName));
  };

  const [isHovered, setIsHovered] = useState(false);
  const [isQickViewActive, toggleQuickView] = useToggleState(false);
  const quickViewRef = useRef(null);
  const closeQuickView = () => {
    toggleQuickView();
  };
  useClickOutside(quickViewRef, closeQuickView, isQickViewActive);

  const handleMouseOver = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const windowWidth = useWindowResize();

  //taking the state as props, so i can reuse the function with different state outside of this component
  const [isJiggling, setJiggling] = useState(false);
  const handleAddToCartClick = (isJiggling, setJiggling, quantity) => {
    // Prevent clicking before the animation is done
    if (isJiggling) {
      return;
    }

    // Trigger the jiggling animation
    setJiggling(true);

    // Remove the jiggling class after the animation completes
    setTimeout(() => {
      setJiggling(false);
    }, 1000);

    // Create a product object with the relevant information
    const productToAdd = {
      id: props.productID,
      name: props.productName,
      price: props.price,
      quantityInStock: props.quantityInStock,
      quantity: quantity,
      image: props.image,
    };

    // Call the addToCart function passed as a prop
    props.addToCart(productToAdd);
  };

  return (
    <>
      <div
        className={styles["shop-item"]}
        style={windowWidth < 1025 ? { marginInline: props.margin } : {}}
      >
        <div
          className={styles.imgContainer}
          onMouseEnter={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          {isHovered && windowWidth > 1024 ? (
            <>
              <img
                src={`https://e-commerce-api-j092.onrender.com/${props.hoverImage}`}
                alt={props.hoverImage}
                onClick={toggleQuickView}
              />

              <button
                className={`${styles.quickView} ${
                  isHovered ? styles.hovered : ""
                }`}
                onClick={toggleQuickView}
              >
                Quick View
              </button>
            </>
          ) : (
            <img
              src={`https://e-commerce-api-j092.onrender.com/${props.image}`}
              alt={props.image}
              onClick={redirectToDetailedProduct}
            />
          )}
          {/* <img src={img} alt="item" />
        <img src={imgHover} alt="" />
        <button className={styles.quickView}>Quick View</button> */}
        </div>
        <div className={styles.description}>
          <span className={styles.name}>{props.productName}</span>
          <span className={styles.price}>€{props.price}</span>
          <span className={styles.vat}>VAT included</span>
          <button
            className={`${styles.addToCart} ${isJiggling && styles.active}`}
            onClick={() =>
              props.quantityInStock > 0 &&
              handleAddToCartClick(isJiggling, setJiggling, 1)
            }
            style={props.quantityInStock < 1 ? { opacity: "0.7" } : {}}
          >
            {" "}
            <div className={styles["img-container"]}>
              <img src={cart} alt="cart-icon" />
            </div>
            {props.quantityInStock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
      {isQickViewActive &&
        createPortal(
          <>
            <ProductQuickView
              ref={quickViewRef}
              product={props}
              handleAddToCartClick={handleAddToCartClick}
            >
              {" "}
              <BackDropFilter />
            </ProductQuickView>
          </>,
          document.getElementById("root")
        )}
    </>
  );
};

export default ShopItem;
