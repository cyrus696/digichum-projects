import React, { useState } from 'react';

const G = '#d4a843';
const CARD = '#ffffff';
const BORDER = '#e5e7eb';
const TEXT = '#111827';
const SUBTEXT = '#6b7280';

const LISTINGS = [
  { id: 1, name: 'SN Clave – 3BHK Premium', type: 'Apartment', location: 'Patia, Bhubaneswar', price: '₹48 Lakhs', views: 621, leads: 14, status: 'Active',  posted: '12 Apr 2025' },
  { id: 2, name: 'Grand Arch – Villa',      type: 'Villa',      location: 'Nayapalli, BBSR',    price: '₹1.2 Cr',    views: 389, leads: 9,  status: 'Active',  posted: '01 Mar 2025' },
  { id: 3, name: 'Emerald Heights – 2BHK',  type: 'Apartment', location: 'Khandagiri, BBSR',   price: '₹32 Lakhs', views: 204, leads: 5,  status: 'Paused',  posted: '20 Feb 2025' },
  { id: 4, name: 'SN Clave – Plot 14A',     type: 'Plot',       location: 'Patia, Bhubaneswar', price: '₹18 Lakhs', views: 98,  leads: 3,  status: 'Active',  posted: '15 Jan 2025' },
  { id: 5, name: 'Sunrise Tower – 2BHK',    type: 'Apartment', location: 'Cuttack Road, BBSR', price: '₹27 Lakhs', views: 67,  leads: 1,  status: 'Pending', posted: '02 May 2025' },
];

const SC = { Active:'#10b981', Paused:'#f59e0b', Pending:'#3b82f6' };

export default function BuilderListings({ onNavigate }) {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  
  const [listings, setListings] = useState(() => {
    const saved = localStorage.getItem('builder_listings');
    return saved ? JSON.parse(saved) : LISTINGS;
  });

  // Sync to local storage whenever listings change
  React.useEffect(() => {
    localStorage.setItem('builder_listings', JSON.stringify(listings));
  }, [listings]);

  const filtered = listings.filter(l =>
    (filter === 'All' || l.status === filter) &&
    (l.name.toLowerCase().includes(search.toLowerCase()) || l.location.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleStatus = (id) => {
    setListings(ls => ls.map(l => l.id === id
      ? { ...l, status: l.status === 'Active' ? 'Paused' : 'Active' }
      : l
    ));
  };

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <div>
          <h2 style={{ color: TEXT, fontSize:22, fontWeight:700 }}>My Listings</h2>
          <p style={{ color: SUBTEXT, fontSize:14, marginTop:4 }}>{listings.length} total properties listed</p>
        </div>
        <button onClick={() => onNavigate('add-property')}
          style={{ background:`linear-gradient(135deg,${G},#b8902e)`, border:'none', borderRadius:10,
            padding:'11px 22px', color:'#fff', fontWeight:700, fontSize:14, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
          + Add New
        </button>
      </div>

      {/* Filters */}
      <div style={{ display:'flex', gap:12, marginBottom:20, alignItems:'center', flexWrap:'wrap' }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍  Search listings..."
          style={{ background:'#f9fafb', border:`1px solid ${BORDER}`, borderRadius:10, padding:'10px 16px',
            color: TEXT, fontSize:14, outline:'none', flex:1, minWidth:220, fontFamily:"'Inter',sans-serif" }}
        />
        {['All','Active','Paused','Pending'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding:'9px 18px', borderRadius:10, fontSize:13, fontWeight:600, cursor:'pointer', border:'none',
              fontFamily:"'Inter',sans-serif",
              background: filter === f ? `${G}22` : '#f9fafb',
              color: filter === f ? G : SUBTEXT, borderLeft: filter===f ? `3px solid ${G}`: '3px solid transparent' }}>
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: CARD, border:`1px solid ${BORDER}`, borderRadius:16, overflowX:'auto', overflowY:'hidden' }}>
        <table style={{ width:'100%', minWidth: 800, borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ background:'#f9fafb' }}>
              {['Property', 'Type', 'Price', 'Views', 'Leads', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding:'14px 20px', textAlign:'left', color: SUBTEXT, fontSize:11,
                  fontWeight:600, textTransform:'uppercase', letterSpacing:'0.5px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={7} style={{ padding:'40px', textAlign:'center', color: SUBTEXT }}>No listings found.</td></tr>
            )}
            {filtered.map((l, i) => (
              <tr key={l.id} style={{ borderTop:`1px solid ${BORDER}`, transition:'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#fcfcfc'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding:'16px 20px' }}>
                  <div style={{ color:'#6b7280', fontSize:12, marginTop:2 }}>📍 {l.location}</div>
                </td>
                <td style={{ padding:'16px 20px', color:'#c8cad4', fontSize:14 }}>{l.type}</td>
                <td style={{ padding:'16px 20px', color: G, fontWeight:700, fontSize:14 }}>{l.price}</td>
                <td style={{ padding:'16px 20px', color:'#c8cad4', fontSize:14 }}>👁️ {l.views}</td>
                <td style={{ padding:'16px 20px', color:'#c8cad4', fontSize:14 }}>📬 {l.leads}</td>
                <td style={{ padding:'16px 20px' }}>
                  <span style={{ background:`${SC[l.status]}22`, color: SC[l.status],
                    fontSize:12, fontWeight:600, padding:'4px 12px', borderRadius:20 }}>{l.status}</span>
                </td>
                <td style={{ padding:'16px 20px' }}>
                  <div style={{ display:'flex', gap:8 }}>
                    <button onClick={() => toggleStatus(l.id)}
                      style={{ background:'#f9fafb', border:`1px solid ${BORDER}`, borderRadius:8,
                        padding:'6px 12px', color:'#c8cad4', fontSize:12, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
                      {l.status === 'Active' ? 'Pause' : 'Activate'}
                    </button>
                    <button onClick={() => setListings(ls => ls.filter(x => x.id !== l.id))}
                      style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:8,
                      padding:'6px 12px', color:'#ef4444', fontSize:12, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
