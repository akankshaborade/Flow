// import React, { useState, useEffect } from "react";
// import { getProjects, updateProject } from "../api/api";

// const Payments = () => {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchPayments();
//   }, []);

//   const fetchPayments = async () => {
//     try {
//       const data = await getProjects();
//       // Only keep projects that have an amount greater than 0
//       const projectsWithPayments = data.projects.filter((p) => p.amount > 0);
//       setPayments(projectsWithPayments);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching payments:", error);
//       setLoading(false);
//     }
//   };

//   const handleMarkAsPaid = async (id) => {
//     try {
//       await updateProject(id, { paymentStatus: "paid" });
//       // Update local state to reflect the change immediately
//       setPayments((prev) =>
//         prev.map((p) => (p._id === id ? { ...p, paymentStatus: "paid" } : p))
//       );
//     } catch (error) {
//       console.error("Error updating payment:", error);
//     }
//   };

//   if (loading) return <div className="p-8">Loading payments...</div>;

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">Payments & Invoices</h1>
      
//       <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
//               <th className="p-4">Project</th>
//               <th className="p-4">Client</th>
//               <th className="p-4">Amount</th>
//               <th className="p-4">Status</th>
//               <th className="p-4">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {payments.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="p-4 text-center text-gray-500">No payment records found.</td>
//               </tr>
//             ) : (
//               payments.map((payment) => (
//                 <tr key={payment._id} className="border-b border-gray-100 hover:bg-gray-50">
//                   <td className="p-4 font-medium text-gray-800">{payment.title}</td>
//                   <td className="p-4 text-gray-600">{payment.client?.name || "Unknown Client"}</td>
//                   <td className="p-4 font-semibold text-gray-800">₹{payment.amount}</td>
//                   <td className="p-4">
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       payment.paymentStatus === "paid" 
//                         ? "bg-green-100 text-green-700" 
//                         : "bg-yellow-100 text-yellow-700"
//                     }`}>
//                       {payment.paymentStatus.toUpperCase()}
//                     </span>
//                   </td>
//                   <td className="p-4">
//                     {payment.paymentStatus === "pending" && (
//                       <button
//                         onClick={() => handleMarkAsPaid(payment._id)}
//                         className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm transition"
//                       >
//                         Mark as Paid
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Payments;    

import React, { useState, useEffect, useCallback } from "react";
import Layout from "../components/Layout";
import { useTheme } from "../context/ThemeContext";
import { getProjects, updateProject } from "../api/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// ─── Theme token maps ──────────────────────────────────────────────────────────
// All colour decisions live here — one place to change both themes.

function useTokens(theme) {
  const dark = theme !== "light";
  return {
    // surfaces
    pageBg:        dark ? "transparent"                          : "#f4f6fb",
    cardBg:        dark ? "rgba(255,255,255,0.055)"              : "#ffffff",
    cardBorder:    dark ? "rgba(255,255,255,0.09)"               : "rgba(0,0,0,0.07)",
    cardBg2:       dark ? "rgba(255,255,255,0.02)"               : "#f9fafc",
    tableBg:       dark ? "rgba(255,255,255,0.055)"              : "#ffffff",
    rowHover:      dark ? "rgba(255,255,255,0.035)"              : "rgba(59,130,246,0.04)",
    theadBg:       dark ? "transparent"                          : "#f8f9fc",
    divider:       dark ? "rgba(255,255,255,0.06)"               : "rgba(0,0,0,0.06)",
    inputBg:       dark ? "rgba(255,255,255,0.06)"               : "rgba(0,0,0,0.04)",
    inputBorder:   dark ? "rgba(255,255,255,0.1)"                : "rgba(0,0,0,0.1)",
    tooltipBg:     dark ? "rgba(16,16,36,0.97)"                  : "#ffffff",
    tooltipBorder: dark ? "rgba(255,255,255,0.12)"               : "rgba(0,0,0,0.1)",
    // text
    textPrimary:   dark ? "#f0f0ff"                              : "#111827",
    textSecondary: dark ? "rgba(255,255,255,0.4)"                : "#6b7280",
    textMuted:     dark ? "rgba(255,255,255,0.25)"               : "#9ca3af",
    textLink:      dark ? "#63b4ff"                              : "#2563eb",
    // accents (same both themes — keep brand consistent)
    accent1:       "#63b4ff",
    accent2:       "#a78bfa",
    green:         "#4ade80",
    yellow:        "#facc15",
    red:           "#f87171",
    // filter pill
    filterActiveBg:     "linear-gradient(135deg,#63b4ff 0%,#a78bfa 100%)",
    filterActiveColor:  "#fff",
    filterActiveBorder: "transparent",
    filterIdleBg:       dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
    filterIdleColor:    dark ? "rgba(255,255,255,0.5)"  : "#6b7280",
    filterIdleBorder:   dark ? "rgba(255,255,255,0.1)"  : "rgba(0,0,0,0.1)",
    // chart axis / grid
    axisColor:     dark ? "rgba(255,255,255,0.3)"  : "#9ca3af",
    gridColor:     dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
    barFill:       dark ? "#63b4ff"                : "#3b82f6",
    barCursor:     dark ? "rgba(99,180,255,0.06)"  : "rgba(59,130,246,0.06)",
    // glow blob
    blobOpacity:   dark ? 1 : 0,
  };
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

const fmt = (n) =>
  "USD " + Number(n || 0).toLocaleString("en-US", { minimumFractionDigits: 0 });

const fmtDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" });
};

