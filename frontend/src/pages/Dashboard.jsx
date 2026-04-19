import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { getDashboard, getProjects } from "../api/api";
import { useAuth } from '../context/AuthContext';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';
// ─── Helpers ────────────────────────────────────────────────────────────────

const greeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

const statusColor = {
  active:       { bg: 'rgba(99,202,183,0.15)', color: '#63cab7', dot: '#63cab7' },
  completed:    { bg: 'rgba(99,180,255,0.15)', color: '#63b4ff', dot: '#63b4ff' },
  'on-hold':    { bg: 'rgba(255,195,0,0.15)',  color: '#ffc300', dot: '#ffc300' },
  'not-started':{ bg: 'rgba(180,180,200,0.12)',color: '#9898b8', dot: '#9898b8' },
};

const StatusBadge = ({ status }) => {
  const s = statusColor[status] || statusColor['not-started'];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 10px', borderRadius: 20,
      fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
      textTransform: 'uppercase',
      background: s.bg, color: s.color,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
      {status}
    </span>
  );
};

const daysUntil = (d) => {
  const diff = new Date(d) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

// ─── Tooltip Styles ──────────────────────────────────────────────────────────

const ChartTooltip = ({ active, payload, label, prefix = '' }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 10, padding: '10px 14px',
      fontSize: 12, color: '#e0e0f0',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    }}>
      <div style={{ color: '#9898b8', marginBottom: 4 }}>{label}</div>
      <div style={{ fontWeight: 700, fontSize: 14 }}>{prefix}{payload[0].value?.toLocaleString()}</div>
    </div>
  );
};

// ─── Generate dummy chart data ────────────────────────────────────────────────

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS   = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

function buildEarningsData(projects) {
  const totals = {};
  projects.forEach((p) => {
    if (!p.deadline || !p.amount) return;
    const m = MONTHS[new Date(p.deadline).getMonth()];
    totals[m] = (totals[m] || 0) + p.amount;
  });
  return MONTHS.map((m) => ({ month: m, earnings: totals[m] || 0 }));
}

function buildWeeklyData(projects) {
  // Simulate tasks completed per weekday based on project data
  const base = [4, 7, 5, 9, 6, 3, 2];
  const active = projects.filter((p) => p.status === 'active').length;
  return DAYS.map((d, i) => ({
    day: d,
    tasks: Math.max(1, base[i] + Math.floor(active * 0.5)),
  }));
}

