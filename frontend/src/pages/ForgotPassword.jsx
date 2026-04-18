import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/flow.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-left">
        <div className="auth-logo">
          <div className="auth-logo-icon">F</div>
          <span className="auth-logo-name">Flow</span>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 380 }}>
          {!sent ? (
            <>
              <div style={{ width: 52, height: 52, background: 'var(--blue-light)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              </div>
              <h1 className="auth-title">Forgot password?</h1>
              <p className="auth-subtitle" style={{ marginBottom: 32 }}>No worries, we'll send you reset instructions.</p>

              {error && (
                <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 20 }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <div className="input-wrap">
                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <input className="form-input" type="email" placeholder="enter your email" value={email}
                      onChange={e => setEmail(e.target.value)} required />
                  </div>
                </div>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Sending...' : 'Send reset instructions'}
                </button>
              </form>

              <div className="auth-footer" style={{ marginTop: 20 }}>
                <Link to="/login" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                  Back to login
                </Link>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, background: 'var(--green-light)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h1 className="auth-title">Check your email</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 8, marginBottom: 8 }}>
                We sent a password reset link to
              </p>
              <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 28 }}>{email}</p>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 28 }}>
                Didn't receive the email? Check your spam folder or{' '}
                <button onClick={() => setSent(false)} style={{ background: 'none', border: 'none', color: 'var(--blue)', cursor: 'pointer', fontWeight: 600, fontSize: 13, fontFamily: 'var(--font)' }}>
                  try again
                </button>
              </p>
              <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                Back to login
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="auth-right">
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <h2 style={{ fontSize: 30, fontWeight: 700, color: '#0f172a', lineHeight: 1.35 }}>
            Secure access to<br />your <span style={{ color: 'var(--blue)' }}>Flow workspace.</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: 14, marginTop: 12 }}>
            We take your account security seriously.
          </p>
        </div>
      </div>
    </div>
  );
}