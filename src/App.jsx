import { useState, useMemo } from "react";

const LOGO_B64 = "data:image/png;base64,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";

// ─── USUARIOS DEL SISTEMA ────────────────────────────────────────────────────
const USUARIOS = [
  // ADMINISTRADORES
  { id: 1, usuario: "mauricio.rodriguez", password: "dir2026",  nombre: "Mauricio Rodríguez", puesto: "Director General",       avatar: "MR", rol: "admin",    activo: true },
  { id: 2, usuario: "stephanie.coria",    password: "ventas2026",  nombre: "Stephanie Coria",     puesto: "Ventas Estratégicas",   avatar: "SC", rol: "admin",    activo: true },
  { id: 3, usuario: "tomas.delahoz",      password: "tomas2026",  nombre: "Tomás de la Hoz",     puesto: "Director General",       avatar: "TO", rol: "admin",    activo: true },
  // EMPLEADOS
  { id: 4, usuario: "vanesa.flores",      password: "vanesa123",  nombre: "Vanesa Flores",       puesto: "Directora de Agencia",   avatar: "VF", rol: "empleado", activo: true },
  { id: 5, usuario: "maria.sanchez",      password: "maria789",  nombre: "María Sánchez",      puesto: "Ventas Estratégicas",   avatar: "MS", rol: "empleado", activo: true },
];

const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

const CAMPANAS = [
  {
    id: 1, ownerId: 2, ownerName: "Stephanie Coria", nombre: "Lanzamiento Nike Q2", proveedor: "Studio Pixel MX",
    fechaInicio: "2026-05-01", fechaCita: "2026-05-15", fechaEntrega: "2026-05-30",
    solicitante: "Mauricio Rodríguez", clienteNombre: "Roberto Silva",
    clienteTel: "+52 55 1234 5678", clienteEmail: "r.silva@nike.com.mx", status: "En progreso",
    pendientes: [
      { id: 1, texto: "Revisar propuesta de colores", done: false },
      { id: 2, texto: "Aprobar bocetos fase 2", done: true },
      { id: 3, texto: "Enviar brief a proveedor", done: true },
      { id: 4, texto: "Validar copy final", done: false },
    ],
    semanas: {
      "2026-W19": { lunes: "Kickoff de campaña. Reunión inicial con cliente.", martes: "Presentación de moodboard aprobada.", miércoles: "Bocetos primera fase. Avance 40%.", jueves: "Revisión interna con equipo creativo.", viernes: "Entrega de propuesta preliminar." },
      "2026-W20": { lunes: "Feedback del cliente integrado.", martes: "", miércoles: "", jueves: "", viernes: "" },
    },
  },
  {
    id: 2, ownerId: 2, ownerName: "Stephanie Coria", nombre: "Campaña Refresca Pepsi", proveedor: "Motion House",
    fechaInicio: "2026-04-20", fechaCita: "2026-05-20", fechaEntrega: "2026-06-10",
    solicitante: "Stephanie Coria", clienteNombre: "Patricia Romero",
    clienteTel: "+52 55 9876 5432", clienteEmail: "p.romero@pepsi.com", status: "Revisión",
    pendientes: [
      { id: 1, texto: "Edición de video spot 30s", done: false },
      { id: 2, texto: "Subtítulos versión accesible", done: false },
      { id: 3, texto: "Adaptación para redes", done: true },
    ],
    semanas: {
      "2026-W19": { lunes: "Producción de assets digitales.", martes: "Sesión fotográfica.", miércoles: "Revisión edición de video.", jueves: "Correcciones color y audio.", viernes: "Presentación interna de avances." },
      "2026-W20": { lunes: "Ajustes post-revisión cliente.", martes: "", miércoles: "", jueves: "", viernes: "" },
    },
  },
];

