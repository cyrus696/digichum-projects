import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBuilderAuth } from '../../context/BuilderAuthContext';
import BuilderOverview from './sections/BuilderOverview';
import BuilderListings from './sections/BuilderListings';
import BuilderLeads from './sections/BuilderLeads';
import BuilderAnalytics from './sections/BuilderAnalytics';
import BuilderProfile from './sections/BuilderProfile';
import BuilderAddProperty from './sections/BuilderAddProperty';

const NAV_ITEMS = [
  { id: 'overview',     icon: '📊', label: 'Overview' },
  { id: 'listings',     icon: '🏘️', label: 'My Listings' },
  { id: 'add-property', icon: '➕', label: 'Add Property' },
  { id: 'leads',        icon: '📬', label: 'Leads & Inquiries' },
  { id: 'analytics',    icon: '📈', label: 'Analytics' },
  { id: 'profile',      icon: '👤', label: 'Profile & Settings' },
];

const SECTION_MAP = {
  overview:       BuilderOverview,
  listings:       BuilderListings,
  'add-property': BuilderAddProperty,
  leads:          BuilderLeads,
  analytics:      BuilderAnalytics,
  profile:        BuilderProfile,
};

const G = '#d4a843';
const SIDEBAR_BG = '#ffffff';
const BORDER = '#e5e7eb';

export default function BuilderDashboard() {
  const { builder, logoutBuilder } = useBuilderAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => { logoutBuilder(); navigate('/builder/login'); };

  const ActiveSection = SECTION_MAP[active] || BuilderOverview;

  return (
    <div style={{ display:'flex', minHeight:'100vh', fontFamily:"'Inter',sans-serif", background:'#f3f4f6' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #f3f4f6; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        
        .builder-sidebar { transition: transform 0.3s ease; z-index: 100; }
        .mobile-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 99; }
        .hamburger-btn { display: none; align-items: center; justify-content: center; background: none; border: none; font-size: 24px; cursor: pointer; color: #111827; margin-right: 12px; }
        
        @media (max-width: 768px) {
          .builder-sidebar { position: fixed !important; top: 0; left: 0; height: 100vh !important; }
          .builder-sidebar.closed { transform: translateX(-100%); }
          .mobile-overlay.open { display: block !important; }
          .hamburger-btn { display: flex !important; }
          .builder-header { padding: 16px !important; }
          .builder-content { padding: 16px !important; }
        }
      `}</style>

      {/* Mobile Overlay */}
      <div 
        className={`mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`} 
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`builder-sidebar ${isMobileMenuOpen ? '' : 'closed'}`} style={{
        width: 240, flexShrink: 0, background: SIDEBAR_BG,
        borderRight: `1px solid ${BORDER}`, display:'flex', flexDirection:'column',
        position:'sticky', top:0, height:'100vh', overflowY:'auto',
        boxShadow: '2px 0 8px rgba(0,0,0,0.04)'
      }}>
        {/* Logo */}
        <div style={{ padding:'24px 20px 20px', borderBottom:`1px solid ${BORDER}` }}>
          <Link to="/" style={{ display:'flex', alignItems:'center', gap:8, textDecoration:'none' }}>
            <span style={{ color: G, fontSize: 20 }}>⬡</span>
            <span style={{ color:'#111827', fontWeight:700, fontSize:18, letterSpacing:'-0.5px' }}>Dwello</span>
          </Link>
          <div style={{ marginTop:8, background:'rgba(212,168,67,0.1)', border:`1px solid rgba(212,168,67,0.25)`,
            borderRadius:8, padding:'4px 10px', display:'inline-block' }}>
            <span style={{ color: G, fontSize:10, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.8px' }}>Builder Portal</span>
          </div>
        </div>

        {/* Builder profile chip */}
        <div style={{ padding:'20px', borderBottom:`1px solid ${BORDER}` }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ width:40, height:40, borderRadius:12, background:`linear-gradient(135deg,${G},#b8902e)`,
              display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:16 }}>
              {builder?.initials || 'B'}
            </div>
            <div>
              <div style={{ color:'#111827', fontWeight:600, fontSize:13 }}>{builder?.name || 'Builder'}</div>
              <div style={{ color:'#6b7280', fontSize:11, marginTop:2 }}>Builder Account</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:'12px 10px' }}>
          {NAV_ITEMS.map(item => {
            const isActive = active === item.id;
            return (
              <button key={item.id} onClick={() => { setActive(item.id); setIsMobileMenuOpen(false); }}
                style={{
                  width:'100%', display:'flex', alignItems:'center', gap:12,
                  padding:'11px 14px', borderRadius:10, border:'none', cursor:'pointer',
                  marginBottom:2, transition:'all 0.2s', textAlign:'left',
                  background: isActive ? 'rgba(212,168,67,0.10)' : 'transparent',
                  color: isActive ? '#92700a' : '#4b5563',
                  fontWeight: isActive ? 600 : 400, fontSize: 14,
                  fontFamily:"'Inter',sans-serif",
                  borderLeft: isActive ? `3px solid ${G}` : '3px solid transparent',
                }}>
                <span style={{ fontSize:16 }}>{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding:'16px 10px', borderTop:`1px solid ${BORDER}` }}>
          <button onClick={handleLogout}
            style={{ width:'100%', display:'flex', alignItems:'center', gap:12,
              padding:'11px 14px', borderRadius:10, border:'none', cursor:'pointer',
              background:'transparent', color:'#ef4444', fontWeight:500, fontSize:14,
              fontFamily:"'Inter',sans-serif", textAlign:'left' }}>
            <span style={{ fontSize:16 }}>🚪</span> Logout
          </button>
          <Link to="/" style={{ display:'flex', alignItems:'center', gap:12,
            padding:'9px 14px', borderRadius:10, color:'#6b7280',
            fontWeight:400, fontSize:13, textDecoration:'none', marginTop:4 }}>
            <span style={{ fontSize:14 }}>🌐</span> View Main Site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex:1, overflowY:'auto', minHeight:'100vh' }}>
        {/* Top header */}
        <div className="builder-header" style={{ background:'#ffffff', borderBottom:`1px solid ${BORDER}`,
          padding:'16px 32px', display:'flex', justifyContent:'space-between', alignItems:'center',
          position:'sticky', top:0, zIndex:50, boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button className="hamburger-btn" onClick={() => setIsMobileMenuOpen(true)}>☰</button>
            <div>
              <div style={{ color:'#111827', fontWeight:600, fontSize:18 }}>
                {NAV_ITEMS.find(n => n.id === active)?.icon} {NAV_ITEMS.find(n => n.id === active)?.label}
              </div>
              <div style={{ color:'#6b7280', fontSize:12, marginTop:2 }}>{builder?.company}</div>
            </div>
          </div>
          <button onClick={() => setActive('add-property')}
            style={{ background:`linear-gradient(135deg,${G},#b8902e)`, border:'none',
              borderRadius:10, padding:'10px 20px', color:'#fff', fontWeight:700,
              fontSize:13, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
            + Add Listing
          </button>
        </div>

        {/* Content */}
        <div className="builder-content" style={{ padding:'32px', animation:'fadeIn 0.3s ease' }}>
          <ActiveSection builder={builder} onNavigate={setActive} />
        </div>
      </main>
    </div>
  );
}

