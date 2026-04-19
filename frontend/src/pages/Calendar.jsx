// // import { useState, useEffect } from 'react';
// // import Layout from '../components/Layout';
// // import '../styles/flow.css';

// // const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
// // const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

// // const MOCK_EVENTS = [
// //   { id: 1, title: 'SEO Deadline', date: '2026-04-14', type: 'deadline', color: '#ef4444' },
// //   { id: 2, title: 'Client Call — LogoGen', date: '2026-04-16', type: 'meeting', color: '#2563eb' },
// //   { id: 3, title: 'Website Redesign Due', date: '2026-04-22', type: 'deadline', color: '#ef4444' },
// //   { id: 4, title: 'Invoice #INV-002 Due', date: '2026-04-18', type: 'payment', color: '#f59e0b' },
// //   { id: 5, title: 'StartupXYZ Kickoff', date: '2026-04-25', type: 'meeting', color: '#10b981' },
// //   { id: 6, title: 'Brand Co. Review', date: '2026-04-30', type: 'meeting', color: '#2563eb' },
// // ];

// // export default function Calendar() {
// //   const today = new Date();
// //   const [current, setCurrent] = useState({ month: today.getMonth(), year: today.getFullYear() });
// //   const [events] = useState(MOCK_EVENTS);
// //   const [selected, setSelected] = useState(null);
// //   const [showModal, setShowModal] = useState(false);
// //   const [form, setForm] = useState({ title: '', date: '', type: 'meeting' });

// //   const daysInMonth = new Date(current.year, current.month + 1, 0).getDate();
// //   const firstDay = new Date(current.year, current.month, 1).getDay();

// //   const prevMonth = () => setCurrent(c => c.month === 0 ? { month: 11, year: c.year - 1 } : { ...c, month: c.month - 1 });
// //   const nextMonth = () => setCurrent(c => c.month === 11 ? { month: 0, year: c.year + 1 } : { ...c, month: c.month + 1 });

// //   const getEventsForDay = (day) => {
// //     const dateStr = `${current.year}-${String(current.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
// //     return events.filter(e => e.date === dateStr);
// //   };

// //   const isToday = (day) => today.getDate() === day && today.getMonth() === current.month && today.getFullYear() === current.year;

// //   const upcomingEvents = events
// //     .filter(e => new Date(e.date) >= today)
// //     .sort((a, b) => new Date(a.date) - new Date(b.date))
// //     .slice(0, 6);

// //   const typeColors = { deadline: '#ef4444', meeting: '#2563eb', payment: '#f59e0b', task: '#10b981' };

// //   return (
// //     <Layout>
// //       <div className="topbar">
// //         <div className="flex items-center gap-3">
// //           <button className="icon-btn" onClick={prevMonth}>
// //             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
// //           </button>
// //           <span style={{ fontWeight: 600, fontSize: 15, minWidth: 160, textAlign: 'center' }}>{MONTHS[current.month]} {current.year}</span>
// //           <button className="icon-btn" onClick={nextMonth}>
// //             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
// //           </button>
// //           <button className="btn btn-ghost btn-sm" onClick={() => setCurrent({ month: today.getMonth(), year: today.getFullYear() })}>Today</button>
// //         </div>
// //         <button className="btn btn-blue" onClick={() => setShowModal(true)}>
// //           <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
// //           Add Event
// //         </button>
// //       </div>

// //       <div className="page-header">
// //         <h1 className="page-title">Calendar</h1>
// //         <p className="page-subtitle">Deadlines, meetings, and payments at a glance</p>
// //       </div>

// //       <div className="page-body" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20 }}>
// //         <div className="card">
// //           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 8 }}>
// //             {DAYS.map(d => (
// //               <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', padding: '6px 0' }}>{d}</div>
// //             ))}
// //           </div>
// //           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
// //             {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
// //             {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
// //               const dayEvents = getEventsForDay(day);
// //               return (
// //                 <div
// //                   key={day}
// //                   onClick={() => setSelected(selected === day ? null : day)}
// //                   style={{
// //                     minHeight: 72, padding: '8px 6px', borderRadius: 8, cursor: 'pointer',
// //                     background: selected === day ? 'var(--blue-light)' : isToday(day) ? 'var(--blue)' : 'transparent',
// //                     border: selected === day ? '1.5px solid var(--blue)' : '1.5px solid transparent',
// //                     transition: 'all 0.15s',
// //                   }}
// //                 >
// //                   <div style={{ fontSize: 13, fontWeight: 600, color: isToday(day) ? '#fff' : 'var(--text-primary)', marginBottom: 4 }}>{day}</div>
// //                   {dayEvents.slice(0, 2).map(ev => (
// //                     <div key={ev.id} style={{ fontSize: 10, padding: '2px 5px', borderRadius: 4, background: ev.color + '22', color: ev.color, fontWeight: 600, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
// //                       {ev.title}
// //                     </div>
// //                   ))}
// //                   {dayEvents.length > 2 && <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>+{dayEvents.length - 2}</div>}
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </div>

// //         <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
// //           {/* Legend */}
// //           <div className="card" style={{ padding: 16 }}>
// //             <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: 10 }}>Event Types</div>
// //             {Object.entries(typeColors).map(([type, color]) => (
// //               <div key={type} className="flex items-center gap-2" style={{ marginBottom: 8 }}>
// //                 <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0 }} />
// //                 <span style={{ fontSize: 13, textTransform: 'capitalize' }}>{type}</span>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Upcoming events */}
// //           <div className="card" style={{ padding: 16, flex: 1 }}>
// //             <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: 12 }}>Upcoming Events</div>
// //             {upcomingEvents.length === 0 ? (
// //               <div style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', padding: 16 }}>No upcoming events</div>
// //             ) : upcomingEvents.map(ev => (
// //               <div key={ev.id} className="flex items-center gap-3" style={{ marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid var(--border-light)' }}>
// //                 <div style={{ width: 8, height: 8, borderRadius: '50%', background: ev.color, flexShrink: 0, marginTop: 2 }} />
// //                 <div style={{ flex: 1, minWidth: 0 }}>
// //                   <div style={{ fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.title}</div>
// //                   <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>
// //                     {new Date(ev.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>

