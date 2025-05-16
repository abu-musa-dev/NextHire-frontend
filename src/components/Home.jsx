import React from 'react';
import Hero from './Hero';
import PopularServices from './PopularServices';
import TopFreelancers from '../components/TopFreelancers';
import FreelanceBanner from './FreelanceBanner';
import BusinessBanner from './BusinessBanner';
import NewsletterSubscribe from './NewsletterSubscribe';
import Pricing from './Pricing';


const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <PopularServices></PopularServices>
            <Pricing></Pricing>
            <TopFreelancers></TopFreelancers>
            <FreelanceBanner></FreelanceBanner>
            <BusinessBanner></BusinessBanner>
            <NewsletterSubscribe></NewsletterSubscribe>
            
        </div>
    );
};

export default Home;