const STATUS_COLORS = {
  paid:     "#4ade80",
  pending:  "#facc15",
  overdue:  "#f87171",
  "on-hold":"#a78bfa",
};

const PIE_COLORS  = ["#63b4ff", "#facc15", "#f87171"];
const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// ─── Dummy data (shown when API returns nothing) ───────────────────────────────
// Mirrors the invoice style from the design screenshots.
// Dates are relative to "now" so they always look current.

function buildDummy() {
  const now   = new Date();
  const ago   = (days) => new Date(now - days * 86400000).toISOString();
  const ahead = (days) => new Date(+now + days * 86400000).toISOString();

  return [
    {
      _id: "dummy-001", title: "Website Redesign",
      client: { name: "Acme Corporation",      company: "INV-001", email: "acme@corp.com" },
      amount: 4250, paymentStatus: "paid",    updatedAt: ago(24),  createdAt: ago(60),  deadline: null,
    },
    {
      _id: "dummy-002", title: "Website Redesign",
      client: { name: "Acme Corporation",      company: "INV-002", email: "acme@corp.com" },
      amount: 4250, paymentStatus: "pending",  updatedAt: ago(5),   createdAt: ago(30),  deadline: ahead(11),
    },
    {
      _id: "dummy-003", title: "Brand Identity Package",
      client: { name: "TechStart Inc",         company: "INV-003", email: "hello@techstart.io" },
      amount: 5000, paymentStatus: "paid",    updatedAt: ago(13),  createdAt: ago(45),  deadline: null,
    },
    {
      _id: "dummy-004", title: "Social Media Campaign",
      client: { name: "Creative Studios",      company: "INV-004", email: "studio@creative.co" },
      amount: 1750, paymentStatus: "paid",    updatedAt: ago(9),   createdAt: ago(40),  deadline: null,
    },
    {
      _id: "dummy-005", title: "Social Media Campaign",
      client: { name: "Creative Studios",      company: "INV-005", email: "studio@creative.co" },
      amount: 1750, paymentStatus: "pending",  updatedAt: ago(3),   createdAt: ago(20),  deadline: ahead(1),
    },
    {
      _id: "dummy-006", title: "SEO Optimization",
      client: { name: "Digital Marketing Pro", company: "INV-006", email: "info@dmpro.com" },
      amount: 2000, paymentStatus: "pending",  updatedAt: ago(20),  createdAt: ago(50),  deadline: ago(9),
    },
    {
      _id: "dummy-007", title: "Mobile App UI",
      client: { name: "NexaFlow Ltd",          company: "INV-007", email: "dev@nexaflow.com" },
      amount: 6800, paymentStatus: "paid",    updatedAt: ago(35),  createdAt: ago(70),  deadline: null,
    },
    {
      _id: "dummy-008", title: "E-commerce Platform",
      client: { name: "ShopEase Inc",          company: "INV-008", email: "ops@shopease.com" },
      amount: 9500, paymentStatus: "pending",  updatedAt: ago(2),   createdAt: ago(15),  deadline: ahead(18),
    },
    {
      _id: "dummy-009", title: "Logo & Branding",
      client: { name: "Bloom Agency",          company: "INV-009", email: "hi@bloomagency.co" },
      amount: 1200, paymentStatus: "paid",    updatedAt: ago(55),  createdAt: ago(80),  deadline: null,
    },
    {
      _id: "dummy-010", title: "Content Strategy",
      client: { name: "Acme Corporation",      company: "INV-010", email: "acme@corp.com" },
      amount: 3300, paymentStatus: "pending",  updatedAt: ago(18),  createdAt: ago(40),  deadline: ago(3),
    },
    {
      _id: "dummy-011", title: "Annual Retainer Q1",
      client: { name: "TechStart Inc",         company: "INV-011", email: "hello@techstart.io" },
      amount: 7200, paymentStatus: "paid",    updatedAt: ago(62),  createdAt: ago(90),  deadline: null,
    },
    {
      _id: "dummy-012", title: "Print & Collateral",
      client: { name: "Bloom Agency",          company: "INV-012", email: "hi@bloomagency.co" },
      amount: 850,  paymentStatus: "pending",  updatedAt: ago(7),   createdAt: ago(25),  deadline: ago(1),
    },
  ];
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, icon, accent, t }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: `linear-gradient(145deg, ${t.cardBg} 0%, ${t.cardBg2} 100%)`,
        border: `1px solid ${hov ? accent + "44" : t.cardBorder}`,
        borderRadius: 16,
        padding: "22px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
        transform: hov ? "translateY(-2px)" : "none",
        boxShadow: hov ? `0 8px 32px ${accent}18` : "none",
        animation: "cardIn 0.4s ease both",
        cursor: "default",
      }}
    >
      {/* glow blob */}
      <div style={{
        position: "absolute", top: -30, right: -30,
        width: 100, height: 100, borderRadius: "50%",
        background: `radial-gradient(circle, ${accent}28 0%, transparent 70%)`,
        pointerEvents: "none", opacity: t.blobOpacity,
        transition: "opacity 0.3s",
      }} />
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 16 }}>{icon}</span>
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase", color: t.textSecondary,
        }}>{label}</span>
      </div>
      <div style={{ fontSize: 26, fontWeight: 800, color: t.textPrimary, letterSpacing: "-0.5px" }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 12, color: accent, fontWeight: 600 }}>{sub}</div>
      )}
    </div>
  );
}

