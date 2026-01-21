import React from 'react';
import project1 from '../assets/project-1.webp';
import project2 from '../assets/project-2.webp';
import project3 from '../assets/project-3.webp';

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
                <div key={index} className="bg-white text-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <img src={p.actualImage} alt={p.title} className="w-full h-48 object-cover" />
                    <div className="p-5">
                        <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                        <p className="text-gray-600 mb-1">{p.location}</p>
                        <p className="text-gray-600 mb-2">{p.type}</p>
                        <p className="text-xl font-bold text-[#3E3D23]">₹ {p.price.toLocaleString()}</p>
                        <button className="mt-4 w-full py-2 bg-[#3E3D23] text-white rounded hover:bg-[#2c2b19] transition-colors">
                            View Details
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PropertyGrid;
