// // import React from "react";

// // const Settings = () => {
// //   return (
// //     <div className="p-8 max-w-4xl mx-auto">
// //       <h1 className="text-2xl font-bold mb-6 text-gray-800">Settings</h1>

// //       {/* Profile Section */}
// //       <div className="bg-white p-6 rounded-lg shadow border border-gray-200 mb-6">
// //         <h2 className="text-lg font-semibold text-gray-800 mb-4">Profile Information</h2>
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //           <div>
// //             <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
// //             <input 
// //               type="text" 
// //               defaultValue="Arya" 
// //               className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500 outline-none"
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
// //             <input 
// //               type="email" 
// //               defaultValue="admin_arya@flow.com" 
// //               disabled
// //               className="w-full p-2 border border-gray-200 bg-gray-50 text-gray-500 rounded cursor-not-allowed"
// //             />
// //           </div>
// //         </div>
// //         <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition">
// //           Save Changes
// //         </button>
// //       </div>

// //       {/* Preferences Section */}
// //       <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
// //         <h2 className="text-lg font-semibold text-gray-800 mb-4">App Preferences</h2>
        
// //         <div className="flex items-center justify-between py-3 border-b border-gray-100">
// //           <div>
// //             <p className="font-medium text-gray-800">Email Notifications</p>
// //             <p className="text-sm text-gray-500">Receive alerts when tasks are due or payments are made.</p>
// //           </div>
// //           <label className="relative inline-flex items-center cursor-pointer">
// //             <input type="checkbox" className="sr-only peer" defaultChecked />
// //             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
// //           </label>
// //         </div>

// //         <div className="flex items-center justify-between py-3">
// //           <div>
// //             <p className="font-medium text-gray-800">Dark Mode (Demo)</p>
// //             <p className="text-sm text-gray-500">Toggle application appearance.</p>
// //           </div>
// //           <label className="relative inline-flex items-center cursor-pointer">
// //             <input type="checkbox" className="sr-only peer" />
// //             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
// //           </label>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Settings;

// //NEW SETTINGS PAGE
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Layout from "../components/Layout";
// import { useAuth } from "../context/AuthContext";
// import { useTheme } from "../context/ThemeContext";

// export default function Settings() {
//   const { user, logout } = useAuth();
//   const { theme, toggleTheme } = useTheme();
//   const navigate = useNavigate(); 

//   const [profile, setProfile] = useState({
//     name: user?.name || "",
//     email: user?.email || "",
//     role: "Freelancer",
//     currency: "USD",
//   });

//   const [saved, setSaved] = useState(false);
//   const [activeSection, setActiveSection] = useState(null);

//   const currencies = [
//     { code: "USD", label: "USD - US Dollar" },
//     { code: "EUR", label: "EUR - Euro" },
//     { code: "GBP", label: "GBP - British Pound" },
//     { code: "INR", label: "INR - Indian Rupee" },
//     { code: "AUD", label: "AUD - Australian Dollar" },
//     { code: "CAD", label: "CAD - Canadian Dollar" },
//     { code: "JPY", label: "JPY - Japanese Yen" },
//   ];

//   const roles = ["Freelancer", "Agency", "Consultant", "Designer", "Developer", "Manager"];

//   const handleProfileChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   const handleSave = (e) => {
//     e.preventDefault();
//     setSaved(true);
//     setTimeout(() => setSaved(false), 2500);
//   };

//   const inputStyle = {
//     width: "100%",
//     background: "rgba(255,255,255,0.05)",
//     border: "1px solid rgba(255,255,255,0.1)",
//     borderRadius: 10,
//     padding: "11px 14px",
//     fontSize: 14,
//     color: "#f1f5f9",
//     outline: "none",
//     boxSizing: "border-box",
//     transition: "border-color 0.2s, box-shadow 0.2s",
//     fontFamily: "inherit",
//   };

//   const focusStyle = (field) =>
//     activeSection === field
//       ? { borderColor: "#6366f1", boxShadow: "0 0 0 3px rgba(99,102,241,0.15)" }
//       : {};

//   const labelStyle = {
//     display: "block",
//     fontSize: 11,
//     fontWeight: 700,
//     letterSpacing: "0.07em",
//     textTransform: "uppercase",
//     color: "rgba(255,255,255,0.45)",
//     marginBottom: 7,
//   };

