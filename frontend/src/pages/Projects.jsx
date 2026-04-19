import { useState, useEffect, useCallback } from 'react';
import Layout from '../components/Layout';
import {
  getProjects, createProject, updateProject, deleteProject,
  getClients,
  getTasksByProject, createTask, updateTask, deleteTask, markTaskComplete,
} from '../api/api';
import toast from 'react-hot-toast';

// ── Design tokens (matching your existing dark app) ───────────────────────────
const S = {
  active:      { bg: 'rgba(99,180,255,0.12)',  text: '#63b4ff' },
  completed:   { bg: 'rgba(99,202,183,0.12)',  text: '#63cab7' },
  'on-hold':   { bg: 'rgba(251,191,36,0.12)',  text: '#fbbf24' },
  paid:        { bg: 'rgba(99,202,183,0.12)',  text: '#63cab7' },
  pending:     { bg: 'rgba(251,191,36,0.12)',  text: '#fbbf24' },
  'in-progress':{ bg: 'rgba(99,180,255,0.12)', text: '#63b4ff' },
};

const Pill = ({ label }) => (
  <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: S[label]?.bg || 'rgba(255,255,255,0.08)', color: S[label]?.text || 'rgba(255,255,255,0.5)' }}>
    {label}
  </span>
);

const Spin = ({ size = 16 }) => (
  <span style={{ display: 'inline-block', width: size, height: size, border: '2px solid rgba(255,255,255,0.15)', borderTopColor: '#63b4ff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', flexShrink: 0 }} />
);

const iS = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '9px 13px', fontSize: 13, color: '#e8e8f8', outline: 'none', fontFamily: 'inherit', width: '100%', boxSizing: 'border-box', transition: 'border-color 0.2s,box-shadow 0.2s' };
const lS = { display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 5 };

function onF(e) { e.target.style.borderColor = 'rgba(99,180,255,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(99,180,255,0.08)'; }
function onB(e) { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }

