import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import UploadSection from '../components/UploadSection';

const Home = () => {
    return (
        <main>
            <Hero />
            <Services />
            <UploadSection />
        </main>
    );
};

export default Home;
