import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyGrid from '../components/PropertyGrid';

const Buy = () => {
    return (
        <div className="font-sans text-white bg-[#0f1311]">
            <Navbar />
            <div className="pt-[120px] px-[10%] min-h-[60vh] text-center pb-20">
                <h1 className="text-4xl mb-5 font-light tracking-wide">Properties for Sale</h1>
                <p className="text-gray-400 mb-10">Discover premium homes available for purchase.</p>
                <PropertyGrid filterType="Buy" />
            </div>
            <Footer />
        </div>
    );
};

export default Buy;
