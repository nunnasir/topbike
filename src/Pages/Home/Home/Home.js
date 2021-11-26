import React from 'react';
import Banner from '../Banner/Banner';
import CustomerReview from '../CustomerReview/CustomerReview';
import FeatureProducts from '../FeatureProducts/FeatureProducts';
import Features from '../Features/Features';

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <FeatureProducts></FeatureProducts>
            <CustomerReview></CustomerReview>
            <Features></Features>
        </>
    );
};

export default Home;