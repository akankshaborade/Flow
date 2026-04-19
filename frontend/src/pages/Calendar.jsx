// import { useState, useEffect } from 'react';
// import Layout from '../components/Layout';
// import '../styles/flow.css';

// const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
// const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

// const MOCK_EVENTS = [
//   { id: 1, title: 'SEO Deadline', date: '2026-04-14', type: 'deadline', color: '#ef4444' },
//   { id: 2, title: 'Client Call — LogoGen', date: '2026-04-16', type: 'meeting', color: '#2563eb' },
//   { id: 3, title: 'Website Redesign Due', date: '2026-04-22', type: 'deadline', color: '#ef4444' },
//   { id: 4, title: 'Invoice #INV-002 Due', date: '2026-04-18', type: 'payment', color: '#f59e0b' },
//   { id: 5, title: 'StartupXYZ Kickoff', date: '2026-04-25', type: 'meeting', color: '#10b981' },
//   { id: 6, title: 'Brand Co. Review', date: '2026-04-30', type: 'meeting', color: '#2563eb' },
// ];

// export default function Calendar() {
//   const today = new Date();
//   const [current, setCurrent] = useState({ month: today.getMonth(), year: today.getFullYear() });
//   const [events] = useState(MOCK_EVENTS);
//   const [selected, setSelected] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [form, setForm] = useState({ title: '', date: '', type: 'meeting' });

//   const daysInMonth = new Date(current.year, current.month + 1, 0).getDate();
//   const firstDay = new Date(current.year, current.month, 1).getDay();

//   const prevMonth = () => setCurrent(c => c.month === 0 ? { month: 11, year: c.year - 1 } : { ...c, month: c.month - 1 });
//   const nextMonth = () => setCurrent(c => c.month === 11 ? { month: 0, year: c.year + 1 } : { ...c, month: c.month + 1 });

//   const getEventsForDay = (day) => {
//     const dateStr = `${current.year}-${String(current.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
//     return events.filter(e => e.date === dateStr);
//   };

//   const isToday = (day) => today.getDate() === day && today.getMonth() === current.month && today.getFullYear() === current.year;

//   const upcomingEvents = events
//     .filter(e => new Date(e.date) >= today)
//     .sort((a, b) => new Date(a.date) - new Date(b.date))
//     .slice(0, 6);

//   const typeColors = { deadline: '#ef4444', meeting: '#2563eb', payment: '#f59e0b', task: '#10b981' };

//   return (
//     <Layout>
//       <div className="topbar">
//         <div className="flex items-center gap-3">
//           <button className="icon-btn" onClick={prevMonth}>
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
//           </button>
//           <span style={{ fontWeight: 600, fontSize: 15, minWidth: 160, textAlign: 'center' }}>{MONTHS[current.month]} {current.year}</span>
//           <button className="icon-btn" onClick={nextMonth}>
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
//           </button>
//           <button className="btn btn-ghost btn-sm" onClick={() => setCurrent({ month: today.getMonth(), year: today.getFullYear() })}>Today</button>
//         </div>
//         <button className="btn btn-blue" onClick={() => setShowModal(true)}>
//           <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
//           Add Event
//         </button>
//       </div>

//       <div className="page-header">
//         <h1 className="page-title">Calendar</h1>
//         <p className="page-subtitle">Deadlines, meetings, and payments at a glance</p>
//       </div>

//       <div className="page-body" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20 }}>
//         <div className="card">
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 8 }}>
//             {DAYS.map(d => (
//               <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', padding: '6px 0' }}>{d}</div>
//             ))}
//           </div>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
//             {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
//             {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
//               const dayEvents = getEventsForDay(day);
//               return (
//                 <div
//                   key={day}
//                   onClick={() => setSelected(selected === day ? null : day)}
//                   style={{
//                     minHeight: 72, padding: '8px 6px', borderRadius: 8, cursor: 'pointer',
//                     background: selected === day ? 'var(--blue-light)' : isToday(day) ? 'var(--blue)' : 'transparent',
//                     border: selected === day ? '1.5px solid var(--blue)' : '1.5px solid transparent',
//                     transition: 'all 0.15s',
//                   }}
//                 >
//                   <div style={{ fontSize: 13, fontWeight: 600, color: isToday(day) ? '#fff' : 'var(--text-primary)', marginBottom: 4 }}>{day}</div>
//                   {dayEvents.slice(0, 2).map(ev => (
//                     <div key={ev.id} style={{ fontSize: 10, padding: '2px 5px', borderRadius: 4, background: ev.color + '22', color: ev.color, fontWeight: 600, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                       {ev.title}
//                     </div>
//                   ))}
//                   {dayEvents.length > 2 && <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>+{dayEvents.length - 2}</div>}
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//           {/* Legend */}
//           <div className="card" style={{ padding: 16 }}>
//             <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: 10 }}>Event Types</div>
//             {Object.entries(typeColors).map(([type, color]) => (
//               <div key={type} className="flex items-center gap-2" style={{ marginBottom: 8 }}>
//                 <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0 }} />
//                 <span style={{ fontSize: 13, textTransform: 'capitalize' }}>{type}</span>
//               </div>
//             ))}
//           </div>

