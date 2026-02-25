import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Restore from localStorage on app load
        try {
            const saved = localStorage.getItem('dwello_user');
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    // Keep localStorage in sync
    useEffect(() => {
        if (user) {
            localStorage.setItem('dwello_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('dwello_user');
        }
    }, [user]);

    const login = (email, name = '') => {
        const displayName = name || email.split('@')[0];
        const initials = displayName
            .split(' ')
            .map(w => w[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);

        const userData = { email, name: displayName, initials };
        setUser(userData);
        return userData;
    };

    const signup = (name, email) => {
        const initials = name
            .split(' ')
            .map(w => w[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);

        const userData = { email, name, initials };
        setUser(userData);
        return userData;
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for easy access
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
};
