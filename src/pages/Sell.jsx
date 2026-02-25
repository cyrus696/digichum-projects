import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Sell = () => {
    return (
        <div className="font-sans text-white bg-[#0f1311]">
            <Navbar />
            <div className="pt-[120px] px-[10%] min-h-[80vh] flex flex-col items-center justify-center text-center pb-10">
                {/* Background image could be added here similar to SearchSection */}
                <h1 className="text-5xl mb-6 font-light tracking-wide max-md:text-4xl">Sell Your Property</h1>
                <p className="text-gray-400 mb-10 max-w-2xl px-5">
                    List your property with Dwello Homes and reach millions of buyers.
                    Our experts help you get the best price for your home.
                </p>

                {/* Call to Action Card */}
                <div className="w-full max-w-lg bg-[#1c1c1df2] p-8 rounded-xl shadow-2xl text-left border border-white/10 max-md:w-[90%] max-md:p-5">
                    <h3 className="text-xl mb-5 border-b border-gray-700 pb-2 font-medium">Get Started</h3>

                    <div className="space-y-4 mb-6">
                        <div className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-[#3E3D23] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <div>
                                <h4 className="font-medium text-white mb-1">Free Property Listing</h4>
                                <p className="text-sm text-gray-400">Post your property for free and reach millions of buyers</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-[#3E3D23] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <div>
                                <h4 className="font-medium text-white mb-1">Expert Assistance</h4>
                                <p className="text-sm text-gray-400">Get help from our property experts throughout the process</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-[#3E3D23] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <div>
                                <h4 className="font-medium text-white mb-1">Quick & Easy Process</h4>
                                <p className="text-sm text-gray-400">Simple 5-step form to list your property in minutes</p>
                            </div>
                        </div>
                    </div>

                    <Link to="/sell/post-property" className="block w-full bg-[#3E3D23] hover:bg-[#2c2b19] text-white py-3 rounded font-medium transition-colors text-center">
                        Post Your Property Now
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Sell;
