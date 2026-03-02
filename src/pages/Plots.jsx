import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import flatsImg from '../assets/properties/flats.webp';
import smallHouseImg from '../assets/properties/small-house.webp';
import project1 from '../assets/projects/project-1.webp';
import project2 from '../assets/projects/project-2.webp';
import project3 from '../assets/projects/project-3.webp';

// Scroll Container Component
const ScrollContainer = ({ title, items }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            if (direction === 'left') {
                scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="w-full relative group mb-12">
            <h3 className="text-gray-800 text-xl font-light mb-6 uppercase tracking-wider pl-1">{title}</h3>
            <button onClick={() => scroll('left')} className="absolute left-[-20px] top-[60%] -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">&#8592;</button>
            <button onClick={() => scroll('right')} className="absolute right-[-20px] top-[60%] -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">&#8594;</button>
            <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {items.map((item, idx) => (
                    <div key={idx} className="min-w-[280px] bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 snap-start flex-shrink-0 cursor-pointer group/card">
                        <div className="h-[180px] overflow-hidden relative">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110" />
                            <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">{item.tag}</div>
                        </div>
                        <div className="p-5">
                            <h4 className="text-lg font-medium text-gray-800 mb-1">{item.title}</h4>
                            <p className="text-sm text-gray-500 mb-3">{item.desc}</p>
                            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                <span className="text-[#3E3D23] font-semibold text-sm">{item.price}</span>
                                <span className="text-xs text-gray-400">View Details &rarr;</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Plots = () => {
    // Mock Data
    const cityPlots = [
        { city: "Delhi", plots: "2,500+ Plots", image: project1 },
        { city: "Mumbai", plots: "1,800+ Plots", image: project2 },
        { city: "Bangalore", plots: "3,200+ Plots", image: project3 },
        { city: "Hyderabad", plots: "2,100+ Plots", image: flatsImg },
        { city: "Pune", plots: "1,500+ Plots", image: smallHouseImg },
        { city: "Chennai", plots: "1,900+ Plots", image: project1 },
        { city: "Ahmedabad", plots: "1,200+ Plots", image: project2 },
        { city: "Kolkata", plots: "900+ Plots", image: project3 },
    ];

    const handpickedProjects = [
        { title: "Green Valley Plots", desc: "DTCP Approved, Bangalore", price: "₹ 45 L onwards", image: project1, tag: "Premium" },
        { title: "Sunrise Estates", desc: "Gated Community, Hyderabad", price: "₹ 35 L onwards", image: project2, tag: "New Launch" },
        { title: "Golden Fields", desc: "Near Highway, Pune", price: "₹ 28 L onwards", image: project3, tag: "Investment" },
        { title: "Paradise Plots", desc: "Eco-Friendly, Chennai", price: "₹ 52 L onwards", image: flatsImg, tag: "Luxury" },
    ];

    const popularProjects = [
        { title: "Metro View Plots", desc: "Near Metro Station, Delhi", price: "₹ 65 L onwards", image: smallHouseImg, tag: "Hot Deal" },
        { title: "Lake Side Plots", desc: "Scenic Location, Bangalore", price: "₹ 48 L onwards", image: project1, tag: "Premium" },
        { title: "Highway Plots", desc: "Commercial Zone, Mumbai", price: "₹ 85 L onwards", image: project2, tag: "Commercial" },
        { title: "Garden Plots", desc: "Residential Area, Pune", price: "₹ 32 L onwards", image: project3, tag: "Trending" },
    ];

    const newsArticles = [
        {
            title: "Land Investment: Top 10 Tips for 2024",
            category: "Investment Guide",
            readTime: "6 min read",
            date: "Feb 5, 2024",
            image: project1,
            excerpt: "Essential strategies for making profitable land investments in the current market."
        },
        {
            title: "Understanding Plot Registration Process",
            category: "Legal",
            readTime: "7 min read",
            date: "Feb 2, 2024",
            image: smallHouseImg,
            excerpt: "A comprehensive guide to plot registration, documentation, and legal requirements."
        },
        {
            title: "Best Cities for Plot Investment in India",
            category: "Market Analysis",
            readTime: "5 min read",
            date: "Jan 28, 2024",
            image: flatsImg,
            excerpt: "Discover which cities offer the best ROI for plot investments in 2024."
        },
        {
            title: "DTCP vs RERA: What You Need to Know",
            category: "Legal",
            readTime: "8 min read",
            date: "Jan 25, 2024",
            image: project2,
            excerpt: "Understanding the difference between DTCP and RERA approvals for plots."
        },
    ];

    return (
        <div className="font-sans text-gray-800 bg-white min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <div className="pt-[120px] pb-16 px-[6%] bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-[1200px] mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">Plots & Lands</h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Discover premium plots and lands across India. Build your dream home or make a smart investment.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-[6%] pb-20">
                <div className="max-w-[1200px] mx-auto">

                    {/* Plots in Your Cities */}
                    <div className="mb-16">
                        <h2 className="text-gray-800 text-2xl font-light mb-8 uppercase tracking-wider">Plots in Your Cities</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {cityPlots.map((city, idx) => (
                                <div key={idx} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group">
                                    <div className="h-[160px] overflow-hidden relative">
                                        <img src={city.image} alt={city.city} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 text-white">
                                            <h3 className="text-xl font-semibold mb-1">{city.city}</h3>
                                            <p className="text-sm text-white/90">{city.plots}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Handpicked Projects */}
                    <ScrollContainer title="Handpicked Projects" items={handpickedProjects} />

                    {/* Popular Projects */}
                    <ScrollContainer title="Popular Projects" items={popularProjects} />

                    {/* Interesting Reads / News Section */}
                    <div className="mt-16">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-gray-800 text-2xl font-light uppercase tracking-wider">Interesting Reads</h2>
                            <Link to="/news" className="text-[#3E3D23] text-sm font-medium hover:underline">View All →</Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {newsArticles.map((article, idx) => (
                                <Link to="/news" key={idx} className="block bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group">
                                    <div className="h-[180px] overflow-hidden relative">
                                        <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute top-3 left-3 bg-[#3E3D23]/90 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                                            {article.category}
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#3E3D23] transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{article.excerpt}</p>
                                        <div className="flex justify-between items-center text-xs text-gray-400 pt-3 border-t border-gray-100">
                                            <span>{article.date}</span>
                                            <span>{article.readTime}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Plots;
