// ./juegos/71-contrasenaPiezas.js
// Minijuego: introducir una contraseña de letras.
// La contraseña correcta es "CRISTI" (no distingue mayúsculas/minúsculas).
// Pista que verá el jugador: "En las piezas se esconde la contraseña".

const SECRET_PASSWORD = "CRISTI";

function makePasswordStyles() {
  return `
  .pwd-root{
    position:fixed;
    inset:0;
    z-index:2600;
    display:flex;
    align-items:center;
    justify-content:center;
    background:radial-gradient(circle at top,#020617 0%,#020617 40%,#000 100%);
    font-family:"Poppins",system-ui,-apple-system,"Segoe UI",Roboto,Arial;
    color:#e5e7eb;
  }
  .pwd-panel{
    width:min(420px,92vw);
    max-height:92vh;
    background:linear-gradient(180deg,#020617,#020617 45%,#020617 100%);
    border-radius:20px;
    border:1px solid rgba(148,163,184,0.45);
    box-shadow:0 22px 52px rgba(15,23,42,0.9);
    padding:20px 18px 18px;
    display:flex;
    flex-direction:column;
    gap:12px;
    position:relative;
    overflow:hidden;
  }
  .pwd-header{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:10px;
  }
  .pwd-header-left{
    display:flex;
    flex-direction:column;
    gap:2px;
  }
  .pwd-title{
    font-size:1.05rem;
    font-weight:900;
    letter-spacing:.08em;
    text-transform:uppercase;
  }
  .pwd-sub{
    font-size:.9rem;
    color:rgba(226,232,240,0.82);
  }
  .pwd-close-btn{
    border-radius:999px;
    padding:6px 12px;
    border:1px solid rgba(148,163,184,0.6);
    background:#020617;
    color:#e5edff;
    font-weight:700;
    cursor:pointer;
    font-size:.85rem;
  }
  .pwd-body{
    margin-top:6px;
    background:radial-gradient(ellipse at top,#020617 0%,#020617 50%,#020617 100%);
    border-radius:14px;
    border:1px solid rgba(148,163,184,0.35);
    padding:14px;
    display:flex;
    flex-direction:column;
    gap:12px;
  }
  .pwd-hint{
    font-size:.9rem;
    color:rgba(209,213,219,0.9);
  }
  .pwd-input-label{
    font-size:.85rem;
    color:rgba(148,163,184,0.95);
    margin-bottom:4px;
  }
  .pwd-input-wrap{
    display:flex;
    flex-direction:column;
    gap:8px;
  }
  .pwd-input{
    width:100%;
    padding:10px 12px;
    border-radius:10px;
    border:1px solid rgba(148,163,184,0.7);
    background:#020617;
    color:#e5e7eb;
    font-size:1rem;
    letter-spacing:.16em;
    text-transform:uppercase;
    outline:none;
  }
  .pwd-input::placeholder{
    color:rgba(107,114,128,0.7);
  }
  .pwd-input:focus{
    border-color:rgba(59,130,246,0.9);
    box-shadow:0 0 0 1px rgba(59,130,246,0.75);
  }
  .pwd-slots{
    display:flex;
    justify-content:center;
    gap:6px;
    margin-top:4px;
  }
  .pwd-slot{
    width:38px;
    height:46px;
    border-radius:10px;
    border:1px solid rgba(148,163,184,0.6);
    background:linear-gradient(180deg,#020617,#020617);
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:1.1rem;
    font-weight:800;
    letter-spacing:.12em;
    color:#e5e7eb;
  }
  .pwd-footer{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-top:6px;
    font-size:.85rem;
    color:rgba(148,163,184,0.9);
  }
  .pwd-message{
    min-height:1.2em;
  }
  .pwd-actions{
    display:flex;
    gap:8px;
  }
  .pwd-btn{
    padding:8px 14px;
    border-radius:999px;
    border:none;
    cursor:pointer;
    font-weight:800;
    font-size:.85rem;
    letter-spacing:.08em;
    text-transform:uppercase;
  }
  .pwd-btn-main{
    background:linear-gradient(180deg,#22c55e,#15803d);
    color:#ecfdf5;
    box-shadow:0 10px 24px rgba(22,163,74,0.45);
  }
  .pwd-btn-ghost{
    background:transparent;
    border:1px solid rgba(148,163,184,0.6);
    color:#e5e7eb;
  }
  .pwd-panel.shake{
    animation:pwd-shake .35s ease;
  }
  @keyframes pwd-shake{
    0%{ transform:translateX(0); }
    25%{ transform:translateX(-8px); }
    50%{ transform:translateX(8px); }
    75%{ transform:translateX(-5px); }
    100%{ transform:translateX(0); }
  }
  .pwd-success-overlay{
    position:absolute;
    inset:0;
    background:radial-gradient(circle at top,rgba(34,197,94,0.14),rgba(2,6,23,0.96));
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:10;
  }
  .pwd-success-box{
    background:linear-gradient(180deg,#ecfdf5,#d1fae5);
    border-radius:18px;
    border:1px solid rgba(22,163,74,0.4);
    padding:20px 18px;
    max-width:360px;
    width:min(90vw,360px);
    text-align:center;
    color:#064e3b;
    box-shadow:0 18px 40px rgba(4,120,87,0.35);
  }
  .pwd-success-title{
    font-size:1.05rem;
    font-weight:900;
    margin-bottom:8px;
  }
  .pwd-success-text{
    font-size:.95rem;
    margin-bottom:12px;
  }
  .pwd-success-btn{
    padding:9px 18px;
    border-radius:999px;
    border:none;
    background:linear-gradient(180deg,#22c55e,#16a34a);
    color:#ecfdf5;
    font-weight:800;
    letter-spacing:.08em;
    text-transform:uppercase;
    cursor:pointer;
    box-shadow:0 10px 26px rgba(22,163,74,0.5);
  }
  @media(max-width:480px){
    .pwd-panel{
      padding:18px 14px 14px;
    }
  }
  `;
}

