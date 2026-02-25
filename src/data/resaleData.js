// Property 1 Images
import prop1_hall1 from '../assets/properties/property 1/hall view 1.png';
import prop1_hall2 from '../assets/properties/property 1/hall view 2.png';
import prop1_hall3 from '../assets/properties/property 1/hall view 3.png';
import prop1_hall from '../assets/properties/property 1/hall.png';
import prop1_balcony from '../assets/properties/property 1/balcony.png';
import prop1_bedroom from '../assets/properties/property 1/bedroom.png';
import prop1_bedroomCupboard from '../assets/properties/property 1/bedroom cupboard.png';
import prop1_kitchen from '../assets/properties/property 1/kitchen.png';
import prop1_kitchenView from '../assets/properties/property 1/kitchen view 1.png';
import prop1_about from '../assets/properties/property 1/about property.png';
import prop1_details from '../assets/properties/property 1/property deatils 1.png';

// Property 2 Images
import prop2_society from '../assets/properties/property 2/society photo.png';
import prop2_balcony from '../assets/properties/property 2/balcony.png';
import prop2_bathroom from '../assets/properties/property 2/bathroom.png';
import prop2_bedroom from '../assets/properties/property 2/bedroom.png';
import prop2_kitchen from '../assets/properties/property 2/kitchen.png';
import prop2_about from '../assets/properties/property 2/about property.png';
import prop2_details from '../assets/properties/property 2/property details .png';

// Property 3 Images
import prop3_hall from '../assets/properties/property 3/hall .png';
import prop3_balcony from '../assets/properties/property 3/balcony.png';
import prop3_bathroom from '../assets/properties/property 3/bathroom.png';
import prop3_bedroom from '../assets/properties/property 3/bedroom.png';
import prop3_kitchen from '../assets/properties/property 3/kitchen.png';
import prop3_about from '../assets/properties/property 3/about property.png';
import prop3_details from '../assets/properties/property 3/property deatils.png';

export const resaleData = [
    {
        id: 'resale-0',
        title: "2 BHK Apartment in Sudama Nagar",
        address: "Suyash Apartment, Sudama Nagar, Indore",
        price: "₹ 28 Lac",
        pricePerSqft: "₹ 3,733 / sq.ft",
        specs: {
            bhk: 2,
            area: "750 sq.ft",
            bathrooms: 2,
            balcony: 1,
            floor: "3rd of 4 floors",
            status: "Ready to Move",
            age: "5 to 10 years",
            facing: "Main Road",
            parking: "1 Covered"
        },
        desc: "We are the proud owners of this 2 BHK apartment available in Suryansh Apartment, Telephone Nagar, Indore. This unfurnished apartment is located on the 3rd floor and has a carpet area of 750 sq.ft. It has 2 bathrooms and 1 balcony. The ownership is freehold type. The property is in a prime location with easy access to main roads.",
        owner: { name: "Property Owner", type: "Owner", phone: "Contact for details" },
        images: [
            prop1_hall1, prop1_hall2, prop1_hall3, prop1_hall,
            prop1_balcony, prop1_bedroom, prop1_bedroomCupboard,
            prop1_kitchen, prop1_kitchenView, prop1_about, prop1_details
        ],
        amenities: ["Water Source: Municipal Corporation", "Flooring: Marble", "Power Backup: None", "Furnishing: Unfurnished"],
        overview: {
            "Carpet Area": "750 sq.ft",
            "Configuration": "2 Bedroom, 2 Bathrooms, 1 Balcony",
            "Transaction Type": "Resale",
            "Property Ownership": "Freehold",
            "Width of Facing Road": "40 ft",
            "Property Code": "G86002414"
        }
    },
    {
        id: 'resale-1',
        title: "2 BHK Apartment in Badia Keema",
        address: "IMC Gulmarg Parisar, Badia Keema, Indore",
        price: "₹ 26 Lac",
        pricePerSqft: "₹ 2,600 / sq.ft",
        specs: {
            bhk: 2,
            area: "1000 sq.ft (Super Built-up)",
            carpetArea: "670 sq.ft",
            bathrooms: 2,
            balcony: 1,
            floor: "4th of 9 floors",
            status: "Ready to Move",
            age: "1 to 5 years",
            facing: "East",
            parking: "2 Covered, 2 Open"
        },
        desc: "Located in IMC Gulmarg Parisar, Badia Keema, Indore. This 2 BHK apartment offers a comfortable living space with modern amenities. The project is a residential township in the Indore metropolitan region, located between Indore and AB Road (Bicholi bypass). It is situated on the outskirts of Indore city in a developing locality.",
        owner: { name: "Property Owner", type: "Owner", phone: "Contact for details" },
        images: [
            prop2_society, prop2_balcony, prop2_bathroom, prop2_bedroom,
            prop2_kitchen, prop2_about, prop2_details
        ],
        amenities: ["Vaastu Compliant", "Security / Fire Alarm", "Intercom Facility", "Lift(s)", "Maintenance Staff", "Water Storage", "Park", "Visitor Parking", "Gated Community"],
        overview: {
            "Super Built-up Area": "1000 sq.ft",
            "Carpet Area": "670 sq.ft",
            "Configuration": "2 Bedrooms, 2 Bathrooms, 1 Balcony, Study Room",
            "Transaction Type": "Resale",
            "Property Ownership": "Freehold",
            "Width of Facing Road": "60 ft",
            "Property Code": "L84359016",
            "Flooring": "Ceramic",
            "Water Source": "Municipal Corporation"
        }
    },
    {
        id: 'resale-2',
        title: "2 BHK Apartment in Badia Keema (650 sq.ft)",
        address: "IMC Gulmarg Parisar, Badia Keema, Indore",
        price: "₹ 26 Lac",
        pricePerSqft: "₹ 4,000 / sq.ft",
        specs: {
            bhk: 2,
            area: "650 sq.ft",
            carpetArea: "650 sq.ft",
            bathrooms: 2,
            balcony: 1,
            floor: "3rd of 9 floors",
            status: "Ready to Move",
            age: "1 year",
            facing: "East",
            parking: "2 Covered, 2 Open"
        },
        desc: "A cozy 2 BHK apartment in IMC Gulmarg Parisar, Badia Keema, Indore. Perfect for small families. The property faces East and overlooks a park/garden, main road, and club pool. It is a gated community with full power backup.",
        owner: { name: "Property Owner", type: "Owner", phone: "Contact for details" },
        images: [
            prop3_hall, prop3_balcony, prop3_bathroom, prop3_bedroom,
            prop3_kitchen, prop3_about, prop3_details
        ],
        amenities: ["Vaastu Compliant", "Security / Fire Alarm", "Intercom Facility", "Lift(s)", "Maintenance Staff", "Water Storage", "Park", "Visitor Parking", "Gated Community"],
        overview: {
            "Carpet Area": "650 sq.ft",
            "Configuration": "2 Bedrooms, 2 Bathrooms, 1 Balcony",
            "Transaction Type": "Resale",
            "Property Ownership": "Freehold",
            "Property Code": "L84359016",
            "Furnishing": "Unfurnished",
            "Water Source": "Municipal Corporation"
        }
    }
];

export const getResaleProperty = (id) => {
    return resaleData.find(property => property.id === id);
};