function getWeekKey() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `${d.getFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#f1f1f1}::-webkit-scrollbar-thumb{background:#6b7c3f;border-radius:2px}
  .tab-btn{background:none;border:none;cursor:pointer;padding:8px 16px;border-radius:8px;font-size:13px;font-weight:500;transition:all .2s;font-family:inherit;}
  .tab-btn.active{background:#6b7c3f;color:#fff;}
  .tab-btn:not(.active){color:#888;}
  .tab-btn:not(.active):hover{color:#3a3a3a;background:#e8eddc;}
  .camp-card{background:#fff;border:1px solid #dde5c5;border-radius:12px;padding:14px;cursor:pointer;transition:all .2s;box-shadow:0 1px 3px #0001;}
  .camp-card:hover{border-color:#6b7c3f;}
  .camp-card.sel{border-color:#6b7c3f;background:#f4f8eb;}
  .day-card{background:#fff;border:1px solid #dde5c5;border-radius:10px;padding:14px;transition:all .2s;box-shadow:0 1px 3px #0001;}
  .day-card.today{border-color:#6b7c3f88;background:#f4f8eb;}
  .note-btn{background:none;border:1px solid #c5d098;color:#6b7c3f;border-radius:6px;padding:4px 10px;font-size:12px;cursor:pointer;transition:all .2s;font-family:inherit;}
  .note-btn:hover{border-color:#4a5a28;color:#4a5a28;background:#e8eddc;}
  .chk{width:18px;height:18px;border-radius:4px;border:1.5px solid #c5d098;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s;}
  .chk.done{background:#6b7c3f;border-color:#6b7c3f;}
  .inp{background:#f9fafb;border:1px solid #dde5c5;border-radius:8px;padding:8px 12px;color:#2a2a2a;font-size:13px;outline:none;width:100%;transition:border-color .2s;font-family:inherit;}
  .inp:focus{border-color:#6b7c3f;}
  textarea.inp{resize:vertical;min-height:80px;}
  .sbtn{background:#6b7c3f;color:#fff;border:none;border-radius:8px;padding:8px 16px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;}
  .sbtn:hover{opacity:.85;}
  .panel{background:#fff;border:1px solid #dde5c5;border-radius:14px;padding:20px;box-shadow:0 1px 3px #0001;}
  .chip{display:inline-flex;align-items:center;gap:4px;background:#e8eddc;border-radius:6px;padding:4px 10px;font-size:12px;color:#4a5a28;}
  .logout-btn{background:none;border:1px solid #dde5c5;color:#888;border-radius:8px;padding:6px 12px;font-size:12px;cursor:pointer;font-family:inherit;transition:all .2s;}
  .logout-btn:hover{border-color:#c0392b;color:#c0392b;}
  .admin-btn{background:#e8eddc;border:1px solid #c5d098;color:#4a5a28;border-radius:8px;padding:6px 12px;font-size:12px;cursor:pointer;font-family:inherit;font-weight:600;transition:all .2s;}
  .admin-btn:hover{background:#d4ddb5;}
  .linp{background:#f9fafb;border:1px solid #dde5c5;border-radius:10px;padding:12px 16px;color:#2a2a2a;font-size:14px;outline:none;width:100%;transition:border-color .2s;font-family:inherit;}
  .linp:focus{border-color:#6b7c3f;}
  .lbtn{width:100%;background:#6b7c3f;color:#fff;border:none;border-radius:10px;padding:13px;font-size:15px;font-weight:700;cursor:pointer;font-family:'Syne',sans-serif;transition:opacity .2s,transform .1s;}
  .lbtn:hover{opacity:.9;}
  .lbtn:active{transform:scale(.98);}
  .eye{background:none;border:none;cursor:pointer;color:#aaa;font-size:16px;padding:0 2px;}
  .eye:hover{color:#6b7c3f;}
  @keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}
  .shake{animation:shake .4s ease;}
  .stitle{font-family:'Syne',sans-serif;font-size:15px;font-weight:700;color:#4a5a28;letter-spacing:.02em;margin-bottom:14px;}
  .sumbox{background:#f4f8eb;border:1px solid #c5d098;border-radius:10px;padding:16px;white-space:pre-line;font-size:13px;color:#3a4a20;line-height:1.8;}
  .overlay{position:fixed;inset:0;background:#00000088;display:flex;align-items:center;justify-content:center;z-index:100;padding:20px;}
  .modal{background:#fff;border:1px solid #dde5c5;border-radius:16px;padding:24px;width:100%;max-width:420px;box-shadow:0 8px 32px #0002;}
  .modal-wide{background:#fff;border:1px solid #dde5c5;border-radius:16px;padding:28px;width:100%;max-width:600px;box-shadow:0 8px 32px #0002;max-height:90vh;overflow-y:auto;}
  .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
  .form-label{font-size:11px;color:#4a5a28;font-weight:600;letter-spacing:.05em;margin-bottom:4px;}
  .full-col{grid-column:1/-1;}
  .new-camp-btn{background:#6b7c3f;color:#fff;border:none;border-radius:8px;padding:7px 14px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:5px;transition:opacity .2s;}
  .new-camp-btn:hover{opacity:.85;}
  .edit-camp-btn{background:none;border:1px solid #c5d098;color:#6b7c3f;border-radius:6px;padding:3px 9px;font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .2s;}
  .edit-camp-btn:hover{background:#e8eddc;}
  select.inp{background:#f9fafb;}
  .done-camp-btn{background:none;border:1px solid #2e7d32;color:#2e7d32;border-radius:6px;padding:3px 9px;font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .2s;}
  .done-camp-btn:hover{background:#e8f5e9;}
  .del-camp-btn{background:none;border:1px solid #c0392b;color:#c0392b;border-radius:6px;padding:3px 9px;font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .2s;}
  .del-camp-btn:hover{background:#fdecea;}
`;

function StatusBadge({ status }) {
  const map = { "En progreso": "#6b7c3f", "Revisión": "#3b82f6", "Completado": "#2e7d32", "Pausado": "#c0392b" };
  const c = map[status] || "#71717a";
  return <span style={{ fontSize: 11, padding: "2px 10px", borderRadius: 20, border: `1px solid ${c}44`, background: `${c}18`, color: c, fontWeight: 600 }}>{status}</span>;
}

function Ring({ pct }) {
  const r = 20, c = 2 * Math.PI * r;
  return (
    <svg width="52" height="52" viewBox="0 0 52 52">
      <circle cx="26" cy="26" r={r} fill="none" stroke="#e0e8cc" strokeWidth="4" />
      <circle cx="26" cy="26" r={r} fill="none" stroke="#6b7c3f" strokeWidth="4"
        strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c}
        strokeLinecap="round" transform="rotate(-90 26 26)" style={{ transition: "stroke-dashoffset .6s" }} />
      <text x="26" y="31" textAnchor="middle" fontSize="11" fill="#4a5a28" fontWeight="700">{pct}%</text>
    </svg>
  );
}