export function startMinigame(opts = {}) {
  const { onClose, pauseGameTimer, resumeGameTimer } = opts;

  if (typeof pauseGameTimer === "function") pauseGameTimer();

  // Inyectar estilos si no están
  if (!document.getElementById("pwdPiezasStyles")) {
    const st = document.createElement("style");
    st.id = "pwdPiezasStyles";
    st.textContent = makePasswordStyles();
    document.head.appendChild(st);
  }

  const root = document.createElement("div");
  root.className = "pwd-root";
  root.setAttribute("role", "dialog");
  root.setAttribute("aria-modal", "true");

  const panel = document.createElement("div");
  panel.className = "pwd-panel";

  // HEADER
  const header = document.createElement("div");
  header.className = "pwd-header";

  const headerLeft = document.createElement("div");
  headerLeft.className = "pwd-header-left";

  const title = document.createElement("div");
  title.className = "pwd-title";
  title.textContent = "Candado de letras";

  const sub = document.createElement("div");
  sub.className = "pwd-sub";
  sub.textContent = "En las piezas se esconde la contraseña.";

  headerLeft.appendChild(title);
  headerLeft.appendChild(sub);

  const closeBtn = document.createElement("button");
  closeBtn.className = "pwd-close-btn";
  closeBtn.textContent = "Salir";
  closeBtn.type = "button";
  closeBtn.addEventListener("click", () => cleanup(false));

  header.appendChild(headerLeft);
  header.appendChild(closeBtn);

  // BODY
  const body = document.createElement("div");
  body.className = "pwd-body";

  const hint = document.createElement("div");
  hint.className = "pwd-hint";
  hint.textContent = "Introduce la contraseña con letras. No importa si usas mayúsculas o minúsculas.";

  const inputLabel = document.createElement("div");
  inputLabel.className = "pwd-input-label";
  inputLabel.textContent = "Contraseña:";

  const inputWrap = document.createElement("div");
  inputWrap.className = "pwd-input-wrap";

  const input = document.createElement("input");
  input.className = "pwd-input";
  input.type = "text";
  input.maxLength = 16;
  input.autocomplete = "off";
  input.placeholder = "******";

  const slotsWrap = document.createElement("div");
  slotsWrap.className = "pwd-slots";

  const targetLength = SECRET_PASSWORD.length;
  const slotEls = [];

  for (let i = 0; i < targetLength; i++) {
    const slot = document.createElement("div");
    slot.className = "pwd-slot";
    slot.textContent = "_";
    slotsWrap.appendChild(slot);
    slotEls.push(slot);
  }

  inputWrap.appendChild(input);
  inputWrap.appendChild(slotsWrap);

  body.appendChild(hint);
  body.appendChild(inputLabel);
  body.appendChild(inputWrap);

  // FOOTER
  const footer = document.createElement("div");
  footer.className = "pwd-footer";

  const messageEl = document.createElement("div");
  messageEl.className = "pwd-message";

  const actions = document.createElement("div");
  actions.className = "pwd-actions";

  const cancelBtn = document.createElement("button");
  cancelBtn.className = "pwd-btn pwd-btn-ghost";
  cancelBtn.type = "button";
  cancelBtn.textContent = "Cancelar";
  cancelBtn.addEventListener("click", () => cleanup(false));

  const okBtn = document.createElement("button");
  okBtn.className = "pwd-btn pwd-btn-main";
  okBtn.type = "button";
  okBtn.textContent = "Aceptar";

  actions.appendChild(cancelBtn);
  actions.appendChild(okBtn);

  footer.appendChild(messageEl);
  footer.appendChild(actions);

  // Montar
  panel.appendChild(header);
  panel.appendChild(body);
  panel.appendChild(footer);
  root.appendChild(panel);
  document.body.appendChild(root);

  let finished = false;

  function updateSlots() {
    const value = input.value.toUpperCase();
    for (let i = 0; i < slotEls.length; i++) {
      const ch = value[i];
      slotEls[i].textContent = ch ? ch : "_";
    }
  }

  function checkPassword() {
    const raw = input.value.trim();
    const value = raw.toUpperCase();

    if (!value) {
      messageEl.textContent = "Introduce alguna letra.";
      return;
    }

    if (value === SECRET_PASSWORD) {
      showSuccess();
    } else {
      messageEl.textContent = "Contraseña incorrecta. El candado permanece cerrado.";
      panel.classList.remove("shake");
      void panel.offsetWidth;
      panel.classList.add("shake");
    }
  }

  function showSuccess() {
    finished = true;

    const overlay = document.createElement("div");
    overlay.className = "pwd-success-overlay";

    const box = document.createElement("div");
    box.className = "pwd-success-box";

    const t = document.createElement("div");
    t.className = "pwd-success-title";
    t.textContent = "¡Candado desbloqueado!";

    const txt = document.createElement("div");
    txt.className = "pwd-success-text";
    // Cambia el mensaje a lo que quieras (carta, color, etc.)
    txt.textContent = "Has descubierto la palabra CRISTI. Puedes coger ahora la carta que indique el juego.";

    const btn = document.createElement("button");
    btn.className = "pwd-success-btn";
    btn.type = "button";
    btn.textContent = "Cerrar";
    btn.addEventListener("click", () => cleanup(true));

    box.appendChild(t);
    box.appendChild(txt);
    box.appendChild(btn);
    overlay.appendChild(box);
    panel.appendChild(overlay);

    if (typeof onClose === "function") {
      onClose(true);
    }
  }

  function cleanup(ok) {
    try {
      document.removeEventListener("keydown", onKeyDown);
      if (document.body.contains(root)) {
        document.body.removeChild(root);
      }
    } catch (e) {}

    if (typeof resumeGameTimer === "function") resumeGameTimer();
    if (typeof onClose === "function" && !finished) {
      onClose(!!ok);
    }
  }

  function onKeyDown(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      cleanup(false);
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      checkPassword();
      return;
    }
  }

  input.addEventListener("input", () => {
    // Evitar espacios internos raros
    input.value = input.value.replace(/\s+/g, "");
    updateSlots();
    messageEl.textContent = "";
  });

  okBtn.addEventListener("click", () => {
    checkPassword();
  });

  document.addEventListener("keydown", onKeyDown);

  // Foco inicial
  setTimeout(() => {
    input.focus();
    updateSlots();
  }, 50);

  return {
    root
  };
}

// Para depurar en consola si quieres
if (typeof window !== "undefined") {
  window.startMinijuegoContrasenaPiezas = startMinigame;
}