// //       {showModal && (
// //         <div className="modal-overlay" onClick={() => setShowModal(false)}>
// //           <div className="modal" onClick={e => e.stopPropagation()}>
// //             <div className="modal-title">Add Event</div>
// //             <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
// //               <div>
// //                 <label className="form-label" style={{ marginBottom: 6, display: 'block' }}>Event Title</label>
// //                 <input className="app-input" placeholder="e.g. Client Meeting" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
// //               </div>
// //               <div>
// //                 <label className="form-label" style={{ marginBottom: 6, display: 'block' }}>Date</label>
// //                 <input className="app-input" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
// //               </div>
// //               <div>
// //                 <label className="form-label" style={{ marginBottom: 6, display: 'block' }}>Type</label>
// //                 <select className="app-select" style={{ width: '100%' }} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
// //                   <option value="meeting">Meeting</option>
// //                   <option value="deadline">Deadline</option>
// //                   <option value="payment">Payment</option>
// //                   <option value="task">Task</option>
// //                 </select>
// //               </div>
// //             </div>
// //             <div className="modal-footer">
// //               <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
// //               <button className="btn btn-blue" onClick={() => setShowModal(false)}>Add Event</button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </Layout>
// //   );
// // }

// import { useState, useEffect } from 'react';
// import Layout from '../components/Layout';
// import '../styles/flow.css';

// const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
// const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

// const MOCK_EVENTS = [
//   { id: 1, title: 'SEO Deadline', date: '2026-04-14', type: 'deadline', color: '#ef4444' },
//   { id: 2, title: 'Client Call — LogoGen', date: '2026-04-16', type: 'meeting', color: '#2563eb' },
//   { id: 3, title: 'Website Redesign Due', date: '2026-04-22', type: 'deadline', color: '#ffc300' },
//   { id: 4, title: 'Invoice #INV-002 Due', date: '2026-04-18', type: 'payment', color: '#f59e00' },
//   { id: 5, title: 'StartupXYZ Kickoff', date: '2026-04-25', type: 'meeting', color: '#2563eb' },
//   { id: 6, title: 'Brand Co. Review', date: '2026-04-30', type: 'meeting', color: '#2563eb' },
// ];

// export default function Calendar() {
//   const today = new Date();
//   const [current, setCurrent] = useState({ month: today.getMonth(), year: today.getFullYear() });
//   const [events, setEvents] = useState(MOCK_EVENTS);
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

//   const isToday = (day) =>
//     day === today.getDate() &&
//     today.getMonth() === current.month &&
//     today.getFullYear() === current.year;

//   const upcomingEvents = events
//     .filter(e => new Date(e.date) >= today)
//     .sort((a, b) => new Date(a.date) - new Date(b.date))
//     .slice(0, 6);

//   const typeColors = { deadline: '#ef4444', meeting: '#2563eb', payment: '#f59e00', task: '#10b981' };

//   const handleAddEvent = () => {
//     if (!form.title || !form.date) return;
//     const newEvent = {
//       id: Date.now(),
//       title: form.title,
//       date: form.date,
//       type: form.type,
//       color: typeColors[form.type],
//     };
//     setEvents(prev => [...prev, newEvent]);
//     setShowModal(false);
//     setForm({ title: '', date: '', type: 'meeting' });
//   };

//   return (
//     <Layout>
//       <style>{`
//         /* ── Calendar topbar ── */
//         .cal-topbar {
//           position: sticky; top: 0; z-index: 10;
//           background: var(--topbar-bg);
//           border-bottom: 1px solid var(--divider);
//           padding: 12px 24px;
//           display: flex; align-items: center; gap: 12px;
//           margin: -1.5rem -1.5rem 1.5rem;
//         }
//         .cal-topbar-month {
//           font-size: 16px; font-weight: 700;
//           color: var(--topbar-text);
//           min-width: 160px; text-align: center;
//         }
//         .cal-nav-btn {
//           background: var(--input-bg);
//           border: 1px solid var(--input-border);
//           border-radius: 8px;
//           width: 32px; height: 32px;
//           display: flex; align-items: center; justify-content: center;
//           cursor: pointer; transition: all 0.15s; color: var(--text-primary);
//         }
//         .cal-nav-btn:hover { background: var(--accent-glow); border-color: var(--accent); }
//         .cal-nav-btn svg { stroke: var(--text-primary); }
//         .cal-today-btn {
//           background: var(--input-bg); border: 1px solid var(--input-border);
//           border-radius: 8px; padding: 6px 14px;
//           font-size: 13px; font-weight: 600; color: var(--text-primary);
//           cursor: pointer; transition: all 0.15s; font-family: inherit;
//         }
//         .cal-today-btn:hover { background: var(--accent-glow); border-color: var(--accent); color: var(--accent); }
//         .cal-add-btn {
//           margin-left: auto;
//           background: var(--accent); border: none; border-radius: 10px;
//           padding: 9px 18px; font-size: 13px; font-weight: 700;
//           color: #fff; cursor: pointer; transition: all 0.15s;
//           display: flex; align-items: center; gap: 6px; font-family: inherit;
//         }
//         .cal-add-btn:hover { background: var(--accent-hover); transform: translateY(-1px); }

//         /* ── Calendar grid ── */
//         .cal-layout { display: grid; grid-template-columns: 1fr 280px; gap: 16px; }
//         .cal-grid-wrap {
//           background: var(--card); border: 1px solid var(--card-border);
//           border-radius: 16px; overflow: hidden;
//         }
//         .cal-day-headers {
//           display: grid; grid-template-columns: repeat(7, 1fr);
//           border-bottom: 1px solid var(--divider);
//         }
//         .cal-day-header {
//           padding: 10px 0; text-align: center;
//           font-size: 11px; font-weight: 700; letter-spacing: 0.06em;
//           text-transform: uppercase; color: var(--text-muted);
//         }
//         .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); }
//         .cal-cell {
//           min-height: 80px; padding: 8px 6px;
//           border-right: 1px solid var(--divider);
//           border-bottom: 1px solid var(--divider);
//           cursor: pointer; transition: background 0.1s;
//           position: relative;
//         }
//         .cal-cell:hover { background: var(--accent-glow); }
//         .cal-cell:nth-child(7n) { border-right: none; }
//         .cal-cell-empty { min-height: 80px; border-right: 1px solid var(--divider); border-bottom: 1px solid var(--divider); }
//         .cal-cell-empty:nth-child(7n) { border-right: none; }
//         .cal-day-num {
//           font-size: 13px; font-weight: 600; color: var(--text-secondary);
//           margin-bottom: 4px; display: flex; align-items: center; justify-content: center;
//           width: 26px; height: 26px; border-radius: 50%;
//         }
//         .cal-day-num.today {
//           background: var(--accent); color: #fff; font-weight: 800;
//         }
//         .cal-event-pill {
//           font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 4px;
//           margin-bottom: 2px; white-space: nowrap; overflow: hidden;
//           text-overflow: ellipsis; color: #fff; opacity: 0.9;
//         }
//         .cal-more { font-size: 10px; color: var(--text-muted); margin-top: 1px; }