function Login({ onLogin }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [shake, setShake] = useState(false);

  function attempt() {
    const found = USUARIOS.find(x => x.usuario === u.trim().toLowerCase() && x.password === p);
    if (!found) { setErr("Usuario o contraseña incorrectos."); bump(); return; }
    if (!found.activo) { setErr("Acceso desactivado. Contacta al administrador."); bump(); return; }
    setErr(""); onLogin(found);
  }
  function bump() { setShake(true); setTimeout(() => setShake(false), 450); }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7ee", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'DM Sans',sans-serif" }}>
      <style>{CSS}</style>
      <div style={{ width: "100%", maxWidth: 380 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}><img src={LOGO_B64} alt="Krishka Publicidad" style={{ width: 110, height: 110, objectFit: "contain", display: "block" }} /></div>
          <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 22, color: "#2a3a10", letterSpacing: ".01em" }}>KRISHKA de la Hoz</div>
          <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 13, color: "#6b7c3f", letterSpacing: ".12em", marginTop: 2 }}>KRISHKA PUBLICIDAD</div>
          <div style={{ fontSize: 12, color: "#888", marginTop: 6 }}>Sistema de seguimiento de campañas</div>
        </div>
        <div className={shake ? "shake" : ""} style={{ background: "#fff", border: "1px solid #dde5c5", borderRadius: 16, padding: 26, boxShadow: "0 4px 20px #6b7c3f18" }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: "#4a5a28", marginBottom: 6, fontWeight: 600, letterSpacing: ".06em" }}>USUARIO</div>
            <input className="linp" placeholder="tu.usuario" value={u} onChange={e => { setU(e.target.value); setErr(""); }} onKeyDown={e => e.key === "Enter" && attempt()} autoCapitalize="none" />
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: "#4a5a28", marginBottom: 6, fontWeight: 600, letterSpacing: ".06em" }}>CONTRASEÑA</div>
            <div style={{ position: "relative" }}>
              <input className="linp" placeholder="••••••••" type={show ? "text" : "password"} value={p} onChange={e => { setP(e.target.value); setErr(""); }} onKeyDown={e => e.key === "Enter" && attempt()} style={{ paddingRight: 42 }} />
              <button className="eye" onClick={() => setShow(s => !s)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }}>{show ? "🙈" : "👁"}</button>
            </div>
          </div>
          {err && <div style={{ background: "#450a0a", border: "1px solid #991b1b", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#fca5a5", marginBottom: 14 }}>⚠️ {err}</div>}
          <button className="lbtn" onClick={attempt}>Entrar →</button>
        </div>
        <div style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: "#888" }}>Acceso restringido · Solo personal autorizado</div>
      </div>
    </div>
  );
}