function StatusPill({ status }) {
  const color = STATUS_COLORS[status] || "#aaa";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "3px 10px", borderRadius: 20,
      fontSize: 11, fontWeight: 700, letterSpacing: "0.05em",
      textTransform: "lowercase",
      background: `${color}1a`, color, border: `1px solid ${color}44`,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0 }} />
      {status}
    </span>
  );
}

function FilterBtn({ label, active, onClick, t }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "7px 18px", borderRadius: 20,
        border: `1px solid ${active ? t.filterActiveBorder : (hov ? t.accent1 + "66" : t.filterIdleBorder)}`,
        background: active ? t.filterActiveBg : (hov ? (t.filterIdleBg.includes("rgba(255") ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.07)") : t.filterIdleBg),
        color: active ? t.filterActiveColor : (hov ? t.textPrimary : t.filterIdleColor),
        fontSize: 12, fontWeight: 700, cursor: "pointer",
        transition: "all 0.18s ease", letterSpacing: "0.03em",
      }}
    >{label}</button>
  );
}

function CustomTooltip({ active, payload, t }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: t.tooltipBg, border: `1px solid ${t.tooltipBorder}`,
      borderRadius: 10, padding: "8px 14px",
      fontSize: 12, color: t.textPrimary, fontWeight: 600,
      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    }}>
      {payload.map((p, i) => (
        <div key={i}>{p.name}: {typeof p.value === "number" ? fmt(p.value) : p.value}</div>
      ))}
    </div>
  );
}

