import React from 'react';

const G = '#d4a843';
const CARD = '#ffffff';
const BORDER = '#e5e7eb';
const TEXT = '#111827';
const SUBTEXT = '#6b7280';

const MONTHLY = [
  { month:'Nov', views:180, leads:8 },
  { month:'Dec', views:240, leads:12 },
  { month:'Jan', views:310, leads:18 },
  { month:'Feb', views:290, leads:14 },
  { month:'Mar', views:420, leads:24 },
  { month:'Apr', views:510, leads:31 },
  { month:'May', views:390, leads:22 },
];

const TOP_PROPS = [
  { name:'SN Clave – 3BHK', views:621, leads:14, pct:82 },
  { name:'Grand Arch – Villa', views:389, leads:9, pct:51 },
  { name:'Emerald Heights 2BHK', views:204, leads:5, pct:27 },
  { name:'SN Clave – Plot 14A', views:98, leads:3, pct:13 },
];

const maxViews = Math.max(...MONTHLY.map(m => m.views));

export default function BuilderAnalytics() {
  return (
    <div>
      <div style={{ marginBottom:28 }}>
        <h2 style={{ color: TEXT, fontSize:22, fontWeight:700 }}>Analytics</h2>
        <p style={{ color: SUBTEXT, fontSize:14, marginTop:4 }}>Performance overview for the last 7 months</p>
      </div>

      {/* Summary stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:28 }}>
        {[
          { label:'Total Views', value:'3,842', change:'+18%', icon:'👁️', up:true },
          { label:'Total Leads', value:'116', change:'+34%', icon:'📬', up:true },
          { label:'Conversion Rate', value:'3.0%', change:'+0.5%', icon:'🎯', up:true },
          { label:'Avg. Response Time', value:'2.4 hrs', change:'-12%', icon:'⚡', up:false },
        ].map((s,i) => (
          <div key={i} style={{ background: CARD, border:`1px solid ${BORDER}`, borderRadius:16, padding:'20px' }}>
            <div style={{ fontSize:26, marginBottom:10 }}>{s.icon}</div>
            <div style={{ color: SUBTEXT, fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.5px' }}>{s.label}</div>
            <div style={{ color: TEXT, fontSize:26, fontWeight:700, letterSpacing:'-1px', margin:'6px 0 4px' }}>{s.value}</div>
            <div style={{ color: SUBTEXT, fontSize:12, fontWeight:600 }}>{s.change} vs last period</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div style={{ background: CARD, border:`1px solid ${BORDER}`, borderRadius:16, padding:'28px', marginBottom:24 }}>
        <h3 style={{ color: TEXT, fontSize:15, fontWeight:600, marginBottom:24 }}>📊 Monthly Views & Leads</h3>
        <div style={{ display:'flex', alignItems:'flex-end', gap:16, height:160 }}>
          {MONTHLY.map((m, i) => (
            <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
              <div style={{ color:'#6b7280', fontSize:11 }}>{m.views}</div>
              <div style={{ width:'100%', display:'flex', gap:4, alignItems:'flex-end', height:120 }}>
                <div style={{ flex:1, background:`linear-gradient(to top, ${G}, #b8902e)`,
                  borderRadius:'4px 4px 0 0', opacity:0.9,
                  height:`${(m.views/maxViews)*100}%`, minHeight:4 }} />
                <div style={{ flex:1, background:'#3b82f6', borderRadius:'4px 4px 0 0', opacity:0.8,
                  height:`${(m.leads/maxViews)*100*4}%`, minHeight:4 }} />
              </div>
              <div style={{ color:'#9ca3af', fontSize:12 }}>{m.month}</div>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', gap:20, marginTop:16 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:12, height:12, borderRadius:3, background: G }} />
            <span style={{ color: SUBTEXT, fontSize:12 }}>Views</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:12, height:12, borderRadius:3, background:'#3b82f6' }} />
            <span style={{ color: SUBTEXT, fontSize:12 }}>Leads</span>
          </div>
        </div>
      </div>

      {/* Top properties */}
      <div style={{ background: CARD, border:`1px solid ${BORDER}`, borderRadius:16, padding:'28px' }}>
        <h3 style={{ color: TEXT, fontSize:15, fontWeight:600, marginBottom:20 }}>🏆 Top Performing Properties</h3>
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {TOP_PROPS.map((p, i) => (
            <div key={i}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ color: G, fontWeight:700, fontSize:14 }}>#{i+1}</span>
                  <span style={{ color: SUBTEXT, fontSize:14, fontWeight:500 }}>{p.name}</span>
                </div>
                <div style={{ display:'flex', gap:16 }}>
                  <span style={{ color: SUBTEXT, fontSize:13 }}>👁️ {p.views}</span>
                  <span style={{ color:'#3b82f6', fontSize:13 }}>📬 {p.leads}</span>
                </div>
              </div>
              <div style={{ height:6, background:'#f3f4f6', borderRadius:3, overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${p.pct}%`, background:`linear-gradient(90deg,${G},#b8902e)`,
                  borderRadius:3, transition:'width 1s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
