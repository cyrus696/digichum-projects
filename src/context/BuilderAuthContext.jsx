import React, { createContext, useContext, useState, useEffect } from 'react';

const BuilderAuthContext = createContext(null);

// Mock credentials for demo
const MOCK_BUILDERS = {
    'sbgroup@dwello.in': { password: 'sb@2024', id: 'sb-group', name: 'S.B Group', company: 'S.B Group Pvt. Ltd.' },
    'shivom@dwello.in': { password: 'shivom@2024', id: 'shivom-builders', name: 'Shivom Builders', company: 'Shivom Builders And Developers' },
    'ambika@dwello.in': { password: 'ambika@2024', id: 'ambika-builders', name: 'Ambika Builders', company: 'Ambika Builders & Real Estate' },
    'demo@dwello.in':   { password: 'demo123',     id: 'demo-builder',    name: 'Demo Builder',   company: 'Demo Real Estate Co.' },
};

export const BuilderAuthProvider = ({ children }) => {
    const [builder, setBuilder] = useState(() => {
        try {
            const saved = localStorage.getItem('dwello_builder');
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        if (builder) {
            localStorage.setItem('dwello_builder', JSON.stringify(builder));
        } else {
            localStorage.removeItem('dwello_builder');
        }
    }, [builder]);

    const loginBuilder = (email, password) => {
        const match = MOCK_BUILDERS[email.toLowerCase()];
        if (!match || match.password !== password) {
            return { success: false, error: 'Invalid email or password.' };
        }
        const initials = match.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
        const builderData = { email, id: match.id, name: match.name, company: match.company, initials, role: 'builder' };
        setBuilder(builderData);
        return { success: true, builder: builderData };
    };

    const logoutBuilder = () => setBuilder(null);

    return (
        <BuilderAuthContext.Provider value={{ builder, isBuilderAuthenticated: !!builder, loginBuilder, logoutBuilder }}>
            {children}
        </BuilderAuthContext.Provider>
    );
};

export const useBuilderAuth = () => {
    const ctx = useContext(BuilderAuthContext);
    if (!ctx) throw new Error('useBuilderAuth must be used inside BuilderAuthProvider');
    return ctx;
};
