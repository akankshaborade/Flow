import { useState, useEffect, useRef } from 'react';

const iStyle = {
  width: '100%', background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10,
  padding: '10px 14px', fontSize: 13, color: '#e8e8f8',
  outline: 'none', transition: 'border-color 0.2s,box-shadow 0.2s',
  boxSizing: 'border-box', fontFamily: 'inherit',
};
const lStyle = {
  display: 'block', fontSize: 11, fontWeight: 700,
  letterSpacing: '0.07em', textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.4)', marginBottom: 6,
};

function Spinner({ size = 14 }) {
  return <span style={{ display: 'inline-block', width: size, height: size, border: '2px solid rgba(255,255,255,0.25)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', flexShrink: 0 }} />;
}

// ── EMPTY form includes ALL 5 fields ─────────────────────────────────────────
const EMPTY = { name: '', email: '', phone: '', company: '', notes: '' };

export default function ClientForm({ initial, onSubmit, onClose, loading }) {
  const [form, setForm] = useState(EMPTY);
  const firstRef = useRef(null);

  useEffect(() => {
    // Populate all fields including company when editing
    setForm(initial ? {
      name:    initial.name    || '',
      email:   initial.email   || '',
      phone:   initial.phone   || '',
      company: initial.company || '',
      notes:   initial.notes   || '',
    } : EMPTY);
    setTimeout(() => firstRef.current?.focus(), 80);
  }, [initial]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onFocus  = (e) => { e.target.style.borderColor = 'rgba(99,180,255,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(99,180,255,0.1)'; };
  const onBlur   = (e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    // Send ALL 5 fields explicitly — nothing dropped
    onSubmit({
      name:    form.name.trim(),
      email:   form.email.trim(),
      phone:   form.phone.trim(),
      company: form.company.trim(),
      notes:   form.notes.trim(),
    });
  };

  const canSubmit = form.name.trim() && form.email.trim();

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <style>{`
        @keyframes slideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin    { to{transform:rotate(360deg)} }
        .cf-input::placeholder { color: rgba(255,255,255,0.2); }
        .cf-input { caret-color: #63b4ff; }
      `}</style>

      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 480, background: 'linear-gradient(145deg,#161625 0%,#111120 100%)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 18, boxShadow: '0 24px 80px rgba(0,0,0,0.5)', padding: '28px 28px 24px', animation: 'slideUp 0.2s ease' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: '#f0f0ff' }}>{initial ? '✏️ Edit Client' : '✨ New Client'}</h2>
            <p style={{ margin: '3px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{initial ? 'Update client details below' : 'Fill in the details to add a client'}</p>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', width: 32, height: 32, borderRadius: 8, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}>×</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Row 1: Name + Email */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={lStyle}>Name *</label>
              <input ref={firstRef} className="cf-input" style={iStyle} name="name" type="text" placeholder="Alex Johnson" value={form.name} onChange={onChange} onFocus={onFocus} onBlur={onBlur} required />
            </div>
            <div>
              <label style={lStyle}>Email *</label>
              <input className="cf-input" style={iStyle} name="email" type="email" placeholder="alex@company.com" value={form.email} onChange={onChange} onFocus={onFocus} onBlur={onBlur} required />
            </div>
          </div>

          {/* Row 2: Phone + Company (was missing Company entirely) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={lStyle}>Phone</label>
              <input className="cf-input" style={iStyle} name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={onChange} onFocus={onFocus} onBlur={onBlur} />
            </div>
            <div>
              <label style={lStyle}>Company</label>
              <input className="cf-input" style={iStyle} name="company" type="text" placeholder="Acme Inc." value={form.company} onChange={onChange} onFocus={onFocus} onBlur={onBlur} />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label style={lStyle}>Notes <span style={{ opacity: 0.5, fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
            <textarea className="cf-input" style={{ ...iStyle, resize: 'vertical', minHeight: 72, lineHeight: 1.5 }} name="notes" placeholder="Any relevant details…" value={form.notes} onChange={onChange} onFocus={onFocus} onBlur={onBlur} />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10, marginTop: 4, justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose}
              style={{ padding: '9px 18px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.55)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              Cancel
            </button>
            <button type="submit" disabled={loading || !canSubmit}
              style={{ padding: '9px 22px', borderRadius: 10, border: 'none', background: loading ? 'rgba(99,180,255,0.4)' : 'linear-gradient(135deg,#63b4ff 0%,#a78bfa 100%)', color: '#fff', fontSize: 13, fontWeight: 700, cursor: loading || !canSubmit ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 8, opacity: !canSubmit ? 0.5 : 1 }}
              onMouseEnter={e => { if (!loading && canSubmit) e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              {loading ? <><Spinner size={13} />Saving…</> : initial ? 'Save Changes' : 'Add Client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}