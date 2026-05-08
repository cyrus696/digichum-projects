import React, { useState } from 'react';

const G = '#d4a843';
const CARD = '#ffffff';
const BORDER = '#e5e7eb';
const TEXT = '#111827';
const SUBTEXT = '#6b7280';

const INIT = { title:'', type:'Apartment', bhk:'2 BHK', price:'', area:'', location:'', city:'Bhubaneswar', description:'', amenities:[], status:'Active' };
const AMENITY_LIST = ['24x7 Security','Power Backup','Parking','Gym','Swimming Pool','Club House','Kids Play Area','Lift','CCTV','Garden'];
const PROPERTY_TYPES = ['Apartment','Villa','Plot','Row House','Penthouse','Commercial'];
const BHK_OPTIONS = ['1 BHK','2 BHK','3 BHK','4 BHK','4+ BHK','N/A (Plot)'];

const Field = ({ label, name, type='text', placeholder, as, form, set, errors }) => (
  <div>
    <label style={{ display:'block', color:'#374151', fontSize:13, fontWeight:500, marginBottom:7 }}>{label}</label>
    {as === 'textarea' ? (
      <textarea rows={4} value={form[name]} onChange={e=>set(name,e.target.value)} placeholder={placeholder}
        style={{ width:'100%', background:'#f9fafb', border:`1.5px solid ${errors[name]?'#ef4444':BORDER}`, borderRadius:10,
          padding:'12px 14px', color: TEXT, fontSize:14, outline:'none', resize:'vertical', fontFamily:"'Inter',sans-serif" }} />
    ) : (
      <input type={type} value={form[name]} onChange={e=>set(name,e.target.value)} placeholder={placeholder}
        style={{ width:'100%', background:'#f9fafb', border:`1.5px solid ${errors[name]?'#ef4444':BORDER}`, borderRadius:10,
          padding:'12px 14px', color: TEXT, fontSize:14, outline:'none', fontFamily:"'Inter',sans-serif" }} />
    )}
    {errors[name] && <div style={{ color:'#ef4444', fontSize:11, marginTop:4 }}>⚠ {errors[name]}</div>}
  </div>
);

