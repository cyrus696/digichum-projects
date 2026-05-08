import React, { useState } from 'react';

const G = '#d4a843';
const CARD = '#ffffff';
const BORDER = '#e5e7eb';
const TEXT = '#111827';
const SUBTEXT = '#6b7280';

const LEADS = [
  { id:1, name:'Arjun Sharma',    phone:'98765 43210', email:'arjun@gmail.com',   property:'SN Clave – 3BHK',     date:'Today, 10:22 AM', status:'New',     message:'Interested in site visit this weekend.' },
  { id:2, name:'Priya Mohanty',   phone:'87654 32109', email:'priya@gmail.com',    property:'Grand Arch – Villa',   date:'Today, 8:05 AM',  status:'Replied', message:'Please share floor plan and brochure.' },
  { id:3, name:'Saurav Das',      phone:'76543 21098', email:'saurav@gmail.com',   property:'Emerald Heights 2BHK', date:'Yesterday',       status:'Closed',  message:'Already purchased. Thank you!' },
  { id:4, name:'Ritu Singh',      phone:'65432 10987', email:'ritu@gmail.com',     property:'SN Clave – 2BHK',     date:'2 days ago',      status:'New',     message:'What is the possession date?' },
  { id:5, name:'Deepak Patel',    phone:'54321 09876', email:'deepak@gmail.com',   property:'SN Clave – Plot 14A', date:'3 days ago',      status:'Replied', message:'Is it RERA approved?' },
  { id:6, name:'Sunita Mishra',   phone:'43210 98765', email:'sunita@gmail.com',   property:'Grand Arch – Villa',   date:'5 days ago',      status:'New',     message:'Looking for 4BHK, any availability?' },
];

const SC = { New:'#3b82f6', Replied:'#10b981', Closed:'#6b7280' };