//   const cardStyle = {
//     background: "#1e293b",
//     borderRadius: 16,
//     padding: "28px 28px",
//     marginBottom: 20,
//     border: "1px solid rgba(255,255,255,0.06)",
//   };

//   const sectionIconStyle = {
//     width: 40,
//     height: 40,
//     borderRadius: 12,
//     background: "rgba(99,102,241,0.12)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 14,
//     flexShrink: 0,
//   };

//   const sectionHeaderStyle = {
//     display: "flex",
//     alignItems: "center",
//     marginBottom: 24,
//   };

//   return (
//     <Layout>
//       <style>{`
//         .settings-select option {
//           background: #1e293b;
//           color: #f1f5f9;
//         }
//         .settings-select:focus {
//           border-color: #6366f1 !important;
//           box-shadow: 0 0 0 3px rgba(99,102,241,0.15) !important;
//         }
//         .save-btn:hover:not(:disabled) {
//           background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%) !important;
//           transform: translateY(-1px);
//           box-shadow: 0 4px 20px rgba(99,102,241,0.4);
//         }
//         .save-btn:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }
//         .theme-card {
//           cursor: pointer;
//           transition: all 0.2s;
//         }
//         .theme-card:hover {
//           border-color: rgba(99,102,241,0.5) !important;
//         }
//         .danger-btn:hover {
//           background: rgba(239,68,68,0.12) !important;
//           border-color: rgba(239,68,68,0.4) !important;
//           color: #f87171 !important;
//         }
//         @keyframes slideIn {
//           from { opacity: 0; transform: translateY(-8px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .toast {
//           animation: slideIn 0.25s ease;
//         }
//       `}</style>

//       <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 0" }}>
//         {/* Header */}
//         <div style={{ marginBottom: 28 }}>
//           <h1 style={{ fontSize: 26, fontWeight: 800, color: "#f1f5f9", margin: 0 }}>
//             Settings
//           </h1>
//           <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: "6px 0 0" }}>
//             Manage your account and preferences
//           </p>
//         </div>

//         {/* Toast */}
//         {saved && (
//           <div
//             className="toast"
//             style={{
//               background: "rgba(34,197,94,0.12)",
//               border: "1px solid rgba(34,197,94,0.3)",
//               color: "#4ade80",
//               borderRadius: 10,
//               padding: "12px 18px",
//               marginBottom: 20,
//               fontSize: 13,
//               fontWeight: 600,
//               display: "flex",
//               alignItems: "center",
//               gap: 8,
//             }}
//           >
//             ✓ Changes saved successfully
//           </div>
//         )}

//         {/* ── Profile Information ── */}
//         <div style={cardStyle}>
//           <div style={sectionHeaderStyle}>
//             <div style={sectionIconStyle}>
//               <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#6366f1" strokeWidth="2">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//               </svg>
//             </div>
//             <div>
//               <div style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9" }}>Profile Information</div>
//               <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>Update your personal details</div>
//             </div>
//           </div>

//           <form onSubmit={handleSave}>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
//               <div>
//                 <label style={labelStyle}>Full Name</label>
//                 <input
//                   name="name"
//                   value={profile.name}
//                   onChange={handleProfileChange}
//                   onFocus={() => setActiveSection("name")}
//                   onBlur={() => setActiveSection(null)}
//                   placeholder="Jessica Doe"
//                   style={{ ...inputStyle, ...focusStyle("name") }}
//                 />
//               </div>
//               <div>
//                 <label style={labelStyle}>Email</label>
//                 <input
//                   name="email"
//                   type="email"
//                   value={profile.email}
//                   onChange={handleProfileChange}
//                   onFocus={() => setActiveSection("email")}
//                   onBlur={() => setActiveSection(null)}
//                   placeholder="you@example.com"
//                   style={{ ...inputStyle, ...focusStyle("email") }}
//                 />
//               </div>
//             </div>

