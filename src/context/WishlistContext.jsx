import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        try {
            const saved = localStorage.getItem('dwello_wishlist');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    // Keep localStorage in sync
    useEffect(() => {
        localStorage.setItem('dwello_wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    // Add a property object to the wishlist
    const addToWishlist = (property) => {
        setWishlist(prev => {
            const exists = prev.some(p => p.id === property.id);
            if (exists) return prev;
            return [...prev, property];
        });
    };

    // Remove a property by id
    const removeFromWishlist = (propertyId) => {
        setWishlist(prev => prev.filter(p => p.id !== propertyId));
    };

    // Toggle — add if not in list, remove if already there
    const toggleWishlist = (property) => {
        setWishlist(prev => {
            const exists = prev.some(p => p.id === property.id);
            if (exists) return prev.filter(p => p.id !== property.id);
            return [...prev, property];
        });
    };

    // Check if a property is wishlisted
    const isWishlisted = (propertyId) => wishlist.some(p => p.id === propertyId);

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isWishlisted }}>
            {children}
        </WishlistContext.Provider>
    );
};

// Custom hook
export const useWishlist = () => {
    const ctx = useContext(WishlistContext);
    if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider');
    return ctx;
};
