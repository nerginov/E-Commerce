import React from "react";
import Hero from "./Hero";
import LatestShop from "./LatestShop";
import About from "./About";
import HomeCTA from "./HomeCTA";
import SocialMedia from "./SocialMedia";
import Delivery from "./Delivery";
import PaymentMethods from "./PaymentMethods";
import NewCollection from "../../components/NewCollection";
import Steps from "./Steps";
import LazyLoader from "../../components/common/LazyLoader";

const Home = (props) => {
  return (
    <>
      <Hero />
      <LazyLoader>
        <LatestShop addToCart={props.addToCart} />
      </LazyLoader>

      <About />
      <Delivery />
      <HomeCTA />
      <LazyLoader>
        <SocialMedia />
      </LazyLoader>
      <Steps></Steps>
      <NewCollection></NewCollection>
      <PaymentMethods />
    </>
  );
};

export default Home;
