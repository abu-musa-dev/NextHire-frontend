import React from "react";
import Hero from "./Hero";
import PopularServices from "./PopularServices";
import TopFreelancers from "./TopFreelancers";
import FreelanceBanner from "./FreelanceBanner";
import NewsletterSubscribe from "../layout/NewsletterSubscribe";
import Pricing from "./Pricing";
import { Helmet } from "react-helmet-async";
import TopCategories from "./TopCategories";
import NewSeoServices from "./NewSeoServices";
import { useDarkMode } from "../../context/DarkModeContext"; // ✅ Import context

const Home = () => {
  const { darkMode } = useDarkMode(); // ✅ use context

  return (
    <>
      <Helmet>
        <title>Home | NextHire</title>
        <meta
          name="description"
          content="Reach out to NextHire for support, inquiries, or questions. We're here to help!"
        />
      </Helmet>

      <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"} transition-colors`}>
        <Hero />
        <TopFreelancers />
        <TopCategories />
        <PopularServices />
        <Pricing />
        <FreelanceBanner />
        <NewSeoServices />
        <NewsletterSubscribe />
      </div>
    </>
  );
};

export default Home;
