import React from 'react';

const G = '#d4a843';
const CARD = '#ffffff';
const BORDER = '#e5e7eb';
const TEXT = '#111827';
const SUBTEXT = '#6b7280';

const stat = (icon, label, value, sub, color = '#fff') => ({ icon, label, value, sub, color });

const STATS = [
  stat('🏘️', 'Active Listings', '12', '+2 this month', G),
  stat('📬', 'New Leads', '47', '8 unread today', '#60a5fa'),
  stat('👁️', 'Total Views', '3,842', '+18% vs last month', '#34d399'),
  stat('⭐', 'Avg. Rating', '4.7', 'Based on 120 reviews', '#f472b6'),
];

const RECENT_LEADS = [
  { name: 'Arjun Sharma',   property: 'SN Clave - 3BHK', date: '10 mins ago',  status: 'New' },
  { name: 'Priya Mohanty',  property: 'Grand Arch - Villa', date: '2 hrs ago', status: 'Replied' },
  { name: 'Saurav Das',     property: 'Emerald Hills - Plot', date: 'Yesterday', status: 'Closed' },
  { name: 'Ritu Singh',     property: 'SN Clave - 2BHK', date: '2 days ago',   status: 'New' },
];

const RECENT_LISTINGS = [
  { name: 'SN Clave Phase 2', type: '3BHK Apartment', price: '₹48L', views: 621, status: 'Active' },
  { name: 'Grand Arch Villa', type: 'Independent Villa', price: '₹1.2Cr', views: 389, status: 'Active' },
  { name: 'Emerald Heights', type: '2BHK Apartment', price: '₹32L', views: 204, status: 'Paused' },
];

const STATUS_COLOR = { New:'#3b82f6', Replied:'#10b981', Closed:'#6b7280', Active:'#10b981', Paused:'#f59e0b', Pending:'#f59e0b' };

export default function BuilderOverview({ builder, onNavigate }) {
  return (
    <div>
      {/* Welcome */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ color: TEXT, fontSize:26, fontWeight:700, letterSpacing:'-0.5px' }}>
          Good {getGreeting()}, {builder?.name?.split(' ')[0] || 'Builder'} 👋
        </h1>
        <p style={{ color: SUBTEXT, marginTop:6, fontSize:15 }}>
          Here's what's happening with your projects today.
        </p>
      </div>

      {/* Stats grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))', gap:16, marginBottom:32 }}>
        {STATS.map((s, i) => (
          <div key={i} style={{ background: CARD, border:`1px solid ${BORDER}`, borderRadius:16, padding:'24px 22px', boxShadow:'0 1px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize:28, marginBottom:12 }}>{s.icon}</div>
            <div style={{ color: SUBTEXT, fontSize:12, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:6 }}>{s.label}</div>
            <div style={{ color: s.color, fontSize:28, fontWeight:700, letterSpacing:'-1px', marginBottom:4 }}>{s.value}</div>
            <div style={{ color: SUBTEXT, fontSize:12 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Two-col layout */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>

        {/* Recent leads */}
        <div style={{ background: CARD, border:`1px solid ${BORDER}`, borderRadius:16, overflow:'hidden', boxShadow:'0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ padding:'20px 24px', borderBottom:`1px solid ${BORDER}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ color: TEXT, fontWeight:600, fontSize:15 }}>📬 Recent Leads</span>
            <button onClick={() => onNavigate('leads')} style={{ background:'none', border:'none', color: G, fontSize:12, cursor:'pointer', fontWeight:500 }}>View all →</button>
          </div>
          <div>
            {RECENT_LEADS.map((l, i) => (
              <div key={i} style={{ padding:'14px 24px', borderBottom: i < RECENT_LEADS.length-1 ? `1px solid ${BORDER}` : 'none',
                display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div>
                  <div style={{ color: TEXT, fontWeight:500, fontSize:14 }}>{l.name}</div>
                  <div style={{ color: SUBTEXT, fontSize:12, marginTop:2 }}>{l.property} · {l.date}</div>
                </div>
                <span style={{ background:`${STATUS_COLOR[l.status]}18`, color: STATUS_COLOR[l.status],
                  fontSize:11, fontWeight:600, padding:'3px 10px', borderRadius:20 }}>{l.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent listings */}
        <div style={{ background: CARD, border:`1px solid ${BORDER}`, borderRadius:16, overflow:'hidden', boxShadow:'0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ padding:'20px 24px', borderBottom:`1px solid ${BORDER}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ color: TEXT, fontWeight:600, fontSize:15 }}>🏘️ My Listings</span>
            <button onClick={() => onNavigate('listings')} style={{ background:'none', border:'none', color: G, fontSize:12, cursor:'pointer', fontWeight:500 }}>View all →</button>
          </div>
          <div>
            {RECENT_LISTINGS.map((l, i) => (
              <div key={i} style={{ padding:'14px 24px', borderBottom: i < RECENT_LISTINGS.length-1 ? `1px solid ${BORDER}` : 'none',
                display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div>
                  <div style={{ color: TEXT, fontWeight:500, fontSize:14 }}>{l.name}</div>
                  <div style={{ color: SUBTEXT, fontSize:12, marginTop:2 }}>{l.type} · {l.views} views</div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ color: G, fontWeight:700, fontSize:14 }}>{l.price}</div>
                  <span style={{ background:`${STATUS_COLOR[l.status]}18`, color: STATUS_COLOR[l.status],
                    fontSize:11, fontWeight:600, padding:'2px 8px', borderRadius:20, marginTop:4, display:'inline-block' }}>{l.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Quick actions */}
      <div style={{ marginTop:20, display:'flex', gap:12 }}>
        {[
          { label:'➕ Add New Listing', section:'add-property', primary:true },
          { label:'📬 View All Leads', section:'leads' },
          { label:'📈 View Analytics', section:'analytics' },
        ].map((a, i) => (
          <button key={i} onClick={() => onNavigate(a.section)}
            style={{
              padding:'12px 24px', borderRadius:12, fontWeight:600, fontSize:14,
              cursor:'pointer', fontFamily:"'Inter',sans-serif", border:`1px solid ${BORDER}`,
              background: a.primary ? `linear-gradient(135deg,${G},#b8902e)` : CARD,
              color: a.primary ? '#fff' : '#374151', transition:'transform 0.15s',
              boxShadow: a.primary ? '0 2px 8px rgba(212,168,67,0.3)' : '0 1px 3px rgba(0,0,0,0.06)',
            }}>
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Morning';
  if (h < 17) return 'Afternoon';
  return 'Evening';
}