// ── Modal shell ───────────────────────────────────────────────────────────────
function Modal({ title, subtitle, onClose, maxWidth = 520, children }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth, background: 'linear-gradient(145deg,#161625,#111120)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 18, padding: '26px 26px 22px', boxShadow: '0 24px 80px rgba(0,0,0,0.6)', animation: 'slideUp 0.2s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#f0f0ff' }}>{title}</h2>
            {subtitle && <p style={{ margin: '3px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{subtitle}</p>}
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', width: 30, height: 30, borderRadius: 8, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── Project form ──────────────────────────────────────────────────────────────
const PF_EMPTY = { title: '', description: '', client: '', deadline: '', status: 'active', paymentStatus: 'pending', amount: '' };

function ProjectForm({ initial, clients, onSubmit, onClose, saving }) {
  const [form, setForm] = useState(PF_EMPTY);

  useEffect(() => {
    setForm(initial ? {
      title:         initial.title         || '',
      description:   initial.description   || '',
      client:        initial.client?._id   || initial.client || '',
      deadline:      initial.deadline      ? initial.deadline.split('T')[0] : '',
      status:        initial.status        || 'active',
      paymentStatus: initial.paymentStatus || 'pending',
      amount:        initial.amount        ?? '',
    } : PF_EMPTY);
  }, [initial]);

  const set = e => setForm({ ...form, [e.target.name]: e.target.value });
  const can = form.title.trim() && form.client;

  const submit = e => {
    e.preventDefault();
    if (!can) return;
    onSubmit({
      title:         form.title.trim(),
      description:   form.description.trim(),
      client:        form.client,           // clientId — required by backend
      deadline:      form.deadline || undefined,
      status:        form.status,
      paymentStatus: form.paymentStatus,
      amount:        Number(form.amount) || 0,
    });
  };

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <label style={lS}>Project Title *</label>
        <input style={iS} name="title" value={form.title} onChange={set} onFocus={onF} onBlur={onB} placeholder="e.g. Website Redesign" required />
      </div>

      {/* Client dropdown — links project to client via clientId */}
      <div>
        <label style={lS}>Client * <span style={{ opacity: 0.4, fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(required)</span></label>
        <select style={{ ...iS, cursor: 'pointer' }} name="client" value={form.client} onChange={set} required>
          <option value="">Select a client…</option>
          {clients.map(c => <option key={c._id} value={c._id}>{c.name}{c.company ? ` — ${c.company}` : ''}</option>)}
        </select>
      </div>

      <div>
        <label style={lS}>Description</label>
        <textarea style={{ ...iS, resize: 'vertical', minHeight: 64, lineHeight: 1.5 }} name="description" value={form.description} onChange={set} onFocus={onF} onBlur={onB} placeholder="What does this project involve?" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={lS}>Deadline</label>
          <input style={iS} type="date" name="deadline" value={form.deadline} onChange={set} onFocus={onF} onBlur={onB} />
        </div>
        <div>
          <label style={lS}>Amount (₹)</label>
          <input style={iS} type="number" name="amount" value={form.amount} onChange={set} onFocus={onF} onBlur={onB} placeholder="0" min="0" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={lS}>Status</label>
          <select style={{ ...iS, cursor: 'pointer' }} name="status" value={form.status} onChange={set}>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
        </div>
        <div>
          <label style={lS}>Payment</label>
          <select style={{ ...iS, cursor: 'pointer' }} name="paymentStatus" value={form.paymentStatus} onChange={set}>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
        <button type="button" onClick={onClose} style={{ padding: '9px 18px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
        <button type="submit" disabled={saving || !can} style={{ padding: '9px 22px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#63b4ff,#a78bfa)', color: '#fff', fontSize: 13, fontWeight: 700, cursor: saving || !can ? 'not-allowed' : 'pointer', opacity: !can ? 0.5 : 1, display: 'flex', alignItems: 'center', gap: 8 }}>
          {saving ? <><Spin size={13} />Saving…</> : initial ? 'Save Changes' : 'Create Project'}
        </button>
      </div>
    </form>
  );
}

// ── Task panel (opens over a project) ─────────────────────────────────────────
function TaskPanel({ project, onClose }) {
  const [tasks, setTasks]   = useState([]);
  const [loading, setLoad]  = useState(true);
  const [title, setTitle]   = useState('');
  const [date, setDate]     = useState('');
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    // projectId passed to backend as URL param
    getTasksByProject(project._id)
      .then(d => setTasks(Array.isArray(d) ? d : []))
      .finally(() => setLoad(false));
  }, [project._id]);

  const addTask = async e => {
    e.preventDefault();
    if (!title.trim()) return;
    setAdding(true);
    try {
      // Backend expects body: { title, dueDate, projectId }
      const t = await createTask({ title: title.trim(), dueDate: date || undefined, projectId: project._id });
      setTasks(p => [t, ...p]);
      setTitle(''); setDate('');
      toast.success('Task added!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add task');
    } finally { setAdding(false); }
  };

  const complete = async id => {
    const t = await markTaskComplete(id);
    setTasks(p => p.map(x => x._id === id ? t : x));
  };

  const changeStatus = async (id, status) => {
    const t = await updateTask(id, { status });
    setTasks(p => p.map(x => x._id === id ? t : x));
  };

  const remove = async id => {
    await deleteTask(id);
    setTasks(p => p.filter(x => x._id !== id));
    toast.success('Task deleted');
  };

  const done    = tasks.filter(t => t.status === 'completed').length;
  const pending = tasks.length - done;

  return (
    <Modal title={`📋 ${project.title}`} subtitle={`${pending} pending · ${done} done`} onClose={onClose} maxWidth={540}>
      {/* Add task */}
      <form onSubmit={addTask} style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <input style={{ ...iS, flex: 1 }} placeholder="New task title…" value={title} onChange={e => setTitle(e.target.value)} required />
        <input style={{ ...iS, width: 140, flexShrink: 0 }} type="date" value={date} onChange={e => setDate(e.target.value)} />
        <button type="submit" disabled={adding || !title.trim()} style={{ flexShrink: 0, padding: '9px 16px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#63b4ff,#a78bfa)', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
          {adding ? <Spin size={13} /> : '+ Add'}
        </button>
      </form>

      {/* Task list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 360, overflowY: 'auto', paddingRight: 2 }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 28 }}><Spin /></div>
        ) : tasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '28px 0', color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>No tasks yet — add one above</div>
        ) : tasks.map(t => {
          const done = t.status === 'completed';
          return (
            <div key={t._id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 9, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.045)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.025)'}>
              {/* Checkbox */}
              <button onClick={() => !done && complete(t._id)} title="Mark complete"
                style={{ width: 18, height: 18, flexShrink: 0, borderRadius: 5, border: `2px solid ${done ? '#63cab7' : 'rgba(255,255,255,0.2)'}`, background: done ? '#63cab7' : 'transparent', cursor: done ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
                {done && <span style={{ color: '#0d1117', fontSize: 10, fontWeight: 900, lineHeight: 1 }}>✓</span>}
              </button>

              {/* Title */}
              <span style={{ flex: 1, fontSize: 13, color: done ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.8)', textDecoration: done ? 'line-through' : 'none' }}>{t.title}</span>

              {/* Due date */}
              {t.dueDate && <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', flexShrink: 0 }}>{new Date(t.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>}

              {/* Status select */}
              <select value={t.status} onChange={e => changeStatus(t._id, e.target.value)}
                style={{ fontSize: 11, background: S[t.status]?.bg || 'transparent', color: S[t.status]?.text || '#fff', border: 'none', borderRadius: 6, padding: '3px 8px', cursor: 'pointer', fontWeight: 700, outline: 'none', flexShrink: 0 }}>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

              {/* Delete */}
              <button onClick={() => remove(t._id)} title="Delete task"
                style={{ background: 'none', border: 'none', color: 'rgba(239,68,68,0.35)', cursor: 'pointer', fontSize: 13, padding: '2px 4px', borderRadius: 4, transition: 'color 0.15s', flexShrink: 0 }}
                onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(239,68,68,0.35)'}>✕</button>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

// ── Project card ──────────────────────────────────────────────────────────────
const GRADS = [['#63b4ff','#a78bfa'],['#63cab7','#63b4ff'],['#ffc300','#f97316'],['#a78bfa','#f472b6'],['#34d399','#63b4ff']];
const grad = str => GRADS[(str?.charCodeAt(0) || 0) % GRADS.length];

function ProjectCard({ project, onEdit, onDelete, onTasks }) {
  const [hov, setHov] = useState(false);
  const [del, setDel] = useState(false);
  const g = grad(project.title);

  const handleDelete = () => {
    if (!del) { setDel(true); return; }
    onDelete(project._id);
  };

  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => { setHov(false); setDel(false); }}
      style={{ background: hov ? 'linear-gradient(135deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))' : 'linear-gradient(135deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01))', border: `1px solid ${hov ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 16, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 12, transition: 'all 0.2s', transform: hov ? 'translateY(-2px)' : 'none', boxShadow: hov ? '0 8px 32px rgba(0,0,0,0.3)' : 'none', position: 'relative', overflow: 'hidden' }}>

      {/* Glow blob */}
      <div style={{ position: 'absolute', top: -30, left: -30, width: 100, height: 100, borderRadius: '50%', background: `linear-gradient(135deg,${g[0]},${g[1]})`, opacity: hov ? 0.06 : 0.02, filter: 'blur(28px)', pointerEvents: 'none', transition: 'opacity 0.3s' }} />

      {/* Title + status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: '#f0f0ff', lineHeight: 1.3 }}>{project.title}</h3>
        <Pill label={project.status} />
      </div>

      {/* Client */}
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{ opacity: 0.5 }}>👤</span>
        {project.client?.name || 'No client'}
        {project.client?.company && <span style={{ opacity: 0.5 }}>· {project.client.company}</span>}
      </div>

      {/* Description */}
      {project.description && (
        <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.3)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {project.description}
        </p>
      )}

      {/* Amount + payment */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 16, fontWeight: 800, color: S[project.paymentStatus]?.text || '#fff' }}>
          ₹{(project.amount || 0).toLocaleString('en-IN')}
        </span>
        <Pill label={project.paymentStatus} />
      </div>

      {/* Deadline */}
      {project.deadline && (
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)' }}>
          📅 {new Date(project.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        </div>
      )}

      <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '2px -2px' }} />

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => onTasks(project)}
          style={{ flex: 1, padding: '7px 0', borderRadius: 8, border: 'none', background: 'rgba(99,180,255,0.1)', color: '#63b4ff', fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'background 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,180,255,0.18)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(99,180,255,0.1)'}>
          📋 Tasks
        </button>
        <button onClick={() => onEdit(project)}
          style={{ flex: 1, padding: '7px 0', borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'background 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
          ✏️ Edit
        </button>
        <button onClick={handleDelete}
          style={{ padding: '7px 12px', borderRadius: 8, border: 'none', background: del ? 'rgba(239,68,68,0.2)' : 'rgba(239,68,68,0.07)', color: del ? '#ef4444' : 'rgba(239,68,68,0.4)', fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.18)'; e.currentTarget.style.color = '#ef4444'; }}
          onMouseLeave={e => { if (!del) { e.currentTarget.style.background = 'rgba(239,68,68,0.07)'; e.currentTarget.style.color = 'rgba(239,68,68,0.4)'; } }}>
          {del ? '⚠️ Sure?' : '🗑️'}
        </button>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [clients,  setClients]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [filter,   setFilter]   = useState('all');
  const [search,   setSearch]   = useState('');
  const [projModal, setProjModal] = useState(null); // null | 'new' | project
  const [taskPanel, setTaskPanel] = useState(null); // null | project

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [pRes, cRes] = await Promise.all([getProjects(), getClients()]);
      setProjects(pRes.projects || []);
      setClients(cRes.clients   || []);
    } catch { toast.error('Failed to load data'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  // ── CRUD ────────────────────────────────────────────────────────────────────
  const handleCreate = async form => {
    setSaving(true);
    try {
      const res = await createProject(form);
      if (res.project) {
        setProjects(p => [res.project, ...p]);
        setProjModal(null);
        toast.success('Project created! 🎉');
      } else { toast.error(res.message || 'Failed'); }
    } catch (err) { toast.error(err.response?.data?.message || 'Server error'); }
    finally { setSaving(false); }
  };

  const handleUpdate = async form => {
    setSaving(true);
    try {
      const res = await updateProject(projModal._id, form);
      if (res.project) {
        setProjects(p => p.map(x => x._id === res.project._id ? res.project : x));
        setProjModal(null);
        toast.success('Project updated!');
      } else { toast.error(res.message || 'Failed'); }
    } catch (err) { toast.error(err.response?.data?.message || 'Server error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async id => {
    try {
      await deleteProject(id);
      setProjects(p => p.filter(x => x._id !== id));
      toast.success('Project deleted');
    } catch { toast.error('Could not delete project'); }
  };

  // ── Filter + search ─────────────────────────────────────────────────────────
  const visible = projects
    .filter(p => filter === 'all' || p.status === filter)
    .filter(p => {
      const q = search.toLowerCase();
      return !q || p.title.toLowerCase().includes(q) || p.client?.name?.toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q);
    });

  const counts = {
    all:       projects.length,
    active:    projects.filter(p => p.status === 'active').length,
    completed: projects.filter(p => p.status === 'completed').length,
    'on-hold': projects.filter(p => p.status === 'on-hold').length,
  };

  const earned  = projects.filter(p => p.paymentStatus === 'paid').reduce((s, p) => s + (p.amount || 0), 0);
  const pending = projects.filter(p => p.paymentStatus === 'pending').reduce((s, p) => s + (p.amount || 0), 0);

  return (
    <Layout>
      <style>{`
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes slideUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes cardIn  { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        select option { background: #161625; color: #e8e8f8; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        .pf-input::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>

      <div style={{ padding: '24px 28px', minHeight: '100vh' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap', gap: 14 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#f0f0ff', margin: 0 }}>Projects</h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>
              {loading ? 'Loading…' : `${projects.length} projects · ₹${earned.toLocaleString('en-IN')} earned · ₹${pending.toLocaleString('en-IN')} pending`}
            </p>
          </div>
          <button onClick={() => setProjModal('new')}
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#63b4ff,#a78bfa)', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 20px rgba(99,180,255,0.25)', transition: 'transform 0.15s,box-shadow 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(99,180,255,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(99,180,255,0.25)'; }}>
            <span style={{ fontSize: 17, lineHeight: 1 }}>+</span> New Project
          </button>
        </div>

        {/* Stats */}
        {!loading && projects.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: 10, marginBottom: 20 }}>
            {[
              { label: 'Total',     val: counts.all,                            color: '#63b4ff' },
              { label: 'Active',    val: counts.active,                         color: '#63b4ff' },
              { label: 'Completed', val: counts.completed,                      color: '#63cab7' },
              { label: 'Earned',    val: `₹${earned.toLocaleString('en-IN')}`,  color: '#63cab7' },
              { label: 'Pending',   val: `₹${pending.toLocaleString('en-IN')}`, color: '#fbbf24' },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '12px 14px' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Filter + search */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          {['all', 'active', 'completed', 'on-hold'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: '6px 14px', borderRadius: 20, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', background: filter === f ? 'linear-gradient(135deg,#63b4ff,#a78bfa)' : 'rgba(255,255,255,0.05)', color: filter === f ? '#fff' : 'rgba(255,255,255,0.4)', transition: 'all 0.15s' }}>
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)} ({counts[f] ?? 0})
            </button>
          ))}
          <div style={{ position: 'relative', marginLeft: 'auto' }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', opacity: 0.3, pointerEvents: 'none', fontSize: 13 }}>🔍</span>
            <input placeholder="Search projects…" value={search} onChange={e => setSearch(e.target.value)} className="pf-input"
              style={{ ...iS, paddingLeft: 32, width: 220 }} onFocus={onF} onBlur={onB} />
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><Spin size={28} /></div>
        ) : visible.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 20px', color: 'rgba(255,255,255,0.2)' }}>
            <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.25 }}>◈</div>
            <p style={{ fontSize: 15, fontWeight: 700, margin: '0 0 6px' }}>{search || filter !== 'all' ? 'No matching projects' : 'No projects yet'}</p>
            {!search && filter === 'all' && <button onClick={() => setProjModal('new')} style={{ marginTop: 12, padding: '9px 20px', borderRadius: 10, background: 'linear-gradient(135deg,#63b4ff,#a78bfa)', border: 'none', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>+ Create First Project</button>}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
            {visible.map((p, i) => (
              <div key={p._id} style={{ animation: 'cardIn 0.3s ease both', animationDelay: `${Math.min(i * 40, 240)}ms` }}>
                <ProjectCard project={p} onEdit={x => setProjModal(x)} onDelete={handleDelete} onTasks={x => setTaskPanel(x)} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project modal */}
      {projModal && (
        <Modal title={projModal === 'new' ? '✨ New Project' : '✏️ Edit Project'} subtitle={projModal === 'new' ? 'Fill in the details below' : 'Update project details'} onClose={() => setProjModal(null)}>
          <ProjectForm initial={projModal === 'new' ? null : projModal} clients={clients} onSubmit={projModal === 'new' ? handleCreate : handleUpdate} onClose={() => setProjModal(null)} saving={saving} />
        </Modal>
      )}

      {/* Task panel */}
      {taskPanel && <TaskPanel project={taskPanel} onClose={() => setTaskPanel(null)} />}
    </Layout>
  );
}