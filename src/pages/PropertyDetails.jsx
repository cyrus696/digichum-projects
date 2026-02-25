import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import flatsImg from '../assets/properties/flats.webp';
import smallHouseImg from '../assets/properties/small-house.webp';
import project1 from '../assets/projects/project-1.webp';
import { getResaleProperty } from '../data/resaleData';
import { useWishlist } from '../context/WishlistContext';


// Reusing ScrollContainer pattern (Local)
const SimilarPropertiesScroll = ({ title, items }) => {
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
        <div className="w-full relative group mt-10">
            <h3 className="text-gray-800 text-xl font-light mb-6 uppercase tracking-wider pl-1">{title}</h3>
            <button onClick={() => scroll('left')} className="absolute left-[-20px] top-[60%] -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">&#8592;</button>
            <button onClick={() => scroll('right')} className="absolute right-[-20px] top-[60%] -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">&#8594;</button>
            <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x transition-all">
                {items.map((item, idx) => (
                    <div key={idx} className="min-w-[280px] bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 snap-start flex-shrink-0 cursor-pointer group/card">
                        <div className="h-[180px] overflow-hidden relative">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110" />
                            <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">{item.price}</div>
                        </div>
                        <div className="p-5">
                            <h4 className="text-lg font-medium text-gray-800 mb-1">{item.title}</h4>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const PropertyDetails = () => {
    const { id } = useParams();
    const { toggleWishlist, isWishlisted } = useWishlist();
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    const openLightbox = (index) => {
        setPhotoIndex(index);
        setIsLightboxOpen(true);
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    const closeLightbox = () => {
        setIsLightboxOpen(false);
        document.body.style.overflow = 'unset'; // Restore scrolling
    };



    // Mock Data (Default)
    const defaultProperty = {
        title: "Luxurious 3 BHK Apartment with Sea View",
        address: "Palm Avenue, Bandra West, Mumbai",
        price: "₹ 4.5 Cr",
        pricePerSqft: "₹ 25,000 / sq.ft",
        specs: { bhk: 3, area: "1800 sq.ft", bathrooms: 3, floor: "12th of 25", status: "Ready to Move" },
        desc: "Experience luxury living in this spacious 3 BHK apartment located in the heart of Bandra. Featuring panoramic sea views, modern interiors, and world-class amenities including a swimming pool, gym, and 24/7 security. Perfect for families looking for a premium lifestyle.",
        owner: { name: "Rajesh Khanna", type: "Owner", phone: "+91 98765 43210" },
        images: [flatsImg, smallHouseImg, project1, flatsImg],
        amenities: ["Swimming Pool", "Gym", "Clubhouse", "24/7 Security", "Power Backup", "Parking", "Garden"],
        localityReviews: [
            { label: "Connectivity", rating: 4.8 },
            { label: "Lifestyle", rating: 4.5 },
            { label: "Safety", rating: 4.9 },
            { label: "Environment", rating: 4.2 }
        ],
        registry: [
            { date: "12 Jan 2024", type: "Sale Deed", amount: "₹ 4.2 Cr" },
            { date: "05 Aug 2018", type: "Agreement", amount: "₹ 3.1 Cr" }
        ]
    };

    let property = defaultProperty;

    // Check if it's a resale property
    if (id && id.startsWith('resale-')) {
        const resaleProp = getResaleProperty(id);
        if (resaleProp) {
            property = {
                ...resaleProp,
                // Map resale data to component structure if needed
                localityReviews: defaultProperty.localityReviews, // Keep mock reviews for now
                registry: defaultProperty.registry // Keep mock registry for now
            };
        }
    }

    const nextPhoto = (e) => {
        e.stopPropagation();
        setPhotoIndex((prev) => (prev + 1) % property.images.length);
    };

    const prevPhoto = (e) => {
        e.stopPropagation();
        setPhotoIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
    };

    const similarProps = [
        { title: "2 BHK in Khar", desc: "Near Station", price: "₹ 2.8 Cr", image: smallHouseImg },
        { title: "4 BHK Penthouse", desc: "Juhu Beach", price: "₹ 8.5 Cr", image: project1 },
        { title: "3 BHK Apartment", desc: "Andheri West", price: "₹ 3.2 Cr", image: flatsImg },
    ];

    const newsArticles = [
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
        <div className="font-sans text-gray-800 bg-white min-h-screen">
            <Navbar />

            {/* Main Content Padding for Fixed Navbar */}
            <div className="pt-[110px] pb-20 max-w-[1200px] mx-auto px-[6%] xl:px-0">

                {/* 1. Header & Actions */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-light text-gray-900 mb-2 leading-tight">{property.title}</h1>
                        <p className="text-gray-500 flex items-center gap-1 text-sm md:text-base">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            {property.address}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <div className="text-2xl font-semibold text-[#3E3D23]">{property.price}</div>
                            <div className="text-xs text-gray-400">{property.pricePerSqft}</div>
                        </div>
                        <button
                            onClick={() => toggleWishlist({ id: `property-${id}`, title: property.title, location: property.address, price: property.price, image: property.images?.[0] || flatsImg })}
                            className={`w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center transition-all ${isWishlisted(`property-${id}`) ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white hover:bg-gray-50 text-gray-400'}`}
                        >
                            <svg className={`w-6 h-6 ${isWishlisted(`property-${id}`) ? 'fill-current' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        </button>
                    </div>
                </div>

                {/* 2. Image Gallery */}
                {/* 2. Image Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-[400px] md:h-[500px] mb-10 rounded-2xl overflow-hidden">
                    <div
                        className="col-span-1 md:col-span-2 md:row-span-2 relative group cursor-pointer"
                        onClick={() => openLightbox(0)}
                    >
                        <img src={property.images[0]} alt="Main" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    {property.images[1] && (
                        <div
                            className="bg-gray-100 relative group cursor-pointer"
                            onClick={() => openLightbox(1)}
                        >
                            <img src={property.images[1]} alt="Sub 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                    )}
                    {property.images[2] && (
                        <div
                            className="bg-gray-100 relative group cursor-pointer"
                            onClick={() => openLightbox(2)}
                        >
                            <img src={property.images[2]} alt="Sub 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                    )}
                    {property.images[3] && (
                        <div
                            className="bg-gray-100 relative group cursor-pointer md:col-span-2"
                            onClick={() => openLightbox(3)}
                        >
                            <img src={property.images[3]} alt="Sub 3" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-medium text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                View All {property.images.length} Photos
                            </div>
                        </div>
                    )}
                </div>

                {/* 3. Specs Bar */}
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 flex flex-wrap justify-between gap-6 mb-10">
                    <div className="flex flex-col">
                        <span className="text-gray-400 text-xs uppercase tracking-wider mb-1">Bedrooms</span>
                        <span className="text-gray-800 font-medium">{property.specs?.bhk} BHK</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-400 text-xs uppercase tracking-wider mb-1">Area</span>
                        <span className="text-gray-800 font-medium">{property.specs?.area}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-400 text-xs uppercase tracking-wider mb-1">Bathrooms</span>
                        <span className="text-gray-800 font-medium">{property.specs?.bathrooms}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-400 text-xs uppercase tracking-wider mb-1">Floor</span>
                        <span className="text-gray-800 font-medium">{property.specs?.floor}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-400 text-xs uppercase tracking-wider mb-1">Status</span>
                        <span className="text-gray-800 font-medium">{property.specs?.status}</span>
                    </div>
                </div>

                {/* 4. Grid Layout: Left Content & Right Sticky Sidebar */}
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* LEFT COLUMN */}
                    <div className="flex-1">
                        {/* Property Overview (For Resale) */}
                        {property.overview && (
                            <div className="mb-12">
                                <h3 className="text-xl font-medium mb-4 text-[#3E3D23]">Property Overview</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-xl border border-gray-100">
                                    {Object.entries(property.overview).map(([key, value]) => (
                                        <div key={key} className="flex flex-col">
                                            <span className="text-gray-500 text-xs uppercase tracking-wide">{key}</span>
                                            <span className="text-gray-800 font-medium">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Description */}
                        <div className="mb-12">
                            <h3 className="text-xl font-medium mb-4 text-[#3E3D23]">About This Property</h3>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{property.desc}</p>
                        </div>

                        {/* Amenities */}
                        <div className="mb-12">
                            <h3 className="text-xl font-medium mb-6 text-[#3E3D23]">Amenities</h3>
                            <div className="flex flex-wrap gap-3">
                                {property.amenities.map(item => (
                                    <span key={item} className="px-4 py-2 bg-gray-50 border border-gray-100 text-gray-700 rounded-lg text-sm">{item}</span>
                                ))}
                            </div>
                        </div>

                        {/* Locality Reviews */}
                        <div className="mb-12">
                            <h3 className="text-xl font-medium mb-6 text-[#3E3D23]">Locality Ratings</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {property.localityReviews.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                                        <span className="text-gray-600">{item.label}</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-[#3E3D23]" style={{ width: `${(item.rating / 5) * 100}%` }}></div>
                                            </div>
                                            <span className="font-bold text-sm">{item.rating}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Registry Records */}
                        <div className="mb-12">
                            <h3 className="text-xl font-medium mb-6 text-[#3E3D23]">Registry Records</h3>
                            <div className="border border-gray-200 rounded-xl overflow-hidden">
                                <table className="w-full text-left text-sm text-gray-600">
                                    <thead className="bg-gray-50 text-gray-800 font-medium border-b border-gray-200">
                                        <tr>
                                            <th className="p-4">Date</th>
                                            <th className="p-4">Type</th>
                                            <th className="p-4">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {property.registry.map((row, idx) => (
                                            <tr key={idx} className="border-b border-gray-100 last:border-none hover:bg-gray-50">
                                                <td className="p-4">{row.date}</td>
                                                <td className="p-4">{row.type}</td>
                                                <td className="p-4 font-medium text-gray-800">{row.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN (Sticky Sidebar) */}
                    <div className="w-full lg:w-[360px] flex-shrink-0">
                        <div className="sticky top-[110px] space-y-6">

                            {/* Owner Card */}
                            <div className="p-6 rounded-2xl border border-gray-200 shadow-lg bg-white">
                                <h3 className="text-lg font-medium mb-4">Contact Owner</h3>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-500">
                                        {property.owner.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">{property.owner.name}</div>
                                        <div className="text-sm text-green-600 font-medium">{property.owner.type}</div>
                                    </div>
                                </div>
                                <button className="w-full py-3 bg-[#3E3D23] hover:bg-[#2c2b19] text-white rounded-xl font-medium transition-colors mb-3 shadow-md shadow-[#3E3D23]/20">
                                    Show Phone Number
                                </button>
                                <button className="w-full py-3 bg-white border border-[#3E3D23] text-[#3E3D23] hover:bg-gray-50 rounded-xl font-medium transition-colors">
                                    Chat Now
                                </button>
                            </div>

                            {/* Offers Card */}
                            <div className="p-6 rounded-2xl bg-[#3E3D23] text-white overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full -mr-10 -mt-10"></div>
                                <h3 className="text-lg font-medium mb-2 relative z-10">Need a Home Loan?</h3>
                                <p className="text-white/80 text-sm mb-4 relative z-10">Get instant approval at lowest interest rates.</p>
                                <button className="px-4 py-2 bg-white text-[#3E3D23] text-sm font-bold rounded-lg relative z-10">Check Eligibility</button>
                            </div>

                        </div>
                    </div>
                </div>

                {/* 5. Similar Properties */}
                <SimilarPropertiesScroll title="Similar Properties in Bandra" items={similarProps} />

                {/* 6. Interesting Reads / News Section */}
                <div className="w-full relative mt-16 mb-10">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-gray-800 text-xl font-light uppercase tracking-wider pl-1">Interesting Reads</h3>
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
                                    <h4 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#3E3D23] transition-colors">
                                        {article.title}
                                    </h4>
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

            <Footer />

            {/* Lightbox Overlay */}
            {isLightboxOpen && (
                <div
                    className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
                    onClick={closeLightbox}
                >
                    <button
                        className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
                        onClick={closeLightbox}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>

                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors hidden md:block"
                        onClick={prevPhoto}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>

                    <div className="relative max-w-7xl max-h-[90vh] w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
                        <img
                            src={property.images[photoIndex]}
                            alt={`View ${photoIndex + 1}`}
                            className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl"
                        />
                        <div className="mt-4 text-white/90 font-medium">
                            {photoIndex + 1} / {property.images.length}
                        </div>
                    </div>

                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors hidden md:block"
                        onClick={nextPhoto}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>

                    {/* Mobile Navigation */}
                    <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-8 md:hidden" onClick={e => e.stopPropagation()}>
                        <button onClick={prevPhoto} className="p-3 bg-white/10 rounded-full text-white"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button>
                        <button onClick={nextPhoto} className="p-3 bg-white/10 rounded-full text-white"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyDetails;
