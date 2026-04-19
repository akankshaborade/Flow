// import { Link, useLocation, useNavigate } from 'react-router-dom';

// const navItems = [
//   { path: '/dashboard', label: 'Dashboard', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
//   { path: '/clients', label: 'Clients', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg> },
//   { path: '/projects', label: 'Projects & Tasks', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg> },
//   { path: '/payments', label: 'Payments', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg> },
//   { path: '/calendar', label: 'Calendar', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg> },
//   { path: '/settings', label: 'Settings', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg> },
// ];

// export default function Layout({ children }) {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('flow_user') || '{"name":"Jessica Doe","email":"jessica@example.com"}');

//   const handleLogout = () => {
//     localStorage.removeItem('flow_token');
//     localStorage.removeItem('flow_user');
//     navigate('/login');
//   };

//   return (
//     <div className="app-layout">
//       <aside className="sidebar">
//         <div className="sidebar-logo">
//           <div className="sidebar-logo-icon">F</div>
//           <div>
//             <div className="sidebar-logo-name">Flow</div>
//             <div className="sidebar-subtitle">Work Management</div>
//           </div>
//         </div>

//         <nav className="sidebar-nav">
//           {navItems.map(item => (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
//             >
//               {item.icon}
//               {item.label}
//             </Link>
//           ))}
//         </nav>

//         <div className="sidebar-bottom">
//           <div className="user-card">
//             <div className="user-avatar">{user.name?.[0] || 'U'}</div>
//             <div style={{ flex: 1, minWidth: 0 }}>
//               <div className="user-name" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</div>
//               <div className="user-email" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</div>
//             </div>
//             <button onClick={handleLogout} title="Logout" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 4 }}>
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
//             </button>
//           </div>
//         </div>
//       </aside>

//       <div className="main-content">{children}</div>
//     </div>
//   );
// }

/* ── Dark theme (default) ── */
:root {
  --bg: #0f172a;
  --bg-secondary: #0a0f1e;
  --card: #1e293b;
  --card-hover: #263348;
  --card-border: rgba(255, 255, 255, 0.06);
  --text-primary: #f1f5f9;
  --text-secondary: rgba(255, 255, 255, 0.45);
  --text-muted: rgba(255, 255, 255, 0.25);
  --accent: #6366f1;
  --accent-hover: #4f46e5;
  --accent-glow: rgba(99, 102, 241, 0.15);
  --input-bg: rgba(255, 255, 255, 0.05);
  --input-border: rgba(255, 255, 255, 0.1);
  --divider: rgba(255, 255, 255, 0.06);
  --sidebar-bg: #1e293b;
  --topbar-bg: #1e293b;
  --topbar-text: #f1f5f9;
  --modal-bg: #1e293b;
  --modal-text: #f1f5f9;
  --modal-input-bg: rgba(255, 255, 255, 0.06);
  --modal-input-border: rgba(255, 255, 255, 0.12);
  --modal-input-text: #f1f5f9;
  --modal-overlay: rgba(0, 0, 0, 0.7);
  --shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
  --danger: rgba(239, 68, 68, 0.08);
  --danger-border: rgba(239, 68, 68, 0.2);
  --danger-text: #fca5a5;
}

/* ── Light theme overrides ── */
html.light {
  --bg: #f1f5f9;
  --bg-secondary: #e8edf5;
  --card: #ffffff;
  --card-hover: #f8fafc;
  --card-border: rgba(0, 0, 0, 0.07);
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #94a3b8;
  --accent: #6366f1;
  --accent-hover: #4f46e5;
  --accent-glow: rgba(99, 102, 241, 0.1);
  --input-bg: #f8fafc;
  --input-border: #e2e8f0;
  --divider: #e2e8f0;
  --sidebar-bg: #ffffff;
  --topbar-bg: #ffffff;
  --topbar-text: #0f172a;
  --modal-bg: #ffffff;
  --modal-text: #0f172a;
  --modal-input-bg: #f8fafc;
  --modal-input-border: #e2e8f0;
  --modal-input-text: #0f172a;
  --modal-overlay: rgba(0, 0, 0, 0.4);
  --shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  --danger: rgba(239, 68, 68, 0.06);
  --danger-border: rgba(239, 68, 68, 0.25);
  --danger-text: #dc2626;
}

/* ── Base ── */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "DM Sans", sans-serif;
  background: var(--bg);
  color: var(--text-primary);
  transition: background 0.25s ease, color 0.25s ease;
}

/* ── Layout shell ── */
.layout {
  display: flex;
  min-height: 100vh;
}

