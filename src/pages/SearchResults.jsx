import React, { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { searchProperties } from '../data/searchIndex';
import { useWishlist } from '../context/WishlistContext';

const PRICE_OPTIONS = [
    { label: 'Any Price', value: 0 },
    { label: 'Under ₹25 L', value: 2500000 },
    { label: 'Under ₹50 L', value: 5000000 },
    { label: 'Under ₹1 Cr', value: 10000000 },
    { label: 'Under ₹2.5 Cr', value: 25000000 },
    { label: 'Under ₹5 Cr', value: 50000000 },
    { label: 'Under ₹10 Cr', value: 100000000 },
];

const TYPE_OPTIONS = ['All', 'Apartment', 'Villa', 'Studio', 'Plot', 'Penthouse', 'PG', 'Residential', 'Commercial'];

const SearchResults = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { toggleWishlist, isWishlisted } = useWishlist();

    const q = searchParams.get('q') || '';
    const city = searchParams.get('city') || '';
    const type = searchParams.get('type') || '';
    const price = parseInt(searchParams.get('price') || '0');

    const [localQ, setLocalQ] = useState(q);
    const [localType, setLocalType] = useState(type);
    const [localPrice, setLocalPrice] = useState(price);

    const results = useMemo(
        () => searchProperties(q, { city, type, maxPrice: price }),
        [q, city, type, price]
    );

    const applyFilters = () => {
        const params = {};
        if (localQ) params.q = localQ;
        if (city) params.city = city;
        if (localType && localType !== 'All') params.type = localType;
        if (localPrice) params.price = localPrice;
        setSearchParams(params);
    };

    const removeCity = () => {
        const params = Object.fromEntries(searchParams);
        delete params.city;
        setSearchParams(params);
    };

    const removeQuery = () => {
        setLocalQ('');
        const params = Object.fromEntries(searchParams);
        delete params.q;
        setSearchParams(params);
    };

    const removeType = () => {
        setLocalType('All');
        const params = Object.fromEntries(searchParams);
        delete params.type;
        setSearchParams(params);
    };

    const removePrice = () => {
        setLocalPrice(0);
        const params = Object.fromEntries(searchParams);
        delete params.price;
        setSearchParams(params);
    };

    const activeFilters = [
        q && { label: `"${q}"`, remove: removeQuery },
        city && { label: `📍 ${city}`, remove: removeCity },
        type && { label: `🏠 ${type}`, remove: removeType },
        price > 0 && { label: `💰 Under ${PRICE_OPTIONS.find(o => o.value === price)?.label?.replace('Under ', '') || price}`, remove: removePrice },
    ].filter(Boolean);

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />

            <div className="pt-[120px] pb-20 px-[5%] max-w-[1400px] mx-auto">

                {/* ── Header + Search Bar ── */}
                <div className="mb-8">
                    <h1 className="text-3xl font-light text-gray-800 mb-6">
                        {q || city
                            ? <>Search results for <span className="font-semibold text-[#3E3D23]">"{q || city}"</span></>
                            : 'All Properties'
                        }
                        <span className="ml-3 text-lg font-normal text-gray-400">({results.length} found)</span>
                    </h1>

                    {/* Inline search + filter row */}
                    <div className="flex flex-wrap gap-3 items-center">
                        {/* Search input */}
                        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2.5 shadow-sm flex-1 min-w-[200px] max-w-md">
                            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.5 9a7.5 7.5 0 010 7.5z" />
                            </svg>
                            <input
                                type="text"
                                value={localQ}
                                onChange={e => setLocalQ(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && applyFilters()}
                                placeholder="Search again..."
                                className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
                            />
                        </div>

                        {/* Type filter */}
                        <select
                            value={localType || 'All'}
                            onChange={e => { setLocalType(e.target.value); }}
                            className="appearance-none px-4 py-2.5 rounded-full border border-gray-200 text-sm bg-white text-gray-600 outline-none shadow-sm cursor-pointer"
                        >
                            {TYPE_OPTIONS.map(t => <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>)}
                        </select>

                        {/* Price filter */}
                        <select
                            value={localPrice}
                            onChange={e => setLocalPrice(parseInt(e.target.value))}
                            className="appearance-none px-4 py-2.5 rounded-full border border-gray-200 text-sm bg-white text-gray-600 outline-none shadow-sm cursor-pointer"
                        >
                            {PRICE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>

                        {/* Apply button */}
                        <button
                            onClick={applyFilters}
                            className="px-6 py-2.5 bg-[#3E3D23] text-white rounded-full text-sm font-medium hover:bg-[#2c2b19] transition-colors shadow-sm"
                        >
                            Apply
                        </button>
                    </div>

                    {/* Active filter chips */}
                    {activeFilters.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {activeFilters.map((f, i) => (
                                <button
                                    key={i}
                                    onClick={f.remove}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3E3D23]/10 text-[#3E3D23] text-sm rounded-full hover:bg-[#3E3D23]/20 transition-colors font-medium"
                                >
                                    {f.label}
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            ))}
                            <button
                                onClick={() => { setSearchParams({}); setLocalQ(''); setLocalType(''); setLocalPrice(0); }}
                                className="px-3 py-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors underline"
                            >
                                Clear all
                            </button>
                        </div>
                    )}
                </div>

                {/* ── Results Grid ── */}
                {results.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <div className="text-6xl mb-4">🔍</div>
                        <h2 className="text-2xl font-light text-gray-700 mb-2">No properties found</h2>
                        <p className="text-gray-400 mb-8">Try a different city, property type, or price range.</p>
                        <div className="flex gap-3">
                            <Link to="/buy" className="px-6 py-3 bg-[#3E3D23] text-white rounded-full text-sm font-medium hover:bg-[#2c2b19] transition-colors no-underline">Browse Buy</Link>
                            <Link to="/rent" className="px-6 py-3 border border-[#3E3D23] text-[#3E3D23] rounded-full text-sm font-medium hover:bg-[#3E3D23]/5 transition-colors no-underline">Browse Rent</Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {results.map((item) => {
                            const wishlisted = isWishlisted(item.id);
                            return (
                                <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
                                    {/* Image */}
                                    <div className="relative h-[180px] overflow-hidden">
                                        {item.image ? (
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                                <span className="text-4xl">🏠</span>
                                            </div>
                                        )}
                                        {/* Tag */}
                                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                                            {item.tag}
                                        </div>
                                        {/* Wishlist */}
                                        <button
                                            onClick={() => toggleWishlist({ id: item.id, title: item.title, location: item.location, price: item.price, image: item.image })}
                                            className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all shadow ${wishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
                                        >
                                            <svg className="w-4 h-4" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Info */}
                                    <div className="p-4 flex flex-col flex-1">
                                        <span className="text-xs font-semibold text-[#3E3D23] uppercase tracking-wide mb-1">{item.type}</span>
                                        <h3 className="text-base font-semibold text-gray-800 mb-1 line-clamp-2 leading-snug">{item.title}</h3>
                                        <p className="text-xs text-gray-400 mb-3 flex items-center gap-1">
                                            <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                                                <circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth="2" />
                                            </svg>
                                            {item.location}
                                        </p>
                                        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
                                            <span className="text-[#3E3D23] font-bold text-sm">{item.price}</span>
                                            <Link
                                                to={item.link}
                                                className="text-xs text-gray-500 hover:text-[#3E3D23] transition-colors no-underline font-medium"
                                            >
                                                View →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default SearchResults;
