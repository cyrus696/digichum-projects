import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBuilderAuth } from '../context/BuilderAuthContext';

const BuilderLogin = () => {
    const { loginBuilder, isBuilderAuthenticated } = useBuilderAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    // Redirect already-authenticated builders — must be in useEffect, not during render
    useEffect(() => {
        if (isBuilderAuthenticated) {
            navigate('/builder/dashboard', { replace: true });
        }
    }, [isBuilderAuthenticated, navigate]);

    if (isBuilderAuthenticated) return null;

    const handleChange = (e) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            setError('Please fill in all fields.');
            return;
        }
        setLoading(true);
        await new Promise(r => setTimeout(r, 600)); // simulate network
        const result = loginBuilder(form.email, form.password);
        setLoading(false);
        if (result.success) {
            navigate('/builder/dashboard');
        } else {
            setError(result.error);
        }
    };

    const fillDemo = () => {
        setForm({ email: 'demo@dwello.in', password: 'demo123' });
        setError('');
    };

    return (
        <div style={styles.page}>
            {/* Background grid */}
            <div style={styles.gridOverlay} />

            {/* Top bar */}
            <div style={styles.topBar} className="top-bar">
                <Link to="/" style={styles.logo}>
                    <span style={styles.logoIcon}>⬡</span>
                    <span style={styles.logoText}>Dwello</span>
                    <span style={styles.logoBadge}>Builder Portal</span>
                </Link>
                <Link to="/" style={styles.backLink}>← Back to main site</Link>
            </div>

            {/* Card */}
            <div style={styles.cardWrapper} className="card-wrapper">
                <div style={styles.card} className="builder-card">
                    {/* Left panel */}
                    <div style={styles.leftPanel} className="left-panel">
                        <div style={styles.leftContent}>
                            <div style={styles.leftIcon}>🏗️</div>
                            <h2 style={styles.leftTitle}>Builder & Developer Portal</h2>
                            <p style={styles.leftSubtitle}>
                                Your dedicated workspace to manage projects, listings, leads, and grow your real estate business.
                            </p>
                            <div style={styles.featureList}>
                                {[
                                    { icon: '📊', text: 'Real-time analytics & insights' },
                                    { icon: '🏘️', text: 'Manage all your listings' },
                                    { icon: '📬', text: 'Track buyer inquiries & leads' },
                                    { icon: '🔒', text: 'Secure, role-based access' },
                                ].map((f, i) => (
                                    <div key={i} style={styles.feature}>
                                        <span style={styles.featureIcon}>{f.icon}</span>
                                        <span style={styles.featureText}>{f.text}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={styles.demoHint}>
                                <span style={styles.demoHintLabel}>Demo Access</span>
                                <button onClick={fillDemo} style={styles.demoBtn}>Use demo credentials →</button>
                            </div>
                        </div>
                    </div>

                    {/* Right panel */}
                    <div style={styles.rightPanel} className="right-panel">
                        <div style={styles.formHeader}>
                            <h1 style={styles.formTitle}>Sign in to your portal</h1>
                            <p style={styles.formSubtitle}>Enter your registered builder credentials below</p>
                        </div>

                        <form onSubmit={handleSubmit} style={styles.form}>
                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>Email Address</label>
                                <div style={styles.inputWrapper}>
                                    <span style={styles.inputIcon}>✉️</span>
                                    <input
                                        id="builder-email"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="builder@company.in"
                                        style={styles.input}
                                        autoComplete="email"
                                    />
                                </div>
                            </div>

                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>Password</label>
                                <div style={styles.inputWrapper}>
                                    <span style={styles.inputIcon}>🔑</span>
                                    <input
                                        id="builder-password"
                                        name="password"
                                        type={showPass ? 'text' : 'password'}
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        style={styles.input}
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPass(s => !s)}
                                        style={styles.showPassBtn}
                                    >
                                        {showPass ? '🙈' : '👁️'}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div style={styles.errorBox}>
                                    <span>⚠️</span> {error}
                                </div>
                            )}

                            <button
                                id="builder-login-submit"
                                type="submit"
                                disabled={loading}
                                style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}
                            >
                                {loading ? (
                                    <span style={styles.loadingContent}>
                                        <span style={styles.spinner} /> Signing in...
                                    </span>
                                ) : 'Sign In to Portal'}
                            </button>
                        </form>

                        <div style={styles.footerNote}>
                            Not a registered builder?{' '}
                            <a href="mailto:partner@dwello.in" style={styles.footerLink}>Contact us to get onboarded</a>
                        </div>

                        <div style={styles.divider}><span style={styles.dividerText}>or</span></div>

                        <Link to="/login" style={styles.userLoginLink}>
                            Sign in as a regular user instead →
                        </Link>
                    </div>
                </div>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .builder-input:focus { border-color: #d4a843 !important; box-shadow: 0 0 0 3px rgba(212,168,67,0.15) !important; outline: none; }
                
                @media (max-width: 800px) {
                    .builder-card { flex-direction: column !important; max-width: 450px !important; }
                    .left-panel { padding: 32px 24px !important; border-right: none !important; border-bottom: 1px solid #2a2d38 !important; flex: none !important; }
                    .right-panel { width: 100% !important; padding: 32px 24px !important; flex: none !important; }
                    .card-wrapper { padding: 16px !important; }
                    .top-bar { padding: 16px !important; flex-direction: column !important; gap: 16px !important; align-items: center !important; }
                }
            `}</style>
        </div>
    );
};

const GOLD = '#d4a843';
const DARK = '#0f1117';
const CARD_BG = '#16181f';
const BORDER = '#2a2d38';

const styles = {
    page: {
        minHeight: '100vh',
        background: DARK,
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    gridOverlay: {
        position: 'fixed',
        inset: 0,
        backgroundImage: `linear-gradient(${BORDER} 1px, transparent 1px), linear-gradient(90deg, ${BORDER} 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
        opacity: 0.4,
        pointerEvents: 'none',
    },
    topBar: {
        width: '100%',
        maxWidth: 1100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 32px',
        zIndex: 10,
        position: 'relative',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        textDecoration: 'none',
    },
    logoIcon: { fontSize: 24, color: GOLD },
    logoText: { fontWeight: 700, fontSize: 22, color: '#fff', letterSpacing: '-0.5px' },
    logoBadge: {
        background: 'rgba(212,168,67,0.15)',
        color: GOLD,
        fontSize: 11,
        fontWeight: 600,
        padding: '3px 10px',
        borderRadius: 20,
        border: `1px solid rgba(212,168,67,0.3)`,
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
    },
    backLink: {
        color: '#8b8fa8',
        textDecoration: 'none',
        fontSize: 14,
        fontWeight: 500,
        transition: 'color 0.2s',
    },
    cardWrapper: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px 60px',
        zIndex: 10,
        position: 'relative',
        width: '100%',
    },
    card: {
        background: CARD_BG,
        border: `1px solid ${BORDER}`,
        borderRadius: 24,
        display: 'flex',
        width: '100%',
        maxWidth: 980,
        overflow: 'hidden',
        boxShadow: '0 25px 80px rgba(0,0,0,0.6)',
        animation: 'fadeUp 0.5s ease',
    },
    leftPanel: {
        flex: 1,
        background: `linear-gradient(135deg, #1a1c26 0%, #12141c 100%)`,
        padding: '52px 44px',
        borderRight: `1px solid ${BORDER}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    leftContent: { maxWidth: 340 },
    leftIcon: { fontSize: 48, marginBottom: 20 },
    leftTitle: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 700,
        lineHeight: 1.3,
        marginBottom: 14,
        letterSpacing: '-0.5px',
    },
    leftSubtitle: {
        color: '#8b8fa8',
        fontSize: 15,
        lineHeight: 1.65,
        marginBottom: 36,
    },
    featureList: { display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 },
    feature: { display: 'flex', alignItems: 'center', gap: 12 },
    featureIcon: { fontSize: 18, width: 32, height: 32, background: 'rgba(212,168,67,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    featureText: { color: '#c8cad4', fontSize: 14, fontWeight: 500 },
    demoHint: {
        background: 'rgba(212,168,67,0.08)',
        border: `1px solid rgba(212,168,67,0.2)`,
        borderRadius: 12,
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
    },
    demoHintLabel: { color: GOLD, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' },
    demoBtn: {
        background: 'none',
        border: 'none',
        color: '#c8cad4',
        fontSize: 13,
        fontWeight: 500,
        cursor: 'pointer',
        padding: 0,
        textAlign: 'left',
    },
    rightPanel: {
        width: 420,
        padding: '52px 48px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    formHeader: { marginBottom: 36 },
    formTitle: { color: '#fff', fontSize: 24, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.5px' },
    formSubtitle: { color: '#8b8fa8', fontSize: 14, lineHeight: 1.5 },
    form: { display: 'flex', flexDirection: 'column', gap: 22, marginBottom: 28 },
    fieldGroup: { display: 'flex', flexDirection: 'column', gap: 8 },
    label: { color: '#c8cad4', fontSize: 13, fontWeight: 500, letterSpacing: '0.2px' },
    inputWrapper: {
        display: 'flex',
        alignItems: 'center',
        background: '#1e2130',
        border: `1.5px solid ${BORDER}`,
        borderRadius: 12,
        overflow: 'hidden',
        transition: 'border-color 0.2s, box-shadow 0.2s',
    },
    inputIcon: { padding: '0 14px', fontSize: 16, opacity: 0.7, flexShrink: 0 },
    input: {
        flex: 1,
        background: 'transparent',
        border: 'none',
        outline: 'none',
        color: '#fff',
        fontSize: 15,
        padding: '14px 0',
        fontFamily: "'Inter', sans-serif",
    },
    showPassBtn: {
        background: 'none',
        border: 'none',
        padding: '0 14px',
        cursor: 'pointer',
        fontSize: 16,
        opacity: 0.7,
    },
    errorBox: {
        background: 'rgba(220,38,38,0.1)',
        border: '1px solid rgba(220,38,38,0.3)',
        borderRadius: 10,
        padding: '12px 16px',
        color: '#f87171',
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
    },
    submitBtn: {
        background: `linear-gradient(135deg, ${GOLD}, #b8902e)`,
        border: 'none',
        borderRadius: 12,
        color: '#0f1117',
        fontSize: 15,
        fontWeight: 700,
        padding: '15px',
        cursor: 'pointer',
        transition: 'opacity 0.2s, transform 0.15s',
        letterSpacing: '0.3px',
    },
    loadingContent: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 },
    spinner: {
        width: 16,
        height: 16,
        border: '2px solid rgba(0,0,0,0.2)',
        borderTopColor: '#0f1117',
        borderRadius: '50%',
        display: 'inline-block',
        animation: 'spin 0.7s linear infinite',
    },
    footerNote: { color: '#8b8fa8', fontSize: 13, textAlign: 'center' },
    footerLink: { color: GOLD, textDecoration: 'none', fontWeight: 500 },
    divider: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        margin: '20px 0',
        '::before': { content: '""', flex: 1, height: 1, background: BORDER },
    },
    dividerText: { color: '#8b8fa8', fontSize: 12, padding: '0 12px', background: CARD_BG, position: 'relative' },
    userLoginLink: {
        display: 'block',
        textAlign: 'center',
        color: '#8b8fa8',
        textDecoration: 'none',
        fontSize: 13,
        fontWeight: 500,
        padding: '12px',
        borderRadius: 10,
        border: `1px solid ${BORDER}`,
        transition: 'border-color 0.2s, color 0.2s',
    },
};

export default BuilderLogin;