// ─── Components ──────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, icon, accent }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 16, padding: '20px 22px',
      display: 'flex', flexDirection: 'column', gap: 6,
      position: 'relative', overflow: 'hidden',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'default',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = `0 8px 32px ${accent}22`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
    >
      {/* glow blob */}
      <div style={{
        position: 'absolute', top: -20, right: -20,
        width: 80, height: 80, borderRadius: '50%',
        background: accent, opacity: 0.08, filter: 'blur(24px)',
        pointerEvents: 'none',
      }} />
      <div style={{ fontSize: 22 }}>{icon}</div>
      <div style={{ fontSize: 26, fontWeight: 800, color: accent, lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(86, 81, 167,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function SectionCard({ title, action, actionTo, children }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 16, padding: '20px 22px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, color: '#5651a7', margin: 0 }}>{title}</h2>
        {action && actionTo && (
          <Link to={actionTo} style={{
            fontSize: 12, color: '#63b4ff', textDecoration: 'none', fontWeight: 600,
            padding: '4px 10px', borderRadius: 8,
            background: 'rgba(99,180,255,0.1)',
          }}>{action}</Link>
        )}
      </div>
      {children}
    </div>
  );
}

// ─── Main Dashboard ──────────────────────────────────────────────────────────

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData]       = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDashboard(), getProjects()]).then(([dash, proj]) => {
      if (dash.dashboard) setData(dash.dashboard);
      if (proj.projects)  setProjects(proj.projects);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const earningsData  = buildEarningsData(projects);
  const weeklyData    = buildWeeklyData(projects);
  const recentProjects = projects.slice(0, 5);
  const upcomingDeadlines = projects
    .filter((p) => p.deadline && daysUntil(p.deadline) >= 0 && p.status !== 'completed')
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 5);

  // tasks from all projects
  const recentTasks = projects
    .flatMap((p) => (p.tasks || []).map((t) => ({ ...t, projectTitle: p.title })))
    .slice(0, 6);

  return (
    <Layout>
      <div style={{ padding: '24px 28px', minHeight: '100vh' }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#a78bfa', margin: 0 }}>
            {greeting()}, {user?.name?.split(' ')[0] ?? 'there'} 👋
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              border: '3px solid rgba(99,180,255,0.15)',
              borderTopColor: '#63b4ff',
              animation: 'spin 0.8s linear infinite',
            }} />
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        ) : (
          <>
            {/* ── Stat Cards ── */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 14, marginBottom: 22,
            }}>
              <StatCard
                icon="👥" label="Total Clients"
                value={data?.clients?.total ?? 0}
                sub="Managed clients"
                accent="#63cab7"
              />
              <StatCard
                icon="🚀" label="Active Projects"
                value={data?.projects?.active ?? 0}
                sub={`of ${data?.projects?.total ?? 0} total`}
                accent="#63b4ff"
              />
              <StatCard
                icon="✅" label="Pending Tasks"
                value={data?.tasks?.pending ?? 0}
                sub={`${data?.tasks?.completed ?? 0} completed`}
                accent="#ffc300"
              />
              <StatCard
                icon="💰" label="Total Earnings"
                value={`₹${(data?.payments?.totalEarnings ?? 0).toLocaleString()}`}
                sub={`₹${(data?.payments?.pendingPayments ?? 0).toLocaleString()} pending`}
                accent="#a78bfa"
              />
              <StatCard
                icon="⏰" label="Upcoming Deadlines"
                value={upcomingDeadlines.length}
                sub="Projects due soon"
                accent="#f97316"
              />
            </div>

            {/* ── Charts Row ── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 22 }}>

              {/* Earnings Line Chart */}
              <SectionCard title="💹 Total Earnings — This Year">
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={earningsData} margin={{ top: 4, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" tick={{ fill: '#6b6b8a', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#6b6b8a', fontSize: 10 }} axisLine={false} tickLine={false}
                      tickFormatter={(v) => `₹${v >= 1000 ? (v/1000).toFixed(0)+'k' : v}`} />
                    <Tooltip content={<ChartTooltip prefix="₹" />} />
                    <defs>
                      <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#63b4ff" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="#63b4ff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Line
                      type="monotone" dataKey="earnings"
                      stroke="#63b4ff" strokeWidth={2.5}
                      dot={{ fill: '#63b4ff', r: 3, strokeWidth: 0 }}
                      activeDot={{ r: 5, fill: '#63b4ff' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </SectionCard>

              {/* Weekly Productivity Bar Chart */}
              <SectionCard title="📊 Weekly Productivity">
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={weeklyData} margin={{ top: 4, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="day" tick={{ fill: '#6b6b8a', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#6b6b8a', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<ChartTooltip />} />
                    <defs>
                      <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#63b4ff" />
                      </linearGradient>
                    </defs>
                    <Bar dataKey="tasks" fill="url(#barGrad)" radius={[6, 6, 0, 0]} maxBarSize={36} />
                  </BarChart>
                </ResponsiveContainer>
              </SectionCard>
            </div>

            {/* ── Bottom Row ── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 22 }}>

              {/* Recent Projects */}
              <div style={{ gridColumn: 'span 2' }}>
                <SectionCard title="🗂 Recent Projects" action="View all →" actionTo="/projects">
                  {recentProjects.length === 0 ? (
                    <EmptyState label="No projects yet" cta="+ New Project" to="/projects" />
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {recentProjects.map((p) => (
                        <div key={p._id} style={{
                          display: 'grid', gridTemplateColumns: '1fr auto auto auto',
                          alignItems: 'center', gap: 12,
                          padding: '12px 14px', borderRadius: 12,
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.05)',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.055)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                        >
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#e0e0f0' }}>{p.title}</div>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
                              {p.client?.name || 'No client'}
                            </div>
                          </div>
                          <StatusBadge status={p.status} />
                          <div style={{ fontSize: 12, color: '#a78bfa', fontWeight: 700 }}>
                            ₹{p.amount?.toLocaleString() ?? 0}
                          </div>
                          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'right', minWidth: 70 }}>
                            {p.deadline ? new Date(p.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—'}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </SectionCard>
              </div>

              {/* Upcoming Deadlines */}
              <SectionCard title="⏰ Upcoming Deadlines" action="View all →" actionTo="/projects">
                {upcomingDeadlines.length === 0 ? (
                  <EmptyState label="No upcoming deadlines" />
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {upcomingDeadlines.map((p) => {
                      const d = daysUntil(p.deadline);
                      const urgency = d <= 2 ? '#ef4444' : d <= 7 ? '#ffc300' : '#63cab7';
                      return (
                        <div key={p._id} style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          padding: '10px 12px', borderRadius: 10,
                          background: 'rgba(255,255,255,0.025)',
                          border: `1px solid ${urgency}22`,
                        }}>
                          <div style={{
                            minWidth: 38, height: 38, borderRadius: 10,
                            background: `${urgency}18`, display: 'flex',
                            flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                          }}>
                            <span style={{ fontSize: 13, fontWeight: 800, color: urgency, lineHeight: 1 }}>{d}</span>
                            <span style={{ fontSize: 8, color: urgency, opacity: 0.8 }}>days</span>
                          </div>
                          <div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: '#e0e0f0' }}>{p.title}</div>
                            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>
                              {new Date(p.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </SectionCard>
            </div>

            {/* ── Recent Tasks ── */}
            <SectionCard title="📝 Recent Tasks" action="View all →" actionTo="/tasks">
              {recentTasks.length === 0 ? (
                <EmptyState label="No tasks yet" cta="+ New Task" to="/tasks" />
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 10,
                }}>
                  {recentTasks.map((t, i) => (
                    <div key={t._id ?? i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 10,
                      padding: '12px 14px', borderRadius: 12,
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}>
                      <div style={{
                        width: 18, height: 18, marginTop: 1, borderRadius: 5, flexShrink: 0,
                        border: t.completed ? 'none' : '2px solid rgba(255,255,255,0.2)',
                        background: t.completed ? '#63cab7' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {t.completed && <span style={{ fontSize: 10, color: '#0d1117' }}>✓</span>}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: 12, fontWeight: 600, color: t.completed ? 'rgba(255,255,255,0.35)' : '#e0e0f0',
                          textDecoration: t.completed ? 'line-through' : 'none',
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        }}>{t.title}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>
                            {t.projectTitle}
                          </span>
                          {t.dueDate && (
                            <>
                              <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 10 }}>·</span>
                              <span style={{
                                fontSize: 10,
                                color: daysUntil(t.dueDate) < 0 ? '#ef4444' : 'rgba(255,255,255,0.3)',
                              }}>
                                {new Date(t.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </SectionCard>

          </>
        )}
      </div>
    </Layout>
  );
}

// ─── Empty State ─────────────────────────────────────────────────────────────

function EmptyState({ label, cta, to }) {
  return (
    <div style={{
      textAlign: 'center', padding: '28px 0',
      color: 'rgba(255,255,255,0.25)', fontSize: 13,
    }}>
      <div style={{ fontSize: 28, marginBottom: 8, opacity: 0.4 }}>◈</div>
      <p style={{ margin: 0 }}>{label}</p>
      {cta && to && (
        <Link to={to} style={{
          display: 'inline-block', marginTop: 10,
          fontSize: 12, color: '#63b4ff', textDecoration: 'none',
          padding: '5px 14px', borderRadius: 8,
          background: 'rgba(99,180,255,0.1)',
          fontWeight: 600,
        }}>{cta}</Link>
      )}
    </div>
  );
}