//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
//               <div>
//                 <label style={labelStyle}>Role</label>
//                 <select
//                   name="role"
//                   value={profile.role}
//                   onChange={handleProfileChange}
//                   className="settings-select"
//                   style={{ ...inputStyle, cursor: "pointer", appearance: "none",
//                     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
//                     backgroundRepeat: "no-repeat",
//                     backgroundPosition: "right 14px center",
//                   }}
//                 >
//                   {roles.map((r) => <option key={r} value={r}>{r}</option>)}
//                 </select>
//               </div>
//               <div>
//                 <label style={labelStyle}>Currency</label>
//                 <select
//                   name="currency"
//                   value={profile.currency}
//                   onChange={handleProfileChange}
//                   className="settings-select"
//                   style={{ ...inputStyle, cursor: "pointer", appearance: "none",
//                     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
//                     backgroundRepeat: "no-repeat",
//                     backgroundPosition: "right 14px center",
//                   }}
//                 >
//                   {currencies.map((c) => <option key={c.code} value={c.code}>{c.label}</option>)}
//                 </select>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="save-btn"
//               style={{
//                 background: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
//                 border: "none",
//                 borderRadius: 10,
//                 padding: "11px 24px",
//                 color: "#fff",
//                 fontSize: 13,
//                 fontWeight: 700,
//                 cursor: "pointer",
//                 transition: "all 0.2s",
//                 fontFamily: "inherit",
//               }}
//             >
//               Save Changes
//             </button>
//           </form>
//         </div>

//         {/* ── Appearance ── */}
//         <div style={cardStyle}>
//           <div style={sectionHeaderStyle}>
//             <div style={sectionIconStyle}>
//               <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#6366f1" strokeWidth="2">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
//               </svg>
//             </div>
//             <div>
//               <div style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9" }}>Appearance</div>
//               <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>Customize your workspace</div>
//             </div>
//           </div>

//           <label style={{ ...labelStyle, marginBottom: 12 }}>Theme</label>
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
//             {/* Light theme card */}
//             <div
//               className="theme-card"
//               onClick={toggleTheme} 
//               style={{
//                 border: theme === "light"
//                   ? "2px solid #6366f1"
//                   : "2px solid rgba(255,255,255,0.08)",
//                 borderRadius: 12,
//                 overflow: "hidden",
//                 position: "relative",
//               }}
//             >
//               {/* Preview */}
//               <div style={{ background: "#f8fafc", padding: "14px 14px 10px", height: 64 }}>
//                 <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
//                   <div style={{ width: 36, height: 6, borderRadius: 4, background: "#e2e8f0" }} />
//                   <div style={{ width: 24, height: 6, borderRadius: 4, background: "#e2e8f0" }} />
//                 </div>
//                 <div style={{ display: "flex", gap: 6 }}>
//                   <div style={{ width: 52, height: 28, borderRadius: 6, background: "#fff", border: "1px solid #e2e8f0" }} />
//                   <div style={{ width: 52, height: 28, borderRadius: 6, background: "#fff", border: "1px solid #e2e8f0" }} />
//                 </div>
//               </div>
//               <div style={{ background: "rgba(255,255,255,0.04)", padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                 <span style={{ fontSize: 12, fontWeight: 600, color: "#f1f5f9" }}>Light</span>
//                 {theme === "light" && (
//                   <span style={{ fontSize: 11, color: "#6366f1", fontWeight: 700 }}>Active</span>
//                 )}
//               </div>
//             </div>

//             {/* Dark theme card */}
//             <div
//               className="theme-card"
//               onClick={toggleTheme}
//               style={{
//                 border: theme === "dark"
//                   ? "2px solid #6366f1"
//                   : "2px solid rgba(255,255,255,0.08)",
//                 borderRadius: 12,
//                 overflow: "hidden",
//                 position: "relative",
//               }}
//             >
//               {/* Preview */}
//               <div style={{ background: "#0f172a", padding: "14px 14px 10px", height: 64 }}>
//                 <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
//                   <div style={{ width: 36, height: 6, borderRadius: 4, background: "#1e293b" }} />
//                   <div style={{ width: 24, height: 6, borderRadius: 4, background: "#1e293b" }} />
//                 </div>
//                 <div style={{ display: "flex", gap: 6 }}>
//                   <div style={{ width: 52, height: 28, borderRadius: 6, background: "#1e293b", border: "1px solid rgba(255,255,255,0.06)" }} />
//                   <div style={{ width: 52, height: 28, borderRadius: 6, background: "#1e293b", border: "1px solid rgba(255,255,255,0.06)" }} />
//                 </div>
//               </div>
//               <div style={{ background: "rgba(255,255,255,0.04)", padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                 <span style={{ fontSize: 12, fontWeight: 600, color: "#f1f5f9" }}>Dark</span>
//                 {theme === "dark" && (
//                   <span style={{ fontSize: 11, color: "#6366f1", fontWeight: 700 }}>Active</span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ── Notifications ── */}
//         <div style={cardStyle}>
//           <div style={sectionHeaderStyle}>
//             <div style={sectionIconStyle}>
//               <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#6366f1" strokeWidth="2">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//               </svg>
//             </div>
//             <div>
//               <div style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9" }}>Notifications</div>
//               <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>Control what alerts you receive</div>
//             </div>
//           </div>

