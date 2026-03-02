import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchProperties } from '../data/searchIndex';
import flatsImg from '../assets/properties/flats.webp';
import smallHouseImg from '../assets/properties/small-house.webp';
import bhk1Img from '../assets/properties/1bhk house.webp';
import project1 from '../assets/projects/project-1.webp';
import project2 from '../assets/projects/project-2.webp';
import project3 from '../assets/projects/project-3.webp';

// City Images
import delhiImg from '../assets/cities/Delhi.webp';
import mumbaiImg from '../assets/cities/Mumbai.webp';
import bangaloreImg from '../assets/cities/Bangalore.webp';
import hyderabadImg from '../assets/cities/Hydrerabad.webp';
import puneImg from '../assets/cities/Pune.webp';
import ahmedabadImg from '../assets/cities/ahamedabad.webp';
import chennaiImg from '../assets/cities/Chennai.webp';
import kolkataImg from '../assets/cities/Kolkata.webp';
import bhubaneswarImg from '../assets/cities/Bhubnaeswar.webp';
import jaipurImg from '../assets/cities/Jaipur.webp';

// Getting Started Images
import buyHomeImg from '../assets/backgrounds/Buy home.jpg';
import investImg from '../assets/misc/Invest .webp';
import rentHomeImg from '../assets/backgrounds/Home img.webp';
import sellPropertyImg from '../assets/backgrounds/Construction .webp';
import plotsImg from '../assets/properties/Plot.jpg';
import insightsImg from '../assets/misc/Insights.webp';
import pgLivingImg from '../assets/properties/flats.webp';
import commercialBuyImg from '../assets/properties/Commercial space.jpg';
import commercialLeaseImg from '../assets/properties/Lease.webp';