/* ── Sidebar ── */
.sidebar {
  width: 240px;
  background: var(--sidebar-bg);
  min-height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--divider);
  transition: background 0.25s ease, border-color 0.25s ease;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.5rem 0.25rem 1.25rem;
  border-bottom: 1px solid var(--divider);
  margin-bottom: 1rem;
}

.sidebar-logo-icon {
  width: 36px;
  height: 36px;
  background: var(--accent);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 15px;
  color: #fff;
  flex-shrink: 0;
}

.sidebar-logo-name {
  font-size: 15px;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1;
}

.sidebar-logo-subtitle {
  font-size: 11px;
  color: var(--text-secondary);
  margin-top: 2px;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.15s ease;
  cursor: pointer;
}

.nav-item:hover {
  background: var(--accent-glow);
  color: var(--accent);
}

.nav-item.active {
  background: var(--accent-glow);
  color: var(--accent);
  font-weight: 600;
}

.sidebar-bottom {
  border-top: 1px solid var(--divider);
  padding-top: 1rem;
  margin-top: auto;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 10px;
  background: transparent;
  transition: background 0.15s;
}

.user-card:hover {
  background: var(--accent-glow);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}

.user-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-role {
  font-size: 11px;
  color: var(--text-secondary);
}

/* ── Main content ── */
.main-content {
  flex: 1;
  padding: 1.5rem;
  background: var(--bg);
  transition: background 0.25s ease;
  min-width: 0;
}

/* ── Generic card ── */
.card {
  background: var(--card);
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  border: 1px solid var(--card-border);
  transition: background 0.25s ease, border-color 0.25s ease;
}

/* ── Buttons ── */
button {
  font-family: "DM Sans", sans-serif;
}

.btn-primary {
  background: var(--accent);
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}

.btn-primary:hover {
  background: var(--accent-hover);
  transform: translateY(-1px);
}

/* ── Topbar (Calendar page uses this) ── */
.topbar {
  background: var(--topbar-bg) !important;
  color: var(--topbar-text) !important;
  border-bottom: 1px solid var(--divider) !important;
  transition: background 0.25s ease, border-color 0.25s ease;
}

.topbar * {
  color: var(--topbar-text) !important;
}

/* Calendar topbar specific — override any white bg */
.page-topbar,
.cal-topbar,
[class*="topbar"] {
  background: var(--topbar-bg) !important;
  color: var(--topbar-text) !important;
}

/* ── Auth pages (Login / Register) ── */
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  transition: background 0.25s ease;
}

.auth-glow {
  position: fixed;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse 60% 50% at 50% -10%,
    rgba(99, 102, 241, 0.15),
    transparent
  );
}

.auth-box {
  background: var(--card);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  padding: 2rem;
  width: 360px;
  box-shadow: var(--shadow);
  position: relative;
  z-index: 1;
  transition: background 0.25s ease, border-color 0.25s ease;
}

.auth-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1.5rem;
}

.auth-logo {
  width: 36px;
  height: 36px;
  background: var(--accent);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 800;
  color: #fff;
}

.auth-logo-text {
  font-size: 16px;
  font-weight: 800;
  color: var(--text-primary);
}

.auth-heading {
  font-size: 20px;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 4px;
}

.auth-sub {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0 0 1.25rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
}

.input,
.auth-box input[type="text"],
.auth-box input[type="email"],
.auth-box input[type="password"] {
  width: 100%;
  background: var(--input-bg);
  border: 1px solid var(--input-border);
  border-radius: 10px;
  padding: 11px 14px;
  font-size: 14px;
  color: var(--text-primary);
  font-family: "DM Sans", sans-serif;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.25s;
  box-sizing: border-box;
}

.input:focus,
.auth-box input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-glow);
}

.input::placeholder,
.auth-box input::placeholder {
  color: var(--text-muted);
}

.auth-row {
  display: flex;
  justify-content: flex-end;
}

.auth-link {
  font-size: 12px;
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
}

.auth-link:hover {
  text-decoration: underline;
}

.btn-primary.auth-submit {
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border-radius: 10px;
  margin-top: 4px;
}

.auth-footer {
  text-align: center;
  margin-top: 1rem;
  font-size: 13px;
  color: var(--text-secondary);
}

.alert {
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
}

.alert-error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.25);
  color: #f87171;
}

.alert-success {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.25);
  color: #4ade80;
}

html.light .alert-success {
  color: #16a34a;
}

html.light .alert-error {
  color: #dc2626;
}

