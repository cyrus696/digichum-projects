import React from 'react';
import project1 from '../assets/projects/project-1.webp';
import project2 from '../assets/projects/project-2.webp';
import project3 from '../assets/projects/project-3.webp';
import useScrollReveal from '../hooks/useScrollReveal';

// Data from Final.js
const properties = [
    {
        title: "Luxury Villa",
        location: "Mumbai",
        type: "Villa",
        price: 25000000,
        actualImage: project1
    },
    {
        title: "Modern Apartment",
        location: "Pune",
        type: "Apartment",
        price: 12000000,
        actualImage: project2
    },
    {
        title: "Premium Plot",
        location: "Bangalore",
        type: "Plot",
        price: 8000000,
        actualImage: project3
    }
];

const PropertyGrid = ({ filterType }) => {
    // Filter logic
    const filteredProps = filterType
        ? properties.filter(p => p.type.toLowerCase() === filterType.toLowerCase() || (filterType === 'Buy' && true)) // Simplified for demo
        : properties;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
            {filteredProps.map((p, index) => (
                <PropertyCard key={index} property={p} index={index} />
            ))}
        </div>
    );
};

// Separate component for each property card with scroll animation
const PropertyCard = ({ property, index }) => {
    const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

    return (
        <div
            ref={ref}
            className={`bg-white text-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-700
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
            style={{
                transitionDelay: `${index * 150}ms`
            }}
        >
            <img src={property.actualImage} alt={property.title} className="w-full h-48 object-cover" />
            <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                <p className="text-gray-600 mb-1">{property.location}</p>
                <p className="text-gray-600 mb-2">{property.type}</p>
                <p className="text-xl font-bold text-[#3E3D23]">₹ {property.price.toLocaleString()}</p>
                <button className="mt-4 w-full py-2 bg-[#3E3D23] text-white rounded hover:bg-[#2c2b19] transition-colors">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default PropertyGrid;
