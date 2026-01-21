import React from 'react';
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

                <form className="w-full max-w-lg bg-[#1c1c1df2] p-8 rounded-xl shadow-2xl text-left border border-white/10 max-md:w-[90%] max-md:p-5">
                    <h3 className="text-xl mb-5 border-b border-gray-700 pb-2 font-medium">Property Details</h3>

                    <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Owner Name</label>
                            <input type="text" placeholder="Full Name" className="w-full bg-[#2a2a2c] text-white p-3 rounded border border-gray-700 outline-none focus:border-[#3E3D23]" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Contact Number</label>
                            <input type="tel" placeholder="+91 XXXXX XXXXX" className="w-full bg-[#2a2a2c] text-white p-3 rounded border border-gray-700 outline-none focus:border-[#3E3D23]" />
                        </div>
                    </div>

                    <label className="block text-sm text-gray-400 mb-1">Property Type</label>
                    <select className="w-full bg-[#2a2a2c] text-white p-3 rounded mb-4 border border-gray-700 outline-none focus:border-[#3E3D23]">
                        <option>Appartment</option>
                        <option>Villa</option>
                        <option>Plot</option>
                        <option>Commercial</option>
                    </select>

                    <label className="block text-sm text-gray-400 mb-1">Location</label>
                    <input type="text" placeholder="e.g. Mumbai" className="w-full bg-[#2a2a2c] text-white p-3 rounded mb-4 border border-gray-700 outline-none focus:border-[#3E3D23]" />

                    <label className="block text-sm text-gray-400 mb-1">Expected Price</label>
                    <input type="text" placeholder="₹" className="w-full bg-[#2a2a2c] text-white p-3 rounded mb-6 border border-gray-700 outline-none focus:border-[#3E3D23]" />

                    <button className="w-full bg-[#3E3D23] hover:bg-[#2c2b19] text-white py-3 rounded font-medium transition-colors">
                        Post Property
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Sell;
