import React from 'react';
import { Link } from 'react-router-dom';
import project1 from '../assets/projects/project-1.webp';
import smallHouseImg from '../assets/properties/small-house.webp';
import flatsImg from '../assets/properties/flats.webp';
import useScrollReveal from '../hooks/useScrollReveal';

const InterestingReads = () => {
    const articles = [
        {
            title: "Top 10 Real Estate Investment Tips for 2024",
            category: "Investment Guide",
            readTime: "5 min read",
            date: "Feb 5, 2024",
            image: project1,
            excerpt: "Discover the best strategies to maximize your real estate investments this year."
        },
        {
            title: "Understanding RERA: A Complete Guide for Homebuyers",
            category: "Legal",
            readTime: "8 min read",
            date: "Feb 3, 2024",
            image: smallHouseImg,
            excerpt: "Everything you need to know about RERA regulations and how they protect you."
        },
        {
            title: "Mumbai Real Estate Market Trends 2024",
            category: "Market Analysis",
            readTime: "6 min read",
            date: "Jan 30, 2024",
            image: flatsImg,
            excerpt: "An in-depth analysis of Mumbai's property market and future predictions."
        },
        {
            title: "Home Loan Interest Rates: Compare & Save",
            category: "Finance",
            readTime: "4 min read",
            date: "Jan 28, 2024",
            image: project1,
            excerpt: "Compare the latest home loan rates from top banks and find the best deal."
        },
    ];

    return (
        <section className="py-20 px-[6%] bg-white">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-3">Interesting Reads</h2>
                    <p className="text-gray-500 text-sm md:text-base mb-6">Stay informed with the latest insights and trends in real estate</p>
                    <Link
                        to="/news"
                        className="inline-block px-6 py-3 bg-[#3E3D23] text-white rounded-full font-medium hover:bg-[#2c2b19] transition-colors"
                    >
                        View All Articles
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {articles.map((article, idx) => (
                        <ArticleCard key={idx} article={article} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

// Separate component for each article card with scroll animation
const ArticleCard = ({ article, index }) => {
    const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

    return (
        <Link
            ref={ref}
            to="/news"
            className={`block bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-700 cursor-pointer group
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
            style={{
                transitionDelay: `${index * 100}ms`
            }}
        >
            <div className="h-[200px] overflow-hidden relative">
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
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
    );
};

export default InterestingReads;
