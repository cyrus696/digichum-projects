import project1 from '../assets/projects/project-1.webp';
import flatsImg from '../assets/properties/flats.webp';
import smallHouseImg from '../assets/properties/small-house.webp';

export const projectsData = {
    // Top Highlighted Projects
    'grand-arch': {
        name: "The Grand Arch",
        location: "Sector 58, Gurgaon",
        price: "₹ 2.5 Cr - 4.2 Cr",
        developer: "DLF Limited",
        rera: "RERA-GRG-PROJ-123-2023",
        status: "Ready to Move",
        possession: "Immediate",
        configurations: ["3 BHK", "4 BHK"],
        area: "1850 - 2800 sq.ft",
        totalUnits: 450,
        towers: 4,
        floors: 25,
        totalArea: "15 Acres",
        type: "Residential",
        highlights: [
            "Prime location in Sector 58, Gurgaon",
            "RERA approved project",
            "Earthquake resistant RCC framed structure",
            "24x7 security with CCTV surveillance",
            "Power backup for common areas",
            "Vastu compliant homes",
            "Close to metro station (1.5 km)",
            "Near schools, hospitals & shopping malls"
        ],
        description: "The Grand Arch is a premium residential project by DLF Limited, offering luxurious 3 BHK and 4 BHK apartments in the heart of Sector 58, Gurgaon. The project combines modern architecture with world-class amenities to provide an unparalleled living experience.",
        nearbyPlaces: [
            { name: "🏫 DPS School", distance: "1.2 km" },
            { name: "🏥 Medanta Hospital", distance: "2.5 km" },
            { name: "🛒 Ambience Mall", distance: "3.0 km" },
            { name: "🚇 Sector 55-56 Metro", distance: "1.5 km" }
        ]
    },
    'dlf-cyber-city': {
        name: "DLF Cyber City",
        location: "Phase 3, Gurgaon",
        price: "₹ 1.8 Cr - 3.5 Cr",
        developer: "DLF Limited",
        rera: "RERA-GRG-COMM-456-2023",
        status: "Ready to Move",
        possession: "Immediate",
        configurations: ["Office Spaces"],
        area: "500 - 5000 sq.ft",
        totalUnits: 850,
        towers: 8,
        floors: 20,
        totalArea: "28 Acres",
        type: "Commercial",
        highlights: [
            "India's largest IT/ITES park",
            "Strategic location in Gurgaon",
            "World-class infrastructure",
            "24x7 power backup",
            "High-speed elevators",
            "Ample parking space",
            "Food courts and retail outlets",
            "Close to major corporate hubs"
        ],
        description: "DLF Cyber City is India's largest and most successful IT/ITES park, offering premium office spaces in Gurgaon. Home to Fortune 500 companies, it provides state-of-the-art infrastructure and connectivity.",
        nearbyPlaces: [
            { name: "🚇 Cyber City Metro", distance: "0.5 km" },
            { name: "🏨 Multiple Hotels", distance: "1.0 km" },
            { name: "🛒 DLF Mega Mall", distance: "2.0 km" },
            { name: "✈️ IGI Airport", distance: "12 km" }
        ]
    },
    'emerald-hills': {
        name: "Emerald Hills",
        location: "Sector 65, Gurgaon",
        price: "₹ 3.1 Cr - 5.0 Cr",
        developer: "Emaar India",
        rera: "RERA-GRG-PROJ-789-2023",
        status: "Under Construction",
        possession: "Dec 2025",
        configurations: ["4 BHK Villas"],
        area: "3200 - 4500 sq.ft",
        totalUnits: 180,
        towers: 0,
        floors: 3,
        totalArea: "22 Acres",
        type: "Residential Villas",
        highlights: [
            "Luxury independent villas",
            "Gated community with 24x7 security",
            "Private gardens for each villa",
            "Premium clubhouse facilities",
            "Golf course view",
            "Smart home automation",
            "Sustainable green design",
            "Exclusive location in Sector 65"
        ],
        description: "Emerald Hills offers ultra-luxury independent villas in Gurgaon's most prestigious location. Each villa is designed with modern architecture, private gardens, and premium amenities for discerning homebuyers.",
        nearbyPlaces: [
            { name: "🏌️ Golf Course", distance: "0.8 km" },
            { name: "🏫 International School", distance: "2.0 km" },
            { name: "🏥 Artemis Hospital", distance: "3.5 km" },
            { name: "🛒 MGF Metropolitan Mall", distance: "4.0 km" }
        ]
    },
    'm3m-golfestate': {
        name: "M3M Golfestate",
        location: "Sector 65, Gurgaon",
        price: "₹ 4.5 Cr+",
        developer: "M3M India",
        rera: "RERA-GRG-PROJ-321-2023",
        status: "Ready to Move",
        possession: "Immediate",
        configurations: ["3 BHK", "4 BHK", "5 BHK"],
        area: "2400 - 5200 sq.ft",
        totalUnits: 360,
        towers: 6,
        floors: 28,
        totalArea: "35 Acres",
        type: "Luxury Apartments",
        highlights: [
            "Golf course facing apartments",
            "Iconic architecture by Hafeez Contractor",
            "9-hole golf course within premises",
            "5-star hotel amenities",
            "Concierge services",
            "Private clubhouse",
            "Helipad facility",
            "Premium location with excellent connectivity"
        ],
        description: "M3M Golfestate redefines luxury living with golf course facing apartments in Gurgaon. Designed by renowned architect Hafeez Contractor, it offers world-class amenities and an exclusive lifestyle.",
        nearbyPlaces: [
            { name: "⛳ 9-Hole Golf Course", distance: "On-site" },
            { name: "🏫 Heritage Xperiential School", distance: "1.5 km" },
            { name: "🏥 Fortis Hospital", distance: "4.0 km" },
            { name: "🚇 Huda City Centre Metro", distance: "5.0 km" }
        ]
    },

    // Featured Developers
    'dlf-india': {
        name: "DLF India",
        location: "Pan India",
        price: "Multiple Projects",
        developer: "DLF Limited",
        rera: "Multiple RERA Registrations",
        status: "Top Rated Developer",
        possession: "Various",
        configurations: ["Residential", "Commercial", "Retail"],
        area: "Various",
        totalUnits: 0,
        towers: 0,
        floors: 0,
        totalArea: "Multiple Locations",
        type: "Developer Portfolio",
        highlights: [
            "India's largest real estate company",
            "75+ years of experience",
            "Delivered 300+ projects",
            "50,000+ happy families",
            "Pan India presence",
            "Residential, Commercial & Retail expertise",
            "Timely delivery track record",
            "Quality construction standards"
        ],
        description: "DLF Limited is India's largest and most trusted real estate developer with over 75 years of experience. Known for iconic projects like DLF Cyber City, DLF Emporio, and numerous residential townships, DLF has shaped India's urban landscape.",
        nearbyPlaces: []
    },
    'godrej-properties': {
        name: "Godrej Properties",
        location: "Major Cities",
        price: "Affordable Luxury",
        developer: "Godrej Properties Limited",
        rera: "Multiple RERA Registrations",
        status: "Trusted Developer",
        possession: "Various",
        configurations: ["Residential"],
        area: "Various",
        totalUnits: 0,
        towers: 0,
        floors: 0,
        totalArea: "Multiple Locations",
        type: "Developer Portfolio",
        highlights: [
            "Part of Godrej Group - 125 years legacy",
            "Sustainable & eco-friendly projects",
            "Presence in 12 cities",
            "40+ ongoing projects",
            "Award-winning designs",
            "Customer-centric approach",
            "Green building certifications",
            "Transparent business practices"
        ],
        description: "Godrej Properties is the real estate arm of the Godrej Group, bringing 125 years of trust and excellence. Focused on sustainable development and customer satisfaction, Godrej Properties delivers quality homes across India.",
        nearbyPlaces: []
    },
    'sobha-limited': {
        name: "Sobha Limited",
        location: "Bangalore, NCR",
        price: "Premium Segment",
        developer: "Sobha Limited",
        rera: "Multiple RERA Registrations",
        status: "Quality Focused",
        possession: "Various",
        configurations: ["Residential"],
        area: "Various",
        totalUnits: 0,
        towers: 0,
        floors: 0,
        totalArea: "Multiple Locations",
        type: "Developer Portfolio",
        highlights: [
            "Backward integration model",
            "In-house construction capabilities",
            "Premium quality standards",
            "45+ years of experience",
            "100+ projects delivered",
            "Focus on Bangalore & NCR",
            "Timely project completion",
            "Attention to detail"
        ],
        description: "Sobha Limited is renowned for its backward integration model and uncompromising quality standards. With in-house capabilities for all construction activities, Sobha ensures superior quality and timely delivery.",
        nearbyPlaces: []
    },
    'prestige-group': {
        name: "Prestige Group",
        location: "South India",
        price: "Luxury Segment",
        developer: "Prestige Estates Projects Limited",
        rera: "Multiple RERA Registrations",
        status: "Market Leader",
        possession: "Various",
        configurations: ["Residential", "Commercial", "Retail", "Hospitality"],
        area: "Various",
        totalUnits: 0,
        towers: 0,
        floors: 0,
        totalArea: "Multiple Locations",
        type: "Developer Portfolio",
        highlights: [
            "South India's leading developer",
            "35+ years of excellence",
            "270+ projects delivered",
            "Diversified portfolio",
            "Luxury residential projects",
            "Premium commercial spaces",
            "Hospitality ventures",
            "Strong brand reputation"
        ],
        description: "Prestige Group is South India's most trusted real estate brand with over 35 years of excellence. From luxury residences to commercial landmarks and hospitality projects, Prestige has redefined urban living.",
        nearbyPlaces: []
    },

    // Popular Properties
    'white-meadows': {
        name: "White Meadows",
        location: "Whitefield, Bangalore",
        price: "₹ 6 Cr+",
        developer: "Prestige Group",
        rera: "RERA-BLR-PROJ-567-2023",
        status: "Ready to Move",
        possession: "Immediate",
        configurations: ["4 BHK", "5 BHK Villas"],
        area: "4000 - 6500 sq.ft",
        totalUnits: 120,
        towers: 0,
        floors: 3,
        totalArea: "18 Acres",
        type: "Ultra-Luxury Villas",
        highlights: [
            "Ultra-luxury independent villas",
            "Whitefield's most premium address",
            "Private swimming pools",
            "Home automation systems",
            "Landscaped gardens",
            "Exclusive clubhouse",
            "24x7 concierge services",
            "Close to IT corridor"
        ],
        description: "White Meadows offers ultra-luxury independent villas in Bangalore's prime Whitefield location. Each villa features private pools, smart home technology, and world-class amenities for the most discerning buyers.",
        nearbyPlaces: [
            { name: "💼 IT Parks", distance: "2.0 km" },
            { name: "🏫 International Schools", distance: "1.5 km" },
            { name: "🏥 Columbia Asia Hospital", distance: "3.0 km" },
            { name: "🛒 Phoenix Marketcity", distance: "4.0 km" }
        ]
    },
    'rustomjee-elements': {
        name: "Rustomjee Elements",
        location: "Juhu, Mumbai",
        price: "₹ 12 Cr+",
        developer: "Rustomjee Group",
        rera: "RERA-MUM-PROJ-890-2023",
        status: "Ready to Move",
        possession: "Immediate",
        configurations: ["3 BHK", "4 BHK", "5 BHK"],
        area: "2800 - 7000 sq.ft",
        totalUnits: 85,
        towers: 2,
        floors: 35,
        totalArea: "3.5 Acres",
        type: "Luxury Sea-Facing Apartments",
        highlights: [
            "Sea-facing luxury apartments",
            "Juhu's most prestigious address",
            "Panoramic Arabian Sea views",
            "Private terrace gardens",
            "Infinity pool overlooking sea",
            "Designed by Hafeez Contractor",
            "5-star hotel amenities",
            "Beach access"
        ],
        description: "Rustomjee Elements is Mumbai's most exclusive sea-facing residential project in Juhu. Offering breathtaking Arabian Sea views and ultra-luxury amenities, it represents the pinnacle of Mumbai living.",
        nearbyPlaces: [
            { name: "🏖️ Juhu Beach", distance: "0.3 km" },
            { name: "🏫 Jamnabai Narsee School", distance: "1.0 km" },
            { name: "🏥 Nanavati Hospital", distance: "2.5 km" },
            { name: "✈️ Mumbai Airport", distance: "6.0 km" }
        ]
    },
    'lodha-altamount': {
        name: "Lodha Altamount",
        location: "Altamount Road, Mumbai",
        price: "Price on Request",
        developer: "Lodha Group",
        rera: "RERA-MUM-PROJ-234-2023",
        status: "Ready to Move",
        possession: "Immediate",
        configurations: ["Luxury Apartments"],
        area: "5000 - 15000 sq.ft",
        totalUnits: 35,
        towers: 1,
        floors: 42,
        totalArea: "2 Acres",
        type: "Ultra-Luxury Residences",
        highlights: [
            "Mumbai's most expensive address",
            "Altamount Road location",
            "Triplex penthouses available",
            "Private elevators for each apartment",
            "Imported Italian marble",
            "Concierge and butler services",
            "Rooftop infinity pool",
            "Unobstructed city and sea views"
        ],
        description: "Lodha Altamount represents the zenith of luxury living in Mumbai. Located on the prestigious Altamount Road, it offers ultra-luxury residences with unparalleled amenities and breathtaking views.",
        nearbyPlaces: [
            { name: "🏛️ Breach Candy Club", distance: "0.5 km" },
            { name: "🏫 Campion School", distance: "1.0 km" },
            { name: "🏥 Breach Candy Hospital", distance: "0.8 km" },
            { name: "🛒 Kemps Corner", distance: "1.5 km" }
        ]
    },
    'pirelli-towers': {
        name: "Pirelli Towers",
        location: "Thane, Mumbai",
        price: "₹ 1.2 Cr - 2.5 Cr",
        developer: "Lodha Group",
        rera: "RERA-MUM-PROJ-678-2024",
        status: "New Launch",
        possession: "Dec 2026",
        configurations: ["2 BHK", "3 BHK"],
        area: "850 - 1450 sq.ft",
        totalUnits: 680,
        towers: 5,
        floors: 32,
        totalArea: "12 Acres",
        type: "Residential Apartments",
        highlights: [
            "New launch in Thane",
            "Excellent connectivity to Mumbai",
            "Modern amenities",
            "Spacious apartments",
            "Green building certified",
            "Close to Eastern Express Highway",
            "Near Thane station",
            "Affordable luxury"
        ],
        description: "Pirelli Towers is Lodha Group's latest offering in Thane, providing affordable luxury apartments with excellent connectivity to Mumbai. Perfect for first-time homebuyers and investors.",
        nearbyPlaces: [
            { name: "🚇 Thane Railway Station", distance: "2.0 km" },
            { name: "🏫 DAV School", distance: "1.0 km" },
            { name: "🏥 Jupiter Hospital", distance: "3.5 km" },
            { name: "🛒 Viviana Mall", distance: "2.5 km" }
        ]
    }
};

// Helper function to get project data
export const getProjectData = (projectId) => {
    return projectsData[projectId] || projectsData['grand-arch']; // Fallback to default
};
