import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SearchSection from '../components/SearchSection';
import InfoSection from '../components/InfoSection';
import Projects from '../components/Projects';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="font-sans text-white bg-[#0f1311]">
            <Navbar />
            <Hero />
            <SearchSection />
            <InfoSection />
            <Projects />
            <Newsletter />
            <Footer />
        </div>
    );
};

export default Home;