//           {[
//             { id: "email_notif", label: "Email Notifications", desc: "Receive alerts when tasks are due or payments are made" },
//             { id: "task_reminders", label: "Task Reminders", desc: "Get reminded about upcoming task deadlines" },
//             { id: "payment_alerts", label: "Payment Alerts", desc: "Notify when a project payment status changes" },
//           ].map((item, i) => (
//             <NotifRow key={item.id} {...item} defaultChecked={i === 0} />
//           ))}
//         </div>

//         {/* ── Account ── */}
//         <div style={cardStyle}>
//           <div style={sectionHeaderStyle}>
//             <div style={sectionIconStyle}>
//               <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#6366f1" strokeWidth="2">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//               </svg>
//             </div>
//             <div>
//               <div style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9" }}>Account</div>
//               <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>Manage your session and data</div>
//             </div>
//           </div>

//           <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
//             <button
//               className="danger-btn"
//               onClick={() => { logout(); navigate("/login"); }}                  
//               style={{
//                 background: "rgba(239,68,68,0.07)",
//                 border: "1px solid rgba(239,68,68,0.2)",
//                 borderRadius: 10,
//                 padding: "10px 20px",
//                 color: "#fca5a5",
//                 fontSize: 13,
//                 fontWeight: 600,
//                 cursor: "pointer",
//                 transition: "all 0.2s",
//                 fontFamily: "inherit",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 8,
//               }}
//             >
//               <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//               </svg>
//               Sign Out
//             </button>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// // ── Notification toggle row ──────────────────────────────────────
// function NotifRow({ id, label, desc, defaultChecked }) {
//   const [checked, setChecked] = useState(defaultChecked);