//         /* ── Sidebar panels ── */
//         .cal-sidebar { display: flex; flex-direction: column; gap: 12px; }
//         .cal-panel {
//           background: var(--card); border: 1px solid var(--card-border);
//           border-radius: 14px; padding: 16px 18px;
//         }
//         .cal-panel-title {
//           font-size: 11px; font-weight: 700; letter-spacing: 0.07em;
//           text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px;
//         }
//         .event-type-row {
//           display: flex; align-items: center; gap: 8px; padding: 4px 0;
//           font-size: 13px; font-weight: 500; color: var(--text-primary);
//         }
//         .event-type-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
//         .upcoming-item {
//           display: flex; align-items: flex-start; gap: 10px;
//           padding: 10px 0; border-bottom: 1px solid var(--divider);
//         }
//         .upcoming-item:last-child { border-bottom: none; padding-bottom: 0; }
//         .upcoming-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 4px; }
//         .upcoming-title { font-size: 13px; font-weight: 600; color: var(--text-primary); }
//         .upcoming-date { font-size: 11px; color: var(--text-secondary); margin-top: 2px; }

//         /* ── Modal ── */
//         .modal-backdrop {
//           position: fixed; inset: 0; z-index: 200;
//           background: var(--modal-overlay);
//           display: flex; align-items: center; justify-content: center;
//           backdrop-filter: blur(4px);
//           animation: fadeIn 0.15s ease;
//         }
//         @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
//         .modal-box {
//           background: var(--modal-bg);
//           border: 1px solid var(--card-border);
//           border-radius: 16px; padding: 28px;
//           width: 100%; max-width: 460px;
//           box-shadow: var(--shadow);
//           animation: slideUp 0.2s ease;
//         }
//         @keyframes slideUp {
//           from { opacity: 0; transform: translateY(16px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .modal-title {
//           font-size: 17px; font-weight: 700;
//           color: var(--modal-text); margin: 0 0 20px;
//         }
//         .modal-field { margin-bottom: 14px; }
//         .modal-label {
//           display: block; font-size: 11px; font-weight: 700;
//           letter-spacing: 0.06em; text-transform: uppercase;
//           color: var(--text-secondary); margin-bottom: 6px;
//         }
//         .modal-input {
//           width: 100%; background: var(--modal-input-bg);
//           border: 1px solid var(--modal-input-border);
//           color: var(--modal-input-text);
//           border-radius: 8px; padding: 10px 12px; font-size: 14px;
//           font-family: inherit; outline: none; box-sizing: border-box;
//           transition: border-color 0.2s;
//         }
//         .modal-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }
//         .modal-input::placeholder { color: var(--text-muted); }
//         .modal-footer { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
//         .modal-cancel {
//           background: transparent; border: 1px solid var(--input-border);
//           border-radius: 8px; padding: 9px 18px; font-size: 13px; font-weight: 600;
//           color: var(--text-secondary); cursor: pointer; transition: all 0.15s; font-family: inherit;
//         }
//         .modal-cancel:hover { background: var(--accent-glow); border-color: var(--accent); color: var(--accent); }
//         .modal-confirm {
//           background: var(--accent); border: none; border-radius: 8px;
//           padding: 9px 20px; font-size: 13px; font-weight: 700;
//           color: #fff; cursor: pointer; transition: all 0.15s; font-family: inherit;
//         }
//         .modal-confirm:hover { background: var(--accent-hover); }
//         .modal-confirm:disabled { opacity: 0.5; cursor: not-allowed; }
//       `}</style>

//       {/* ── Topbar ── */}
//       <div className="cal-topbar">
//         <button className="cal-nav-btn" onClick={prevMonth}>
//           <svg width="14" height="14" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
//             <polyline points="15 18 9 12 15 6" />
//           </svg>
//         </button>
//         <span className="cal-topbar-month">{MONTHS[current.month]} {current.year}</span>
//         <button className="cal-nav-btn" onClick={nextMonth}>
//           <svg width="14" height="14" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
//             <polyline points="9 18 15 12 9 6" />
//           </svg>
//         </button>
//         <button className="cal-today-btn" onClick={() => setCurrent({ month: today.getMonth(), year: today.getFullYear() })}>
//           Today
//         </button>
//         <button className="cal-add-btn" onClick={() => setShowModal(true)}>
//           <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
//             <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
//           </svg>
//           Add Event
//         </button>
//       </div>

//       {/* ── Page header ── */}
//       <div style={{ marginBottom: 20 }}>
//         <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Calendar</h1>
//         <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '4px 0 0' }}>Deadlines, meetings, and payments at a glance</p>
//       </div>

//       {/* ── Main layout ── */}
//       <div className="cal-layout">
//         {/* Grid */}
//         <div className="cal-grid-wrap">
//           <div className="cal-day-headers">
//             {DAYS.map(d => <div key={d} className="cal-day-header">{d}</div>)}
//           </div>
//           <div className="cal-grid">
//             {Array.from({ length: firstDay }).map((_, i) => (
//               <div key={`empty-${i}`} className="cal-cell-empty" />
//             ))}
//             {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
//               const dayEvents = getEventsForDay(day);
//               return (
//                 <div
//                   key={day}
//                   className="cal-cell"
//                   onClick={() => setSelected(selected === day ? null : day)}
//                 >
//                   <div className={`cal-day-num${isToday(day) ? ' today' : ''}`}>{day}</div>
//                   {dayEvents.slice(0, 2).map(ev => (
//                     <div key={ev.id} className="cal-event-pill" style={{ background: ev.color }}>
//                       {ev.title}
//                     </div>
//                   ))}
//                   {dayEvents.length > 2 && (
//                     <div className="cal-more">+{dayEvents.length - 2}</div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Sidebar */}
//         <div className="cal-sidebar">
//           <div className="cal-panel">
//             <div className="cal-panel-title">Event Types</div>
//             {Object.entries(typeColors).map(([type, color]) => (
//               <div key={type} className="event-type-row">
//                 <span className="event-type-dot" style={{ background: color }} />
//                 <span style={{ textTransform: 'capitalize' }}>{type}</span>
//               </div>
//             ))}
//           </div>

