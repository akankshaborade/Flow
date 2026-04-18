import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import '../styles/flow.css';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const MOCK_EVENTS = [
  { id: 1, title: 'SEO Deadline', date: '2026-04-14', type: 'deadline', color: '#ef4444' },
  { id: 2, title: 'Client Call — LogoGen', date: '2026-04-16', type: 'meeting', color: '#2563eb' },
  { id: 3, title: 'Website Redesign Due', date: '2026-04-22', type: 'deadline', color: '#ef4444' },
  { id: 4, title: 'Invoice #INV-002 Due', date: '2026-04-18', type: 'payment', color: '#f59e0b' },
  { id: 5, title: 'StartupXYZ Kickoff', date: '2026-04-25', type: 'meeting', color: '#10b981' },
  { id: 6, title: 'Brand Co. Review', date: '2026-04-30', type: 'meeting', color: '#2563eb' },
];

export default function Calendar() {
  const today = new Date();
  const [current, setCurrent] = useState({ month: today.getMonth(), year: today.getFullYear() });
  const [events] = useState(MOCK_EVENTS);
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

  const isToday = (day) => today.getDate() === day && today.getMonth() === current.month && today.getFullYear() === current.year;

  const upcomingEvents = events
    .filter(e => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 6);

  const typeColors = { deadline: '#ef4444', meeting: '#2563eb', payment: '#f59e0b', task: '#10b981' };

  return (
    <Layout>
      <div className="topbar">
        <div className="flex items-center gap-3">
          <button className="icon-btn" onClick={prevMonth}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <span style={{ fontWeight: 600, fontSize: 15, minWidth: 160, textAlign: 'center' }}>{MONTHS[current.month]} {current.year}</span>
          <button className="icon-btn" onClick={nextMonth}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => setCurrent({ month: today.getMonth(), year: today.getFullYear() })}>Today</button>
        </div>
        <button className="btn btn-blue" onClick={() => setShowModal(true)}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Event
        </button>
      </div>

      <div className="page-header">
        <h1 className="page-title">Calendar</h1>
        <p className="page-subtitle">Deadlines, meetings, and payments at a glance</p>
      </div>

      <div className="page-body" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20 }}>
        <div className="card">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 8 }}>
            {DAYS.map(d => (
              <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', padding: '6px 0' }}>{d}</div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
            {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
              const dayEvents = getEventsForDay(day);
              return (
                <div
                  key={day}
                  onClick={() => setSelected(selected === day ? null : day)}
                  style={{
                    minHeight: 72, padding: '8px 6px', borderRadius: 8, cursor: 'pointer',
                    background: selected === day ? 'var(--blue-light)' : isToday(day) ? 'var(--blue)' : 'transparent',
                    border: selected === day ? '1.5px solid var(--blue)' : '1.5px solid transparent',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 600, color: isToday(day) ? '#fff' : 'var(--text-primary)', marginBottom: 4 }}>{day}</div>
                  {dayEvents.slice(0, 2).map(ev => (
                    <div key={ev.id} style={{ fontSize: 10, padding: '2px 5px', borderRadius: 4, background: ev.color + '22', color: ev.color, fontWeight: 600, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {ev.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>+{dayEvents.length - 2}</div>}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Legend */}
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: 10 }}>Event Types</div>
            {Object.entries(typeColors).map(([type, color]) => (
              <div key={type} className="flex items-center gap-2" style={{ marginBottom: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0 }} />
                <span style={{ fontSize: 13, textTransform: 'capitalize' }}>{type}</span>
              </div>
            ))}
          </div>

          {/* Upcoming events */}
          <div className="card" style={{ padding: 16, flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: 12 }}>Upcoming Events</div>
            {upcomingEvents.length === 0 ? (
              <div style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', padding: 16 }}>No upcoming events</div>
            ) : upcomingEvents.map(ev => (
              <div key={ev.id} className="flex items-center gap-3" style={{ marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: ev.color, flexShrink: 0, marginTop: 2 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>
                    {new Date(ev.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Add Event</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label className="form-label" style={{ marginBottom: 6, display: 'block' }}>Event Title</label>
                <input className="app-input" placeholder="e.g. Client Meeting" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div>
                <label className="form-label" style={{ marginBottom: 6, display: 'block' }}>Date</label>
                <input className="app-input" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
              </div>
              <div>
                <label className="form-label" style={{ marginBottom: 6, display: 'block' }}>Type</label>
                <select className="app-select" style={{ width: '100%' }} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                  <option value="meeting">Meeting</option>
                  <option value="deadline">Deadline</option>
                  <option value="payment">Payment</option>
                  <option value="task">Task</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-blue" onClick={() => setShowModal(false)}>Add Event</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}