/* ── Modal (Calendar Add Event) ── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: var(--modal-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  backdrop-filter: blur(4px);
}

.modal {
  background: var(--modal-bg) !important;
  color: var(--modal-text) !important;
  border: 1px solid var(--card-border);
  border-radius: 16px;
  padding: 28px;
  width: 100%;
  max-width: 460px;
  box-shadow: var(--shadow);
  transition: background 0.25s ease;
}

.modal * {
  color: var(--modal-text) !important;
}

.modal input,
.modal select,
.modal textarea {
  background: var(--modal-input-bg) !important;
  border: 1px solid var(--modal-input-border) !important;
  color: var(--modal-input-text) !important;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  width: 100%;
  outline: none;
  font-family: "DM Sans", sans-serif;
  transition: border-color 0.2s, background 0.25s;
}

.modal input:focus,
.modal select:focus {
  border-color: var(--accent) !important;
  box-shadow: 0 0 0 3px var(--accent-glow);
}

.modal input::placeholder {
  color: var(--text-muted) !important;
}

.modal-title {
  font-size: 17px;
  font-weight: 700;
  margin: 0 0 20px;
  color: var(--modal-text) !important;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.btn-ghost {
  background: transparent;
  border: 1px solid var(--input-border);
  border-radius: 8px;
  padding: 9px 18px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary) !important;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-ghost:hover {
  background: var(--accent-glow);
  border-color: var(--accent);
  color: var(--accent) !important;
}

/* ── App-input (used in Calendar modal) ── */
.app-input {
  background: var(--modal-input-bg) !important;
  border: 1px solid var(--modal-input-border) !important;
  color: var(--modal-input-text) !important;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  font-family: "DM Sans", sans-serif;
}

.app-select {
  background: var(--modal-input-bg) !important;
  border: 1px solid var(--modal-input-border) !important;
  color: var(--modal-input-text) !important;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  font-family: "DM Sans", sans-serif;
  cursor: pointer;
}

/* ── Settings page cards ── */
.settings-card {
  background: var(--card) !important;
  border: 1px solid var(--card-border) !important;
  border-radius: 16px;
  padding: 28px;
  margin-bottom: 20px;
  transition: background 0.25s ease, border-color 0.25s ease;
}

.settings-input {
  width: 100%;
  background: var(--input-bg) !important;
  border: 1px solid var(--input-border) !important;
  border-radius: 10px;
  padding: 11px 14px;
  font-size: 14px;
  color: var(--text-primary) !important;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.25s;
  font-family: "DM Sans", sans-serif;
}

.settings-input:focus {
  border-color: var(--accent) !important;
  box-shadow: 0 0 0 3px var(--accent-glow);
}

.settings-input::placeholder {
  color: var(--text-muted) !important;
}

.settings-select {
  width: 100%;
  background: var(--input-bg) !important;
  border: 1px solid var(--input-border) !important;
  border-radius: 10px;
  padding: 11px 14px;
  font-size: 14px;
  color: var(--text-primary) !important;
  outline: none;
  box-sizing: border-box;
  cursor: pointer;
  appearance: none;
  font-family: "DM Sans", sans-serif;
  transition: background 0.25s, border-color 0.2s;
}

.settings-select option {
  background: var(--card);
  color: var(--text-primary);
}

.settings-select:focus {
  border-color: var(--accent) !important;
  box-shadow: 0 0 0 3px var(--accent-glow);
}

/* ── Dashboard stat cards ── */
.stat-card {
  background: var(--card) !important;
  border: 1px solid var(--card-border) !important;
  border-radius: 16px;
  padding: 20px;
  transition: background 0.25s ease, border-color 0.25s ease, transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px var(--accent-glow);
}

.stat-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted) !important;
}

.stat-value {
  font-size: 26px;
  font-weight: 800;
  color: var(--text-primary) !important;
  line-height: 1.1;
}

.stat-sub {
  font-size: 11px;
  color: var(--text-secondary) !important;
  margin-top: 2px;
}

/* ── Section card (Dashboard sections) ── */
.section-card {
  background: var(--card) !important;
  border: 1px solid var(--card-border) !important;
  border-radius: 16px;
  padding: 20px 22px;
  transition: background 0.25s ease, border-color 0.25s ease;
}

.section-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary) !important;
}

/* ── Calendar ── */
.calendar-container {
  background: var(--card) !important;
  border: 1px solid var(--card-border) !important;
  border-radius: 16px;
  transition: background 0.25s ease;
}

.calendar-day {
  color: var(--text-primary) !important;
}

.calendar-header-day {
  color: var(--text-muted) !important;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ── Recharts (charts) ── */
.recharts-text,
.recharts-cartesian-axis-tick-value {
  fill: var(--text-secondary) !important;
}

.recharts-cartesian-grid line {
  stroke: var(--divider) !important;
}

/* ── Spinner ── */
.spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ── Scrollbar ── */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--divider); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--text-muted); }