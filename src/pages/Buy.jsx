import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import flatsImg from '../assets/properties/flats.webp';
import smallHouseImg from '../assets/properties/small-house.webp';
import bhk1Img from '../assets/properties/1bhk house.webp';
import project1 from '../assets/projects/project-1.webp';
import project2 from '../assets/projects/project-2.webp';
import { resaleData } from '../data/resaleData';
import { useWishlist } from '../context/WishlistContext';

// Reuse ScrollContainer with Wishlist and Link support
const ScrollContainer = ({ title, items, viewAllLink }) => {
    const scrollRef = useRef(null);
    const { toggleWishlist, isWishlisted } = useWishlist();

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 350;
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="w-full max-w-[1200px] mb-16 relative group">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-gray-900 text-2xl font-light flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#3E3D23] rounded-full"></span>
                    {title}
                </h3>
                {viewAllLink && (
                    <Link to={viewAllLink} className="text-[#3E3D23] font-medium hover:underline flex items-center gap-2 group/link">
                        View All
                        <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </Link>
                )}
            </div>

            {/* Scroll Buttons */}
            <button
                onClick={() => scroll('left')}
                className="absolute left-[-20px] top-[60%] -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                &#8592;
            </button>
            <button
                onClick={() => scroll('right')}
                className="absolute right-[-20px] top-[60%] -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                &#8594;
            </button>

            <div
                ref={scrollRef}
                className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide snap-x px-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className="min-w-[320px] bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 snap-start flex-shrink-0 group/card relative"
                    >
                        {/* Wishlist Button */}
                        <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist({ id: item.id, title: item.title, location: item.desc, price: item.price, image: item.image }); }}
                            className={`absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center transition-all shadow-sm ${isWishlisted(item.id) ? 'text-red-500 bg-white' : 'text-gray-400 hover:text-red-500 hover:bg-white'
                                }`}
                            title={isWishlisted(item.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                            <svg className="w-5 h-5" fill={isWishlisted(item.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        </button>

                        <Link to={`/property/${idx}`} className="block">
                            <div className="h-[220px] overflow-hidden relative">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                                />
                                {item.tag && (
                                    <div className="absolute top-4 left-4 bg-[#3E3D23] text-white text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-lg">
                                        {item.tag}
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <h4 className="text-xl font-medium text-gray-800 mb-1 group-hover/card:text-[#3E3D23] transition-colors">{item.title}</h4>
                                <p className="text-sm text-gray-500 mb-4">{item.desc}</p>
                                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                    <div>
                                        <span className="block text-xs text-gray-400 uppercase tracking-wider">Price</span>
                                        <span className="text-lg font-bold text-gray-900">{item.price}</span>
                                    </div>
                                    <span className="text-sm font-medium text-[#3E3D23] bg-[#3E3D23]/5 px-4 py-2 rounded-lg">View Details</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Buy = () => {
    const popularProps = [
        { id: 'buy-pop-1', title: "Skyline Apartments", desc: "3 BHK, South Mumbai", price: "₹ 5.5 Cr", image: flatsImg, tag: "Popular" },
        { id: 'buy-pop-2', title: "Green Valley Villa", desc: "4 BHK, Lonavala", price: "₹ 3.2 Cr", image: smallHouseImg, tag: "Trending" },
        { id: 'buy-pop-3', title: "Urban Studio", desc: "1 BHK, Bandra", price: "₹ 1.1 Cr", image: bhk1Img, tag: "Hot Deal" },
        { id: 'buy-pop-4', title: "Seaside Heights", desc: "3 BHK, Juhu", price: "₹ 7.8 Cr", image: project1, tag: "Sea View" },
    ];

    const freshProps = [
        { id: 'buy-fresh-1', title: "New Age Homes", desc: "2 BHK, Thane", price: "₹ 85 L", image: project2, tag: "Just Added" },
        { id: 'buy-fresh-2', title: "Modern Living", desc: "3 BHK, Pune", price: "₹ 1.5 Cr", image: flatsImg, tag: "New" },
        { id: 'buy-fresh-3', title: "Garden Estate", desc: "Plots in Alibaug", price: "₹ 60 L", image: smallHouseImg, tag: "Land" },
    ];

    const premiumProps = [
        { id: 'buy-prem-1', title: "The Imperial", desc: "5 BHK Penthouse", price: "₹ 25 Cr", image: project1, tag: "Luxury" },
        { id: 'buy-prem-2', title: "Ocean's 12", desc: "Sea Facing Manor", price: "₹ 40 Cr", image: project2, tag: "Ultra Luxury" },
    ];

    return (
        <div className="font-sans text-gray-800 bg-white min-h-screen">
            <Navbar />

            <div className="pt-[140px] px-[6%] min-h-[60vh] flex flex-col items-center pb-20">

                {/* Header */}
                <h1 className="text-4xl md:text-5xl font-light mb-8 tracking-tight text-center text-gray-900">
                    Find Your <span className="font-serif italic text-[#3E3D23]">Dream Home</span>
                </h1>

                {/* Search Bar */}
                <div className="w-full max-w-[900px] mb-20 relative z-40">
                    <div className="bg-white p-2 rounded-2xl shadow-xl border border-gray-100 flex flex-col md:flex-row items-center gap-2">
                        {/* Filter Dropdown */}
                        <div className="relative w-full md:w-[150px] border-b md:border-b-0 md:border-r border-gray-100">
                            <select className="w-full p-4 bg-transparent outline-none text-gray-700 font-medium cursor-pointer appearance-none">
                                <option>Buy</option>
                                <option>Rent</option>
                                <option>Commercial</option>
                                <option>Plots</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                ▼
                            </div>
                        </div>

                        {/* Location Input */}
                        <div className="flex-1 w-full relative">
                            <input
                                type="text"
                                placeholder="Search City, Locality or Project"
                                className="w-full p-4 outline-none text-gray-700 placeholder-gray-400"
                            />
                        </div>

                        {/* Search Button */}
                        <button className="w-full md:w-auto px-8 py-4 bg-[#3E3D23] text-white rounded-xl font-medium hover:bg-[#2c2b19] transition-transform active:scale-95 shadow-lg shadow-[#3E3D23]/20">
                            Search
                        </button>
                    </div>

                    {/* Quick Tags */}
                    <div className="flex gap-3 justify-center mt-6 flex-wrap">
                        {['Owner Properties', 'New Projects', 'Ready to Move', 'Budget Homes'].map(tag => (
                            <span key={tag} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:border-[#3E3D23] hover:text-[#3E3D23] cursor-pointer transition-colors">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>


                {/* SECTIONS */}

                {/* 1. Popular Properties */}
                <ScrollContainer title="Popular Properties" items={popularProps} viewAllLink="/properties/popular" />

                {/* 2. Premium / Luxury Section */}
                <div className="w-full max-w-[1200px] mb-20">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-gray-900 text-2xl font-light flex items-center gap-3">
                            <span className="w-1 h-8 bg-[#3E3D23] rounded-full"></span>
                            Premium Collections
                        </h3>
                        <Link to="/properties/premium" className="text-[#3E3D23] font-medium hover:underline flex items-center gap-2 group/link">
                            View All
                            <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {premiumProps.map((item, idx) => (
                            <div key={idx} className="group relative rounded-3xl overflow-hidden aspect-[16/9] shadow-md cursor-pointer">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                                    <span className="bg-white/20 backdrop-blur-md w-fit px-3 py-1 rounded-lg text-xs font-bold uppercase mb-3 mr-auto">{item.tag}</span>
                                    <h4 className="text-2xl font-medium mb-1">{item.title}</h4>
                                    <p className="text-white/80 mb-3">{item.desc}</p>
                                    <div className="text-xl font-bold">{item.price}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Fresh Properties */}
                <ScrollContainer title="Freshly Added" items={freshProps} viewAllLink="/properties/fresh" />

                {/* 4. Resale Properties */}
                <div className="w-full max-w-[1200px] mb-12">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-gray-900 text-2xl font-light flex items-center gap-3">
                            <span className="w-1 h-8 bg-[#3E3D23] rounded-full"></span>
                            Resale Opportunities
                        </h3>
                        <Link to="/properties/resale" className="text-[#3E3D23] font-medium hover:underline flex items-center gap-2 group/link">
                            View All
                            <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {resaleData.map((item) => (
                            <Link to={`/property/${item.id}`} key={item.id} className="block group">
                                <div className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-lg transition-shadow cursor-pointer h-full">
                                    <div className="h-40 rounded-xl overflow-hidden mb-4 relative">
                                        <img src={item.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title} />
                                        <span className="absolute top-2 right-2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded">Resale</span>
                                    </div>
                                    <h4 className="font-medium text-gray-800 line-clamp-1">{item.title}</h4>
                                    <p className="text-sm text-gray-500 mb-2 line-clamp-1">{item.address}</p>
                                    <div className="font-bold text-[#3E3D23]">{item.price}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default Buy;