//           {/* Upcoming events */}
//           <div className="card" style={{ padding: 16, flex: 1 }}>
//             <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: 12 }}>Upcoming Events</div>
//             {upcomingEvents.length === 0 ? (
//               <div style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', padding: 16 }}>No upcoming events</div>
//             ) : upcomingEvents.map(ev => (
//               <div key={ev.id} className="flex items-center gap-3" style={{ marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid var(--border-light)' }}>
//                 <div style={{ width: 8, height: 8, borderRadius: '50%', background: ev.color, flexShrink: 0, marginTop: 2 }} />
//                 <div style={{ flex: 1, minWidth: 0 }}>
//                   <div style={{ fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.title}</div>
//                   <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>
//                     {new Date(ev.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {showModal && (
//         <div className="modal-overlay" onClick={() => setShowModal(false)}>
//           <div className="modal" onClick={e => e.stopPropagation()}>
//             <div className="modal-title">Add Event</div>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
//               <div>
//                 <label className="form-label" style={{ marginBottom: 6, display: 'block' }}>Event Title</label>
//                 <input className="app-input" placeholder="e.g. Client Meeting" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
//               </div>
//               <div>
//                 <label className="form-label" style={{ marginBottom: 6, display: 'block' }}>Date</label>
//                 <input className="app-input" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
//               </div>
//               <div>
//                 <label className="form-label" style={{ marginBottom: 6, display: 'block' }}>Type</label>
//                 <select className="app-select" style={{ width: '100%' }} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
//                   <option value="meeting">Meeting</option>
//                   <option value="deadline">Deadline</option>
//                   <option value="payment">Payment</option>
//                   <option value="task">Task</option>
//                 </select>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
//               <button className="btn btn-blue" onClick={() => setShowModal(false)}>Add Event</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </Layout>
//   );
// }

import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import '../styles/flow.css';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const MOCK_EVENTS = [
  { id: 1, title: 'SEO Deadline', date: '2026-04-14', type: 'deadline', color: '#ef4444' },
  { id: 2, title: 'Client Call — LogoGen', date: '2026-04-16', type: 'meeting', color: '#2563eb' },
  { id: 3, title: 'Website Redesign Due', date: '2026-04-22', type: 'deadline', color: '#ffc300' },
  { id: 4, title: 'Invoice #INV-002 Due', date: '2026-04-18', type: 'payment', color: '#f59e00' },
  { id: 5, title: 'StartupXYZ Kickoff', date: '2026-04-25', type: 'meeting', color: '#2563eb' },
  { id: 6, title: 'Brand Co. Review', date: '2026-04-30', type: 'meeting', color: '#2563eb' },
];

