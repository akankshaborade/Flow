import { useState, useEffect, useCallback } from 'react';
import Layout from '../components/Layout';
import ClientCard from '../components/ClientCard';
import ClientForm from '../components/ClientForm';
import { getClients, createClient, updateClient, deleteClient } from '../api/api';

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  const s = type === 'error'
    ? { bg: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.35)', color: '#ef4444', icon: '✕' }
    : { bg: 'rgba(99,202,183,0.12)', border: '1px solid rgba(99,202,183,0.35)', color: '#63cab7', icon: '✓' };
  return (
    <>
      <style>{`@keyframes toastSlide{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{
        position:'fixed',bottom:24,right:24,zIndex:9999,
        display:'flex',alignItems:'center',gap:10,
        padding:'12px 18px',borderRadius:12,
        background:s.bg,border:s.border,color:s.color,
        fontSize:13,fontWeight:600,
        boxShadow:'0 8px 32px rgba(0,0,0,0.4)',
        animation:'toastSlide 0.25s ease',
      }}>
        <span style={{width:22,height:22,borderRadius:'50%',background:`${s.color}22`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:800}}>{s.icon}</span>
        {message}
      </div>
    </>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <>
      <style>{`@keyframes shimmer{0%{background-position:-600px 0}100%{background-position:600px 0}}.skel{background:linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.09) 50%,rgba(255,255,255,0.04) 75%);background-size:1200px 100%;animation:shimmer 1.6s infinite linear;border-radius:7px}`}</style>
      <div style={{background:'rgba(255,255,255,0.025)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:20,display:'flex',flexDirection:'column',gap:14}}>
        <div style={{display:'flex',alignItems:'center',gap:14}}>
          <div className="skel" style={{width:46,height:46,borderRadius:13,flexShrink:0}}/>
          <div style={{flex:1}}><div className="skel" style={{height:13,width:'55%',marginBottom:9}}/><div className="skel" style={{height:11,width:'75%'}}/></div>
        </div>
        <div className="skel" style={{height:11,width:'38%'}}/>
        <div className="skel" style={{height:50,borderRadius:8}}/>
        <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
          <div className="skel" style={{height:30,width:62,borderRadius:8}}/>
          <div className="skel" style={{height:30,width:72,borderRadius:8}}/>
        </div>
      </div>
    </>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({ hasSearch, onAdd }) {
  return (
    <div style={{gridColumn:'1/-1',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'72px 20px',gap:12}}>
      <div style={{fontSize:52,opacity:0.25}}>{hasSearch?'🔍':'👥'}</div>
      <p style={{fontSize:15,fontWeight:700,color:'rgba(255,255,255,0.3)',margin:0}}>
        {hasSearch?'No clients match your search':'No clients yet'}
      </p>
      <p style={{fontSize:13,color:'rgba(255,255,255,0.2)',margin:0}}>
        {hasSearch?'Try a different name or email':'Add your first client to get started'}
      </p>
      {!hasSearch&&<button onClick={onAdd} style={{marginTop:8,padding:'9px 20px',borderRadius:10,background:'linear-gradient(135deg,#63b4ff,#a78bfa)',border:'none',color:'#fff',fontSize:13,fontWeight:700,cursor:'pointer'}}>+ Add Your First Client</button>}
    </div>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar({ clients }) {
  const total     = clients.length;
  const withPhone = clients.filter(c => c.phone).length;
  const withNotes = clients.filter(c => c.notes).length;
  const recent    = clients.filter(c => (Date.now() - new Date(c.createdAt)) < 7*24*60*60*1000).length;
  const stats = [
    { label:'Total Clients',   value:total,     color:'#63b4ff', icon:'👥' },
    { label:'Added This Week', value:recent,    color:'#63cab7', icon:'🆕' },
    { label:'With Phone',      value:withPhone, color:'#a78bfa', icon:'📞' },
    { label:'With Notes',      value:withNotes, color:'#ffc300', icon:'📝' },
  ];
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:12,marginBottom:24}}>
      {stats.map(s=>(
        <div key={s.label} style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:14,padding:'14px 16px',display:'flex',flexDirection:'column',gap:4}}>
          <div style={{fontSize:18}}>{s.icon}</div>
          <div style={{fontSize:22,fontWeight:800,color:s.color,lineHeight:1}}>{s.value}</div>
          <div style={{fontSize:11,color:'rgba(255,255,255,0.35)',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState('');
  const [search,  setSearch]  = useState('');
  const [modal,   setModal]   = useState(null);
  const [toast,   setToast]   = useState(null);
  const [sortBy,  setSortBy]  = useState('newest');

  const showToast = useCallback((message, type='success') => setToast({ message, type }), []);

  const fetchClients = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const res = await getClients();
      setClients(Array.isArray(res) ? res : (res.clients || []));
    } catch (err) {
      setError(err.message || 'Failed to load clients. Is the server running?');
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchClients(); }, [fetchClients]);

  const handleCreate = async (form) => {
    setSaving(true);
    try {
      const res = await createClient(form);
      const newClient = res.client || res;
      if (newClient?._id) {
        setClients(prev => [newClient, ...prev]);
        setModal(null);
        showToast('Client added successfully! 🎉');
      } else {
        showToast(res.message || 'Failed to create client', 'error');
      }
    } catch (err) { showToast(err.message || 'Could not create client', 'error'); }
    finally { setSaving(false); }
  };

  const handleUpdate = async (form) => {
    setSaving(true);
    try {
      const res = await updateClient(modal._id, form);
      const updated = res.client || res;
      if (updated?._id) {
        setClients(prev => prev.map(c => c._id === updated._id ? updated : c));
        setModal(null);
        showToast('Client updated!');
      } else { showToast(res.message || 'Failed to update', 'error'); }
    } catch (err) { showToast(err.message || 'Could not update client', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await deleteClient(id);
      setClients(prev => prev.filter(c => c._id !== id));
      showToast('Client removed.');
    } catch (err) { showToast(err.message || 'Could not delete client', 'error'); }
  };

  const filtered = clients
    .filter(c => {
      const q = search.toLowerCase();
      return c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q) || c.phone?.toLowerCase().includes(q) || c.notes?.toLowerCase().includes(q);
    })
    .sort((a,b) => {
      if (sortBy==='newest') return new Date(b.createdAt)-new Date(a.createdAt);
      if (sortBy==='oldest') return new Date(a.createdAt)-new Date(b.createdAt);
      if (sortBy==='name')   return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <Layout>
      <div style={{padding:'24px 28px',minHeight:'100vh'}}>
        <style>{`@keyframes cardIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>

        {/* Header */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:24,flexWrap:'wrap',gap:14}}>
          <div>
            <h1 style={{fontSize:24,fontWeight:800,color:'#f0f0ff',margin:0}}>Clients</h1>
            <p style={{fontSize:13,color:'rgba(255,255,255,0.35)',marginTop:4,margin:'4px 0 0'}}>
              {loading?'Loading…':`${clients.length} client${clients.length!==1?'s':''} total`}
            </p>
          </div>
          <button
            onClick={()=>setModal('add')}
            style={{display:'flex',alignItems:'center',gap:7,padding:'10px 20px',borderRadius:12,border:'none',background:'linear-gradient(135deg,#63b4ff 0%,#a78bfa 100%)',color:'#fff',fontSize:13,fontWeight:700,cursor:'pointer',boxShadow:'0 4px 20px rgba(99,180,255,0.3)',transition:'transform 0.15s,box-shadow 0.15s'}}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 8px 28px rgba(99,180,255,0.4)'}}
            onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 4px 20px rgba(99,180,255,0.3)'}}
          >
            <span style={{fontSize:17,lineHeight:1}}>+</span> Add Client
          </button>
        </div>

        {/* Stats */}
        {!loading && clients.length > 0 && <StatsBar clients={clients} />}

        {/* Toolbar */}
        <div style={{display:'flex',gap:10,marginBottom:20,flexWrap:'wrap',alignItems:'center'}}>
          <div style={{position:'relative',flex:1,minWidth:220,maxWidth:380}}>
            <span style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',fontSize:14,opacity:0.3,pointerEvents:'none'}}>🔍</span>
            <input
              type="text" placeholder="Search name, email, notes…"
              value={search} onChange={e=>setSearch(e.target.value)}
              style={{width:'100%',boxSizing:'border-box',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:11,padding:'9px 36px',fontSize:13,color:'#e0e0f0',outline:'none',transition:'border-color 0.2s'}}
              onFocus={e=>e.target.style.borderColor='rgba(99,180,255,0.5)'}
              onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.09)'}
            />
            {search&&<button onClick={()=>setSearch('')} style={{position:'absolute',right:10,top:'50%',transform:'translateY(-50%)',background:'rgba(255,255,255,0.1)',border:'none',borderRadius:6,color:'rgba(255,255,255,0.5)',cursor:'pointer',width:20,height:20,fontSize:12,display:'flex',alignItems:'center',justifyContent:'center'}}>×</button>}
          </div>
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:11,padding:'9px 14px',fontSize:13,color:'rgba(255,255,255,0.6)',cursor:'pointer',outline:'none'}}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="name">Name A–Z</option>
          </select>
          {search&&!loading&&<span style={{fontSize:12,color:'rgba(255,255,255,0.3)'}}>{filtered.length} result{filtered.length!==1?'s':''}</span>}
        </div>

        {/* Error */}
        {error&&(
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.25)',borderRadius:12,padding:'12px 16px',marginBottom:20,color:'#ef4444',fontSize:13,gap:12}}>
            <span>⚠️ {error}</span>
            <button onClick={fetchClients} style={{background:'rgba(239,68,68,0.15)',border:'none',color:'#ef4444',padding:'5px 14px',borderRadius:8,fontSize:12,fontWeight:700,cursor:'pointer',flexShrink:0}}>Retry</button>
          </div>
        )}

        {/* Grid */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:16}}>
          {loading
            ? Array.from({length:6}).map((_,i)=><SkeletonCard key={i}/>)
            : filtered.length===0
              ? <EmptyState hasSearch={!!search} onAdd={()=>setModal('add')}/>
              : filtered.map((client,i)=>(
                  <div key={client._id} style={{animation:'cardIn 0.3s ease both',animationDelay:`${Math.min(i*50,300)}ms`}}>
                    <ClientCard client={client} onEdit={c=>setModal(c)} onDelete={handleDelete}/>
                  </div>
                ))
          }
        </div>

        {/* Modal */}
        {modal&&(
          <ClientForm
            initial={modal==='add'?null:modal}
            onSubmit={modal==='add'?handleCreate:handleUpdate}
            onClose={()=>setModal(null)}
            loading={saving}
          />
        )}

        {/* Toast */}
        {toast&&<Toast message={toast.message} type={toast.type} onClose={()=>setToast(null)}/>}
      </div>
    </Layout>
  );
}