const Select = ({ label, name, options, form, set, errors }) => (
  <div>
    <label style={{ display:'block', color:'#374151', fontSize:13, fontWeight:500, marginBottom:7 }}>{label}</label>
    <select value={form[name]} onChange={e=>set(name,e.target.value)}
      style={{ width:'100%', background:'#f9fafb', border:`1.5px solid ${BORDER}`, borderRadius:10,
        padding:'12px 14px', color: TEXT, fontSize:14, outline:'none', fontFamily:"'Inter',sans-serif" }}>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

export default function BuilderAddProperty({ onNavigate }) {
  const [form, setForm] = useState(INIT);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })); };
  const toggleAmenity = (a) => set('amenities', form.amenities.includes(a) ? form.amenities.filter(x=>x!==a) : [...form.amenities, a]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Required';
    if (!form.price.trim()) e.price = 'Required';
    if (!form.area.trim()) e.area = 'Required';
    if (!form.location.trim()) e.location = 'Required';
    if (!form.description.trim()) e.description = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    
    const newListing = {
      id: Date.now(),
      name: form.title,
      type: form.type,
      location: form.location,
      price: form.price,
      views: 0,
      leads: 0,
      status: form.status,
      posted: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };

    const saved = localStorage.getItem('builder_listings');
    const INIT_LISTINGS = [
      { id: 1, name: 'SN Clave – 3BHK Premium', type: 'Apartment', location: 'Patia, Bhubaneswar', price: '₹48 Lakhs', views: 621, leads: 14, status: 'Active',  posted: '12 Apr 2025' },
      { id: 2, name: 'Grand Arch – Villa',      type: 'Villa',      location: 'Nayapalli, BBSR',    price: '₹1.2 Cr',    views: 389, leads: 9,  status: 'Active',  posted: '01 Mar 2025' },
      { id: 3, name: 'Emerald Heights – 2BHK',  type: 'Apartment', location: 'Khandagiri, BBSR',   price: '₹32 Lakhs', views: 204, leads: 5,  status: 'Paused',  posted: '20 Feb 2025' },
      { id: 4, name: 'SN Clave – Plot 14A',     type: 'Plot',       location: 'Patia, Bhubaneswar', price: '₹18 Lakhs', views: 98,  leads: 3,  status: 'Active',  posted: '15 Jan 2025' },
      { id: 5, name: 'Sunrise Tower – 2BHK',    type: 'Apartment', location: 'Cuttack Road, BBSR', price: '₹27 Lakhs', views: 67,  leads: 1,  status: 'Pending', posted: '02 May 2025' }
    ];
    const currentListings = saved ? JSON.parse(saved) : INIT_LISTINGS;
    
    localStorage.setItem('builder_listings', JSON.stringify([newListing, ...currentListings]));

    setSubmitted(true);
  };

  // Inner components moved outside to prevent unmounting

  if (submitted) return (
    <div style={{ textAlign:'center', paddingTop:80 }}>
      <div style={{ fontSize:64, marginBottom:20 }}>🎉</div>
      <h2 style={{ color: TEXT, fontSize:26, fontWeight:700 }}>Listing Submitted!</h2>
      <p style={{ color: SUBTEXT, marginTop:10, fontSize:15 }}>Your property has been submitted for review and will go live within 24 hours.</p>
      <div style={{ marginTop:28, display:'flex', gap:12, justifyContent:'center' }}>
        <button onClick={() => { setForm(INIT); setSubmitted(false); }}
          style={{ background:`linear-gradient(135deg,${G},#b8902e)`, border:'none', borderRadius:10,
            padding:'12px 28px', color:'#fff', fontWeight:700, fontSize:14, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
          Add Another
        </button>
        <button onClick={() => onNavigate('listings')}
          style={{ background:'#f9fafb', border:`1px solid ${BORDER}`, borderRadius:10,
            padding:'12px 28px', color:'#374151', fontWeight:600, fontSize:14, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
          View Listings
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <style>{`
        .builder-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .builder-grid-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (max-width: 768px) {
          .builder-grid, .builder-grid-inner { grid-template-columns: 1fr; }
        }
      `}</style>
      <div style={{ marginBottom:28 }}>
        <h2 style={{ color: TEXT, fontSize:22, fontWeight:700 }}>Add New Property</h2>
        <p style={{ color: SUBTEXT, fontSize:14, marginTop:4 }}>Fill in the details below to list your property on Dwello.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="builder-grid">

          {/* Left column */}
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            <div style={{ background: CARD, border:`1px solid ${BORDER}`, borderRadius:16, padding:'24px', boxShadow:'0 1px 4px rgba(0,0,0,0.05)' }}>
              <h3 style={{ color: TEXT, fontSize:15, fontWeight:600, marginBottom:20 }}>📋 Basic Information</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
                <Field label="Property Title *" name="title" placeholder="e.g. SN Clave – 3BHK Luxury Apartment" form={form} set={set} errors={errors} />
                <div className="builder-grid-inner">
                  <Select label="Property Type" name="type" options={PROPERTY_TYPES} form={form} set={set} errors={errors} />
                  <Select label="Configuration" name="bhk" options={BHK_OPTIONS} form={form} set={set} errors={errors} />
                </div>
                <div className="builder-grid-inner">
                  <Field label="Price *" name="price" placeholder="e.g. ₹48,00,000" form={form} set={set} errors={errors} />
                  <Field label="Area (sq.ft) *" name="area" placeholder="e.g. 1250" form={form} set={set} errors={errors} />
                </div>
                <Select label="Status" name="status" options={['Active','Paused','Pending']} form={form} set={set} errors={errors} />
              </div>
            </div>

            <div style={{ background: CARD, border:`1px solid ${BORDER}`, borderRadius:16, padding:'24px', boxShadow:'0 1px 4px rgba(0,0,0,0.05)' }}>
              <h3 style={{ color: TEXT, fontSize:15, fontWeight:600, marginBottom:20 }}>📍 Location</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
                <Field label="Locality / Area *" name="location" placeholder="e.g. Patia, Nayapalli" form={form} set={set} errors={errors} />
                <Field label="City" name="city" placeholder="e.g. Bhubaneswar" form={form} set={set} errors={errors} />
              </div>
            </div>
          </div>

          {/* Right column */}
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            <div style={{ background: CARD, border:`1px solid ${BORDER}`, borderRadius:16, padding:'24px', boxShadow:'0 1px 4px rgba(0,0,0,0.05)' }}>
              <h3 style={{ color: TEXT, fontSize:15, fontWeight:600, marginBottom:20 }}>📝 Description</h3>
              <Field label="Property Description *" name="description" as="textarea"
                placeholder="Describe the property, its features, surroundings, USPs..." form={form} set={set} errors={errors} />
            </div>

            <div style={{ background: CARD, border:`1px solid ${BORDER}`, borderRadius:16, padding:'24px', boxShadow:'0 1px 4px rgba(0,0,0,0.05)' }}>
              <h3 style={{ color: TEXT, fontSize:15, fontWeight:600, marginBottom:16 }}>🏊 Amenities</h3>
              <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
                {AMENITY_LIST.map(a => {
                  const sel = form.amenities.includes(a);
                  return (
                    <button key={a} type="button" onClick={() => toggleAmenity(a)}
                      style={{ padding:'7px 14px', borderRadius:20, fontSize:13, fontWeight:500, cursor:'pointer',
                        fontFamily:"'Inter',sans-serif", border:`1.5px solid ${sel ? G : BORDER}`,
                        background: sel ? 'rgba(212,168,67,0.10)' : '#f9fafb',
                        color: sel ? '#92700a' : SUBTEXT }}>
                      {a}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ background: CARD, border:`1px solid ${BORDER}`, borderRadius:16, padding:'24px', boxShadow:'0 1px 4px rgba(0,0,0,0.05)' }}>
              <h3 style={{ color: TEXT, fontSize:15, fontWeight:600, marginBottom:16 }}>🖼️ Photos</h3>
              <div style={{ border:`2px dashed ${BORDER}`, borderRadius:12, padding:'32px', textAlign:'center' }}>
                <div style={{ fontSize:36, marginBottom:10 }}>📷</div>
                <p style={{ color: SUBTEXT, fontSize:14 }}>Drag & drop images or <span style={{ color: G, cursor:'pointer' }}>browse files</span></p>
                <p style={{ color:'#9ca3af', fontSize:12, marginTop:6 }}>PNG, JPG up to 10MB each · Max 10 images</p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div style={{ marginTop:24, display:'flex', gap:12 }}>
          <button type="submit"
            style={{ background:`linear-gradient(135deg,${G},#b8902e)`, border:'none', borderRadius:12,
              padding:'14px 36px', color:'#fff', fontWeight:700, fontSize:15, cursor:'pointer', fontFamily:"'Inter',sans-serif",
              boxShadow:'0 2px 8px rgba(212,168,67,0.3)' }}>
            🚀 Submit Listing
          </button>
          <button type="button" onClick={() => setForm(INIT)}
            style={{ background:'#f9fafb', border:`1px solid ${BORDER}`, borderRadius:12,
              padding:'14px 24px', color:'#374151', fontWeight:600, fontSize:14, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
