import { useState, useEffect, useCallback } from 'react';
import Layout from '../components/Layout';
import ClientCard from '../components/ClientCard';
import ClientForm from '../components/ClientForm';
import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
} from '../api/api';

// ─── Toast notification ───────────────────────────────────────────────────────

function Toast({ message, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3200); return () => clearTimeout(t); }, [onClose]);
  const colors = {
    success: { bg: 'rgba(99,202,183,0.15)', border: 'rgba(99,202,183,0.3)', color: '#63cab7', icon: '✓' },
    error:   { bg: 'rgba(239,68,68,0.15)',  border: 'rgba(239,68,68,0.3)',  color: '#ef4444', icon: '✕' },
  };
  const c = colors[type] || colors.success;
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 200,
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '12px 18px', borderRadius: 12,
      background: c.bg, border: `1px solid ${c.border}`,
      color: c.color, fontSize: 13, fontWeight: 600,
      boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
      animation: 'toastIn 0.25s ease',
    }}>
      <style>{`@keyframes toastIn { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }`}</style>
      <span style={{
        width: 20, height: 20, borderRadius: '50%',
        background: `${c.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, fontWeight: 800, flexShrink: 0,
      }}>{c.icon}</span>
      {message}
    </div>
  );
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.025)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: 16, padding: '20px 20px 18px',
      display: 'flex', flexDirection: 'column', gap: 14,
    }}>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -400px 0 }
          100% { background-position:  400px 0 }
        }
        .skel {
          background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%);
          background-size: 800px 100%;
          animation: shimmer 1.4s infinite linear;
          border-radius: 6px;
        }
      `}</style>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div className="skel" style={{ width: 46, height: 46, borderRadius: 13, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div className="skel" style={{ height: 14, width: '60%', marginBottom: 8 }} />
          <div className="skel" style={{ height: 11, width: '80%' }} />
        </div>
      </div>
      <div className="skel" style={{ height: 11, width: '40%' }} />
      <div className="skel" style={{ height: 52, borderRadius: 8 }} />
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <div className="skel" style={{ height: 30, width: 64, borderRadius: 8 }} />
        <div className="skel" style={{ height: 30, width: 72, borderRadius: 8 }} />
      </div>
    </div>
  );
}

// ─── Empty state ─────────────────────────────────────────────────────────────

function EmptyState({ hasSearch, onAdd }) {
  return (
    <div style={{
      gridColumn: '1 / -1',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '64px 20px', gap: 12,
      color: 'rgba(255,255,255,0.25)',
    }}>
      <div style={{ fontSize: 48, opacity: 0.3 }}>{hasSearch ? '🔍' : '👥'}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.35)' }}>
        {hasSearch ? 'No clients match your search' : 'No clients yet'}
      </div>
      <div style={{ fontSize: 13 }}>
        {hasSearch ? 'Try a different name or email' : 'Add your first client to get started'}
      </div>
      {!hasSearch && (
        <button
          onClick={onAdd}
          style={{
            marginTop: 8, padding: '9px 20px', borderRadius: 10,
            background: 'linear-gradient(135deg, #63b4ff 0%, #a78bfa 100%)',
            border: 'none', color: '#fff', fontSize: 13, fontWeight: 700,
            cursor: 'pointer',
          }}
        >+ Add Your First Client</button>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Clients() {
  const [clients, setClients]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [saving,  setSaving]    = useState(false);
  const [error,   setError]     = useState('');
  const [search,  setSearch]    = useState('');
  const [modal,   setModal]     = useState(null); // null | 'add' | client-object (edit)
  const [toast,   setToast]     = useState(null); // { message, type }

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  // Fetch clients
  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getClients();
      setClients(res.clients || res || []);
    } catch {
      setError('Failed to load clients. Is the server running?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchClients(); }, [fetchClients]);

  // Create
  const handleCreate = async (form) => {
    setSaving(true);
    try {
      const res = await createClient(form);
      if (res.client || res._id) {
        await fetchClients();
        setModal(null);
        showToast('Client added successfully!');
      } else {
        showToast(res.message || 'Failed to create client', 'error');
      }
    } catch {
      showToast('Network error — could not create client', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Update
  const handleUpdate = async (form) => {
    setSaving(true);
    try {
      const res = await updateClient(modal._id, form);
      if (res.client || res._id) {
        await fetchClients();
        setModal(null);
        showToast('Client updated!');
      } else {
        showToast(res.message || 'Failed to update client', 'error');
      }
    } catch {
      showToast('Network error — could not update client', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await deleteClient(id);
      setClients((prev) => prev.filter((c) => c._id !== id));
      showToast('Client removed.');
    } catch {
      showToast('Could not delete client', 'error');
    }
  };

  // Filtered list
  const filtered = clients.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.notes?.toLowerCase().includes(q)
    );
  });

  return (
    <Layout>
      <div style={{ padding: '24px 28px', minHeight: '100vh' }}>

        {/* ── Page Header ── */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          marginBottom: 28, flexWrap: 'wrap', gap: 14,
        }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#f0f0ff', margin: 0 }}>
              Clients
            </h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>
              {loading ? 'Loading…' : `${clients.length} client${clients.length !== 1 ? 's' : ''} total`}
            </p>
          </div>
          <button
            onClick={() => setModal('add')}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '10px 20px', borderRadius: 12, border: 'none',
              background: 'linear-gradient(135deg, #63b4ff 0%, #a78bfa 100%)',
              color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(99,180,255,0.25)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(99,180,255,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(99,180,255,0.25)'; }}
          >
            <span style={{ fontSize: 16, lineHeight: 1 }}>+</span>
            Add Client
          </button>
        </div>

        {/* ── Search bar ── */}
        <div style={{ position: 'relative', maxWidth: 360, marginBottom: 24 }}>
          <span style={{
            position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
            fontSize: 14, opacity: 0.35, pointerEvents: 'none',
          }}>🔍</span>
          <input
            type="text"
            placeholder="Search by name, email or notes…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%', boxSizing: 'border-box',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: 12, padding: '10px 14px 10px 36px',
              fontSize: 13, color: '#e0e0f0', outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = 'rgba(99,180,255,0.5)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 6,
                color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
                width: 20, height: 20, fontSize: 11, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}
            >×</button>
          )}
        </div>

        {/* ── Error Banner ── */}
        {error && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
            borderRadius: 12, padding: '12px 16px', marginBottom: 20,
            color: '#ef4444', fontSize: 13,
          }}>
            <span>⚠️ {error}</span>
            <button
              onClick={fetchClients}
              style={{
                background: 'rgba(239,68,68,0.15)', border: 'none',
                color: '#ef4444', padding: '4px 12px', borderRadius: 7,
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
              }}
            >Retry</button>
          </div>
        )}

        {/* ── Grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
        }}>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.length === 0
              ? <EmptyState hasSearch={!!search} onAdd={() => setModal('add')} />
              : filtered.map((client, i) => (
                  <div key={client._id} style={{ animationDelay: `${i * 40}ms` }}>
                    <ClientCard
                      client={client}
                      onEdit={(c) => setModal(c)}
                      onDelete={handleDelete}
                    />
                  </div>
                ))
          }
        </div>

        {/* ── Modal ── */}
        {modal && (
          <ClientForm
            initial={modal === 'add' ? null : modal}
            onSubmit={modal === 'add' ? handleCreate : handleUpdate}
            onClose={() => setModal(null)}
            loading={saving}
          />
        )}

        {/* ── Toast ── */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

      </div>
    </Layout>
  );
}