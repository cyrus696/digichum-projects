import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import flatsImg from '../assets/properties/flats.webp';
import smallHouseImg from '../assets/properties/small-house.webp';
import bhk1Img from '../assets/properties/1bhk house.webp';
import { useWishlist } from '../context/WishlistContext';

// ScrollContainer Component for Properties
const PropertyScrollContainer = ({ title, items, viewAllLink }) => {
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
                                        <span className="block text-xs text-gray-400 uppercase tracking-wider">Rent/Month</span>
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

// ScrollContainer Component for Agents
const AgentScrollContainer = ({ title, items }) => {
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
        <div className="w-full max-w-[1200px] mb-16 relative group">
            <h3 className="text-gray-800 text-xl font-light mb-8 uppercase tracking-wider pl-1 border-l-4 border-[#3E3D23]">{title}</h3>

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
                        className="min-w-[250px] bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 snap-start flex-shrink-0 cursor-pointer group/card flex flex-col items-center p-6 text-center"
                    >
                        {/* Avatar / Image */}
                        <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 overflow-hidden border-2 border-[#3E3D23]/20">
                            {item.image ? (
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-400">
                                    {item.name.charAt(0)}
                                </div>
                            )}
                        </div>

                        <h4 className="text-lg font-medium text-gray-800 mb-1">{item.name}</h4>
                        <p className="text-xs text-[#3E3D23] uppercase tracking-wide font-semibold mb-3">{item.title}</p>

                        <div className="flex gap-1 mb-4 text-yellow-500 text-sm">
                            {'★'.repeat(Math.round(item.rating))}
                            <span className="text-gray-400 text-xs ml-1">({item.reviews})</span>
                        </div>

                        <div className="w-full pt-4 border-t border-gray-100 mt-auto">
                            <button className="w-full py-2 rounded-lg bg-[#3E3D23] text-white text-sm font-medium hover:bg-[#2c2b19] transition-colors">
                                Connect
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Rent = () => {
    const [activeFilter, setActiveFilter] = useState('Residentials');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const filters = ['Residentials', 'Offices', 'Showrooms', 'Studios'];

    const megaMenuData = {
        Residentials: {
            popular: ['Flats for Rent', 'House for Rent', 'Villa for Rent', 'PG for Rent'],
            areas: ['Downtown', 'Suburbs', 'Tech Park Area', 'Old City'],
            bhk: ['1 BHK', '2 BHK', '3 BHK', '4 BHK+'],
            tags: ['Flats without Brokerage', 'Ready to move in', 'Fully Furnished', 'For Family', 'For Students', 'Independent', "PG's"]
        },
        Offices: {
            popular: ['Co-working Space', 'Bare Shell Office', 'Furnished Office'],
            areas: ['Business District', 'IT Park', 'City Center'],
            bhk: ['< 1000 sqft', '1000-5000 sqft', '> 5000 sqft'],
            tags: ['No Brokerage', 'Lease', 'Shared Office', 'Virtual Office']
        },
        Showrooms: {
            popular: ['High Street', 'Mall', 'Anchor Store'],
            areas: ['Main Market', 'Shopping Complex', 'Highway'],
            bhk: ['Small Shop', 'Large Showroom', 'Multi-storey'],
            tags: ['Main Road Facing', 'Corner Property', 'Parking Available']
        },
        Studios: {
            popular: ['Artist Studio', 'Music Studio', 'Dance Studio'],
            areas: ['Art District', 'Quiet Zones', 'Industrial Area'],
            bhk: ['Soundproof', 'Natural Light', 'High Ceiling'],
            tags: ['Daily Rent', 'Monthly Rent', 'Equipment Included']
        }
    };

    // Mock Property Data
    const popularRentals = [
        { id: 'rent-pop-1', title: "Modern 2BHK Apartment", desc: "Bandra West, Mumbai", price: "₹ 45,000", image: flatsImg, tag: "Popular" },
        { id: 'rent-pop-2', title: "Spacious Villa", desc: "Lonavala", price: "₹ 85,000", image: smallHouseImg, tag: "Trending" },
        { id: 'rent-pop-3', title: "Cozy Studio", desc: "Andheri East", price: "₹ 18,000", image: bhk1Img, tag: "Hot Deal" },
        { id: 'rent-pop-4', title: "Family Flat", desc: "Thane West", price: "₹ 32,000", image: flatsImg, tag: "Verified" },
    ];

    const budgetFriendly = [
        { id: 'rent-budget-1', title: "1BHK Near Metro", desc: "Ghatkopar", price: "₹ 15,000", image: bhk1Img, tag: "Budget" },
        { id: 'rent-budget-2', title: "Shared Apartment", desc: "Powai", price: "₹ 12,000", image: flatsImg, tag: "PG" },
        { id: 'rent-budget-3', title: "Independent Room", desc: "Malad", price: "₹ 10,000", image: smallHouseImg, tag: "Students" },
    ];

    const luxuryRentals = [
        { id: 'rent-luxury-1', title: "Sea View Penthouse", desc: "Juhu", price: "₹ 2,50,000", image: smallHouseImg, tag: "Luxury" },
        { id: 'rent-luxury-2', title: "Premium 4BHK", desc: "Worli", price: "₹ 1,80,000", image: flatsImg, tag: "Premium" },
    ];

    const agents = [
        { name: "Rahul Sharma", title: "Premium Partner", rating: 4.8, reviews: 120, image: null },
        { name: "Priya Singh", title: "Rental Expert", rating: 4.9, reviews: 85, image: null },
        { name: "Amit Verma", title: "Office Spaces", rating: 4.5, reviews: 40, image: null },
        { name: "Sneha Gupta", title: "Luxury Homes", rating: 5.0, reviews: 60, image: null },
        { name: "Vikram Malhotra", title: "City Specialist", rating: 4.7, reviews: 200, image: null },
        { name: "Anjali Mehta", title: "Student Housing", rating: 4.6, reviews: 150, image: null },
    ];

    const currentData = megaMenuData[activeFilter] || megaMenuData['Residentials'];

    return (
        <div className="font-sans text-black bg-white min-h-screen">
            <Navbar />
            <div className="pt-[140px] px-[6%] min-h-[60vh] flex flex-col items-center pb-20">

                <h1 className="text-4xl mb-8 font-light tracking-wide text-center">Find Your Rental Space</h1>

                {/* Filter Tabs */}
                <div className="flex gap-2 mb-6 flex-wrap justify-center">
                    {filters.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border 
                            ${activeFilter === filter
                                    ? 'bg-[#3E3D23] text-white border-[#3E3D23]'
                                    : 'bg-white text-gray-600 border-gray-300 hover:border-[#3E3D23] hover:text-[#3E3D23]'}`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Search Bar Container */}
                <div className="relative w-full max-w-[800px] mb-12">
                    <input
                        type="text"
                        placeholder={`Search in ${activeFilter}...`}
                        onClick={() => setIsMenuOpen(true)}
                        readOnly={isMenuOpen}
                        className="w-full px-6 py-4 pl-12 text-lg rounded-xl border border-gray-300 shadow-md focus:shadow-xl outline-none transition-shadow"
                    />
                    <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.5 9a7.5 7.5 0 010 7.5z" />
                    </svg>

                    {/* Mega Menu Overlay */}
                    {isMenuOpen && (
                        <>
                            <div className="fixed inset-0 bg-black/10 z-40" onClick={() => setIsMenuOpen(false)}></div>
                            <div className="absolute top-[110%] left-0 w-full bg-white rounded-xl shadow-2xl border border-gray-100 p-8 z-50 grid grid-cols-1 md:grid-cols-4 gap-8">

                                {/* Column 1: Popular Searches */}
                                <div>
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Popular Searches</h3>
                                    <ul className="space-y-2">
                                        {currentData.popular.map((item, idx) => (
                                            <li key={idx} className="text-gray-700 hover:text-black cursor-pointer transition-colors hover:font-medium">{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Column 2: Popular Areas */}
                                <div>
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Popular Areas</h3>
                                    <ul className="space-y-2">
                                        {currentData.areas.map((item, idx) => (
                                            <li key={idx} className="text-gray-700 hover:text-black cursor-pointer transition-colors hover:font-medium">{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Column 3: Search by BHK/Size */}
                                <div>
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">By Type/Size</h3>
                                    <ul className="space-y-2">
                                        {currentData.bhk.map((item, idx) => (
                                            <li key={idx} className="text-gray-700 hover:text-black cursor-pointer transition-colors hover:font-medium">{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Column 4: Quick Filters (Tags) */}
                                <div>
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Explore</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {currentData.tags.map((tag, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-gray-100 text-xs text-gray-600 rounded-md border border-gray-200 hover:bg-gray-200 cursor-pointer transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </>
                    )}
                </div>

                {/* Property Sections */}
                <PropertyScrollContainer title="Popular Rentals" items={popularRentals} viewAllLink="/rentals/popular" />
                <PropertyScrollContainer title="Budget Friendly" items={budgetFriendly} viewAllLink="/rentals/budget" />
                <PropertyScrollContainer title="Luxury Rentals" items={luxuryRentals} viewAllLink="/rentals/luxury" />

                {/* Agents Section */}
                <AgentScrollContainer title="Connect with Top Agents" items={agents} />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1200px] mb-20">
                    {/* Placeholder content for Rent page body */}
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 text-center">
                        <h3 className="text-xl font-medium mb-2">Verified Listings</h3>
                        <p className="text-gray-500 text-sm">Browse thousands of verified properties.</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 text-center">
                        <h3 className="text-xl font-medium mb-2">Zero Brokerage</h3>
                        <p className="text-gray-500 text-sm">Connect directly with owners.</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 text-center">
                        <h3 className="text-xl font-medium mb-2">Instant Alerts</h3>
                        <p className="text-gray-500 text-sm">Get notified for new listings instantly.</p>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default Rent;