export default function BuilderLeads() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [leads, setLeads] = useState(LEADS);

  const filtered = leads.filter(l => filter === 'All' || l.status === filter);

  const markAs = (id, status) => {
    setLeads(ls => ls.map(l => l.id === id ? { ...l, status } : l));
    setSelected(s => s ? { ...s, status } : s);
  };

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <div>
          <h2 style={{ color: TEXT, fontSize:22, fontWeight:700 }}>Leads & Inquiries</h2>
          <p style={{ color: SUBTEXT, fontSize:14, marginTop:4 }}>{leads.filter(l=>l.status==='New').length} new unread leads</p>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          {['All','New','Replied','Closed'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding:'8px 16px', borderRadius:10, fontSize:13, fontWeight:600, cursor:'pointer', border:'none',
                fontFamily:"'Inter',sans-serif",
                background: filter===f ? `${G}22` : '#f9fafb',
                color: filter===f ? G : SUBTEXT }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns: selected ? '1fr 1.2fr' : '1fr', gap:20 }}>

        {/* Leads list */}
        <div style={{ background: CARD, border:`1px solid ${BORDER}`, borderRadius:16, overflow:'hidden', boxShadow:'0 1px 4px rgba(0,0,0,0.05)' }}>
          {filtered.map((l, i) => (
            <div key={l.id} onClick={() => setSelected(l)}
              style={{ padding:'16px 20px', borderBottom:`1px solid ${BORDER}`, cursor:'pointer',
                background: selected?.id===l.id ? '#fafafa' : 'transparent',
                borderLeft: l.status==='New' ? `3px solid #3b82f6` : `3px solid transparent`,
                transition:'background 0.15s' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                  <div style={{ width:38, height:38, borderRadius:10, background:'rgba(212,168,67,0.12)',
                    color: G, fontWeight:700, fontSize:14, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    {l.name.split(' ').map(w=>w[0]).join('')}
                  </div>
                  <div>
                    <div style={{ color: TEXT, fontWeight:600, fontSize:14, display:'flex', alignItems:'center', gap:8 }}>
                      {l.name}
                      {l.status==='New' && <span style={{ background:'#3b82f618', color:'#3b82f6', fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:20 }}>NEW</span>}
                    </div>
                    <div style={{ color: SUBTEXT, fontSize:12, marginTop:2 }}>{l.property}</div>
                  </div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ color:'#9ca3af', fontSize:11 }}>{l.date}</div>
                  <span style={{ background:`${SC[l.status]}18`, color: SC[l.status],
                    fontSize:11, fontWeight:600, padding:'2px 8px', borderRadius:20, marginTop:4, display:'inline-block' }}>{l.status}</span>
                </div>
              </div>
              <p style={{ color: SUBTEXT, fontSize:13, marginTop:10, paddingLeft:50,
                whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>"{l.message}"</p>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding:'48px', textAlign:'center', color: SUBTEXT }}>No leads in this category.</div>
          )}
        </div>

        {/* Lead detail */}
        {selected && (
          <div style={{ background: CARD, border:`1px solid ${BORDER}`, borderRadius:16, padding:'28px', boxShadow:'0 1px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
              <h3 style={{ color: TEXT, fontSize:17, fontWeight:700 }}>Lead Details</h3>
              <button onClick={() => setSelected(null)}
                style={{ background:'none', border:'none', color: SUBTEXT, cursor:'pointer', fontSize:20 }}>×</button>
            </div>

            <div style={{ display:'flex', gap:16, alignItems:'center', marginBottom:24 }}>
              <div style={{ width:52, height:52, borderRadius:14, background:`linear-gradient(135deg,${G},#b8902e)`,
                color:'#fff', fontWeight:700, fontSize:18, display:'flex', alignItems:'center', justifyContent:'center' }}>
                {selected.name.split(' ').map(w=>w[0]).join('')}
              </div>
              <div>
                <div style={{ color: TEXT, fontWeight:700, fontSize:17 }}>{selected.name}</div>
                <div style={{ color: SUBTEXT, fontSize:13 }}>{selected.date}</div>
              </div>
            </div>

            {[['📞 Phone', selected.phone], ['✉️ Email', selected.email], ['🏘️ Interested In', selected.property]].map(([k,v]) => (
              <div key={k} style={{ marginBottom:14, padding:'12px 16px', background:'#f9fafb', borderRadius:10, border:`1px solid ${BORDER}` }}>
                <div style={{ color: SUBTEXT, fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:4 }}>{k}</div>
                <div style={{ color: TEXT, fontSize:14, fontWeight:500 }}>{v}</div>
              </div>
            ))}

            <div style={{ marginBottom:20, padding:'14px 16px', background:'#f9fafb', borderRadius:10, border:`1px solid ${BORDER}` }}>
              <div style={{ color: SUBTEXT, fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:6 }}>💬 Message</div>
              <p style={{ color:'#374151', fontSize:14, lineHeight:1.6 }}>{selected.message}</p>
            </div>

            <div>
              <div style={{ color:'#374151', fontSize:13, fontWeight:500, marginBottom:10 }}>Update Status:</div>
              <div style={{ display:'flex', gap:10 }}>
                {['New','Replied','Closed'].map(s => (
                  <button key={s} onClick={() => markAs(selected.id, s)}
                    style={{ flex:1, padding:'10px', borderRadius:10, fontSize:13, fontWeight:600, cursor:'pointer',
                      fontFamily:"'Inter',sans-serif", border:`1.5px solid ${selected.status===s ? SC[s] : BORDER}`,
                      background: selected.status===s ? `${SC[s]}18` : '#f9fafb',
                      color: selected.status===s ? SC[s] : SUBTEXT }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginTop:20, display:'flex', gap:10 }}>
              <a href={`mailto:${selected.email}`}
                style={{ flex:1, padding:'12px', borderRadius:10, textAlign:'center', textDecoration:'none',
                  background:`linear-gradient(135deg,${G},#b8902e)`, color:'#fff', fontWeight:700, fontSize:14 }}>
                ✉️ Reply via Email
              </a>
              <a href={`tel:${selected.phone}`}
                style={{ flex:1, padding:'12px', borderRadius:10, textAlign:'center', textDecoration:'none',
                  background:'#f9fafb', border:`1px solid ${BORDER}`, color:'#374151', fontWeight:600, fontSize:14 }}>
                📞 Call
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