// Reuseable Scroll Container
const ScrollContainer = ({ title, items, type = 'property', imageHeight = 'h-[180px]' }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 300;
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="w-full max-w-[1200px] mb-12 relative group">
            <h3 className="text-gray-800 text-4xl font-semibold mb-6 uppercase tracking-wider text-center">{title}</h3>

            {/* Scroll Buttons */}
            <button
                onClick={() => scroll('left')}
                className="absolute left-[-20px] top-[60%] -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                &#8592;
            </button>
            <button
                onClick={() => scroll('right')}
                className="absolute right-[-20px] top-[60%] -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                &#8594;
            </button>

            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className="min-w-[280px] bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 snap-start flex-shrink-0 cursor-pointer group/card"
                    >
                        {type !== 'simple' ? (
                            <>
                                <div className={`${imageHeight} overflow-hidden relative`}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                                    />
                                    {item.tag && (
                                        <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                                            {item.tag}
                                        </div>
                                    )}
                                </div>
                                <div className="p-5">
                                    <h4 className="text-lg font-medium text-gray-800 mb-1">{item.title}</h4>
                                    <p className="text-sm text-gray-500 mb-3">{item.desc}</p>
                                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                        <span className="text-[#3E3D23] font-semibold text-sm">{item.price}</span>
                                        <span className="text-xs text-gray-400">View Details &rarr;</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            // Image Card Style for "Getting Started"
                            <Link to={item.link || '/'} className="block relative h-[200px] rounded-2xl overflow-hidden group/started shadow-sm hover:shadow-xl transition-all duration-300">
                                {/* Background Image */}
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/started:scale-110"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    <h4 className="text-white font-semibold text-base mb-1">{item.title}</h4>
                                    <span className="text-white/80 text-sm">Explore &rarr;</span>
                                </div>

                                {/* Hover Effect */}
                                <div className="absolute inset-0 bg-[#3E3D23]/0 group-hover/started:bg-[#3E3D23]/20 transition-all duration-300"></div>
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const SearchSection = () => {
    const navigate = useNavigate();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const searchWrapperRef = useRef(null);

    // Filter States
    const [filters, setFilters] = useState({
        buy: false,
        commercial: false,
        propertyType: '',
        rentType: 'rent',
        priceRange: [0, 10000000],
        area: ''
    });

    // Live search results (max 6 items for dropdown)
    const liveResults = useMemo(() => {
        if (!searchText.trim() || searchText.trim().length < 2) return [];
        return searchProperties(searchText, { city: selectedCity || '' }).slice(0, 6);
    }, [searchText, selectedCity]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e) => {
            if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Navigate to /search with all active filters
    const handleSearch = () => {
        if (!searchText.trim() && !selectedCity) return;
        const params = new URLSearchParams();
        if (searchText.trim()) params.set('q', searchText.trim());
        if (selectedCity) params.set('city', selectedCity);
        if (filters.propertyType) params.set('type', filters.propertyType);
        if (filters.priceRange[1] && filters.priceRange[1] < 100000000)
            params.set('price', filters.priceRange[1]);
        setShowDropdown(false);
        setIsSearchOpen(false);
        navigate(`/search?${params.toString()}`);
    };
    const popularCities = [
        { name: 'Delhi', image: delhiImg },
        { name: 'Mumbai', image: mumbaiImg },
        { name: 'Bangalore', image: bangaloreImg },
        { name: 'Hyderabad', image: hyderabadImg },
        { name: 'Pune', image: puneImg },
        { name: 'Ahmedabad', image: ahmedabadImg },
        { name: 'Chennai', image: chennaiImg },
        { name: 'Kolkata', image: kolkataImg },
        { name: 'Bhubaneswar', image: bhubaneswarImg },
        { name: 'Jaipur', image: jaipurImg }
    ];

    const gettingStartedOptions = [
        { title: "Buying Home", link: "/buy", image: buyHomeImg },
        { title: "Invest in Real Estate", link: "/buy", image: investImg },
        { title: "Renting Home", link: "/rent", image: rentHomeImg },
        { title: "Sell / Rent your Property", link: "/sell", image: sellPropertyImg },
        { title: "Plots / Lands", link: "/plots", image: plotsImg },
        { title: "Explore Insights", link: "/", image: insightsImg },
        { title: "PG / Co-living", link: "/rent", image: pgLivingImg },
        { title: "Buy Commercial Space", link: "/buy", image: commercialBuyImg },
        { title: "Lease Commercial Space", link: "/rent", image: commercialLeaseImg }
    ];

    const newlyLaunchedProjects = [
        { title: "Sunrise Heights", desc: "Luxury Living in Mumbai", price: "Starts ₹ 2.5 Cr", image: project1, tag: "New Launch" },
        { title: "Green Acres", desc: "Eco-friendly plots in Pune", price: "Starts ₹ 45 L", image: project2, tag: "Trending" },
        { title: "Tech Park Plaza", desc: "Office Spaces in Bangalore", price: "Starts ₹ 1.8 Cr", image: project3, tag: "Commercial" },
        { title: "Azure Bay", desc: "Sea view apartments, Chennai", price: "Starts ₹ 3.2 Cr", image: project1, tag: "Luxury" },
    ];

    // Data that appears ONLY when a city is selected
    const cityProperties = [
        { title: "Luxury Apartment", desc: `3 BHK in ${selectedCity || 'Center'}`, price: "₹ 2.5 Cr", image: flatsImg, tag: "Apartment" },
        { title: "Modern Villa", desc: `4 BHK in ${selectedCity || 'Suburbs'}`, price: "₹ 4.2 Cr", image: smallHouseImg, tag: "Villa" },
        { title: "Cozy Studio", desc: `1 BHK in ${selectedCity || 'Downtown'}`, price: "₹ 85 L", image: bhk1Img, tag: "Studio" },
        { title: "Spacious Flat", desc: `3 BHK Near Metro`, price: "₹ 1.8 Cr", image: flatsImg, tag: "Flat" },
    ];

    const cityProjects = [
        { title: "City Center Heights", desc: `Premium High Rise in ${selectedCity}`, price: "Starting ₹ 3 Cr", image: project1, tag: "New Launch" },
        { title: "Suburban Greens", desc: "Eco-friendly Living", price: "Starting ₹ 1.2 Cr", image: project2, tag: "Trending" },
    ];


    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setSearchText(city);
        setShowDropdown(false);
        setIsSearchOpen(false);
        // Navigate immediately when a city card is clicked
        const params = new URLSearchParams({ city });
        navigate(`/search?${params.toString()}`);
    };

    const handleSearchInput = (e) => {
        const val = e.target.value;
        setSearchText(val);
        setShowDropdown(val.trim().length >= 2);
        if (val === '') {
            setSelectedCity(null);
        }
    };

    const toggleLocation = (e) => {
        e.stopPropagation();
        setIsLocationOpen(!isLocationOpen);
    };

    const formatPrice = (value) => {
        if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)} Cr`;
        if (value >= 100000) return `₹${(value / 100000).toFixed(0)} L`;
        return `₹${value}`;
    };

    return (
        <section className="relative min-h-[100vh] bg-white flex flex-col items-center pt-[100px] pb-[60px] px-[6%] text-left">

            {/* Search & Filter Container */}
            <div className="w-full max-w-[1000px] flex flex-col gap-4 mb-16 z-[50]">
                {/* Search Bar */}
                <div ref={searchWrapperRef} className="relative w-full shadow-xl rounded-2xl bg-white border border-gray-100 p-2">
                    <div className="flex items-center">
                        <div className="pl-4 pr-3 text-gray-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.5 9a7.5 7.5 0 010 7.5z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search city, locality, or project..."
                            value={searchText}
                            onChange={handleSearchInput}
                            onClick={() => { setIsSearchOpen(true); if (searchText.trim().length >= 2) setShowDropdown(true); }}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); if (e.key === 'Escape') { setShowDropdown(false); setIsSearchOpen(false); } }}
                            className="w-full py-4 text-lg outline-none text-gray-700 placeholder-gray-400"
                        />
                        {searchText && (
                            <button onClick={() => { setSearchText(''); setSelectedCity(null); setShowDropdown(false); }} className="pr-2 text-gray-400 hover:text-gray-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        )}

                        {/* Location Option Trigger */}
                        <div className="relative border-l border-gray-200 pl-4 py-2 mr-2">
                            <div
                                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-xl transition-colors"
                                onClick={toggleLocation}
                            >
                                <svg className="w-5 h-5 text-[#3E3D23]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                <span className="text-sm font-medium text-gray-700 hidden sm:block">Location</span>
                            </div>

                            {/* Location Dropdown */}
                            {isLocationOpen && (
                                <div className="absolute top-[calc(100%+15px)] right-0 w-[280px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[100]">
                                    <div className="p-2">
                                        <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-xl flex items-center gap-3 transition-colors text-gray-700">
                                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                            </div>
                                            Use Current Location
                                        </button>
                                        <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-xl flex items-center gap-3 transition-colors text-gray-700">
                                            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 01-.447-.894L15 7m0 13V7"></path></svg>
                                            </div>
                                            Select on Map
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleSearch}
                            className="px-8 py-3 bg-[#3E3D23] text-white border-none rounded-xl text-lg cursor-pointer font-medium transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-[#3E3D23]/30 hidden md:block"
                        >
                            Search
                        </button>
                    </div>

                    {/* ── Live search dropdown ── */}
                    {showDropdown && liveResults.length > 0 && (
                        <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[200]">
                            <div className="px-4 py-2 border-b border-gray-50">
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Matching Properties</span>
                            </div>
                            {liveResults.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => { setShowDropdown(false); navigate(item.link); }}
                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-0"
                                >
                                    {item.image ? (
                                        <img src={item.image} alt={item.title} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 text-lg">🏠</div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
                                        <p className="text-xs text-gray-400 truncate">{item.location}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-sm font-semibold text-[#3E3D23]">{item.price}</p>
                                        <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">{item.tag}</span>
                                    </div>
                                </button>
                            ))}
                            <button
                                onClick={handleSearch}
                                className="w-full py-3 text-sm text-[#3E3D23] font-semibold hover:bg-[#3E3D23]/5 transition-colors flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.5 9a7.5 7.5 0 010 7.5z" /></svg>
                                See all results for "{searchText}"
                            </button>
                        </div>
                    )}

                    {/* No results hint */}
                    {showDropdown && searchText.trim().length >= 2 && liveResults.length === 0 && (
                        <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-2xl shadow-2xl border border-gray-100 px-4 py-5 z-[200] text-center">
                            <p className="text-sm text-gray-500">No results for <strong>"{searchText}"</strong></p>
                            <p className="text-xs text-gray-400 mt-1">Try a city name, BHK type, or locality</p>
                        </div>
                    )}
                </div>

                {/* Enhanced Filters */}
                <div className="flex gap-3 w-full overflow-x-auto pb-2 scrollbar-hide">

                    {/* Buy Checkbox Button */}
                    <button
                        onClick={() => setFilters({ ...filters, buy: !filters.buy })}
                        className={`px-6 py-2.5 rounded-full border-2 text-sm font-medium transition-all ${filters.buy
                            ? 'bg-[#3E3D23] text-white border-[#3E3D23] shadow-md'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-[#3E3D23]'
                            }`}
                    >
                        Buy
                    </button>

                    {/* Commercial Checkbox Button */}
                    <button
                        onClick={() => setFilters({ ...filters, commercial: !filters.commercial })}
                        className={`px-6 py-2.5 rounded-full border-2 text-sm font-medium transition-all ${filters.commercial
                            ? 'bg-[#3E3D23] text-white border-[#3E3D23] shadow-md'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-[#3E3D23]'
                            }`}
                    >
                        Commercial
                    </button>

                    {/* Property Type Dropdown */}
                    <div className="relative group/filter">
                        <select
                            value={filters.propertyType}
                            onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                            className="appearance-none px-6 py-2.5 rounded-full border border-gray-200 text-sm font-medium bg-white text-gray-600 outline-none shadow-sm hover:border-[#3E3D23] hover:text-[#3E3D23] cursor-pointer transition-all pr-10"
                        >
                            <option value="">Property Type</option>
                            <option value="home">Home</option>
                            <option value="flats">Flats</option>
                            <option value="villa">Villa</option>
                            <option value="plot">Plot</option>
                            <option value="office">Office</option>
                            <option value="showroom">Showroom</option>
                            <option value="builder-floor">Builder Floor</option>
                            <option value="farmhouse">Farmhouse</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-3 h-3 text-gray-400 group-hover/filter:text-[#3E3D23]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>

                    {/* Rent/Lease Dropdown */}
                    <div className="relative group/filter">
                        <select
                            value={filters.rentType}
                            onChange={(e) => setFilters({ ...filters, rentType: e.target.value })}
                            className="appearance-none px-6 py-2.5 rounded-full border border-gray-200 text-sm font-medium bg-white text-gray-600 outline-none shadow-sm hover:border-[#3E3D23] hover:text-[#3E3D23] cursor-pointer transition-all pr-10"
                        >
                            <option value="rent">Rent</option>
                            <option value="lease">Lease</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-3 h-3 text-gray-400 group-hover/filter:text-[#3E3D23]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>

                    {/* Price Range Dropdown */}
                    <div className="relative group/filter">
                        <select
                            value={filters.priceRange[1]}
                            onChange={(e) => setFilters({ ...filters, priceRange: [0, parseInt(e.target.value)] })}
                            className="appearance-none px-6 py-2.5 rounded-full border border-gray-200 text-sm font-medium bg-white text-gray-600 outline-none shadow-sm hover:border-[#3E3D23] hover:text-[#3E3D23] cursor-pointer transition-all pr-10"
                        >
                            <option value="0">Price Range</option>
                            <option value="2500000">Under ₹25 L</option>
                            <option value="5000000">Under ₹50 L</option>
                            <option value="7500000">Under ₹75 L</option>
                            <option value="10000000">Under ₹1 Cr</option>
                            <option value="25000000">Under ₹2.5 Cr</option>
                            <option value="50000000">Under ₹5 Cr</option>
                            <option value="100000000">Under ₹10 Cr</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-3 h-3 text-gray-400 group-hover/filter:text-[#3E3D23]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>

                    {/* Area Dropdown */}
                    <div className="relative group/filter">
                        <select
                            value={filters.area}
                            onChange={(e) => setFilters({ ...filters, area: e.target.value })}
                            className="appearance-none px-6 py-2.5 rounded-full border border-gray-200 text-sm font-medium bg-white text-gray-600 outline-none shadow-sm hover:border-[#3E3D23] hover:text-[#3E3D23] cursor-pointer transition-all pr-10"
                        >
                            <option value="">Area (sq.ft)</option>
                            <option value="0-500">0 - 500 sq.ft</option>
                            <option value="500-1000">500 - 1,000 sq.ft</option>
                            <option value="1000-1500">1,000 - 1,500 sq.ft</option>
                            <option value="1500-2000">1,500 - 2,000 sq.ft</option>
                            <option value="2000-3000">2,000 - 3,000 sq.ft</option>
                            <option value="3000+">3,000+ sq.ft</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-3 h-3 text-gray-400 group-hover/filter:text-[#3E3D23]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONDITIONAL RENDER START */}

            {selectedCity ? (
                /* VIEW 2: CITY SPECIFIC CONTENT */
                <div className="w-full flex flex-col items-center animate-fadeIn">
                    <div className="w-full max-w-[1200px] mb-6 flex justify-between items-center">
                        <h2 className="text-2xl font-light text-gray-800">Properties in <span className="font-semibold">{selectedCity}</span></h2>
                        <button onClick={() => { setSelectedCity(null); setSearchText('') }} className="text-sm text-[#3E3D23] hover:underline">View All India</button>
                    </div>
                    <ScrollContainer title="Recommended Properties" items={cityProperties} />
                    <ScrollContainer title="Recommended Projects" items={cityProjects} />
                </div>
            ) : (
                /* VIEW 1: DEFAULT / ALL INDIA CONTENT */
                <div className="w-full flex flex-col items-center animate-fadeIn">

                    {/* Explore Popular Cities */}
                    <div className="w-full max-w-[1200px] mb-18">
                        <h3 className="text-gray-500 text-xl font-medium mb-6 uppercase tracking-wider pl-1">Explore Real Estate in Popular Cities</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {popularCities.map((city) => (
                                <button
                                    key={city.name}
                                    onClick={() => handleCitySelect(city.name)}
                                    className="group relative h-[120px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                                >
                                    {/* City Image */}
                                    <img
                                        src={city.image}
                                        alt={city.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                                    {/* City Name */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <h4 className="text-white font-semibold text-base tracking-wide">{city.name}</h4>
                                    </div>

                                    {/* Hover Effect Overlay */}
                                    <div className="absolute inset-0 bg-[#3E3D23]/0 group-hover:bg-[#3E3D23]/30 transition-all duration-300"></div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Getting Started Section */}
                    <ScrollContainer
                        title="Getting Started with Real Estate"
                        items={gettingStartedOptions}
                        type="simple"
                    />

                    {/* Newly Launched Projects */}
                    <ScrollContainer
                        title="Newly Launched Projects"
                        items={newlyLaunchedProjects}
                        imageHeight="h-[280px]"
                    />
                </div>
            )}
            {/* CONDITIONAL RENDER END */}


            {/* Overlay */}
            {(isSearchOpen || isLocationOpen) && (
                <div
                    className="fixed inset-0 bg-black/20 z-[40]"
                    onClick={() => { setIsSearchOpen(false); setIsLocationOpen(false); }}
                ></div>
            )}

            {/* Search Mega Menu */}
            <div className={`
                fixed top-0 left-0 w-full h-full bg-white z-[2000] overflow-y-auto transition-all duration-400 ease-in-out
                ${isSearchOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}
            `}>
                {/* ── Top Search Bar ── */}
                <div className="sticky top-0 bg-white border-b border-gray-100 z-10 px-8 py-5">
                    <div className="max-w-[1100px] mx-auto flex items-center gap-4">
                        <svg className="w-6 h-6 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search city, locality, project name..."
                            autoFocus={isSearchOpen}
                            value={searchText}
                            onChange={handleSearchInput}
                            className="flex-1 border-none text-xl outline-none font-light text-gray-800 placeholder-gray-400"
                        />
                        <button
                            className="shrink-0 px-5 py-2 rounded-full bg-[#3E3D23] text-white text-sm font-medium hover:bg-[#2e2c18] transition-colors"
                            onClick={() => setIsSearchOpen(false)}
                        >
                            ✕ Close
                        </button>
                    </div>
                </div>

                <div className="max-w-[1100px] mx-auto px-8 py-8">

                    {/* ── Trending Searches ── */}
                    <div className="mb-8">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">🔥 Trending Searches</p>
                        <div className="flex flex-wrap gap-2">
                            {['3 BHK in Mumbai', 'Luxury Villa Pune', 'Office Space Bangalore', 'Plots near Delhi', 'Sea View Apartment', '2 BHK under ₹50L', 'Gated Community Hyderabad', 'Studio Apartment'].map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => { setSearchText(tag); }}
                                    className="px-4 py-1.5 rounded-full border border-gray-200 text-sm text-gray-600 hover:border-[#3E3D23] hover:text-[#3E3D23] hover:bg-[#3E3D23]/5 transition-all duration-200"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Property Type Quick Pills ── */}
                    <div className="mb-10">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Browse by Property Type</p>
                        <div className="flex flex-wrap gap-3">
                            {[
                                { icon: '🏢', label: 'Flat / Apartment', link: '/buy' },
                                { icon: '🏡', label: 'Independent House', link: '/buy' },
                                { icon: '🌴', label: 'Villa', link: '/buy' },
                                { icon: '📐', label: 'Plot / Land', link: '/plots' },
                                { icon: '🏗️', label: 'Builder Floor', link: '/buy' },
                                { icon: '🏪', label: 'Office Space', link: '/buy' },
                                { icon: '🏬', label: 'Commercial Shop', link: '/buy' },
                                { icon: '🌾', label: 'Farmhouse', link: '/buy' },
                            ].map(pt => (
                                <Link
                                    key={pt.label}
                                    to={pt.link}
                                    onClick={() => setIsSearchOpen(false)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#3E3D23] hover:bg-[#3E3D23]/5 transition-all duration-200 text-sm text-gray-700 font-medium no-underline group"
                                >
                                    <span className="text-lg">{pt.icon}</span>
                                    {pt.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* ── 4-Column Grid + Featured Card ── */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

                        {/* Col 1 — Trending Cities */}
                        <div className="md:col-span-1">
                            <h4 className="text-xs font-bold text-gray-400 mb-5 uppercase tracking-widest flex items-center gap-1.5">
                                <span>📍</span> Popular Cities
                            </h4>
                            <ul className="space-y-3">
                                {popularCities.map(city => (
                                    <li key={city.name}>
                                        <button
                                            onClick={() => { handleCitySelect(city.name); setIsSearchOpen(false); }}
                                            className="group flex items-center gap-2 text-gray-700 hover:text-[#3E3D23] transition-colors text-base font-light w-full text-left"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#3E3D23] transition-colors shrink-0" />
                                            {city.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Col 2 — Buy */}
                        <div className="md:col-span-1">
                            <h4 className="text-xs font-bold text-gray-400 mb-5 uppercase tracking-widest flex items-center gap-1.5">
                                <span>🏠</span> Buy
                            </h4>
                            <ul className="space-y-3">
                                {[
                                    { label: 'Flats & Apartments', link: '/buy' },
                                    { label: 'Independent Villas', link: '/buy' },
                                    { label: 'Residential Plots', link: '/plots' },
                                    { label: 'Builder Floors', link: '/buy' },
                                    { label: 'Farmhouses', link: '/buy' },
                                    { label: 'New Projects', link: '/buy' },
                                    { label: 'Under Construction', link: '/buy' },
                                ].map(item => (
                                    <li key={item.label}>
                                        <Link
                                            to={item.link}
                                            onClick={() => setIsSearchOpen(false)}
                                            className="text-gray-700 hover:text-[#3E3D23] transition-colors text-base font-light no-underline flex items-center gap-2 group"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#3E3D23] transition-colors shrink-0" />
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Col 3 — Sell & Rent */}
                        <div className="md:col-span-1">
                            <h4 className="text-xs font-bold text-gray-400 mb-5 uppercase tracking-widest flex items-center gap-1.5">
                                <span>💰</span> Sell / Rent
                            </h4>
                            <ul className="space-y-3">
                                {[
                                    { label: 'Post Free Property', link: '/sell/post-property' },
                                    { label: 'Advertise Property', link: '/sell' },
                                    { label: 'Dashboard', link: '/dashboard' },
                                    { label: 'Rental Homes', link: '/rent' },
                                    { label: 'PG / Co-living', link: '/rent' },
                                    { label: 'Commercial Lease', link: '/rent' },
                                ].map(item => (
                                    <li key={item.label}>
                                        <Link
                                            to={item.link}
                                            onClick={() => setIsSearchOpen(false)}
                                            className="text-gray-700 hover:text-[#3E3D23] transition-colors text-base font-light no-underline flex items-center gap-2 group"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#3E3D23] transition-colors shrink-0" />
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Col 4 — Tools & Resources */}
                        <div className="md:col-span-1">
                            <h4 className="text-xs font-bold text-gray-400 mb-5 uppercase tracking-widest flex items-center gap-1.5">
                                <span>🛠️</span> Tools & Resources
                            </h4>
                            <ul className="space-y-3">
                                {[
                                    { label: 'EMI Calculator', link: '/tools/emi-calculator', icon: '🧮' },
                                    { label: 'Affordability Check', link: '/tools/affordability-calculator', icon: '📊' },
                                    { label: 'Eligibility Check', link: '/tools/eligibility-calculator', icon: '✅' },
                                    { label: 'Budget Estimator', link: '/tools/budget-estimator', icon: '💼' },
                                    { label: 'Rates & Trends', link: '/tools/rates-trends', icon: '📈' },
                                    { label: 'Buying Guide', link: '/tools/buying-guide', icon: '📖' },
                                    { label: 'News & Articles', link: '/news', icon: '📰' },
                                ].map(item => (
                                    <li key={item.label}>
                                        <Link
                                            to={item.link}
                                            onClick={() => setIsSearchOpen(false)}
                                            className="text-gray-700 hover:text-[#3E3D23] transition-colors text-sm font-light no-underline flex items-center gap-2.5 group"
                                        >
                                            <span className="text-base w-5 text-center">{item.icon}</span>
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Col 5 — Featured Project Spotlight */}
                        <div className="md:col-span-1">
                            <h4 className="text-xs font-bold text-gray-400 mb-5 uppercase tracking-widest flex items-center gap-1.5">
                                <span>⭐</span> Featured Project
                            </h4>
                            <Link
                                to="/buy"
                                onClick={() => setIsSearchOpen(false)}
                                className="block rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group no-underline"
                            >
                                <div className="h-[130px] overflow-hidden relative">
                                    <img
                                        src={project1}
                                        alt="Featured Project"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-2 left-2 bg-[#3E3D23] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                        NEW LAUNCH
                                    </div>
                                </div>
                                <div className="p-3">
                                    <p className="font-semibold text-gray-800 text-sm">Sunrise Heights</p>
                                    <p className="text-gray-400 text-xs mt-0.5">Luxury 3 BHK · Mumbai</p>
                                    <div className="mt-2 flex justify-between items-center">
                                        <span className="text-[#3E3D23] font-bold text-xs">From ₹ 2.5 Cr</span>
                                        <span className="text-gray-400 text-xs group-hover:text-[#3E3D23] transition-colors">View →</span>
                                    </div>
                                </div>
                            </Link>

                            {/* Mini market insight */}
                            <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl p-3">
                                <p className="text-xs font-semibold text-amber-700 mb-1">📊 Market Insight</p>
                                <p className="text-xs text-amber-600 leading-relaxed">Mumbai property prices rose <strong>8.2%</strong> YoY. Best time to invest!</p>
                                <Link to="/tools/rates-trends" onClick={() => setIsSearchOpen(false)} className="text-[10px] text-amber-700 font-semibold mt-1 block hover:underline no-underline">
                                    See full trends →
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* ── Bottom Help Strip ── */}
                    <div className="mt-12 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                            <Link to="/about" onClick={() => setIsSearchOpen(false)} className="hover:text-[#3E3D23] transition-colors no-underline">About Dwello</Link>
                            <Link to="/news" onClick={() => setIsSearchOpen(false)} className="hover:text-[#3E3D23] transition-colors no-underline">News & Insights</Link>
                            <Link to="/sell/post-property" onClick={() => setIsSearchOpen(false)} className="hover:text-[#3E3D23] transition-colors no-underline">List Your Property Free</Link>
                            <a href="#Contact-us" onClick={() => setIsSearchOpen(false)} className="hover:text-[#3E3D23] transition-colors no-underline">Contact Us</a>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span>10,000+ properties listed today</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default SearchSection;