function AdminPanel({ usuarios, onToggle, onClose, onAdd, onDelete, onEdit }) {
  const [tab, setTab] = useState("lista"); // lista | nuevo | editar
  const [editUser, setEditUser] = useState(null);
  const [newUser, setNewUser] = useState({ nombre:"", usuario:"", password:"", puesto:"", rol:"empleado" });

  function avatarFrom(nombre) {
    const parts = nombre.trim().split(" ");
    return (parts[0]?.[0] || "") + (parts[1]?.[0] || "");
  }

  return (
    <div className="overlay">
      <div style={{ background:"#fff", border:"1px solid #dde5c5", borderRadius:16, padding:24, width:"100%", maxWidth:560, maxHeight:"90vh", overflowY:"auto", boxShadow:"0 8px 32px #0002" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <span style={{ fontFamily:"Syne", fontWeight:800, fontSize:18, color:"#2a3a10" }}>⚙️ Gestión de usuarios</span>
          <button onClick={onClose} style={{ background:"none", border:"none", color:"#888", fontSize:20, cursor:"pointer" }}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:4, marginBottom:18, background:"#e8eddc", borderRadius:8, padding:4 }}>
          {[["lista","👥 Usuarios"],["nuevo","+ Nuevo usuario"]].map(([k,l]) => (
            <button key={k} onClick={() => { setTab(k); setEditUser(null); }} style={{ flex:1, padding:"7px 0", border:"none", borderRadius:6, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit", background: tab===k ? "#6b7c3f" : "transparent", color: tab===k ? "#fff" : "#4a5a28" }}>{l}</button>
          ))}
        </div>

        {/* LISTA DE USUARIOS */}
        {tab === "lista" && (
          <div>
            {editUser ? (
              <div>
                <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:15, color:"#2a3a10", marginBottom:14 }}>✏ Editar usuario</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
                  <div style={{ gridColumn:"1/-1" }}>
                    <div className="form-label">NOMBRE COMPLETO</div>
                    <input className="inp" value={editUser.nombre} onChange={e => setEditUser(p=>({...p, nombre:e.target.value, avatar: avatarFrom(e.target.value).toUpperCase()}))} placeholder="Nombre completo" />
                  </div>
                  <div>
                    <div className="form-label">USUARIO</div>
                    <input className="inp" value={editUser.usuario} onChange={e => setEditUser(p=>({...p, usuario:e.target.value.toLowerCase().replace(/ /g,".")}))} placeholder="usuario.apellido" />
                  </div>
                  <div>
                    <div className="form-label">CONTRASEÑA</div>
                    <input className="inp" value={editUser.password} onChange={e => setEditUser(p=>({...p, password:e.target.value}))} placeholder="Contraseña" />
                  </div>
                  <div>
                    <div className="form-label">PUESTO</div>
                    <input className="inp" value={editUser.puesto} onChange={e => setEditUser(p=>({...p, puesto:e.target.value}))} placeholder="Puesto o cargo" />
                  </div>
                  <div>
                    <div className="form-label">ROL</div>
                    <select className="inp" value={editUser.rol} onChange={e => setEditUser(p=>({...p, rol:e.target.value}))}>
                      <option value="empleado">Empleado</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </div>
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <button className="note-btn" onClick={() => setEditUser(null)}>Cancelar</button>
                  <button className="sbtn" onClick={() => { if(editUser.nombre.trim()){ onEdit(editUser); setEditUser(null); }}}>✓ Guardar cambios</button>
                </div>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {usuarios.map(u => (
                  <div key={u.id} style={{ display:"flex", alignItems:"center", gap:10, background: u.activo ? "#f4f8eb" : "#fff5f5", borderRadius:10, padding:"10px 12px", border:`1px solid ${u.activo ? "#dde5c5" : "#f5c6c6"}` }}>
                    <div style={{ width:36, height:36, borderRadius:10, background: u.activo ? "#c5d098" : "#e0e0e0", border:`1px solid ${u.activo ? "#6b7c3f44" : "#ccc"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color: u.activo ? "#4a5a28" : "#999", flexShrink:0 }}>{u.avatar}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:13, fontWeight:600, color: u.activo ? "#2a3a10" : "#aaa" }}>{u.nombre}</div>
                      <div style={{ fontSize:11, color:"#888" }}>{u.puesto || "Sin puesto"} · @{u.usuario} · {u.rol}</div>
                    </div>
                    <span style={{ fontSize:10, fontWeight:600, color: u.activo ? "#4a5a28" : "#ef4444", whiteSpace:"nowrap", marginRight:4 }}>{u.activo ? "● Activo" : "● Inactivo"}</span>
                    <div style={{ display:"flex", gap:5 }}>
                      <button onClick={() => setEditUser({...u})} style={{ background:"none", border:"1px solid #c5d098", color:"#4a5a28", borderRadius:6, padding:"4px 8px", fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>✏</button>
                      <button onClick={() => onToggle(u.id)} style={{ background: u.activo ? "#fdecea" : "#e8f5e9", border:`1px solid ${u.activo ? "#c0392b44" : "#2e7d3244"}`, color: u.activo ? "#c0392b" : "#2e7d32", borderRadius:6, padding:"4px 8px", fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>{u.activo ? "🔒" : "🔓"}</button>
                      {u.rol !== "admin" && <button onClick={() => onDelete(u.id)} style={{ background:"none", border:"1px solid #c0392b44", color:"#c0392b", borderRadius:6, padding:"4px 8px", fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>🗑</button>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* NUEVO USUARIO */}
        {tab === "nuevo" && (
          <div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
              <div style={{ gridColumn:"1/-1" }}>
                <div className="form-label">NOMBRE COMPLETO *</div>
                <input className="inp" value={newUser.nombre} onChange={e => setNewUser(p=>({...p, nombre:e.target.value, usuario: e.target.value.trim().toLowerCase().replace(/ /g,".").normalize("NFD").replace(/[̀-ͯ]/g,"")}))} placeholder="Nombre completo" />
              </div>
              <div>
                <div className="form-label">USUARIO</div>
                <input className="inp" value={newUser.usuario} onChange={e => setNewUser(p=>({...p, usuario:e.target.value.toLowerCase().replace(/ /g,".")}))} placeholder="usuario.apellido" />
              </div>
              <div>
                <div className="form-label">CONTRASEÑA *</div>
                <input className="inp" value={newUser.password} onChange={e => setNewUser(p=>({...p, password:e.target.value}))} placeholder="Contraseña segura" />
              </div>
              <div>
                <div className="form-label">PUESTO</div>
                <input className="inp" value={newUser.puesto} onChange={e => setNewUser(p=>({...p, puesto:e.target.value}))} placeholder="Puesto o cargo" />
              </div>
              <div>
                <div className="form-label">ROL</div>
                <select className="inp" value={newUser.rol} onChange={e => setNewUser(p=>({...p, rol:e.target.value}))}>
                  <option value="empleado">Empleado</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
            </div>
            <div style={{ display:"flex", gap:8, justifyContent:"flex-end" }}>
              <button className="note-btn" onClick={() => setNewUser({ nombre:"", usuario:"", password:"", puesto:"", rol:"empleado" })}>Limpiar</button>
              <button className="sbtn" onClick={() => {
                if(!newUser.nombre.trim() || !newUser.password.trim()) return;
                const av = avatarFrom(newUser.nombre).toUpperCase() || "??";
                onAdd({ ...newUser, id: Date.now(), avatar: av, activo: true });
                setNewUser({ nombre:"", usuario:"", password:"", puesto:"", rol:"empleado" });
                setTab("lista");
              }}>✓ Crear usuario</button>
            </div>
          </div>
        )}

        <div style={{ marginTop:14, fontSize:11, color:"#aaa", textAlign:"center" }}>🔒 desactiva · 🔓 reactiva · ✏ edita · 🗑 elimina</div>
      </div>
    </div>
  );
}


export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [usuarios, setUsuarios] = useState(USUARIOS);
  const [showAdmin, setShowAdmin] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const [activeTab, setActiveTab] = useState("seguimiento");
  const [currentWeek] = useState(getWeekKey);
  const [notes, setNotes] = useState(Object.fromEntries(CAMPANAS.map(c => [c.id, c.semanas])));
  const [pends, setPends] = useState(Object.fromEntries(CAMPANAS.map(c => [c.id, c.pendientes])));
  const [newPend, setNewPend] = useState("");
  const [editDay, setEditDay] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [campanas, setCampanas] = useState(CAMPANAS);
  // Admins see all campaigns; employees only see their own
  const visibleCampanas = currentUser && currentUser.rol === "admin"
    ? campanas
    : campanas.filter(c => c.ownerId === currentUser?.id);
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [showEditCampaign, setShowEditCampaign] = useState(false);
  const [newCamp, setNewCamp] = useState({ nombre:"", proveedor:"", fechaInicio:"", fechaCita:"", fechaEntrega:"", solicitante:"", clienteNombre:"", clienteTel:"", clienteEmail:"", status:"En progreso" });
  const [editCampData, setEditCampData] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const camp = campanas.find(c => c.id === selectedId) || visibleCampanas[0] || campanas[0];
  const weekNotes = notes[camp.id]?.[currentWeek] || {};
  const campPends = pends[camp.id] || [];
  const campPendsLen = campPends.length;
  const campPendsDone = campPends.filter(p => p.done).length;

  const completionPct = useMemo(() => {
    if (!campPendsLen) return 0;
    return Math.round((campPendsDone / campPendsLen) * 100);
  }, [campPendsLen, campPendsDone]);

  const diasWithNotes = DAYS.filter(d => weekNotes[d.toLowerCase()]);
  const weeklySummary = diasWithNotes.map(d => `• ${d}: ${weekNotes[d.toLowerCase()]}`).join("\n");
  const todayName = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"][new Date().getDay()];

  if (!currentUser) return <Login onLogin={(u) => {
    setCurrentUser(u);
    const owned = campanas.filter(c => c.ownerId === u.id);
    const first = u.rol === "admin" ? campanas[0] : owned[0];
    if (first) setSelectedId(first.id);
  }} />;

  function openNote(day) { setEditDay(day); setNoteText(weekNotes[day.toLowerCase()] || ""); }
  function saveNote() {
    setNotes(prev => ({ ...prev, [camp.id]: { ...prev[camp.id], [currentWeek]: { ...(prev[camp.id]?.[currentWeek] || {}), [editDay.toLowerCase()]: noteText } } }));
    setEditDay(null);
  }
  function togglePend(pid) { setPends(prev => ({ ...prev, [camp.id]: prev[camp.id].map(p => p.id === pid ? { ...p, done: !p.done } : p) })); }
  function addPend() {
    if (!newPend.trim()) return;
    setPends(prev => ({ ...prev, [camp.id]: [...(prev[camp.id] || []), { id: Date.now(), texto: newPend.trim(), done: false }] }));
    setNewPend("");
  }

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: "#f5f7ee", minHeight: "100vh", color: "#2a2a2a" }}>
      <style>{CSS}</style>

      <div style={{ borderBottom: "1px solid #dde5c5", padding: "0 24px", background: "#fff", boxShadow: "0 1px 4px #6b7c3f18" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src={LOGO_B64} alt="logo" style={{ width: 36, height: 36, objectFit: "contain" }} />
            <div>
              <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 13, color: "#2a3a10", lineHeight: 1.1, whiteSpace: "nowrap" }}>KRISHKA de la Hoz</div>
              <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 9, color: "#6b7c3f", letterSpacing: ".1em" }}>KRISHKA PUBLICIDAD</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="chip"><span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6b7c3f", display: "inline-block" }}></span>Sem {currentWeek.split("W")[1]}</span>
            {currentUser.rol === "admin" && <button className="admin-btn" onClick={() => setShowAdmin(true)}>⚙️ Accesos</button>}
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#e8eddc", borderRadius: 10, padding: "6px 12px" }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: "#c5d098", border: "1px solid #6b7c3f44", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#4a5a28" }}>{currentUser.avatar}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#f5f5f5" }}>{currentUser.nombre}</div>
                <div style={{ fontSize: 11, color: "#71717a" }}>{currentUser.puesto}</div>
              </div>
            </div>
            <button className="logout-btn" onClick={() => setCurrentUser(null)}>Salir →</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px", display: "grid", gridTemplateColumns: "260px 1fr", gap: 20 }}>
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <span style={{ fontFamily:"Syne", fontSize:15, fontWeight:700, color:"#4a5a28", letterSpacing:".02em" }}>Campañas{currentUser.rol==="admin" ? " · Todos" : ""}</span>
            <button className="new-camp-btn" onClick={() => { setNewCamp({ nombre:"", proveedor:"", fechaInicio:"", fechaCita:"", fechaEntrega:"", solicitante:"", clienteNombre:"", clienteTel:"", clienteEmail:"", status:"En progreso" }); setShowNewCampaign(true); }}>+ Nueva</button>
          </div>
          {visibleCampanas.map(c => {
            const cp = pends[c.id] || [];
            const pct = cp.length ? Math.round((cp.filter(p => p.done).length / cp.length) * 100) : 0;
            return (
              <div key={c.id} className={`camp-card ${selectedId === c.id ? "sel" : ""}`} onClick={() => setSelectedId(c.id)} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ flex:1, paddingRight:4 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#2a3a10", lineHeight: 1.3, marginBottom: 4 }}>{c.nombre}</div>
                    <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginTop:4 }}>
                      <button className="edit-camp-btn" onClick={e => { e.stopPropagation(); setSelectedId(c.id); setEditCampData({...c}); setShowEditCampaign(true); }}>✏ Editar</button>
                      <button className="edit-camp-btn" style={{ borderColor:"#2e7d32", color:"#2e7d32" }} onClick={e => { e.stopPropagation(); setCampanas(prev => prev.map(x => x.id===c.id ? {...x, status:"Completado"} : x)); setPends(prev => ({...prev, [c.id]: (prev[c.id]||[]).map(p=>({...p,done:true}))})); setSelectedId(c.id); }}>✓ Terminar</button>
                      {currentUser.rol==="admin" && <button className="edit-camp-btn" style={{ borderColor:"#c0392b", color:"#c0392b" }} onClick={e => { e.stopPropagation(); setConfirmDeleteId(c.id); }}>🗑 Borrar</button>}
                    </div>
                  </div>
                  <Ring pct={pct} />
                </div>
                <StatusBadge status={c.status} />
                {currentUser.rol === "admin" && c.ownerName && <div style={{ marginTop:6, fontSize:11, color:"#888" }}>👤 {c.ownerName}</div>}
                <div style={{ marginTop: 4, fontSize: 11, color: "#6b7c3f" }}>📦 {c.proveedor}</div>
                <div style={{ marginTop: 4, fontSize: 11, color: "#6b7c3f" }}>🗓 Entrega: {c.fechaEntrega}</div>
              </div>
            );
          })}
        </div>

        <div>
          <div className="panel" style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 20, color: "#2a3a10", marginBottom: 8 }}>{camp.nombre}</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <StatusBadge status={camp.status} />
                  <span className="chip">📦 {camp.proveedor}</span>
                  <span className="chip">👤 {camp.solicitante}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                {[["Inicio", camp.fechaInicio], ["Cita", camp.fechaCita], ["Entrega", camp.fechaEntrega]].map(([l, v]) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: "#888", marginBottom: 2 }}>{l}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: l === "Entrega" ? "#4a5a28" : "#2a2a2a" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #27272a", display: "grid", gridTemplateColumns: "1fr auto", gap: 12, alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 10, color: "#6b7c3f", marginBottom: 4, letterSpacing: ".05em", fontWeight: 600 }}>CONTACTO CLIENTE</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#2a3a10" }}>{camp.clienteNombre}</div>
                <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>📞 {camp.clienteTel}</div>
                <div style={{ fontSize: 12, color: "#555" }}>✉️ {camp.clienteEmail}</div>
              </div>
              <div style={{ textAlign: "center", background: "#e8eddc", borderRadius: 10, padding: "10px 14px" }}>
                <Ring pct={completionPct} />
                <div style={{ fontSize: 11, color: "#6b7c3f", marginTop: 2 }}>Pendientes</div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 4, marginBottom: 16, background: "#e8eddc", border: "1px solid #c5d098", borderRadius: 10, padding: 4, width: "fit-content" }}>
            {[["seguimiento", "📅 Seguimiento"], ["pendientes", "✅ Pendientes"], ["resumen", "📊 Resumen"]].map(([k, l]) => (
              <button key={k} className={`tab-btn ${activeTab === k ? "active" : ""}`} onClick={() => setActiveTab(k)}>{l}</button>
            ))}
          </div>

          {activeTab === "seguimiento" && (
            <div style={{ display: "grid", gap: 12 }}>
              {DAYS.map(day => {
                const key = day.toLowerCase();
                const note = weekNotes[key] || "";
                const isToday = todayName === key;
                return (
                  <div key={day} className={`day-card ${isToday ? "today" : ""}`}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: note ? 8 : 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 14, color: isToday ? "#4a5a28" : "#2a2a2a" }}>{day}</span>
                        {isToday && <span style={{ fontSize: 10, background: "#e8eddc", color: "#4a5a28", border: "1px solid #6b7c3f44", borderRadius: 4, padding: "1px 6px", fontWeight: 600 }}>HOY</span>}
                        {note && <span style={{ fontSize: 10, color: "#6b7c3f" }}>●</span>}
                      </div>
                      <button className="note-btn" onClick={() => openNote(day)}>{note ? "✏ Editar" : "+ Agregar"}</button>
                    </div>
                    {note ? <div style={{ fontSize: 13, color: "#3a3a3a", lineHeight: 1.6 }}>{note}</div>
                          : <div style={{ fontSize: 12, color: "#bbb", marginTop: 6 }}>Sin avances registrados</div>}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "pendientes" && (
            <div className="panel">
              <div className="stitle">Pendientes del proyecto</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                {campPends.map(p => (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "#f9fafb", borderRadius: 8, border: `1px solid ${p.done ? "#6b7c3f33" : "#dde5c5"}` }}>
                    <div className={`chk ${p.done ? "done" : ""}`} onClick={() => togglePend(p.id)}>
                      {p.done && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#0f0f11" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    </div>
                    <span style={{ fontSize: 13, color: p.done ? "#aaa" : "#2a2a2a", textDecoration: p.done ? "line-through" : "none", flex: 1 }}>{p.texto}</span>
                    {p.done && <span style={{ fontSize: 11, color: "#6b7c3f" }}>Listo</span>}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <input className="inp" value={newPend} onChange={e => setNewPend(e.target.value)} placeholder="Agregar pendiente..." onKeyDown={e => e.key === "Enter" && addPend()} />
                <button className="sbtn" onClick={addPend} style={{ whiteSpace: "nowrap" }}>+ Agregar</button>
              </div>
            </div>
          )}

          {activeTab === "resumen" && (
            <div className="panel">
              <div className="stitle">Resumen semanal — {currentWeek}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                {[["Días con avances", `${diasWithNotes.length} / 5`], ["Completados", `${campPends.filter(p => p.done).length} / ${campPends.length}`], ["Progreso", `${completionPct}%`], ["Proveedor", camp.proveedor]].map(([k, v]) => (
                  <div key={k} style={{ background: "#f4f8eb", borderRadius: 10, padding: "14px 16px", border: "1px solid #dde5c5" }}>
                    <div style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>{k}</div>
                    <div style={{ fontSize: 17, fontWeight: 700, color: "#4a5a28", fontFamily: "Syne" }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, color: "#4a5a28", marginBottom: 8, fontWeight: 600 }}>Actividades de la semana</div>
                {weeklySummary ? <div className="sumbox">{weeklySummary}</div>
                  : <div className="sumbox" style={{ color: "#52525b", fontStyle: "italic" }}>Sin avances registrados esta semana.</div>}
              </div>
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 13, color: "#4a5a28", marginBottom: 8, fontWeight: 600 }}>Pendientes abiertos</div>
                {campPends.filter(p => !p.done).length === 0
                  ? <div style={{ fontSize: 13, color: "#4a5a28" }}>✅ Todos completados</div>
                  : campPends.filter(p => !p.done).map(p => (
                      <div key={p.id} style={{ fontSize: 13, color: "#555", marginBottom: 4 }}><span style={{ color: "#6b7c3f" }}>◦ </span>{p.texto}</div>
                    ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {editDay && (
        <div className="overlay" onClick={() => setEditDay(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 18, color: "#2a3a10", marginBottom: 4 }}>Avance del {editDay}</div>
            <div style={{ fontSize: 12, color: "#888", marginBottom: 14 }}>{camp.nombre} · {currentWeek}</div>
            <textarea className="inp" value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Describe las actividades del día..." style={{ marginBottom: 12 }} />
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button className="note-btn" onClick={() => setEditDay(null)}>Cancelar</button>
              <button className="sbtn" onClick={saveNote}>Guardar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CONFIRMAR BORRAR CAMPAÑA */}
      {confirmDeleteId && (
        <div className="overlay" onClick={() => setConfirmDeleteId(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:18, color:"#c0392b", marginBottom:8 }}>🗑 Borrar campaña</div>
            <div style={{ fontSize:14, color:"#555", marginBottom:20 }}>¿Seguro que quieres eliminar esta campaña? Esta acción no se puede deshacer.</div>
            <div style={{ display:"flex", gap:8, justifyContent:"flex-end" }}>
              <button className="note-btn" onClick={() => setConfirmDeleteId(null)}>Cancelar</button>
              <button style={{ background:"#c0392b", color:"#fff", border:"none", borderRadius:8, padding:"8px 18px", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }} onClick={() => {
                const remaining = campanas.filter(x => x.id !== confirmDeleteId);
                const visibleRemaining = currentUser.rol === "admin" ? remaining : remaining.filter(c => c.ownerId === currentUser.id);
                setCampanas(remaining);
                if (selectedId === confirmDeleteId && visibleRemaining.length > 0) setSelectedId(visibleRemaining[0].id);
                setConfirmDeleteId(null);
              }}>Sí, borrar</button>
            </div>
          </div>
        </div>
      )}

      {showAdmin && currentUser.rol === "admin" && (
        <AdminPanel
          usuarios={usuarios}
          onToggle={uid => setUsuarios(prev => prev.map(u => u.id === uid ? { ...u, activo: !u.activo } : u))}
          onAdd={u => setUsuarios(prev => [...prev, u])}
          onDelete={uid => setUsuarios(prev => prev.filter(u => u.id !== uid))}
          onEdit={edited => setUsuarios(prev => prev.map(u => u.id === edited.id ? {...u, ...edited} : u))}
          onClose={() => setShowAdmin(false)}
        />
      )}

      {/* MODAL: EDITAR CAMPAÑA COMPLETA */}
      {showEditCampaign && editCampData && (
        <div className="overlay" onClick={() => setShowEditCampaign(false)}>
          <div className="modal-wide" onClick={e => e.stopPropagation()}>
            <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:18, color:"#2a3a10", marginBottom:4 }}>✏ Editar campaña</div>
            <div style={{ fontSize:12, color:"#888", marginBottom:20 }}>Modifica cualquier dato de la campaña</div>
            <div className="form-grid">
              <div className="full-col">
                <div className="form-label">NOMBRE DE LA CAMPAÑA *</div>
                <input className="inp" value={editCampData.nombre} onChange={e => setEditCampData(p=>({...p,nombre:e.target.value}))} placeholder="Nombre de la campaña" />
              </div>
              <div>
                <div className="form-label">PROVEEDOR</div>
                <input className="inp" value={editCampData.proveedor} onChange={e => setEditCampData(p=>({...p,proveedor:e.target.value}))} placeholder="Nombre del proveedor" />
              </div>
              <div>
                <div className="form-label">ESTATUS</div>
                <select className="inp" value={editCampData.status} onChange={e => setEditCampData(p=>({...p,status:e.target.value}))}>
                  <option>En progreso</option><option>Revisión</option><option>Completado</option><option>Pausado</option>
                </select>
              </div>
              <div>
                <div className="form-label">FECHA DE INICIO</div>
                <input className="inp" type="date" value={editCampData.fechaInicio} onChange={e => setEditCampData(p=>({...p,fechaInicio:e.target.value}))} />
              </div>
              <div>
                <div className="form-label">FECHA DE CITA</div>
                <input className="inp" type="date" value={editCampData.fechaCita} onChange={e => setEditCampData(p=>({...p,fechaCita:e.target.value}))} />
              </div>
              <div className="full-col">
                <div className="form-label">FECHA DE ENTREGA</div>
                <input className="inp" type="date" value={editCampData.fechaEntrega} onChange={e => setEditCampData(p=>({...p,fechaEntrega:e.target.value}))} />
              </div>
              <div>
                <div className="form-label">PERSONA QUE SOLICITA</div>
                <input className="inp" value={editCampData.solicitante} onChange={e => setEditCampData(p=>({...p,solicitante:e.target.value}))} placeholder="Solicitante" />
              </div>
              <div>
                <div className="form-label">CONTACTO CLIENTE</div>
                <input className="inp" value={editCampData.clienteNombre} onChange={e => setEditCampData(p=>({...p,clienteNombre:e.target.value}))} placeholder="Nombre del cliente" />
              </div>
              <div>
                <div className="form-label">TELÉFONO CLIENTE</div>
                <input className="inp" value={editCampData.clienteTel} onChange={e => setEditCampData(p=>({...p,clienteTel:e.target.value}))} placeholder="+52 55 0000 0000" />
              </div>
              <div>
                <div className="form-label">EMAIL CLIENTE</div>
                <input className="inp" value={editCampData.clienteEmail} onChange={e => setEditCampData(p=>({...p,clienteEmail:e.target.value}))} placeholder="correo@ejemplo.com" />
              </div>
            </div>
            <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:20 }}>
              <button className="note-btn" onClick={() => setShowEditCampaign(false)}>Cancelar</button>
              <button className="sbtn" onClick={() => {
                if(!editCampData.nombre.trim()) return;
                setCampanas(prev => prev.map(c => c.id===editCampData.id ? {...c, ...editCampData} : c));
                setShowEditCampaign(false);
              }}>✓ Guardar cambios</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: NUEVA CAMPAÑA */}
      {showNewCampaign && (
        <div className="overlay" onClick={() => setShowNewCampaign(false)}>
          <div className="modal-wide" onClick={e => e.stopPropagation()}>
            <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:18, color:"#2a3a10", marginBottom:4 }}>+ Nueva Campaña</div>
            <div style={{ fontSize:12, color:"#888", marginBottom:20 }}>Completa los datos para agregar una nueva campaña</div>
            <div className="form-grid">
              <div className="full-col">
                <div className="form-label">NOMBRE DE LA CAMPAÑA *</div>
                <input className="inp" value={newCamp.nombre} onChange={e => setNewCamp(p=>({...p,nombre:e.target.value}))} placeholder="Ej: Lanzamiento Verano 2026" />
              </div>
              <div>
                <div className="form-label">PROVEEDOR</div>
                <input className="inp" value={newCamp.proveedor} onChange={e => setNewCamp(p=>({...p,proveedor:e.target.value}))} placeholder="Nombre del proveedor" />
              </div>
              <div>
                <div className="form-label">ESTATUS</div>
                <select className="inp" value={newCamp.status} onChange={e => setNewCamp(p=>({...p,status:e.target.value}))}>
                  <option>En progreso</option><option>Revisión</option><option>Completado</option><option>Pausado</option>
                </select>
              </div>
              <div>
                <div className="form-label">FECHA DE INICIO</div>
                <input className="inp" type="date" value={newCamp.fechaInicio} onChange={e => setNewCamp(p=>({...p,fechaInicio:e.target.value}))} />
              </div>
              <div>
                <div className="form-label">FECHA DE CITA</div>
                <input className="inp" type="date" value={newCamp.fechaCita} onChange={e => setNewCamp(p=>({...p,fechaCita:e.target.value}))} />
              </div>
              <div className="full-col">
                <div className="form-label">FECHA DE ENTREGA</div>
                <input className="inp" type="date" value={newCamp.fechaEntrega} onChange={e => setNewCamp(p=>({...p,fechaEntrega:e.target.value}))} />
              </div>
              <div>
                <div className="form-label">PERSONA QUE SOLICITA</div>
                <input className="inp" value={newCamp.solicitante} onChange={e => setNewCamp(p=>({...p,solicitante:e.target.value}))} placeholder="Nombre del solicitante" />
              </div>
              <div>
                <div className="form-label">CONTACTO CLIENTE</div>
                <input className="inp" value={newCamp.clienteNombre} onChange={e => setNewCamp(p=>({...p,clienteNombre:e.target.value}))} placeholder="Nombre del cliente" />
              </div>
              <div>
                <div className="form-label">TELÉFONO CLIENTE</div>
                <input className="inp" value={newCamp.clienteTel} onChange={e => setNewCamp(p=>({...p,clienteTel:e.target.value}))} placeholder="+52 55 0000 0000" />
              </div>
              <div>
                <div className="form-label">EMAIL CLIENTE</div>
                <input className="inp" value={newCamp.clienteEmail} onChange={e => setNewCamp(p=>({...p,clienteEmail:e.target.value}))} placeholder="correo@ejemplo.com" />
              </div>
            </div>
            <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:20 }}>
              <button className="note-btn" onClick={() => setShowNewCampaign(false)}>Cancelar</button>
              <button className="sbtn" onClick={() => {
                if(!newCamp.nombre.trim()) return;
                const id = Date.now();
                const camp = { ...newCamp, id, ownerId: currentUser.id, ownerName: currentUser.nombre, pendientes:[], semanas:{} };
                setCampanas(prev => [...prev, camp]);
                setPends(prev => ({...prev, [id]:[]}));
                setNotes(prev => ({...prev, [id]:{}}));
                setSelectedId(id);
                setShowNewCampaign(false);
              }}>✓ Crear campaña</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