//           <div className="cal-panel">
//             <div className="cal-panel-title">Upcoming Events</div>
//             {upcomingEvents.length === 0 ? (
//               <div style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', padding: '16px 0' }}>No upcoming events</div>
//             ) : upcomingEvents.map(ev => (
//               <div key={ev.id} className="upcoming-item">
//                 <span className="upcoming-dot" style={{ background: ev.color }} />
//                 <div>
//                   <div className="upcoming-title">{ev.title}</div>
//                   <div className="upcoming-date">
//                     {new Date(ev.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ── Add Event Modal ── */}
//       {showModal && (
//         <div className="modal-backdrop" onClick={() => setShowModal(false)}>
//           <div className="modal-box" onClick={e => e.stopPropagation()}>
//             <div className="modal-title">Add Event</div>

//             <div className="modal-field">
//               <label className="modal-label">Event Title</label>
//               <input
//                 className="modal-input"
//                 placeholder="e.g. Client Meeting"
//                 value={form.title}
//                 onChange={e => setForm({ ...form, title: e.target.value })}
//               />
//             </div>

//             <div className="modal-field">
//               <label className="modal-label">Date</label>
//               <input
//                 className="modal-input"
//                 type="date"
//                 value={form.date}
//                 onChange={e => setForm({ ...form, date: e.target.value })}
//               />
//             </div>

//             <div className="modal-field">
//               <label className="modal-label">Type</label>
//               <select
//                 className="modal-input"
//                 value={form.type}
//                 onChange={e => setForm({ ...form, type: e.target.value })}
//               >
//                 <option value="meeting">Meeting</option>
//                 <option value="deadline">Deadline</option>
//                 <option value="payment">Payment</option>
//                 <option value="task">Task</option>
//               </select>
//             </div>

//             <div className="modal-footer">
//               <button className="modal-cancel" onClick={() => setShowModal(false)}>Cancel</button>
//               <button
//                 className="modal-confirm"
//                 onClick={handleAddEvent}
//                 disabled={!form.title || !form.date}
//               >
//                 Add Event
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </Layout>
//   );
// }

import { useState, useEffect, useCallback } from 'react';
import Layout from '../components/Layout';
import { useTheme } from '../context/ThemeContext';
import { getProjects } from '../api/api';

// ─── Constants ─────────────────────────────────────────────────────────────────

const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];
const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const TYPE_META = {
  meeting:  { color: '#63b4ff', bg: 'rgba(99,180,255,0.15)',  label: 'Meeting'  },
  deadline: { color: '#f87171', bg: 'rgba(248,113,113,0.15)', label: 'Deadline' },
  payment:  { color: '#facc15', bg: 'rgba(250,204,21,0.15)',  label: 'Payment'  },
  task:     { color: '#4ade80', bg: 'rgba(74,222,128,0.15)',  label: 'Task'     },
};

const LS_KEY = 'flow_calendar_events';

// ─── localStorage helpers ──────────────────────────────────────────────────────

const loadLocalEvents = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; }
  catch { return []; }
};
const saveLocalEvents = (evs) => {
  localStorage.setItem(LS_KEY, JSON.stringify(evs));
};

// ─── Derive calendar events from real project data ─────────────────────────────

function projectsToEvents(projects) {
  const evs = [];
  projects.forEach(p => {
    // Project deadline → deadline event
    if (p.deadline) {
      evs.push({
        id:        `proj-dl-${p._id}`,
        title:     `${p.title} — deadline`,
        date:      p.deadline.slice(0, 10),
        type:      'deadline',
        source:    'project',
        sourceId:  p._id,
        readOnly:  true,
      });
    }
    // Pending payment with deadline → payment event
    if (p.paymentStatus === 'pending' && p.deadline) {
      evs.push({
        id:        `proj-pay-${p._id}`,
        title:     `Payment due — ${p.title}`,
        date:      p.deadline.slice(0, 10),
        type:      'payment',
        source:    'project',
        sourceId:  p._id,
        readOnly:  true,
      });
    }
    // Tasks with due dates
    (p.tasks || []).forEach(t => {
      if (t.dueDate) {
        evs.push({
          id:        `task-${t._id || t.id || Math.random()}`,
          title:     t.title,
          date:      t.dueDate.slice(0, 10),
          type:      'task',
          source:    'task',
          sourceId:  t._id,
          readOnly:  true,
        });
      }
    });
  });
  return evs;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

const pad = (n) => String(n).padStart(2, '0');
const dateStr = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
const fmtDate = (iso) => new Date(iso + 'T12:00:00').toLocaleDateString('en-US', {
  weekday: 'short', month: 'short', day: 'numeric',
});
const fmtFull = (iso) => new Date(iso + 'T12:00:00').toLocaleDateString('en-US', {
  weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
});

// ─── Theme tokens ──────────────────────────────────────────────────────────────

function useTokens(theme) {
  const dark = theme !== 'light';
  return {
    page:          dark ? '#0d0d1a'                              : '#f4f6fb',
    card:          dark ? 'rgba(255,255,255,0.055)'              : '#ffffff',
    card2:         dark ? 'rgba(255,255,255,0.02)'               : '#f9fafc',
    cardBorder:    dark ? 'rgba(255,255,255,0.08)'               : 'rgba(0,0,0,0.07)',
    divider:       dark ? 'rgba(255,255,255,0.06)'               : 'rgba(0,0,0,0.06)',
    cellHover:     dark ? 'rgba(99,180,255,0.06)'                : 'rgba(59,130,246,0.04)',
    cellSelected:  dark ? 'rgba(99,180,255,0.1)'                 : 'rgba(59,130,246,0.08)',
    textPrimary:   dark ? '#f0f0ff'                              : '#111827',
    textSecondary: dark ? 'rgba(255,255,255,0.45)'               : '#6b7280',
    textMuted:     dark ? 'rgba(255,255,255,0.25)'               : '#9ca3af',
    todayBg:       dark ? '#63b4ff'                              : '#2563eb',
    todayText:     '#ffffff',
    navBtn:        dark ? 'rgba(255,255,255,0.07)'               : 'rgba(0,0,0,0.05)',
    navBtnBorder:  dark ? 'rgba(255,255,255,0.1)'                : 'rgba(0,0,0,0.1)',
    navBtnHover:   dark ? 'rgba(99,180,255,0.15)'                : 'rgba(59,130,246,0.1)',
    inputBg:       dark ? 'rgba(255,255,255,0.07)'               : '#f9fafb',
    inputBorder:   dark ? 'rgba(255,255,255,0.12)'               : 'rgba(0,0,0,0.12)',
    inputText:     dark ? '#f0f0ff'                              : '#111827',
    inputFocus:    dark ? '#63b4ff'                              : '#2563eb',
    modalBg:       dark ? 'linear-gradient(160deg,#13132a,#0e0e20)' : '#ffffff',
    modalBorder:   dark ? 'rgba(255,255,255,0.1)'                : 'rgba(0,0,0,0.08)',
    overlay:       dark ? 'rgba(0,0,0,0.75)'                     : 'rgba(0,0,0,0.4)',
    accent:        '#63b4ff',
    accentPurple:  '#a78bfa',
    selectBg:      dark ? '#1a1a2e'                              : '#ffffff',
    readOnlyBadge: dark ? 'rgba(255,255,255,0.08)'               : 'rgba(0,0,0,0.06)',
    readOnlyText:  dark ? 'rgba(255,255,255,0.35)'               : '#9ca3af',
    deleteRed:     '#f87171',
  };
}

// ─── Small reusable components ─────────────────────────────────────────────────

function NavBtn({ onClick, children, t }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 34, height: 34, borderRadius: 9, border: `1px solid ${t.navBtnBorder}`,
        background: hov ? t.navBtnHover : t.navBtn,
        color: hov ? t.accent : t.textSecondary,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'all 0.15s', flexShrink: 0,
      }}
    >{children}</button>
  );
}

