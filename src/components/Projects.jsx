import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import project1Img from '../assets/projects/project-1.webp';
import project2Img from '../assets/projects/Project 2.jpg';
import project3Img from '../assets/projects/project-3.webp';
import project4Img from '../assets/projects/Project 4.jpg';

// Developer Logos
import sbBuilderLogo from '../assets/developers/SB Builder.png';
import shivomLogo from '../assets/developers/Shivom Developers .png';
import ambikaLogo from '../assets/developers/Ambika Builders .png';
import namsethuLogo from '../assets/developers/NamSethu  .png';

import { getAllDevelopers } from '../data/developersData';

// Developer Project Images
import snClave1 from '../assets/developers/Sn Clave.png';
import snClave2 from '../assets/developers/Sn clave 2.png';

const ProjectSection = ({ title, items }) => (
    <div className="mb-12">
        <h3 className="text-3xl font-semibold mb-6 border-l-4 border-[#3E3D23] pl-4">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item, idx) => (
                <ProjectCard key={idx} item={item} index={idx} />
            ))}
        </div>
    </div>
);

// Project Card with scroll animation
const ProjectCard = ({ item, index }) => {
    const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

    return (
        <Link
            ref={ref}
            to={`/project/${item.id}`}
            className={`bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-700 cursor-pointer group block overflow-hidden
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
            style={{
                transitionDelay: `${index * 100}ms`
            }}
        >
            {/* Project Image */}
            {item.image && (
                <div className="h-[200px] overflow-hidden">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
            )}

            {/* Content */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <span className="bg-gray-200 text-xs px-2 py-1 rounded text-gray-600">{item.tag}</span>
                    <span className="text-[#3E3D23] font-medium">{item.price}</span>
                </div>
                <h4 className="text-lg font-medium mb-2 group-hover:text-[#3E3D23] transition-colors">{item.name}</h4>
                <p className="text-sm text-gray-500 mb-4">{item.location}</p>
                <div className="flex justify-between text-xs text-gray-400 border-t border-gray-200 pt-3">
                    <span>{item.type}</span>
                    <span>{item.status}</span>
                </div>
            </div>
        </Link>
    );
};

// Scrollable Developers Section with horizontal scroll
const ScrollableDevelopersSection = ({ title, items }) => {
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
        <div className="mb-12 relative group">
            <h3 className="text-3xl font-semibold mb-6 border-l-4 border-[#3E3D23] pl-4">{title}</h3>

            {/* Scroll Buttons */}
            <button
                onClick={() => scroll('left')}
                className="absolute left-[-20px] top-[50%] -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                &#8592;
            </button>
            <button
                onClick={() => scroll('right')}
                className="absolute right-[-20px] top-[50%] -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                &#8594;
            </button>

            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {items.map((item, idx) => (
                    <Link
                        key={idx}
                        to={`/developer/${item.id}`}
                        className="min-w-[320px] bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group/dev block overflow-hidden flex-shrink-0 snap-start"
                    >
                        {/* Project Image */}
                        {item.projectImage && (
                            <div className="h-[160px] overflow-hidden">
                                <img
                                    src={item.projectImage}
                                    alt={`${item.name} project`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/dev:scale-110"
                                />
                            </div>
                        )}

                        {/* Content */}
                        <div className="p-6">
                            {/* Logo and Name */}
                            <div className="flex items-center gap-3 mb-4">
                                {item.logo && (
                                    <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
                                        <img
                                            src={item.logo}
                                            alt={`${item.name} logo`}
                                            className="w-full h-full object-contain p-1"
                                        />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <h4 className="text-base font-semibold group-hover/dev:text-[#3E3D23] transition-colors leading-tight">{item.name}</h4>
                                </div>
                            </div>

                            <div className="flex justify-between items-start mb-3">
                                <span className="bg-gray-200 text-xs px-2 py-1 rounded text-gray-600">{item.tag}</span>
                                <span className="text-[#3E3D23] font-medium text-sm">{item.price}</span>
                            </div>
                            <p className="text-sm text-gray-500 mb-4">{item.location}</p>
                            <div className="flex justify-between text-xs text-gray-400 border-t border-gray-200 pt-3">
                                <span>{item.type}</span>
                                <span>{item.status}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

const Projects = () => {
    // Mock Data for new sections
    const highlightedProjects = [
        { id: 'grand-arch', name: "The Grand Arch", location: "Sector 58, Gurgaon", price: "₹ 2.5 Cr - 4.2 Cr", type: "3, 4 BHK Flats", status: "Ready to Move", tag: "Premium", image: project1Img },
        { id: 'dlf-cyber-city', name: "DLF Cyber City", location: "Phase 3, Gurgaon", price: "₹ 1.8 Cr - 3.5 Cr", type: "Office Spaces", status: "Ready to Move", tag: "Commercial", image: project2Img },
        { id: 'emerald-hills', name: "Emerald Hills", location: "Sector 65, Gurgaon", price: "₹ 3.1 Cr - 5.0 Cr", type: "4 BHK Villas", status: "Under Construction", tag: "Luxury", image: project3Img },
        { id: 'm3m-golfestate', name: "M3M Golfestate", location: "Sector 65, Gurgaon", price: "₹ 4.5 Cr+", type: "3, 4, 5 BHK", status: "Ready to Move", tag: "Golf Living", image: project4Img },
    ];

    const featuredDevelopers = getAllDevelopers();

    const popularProperties = [
        { id: 'white-meadows', name: "White Meadows", location: "Whitefield, Bangalore", price: "₹ 6 Cr+", type: "4, 5 BHK Villas", status: "Ready to Move", tag: "Popular" },
        { id: 'rustomjee-elements', name: "Rustomjee Elements", location: "Juhu, Mumbai", price: "₹ 12 Cr+", type: "3, 4, 5 BHK", status: "Ready to Move", tag: "Trending" },
        { id: 'lodha-altamount', name: "Lodha Altamount", location: "Altamount Road, Mumbai", price: "Price on Request", type: "Luxury Apart.", status: "Ready to Move", tag: "Ultra Lux" },
        { id: 'pirelli-towers', name: "Pirelli Towers", location: "Thane, Mumbai", price: "₹ 1.2 Cr - 2.5 Cr", type: "2, 3 BHK", status: "New Launch", tag: "Hot" },
    ];

    return (
        <section className="w-full py-16 px-[6%] bg-white text-black">
            <div className="max-w-[1400px] mx-auto">
                <h2 className="text-5xl font-semibold mb-12 text-center">Exclusive Collections</h2>

                <ProjectSection title="Top Highlighted Projects" items={highlightedProjects} />
                <ScrollableDevelopersSection title="Featured Developers" items={featuredDevelopers} />
                <ProjectSection title="Popular Properties" items={popularProperties} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-[#f9f9f9] p-8 rounded-2xl border border-gray-100">
                        <h3 className="text-3xl font-semibold mb-4">Trending Properties</h3>
                        <p className="text-gray-500 mb-6">Explore the properties that are capturing everyone's attention this week.</p>
                        <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">View Trending</button>
                    </div>
                    <div className="bg-[#f9f9f9] p-8 rounded-2xl border border-gray-100">
                        <h3 className="text-3xl font-semibold mb-4">Fresh Properties</h3>
                        <p className="text-gray-500 mb-6">Just listed! Be the first to view these new opportunities.</p>
                        <button className="px-6 py-3 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors">View New Listings</button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Projects;
