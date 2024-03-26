import styles from "./Cart.module.scss";
import Drawer from "../components/Drawer";
import { forwardRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import QuantityErrorsModal from "../components/QuantityErrorsModal";
const Cart = forwardRef(
  (
    {
      isCartActive,
      isInitialRender,
      updateCartItemCount,
      updateSubTotalPrice,
      onClick,
      cart,
      setCart,
      cartId,
    },
    ref
  ) => {
    const [gotQuantityError, setGotQuantityError] = useState(false);
    const [quantityErrorMessage, setQuantityErrorMessage] = useState({});
    const [isIncrementDisabled, setIsIncrementDisabled] = useState(false); //disable icrement button until the fetch is complete

    const navigate = useNavigate();
    function generateProductURL(id, name) {
      // Replace spaces with dashes and encode the name
      const urlFriendlyName = encodeURIComponent(
        String(name).replace(/\s+/g, "-")
      );
      return `/product/${id}-${urlFriendlyName}`;
    }
    const redirectToProduct = (productID, productName) => {
      navigate(generateProductURL(productID, productName));
    };

    // Handle quantity icrement
    const handleQuantityIncrement = async (productId, newQuantity) => {
      try {
        // Disable the increment button to prevent further clicks
        setIsIncrementDisabled(true);
        // Fetch the current quantity in stock from the server
        const response = await axios.get(
          `https://e-commerce-api-j092.onrender.com/api/products/${productId}/quantity`
        );

        const quantityInStock = response.data.quantityInStock;

        // Check if the new quantity exceeds the quantity in stock
        if (newQuantity > quantityInStock) {
          //gotQuantityError ? modal is open : modal is closed
          setGotQuantityError(true);
          //setting the error message to pass down to modal
          setQuantityErrorMessage({
            header: "UNABLE TO UPDATE QUANTITY",
            error: `Sorry, we currently only have ${quantityInStock} items available in stock.`,
            affectedProducts: "",
            errorResolve: ``,
          });
          return;
        }

        // Update the quantity in the cart and the database
        const updatedCart = cart.map((product) =>
          product.id === productId
            ? { ...product, quantity: newQuantity }
            : product
        );
        setCart(updatedCart);
        //database cart update
        await updateQuantityInDatabase(productId, newQuantity);
      } catch (error) {
        console.error("Error updating product quantity in cart:", error);
      } finally {
        // Re-enable the increment button after processing
        setIsIncrementDisabled(false);
      }
    };

    //Handle decrement quantity
    const handleQuantityDecrement = async (productId, newQuantity) => {
      try {
        if (newQuantity < 1) {
          // If the new quantity is less than 1, remove the product from the cart plus db
          handleRemoveProduct(productId);
          return;
        }

        // Update the quantity in the cart and the database
        const updatedCart = cart.map((product) =>
          product.id === productId
            ? { ...product, quantity: newQuantity }
            : product
        );
        setCart(updatedCart);
        //database cart update
        await updateQuantityInDatabase(productId, newQuantity);
      } catch (error) {
        console.error("Error updating product quantity in cart:", error);
      }
    };

    // Handle removing a product from the cart
    const handleRemoveProduct = async (productId) => {
      try {
        // Remove the product from the cart in the database
        const response = await axios.post(
          "https://e-commerce-api-j092.onrender.com/api/cart/remove-from-cart",
          {
            cartId: Cookies.get("cartId"),
            productId: productId,
          }
        );

        if (response.status === 200) {
          // If the product is successfully removed from the database cart, update the local state
          const updatedCart = cart.filter(
            (product) => product.id !== productId
          );
          setCart(updatedCart);
        }
      } catch (error) {
        console.error("Error removing product from cart:", error);
      }
    };

    // Update quantity in the database
    const updateQuantityInDatabase = async (productId, newQuantity) => {
      try {
        // Update the quantity of the product in the database cart
        await axios.post(
          "https://e-commerce-api-j092.onrender.com/api/cart/update-quantity",
          {
            cartId: Cookies.get("cartId"),
            productId: productId,
            quantity: newQuantity,
          }
        );
      } catch (error) {
        console.error("Error updating product quantity in cart:", error);
      }
    };

    // handling the pricing
    const [subtotal, setSubtotal] = useState(0);
    const [shippingCost, setShippingCost] = useState(0);

    useEffect(() => {
      // Calculate subtotal
      const newSubtotal = cart.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      );
      setSubtotal(newSubtotal);

      //calculating the total number of items in the cart
      const totalProducts = cart.reduce(
        (sum, product) => sum + product.quantity,
        0
      );

      // Determine shipping cost
      const newShippingCost = newSubtotal < 20 ? 6.0 : 0;
      setShippingCost(newShippingCost);

      // Update the parent component with the new cart item count and total price
      updateCartItemCount(totalProducts);
      updateSubTotalPrice(newSubtotal);
    }, [cart, updateCartItemCount, updateSubTotalPrice]);

    //handle stripe checkout
    const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

    const handleCheckout = async () => {
      // Disable the checkout button to prevent multiple clicks
      setIsCheckoutLoading(true);

      try {
        // Verify quantities before checkout
        const verifyQuantitiesResponse = await axios.post(
          "https://e-commerce-api-j092.onrender.com/api/stripe/verify-quantities",
          { cartItems: cart }
        );

        if (!verifyQuantitiesResponse.data.quantitiesValid) {
          // Quantities are not valid, construct detailed alert message
          const { insufficientStockProducts } = verifyQuantitiesResponse.data;

          //setting the error message to pass down to modal
          setQuantityErrorMessage({
            header: "UNABLE TO PROCEED TO CHECKOUT",
            error:
              "Oops! It looks like some items in your cart are no longer available in the quantity you requested.",
            affectedProducts: insufficientStockProducts.map(
              (product) =>
                `${product.name}: Only ${product.quantity_in_stock} left in stock`
            ),
            errorResolve:
              "To proceed, you can review your cart and adjust the quantity of the affected items.",
          });

          //gotQuantityError ? modal is open : modal is closed
          setGotQuantityError(true);

          setIsCheckoutLoading(false); // Enable the checkout button
          return;
        }

        // Quantities are valid, proceed with checkout
        const response = await axios.post(
          "https://e-commerce-api-j092.onrender.com/api/stripe/create-checkout-session",
          {
            cartItems: cart,
            returnUrl: window.location.href, // Pass the current page URL as return URL
          }
        );

        // Extract url from the response data
        const url = response.data.url;

        // Ensure sessionId is valid before redirecting
        if (url) {
          // Redirect the user to the Stripe Checkout page
          window.location.href = url;
        } else {
          console.error("Error: Invalid sessionId received");
          // Handle error (display error message, etc.)
        }
      } catch (error) {
        console.error("Error creating checkout session:", error);
        // Handle error (display error message, etc.)
      } finally {
        // Enable the checkout button after receiving a response or encountering an error
        setIsCheckoutLoading(false);
      }
    };

    return (
      <Drawer
        isDrawerActive={isCartActive}
        isInitialRender={isInitialRender}
        className={styles["cart-drawer"]}
        ref={ref}
      >
        <div className={styles.header}>
          <h1>Cart</h1>
          <button className={styles.close} onClick={onClick}>
            X
          </button>
        </div>
        <p className={styles.shipping}>
          {subtotal >= 20
            ? "Congrats, you've reached free shipping!"
            : `Just €${(20.0 - subtotal).toFixed(
                2
              )} left to enjoy free shipping!`}
        </p>
        <div className={styles["cart-product-container"]}>
          {cart.map((product) => (
            <div className={styles.product} key={product.id}>
              <img
                alt={product.image}
                src={`https://e-commerce-api-j092.onrender.com/${product.image}`}
                onClick={() => {
                  redirectToProduct(product.id, product.name);
                }}
              />
              <h2
                onClick={() => {
                  redirectToProduct(product.id, product.name);
                }}
              >
                {product.name}
              </h2>
              <p>€ {product.price}</p>
              <div className={styles.wrapper}>
                <div className={styles["customized-quantity-input"]}>
                  <button
                    className={styles["quantity-decrease"]}
                    aria-label="Decrease Quantity"
                    onClick={() =>
                      handleQuantityDecrement(product.id, product.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <input
                    className={styles["quantity-input"]}
                    type="number"
                    min="1"
                    max={product.quantityInStock} //the quantity of the product at the initial fetch
                    value={product.quantity}
                    aria-label="Quantity"
                    readOnly
                  />
                  <button
                    className={styles["quantity-increase"]}
                    aria-label="Increase Quantity"
                    onClick={() =>
                      handleQuantityIncrement(product.id, product.quantity + 1)
                    }
                    disabled={isIncrementDisabled}
                  >
                    +
                  </button>
                </div>
                <button
                  className={styles.remove}
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.pricing}>
          <p>
            Subtotal:<span>€{subtotal.toFixed(2)}</span>
          </p>
          <p>
            Shipping:<span>€{shippingCost.toFixed(2)}</span>
          </p>
          <p>
            Total:<span>€{(subtotal + shippingCost).toFixed(2)}</span>
          </p>
        </div>
        <button
          className={styles.checkout}
          onClick={handleCheckout}
          disabled={isCheckoutLoading || cart.length === 0} // Disable checkout if cart is empty and if checkout is being processed
        >
          {isCheckoutLoading ? "Processing..." : "Checkout"}
        </button>
        {gotQuantityError ? (
          <QuantityErrorsModal
            setModalVisibility={setGotQuantityError}
            quantityErrorMessage={quantityErrorMessage}
          />
        ) : (
          ""
        )}
      </Drawer>
    );
  }
);

export default Cart;
