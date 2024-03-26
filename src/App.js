import React, { useEffect, useRef, useState } from "react";
import "./App.scss";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import Care from "./pages/care/Care";
import Footer from "./components/Footer";
import Shop from "./shop/Shop";
import ProductQuickView from "./shop/ProductQuickView";
import Cart from "./shop/Cart";
import FAQ from "./pages/FAQ/FAQ";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DetailedProduct from "./pages/detailedProduct/DetailedProduct";
import { createPortal } from "react-dom";
import BackDropFilter from "./components/BackDropFilter";
import useToggleState from "./hooks/useToggleState";
import useClickOutside from "./hooks/useClickOutside";
import ScrollToTop from "./components/common/ScrollToTop";
import SuccessfulPayment from "./pages/successfulPayment/SuccessfulPayment";
import axios from "axios";
import Cookies from "js-cookie";
import CookieConsentBanner from "./components/CookieConsentBanner";
import PoliciesAndTerms from "./pages/PoliciesAndTerms/PoliciesAndTerms";
import QuantityErrorsModal from "./components/QuantityErrorsModal";

// Function to generate a unique cart identifier (UUID)
const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

function App() {
  // State variables
  const [gotQuantityError, setGotQuantityError] = useState(false);
  const [quantityErrorMessage, setQuantityErrorMessage] = useState({});
  const [isCartActive, toggleCart, isInitialRender] = useToggleState(false);
  const cartRef = useRef(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [cart, setCart] = useState([]);

  // Effect to close cart when clicking outside
  useClickOutside(cartRef, toggleCart, isCartActive);

  // Function to update cart item count
  const updateCartItemCount = (count) => {
    setCartItemCount(count);
  };

  // Function to update subtotal price
  const updateSubTotalPrice = (price) => {
    setSubTotalPrice(price);
  };

  // Function to add a product to the cart
  const addToCart = async (product) => {
    try {
      // Fetch the current quantity in stock from the server
      const response = await axios.get(
        `https://e-commerce-api-j092.onrender.com/api/products/${product.id}/quantity`
      );
      const quantityInStock = response.data.quantityInStock;

      // Calculate the total quantity of the product (including existing quantity in cart)
      const totalQuantity = cart.reduce((total, item) => {
        if (item.id === product.id) {
          return total + item.quantity; // product quatity we try to add + product quantity in cart
        }
        return total;
      }, product.quantity); //initializing total with the product quantity we try to add

      // Check if the total quantity exceeds the available stock
      if (totalQuantity > quantityInStock) {
        // If the total quantity exceeds the available stock, display an alert
        setGotQuantityError(true);
        // Setting the error message to pass down to modal
        setQuantityErrorMessage({
          header: "UNABLE TO ADD TO CART",
          error: `Sorry, we currently only have ${quantityInStock} items available in stock.`,
          affectedProducts: "", //used on checkout to indicate which products should be reviewed
          errorResolve:
            "Please review your cart, you might have quantities of the product there.",
        });
        return; // Stop execution, do not add the product to the cart
      }

      // If the quantity check passes, send a request to add the product to the cart in DB
      await axios.post(
        "https://e-commerce-api-j092.onrender.com/api/cart/add-to-cart",
        {
          product_id: product.id,
          quantity: product.quantity,
          cart_id: Cookies.get("cartId"),
        }
      );

      // Find the index of the product in the cart array
      const existingProductIndex = cart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        // If the product is already in the cart, update its quantity
        const updatedCart = [...cart];
        const existingProduct = updatedCart[existingProductIndex];
        const newQuantity = existingProduct.quantity + product.quantity;

        existingProduct.quantity = newQuantity;

        // Update the cart with the modified product
        updatedCart[existingProductIndex] = existingProduct;
        setCart(updatedCart);
      } else {
        // If the product is not in the cart, add it
        setCart([...cart, product]);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      // Handle error (display error message, etc.)
    }
  };

  // Effect to set cookie cart identifier and fetch cart data
  useEffect(() => {
    const cartId = Cookies.get("cartId");
    if (!cartId) {
      const newCartId = generateUUID();
      Cookies.set("cartId", newCartId, { expires: 0.5 }); // expires in 12hrs
    } else {
      const fetchCartData = async () => {
        try {
          const response = await axios.get(
            `https://e-commerce-api-j092.onrender.com/api/cart/fetch-cart-data/${cartId}`
          );
          const cartData = response.data;

          setCart(cartData);

          let itemCount = 0;
          let totalPrice = 0;
          cartData.forEach((item) => {
            itemCount += item.quantity;
            totalPrice += item.quantity * item.price; // Assuming each item has a price property
          });
          setCartItemCount(itemCount);
          setSubTotalPrice(totalPrice);
        } catch (error) {
          console.error("Error fetching cart data:", error);
          // Handle error (display error message, etc.)
        }
      };

      fetchCartData();
    }
  }, []); // Run on mount

  return (
    <Router basename="/e-commerce-tu1r">
      <ScrollToTop />
      <CookieConsentBanner />
      <Navbar
        onClick={toggleCart}
        cartItemCount={cartItemCount}
        subTotalPrice={subTotalPrice}
      />
      <Routes>
        <Route path="/policies-and-terms" element={<PoliciesAndTerms />} />
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/care" element={<Care />} />
        <Route path="/shop" element={<Shop addToCart={addToCart} />} />
        <Route path="" element={<ProductQuickView />} />
        <Route path="/faq" element={<FAQ />} />
        <Route
          path="/product/:urlParameter"
          element={<DetailedProduct addToCart={addToCart} />}
        />
        <Route
          path="/stripe-payment-successful-page/"
          element={<SuccessfulPayment />}
        ></Route>
      </Routes>
      <Cart
        cart={cart}
        setCart={setCart}
        ref={cartRef}
        onClick={toggleCart}
        isInitialRender={isInitialRender}
        isCartActive={isCartActive}
        updateCartItemCount={updateCartItemCount}
        updateSubTotalPrice={updateSubTotalPrice}
      ></Cart>
      {isCartActive &&
        createPortal(
          <>
            <BackDropFilter />
          </>,
          document.getElementById("root")
        )}
      <Footer />
      {gotQuantityError ? (
        <QuantityErrorsModal
          setModalVisibility={setGotQuantityError}
          quantityErrorMessage={quantityErrorMessage}
        />
      ) : (
        ""
      )}
    </Router>
  );
}

export default App;
