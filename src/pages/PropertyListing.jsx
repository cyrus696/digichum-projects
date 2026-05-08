import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import flatsImg from '../assets/properties/flats.webp';
import smallHouseImg from '../assets/properties/small-house.webp';
import bhk1Img from '../assets/properties/1bhk house.webp';

const PropertyListing = () => {
    const { category } = useParams();
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Properties State
    const [properties, setProperties] = useState([]);

    // Simulate API fetch delay & Load Builder Listings
    useEffect(() => {
        setIsLoading(true);

        const mockProperties = [
            { id: 1, title: "Luxury Sea View Apartment", location: "Bandra West, Mumbai", price: "₹ 5.5 Cr", bhk: 3, area: "1800 sq.ft", posted: "2 days ago", image: flatsImg, verified: true },
            { id: 2, title: "Modern Villa with Garden", location: "Lonavala", price: "₹ 3.2 Cr", bhk: 4, area: "2500 sq.ft", posted: "1 week ago", image: smallHouseImg, verified: false },
            { id: 3, title: "Cozy Studio Apartment", location: "Andheri East", price: "₹ 85 L", bhk: 1, area: "650 sq.ft", posted: "3 days ago", image: bhk1Img, verified: true },
            { id: 4, title: "Spacious 3BHK Flat", location: "Thane West", price: "₹ 1.8 Cr", bhk: 3, area: "1400 sq.ft", posted: "5 days ago", image: flatsImg, verified: true },
            { id: 5, title: "Premium Penthouse", location: "Juhu", price: "₹ 12 Cr", bhk: 5, area: "3500 sq.ft", posted: "1 day ago", image: smallHouseImg, verified: true },
        ];

        // Fetch properties posted by the Builder from localStorage
        const savedBuilderListings = localStorage.getItem('builder_listings');
        let finalProperties = mockProperties;

        if (savedBuilderListings) {
            try {
                const parsedListings = JSON.parse(savedBuilderListings);
                const activeListings = parsedListings.filter(l => l.status === 'Active');

                // Format builder properties to match the frontend card structure
                const formattedBuilderListings = activeListings.map(listing => ({
                    id: listing.id,
                    title: listing.name,
                    location: listing.location,
                    price: listing.price,
                    bhk: listing.type === 'Plot' ? 'N/A' : (listing.name.match(/\d+/) ? listing.name.match(/\d+/)[0] : '2'),
                    area: 'N/A', // Assuming builder listing doesn't explicitly store area yet in simple mock
                    posted: listing.posted || 'Just now',
                    image: smallHouseImg, // Fallback image for builder listings
                    verified: true
                }));

                finalProperties = [...formattedBuilderListings, ...mockProperties];
            } catch (e) {
                console.error('Failed to parse builder listings');
            }
        }

        setProperties(finalProperties);

        const timer = setTimeout(() => setIsLoading(false), 1200);
        return () => clearTimeout(timer);
    }, [category]);

    // Lock body scroll when mobile filter is open
    useEffect(() => {
        if (isMobileFilterOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileFilterOpen]);

    // Filter States
    const [filters, setFilters] = useState({
        propertyType: [],
        bedrooms: [],
        constructionStatus: '',
        postedBy: '',
        areaRange: [500, 5000],
        localities: [],
        purchaseType: '',
        amenities: [],
        furnishing: '',
        reraApproved: false,
        budgetRange: [1000000, 100000000],
        verifiedOnly: false
    });

    const categoryTitles = {
        popular: "Popular Properties",
        premium: "Premium Collections",
        fresh: "Freshly Added",
        resale: "Resale Opportunities"
    };

    const FilterSection = ({ title, children }) => (
        <div className="mb-6 pb-6 border-b border-gray-200 last:border-b-0">
            <h4 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-wider">{title}</h4>
            {children}
        </div>
    );

    const Checkbox = ({ label, checked, onChange }) => (
        <label className="flex items-center gap-3 cursor-pointer group mb-3">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="w-4 h-4 accent-[#3E3D23] cursor-pointer"
            />
            <span className="text-gray-600 group-hover:text-gray-900 transition-colors text-sm">{label}</span>
        </label>
    );

    return (
        <div className="font-sans text-gray-800 bg-gray-50 min-h-screen">
            <Navbar />

            <div className="pt-[120px] px-[6%] pb-20 max-w-[1400px] mx-auto">

                {/* Header */}
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-light text-gray-900 mb-2">{categoryTitles[category] || "Properties"}</h1>
                        <p className="text-gray-500">{properties.length} properties found</p>
                    </div>

                    {/* Mobile Filter Toggle */}
                    <button
                        onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                        className="lg:hidden px-6 py-3 bg-[#3E3D23] text-white rounded-xl flex items-center gap-2 shadow-md"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                        Filters
                    </button>
                </div>

                <div className="flex gap-8 relative">

                    {/* Mobile Filter Backdrop */}
                    {isMobileFilterOpen && (
                        <div
                            className="fixed inset-0 bg-black/50 z-[1999] lg:hidden"
                            onClick={() => setIsMobileFilterOpen(false)}
                        ></div>
                    )}

                    {/* Filter Sidebar */}
                    <aside className={`
                        lg:w-[320px] flex-shrink-0 bg-white p-6 shadow-sm border border-gray-100
                        lg:rounded-2xl lg:sticky lg:top-[120px] lg:block lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto
                        ${isMobileFilterOpen
                            ? 'fixed top-0 right-0 bottom-0 w-[85%] max-w-[400px] z-[2000] overflow-y-auto rounded-l-2xl h-full'
                            : 'hidden'
                        }
                    `}>
                        {/* Mobile Close Button */}
                        <div className="flex justify-between items-center mb-6 lg:hidden">
                            <h3 className="text-xl font-semibold">Filters</h3>
                            <button onClick={() => setIsMobileFilterOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                ✕
                            </button>
                        </div>

                        {/* Property Type */}
                        <FilterSection title="Property Type">
                            {['Apartment', 'Villa', 'Plot', 'Farmhouse', 'Builder Floor'].map(type => (
                                <Checkbox key={type} label={type} checked={filters.propertyType.includes(type)} onChange={() => { }} />
                            ))}
                        </FilterSection>

                        {/* Bedrooms */}
                        <FilterSection title="Bedrooms">
                            <div className="flex gap-2 flex-wrap">
                                {['1', '2', '3', '4', '5+'].map(bhk => (
                                    <button key={bhk} className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:border-[#3E3D23] hover:bg-[#3E3D23] hover:text-white transition-colors">
                                        {bhk} BHK
                                    </button>
                                ))}
                            </div>
                        </FilterSection>

                        {/* Construction Status */}
                        <FilterSection title="Construction Status">
                            {['Ready to Move', 'Under Construction', 'New Launch'].map(status => (
                                <Checkbox key={status} label={status} checked={filters.constructionStatus === status} onChange={() => { }} />
                            ))}
                        </FilterSection>

                        {/* Posted By */}
                        <FilterSection title="Posted By">
                            {['Owner', 'Dealer', 'Builder'].map(poster => (
                                <Checkbox key={poster} label={poster} checked={filters.postedBy === poster} onChange={() => { }} />
                            ))}
                        </FilterSection>

                        {/* Budget Range */}
                        <FilterSection title="Budget Range">
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>₹ 10 L</span>
                                    <span>₹ 10 Cr</span>
                                </div>
                                <input type="range" min="1000000" max="100000000" className="w-full accent-[#3E3D23]" />
                            </div>
                        </FilterSection>

                        {/* Area Range */}
                        <FilterSection title="Area (sq.ft)">
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>500</span>
                                    <span>5000</span>
                                </div>
                                <input type="range" min="500" max="5000" className="w-full accent-[#3E3D23]" />
                            </div>
                        </FilterSection>

                        {/* Amenities */}
                        <FilterSection title="Amenities">
                            {['Swimming Pool', 'Gym', 'Parking', 'Garden', 'Security', 'Power Backup'].map(amenity => (
                                <Checkbox key={amenity} label={amenity} checked={filters.amenities.includes(amenity)} onChange={() => { }} />
                            ))}
                        </FilterSection>

                        {/* Furnishing */}
                        <FilterSection title="Furnishing Status">
                            {['Furnished', 'Semi-Furnished', 'Unfurnished'].map(furnish => (
                                <Checkbox key={furnish} label={furnish} checked={filters.furnishing === furnish} onChange={() => { }} />
                            ))}
                        </FilterSection>

                        {/* Purchase Type */}
                        <FilterSection title="Purchase Type">
                            {['Resale', 'New Booking'].map(type => (
                                <Checkbox key={type} label={type} checked={filters.purchaseType === type} onChange={() => { }} />
                            ))}
                        </FilterSection>

                        {/* RERA & Verified */}
                        <FilterSection title="Verification">
                            <Checkbox label="RERA Approved Properties" checked={filters.reraApproved} onChange={() => { }} />
                            <Checkbox label="Verified Properties Only" checked={filters.verifiedOnly} onChange={() => { }} />
                        </FilterSection>

                        {/* Apply Button (Mobile) */}
                        <button className="w-full py-3 bg-[#3E3D23] text-white rounded-xl font-medium lg:hidden mt-6">
                            Apply Filters
                        </button>
                    </aside>

                    {/* Property List */}
                    <main className="flex-1">
                        <div className="space-y-6">
                            {isLoading ? (
                                // Render 3 Skeleton Loaders
                                [...Array(3)].map((_, i) => (
                                    <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col md:flex-row animate-pulse">
                                        <div className="md:w-[300px] h-[220px] md:h-auto bg-gray-200 flex-shrink-0"></div>
                                        <div className="flex-1 p-6 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="w-2/3">
                                                        <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-2"></div>
                                                        <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
                                                    </div>
                                                    <div className="w-1/4">
                                                        <div className="h-8 bg-gray-200 rounded-md w-full"></div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-6 mb-4">
                                                    <div className="h-4 bg-gray-200 rounded-md w-16"></div>
                                                    <div className="h-4 bg-gray-200 rounded-md w-24"></div>
                                                    <div className="h-4 bg-gray-200 rounded-md w-20"></div>
                                                </div>
                                            </div>
                                            <div className="flex gap-3 pt-4 border-t border-gray-100">
                                                <div className="flex-1 h-12 bg-gray-200 rounded-xl"></div>
                                                <div className="flex-1 h-12 bg-gray-200 rounded-xl"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                properties.map(property => (
                                    <div key={property.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all group">
                                        <div className="flex flex-col md:flex-row">
                                            {/* Image */}
                                            <div className="md:w-[300px] h-[220px] md:h-auto flex-shrink-0 relative overflow-hidden">
                                                <img src={property.image} alt={property.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                {property.verified && (
                                                    <div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                        Verified
                                                    </div>
                                                )}
                                                <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm text-gray-400 hover:text-red-500">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                                </button>
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 p-6 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div>
                                                            <h3 className="text-xl font-medium text-gray-900 mb-1 group-hover:text-[#3E3D23] transition-colors">
                                                                <Link to={`/property/${property.id}`}>{property.title}</Link>
                                                            </h3>
                                                            <p className="text-gray-500 flex items-center gap-1 text-sm">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                                                {property.location}
                                                            </p>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-2xl font-bold text-[#3E3D23]">{property.price}</div>
                                                        </div>
                                                    </div>

                                                    {/* Specs */}
                                                    <div className="flex gap-6 mb-4 flex-wrap">
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                                            <span className="text-sm font-medium">{property.bhk} BHK</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
                                                            <span className="text-sm font-medium">{property.area}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-gray-400">
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                            <span className="text-sm">Posted {property.posted}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex gap-3 pt-4 border-t border-gray-100">
                                                    <button className="flex-1 py-3 bg-[#3E3D23] text-white rounded-xl font-medium hover:bg-[#2c2b19] transition-colors shadow-md shadow-[#3E3D23]/20">
                                                        Contact Owner
                                                    </button>
                                                    <Link to={`/property/${property.id}`} className="flex-1 py-3 bg-white border-2 border-[#3E3D23] text-[#3E3D23] rounded-xl font-medium hover:bg-gray-50 transition-colors text-center">
                                                        View Details
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center gap-2 mt-12">
                            {[1, 2, 3, 4, 5].map(page => (
                                <button key={page} className={`w-10 h-10 rounded-lg ${page === 1 ? 'bg-[#3E3D23] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-[#3E3D23]'} transition-colors`}>
                                    {page}
                                </button>
                            ))}
                        </div>
                    </main>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PropertyListing;