export default function Calendar() {
  const today = new Date();
  const [current, setCurrent] = useState({ month: today.getMonth(), year: today.getFullYear() });
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', date: '', type: 'meeting' });

  const daysInMonth = new Date(current.year, current.month + 1, 0).getDate();
  const firstDay = new Date(current.year, current.month, 1).getDay();

  const prevMonth = () => setCurrent(c => c.month === 0 ? { month: 11, year: c.year - 1 } : { ...c, month: c.month - 1 });
  const nextMonth = () => setCurrent(c => c.month === 11 ? { month: 0, year: c.year + 1 } : { ...c, month: c.month + 1 });

  const getEventsForDay = (day) => {
    const dateStr = `${current.year}-${String(current.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  const isToday = (day) =>
    day === today.getDate() &&
    today.getMonth() === current.month &&
    today.getFullYear() === current.year;

  const upcomingEvents = events
    .filter(e => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 6);

  const typeColors = { deadline: '#ef4444', meeting: '#2563eb', payment: '#f59e00', task: '#10b981' };

  const handleAddEvent = () => {
    if (!form.title || !form.date) return;
    const newEvent = {
      id: Date.now(),
      title: form.title,
      date: form.date,
      type: form.type,
      color: typeColors[form.type],
    };
    setEvents(prev => [...prev, newEvent]);
    setShowModal(false);
    setForm({ title: '', date: '', type: 'meeting' });
  };

  return (
    <Layout>
      <style>{`
        /* ── Calendar topbar ── */
        .cal-topbar {
          position: sticky; top: 0; z-index: 10;
          background: var(--topbar-bg);
          border-bottom: 1px solid var(--divider);
          padding: 12px 24px;
          display: flex; align-items: center; gap: 12px;
          margin: -1.5rem -1.5rem 1.5rem;
        }
        .cal-topbar-month {
          font-size: 16px; font-weight: 700;
          color: var(--topbar-text);
          min-width: 160px; text-align: center;
        }
        .cal-nav-btn {
          background: var(--input-bg);
          border: 1px solid var(--input-border);
          border-radius: 8px;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.15s; color: var(--text-primary);
        }
        .cal-nav-btn:hover { background: var(--accent-glow); border-color: var(--accent); }
        .cal-nav-btn svg { stroke: var(--text-primary); }
        .cal-today-btn {
          background: var(--input-bg); border: 1px solid var(--input-border);
          border-radius: 8px; padding: 6px 14px;
          font-size: 13px; font-weight: 600; color: var(--text-primary);
          cursor: pointer; transition: all 0.15s; font-family: inherit;
        }
        .cal-today-btn:hover { background: var(--accent-glow); border-color: var(--accent); color: var(--accent); }
        .cal-add-btn {
          margin-left: auto;
          background: var(--accent); border: none; border-radius: 10px;
          padding: 9px 18px; font-size: 13px; font-weight: 700;
          color: #fff; cursor: pointer; transition: all 0.15s;
          display: flex; align-items: center; gap: 6px; font-family: inherit;
        }
        .cal-add-btn:hover { background: var(--accent-hover); transform: translateY(-1px); }

        /* ── Calendar grid ── */
        .cal-layout { display: grid; grid-template-columns: 1fr 280px; gap: 16px; }
        .cal-grid-wrap {
          background: var(--card); border: 1px solid var(--card-border);
          border-radius: 16px; overflow: hidden;
        }
        .cal-day-headers {
          display: grid; grid-template-columns: repeat(7, 1fr);
          border-bottom: 1px solid var(--divider);
        }
        .cal-day-header {
          padding: 10px 0; text-align: center;
          font-size: 11px; font-weight: 700; letter-spacing: 0.06em;
          text-transform: uppercase; color: var(--text-muted);
        }
        .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); }
        .cal-cell {
          min-height: 80px; padding: 8px 6px;
          border-right: 1px solid var(--divider);
          border-bottom: 1px solid var(--divider);
          cursor: pointer; transition: background 0.1s;
          position: relative;
        }
        .cal-cell:hover { background: var(--accent-glow); }
        .cal-cell:nth-child(7n) { border-right: none; }
        .cal-cell-empty { min-height: 80px; border-right: 1px solid var(--divider); border-bottom: 1px solid var(--divider); }
        .cal-cell-empty:nth-child(7n) { border-right: none; }
        .cal-day-num {
          font-size: 13px; font-weight: 600; color: var(--text-secondary);
          margin-bottom: 4px; display: flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border-radius: 50%;
        }
        .cal-day-num.today {
          background: var(--accent); color: #fff; font-weight: 800;
        }
        .cal-event-pill {
          font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 4px;
          margin-bottom: 2px; white-space: nowrap; overflow: hidden;
          text-overflow: ellipsis; color: #fff; opacity: 0.9;
        }
        .cal-more { font-size: 10px; color: var(--text-muted); margin-top: 1px; }

        /* ── Sidebar panels ── */
        .cal-sidebar { display: flex; flex-direction: column; gap: 12px; }
        .cal-panel {
          background: var(--card); border: 1px solid var(--card-border);
          border-radius: 14px; padding: 16px 18px;
        }
        .cal-panel-title {
          font-size: 11px; font-weight: 700; letter-spacing: 0.07em;
          text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px;
        }
        .event-type-row {
          display: flex; align-items: center; gap: 8px; padding: 4px 0;
          font-size: 13px; font-weight: 500; color: var(--text-primary);
        }
        .event-type-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .upcoming-item {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 10px 0; border-bottom: 1px solid var(--divider);
        }
        .upcoming-item:last-child { border-bottom: none; padding-bottom: 0; }
        .upcoming-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 4px; }
        .upcoming-title { font-size: 13px; font-weight: 600; color: var(--text-primary); }
        .upcoming-date { font-size: 11px; color: var(--text-secondary); margin-top: 2px; }

        /* ── Modal ── */
        .modal-backdrop {
          position: fixed; inset: 0; z-index: 200;
          background: var(--modal-overlay);
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(4px);
          animation: fadeIn 0.15s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .modal-box {
          background: var(--modal-bg);
          border: 1px solid var(--card-border);
          border-radius: 16px; padding: 28px;
          width: 100%; max-width: 460px;
          box-shadow: var(--shadow);
          animation: slideUp 0.2s ease;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .modal-title {
          font-size: 17px; font-weight: 700;
          color: var(--modal-text); margin: 0 0 20px;
        }
        .modal-field { margin-bottom: 14px; }
        .modal-label {
          display: block; font-size: 11px; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--text-secondary); margin-bottom: 6px;
        }
        .modal-input {
          width: 100%; background: var(--modal-input-bg);
          border: 1px solid var(--modal-input-border);
          color: var(--modal-input-text);
          border-radius: 8px; padding: 10px 12px; font-size: 14px;
          font-family: inherit; outline: none; box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .modal-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }
        .modal-input::placeholder { color: var(--text-muted); }
        .modal-footer { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
        .modal-cancel {
          background: transparent; border: 1px solid var(--input-border);
          border-radius: 8px; padding: 9px 18px; font-size: 13px; font-weight: 600;
          color: var(--text-secondary); cursor: pointer; transition: all 0.15s; font-family: inherit;
        }
        .modal-cancel:hover { background: var(--accent-glow); border-color: var(--accent); color: var(--accent); }
        .modal-confirm {
          background: var(--accent); border: none; border-radius: 8px;
          padding: 9px 20px; font-size: 13px; font-weight: 700;
          color: #fff; cursor: pointer; transition: all 0.15s; font-family: inherit;
        }
        .modal-confirm:hover { background: var(--accent-hover); }
        .modal-confirm:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>

      {/* ── Topbar ── */}
      <div className="cal-topbar">
        <button className="cal-nav-btn" onClick={prevMonth}>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="cal-topbar-month">{MONTHS[current.month]} {current.year}</span>
        <button className="cal-nav-btn" onClick={nextMonth}>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
        <button className="cal-today-btn" onClick={() => setCurrent({ month: today.getMonth(), year: today.getFullYear() })}>
          Today
        </button>
        <button className="cal-add-btn" onClick={() => setShowModal(true)}>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Event
        </button>
      </div>

      {/* ── Page header ── */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Calendar</h1>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '4px 0 0' }}>Deadlines, meetings, and payments at a glance</p>
      </div>

      {/* ── Main layout ── */}
      <div className="cal-layout">
        {/* Grid */}
        <div className="cal-grid-wrap">
          <div className="cal-day-headers">
            {DAYS.map(d => <div key={d} className="cal-day-header">{d}</div>)}
          </div>
          <div className="cal-grid">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="cal-cell-empty" />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
              const dayEvents = getEventsForDay(day);
              return (
                <div
                  key={day}
                  className="cal-cell"
                  onClick={() => setSelected(selected === day ? null : day)}
                >
                  <div className={`cal-day-num${isToday(day) ? ' today' : ''}`}>{day}</div>
                  {dayEvents.slice(0, 2).map(ev => (
                    <div key={ev.id} className="cal-event-pill" style={{ background: ev.color }}>
                      {ev.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="cal-more">+{dayEvents.length - 2}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="cal-sidebar">
          <div className="cal-panel">
            <div className="cal-panel-title">Event Types</div>
            {Object.entries(typeColors).map(([type, color]) => (
              <div key={type} className="event-type-row">
                <span className="event-type-dot" style={{ background: color }} />
                <span style={{ textTransform: 'capitalize' }}>{type}</span>
              </div>
            ))}
          </div>

          <div className="cal-panel">
            <div className="cal-panel-title">Upcoming Events</div>
            {upcomingEvents.length === 0 ? (
              <div style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', padding: '16px 0' }}>No upcoming events</div>
            ) : upcomingEvents.map(ev => (
              <div key={ev.id} className="upcoming-item">
                <span className="upcoming-dot" style={{ background: ev.color }} />
                <div>
                  <div className="upcoming-title">{ev.title}</div>
                  <div className="upcoming-date">
                    {new Date(ev.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Add Event Modal ── */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Add Event</div>

            <div className="modal-field">
              <label className="modal-label">Event Title</label>
              <input
                className="modal-input"
                placeholder="e.g. Client Meeting"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="modal-field">
              <label className="modal-label">Date</label>
              <input
                className="modal-input"
                type="date"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
              />
            </div>

            <div className="modal-field">
              <label className="modal-label">Type</label>
              <select
                className="modal-input"
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value })}
              >
                <option value="meeting">Meeting</option>
                <option value="deadline">Deadline</option>
                <option value="payment">Payment</option>
                <option value="task">Task</option>
              </select>
            </div>

            <div className="modal-footer">
              <button className="modal-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button
                className="modal-confirm"
                onClick={handleAddEvent}
                disabled={!form.title || !form.date}
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}