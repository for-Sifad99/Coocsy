import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from '../../components/Banner/Banner';

const Home = () => {
    return (
        <>
            {/* Helmet */}
            <Helmet>
                <title>Home - Cooksy</title>
                <meta name="description" content="Welcome to Cooksy - Discover delicious recipes and share your culinary creations with the world!" />
            </Helmet>

            {/* Banner Section */}
            <section>
                <Banner />
            </section>


        </>
    );
};

export default Home;