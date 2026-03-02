/**
 * searchIndex.js
 * Unified flat search index combining all local property data sources.
 * Every entry has: { id, title, location, price, type, tag, bhk, image, link }
 */

import { resaleData } from './resaleData';
import { projectsData } from './projectsData';

// ─── Resale Properties ────────────────────────────────────────────────────────
const resaleItems = resaleData.map((p) => ({
    id: p.id,
    title: p.title,
    location: p.address,
    price: p.price,
    type: 'Apartment',
    tag: 'Resale',
    bhk: p.specs?.bhk || null,
    area: p.specs?.area || '',
    image: p.images?.[0] || null,
    link: `/property/${p.id}`,
}));

// ─── Projects ─────────────────────────────────────────────────────────────────
const projectItems = Object.entries(projectsData).map(([key, p]) => ({
    id: key,
    title: p.name,
    location: p.location,
    price: p.price,
    type: p.type || 'Residential',
    tag: p.status || 'Project',
    bhk: null,
    area: p.area || '',
    image: p.images?.[0] || null,
    link: `/projects/${key}`,
}));

// ─── Inline Buy Mock Data (matches Buy.jsx) ───────────────────────────────────
import flatsImg from '../assets/properties/flats.webp';
import smallHouseImg from '../assets/properties/small-house.webp';
import bhk1Img from '../assets/properties/1bhk house.webp';
import project1 from '../assets/projects/project-1.webp';
import project2 from '../assets/projects/project-2.webp';

const buyItems = [
    { id: 'buy-pop-1', title: 'Dream Heights', location: 'Bandra West, Mumbai', price: '₹ 3.2 Cr', type: 'Apartment', tag: 'Buy', bhk: 3, area: '', image: flatsImg, link: '/buy' },
    { id: 'buy-pop-2', title: 'The Grand Villa', location: 'Powai, Mumbai', price: '₹ 8.5 Cr', type: 'Villa', tag: 'Buy', bhk: 4, area: '', image: smallHouseImg, link: '/buy' },
    { id: 'buy-pop-3', title: 'Urban Studio', location: 'Bandra, Mumbai', price: '₹ 1.1 Cr', type: 'Studio', tag: 'Buy', bhk: 1, area: '', image: bhk1Img, link: '/buy' },
    { id: 'buy-pop-4', title: 'Seaside Heights', location: 'Juhu, Mumbai', price: '₹ 7.8 Cr', type: 'Apartment', tag: 'Sea View', bhk: 3, area: '', image: project1, link: '/buy' },
    { id: 'buy-fresh-1', title: 'New Age Homes', location: 'Thane, Mumbai', price: '₹ 85 L', type: 'Apartment', tag: 'New Launch', bhk: 2, area: '', image: project2, link: '/buy' },
    { id: 'buy-fresh-2', title: 'Modern Living', location: 'Pune', price: '₹ 1.5 Cr', type: 'Apartment', tag: 'New', bhk: 3, area: '', image: flatsImg, link: '/buy' },
    { id: 'buy-fresh-3', title: 'Garden Estate', location: 'Alibaug', price: '₹ 60 L', type: 'Plot', tag: 'Land', bhk: null, area: '', image: smallHouseImg, link: '/buy' },
    { id: 'buy-prem-1', title: 'The Imperial', location: 'South Mumbai', price: '₹ 25 Cr', type: 'Penthouse', tag: 'Luxury', bhk: 5, area: '', image: project1, link: '/buy' },
    { id: 'buy-prem-2', title: "Ocean's 12", location: 'Bandra, Mumbai', price: '₹ 40 Cr', type: 'Villa', tag: 'Ultra Luxury', bhk: 5, area: '', image: project2, link: '/buy' },
];

// ─── Inline Rent Mock Data (matches Rent.jsx) ─────────────────────────────────
const rentItems = [
    { id: 'rent-pop-1', title: 'Modern 2BHK Apartment', location: 'Bandra West, Mumbai', price: '₹ 45,000/mo', type: 'Apartment', tag: 'Rent', bhk: 2, area: '', image: flatsImg, link: '/rent' },
    { id: 'rent-pop-2', title: 'Spacious Villa', location: 'Lonavala', price: '₹ 85,000/mo', type: 'Villa', tag: 'Rent', bhk: 4, area: '', image: smallHouseImg, link: '/rent' },
    { id: 'rent-pop-3', title: 'Cozy Studio', location: 'Andheri East, Mumbai', price: '₹ 18,000/mo', type: 'Studio', tag: 'Rent', bhk: 1, area: '', image: bhk1Img, link: '/rent' },
    { id: 'rent-pop-4', title: 'Family Flat', location: 'Thane West, Mumbai', price: '₹ 32,000/mo', type: 'Apartment', tag: 'Rent', bhk: 2, area: '', image: flatsImg, link: '/rent' },
    { id: 'rent-budget-1', title: '1BHK Near Metro', location: 'Ghatkopar, Mumbai', price: '₹ 15,000/mo', type: 'Apartment', tag: 'Rent', bhk: 1, area: '', image: bhk1Img, link: '/rent' },
    { id: 'rent-budget-2', title: 'Shared Apartment', location: 'Powai, Mumbai', price: '₹ 12,000/mo', type: 'PG', tag: 'Rent', bhk: null, area: '', image: flatsImg, link: '/rent' },
    { id: 'rent-luxury-1', title: 'Sea View Penthouse', location: 'Juhu, Mumbai', price: '₹ 2,50,000/mo', type: 'Penthouse', tag: 'Rent', bhk: 4, area: '', image: smallHouseImg, link: '/rent' },
    { id: 'rent-luxury-2', title: 'Premium 4BHK', location: 'Worli, Mumbai', price: '₹ 1,80,000/mo', type: 'Apartment', tag: 'Rent', bhk: 4, area: '', image: flatsImg, link: '/rent' },
];

// ─── Exported unified index ────────────────────────────────────────────────────
export const searchIndex = [
    ...resaleItems,
    ...projectItems,
    ...buyItems,
    ...rentItems,
];

/**
 * Core search function
 * @param {string} query - text search
 * @param {object} filters - { city, type, maxPrice }
 * @returns filtered array of searchIndex items
 */
export function searchProperties(query = '', filters = {}) {
    const q = query.toLowerCase().trim();
    const { city = '', type = '', maxPrice = 0 } = filters;

    return searchIndex.filter((item) => {
        // Text match: title, location, type, tag
        const textMatch =
            !q ||
            item.title.toLowerCase().includes(q) ||
            item.location.toLowerCase().includes(q) ||
            item.type.toLowerCase().includes(q) ||
            item.tag.toLowerCase().includes(q);

        // City match
        const cityMatch =
            !city || item.location.toLowerCase().includes(city.toLowerCase());

        // Property type match
        const typeMatch =
            !type || item.type.toLowerCase().includes(type.toLowerCase());

        // Price match (parse the price string to a number for comparison)
        let priceMatch = true;
        if (maxPrice > 0) {
            const raw = item.price
                .replace(/₹|,|\s/g, '')
                .replace(/Cr/i, 'Cr')
                .replace(/L\b/i, 'L')
                .replace(/\/mo/i, '');
            let num = parseFloat(raw);
            if (/Cr/i.test(raw)) num *= 10000000;
            if (/L/i.test(raw)) num *= 100000;
            priceMatch = !isNaN(num) && num <= maxPrice;
        }

        return textMatch && cityMatch && typeMatch && priceMatch;
    });
}
