import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/api';
import './Auth.css';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const res = await registerUser({ name: form.name, email: form.email, password: form.password });
      if (res.message === 'User registered successfully') {
        navigate('/login', { state: { registered: true } });
      } else {
        setError(res.message || 'Registration failed');
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
        <h1 className="auth-heading">Create your account</h1>
        <p className="auth-sub">Start managing clients, projects & payments</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input
              className="input"
              name="name"
              type="text"
              placeholder="Alex Johnson"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
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
              placeholder="Min 6 characters"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label">Confirm Password</label>
            <input
              className="input"
              name="confirm"
              type="password"
              placeholder="Repeat password"
              value={form.confirm}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn btn-primary auth-submit" type="submit" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Create Account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}