function ActionBtn({ children, onClick, disabled, style }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...style,
        opacity: disabled ? 0.4 : hov ? 1 : 0.72,
        transform: hov && !disabled ? "translateY(-1px)" : "none",
        transition: "all 0.15s",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >{children}</button>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function Payments() {
  const { theme } = useTheme();
  const t = useTokens(theme);

  const [projects, setProjects]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [filter, setFilter]       = useState("All");
  const [updating, setUpdating]   = useState(null);
  const [toast, setToast]         = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      const real = (data?.projects || data || []).filter((p) => p.amount > 0);
      // Merge real records with dummy data so the page always looks full.
      // Real records come first; dummy ones fill the gaps.
      // Remove buildDummy() and the merge below when you go to production.
      const dummy   = buildDummy();
      const realIds = new Set(real.map((p) => p._id));
      const merged  = [...real, ...dummy.filter((d) => !realIds.has(d._id))];
      setProjects(merged);
    } catch (err) {
      console.error("Error fetching payments:", err);
      setProjects(buildDummy());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPayments(); }, [fetchPayments]);

  // ── Derived stats ────────────────────────────────────────────────────────────

  const isOverdue = (p) =>
    p.paymentStatus === "pending" && p.deadline && new Date(p.deadline) < new Date();

  const displayStatus = (p) => (isOverdue(p) ? "overdue" : p.paymentStatus);

  const totalPaid    = projects.filter(p => p.paymentStatus === "paid").reduce((s,p) => s + (p.amount||0), 0);
  const totalPending = projects.filter(p => p.paymentStatus === "pending").reduce((s,p) => s + (p.amount||0), 0);
  const pendingCount = projects.filter(p => p.paymentStatus === "pending").length;
  const overdueList  = projects.filter(isOverdue);
  const totalOverdue = overdueList.reduce((s,p) => s + (p.amount||0), 0);
  const overdueCount = overdueList.length;

  // ── Chart data ───────────────────────────────────────────────────────────────

  const pieData = [
    { name: "Paid",    value: projects.filter(p => p.paymentStatus === "paid").length },
    { name: "Pending", value: projects.filter(p => p.paymentStatus === "pending" && !isOverdue(p)).length },
    { name: "Overdue", value: overdueCount },
  ].filter(d => d.value > 0);

  const monthlyMap = {};
  projects.filter(p => p.paymentStatus === "paid").forEach(p => {
    const d   = new Date(p.updatedAt || p.createdAt || Date.now());
    const key = MONTH_NAMES[d.getMonth()];
    monthlyMap[key] = (monthlyMap[key] || 0) + (p.amount || 0);
  });
  const now     = new Date();
  const barData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    const key = MONTH_NAMES[d.getMonth()];
    return { month: key, earnings: monthlyMap[key] || 0 };
  });

  // ── Filter table ─────────────────────────────────────────────────────────────

  const filtered = projects.filter(p => {
    if (filter === "All")     return true;
    if (filter === "Paid")    return p.paymentStatus === "paid";
    if (filter === "Pending") return p.paymentStatus === "pending" && !isOverdue(p);
    if (filter === "Overdue") return isOverdue(p);
    return true;
  });

  // ── Mark paid ────────────────────────────────────────────────────────────────

  const handleMarkPaid = async (id) => {
    setUpdating(id);
    try {
      // Skip real API call for dummy rows
      if (!id.startsWith("dummy-")) {
        await updateProject(id, { paymentStatus: "paid" });
      }
      setProjects(prev => prev.map(p => p._id === id ? { ...p, paymentStatus: "paid" } : p));
      showToast("Payment marked as paid ✓");
    } catch {
      showToast("Failed to update payment", "error");
    } finally {
      setUpdating(null);
    }
  };

  // ── Skeleton ──────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <Layout>
        <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: 20 }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{
              height: 56, borderRadius: 12,
              background: theme === "light"
                ? "linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%)"
                : "linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.09) 50%,rgba(255,255,255,0.04) 75%)",
              backgroundSize: "800px 100%",
              animation: "shimmer 1.4s infinite linear",
            }} />
          ))}
          <style>{`@keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}`}</style>
        </div>
      </Layout>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────────

  const cardStyle = {
    background: `linear-gradient(145deg, ${t.cardBg} 0%, ${t.cardBg2} 100%)`,
    border: `1px solid ${t.cardBorder}`,
    borderRadius: 16,
  };

  return (
    <Layout>
      <style>{`
        @keyframes cardIn  { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes toastIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        .pay-row { transition: background 0.15s; }
        .pay-row:hover { background: ${t.rowHover} !important; }
      `}</style>

      <div style={{ padding: "28px 32px", minHeight: "100vh", background: t.pageBg, animation: "fadeIn 0.25s ease" }}>

        {/* ── Header ── */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom: 28, flexWrap:"wrap", gap: 14 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: t.textPrimary, margin: 0, letterSpacing: "-0.4px" }}>
              Payments &amp; Earnings
            </h1>
            <p style={{ fontSize: 13, color: t.textSecondary, marginTop: 4 }}>
              Track your income and manage payments
            </p>
          </div>
          <button
            style={{
              display:"flex", alignItems:"center", gap: 7,
              padding: "10px 22px", borderRadius: 12, border: "none",
              background: "linear-gradient(135deg, #63b4ff 0%, #a78bfa 100%)",
              color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer",
              boxShadow: "0 4px 18px rgba(99,180,255,0.3)",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 6px 26px rgba(99,180,255,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 4px 18px rgba(99,180,255,0.3)"; }}
          >
            <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Add Payment
          </button>
        </div>

        {/* ── Stat Cards ── */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap: 16, marginBottom: 28 }}>
          <StatCard t={t} label="Total Paid"    value={fmt(totalPaid)}    sub="✦ This month"                                         icon="✔" accent={t.green}  />
          <StatCard t={t} label="Pending"       value={fmt(totalPending)} sub={`${pendingCount} payment${pendingCount!==1?"s":""}`}   icon="⏱" accent={t.yellow} />
          <StatCard t={t} label="Overdue"       value={fmt(totalOverdue)} sub={`${overdueCount} payment${overdueCount!==1?"s":""}`}   icon="⚠" accent={t.red}    />
        </div>

        {/* ── Charts Row ── */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.6fr", gap: 16, marginBottom: 28 }}>

          {/* Pie */}
          <div style={{ ...cardStyle, padding:"22px 24px", animation:"cardIn 0.5s ease both" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: t.textPrimary, marginBottom: 16 }}>Payment Status</div>
            <ResponsiveContainer width="100%" height={190}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={52} outerRadius={80} paddingAngle={3} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip content={<CustomTooltip t={t} />} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display:"flex", gap: 14, justifyContent:"center", flexWrap:"wrap", marginTop: 8 }}>
              {pieData.map((d, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap: 6, fontSize: 11, color: t.textSecondary, fontWeight: 600 }}>
                  <span style={{ width: 8, height: 8, borderRadius:"50%", background: PIE_COLORS[i], flexShrink: 0 }} />
                  {d.name} {projects.length ? Math.round((d.value / projects.length) * 100) : 0}%
                </div>
              ))}
            </div>
          </div>

          {/* Bar */}
          <div style={{ ...cardStyle, padding:"22px 24px", animation:"cardIn 0.55s ease both" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: t.textPrimary, marginBottom: 16 }}>Monthly Earnings</div>
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={barData} margin={{ top: 4, right: 4, left: -12, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={t.gridColor} vertical={false} />
                <XAxis dataKey="month" tick={{ fill: t.axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: t.axisColor, fontSize: 11 }} axisLine={false} tickLine={false}
                  tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} />
                <Tooltip content={<CustomTooltip t={t} />} cursor={{ fill: t.barCursor }} />
                <Bar dataKey="earnings" name="earnings" fill={t.barFill} radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Table ── */}
        <div style={{ ...cardStyle, overflow:"hidden", animation:"cardIn 0.6s ease both" }}>

          {/* Filter bar */}
          <div style={{
            display:"flex", gap: 8, padding:"18px 24px", flexWrap:"wrap", alignItems:"center",
            borderBottom: `1px solid ${t.divider}`,
            background: theme === "light" ? "#f8f9fc" : "transparent",
          }}>
            <span style={{ fontSize: 13, color: t.textMuted, marginRight: 4 }}>▾</span>
            {["All","Paid","Pending","Overdue"].map(f => (
              <FilterBtn key={f} label={f} active={filter===f} onClick={() => setFilter(f)} t={t} />
            ))}
            <span style={{ marginLeft:"auto", fontSize: 12, color: t.textMuted, fontWeight: 600 }}>
              {filtered.length} record{filtered.length!==1?"s":""}
            </span>
          </div>

          {/* Table */}
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: t.theadBg }}>
                  {["Client","Project","Amount","Status","Date","Actions"].map(h => (
                    <th key={h} style={{
                      padding:"12px 20px", textAlign:"left",
                      fontSize: 10, fontWeight: 700, letterSpacing:"0.1em", textTransform:"uppercase",
                      color: t.textMuted, borderBottom: `1px solid ${t.divider}`, whiteSpace:"nowrap",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding:"52px 20px", textAlign:"center", color: t.textMuted, fontSize: 14 }}>
                      <div style={{ fontSize: 36, marginBottom: 10, opacity: 0.4 }}>💳</div>
                      No payment records found
                    </td>
                  </tr>
                ) : filtered.map((p, idx) => {
                  const status = displayStatus(p);
                  return (
                    <tr key={p._id} className="pay-row"
                      style={{ borderBottom: `1px solid ${t.divider}`, animationDelay: `${idx*30}ms`, animation:"cardIn 0.3s ease both" }}>

                      {/* Client */}
                      <td style={{ padding:"14px 20px" }}>
                        <div style={{ fontWeight: 700, color: t.textPrimary, fontSize: 13 }}>
                          {p.client?.name || "Unknown Client"}
                        </div>
                        <div style={{ fontSize: 11, color: t.textSecondary, marginTop: 2 }}>
                          {p.client?.company || p.client?.email || ""}
                        </div>
                      </td>

                      {/* Project */}
                      <td style={{ padding:"14px 20px" }}>
                        <span style={{ color: t.textLink, fontWeight: 500 }}>{p.title}</span>
                      </td>

                      {/* Amount */}
                      <td style={{ padding:"14px 20px" }}>
                        <span style={{ fontWeight: 800, color: t.textPrimary, fontSize: 14, letterSpacing:"-0.3px" }}>
                          {fmt(p.amount)}
                        </span>
                      </td>

                      {/* Status */}
                      <td style={{ padding:"14px 20px" }}>
                        <StatusPill status={status} />
                      </td>

                      {/* Date */}
                      <td style={{ padding:"14px 20px", color: t.textSecondary, fontSize: 12, whiteSpace:"nowrap" }}>
                        {p.paymentStatus === "paid"
                          ? fmtDate(p.updatedAt)
                          : p.deadline ? `Due: ${fmtDate(p.deadline)}` : "—"}
                      </td>

                      {/* Actions */}
                      <td style={{ padding:"14px 20px" }}>
                        <div style={{ display:"flex", gap: 7, alignItems:"center" }}>
                          {p.paymentStatus !== "paid" && (
                            <ActionBtn
                              onClick={() => handleMarkPaid(p._id)}
                              disabled={updating === p._id}
                              style={{
                                padding:"5px 13px", borderRadius: 8, border:`1px solid ${t.green}44`,
                                background:`${t.green}12`, color: t.green,
                                fontSize: 11, fontWeight: 700, whiteSpace:"nowrap",
                              }}
                            >
                              {updating === p._id ? "…" : "Mark Paid"}
                            </ActionBtn>
                          )}
                          <ActionBtn style={{
                            width: 30, height: 30, borderRadius: 7,
                            border: `1px solid ${t.cardBorder}`,
                            background: t.inputBg, color: t.textSecondary,
                            fontSize: 14, display:"flex", alignItems:"center", justifyContent:"center",
                          }} title="Edit">✎</ActionBtn>
                          <ActionBtn style={{
                            width: 30, height: 30, borderRadius: 7,
                            border:`1px solid ${t.red}33`, background:`${t.red}0d`,
                            color: t.red, fontSize: 13,
                            display:"flex", alignItems:"center", justifyContent:"center",
                          }} title="Delete">🗑</ActionBtn>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Toast ── */}
      {toast && (
        <div style={{
          position:"fixed", bottom: 24, right: 24, zIndex: 999,
          padding:"12px 18px", borderRadius: 12,
          background: toast.type === "error" ? `${t.red}18` : `${t.green}18`,
          border: `1px solid ${toast.type === "error" ? t.red+"44" : t.green+"44"}`,
          color: toast.type === "error" ? t.red : t.green,
          fontSize: 13, fontWeight: 600,
          animation:"toastIn 0.25s ease",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          backdropFilter: "blur(10px)",
        }}>
          {toast.message}
        </div>
      )}
    </Layout>
  );
}