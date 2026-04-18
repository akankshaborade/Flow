import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../api/api';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const justRegistered = location.state?.registered;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await loginUser(form);

console.log("LOGIN RESPONSE:", res.data); // debug

if (res.data.token) {
  login(res.data.token, res.data.user);
  navigate('/dashboard');
} else {
  setError(res.data.message || 'Invalid credentials');
}
    } catch {
      setError('Network error. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-glow" />
      <div className="auth-box">
        <div className="auth-brand">
          <span className="auth-logo">F</span>
          <span className="auth-logo-text">Flow</span>
        </div>
        <h1 className="auth-heading">Welcome back</h1>
        <p className="auth-sub">Sign in to your workspace</p>

        {justRegistered && (
          <div className="alert alert-success">Account created! Sign in to continue.</div>
        )}
        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              className="input"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              className="input"
              name="password"
              type="password"
              placeholder="Your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="auth-row">
            <Link to="/forgot-password" className="auth-link">Forgot password?</Link>
          </div>
          <button className="btn btn-primary auth-submit" type="submit" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Sign In'}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}