//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         padding: "14px 0",
//         borderBottom: "1px solid rgba(255,255,255,0.05)",
//       }}
//     >
//       <div>
//         <div style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9" }}>{label}</div>
//         <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 3 }}>{desc}</div>
//       </div>
//       <button
//         onClick={() => setChecked(!checked)}
//         style={{
//           width: 44,
//           height: 24,
//           borderRadius: 12,
//           border: "none",
//           background: checked ? "#6366f1" : "rgba(255,255,255,0.1)",
//           cursor: "pointer",
//           position: "relative",
//           transition: "background 0.2s",
//           flexShrink: 0,
//           marginLeft: 20,
//         }}
//       >
//         <span
//           style={{
//             position: "absolute",
//             top: 3,
//             left: checked ? 23 : 3,
//             width: 18,
//             height: 18,
//             borderRadius: "50%",
//             background: "#fff",
//             transition: "left 0.2s",
//             boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
//           }}
//         />
//       </button>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Settings() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: "Freelancer",
    currency: "INR",
  });

  const [saved, setSaved] = useState(false);

  const currencies = [
    { code: "USD", label: "USD - US Dollar" },
    { code: "EUR", label: "EUR - Euro" },
    { code: "GBP", label: "GBP - British Pound" },
    { code: "INR", label: "INR - Indian Rupee" },
    { code: "AUD", label: "AUD - Australian Dollar" },
    { code: "CAD", label: "CAD - Canadian Dollar" },
    { code: "JPY", label: "JPY - Japanese Yen" },
  ];

  const roles = ["Freelancer", "Agency", "Consultant", "Designer", "Developer", "Manager"];

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <Layout>
      <style>{`
        .settings-page { max-width: 760px; margin: 0 auto; padding: 24px 0; }

        .settings-page-title { font-size: 26px; font-weight: 800; color: var(--text-primary); margin: 0; }
        .settings-page-sub { font-size: 13px; color: var(--text-secondary); margin: 6px 0 0; }

        .settings-section-icon {
          width: 40px; height: 40px; border-radius: 12px;
          background: var(--accent-glow);
          display: flex; align-items: center; justify-content: center;
          margin-right: 14px; flex-shrink: 0;
        }
        .settings-section-header { display: flex; align-items: center; margin-bottom: 24px; }
        .settings-section-title { font-size: 15px; font-weight: 700; color: var(--text-primary); }
        .settings-section-sub { font-size: 12px; color: var(--text-secondary); margin-top: 2px; }

        .settings-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
        .settings-field label {
          display: block; font-size: 11px; font-weight: 700;
          letter-spacing: 0.07em; text-transform: uppercase;
          color: var(--text-secondary); margin-bottom: 7px;
        }
        .settings-select-wrap { position: relative; }
        .settings-select-wrap::after {
          content: ''; position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%); width: 0; height: 0;
          border-left: 4px solid transparent; border-right: 4px solid transparent;
          border-top: 5px solid var(--text-secondary); pointer-events: none;
        }

        .save-btn {
          background: linear-gradient(135deg, var(--accent) 0%, #818cf8 100%);
          border: none; border-radius: 10px; padding: 11px 24px;
          color: #fff; font-size: 13px; font-weight: 700;
          cursor: pointer; transition: all 0.2s; font-family: inherit;
        }
        .save-btn:hover { opacity: 0.9; transform: translateY(-1px); }

        .theme-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .theme-card {
          border-radius: 12px; overflow: hidden; cursor: pointer;
          border: 2px solid var(--card-border); transition: border-color 0.2s;
        }
        .theme-card:hover { border-color: var(--accent); }
        .theme-card.active { border-color: var(--accent); }
        .theme-card-label {
          background: var(--card); padding: 10px 14px;
          display: flex; align-items: center; justify-content: space-between;
          border-top: 1px solid var(--divider);
        }
        .theme-card-name { font-size: 12px; font-weight: 600; color: var(--text-primary); }
        .theme-card-active-tag { font-size: 11px; color: var(--accent); font-weight: 700; }

        .notif-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 0; border-bottom: 1px solid var(--divider);
        }
        .notif-row:last-child { border-bottom: none; padding-bottom: 0; }
        .notif-label { font-size: 13px; font-weight: 600; color: var(--text-primary); }
        .notif-desc { font-size: 12px; color: var(--text-secondary); margin-top: 3px; }

        .toggle-btn {
          width: 44px; height: 24px; border-radius: 12px; border: none;
          cursor: pointer; position: relative; flex-shrink: 0; margin-left: 20px;
          transition: background 0.2s;
        }
        .toggle-knob {
          position: absolute; top: 3px; width: 18px; height: 18px;
          border-radius: 50%; background: #fff;
          transition: left 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }

        .danger-btn {
          background: var(--danger); border: 1px solid var(--danger-border);
          border-radius: 10px; padding: 10px 20px; color: var(--danger-text);
          font-size: 13px; font-weight: 600; cursor: pointer;
          transition: all 0.2s; font-family: inherit;
          display: flex; align-items: center; gap: 8px;
        }
        .danger-btn:hover { background: rgba(239,68,68,0.15); border-color: rgba(239,68,68,0.4); }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .toast {
          animation: slideIn 0.25s ease;
          background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.25);
          color: #4ade80; border-radius: 10px; padding: 12px 18px; margin-bottom: 20px;
          font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 8px;
        }
        html.light .toast { color: #16a34a; }
      `}</style>

      <div className="settings-page">
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 className="settings-page-title">Settings</h1>
          <p className="settings-page-sub">Manage your account and preferences</p>
        </div>

        {saved && <div className="toast">✓ Changes saved successfully</div>}

        {/* Profile */}
        <div className="settings-card">
          <div className="settings-section-header">
            <div className="settings-section-icon">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="var(--accent)" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <div className="settings-section-title">Profile Information</div>
              <div className="settings-section-sub">Update your personal details</div>
            </div>
          </div>

          <form onSubmit={handleSave}>
            <div className="settings-grid-2">
              <div className="settings-field">
                <label>Full Name</label>
                <input className="settings-input" name="name" value={profile.name} onChange={handleProfileChange} placeholder="Jessica Doe" />
              </div>
              <div className="settings-field">
                <label>Email</label>
                <input className="settings-input" name="email" type="email" value={profile.email} onChange={handleProfileChange} placeholder="you@example.com" />
              </div>
            </div>
            <div className="settings-grid-2" style={{ marginBottom: 24 }}>
              <div className="settings-field">
                <label>Role</label>
                <div className="settings-select-wrap">
                  <select className="settings-select" name="role" value={profile.role} onChange={handleProfileChange}>
                    {roles.map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>
              <div className="settings-field">
                <label>Currency</label>
                <div className="settings-select-wrap">
                  <select className="settings-select" name="currency" value={profile.currency} onChange={handleProfileChange}>
                    {currencies.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <button type="submit" className="save-btn">Save Changes</button>
          </form>
        </div>

        {/* Appearance */}
        <div className="settings-card">
          <div className="settings-section-header">
            <div className="settings-section-icon">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="var(--accent)" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <div>
              <div className="settings-section-title">Appearance</div>
              <div className="settings-section-sub">Customize your workspace</div>
            </div>
          </div>
          <div className="settings-field" style={{ marginBottom: 12 }}><label>Theme</label></div>
          <div className="theme-grid">
            <div className={`theme-card ${theme === "light" ? "active" : ""}`} onClick={toggleTheme}>
              <div style={{ background: "#f8fafc", padding: "14px 14px 10px", height: 64 }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                  <div style={{ width: 36, height: 6, borderRadius: 4, background: "#e2e8f0" }} />
                  <div style={{ width: 24, height: 6, borderRadius: 4, background: "#e2e8f0" }} />
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <div style={{ width: 52, height: 28, borderRadius: 6, background: "#fff", border: "1px solid #e2e8f0" }} />
                  <div style={{ width: 52, height: 28, borderRadius: 6, background: "#fff", border: "1px solid #e2e8f0" }} />
                </div>
              </div>
              <div className="theme-card-label">
                <span className="theme-card-name">Light</span>
                {theme === "light" && <span className="theme-card-active-tag">Active</span>}
              </div>
            </div>
            <div className={`theme-card ${theme === "dark" ? "active" : ""}`} onClick={toggleTheme}>
              <div style={{ background: "#0f172a", padding: "14px 14px 10px", height: 64 }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                  <div style={{ width: 36, height: 6, borderRadius: 4, background: "#1e293b" }} />
                  <div style={{ width: 24, height: 6, borderRadius: 4, background: "#1e293b" }} />
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <div style={{ width: 52, height: 28, borderRadius: 6, background: "#1e293b", border: "1px solid rgba(255,255,255,0.06)" }} />
                  <div style={{ width: 52, height: 28, borderRadius: 6, background: "#1e293b", border: "1px solid rgba(255,255,255,0.06)" }} />
                </div>
              </div>
              <div className="theme-card-label">
                <span className="theme-card-name">Dark</span>
                {theme === "dark" && <span className="theme-card-active-tag">Active</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="settings-card">
          <div className="settings-section-header">
            <div className="settings-section-icon">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="var(--accent)" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div>
              <div className="settings-section-title">Notifications</div>
              <div className="settings-section-sub">Control what alerts you receive</div>
            </div>
          </div>
          {[
            { id: "email", label: "Email Notifications", desc: "Receive alerts when tasks are due or payments are made", defaultOn: true },
            { id: "tasks", label: "Task Reminders", desc: "Get reminded about upcoming task deadlines", defaultOn: false },
            { id: "payments", label: "Payment Alerts", desc: "Notify when a project payment status changes", defaultOn: false },
          ].map(item => <NotifRow key={item.id} {...item} />)}
        </div>

        {/* Account */}
        <div className="settings-card">
          <div className="settings-section-header">
            <div className="settings-section-icon">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="var(--accent)" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <div className="settings-section-title">Account</div>
              <div className="settings-section-sub">Manage your session and data</div>
            </div>
          </div>
          <button className="danger-btn" onClick={handleSignOut}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </Layout>
  );
}

function NotifRow({ label, desc, defaultOn }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="notif-row">
      <div>
        <div className="notif-label">{label}</div>
        <div className="notif-desc">{desc}</div>
      </div>
      <button
        className="toggle-btn"
        onClick={() => setOn(!on)}
        style={{ background: on ? "var(--accent)" : "var(--input-border)" }}
      >
        <span className="toggle-knob" style={{ left: on ? 23 : 3 }} />
      </button>
    </div>
  );
}