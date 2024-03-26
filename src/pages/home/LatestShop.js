import React from "react";
import styles from "./LatestShop.module.scss";
import ShopItem from "../../shop/ShopItem/ShopItem";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useWindowResize from "../../hooks/useWindowResize";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
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

const LatestShop = (props) => {
  //store the newest 4 products(sorted by date)
  const [latestFourProducts, setlatestFourProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://e-commerce-api-j092.onrender.com/api/products/latest-products"
        );
        setlatestFourProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className={styles["latest-shop"]}>
      <h1>Shop our latest crafts</h1>
      <Carousel
        responsive={responsive}
        className={styles["latest-shop-carousel"]}
      >
        {latestFourProducts.map((product) => (
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
      <Link to="/Shop">EXPLORE MORE</Link>
    </section>
  );
};

export default LatestShop;
