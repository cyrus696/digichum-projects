import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="h-screen w-full relative flex justify-end items-center pr-[120px] max-md:pr-[30px] max-md:p-0">
            {/* Background Image */}
            <img src="/assets/hero-bg.jpg" alt="hero background" className="absolute inset-0 object-cover" />
            <div className="absolute inset-0 bg-black/25"></div>

            <div className="relative max-w-[520px] text-left max-md:w-full max-md:px-[30px] max-md:text-center max-md:mx-auto">
                <h1 className="text-[54px] font-medium mb-5 border-l-2 border-white pl-2.5 max-md:text-[40px] max-md:border-l-0 max-md:pl-0">
                    Elevating Everyday Living
                </h1>
                <p className="text-[16px] text-[#afacac] mb-[35px] max-w-[480px] max-md:mx-auto">
                    Discover premium homes designed for comfort, elegance, and modern living.
                </p>

                <div className="flex gap-4 max-md:justify-center">
                    <Link to="/buy" className="px-7 py-3.5 text-sm tracking-[0.5px] rounded border transition-all duration-300 bg-white text-black hover:bg-[#e5e5e5] border-transparent">
                        Explore Properties
                    </Link>
                    <Link to="/login" className="px-7 py-3.5 text-sm tracking-[0.5px] rounded border border-white text-white hover:bg-white hover:text-black transition-all duration-300">
                        Sign in
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
