import React from "react";
import Hero from "./Hero";
import PopularServices from "./PopularServices";
import TopFreelancers from "./TopFreelancers";
import FreelanceBanner from "./FreelanceBanner";
import BusinessBanner from "./BusinessBanner";
import NewsletterSubscribe from "../layout/NewsletterSubscribe";
import Pricing from "./Pricing";
import { Helmet } from "react-helmet-async";
import TopCategories from "./TopCategories";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | NextHire</title>
        <meta
          name="description"
          content="Reach out to NextHire for support, inquiries, or questions. We're here to help!"
        />
      </Helmet>
      <div>
        <Hero></Hero>
        <TopFreelancers></TopFreelancers>
        <TopCategories></TopCategories>
        <PopularServices></PopularServices>
        <Pricing></Pricing>
        <FreelanceBanner></FreelanceBanner>
        <BusinessBanner></BusinessBanner>
        
        <NewsletterSubscribe></NewsletterSubscribe>
      </div>
    </>
  );
};

export default Home;
