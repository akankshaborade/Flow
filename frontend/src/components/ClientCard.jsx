import { useState } from 'react';

const GRAD = [
  ['#63b4ff','#a78bfa'], ['#63cab7','#63b4ff'],
  ['#ffc300','#f97316'], ['#a78bfa','#f472b6'],
  ['#f97316','#fbbf24'], ['#34d399','#63b4ff'],
];

const getGrad   = (name) => GRAD[(name?.charCodeAt(0) || 0) % GRAD.length];
const initials  = (name) => {
  if (!name) return '?';
  const p = name.trim().split(' ');
  return p.length >= 2 ? (p[0][0]+p[p.length-1][0]).toUpperCase() : name.slice(0,2).toUpperCase();
};

function ActionBtn({ icon, label, onClick, color, danger }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        display:'flex', alignItems:'center', gap:5,
        padding:'6px 12px', borderRadius:8, border:'none',
        background: hov ? (danger?'rgba(239,68,68,0.18)':`${color}18`) : (danger?'rgba(239,68,68,0.1)':'rgba(255,255,255,0.05)'),
        color: hov ? color : 'rgba(255,255,255,0.45)',
        fontSize:12, fontWeight:600, cursor:'pointer',
        transition:'all 0.15s',
        transform: hov ? 'translateY(-1px)' : 'none',
      }}
    >
      <span style={{fontSize:12}}>{icon}</span>{label}
    </button>
  );
}

export default function ClientCard({ client, onEdit, onDelete }) {
  const [delConfirm, setDelConfirm] = useState(false);
  const [hovered,    setHovered]    = useState(false);
  const [grad] = useState(()=>getGrad(client.name));

  const handleDelete = () => {
    if (!delConfirm) { setDelConfirm(true); return; }
    onDelete(client._id);
  };

  return (
    <div
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>{ setHovered(false); setDelConfirm(false); }}
      style={{
        background: hovered
          ? 'linear-gradient(135deg,rgba(255,255,255,0.055) 0%,rgba(255,255,255,0.02) 100%)'
          : 'linear-gradient(135deg,rgba(255,255,255,0.035) 0%,rgba(255,255,255,0.01) 100%)',
        border: hovered ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.06)',
        borderRadius:16, padding:'20px 20px 18px',
        display:'flex', flexDirection:'column', gap:14,
        transition:'all 0.2s',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.25)' : 'none',
        position:'relative', overflow:'hidden',
      }}
    >
      {/* glow blob */}
      <div style={{position:'absolute',top:-30,left:-30,width:100,height:100,borderRadius:'50%',background:`linear-gradient(135deg,${grad[0]},${grad[1]})`,opacity:hovered?0.07:0.03,filter:'blur(28px)',pointerEvents:'none',transition:'opacity 0.3s'}}/>

      {/* Avatar + name */}
      <div style={{display:'flex',alignItems:'center',gap:14}}>
        <div style={{width:46,height:46,borderRadius:13,flexShrink:0,background:`linear-gradient(135deg,${grad[0]},${grad[1]})`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,fontWeight:800,color:'#fff',boxShadow:`0 4px 16px ${grad[0]}33`}}>
          {initials(client.name)}
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:14,fontWeight:700,color:'#f0f0ff',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{client.name}</div>
          <div style={{fontSize:12,color:'rgba(255,255,255,0.4)',marginTop:2,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{client.email}</div>
        </div>
      </div>

      {/* Phone */}
      {client.phone && (
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <span style={{fontSize:13,opacity:0.4}}>📞</span>
          <span style={{fontSize:12,color:'rgba(255,255,255,0.45)'}}>{client.phone}</span>
        </div>
      )}

      {/* Notes */}
      {client.notes ? (
        <div style={{fontSize:12,color:'rgba(255,255,255,0.35)',lineHeight:1.55,display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden',background:'rgba(255,255,255,0.025)',borderRadius:8,padding:'8px 10px',borderLeft:`2px solid ${grad[0]}55`}}>
          {client.notes}
        </div>
      ) : (
        <div style={{fontSize:11,color:'rgba(255,255,255,0.18)',fontStyle:'italic',padding:'4px 0'}}>No notes added</div>
      )}

      {/* Since */}
      {client.createdAt && (
        <div style={{fontSize:11,color:'rgba(255,255,255,0.2)'}}>
          Added {new Date(client.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}
        </div>
      )}

      <div style={{height:1,background:'rgba(255,255,255,0.05)',margin:'0 -2px'}}/>

      {/* Actions */}
      <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
        <ActionBtn icon="✏️" label="Edit"    onClick={()=>onEdit(client)} color="#63b4ff"/>
        <ActionBtn icon={delConfirm?'⚠️':'🗑️'} label={delConfirm?'Confirm?':'Delete'} onClick={handleDelete} color={delConfirm?'#ef4444':'#f97316'} danger={delConfirm}/>
      </div>
    </div>
  );
}