function TypeDot({ type, size = 8 }) {
  return (
    <span style={{
      width: size, height: size, borderRadius: '50%',
      background: TYPE_META[type]?.color || '#aaa',
      display: 'inline-block', flexShrink: 0,
    }} />
  );
}

// ─── Day detail popover ────────────────────────────────────────────────────────

function DayPopover({ day, year, month, events, t, onClose, onAdd, onEdit, onDelete }) {
  const ds = dateStr(year, month, day);
  const dayEvs = events.filter(e => e.date === ds);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 150,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: t.overlay, backdropFilter: 'blur(3px)',
        animation: 'calFadeIn 0.15s ease',
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: 360, background: t.modalBg, border: `1px solid ${t.modalBorder}`,
          borderRadius: 18, padding: '22px 22px 18px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
          animation: 'calSlideUp 0.18s ease',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: t.textPrimary }}>
              {MONTHS[month].slice(0, 3)} {day}
            </div>
            <div style={{ fontSize: 12, color: t.textSecondary, marginTop: 2 }}>
              {new Date(year, month, day).toLocaleDateString('en-US', { weekday: 'long' })}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              onClick={() => { onAdd(ds); onClose(); }}
              style={{
                padding: '6px 12px', borderRadius: 8, border: 'none',
                background: 'linear-gradient(135deg,#63b4ff,#a78bfa)',
                color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer',
              }}
            >+ Add</button>
            <button
              onClick={onClose}
              style={{
                width: 28, height: 28, borderRadius: 7, border: `1px solid ${t.cardBorder}`,
                background: 'transparent', color: t.textSecondary, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
              }}
            >✕</button>
          </div>
        </div>

        {/* Events list */}
        {dayEvs.length === 0 ? (
          <div style={{ padding: '24px 0', textAlign: 'center', color: t.textMuted, fontSize: 13 }}>
            <div style={{ fontSize: 28, marginBottom: 8, opacity: 0.4 }}>📅</div>
            Nothing scheduled — click + Add to create an event
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {dayEvs.map(ev => (
              <div
                key={ev.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', borderRadius: 10,
                  background: TYPE_META[ev.type]?.bg || 'rgba(255,255,255,0.05)',
                  border: `1px solid ${TYPE_META[ev.type]?.color || '#aaa'}33`,
                }}
              >
                <TypeDot type={ev.type} size={9} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.textPrimary,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {ev.title}
                  </div>
                  <div style={{ fontSize: 10, color: t.textSecondary, marginTop: 1, textTransform: 'capitalize' }}>
                    {ev.type}
                    {ev.readOnly && (
                      <span style={{
                        marginLeft: 6, padding: '1px 6px', borderRadius: 4,
                        background: t.readOnlyBadge, color: t.readOnlyText, fontSize: 9,
                      }}>from projects</span>
                    )}
                  </div>
                </div>
                {/* Only manual events can be edited / deleted */}
                {!ev.readOnly && (
                  <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
                    <button
                      onClick={() => { onEdit(ev); onClose(); }}
                      style={{
                        width: 26, height: 26, borderRadius: 6, border: `1px solid ${t.cardBorder}`,
                        background: 'transparent', color: t.textSecondary,
                        cursor: 'pointer', fontSize: 13,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                      title="Edit event"
                    >✎</button>
                    <button
                      onClick={() => onDelete(ev.id)}
                      style={{
                        width: 26, height: 26, borderRadius: 6,
                        border: `1px solid ${t.deleteRed}33`,
                        background: `${t.deleteRed}12`, color: t.deleteRed,
                        cursor: 'pointer', fontSize: 13,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                      title="Delete event"
                    >🗑</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Add / Edit Event Modal ────────────────────────────────────────────────────

function EventModal({ t, theme, initial, onClose, onSave }) {
  const isEdit = !!initial?.id;
  const [form, setForm] = useState({
    title: initial?.title || '',
    date:  initial?.date  || '',
    type:  initial?.type  || 'meeting',
    notes: initial?.notes || '',
  });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const inp = {
    width: '100%', padding: '10px 13px', borderRadius: 9,
    border: `1px solid ${t.inputBorder}`, background: t.inputBg,
    color: t.inputText, fontSize: 13, outline: 'none',
    boxSizing: 'border-box', fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  };
  const lbl = {
    display: 'block', fontSize: 11, fontWeight: 700,
    letterSpacing: '0.07em', textTransform: 'uppercase',
    color: t.textSecondary, marginBottom: 6,
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: t.overlay, backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20, animation: 'calFadeIn 0.15s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 440,
          background: t.modalBg, border: `1px solid ${t.modalBorder}`,
          borderRadius: 18, padding: '26px 26px 22px',
          boxShadow: '0 24px 72px rgba(0,0,0,0.45)',
          animation: 'calSlideUp 0.18s ease',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: t.textPrimary }}>
              {isEdit ? 'Edit Event' : 'Add Event'}
            </h2>
            <p style={{ margin: '3px 0 0', fontSize: 12, color: t.textSecondary }}>
              {isEdit ? 'Update the details below' : 'Fill in the event details'}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32, height: 32, borderRadius: 8, border: `1px solid ${t.cardBorder}`,
              background: 'transparent', color: t.textSecondary, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15,
            }}
          >✕</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Title */}
          <div>
            <label style={lbl}>Event Title *</label>
            <input
              style={inp} placeholder="e.g. Client Meeting"
              value={form.title} onChange={e => set('title', e.target.value)}
              onFocus={e  => e.target.style.borderColor = t.inputFocus}
              onBlur={e   => e.target.style.borderColor = t.inputBorder}
              autoFocus
            />
          </div>

          {/* Date + Type row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={lbl}>Date *</label>
              <input
                type="date" style={{ ...inp, colorScheme: theme === 'light' ? 'light' : 'dark' }}
                value={form.date} onChange={e => set('date', e.target.value)}
                onFocus={e  => e.target.style.borderColor = t.inputFocus}
                onBlur={e   => e.target.style.borderColor = t.inputBorder}
              />
            </div>
            <div>
              <label style={lbl}>Type</label>
              <select
                style={{ ...inp, background: t.selectBg, cursor: 'pointer' }}
                value={form.type} onChange={e => set('type', e.target.value)}
                onFocus={e  => e.target.style.borderColor = t.inputFocus}
                onBlur={e   => e.target.style.borderColor = t.inputBorder}
              >
                {Object.entries(TYPE_META).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label style={lbl}>Notes <span style={{ textTransform: 'none', fontWeight: 400, opacity: 0.6 }}>(optional)</span></label>
            <textarea
              style={{ ...inp, resize: 'vertical', minHeight: 68, lineHeight: 1.5 }}
              placeholder="Any extra details…"
              value={form.notes} onChange={e => set('notes', e.target.value)}
              onFocus={e  => e.target.style.borderColor = t.inputFocus}
              onBlur={e   => e.target.style.borderColor = t.inputBorder}
            />
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20 }}>
          <button
            onClick={onClose}
            style={{
              padding: '9px 20px', borderRadius: 9, border: `1px solid ${t.navBtnBorder}`,
              background: 'transparent', color: t.textSecondary,
              fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
            }}
            onMouseEnter={e => e.currentTarget.style.background = t.navBtn}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >Cancel</button>
          <button
            onClick={() => { if (form.title && form.date) onSave(form); }}
            disabled={!form.title || !form.date}
            style={{
              padding: '9px 22px', borderRadius: 9, border: 'none',
              background: form.title && form.date
                ? 'linear-gradient(135deg,#63b4ff 0%,#a78bfa 100%)'
                : 'rgba(99,180,255,0.3)',
              color: '#fff', fontSize: 13, fontWeight: 700,
              cursor: form.title && form.date ? 'pointer' : 'not-allowed',
              fontFamily: 'inherit', transition: 'opacity 0.15s',
            }}
          >{isEdit ? 'Save Changes' : 'Add Event'}</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Calendar ─────────────────────────────────────────────────────────────

export default function Calendar() {
  const { theme }  = useTheme();
  const t          = useTokens(theme);
  const today      = new Date();

  const [current,    setCurrent]    = useState({ month: today.getMonth(), year: today.getFullYear() });
  const [manualEvs,  setManualEvs]  = useState(loadLocalEvents);   // user-created, persisted
  const [projectEvs, setProjectEvs] = useState([]);                 // pulled from API, read-only
  const [loading,    setLoading]    = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);             // day-popover
  const [modal,      setModal]      = useState(null);               // null | { mode:'add'|'edit', prefillDate, event }

  // Merge all events for display
  const allEvents = [...projectEvs, ...manualEvs];

  // ── Fetch project/task data ────────────────────────────────────────────────
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      const list = data?.projects || data || [];
      setProjectEvs(projectsToEvents(list));
    } catch (err) {
      console.error('Calendar: failed to load projects', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  // ── Persist manual events ─────────────────────────────────────────────────
  useEffect(() => { saveLocalEvents(manualEvs); }, [manualEvs]);

  // ── Navigation ────────────────────────────────────────────────────────────
  const prevMonth = () => setCurrent(c => c.month === 0
    ? { month: 11, year: c.year - 1 } : { ...c, month: c.month - 1 });
  const nextMonth = () => setCurrent(c => c.month === 11
    ? { month: 0, year: c.year + 1 } : { ...c, month: c.month + 1 });
  const goToday   = () => setCurrent({ month: today.getMonth(), year: today.getFullYear() });

  // ── Calendar grid ─────────────────────────────────────────────────────────
  const daysInMonth = new Date(current.year, current.month + 1, 0).getDate();
  const firstDay    = new Date(current.year, current.month, 1).getDay();
  const totalCells  = Math.ceil((firstDay + daysInMonth) / 7) * 7;

  const getEventsForDay = (day) => {
    const ds = dateStr(current.year, current.month, day);
    return allEvents.filter(e => e.date === ds);
  };

  const isToday = (day) =>
    day === today.getDate() &&
    today.getMonth() === current.month &&
    today.getFullYear() === current.year;

  // ── Sidebar data ──────────────────────────────────────────────────────────
  const upcomingEvents = allEvents
    .filter(e => e.date >= today.toISOString().slice(0, 10))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 8);

  const thisMonthEvs = allEvents.filter(e => {
    const d = new Date(e.date + 'T12:00:00');
    return d.getMonth() === current.month && d.getFullYear() === current.year;
  });

  // ── CRUD handlers ─────────────────────────────────────────────────────────
  const handleSaveEvent = (form) => {
    if (modal?.mode === 'edit') {
      setManualEvs(prev => prev.map(e =>
        e.id === modal.event.id
          ? { ...e, title: form.title, date: form.date, type: form.type, notes: form.notes }
          : e
      ));
    } else {
      setManualEvs(prev => [...prev, {
        id:    `manual-${Date.now()}`,
        title: form.title,
        date:  form.date,
        type:  form.type,
        notes: form.notes,
        readOnly: false,
      }]);
    }
    setModal(null);
  };

  const handleDeleteEvent = (id) => {
    setManualEvs(prev => prev.filter(e => e.id !== id));
    setSelectedDay(null);
  };

  const openAddModal = (prefillDate = '') => setModal({ mode: 'add', prefillDate });
  const openEditModal = (event) => setModal({ mode: 'edit', event });

  // ── Styles ────────────────────────────────────────────────────────────────
  const cardBase = {
    background: `linear-gradient(145deg,${t.card} 0%,${t.card2} 100%)`,
    border: `1px solid ${t.cardBorder}`,
    borderRadius: 16,
  };

  return (
    <Layout>
      <style>{`
        @keyframes calFadeIn  { from{opacity:0}              to{opacity:1} }
        @keyframes calSlideUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes calCardIn  { from{opacity:0;transform:translateY(8px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer    { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        .cal-cell-hover:hover { background: ${t.cellHover} !important; }
        .cal-cell-hover:hover .cal-add-hint { opacity: 1 !important; }
        .upcoming-row:hover { background: ${t.cellHover} !important; }
      `}</style>

      <div style={{
        padding: '24px 28px 32px',
        minHeight: '100vh',
        background: t.page === '#0d0d1a' ? 'transparent' : t.page,
        animation: 'calCardIn 0.3s ease',
      }}>

        {/* ── Page header + nav ── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          marginBottom: 24, flexWrap: 'wrap',
        }}>
          {/* Title */}
          <div style={{ flex: 1, minWidth: 180 }}>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: t.textPrimary, margin: 0, letterSpacing: '-0.3px' }}>
              Calendar
            </h1>
            <p style={{ fontSize: 13, color: t.textSecondary, margin: '3px 0 0' }}>
              Deadlines, meetings &amp; payments at a glance
            </p>
          </div>

          {/* Month nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <NavBtn onClick={prevMonth} t={t}>
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </NavBtn>
            <div style={{
              minWidth: 170, textAlign: 'center',
              fontSize: 15, fontWeight: 700, color: t.textPrimary,
            }}>
              {MONTHS[current.month]} {current.year}
            </div>
            <NavBtn onClick={nextMonth} t={t}>
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </NavBtn>
            <button
              onClick={goToday}
              style={{
                padding: '7px 14px', borderRadius: 9, fontFamily: 'inherit',
                border: `1px solid ${t.navBtnBorder}`, background: t.navBtn,
                color: t.textSecondary, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = t.navBtnHover; e.currentTarget.style.color = t.accent; }}
              onMouseLeave={e => { e.currentTarget.style.background = t.navBtn; e.currentTarget.style.color = t.textSecondary; }}
            >Today</button>
          </div>

          {/* Add event button */}
          <button
            onClick={() => openAddModal()}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '9px 18px', borderRadius: 11, border: 'none',
              background: 'linear-gradient(135deg,#63b4ff 0%,#a78bfa 100%)',
              color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(99,180,255,0.3)',
              transition: 'transform 0.15s,box-shadow 0.15s',
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 22px rgba(99,180,255,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(99,180,255,0.3)'; }}
          >
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.8">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Event
          </button>
        </div>

        {/* ── Main 2-column layout ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 268px',
          gap: 20,
          alignItems: 'start',
        }}>

          {/* ── Left: calendar grid ── */}
          <div style={{ ...cardBase, overflow: 'hidden', animation: 'calCardIn 0.35s ease both' }}>

            {/* Day-of-week headers */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(7,1fr)',
              borderBottom: `1px solid ${t.divider}`,
            }}>
              {DAYS.map(d => (
                <div key={d} style={{
                  padding: '11px 0', textAlign: 'center',
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
                  textTransform: 'uppercase', color: t.textMuted,
                }}>{d}</div>
              ))}
            </div>

            {/* Loading shimmer */}
            {loading ? (
              <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[1,2,3,4,5].map(r => (
                  <div key={r} style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4 }}>
                    {Array.from({length: 7}).map((_, i) => (
                      <div key={i} style={{
                        height: 72, borderRadius: 8,
                        background: theme === 'light'
                          ? 'linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%)'
                          : 'linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.09) 50%,rgba(255,255,255,0.04) 75%)',
                        backgroundSize: '400px 100%',
                        animation: 'shimmer 1.4s infinite linear',
                      }} />
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              /* Grid cells */
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)' }}>
                {Array.from({ length: totalCells }, (_, idx) => {
                  const day = idx - firstDay + 1;
                  const isValid = day >= 1 && day <= daysInMonth;
                  const dayEvs  = isValid ? getEventsForDay(day) : [];
                  const isTod   = isValid && isToday(day);
                  const isSel   = isValid && selectedDay === day;
                  const isWknd  = idx % 7 === 0 || idx % 7 === 6;

                  return (
                    <div
                      key={idx}
                      className={isValid ? 'cal-cell-hover' : ''}
                      onClick={() => isValid && setSelectedDay(day === selectedDay ? null : day)}
                      style={{
                        minHeight: 90,
                        padding: '8px 7px 6px',
                        borderRight: (idx + 1) % 7 === 0 ? 'none' : `1px solid ${t.divider}`,
                        borderBottom: idx >= totalCells - 7 ? 'none' : `1px solid ${t.divider}`,
                        cursor: isValid ? 'pointer' : 'default',
                        background: isSel ? t.cellSelected
                          : !isValid ? (theme === 'light' ? 'rgba(0,0,0,0.015)' : 'rgba(0,0,0,0.15)')
                          : isWknd ? (theme === 'light' ? 'rgba(0,0,0,0.012)' : 'rgba(255,255,255,0.008)')
                          : 'transparent',
                        position: 'relative',
                        transition: 'background 0.12s',
                      }}
                    >
                      {isValid && (
                        <>
                          {/* Day number */}
                          <div style={{
                            width: 26, height: 26, borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 12, fontWeight: isTod ? 800 : 500,
                            background: isTod ? t.todayBg : 'transparent',
                            color: isTod ? t.todayText : t.textSecondary,
                            marginBottom: 4,
                          }}>{day}</div>

                          {/* Event pills — max 2 shown */}
                          {dayEvs.slice(0, 2).map(ev => (
                            <div
                              key={ev.id}
                              title={ev.title}
                              style={{
                                fontSize: 10, fontWeight: 600,
                                padding: '2px 5px', borderRadius: 4, marginBottom: 2,
                                background: TYPE_META[ev.type]?.color || '#aaa',
                                color: '#fff',
                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                opacity: 0.9,
                              }}
                            >{ev.title}</div>
                          ))}
                          {dayEvs.length > 2 && (
                            <div style={{ fontSize: 10, color: t.textMuted, marginTop: 1 }}>
                              +{dayEvs.length - 2} more
                            </div>
                          )}

                          {/* Hover hint */}
                          <div
                            className="cal-add-hint"
                            style={{
                              position: 'absolute', bottom: 5, right: 6,
                              fontSize: 15, color: t.textMuted, opacity: 0,
                              transition: 'opacity 0.15s', pointerEvents: 'none',
                              lineHeight: 1,
                            }}
                          >+</div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Right sidebar ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Month summary */}
            <div style={{ ...cardBase, padding: '16px 18px', animation: 'calCardIn 0.4s ease both' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
                textTransform: 'uppercase', color: t.textMuted, marginBottom: 12 }}>
                This Month
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {Object.entries(TYPE_META).map(([type, meta]) => {
                  const count = thisMonthEvs.filter(e => e.type === type).length;
                  return (
                    <div key={type} style={{
                      padding: '10px 12px', borderRadius: 10,
                      background: meta.bg,
                      border: `1px solid ${meta.color}33`,
                    }}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: meta.color }}>{count}</div>
                      <div style={{ fontSize: 10, fontWeight: 600, color: meta.color,
                        textTransform: 'capitalize', opacity: 0.85, marginTop: 1 }}>{meta.label}s</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Event legend */}
            <div style={{ ...cardBase, padding: '16px 18px', animation: 'calCardIn 0.45s ease both' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
                textTransform: 'uppercase', color: t.textMuted, marginBottom: 12 }}>
                Event Types
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {Object.entries(TYPE_META).map(([type, meta]) => (
                  <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <TypeDot type={type} size={9} />
                    <span style={{ fontSize: 13, fontWeight: 500, color: t.textPrimary, textTransform: 'capitalize' }}>
                      {meta.label}
                    </span>
                  </div>
                ))}
                <div style={{ marginTop: 6, paddingTop: 10, borderTop: `1px solid ${t.divider}`,
                  fontSize: 11, color: t.textMuted, lineHeight: 1.5 }}>
                  Deadlines &amp; payments sync automatically from your Projects page.
                </div>
              </div>
            </div>

            {/* Upcoming events */}
            <div style={{ ...cardBase, padding: '16px 18px', animation: 'calCardIn 0.5s ease both' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
                textTransform: 'uppercase', color: t.textMuted, marginBottom: 12 }}>
                Upcoming
              </div>
              {loading ? (
                <div style={{ color: t.textMuted, fontSize: 13, padding: '8px 0' }}>Loading…</div>
              ) : upcomingEvents.length === 0 ? (
                <div style={{ color: t.textMuted, fontSize: 13, textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ fontSize: 26, marginBottom: 6, opacity: 0.35 }}>🗓</div>
                  Nothing coming up
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {upcomingEvents.map((ev, idx) => (
                    <div
                      key={ev.id}
                      className="upcoming-row"
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: 10,
                        padding: '9px 8px', borderRadius: 8,
                        borderBottom: idx < upcomingEvents.length - 1 ? `1px solid ${t.divider}` : 'none',
                        cursor: 'default', transition: 'background 0.12s',
                      }}
                    >
                      <div style={{
                        width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                        background: TYPE_META[ev.type]?.bg || 'rgba(255,255,255,0.05)',
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center',
                      }}>
                        <span style={{ fontSize: 11, fontWeight: 800, lineHeight: 1,
                          color: TYPE_META[ev.type]?.color || '#aaa' }}>
                          {new Date(ev.date + 'T12:00:00').getDate()}
                        </span>
                        <span style={{ fontSize: 8, lineHeight: 1, marginTop: 1,
                          color: TYPE_META[ev.type]?.color || '#aaa', opacity: 0.8 }}>
                          {MONTHS[new Date(ev.date + 'T12:00:00').getMonth()].slice(0, 3).toUpperCase()}
                        </span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: t.textPrimary,
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {ev.title}
                        </div>
                        <div style={{ fontSize: 10, color: t.textSecondary, marginTop: 2, textTransform: 'capitalize' }}>
                          {ev.type}
                        </div>
                      </div>
                      {!ev.readOnly && (
                        <button
                          onClick={() => openEditModal(ev)}
                          style={{
                            width: 22, height: 22, borderRadius: 5, border: `1px solid ${t.cardBorder}`,
                            background: 'transparent', color: t.textMuted, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 11, flexShrink: 0,
                          }}
                          title="Edit"
                        >✎</button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ── Day detail popover ── */}
      {selectedDay !== null && (
        <DayPopover
          day={selectedDay}
          year={current.year}
          month={current.month}
          events={allEvents}
          t={t}
          onClose={() => setSelectedDay(null)}
          onAdd={(prefillDate) => { setSelectedDay(null); openAddModal(prefillDate); }}
          onEdit={openEditModal}
          onDelete={handleDeleteEvent}
        />
      )}

      {/* ── Add / Edit modal ── */}
      {modal && (
        <EventModal
          t={t}
          theme={theme}
          initial={modal.mode === 'edit'
            ? modal.event
            : { date: modal.prefillDate || '' }
          }
          onClose={() => setModal(null)}
          onSave={handleSaveEvent}
        />
      )}
    </Layout>
  );
}