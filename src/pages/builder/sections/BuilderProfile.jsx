import React, { useState } from 'react';
import { useBuilderAuth } from '../../../context/BuilderAuthContext';

const G = '#d4a843';
const CARD = '#ffffff';
const BORDER = '#e5e7eb';
const TEXT = '#111827';
const SUBTEXT = '#6b7280';

export default function BuilderProfile() {
  const { builder } = useBuilderAuth();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: builder?.name || '',
    company: builder?.company || '',
    email: builder?.email || '',
    phone: '+91 98765 43210',
    city: 'Bhubaneswar',
    experience: '15+',
    reraId: 'RERA-OD-2024-001',
    website: 'www.sbgroup.in',
    bio: 'S.B Group is a premier real estate developer in Bhubaneswar known for delivering high-quality residential projects with modern amenities and strategic locations.',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleSave = (e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 3000); };

  const Field = ({ label, name, type='text', placeholder, as }) => (
    <div>
      <label style={{ display:'block', color:'#c8cad4', fontSize:13, fontWeight:500, marginBottom:7 }}>{label}</label>
      {as === 'textarea' ? (
        <textarea rows={3} value={form[name]} onChange={e=>set(name,e.target.value)}
          style={{ width:'100%', background:'#f9fafb', border:`1.5px solid ${BORDER}`, borderRadius:10,
            padding:'12px 14px', color:'#fff', fontSize:14, outline:'none', resize:'vertical',
            fontFamily:"'Inter',sans-serif" }} />
      ) : (
        <input type={type} value={form[name]} onChange={e=>set(name,e.target.value)} placeholder={placeholder}
          style={{ width:'100%', background:'#f9fafb', border:`1.5px solid ${BORDER}`, borderRadius:10,
            padding:'12px 14px', color:'#fff', fontSize:14, outline:'none', fontFamily:"'Inter',sans-serif" }} />
      )}
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom:28 }}>
        <h2 style={{ color: TEXT, fontSize:22, fontWeight:700 }}>Profile & Settings</h2>
        <p style={{ color: SUBTEXT, fontSize:14, marginTop:4 }}>Manage your builder profile and account settings</p>
      </div>

      <form onSubmit={handleSave}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>

          {/* Profile info */}
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>

            {/* Avatar card */}
            <div style={{ background: CARD, border:`1px solid ${BORDER}`, borderRadius:16, padding:'28px', textAlign:'center' }}>
              <div style={{ width:80, height:80, borderRadius:20, background:`linear-gradient(135deg,${G},#b8902e)`,
                color:'#fff', fontWeight:700, fontSize:28, display:'flex', alignItems:'center', justifyContent:'center',
                margin:'0 auto 16px' }}>
                {builder?.initials || 'B'}
              </div>
              <div style={{ color: TEXT, fontWeight:700, fontSize:18 }}>{form.name}</div>
              <div style={{ color: SUBTEXT, fontSize:14, marginTop:4 }}>{form.company}</div>
              <div style={{ marginTop:16, background:'rgba(212,168,67,0.08)', border:`1px solid rgba(212,168,67,0.2)`,
                borderRadius:10, padding:'10px 16px', display:'inline-block' }}>
                <span style={{ color: G, fontSize:12, fontWeight:600 }}>✅ Verified Builder</span>
              </div>
              <div style={{ marginTop:14 }}>
                <button type="button"
                  style={{ background:'#f9fafb', border:`1px solid ${BORDER}`, borderRadius:10,
                    padding:'9px 20px', color:'#c8cad4', fontSize:13, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
                  📷 Change Logo
                </button>
              </div>
            </div>

            {/* Company Info */}
            <div style={{ background: CARD, border:`1px solid ${BORDER}`, borderRadius:16, padding:'24px' }}>
              <h3 style={{ color: TEXT, fontSize:15, fontWeight:600, marginBottom:20 }}>🏢 Company Info</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                <Field label="Company Name" name="company" />
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  <Field label="Years of Experience" name="experience" />
                  <Field label="City" name="city" />
                </div>
                <Field label="RERA Registration ID" name="reraId" placeholder="e.g. RERA-OD-2024-001" />
                <Field label="Website" name="website" placeholder="www.yourcompany.in" />
              </div>
            </div>
          </div>

          {/* Right */}
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            <div style={{ background: CARD, border:`1px solid ${BORDER}`, borderRadius:16, padding:'24px' }}>
              <h3 style={{ color: TEXT, fontSize:15, fontWeight:600, marginBottom:20 }}>👤 Personal Details</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                <Field label="Full Name" name="name" />
                <Field label="Email Address" name="email" type="email" />
                <Field label="Phone Number" name="phone" />
              </div>
            </div>

            <div style={{ background: CARD, border:`1px solid ${BORDER}`, borderRadius:16, padding:'24px' }}>
              <h3 style={{ color: TEXT, fontSize:15, fontWeight:600, marginBottom:20 }}>📝 About / Bio</h3>
              <Field label="Short description about your company" name="bio" as="textarea" />
            </div>

            {/* Notification prefs */}
            <div style={{ background: CARD, border:`1px solid ${BORDER}`, borderRadius:16, padding:'24px' }}>
              <h3 style={{ color: TEXT, fontSize:15, fontWeight:600, marginBottom:20 }}>🔔 Notifications</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                {['New lead inquiry received','Lead status changes','Weekly performance report','New property views milestone'].map((n,i) => (
                  <label key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer' }}>
                    <span style={{ color:'#374151', fontSize:14 }}>{n}</span>
                    <div style={{ position:'relative', width:44, height:24, background: i<3?G:'#e5e7eb', borderRadius:12,
                      transition:'background 0.2s', cursor:'pointer' }}>
                      <div style={{ position:'absolute', top:2, left: i<3?22:2, width:20, height:20,
                        background:'#fff', borderRadius:'50%', transition:'left 0.2s' }} />
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Password */}
            <div style={{ background: CARD, border:`1px solid ${BORDER}`, borderRadius:16, padding:'24px' }}>
              <h3 style={{ color: TEXT, fontSize:15, fontWeight:600, marginBottom:20 }}>🔑 Change Password</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                {['Current Password','New Password','Confirm New Password'].map(label => (
                  <input key={label} type="password" placeholder={label}
                    style={{ background:'#f9fafb', border:`1.5px solid ${BORDER}`, borderRadius:10,
                      padding:'12px 14px', color: TEXT, fontSize:14, outline:'none', fontFamily:"'Inter',sans-serif" }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Save */}
        <div style={{ marginTop:24, display:'flex', gap:12, alignItems:'center' }}>
          <button type="submit"
            style={{ background:`linear-gradient(135deg,${G},#b8902e)`, border:'none', borderRadius:12,
              padding:'14px 36px', color:'#fff', fontWeight:700, fontSize:15, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
            💾 Save Changes
          </button>
          {saved && (
            <div style={{ background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.3)',
              borderRadius:10, padding:'10px 18px', color:'#10b981', fontSize:14, fontWeight:500 }}>
              ✅ Profile saved successfully!
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
