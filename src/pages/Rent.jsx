import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Asset Imports
import flatsImg from '../assets/flats.webp';
import smallHouseImg from '../assets/small-house.webp';
import bhk1Img from '../assets/1bhk house.webp';
import showroomsImg from '../assets/showrooms.webp';
import officesImg from '../assets/offices.webp';
import searchBg from '../assets/search-bg.webp';

const Rent = () => {
    // Categories for rent
    const rentCategories = [
        { title: "Flats", image: flatsImg },
        { title: "1 BHK", image: smallHouseImg },
        { title: "2 BHK", image: bhk1Img },
        { title: "Showrooms", image: showroomsImg },
        { title: "Offices", image: officesImg },
    ];

    return (
        <div className="font-sans text-white bg-[#0f1311]">
            <Navbar />
            <div
                className="relative pt-[120px] px-[10%] min-h-[60vh] text-center pb-20 bg-fixed bg-cover bg-center"
                style={{ backgroundImage: `url(${searchBg})` }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/70 z-0"></div>

                <div className="relative z-10 text-center">
                    <h1 className="text-4xl mb-5 font-light tracking-wide">Properties for Rent</h1>
                    <p className="text-gray-300 mb-10">Find your ideal rental property from our curated collection.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center text-white">
                        {rentCategories.map((type, index) => (
                            <div key={index} className="group relative h-[300px] overflow-hidden rounded-xl border border-white/20 shadow-xl cursor-pointer">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${type.image})` }}
                                ></div>
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h3 className="text-3xl font-light uppercase tracking-widest drop-shadow-lg">{type.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Rent;
