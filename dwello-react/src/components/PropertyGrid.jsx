import React from 'react';

// Data from Final.js
const properties = [
    {
        title: "Luxury Villa",
        location: "Mumbai",
        type: "Villa",
        price: 25000000,
        image: "villa.jpg", // Note: Need to make sure these exist or use placeholders. 
        // Original Final.js had these relative paths. I'll need to check if these images exist in the folder I copied.
        // If not, I should probably use a placeholder or one of the existing images.
        // The user transferred `Sources/Images/*` to `public/assets/`.
        // `villa.jpg` etc were NOT in the list_dir of Images.
        // I'll map them to the existing images for demo purposes to avoid broken images.
        actualImage: "/assets/project-1.jpg"
    },
    {
        title: "Modern Apartment",
        location: "Pune",
        type: "Apartment",
        price: 12000000,
        image: "apartment.jpg",
        actualImage: "/assets/project-2.jpg"
    },
    {
        title: "Premium Plot",
        location: "Bangalore",
        type: "Plot",
        price: 8000000,
        image: "plot.jpg",
        actualImage: "/assets/project-3.jpg"
    }
];

const PropertyGrid = ({ filterType }) => {
    // Filter logic
    const filteredProps = filterType
        ? properties.filter(p => p.type.toLowerCase() === filterType.toLowerCase() || (filterType === 'Buy' && true)) // Simplified for demo
        : properties;

    // Note: The logic in Final.js was filtering by input values. Here we might want static lists for Buy/Rent/Sell pages.
    // "Buy" page -> Show all for sale (which is default usually).
    // "Rent" page -> Show rentals.
    // "Sell" page -> Form to sell? Or list of stuff?
    // User said "created pages for buy and sell and rent... he only sees info related to that thing".
    // I'll assume:
    // Buy -> Show properties to Buy.
    // Rent -> Show properties to Rent.
    // Sell -> Information about selling.

    // For this component, I'll just render the grid.

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
