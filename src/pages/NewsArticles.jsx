import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import project1 from '../assets/projects/project-1.webp';
import project2 from '../assets/projects/project-2.webp';
import project3 from '../assets/projects/project-3.webp';
import flatsImg from '../assets/properties/flats.webp';
import smallHouseImg from '../assets/properties/small-house.webp';

const NewsArticles = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Investment Guide', 'Legal', 'Market Analysis', 'Finance', 'Tips & Tricks'];

    const allArticles = [
        {
            title: "Top 10 Real Estate Investment Tips for 2024",
            category: "Investment Guide",
            readTime: "5 min read",
            date: "Feb 5, 2024",
            image: project1,
            excerpt: "Discover the best strategies to maximize your real estate investments this year. Learn from industry experts about market trends and smart investment decisions."
        },
        {
            title: "Understanding RERA: A Complete Guide for Homebuyers",
            category: "Legal",
            readTime: "8 min read",
            date: "Feb 3, 2024",
            image: smallHouseImg,
            excerpt: "Everything you need to know about RERA regulations and how they protect you. A comprehensive guide to understanding your rights as a homebuyer."
        },
        {
            title: "Mumbai Real Estate Market Trends 2024",
            category: "Market Analysis",
            readTime: "6 min read",
            date: "Jan 30, 2024",
            image: flatsImg,
            excerpt: "An in-depth analysis of Mumbai's property market and future predictions. Discover which areas are seeing the most growth and investment opportunities."
        },
        {
            title: "Home Loan Interest Rates: Compare & Save",
            category: "Finance",
            readTime: "4 min read",
            date: "Jan 28, 2024",
            image: project2,
            excerpt: "Compare the latest home loan rates from top banks and find the best deal. Learn how to negotiate better rates and save thousands on your home loan."
        },
        {
            title: "Land Investment: Top 10 Tips for 2024",
            category: "Investment Guide",
            readTime: "6 min read",
            date: "Feb 5, 2024",
            image: project3,
            excerpt: "Essential strategies for making profitable land investments in the current market. Expert advice on choosing the right location and timing."
        },
        {
            title: "Understanding Plot Registration Process",
            category: "Legal",
            readTime: "7 min read",
            date: "Feb 2, 2024",
            image: project1,
            excerpt: "A comprehensive guide to plot registration, documentation, and legal requirements. Avoid common pitfalls and ensure a smooth registration process."
        },
        {
            title: "Best Cities for Plot Investment in India",
            category: "Market Analysis",
            readTime: "5 min read",
            date: "Jan 28, 2024",
            image: smallHouseImg,
            excerpt: "Discover which cities offer the best ROI for plot investments in 2024. Detailed analysis of emerging markets and growth potential."
        },
        {
            title: "DTCP vs RERA: What You Need to Know",
            category: "Legal",
            readTime: "8 min read",
            date: "Jan 25, 2024",
            image: flatsImg,
            excerpt: "Understanding the difference between DTCP and RERA approvals for plots. Learn which approvals are mandatory and how they protect your investment."
        },
        {
            title: "First-Time Home Buyer's Guide 2024",
            category: "Tips & Tricks",
            readTime: "10 min read",
            date: "Feb 4, 2024",
            image: project2,
            excerpt: "Everything first-time homebuyers need to know before making their purchase. From budgeting to documentation, we cover it all."
        },
        {
            title: "Tax Benefits on Home Loans in 2024",
            category: "Finance",
            readTime: "6 min read",
            date: "Jan 26, 2024",
            image: project3,
            excerpt: "Maximize your tax savings with these home loan deductions. A complete guide to Section 80C, 24(b), and other tax benefits available to homeowners."
        },
        {
            title: "Vastu Tips for Your New Home",
            category: "Tips & Tricks",
            readTime: "5 min read",
            date: "Jan 24, 2024",
            image: project1,
            excerpt: "Ancient wisdom meets modern living. Discover Vastu principles that can bring positive energy to your new home."
        },
        {
            title: "Bangalore Real Estate: 2024 Outlook",
            category: "Market Analysis",
            readTime: "7 min read",
            date: "Jan 22, 2024",
            image: smallHouseImg,
            excerpt: "What's driving Bangalore's property market? Expert insights on upcoming developments, pricing trends, and investment hotspots."
        },
    ];

    const filteredArticles = selectedCategory === 'All'
        ? allArticles
        : allArticles.filter(article => article.category === selectedCategory);

    return (
        <div className="font-sans text-gray-800 bg-white min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <div className="pt-[120px] pb-16 px-[6%] bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-[1200px] mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">News & Articles</h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Stay updated with the latest insights, trends, and expert advice in real estate
                    </p>
                </div>
            </div>

            {/* Category Filter */}
            <div className="px-[6%] pb-8">
                <div className="max-w-[1200px] mx-auto">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                    ? 'bg-[#3E3D23] text-white shadow-md'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#3E3D23]'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Articles Grid */}
            <div className="px-[6%] pb-20">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredArticles.map((article, idx) => (
                            <div
                                key={idx}
                                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
                            >
                                <div className="h-[220px] overflow-hidden relative">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-3 left-3 bg-[#3E3D23]/90 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                                        {article.category}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#3E3D23] transition-colors">
                                        {article.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-4 line-clamp-3">{article.excerpt}</p>
                                    <div className="flex justify-between items-center text-xs text-gray-400 pt-4 border-t border-gray-100">
                                        <span>{article.date}</span>
                                        <span>{article.readTime}</span>
                                    </div>
                                    <button className="mt-4 text-[#3E3D23] text-sm font-medium hover:underline">
                                        Read More →
                                    </button>
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

export default NewsArticles;
