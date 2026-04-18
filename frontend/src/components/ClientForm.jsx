import { useState, useEffect, useRef } from 'react';

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  padding: '10px 14px',
  fontSize: 13,
  color: '#e8e8f8',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  boxSizing: 'border-box',
};

const labelStyle = {
  display: 'block',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.07em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.4)',
  marginBottom: 6,
};

export default function ClientForm({ initial, onSubmit, onClose, loading }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' });
  const [focused, setFocused] = useState('');
  const firstRef = useRef(null);

  useEffect(() => {
    if (initial) setForm({ name: initial.name || '', email: initial.email || '', phone: initial.phone || '', notes: initial.notes || '' });
    setTimeout(() => firstRef.current?.focus(), 80);
  }, [initial]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    onSubmit(form);
  };

  const focusStyle = (field) => focused === field
    ? { borderColor: 'rgba(99,180,255,0.6)', boxShadow: '0 0 0 3px rgba(99,180,255,0.1)' }
    : {};

  return (
    // Backdrop
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
        animation: 'fadeIn 0.15s ease',
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
        .cf-input:focus { border-color: rgba(99,180,255,0.6) !important; box-shadow: 0 0 0 3px rgba(99,180,255,0.1) !important; }
        .cf-input::placeholder { color: rgba(255,255,255,0.2); }
        .cf-input { caret-color: #63b4ff; }
      `}</style>

      {/* Modal box */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 460,
          background: 'linear-gradient(145deg, #161625 0%, #111120 100%)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: 18,
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
          padding: '28px 28px 24px',
          animation: 'slideUp 0.2s ease',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: '#f0f0ff' }}>
              {initial ? '✏️ Edit Client' : '✨ New Client'}
            </h2>
            <p style={{ margin: '3px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
              {initial ? 'Update client details below' : 'Fill in the details to add a client'}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.06)', border: 'none',
              color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
              width: 32, height: 32, borderRadius: 8, fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s, color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
          >×</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={labelStyle}>Name *</label>
              <input
                ref={firstRef}
                className="cf-input"
                style={{ ...inputStyle, ...focusStyle('name') }}
                name="name" type="text" placeholder="Alex Johnson"
                value={form.name} onChange={handleChange}
                onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
                required
              />
            </div>
            <div>
              <label style={labelStyle}>Email *</label>
              <input
                className="cf-input"
                style={{ ...inputStyle, ...focusStyle('email') }}
                name="email" type="email" placeholder="alex@company.com"
                value={form.email} onChange={handleChange}
                onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                required
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Phone</label>
            <input
              className="cf-input"
              style={{ ...inputStyle, ...focusStyle('phone') }}
              name="phone" type="tel" placeholder="+91 98765 43210"
              value={form.phone} onChange={handleChange}
              onFocus={() => setFocused('phone')} onBlur={() => setFocused('')}
            />
          </div>

          <div>
            <label style={labelStyle}>Notes <span style={{ opacity: 0.5, fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
            <textarea
              className="cf-input"
              style={{ ...inputStyle, resize: 'vertical', minHeight: 80, fontFamily: 'inherit', lineHeight: 1.5, ...focusStyle('notes') }}
              name="notes" placeholder="Any relevant details about this client..."
              value={form.notes} onChange={handleChange}
              onFocus={() => setFocused('notes')} onBlur={() => setFocused('')}
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10, marginTop: 4, justifyContent: 'flex-end' }}>
            <button
              type="button" onClick={onClose}
              style={{
                padding: '9px 18px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)',
                background: 'transparent', color: 'rgba(255,255,255,0.55)',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >Cancel</button>
            <button
              type="submit" disabled={loading || !form.name.trim() || !form.email.trim()}
              style={{
                padding: '9px 22px', borderRadius: 10, border: 'none',
                background: loading ? 'rgba(99,180,255,0.4)' : 'linear-gradient(135deg, #63b4ff 0%, #a78bfa 100%)',
                color: '#fff', fontSize: 13, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'opacity 0.15s, transform 0.15s',
                display: 'flex', alignItems: 'center', gap: 8,
                opacity: !form.name.trim() || !form.email.trim() ? 0.5 : 1,
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {loading
                ? <><Spinner size={13} /> Saving…</>
                : initial ? 'Save Changes' : 'Add Client'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Spinner({ size = 14 }) {
  return (
    <span style={{
      display: 'inline-block', width: size, height: size,
      border: `2px solid rgba(255,255,255,0.25)`,
      borderTopColor: '#fff', borderRadius: '50%',
      animation: 'spin 0.7s linear infinite',
      flexShrink: 0,
    }} />
  );
}