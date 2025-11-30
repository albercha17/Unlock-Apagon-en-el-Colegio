// ./juegos/70-quizRacha.js
// Minijuego: responder preguntas hasta lograr 4 aciertos seguidos.
// La cola de preguntas se baraja al iniciar. Si fallas, la racha vuelve a 0,
// pero las preguntas continúan desde la siguiente.

const QUIZ_TARGET_STREAK = 4;

// 👉 Preguntas de cultura general nivel ESO (40 preguntas)
const QUIZ_QUESTIONS = [
  {
    text: "¿Cuál es la capital de Francia?",
    choices: ["Madrid", "París", "Roma", "Berlín"],
    correctIndex: 1
  },
  {
    text: "Si 2x + 3 = 11, ¿cuál es el valor de x?",
    choices: ["2", "3", "4", "5"],
    correctIndex: 2
  },
  {
    text: "¿Qué órgano del cuerpo se encarga principalmente del intercambio de oxígeno y dióxido de carbono?",
    choices: ["Corazón", "Pulmones", "Hígado", "Riñones"],
    correctIndex: 1
  },
  {
    text: "¿Qué sustancia representa la fórmula química H₂O?",
    choices: ["Oxígeno", "Hidrógeno", "Agua", "Dióxido de carbono"],
    correctIndex: 2
  },
  {
    text: "¿Qué revolución comenzó en 1789?",
    choices: ["Revolución Rusa", "Revolución Industrial", "Revolución Francesa", "Revolución Americana"],
    correctIndex: 2
  },
  {
    text: "¿Qué es un ecosistema?",
    choices: [
      "Un tipo de roca",
      "La suma de atmósfera y océanos",
      "Conjunto de seres vivos y el medio en el que viven",
      "Solo un bosque con animales"
    ],
    correctIndex: 2
  },
  {
    text: "¿Cuál de los siguientes números es primo?",
    choices: ["21", "27", "33", "29"],
    correctIndex: 3
  },
  {
    text: "¿Cómo se llaman las grandes piezas que componen la corteza terrestre y se mueven muy lentamente?",
    choices: ["Placas tectónicas", "Capas atmosféricas", "Cinturones de Van Allen", "Celdas convectivas"],
    correctIndex: 0
  },
  {
    text: "La ley de la inercia fue formulada por…",
    choices: ["Galileo Galilei", "Isaac Newton", "Albert Einstein", "Marie Curie"],
    correctIndex: 1
  },
  {
    text: "¿Cuál es el 30% de 250?",
    choices: ["50", "65", "75", "90"],
    correctIndex: 2
  },
  {
    text: "¿Quién escribió «La casa de Bernarda Alba»?",
    choices: ["Miguel de Cervantes", "Federico García Lorca", "Antonio Machado", "Benito Pérez Galdós"],
    correctIndex: 1
  },
  {
    text: "¿A qué género literario pertenece «El Señor de los Anillos»?",
    choices: ["Poesía lírica", "Teatro", "Novela", "Ensayo"],
    correctIndex: 2
  },
  {
    text: "¿En qué continente se encuentra Brasil?",
    choices: ["Europa", "América del Sur", "África", "Oceanía"],
    correctIndex: 1
  },
  {
    text: "¿Qué río atraviesa Egipto de sur a norte?",
    choices: ["Amazonas", "Danubio", "Nilo", "Misisipi"],
    correctIndex: 2
  },
  {
    text: "En el Sistema Internacional, ¿en qué unidad se mide la velocidad?",
    choices: ["Metro", "Metro por segundo", "Newton", "Julio"],
    correctIndex: 1
  },
  {
    text: "Mezclar agua y sal forma…",
    choices: ["Un compuesto", "Una mezcla homogénea", "Una mezcla heterogénea", "Un gas"],
    correctIndex: 1
  },
  {
    text: "¿Cuál de estos materiales es atraído con más facilidad por un imán?",
    choices: ["Cobre", "Plástico", "Hierro", "Aluminio"],
    correctIndex: 2
  },
  {
    text: "La suma de los ángulos interiores de un triángulo siempre es…",
    choices: ["90°", "120°", "180°", "270°"],
    correctIndex: 2
  },
  {
    text: "¿Cómo se llama un polígono de 8 lados?",
    choices: ["Hexágono", "Heptágono", "Octógono", "Decágono"],
    correctIndex: 2
  },
  {
    text: "En una célula humana normal (no sexual), ¿cuántos cromosomas hay?",
    choices: ["23", "32", "44", "46"],
    correctIndex: 3
  },
  {
    text: "La energía que obtenemos al comer alimentos es principalmente energía…",
    choices: ["Mecánica", "Química", "Lumínica", "Eléctrica"],
    correctIndex: 1
  },
  {
    text: "El efecto invernadero se relaciona sobre todo con el aumento de…",
    choices: ["Ozono", "Vapor de agua", "Gases como CO₂", "Nitrógeno"],
    correctIndex: 2
  },
  {
    text: "¿Qué institución representa a los ciudadanos de la Unión Europea y aprueba leyes junto con el Consejo?",
    choices: [
      "Comisión Europea",
      "Parlamento Europeo",
      "Banco Central Europeo",
      "Consejo de Europa"
    ],
    correctIndex: 1
  },
  {
    text: "¿Cuál es la lengua cooficial, además del castellano, en Cataluña?",
    choices: ["Gallego", "Euskera", "Asturiano", "Catalán"],
    correctIndex: 3
  },
  {
    text: "En un plano de coordenadas, el eje horizontal se llama…",
    choices: ["Eje Y", "Eje X", "Eje Z", "Eje central"],
    correctIndex: 1
  },
  {
    text: "¿Cuánto es 5²?",
    choices: ["10", "20", "25", "30"],
    correctIndex: 2
  },
  {
    text: "Cuando un rayo de luz cambia de dirección al pasar de un medio a otro, se produce…",
    choices: ["Reflexión", "Refracción", "Difracción", "Absorción"],
    correctIndex: 1
  },
  {
    text: "¿Cuál de estas fuentes de energía NO es renovable?",
    choices: ["Eólica", "Solar", "Petróleo", "Hidráulica"],
    correctIndex: 2
  },
  {
    text: "¿Cuál es el planeta más grande del Sistema Solar?",
    choices: ["Tierra", "Marte", "Saturno", "Júpiter"],
    correctIndex: 3
  },
  {
    text: "¿Cuál es el símbolo químico del sodio?",
    choices: ["So", "Na", "Ni", "S"],
    correctIndex: 1
  },
  {
    text: "¿En qué orden tienen las partículas del agua mayor a menor grado de orden?",
    choices: [
      "Gas > líquido > sólido",
      "Líquido > sólido > gas",
      "Sólido > líquido > gas",
      "Líquido > gas > sólido"
    ],
    correctIndex: 2
  },
  {
    text: "¿Qué instrumento se utiliza para medir los terremotos?",
    choices: ["Barómetro", "Sismógrafo", "Anemómetro", "Termómetro"],
    correctIndex: 1
  },
  {
    text: "¿Entre qué años transcurrió la Segunda Guerra Mundial?",
    choices: ["1914–1918", "1929–1936", "1939–1945", "1950–1955"],
    correctIndex: 2
  },
  {
    text: "¿Qué pintor español es autor del cuadro «Guernica»?",
    choices: ["Salvador Dalí", "Francisco de Goya", "Pablo Picasso", "Joan Miró"],
    correctIndex: 2
  },
  {
    text: "«Tres tristes tigres comen trigo…». La repetición de sonidos es un ejemplo de…",
    choices: ["Metáfora", "Aliteración", "Hipérbole", "Personificación"],
    correctIndex: 1
  },
  {
    text: "¿En qué palabra hay un diptongo?",
    choices: ["Caer", "Poeta", "Frío", "Tierra"],
    correctIndex: 3
  },
  {
    text: "Una disolución con pH menor que 7 se considera…",
    choices: ["Neutra", "Básica", "Ácida", "Metálica"],
    correctIndex: 2
  },
  {
    text: "Un coche va a 60 km/h durante 2 horas. ¿Qué distancia recorre?",
    choices: ["60 km", "100 km", "110 km", "120 km"],
    correctIndex: 3
  },
  {
    text: "¿Cuál de estas opciones define mejor una democracia?",
    choices: [
      "Gobierno de una sola persona",
      "Gobierno controlado por el ejército",
      "Gobierno del pueblo mediante representantes elegidos",
      "Gobierno de una familia noble"
    ],
    correctIndex: 2
  },
  {
    text: "¿Qué componente del ordenador almacena los datos de forma permanente?",
    choices: ["RAM", "Monitor", "Teclado", "Disco duro"],
    correctIndex: 3
  },
  {
    text: "¿Qué magnitud se mide en ohmios (Ω)?",
    choices: ["Intensidad eléctrica", "Voltaje", "Resistencia eléctrica", "Potencia eléctrica"],
    correctIndex: 2
  }
];

// Pequeño shuffle
function shuffleArray(arr){
  const a = [...arr];
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}

function makeQuizStyles(){
  return `
  .quiz-root{
    position:fixed; inset:0; z-index:2600;
    display:flex; align-items:center; justify-content:center;
    background:radial-gradient(circle at top,#020617 0%,#020617 40%,#000 100%);
    font-family:"Poppins",system-ui,-apple-system,"Segoe UI",Roboto,Arial;
  }
  .quiz-panel{
    width:min(780px,96vw);
    max-height:92vh;
    background:linear-gradient(180deg,#020617,#020617 40%,#020617 100%);
    border-radius:20px;
    border:1px solid rgba(148,163,184,0.45);
    box-shadow:0 22px 52px rgba(15,23,42,0.9);
    color:#e5edff;
    padding:20px 18px 18px;
    display:flex;
    flex-direction:column;
    gap:12px;
    position:relative;
    overflow:hidden;
  }
  .quiz-header{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:10px;
  }
  .quiz-header-main{
    display:flex;
    align-items:center;
    gap:10px;
  }
  .quiz-robot-avatar{
    width:52px;
    height:52px;
    border-radius:50%;
    background:#020617;
    border:1px solid rgba(148,163,184,0.7);
    box-shadow:0 8px 20px rgba(15,23,42,0.8);
    background-position:center;
    background-size:cover;
    background-repeat:no-repeat;
    flex:0 0 52px;
  }
  /* 👇 Aquí puedes poner tu PNG de RoboCris 3000 */
  /* .quiz-robot-avatar{ background-image:url("./images/robocris3000.png"); } */

  .quiz-header-left{
    display:flex;
    flex-direction:column;
    gap:2px;
  }
  .quiz-title{
    font-size:1.1rem;
    font-weight:900;
    letter-spacing:.08em;
    text-transform:uppercase;
  }
  .quiz-sub{
    font-size:.9rem;
    color:rgba(226,232,240,0.8);
  }
  .quiz-close-btn{
    border-radius:999px;
    padding:6px 12px;
    border:1px solid rgba(148,163,184,0.5);
    background:#020617;
    color:#e5edff;
    font-weight:700;
    cursor:pointer;
    font-size:.85rem;
  }
  .quiz-stats{
    display:flex;
    justify-content:space-between;
    font-size:.85rem;
    color:rgba(209,213,219,0.85);
    margin-top:4px;
  }
  .quiz-streak{
    font-weight:700;
  }
  .quiz-streak span{
    color:#bbf7d0;
  }
  .quiz-body{
    margin-top:8px;
    background:radial-gradient(ellipse at top,#020617 0%,#020617 45%,#020617 100%);
    border-radius:14px;
    border:1px solid rgba(148,163,184,0.35);
    padding:14px;
    display:flex;
    flex-direction:column;
    gap:12px;
  }
  .quiz-question{
    font-size:1.02rem;
    font-weight:700;
    line-height:1.4;
  }
  .quiz-answers{
    display:flex;
    flex-direction:column;
    gap:10px;
    margin-top:4px;
  }
  .quiz-answer-btn{
    border-radius:12px;
    border:1px solid rgba(148,163,184,0.4);
    background:linear-gradient(180deg,#020617,#020617);
    color:#e5edff;
    padding:10px 12px;
    cursor:pointer;
    text-align:left;
    font-size:.95rem;
    font-weight:600;
    display:flex;
    gap:8px;
    align-items:center;
    transition:transform .12s ease, box-shadow .12s ease, border-color .12s ease, background .12s ease;
  }
  .quiz-answer-btn:hover{
    transform:translateY(-2px);
    box-shadow:0 10px 24px rgba(15,23,42,0.85);
    border-color:rgba(96,165,250,0.8);
  }
  .quiz-answer-index{
    width:26px; height:26px;
    border-radius:999px;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    font-size:.8rem;
    font-weight:800;
    background:rgba(15,23,42,0.9);
    border:1px solid rgba(148,163,184,0.6);
    flex:0 0 26px;
  }
  .quiz-answer-text{
    flex:1;
  }
  .quiz-answer-btn.correct{
    background:linear-gradient(180deg,#16a34a,#15803d);
    border-color:rgba(34,197,94,0.9);
    color:#ecfdf3;
    box-shadow:0 12px 30px rgba(34,197,94,0.4);
  }
  .quiz-answer-btn.wrong{
    background:linear-gradient(180deg,#7f1d1d,#450a0a);
    border-color:rgba(248,113,113,0.9);
    color:#fee2e2;
    box-shadow:0 12px 30px rgba(248,113,113,0.4);
  }
  .quiz-footer{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-top:4px;
    font-size:.85rem;
    color:rgba(148,163,184,0.85);
  }
  .quiz-message{
    min-height:1.2em;
  }
  .quiz-next-hint{
    font-size:.8rem;
    opacity:.8;
  }
  .quiz-success-overlay{
    position:absolute;
    inset:0;
    background:radial-gradient(circle at top,rgba(34,197,94,0.14),rgba(2,6,23,0.96));
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:10;
  }
  .quiz-success-box{
    background:linear-gradient(180deg,#ecfdf5,#d1fae5);
    border-radius:18px;
    border:1px solid rgba(22,163,74,0.4);
    padding:20px 18px;
    max-width:420px;
    width:min(90vw,420px);
    text-align:center;
    color:#064e3b;
    box-shadow:0 18px 40px rgba(4,120,87,0.35);
  }
  .quiz-success-title{
    font-size:1.1rem;
    font-weight:900;
    margin-bottom:8px;
  }
  .quiz-success-text{
    font-size:.95rem;
    margin-bottom:12px;
  }
  .quiz-success-btn{
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
  .quiz-panel.shake{
    animation:quiz-shake .35s ease;
  }
  @keyframes quiz-shake{
    0%{ transform:translateX(0); }
    25%{ transform:translateX(-8px); }
    50%{ transform:translateX(8px); }
    75%{ transform:translateX(-5px); }
    100%{ transform:translateX(0); }
  }

  @media (max-width:640px){
    .quiz-panel{
      padding:18px 14px 14px;
    }
    .quiz-title{ font-size:1.0rem; }
    .quiz-question{ font-size:.98rem; }
  }
  `;
}

export function startMinigame(opts = {}) {
  const { onClose, pauseGameTimer, resumeGameTimer } = opts;

  if (typeof pauseGameTimer === "function") pauseGameTimer();

  // Inyectar estilos si no existen
  if (!document.getElementById("quizRachaStyles")) {
    const st = document.createElement("style");
    st.id = "quizRachaStyles";
    st.textContent = makeQuizStyles();
    document.head.appendChild(st);
  }

  const root = document.createElement("div");
  root.className = "quiz-root";
  root.setAttribute("role", "dialog");
  root.setAttribute("aria-modal", "true");

  const panel = document.createElement("div");
  panel.className = "quiz-panel";

  // HEADER
  const header = document.createElement("div");
  header.className = "quiz-header";

  const headerMain = document.createElement("div");
  headerMain.className = "quiz-header-main";

  const avatar = document.createElement("div");
  avatar.className = "quiz-robot-avatar";
  // Si quieres usar <img> en vez de background:
  // const avatarImg = document.createElement("img");
  // avatarImg.src = "./images/robocris3000.png";
  // avatarImg.alt = "RoboCris 3000";
  // avatar.appendChild(avatarImg);

  const headerLeft = document.createElement("div");
  headerLeft.className = "quiz-header-left";
  const title = document.createElement("div");
  title.className = "quiz-title";
  title.textContent = "RoboCris 3000";

  const sub = document.createElement("div");
  sub.className = "quiz-sub";
  sub.textContent = `Unidad RoboCris 3000 online. Demuestra que eres más listo que un estudiante de la ESO consiguiendo ${QUIZ_TARGET_STREAK} aciertos seguidos.`;

  headerLeft.appendChild(title);
  headerLeft.appendChild(sub);

  headerMain.appendChild(avatar);
  headerMain.appendChild(headerLeft);

  const closeBtn = document.createElement("button");
  closeBtn.className = "quiz-close-btn";
  closeBtn.textContent = "Salir";
  closeBtn.onclick = () => cleanup(false);

  header.appendChild(headerMain);
  header.appendChild(closeBtn);

  // STATS
  const stats = document.createElement("div");
  stats.className = "quiz-stats";
  const streakEl = document.createElement("div");
  streakEl.className = "quiz-streak";
  const indexEl = document.createElement("div");

  stats.appendChild(streakEl);
  stats.appendChild(indexEl);

  // BODY: pregunta + respuestas
  const body = document.createElement("div");
  body.className = "quiz-body";

  const questionEl = document.createElement("div");
  questionEl.className = "quiz-question";

  const answersWrap = document.createElement("div");
  answersWrap.className = "quiz-answers";

  body.appendChild(questionEl);
  body.appendChild(answersWrap);

  // FOOTER: mensajes
  const footer = document.createElement("div");
  footer.className = "quiz-footer";
  const messageEl = document.createElement("div");
  messageEl.className = "quiz-message";
  const hintEl = document.createElement("div");
  hintEl.className = "quiz-next-hint";
  hintEl.textContent = "Selecciona una respuesta para contestar a RoboCris 3000.";

  footer.appendChild(messageEl);
  footer.appendChild(hintEl);

  // Montar panel
  panel.appendChild(header);
  panel.appendChild(stats);
  panel.appendChild(body);
  panel.appendChild(footer);
  root.appendChild(panel);
  document.body.appendChild(root);

  // Estado del juego
  const indices = shuffleArray(QUIZ_QUESTIONS.map((_, i) => i));
  let currentIndexPos = 0;
  let streak = 0;
  let answeredLock = false;
  let finished = false;

  function getCurrentQuestion() {
    const qIndex = indices[currentIndexPos];
    return QUIZ_QUESTIONS[qIndex];
  }

  function updateStats() {
    streakEl.innerHTML = `Racha actual de aciertos: <span>${streak}</span> / ${QUIZ_TARGET_STREAK}`;
    indexEl.textContent = `Pregunta ${currentIndexPos + 1} de ${indices.length}`;
  }

  function showQuestion() {
    answeredLock = false;
    const q = getCurrentQuestion();

    questionEl.textContent = q.text;
    answersWrap.innerHTML = "";
    messageEl.textContent = "Procesando pregunta…";

    q.choices.forEach((choice, idx) => {
      const btn = document.createElement("button");
      btn.className = "quiz-answer-btn";
      btn.type = "button";

      const indexBadge = document.createElement("span");
      indexBadge.className = "quiz-answer-index";
      indexBadge.textContent = String.fromCharCode(65 + idx); // A, B, C...

      const txt = document.createElement("span");
      txt.className = "quiz-answer-text";
      txt.textContent = choice;

      btn.appendChild(indexBadge);
      btn.appendChild(txt);

      btn.addEventListener("click", () => handleAnswerClick(idx, btn));

      answersWrap.appendChild(btn);
    });

    updateStats();
  }

  function handleAnswerClick(chosenIndex, btn) {
    if (answeredLock || finished) return;
    answeredLock = true;

    const q = getCurrentQuestion();
    const isCorrect = chosenIndex === q.correctIndex;

    const allBtns = Array.from(answersWrap.querySelectorAll(".quiz-answer-btn"));
    allBtns.forEach((b, idx) => {
      b.disabled = true;
      if (idx === q.correctIndex) {
        b.classList.add("correct");
      }
      if (idx === chosenIndex && !isCorrect) {
        b.classList.add("wrong");
      }
    });

    if (isCorrect) {
      streak++;
      messageEl.textContent = "Respuesta correcta. Circuitos satisfechos.";
      if (streak >= QUIZ_TARGET_STREAK) {
        finishGame();
        return;
      }
    } else {
      streak = 0;
      messageEl.textContent = "Respuesta incorrecta. Reiniciando racha a 0…";
      panel.classList.remove("shake");
      void panel.offsetWidth;
      panel.classList.add("shake");
    }

    updateStats();

    setTimeout(() => {
      panel.classList.remove("shake");
      currentIndexPos++;

      if (currentIndexPos >= indices.length) {
        currentIndexPos = 0;
      }
      showQuestion();
    }, 900);
  }

  function finishGame() {
    finished = true;

    const overlay = document.createElement("div");
    overlay.className = "quiz-success-overlay";

    const box = document.createElement("div");
    box.className = "quiz-success-box";

    const t = document.createElement("div");
    t.className = "quiz-success-title";
    t.textContent = "RoboCris 3000: Reto completado.";

    const txt = document.createElement("div");
    txt.className = "quiz-success-text";
    txt.textContent = "Cálculo final: superas la media de la ESO. El color que debes recordar es MORADO. Repito: MORADO.";

    const btn = document.createElement("button");
    btn.className = "quiz-success-btn";
    btn.textContent = "Cerrar";
    btn.onclick = () => cleanup(true);

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
    } catch(e){}

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
    if (!answeredLock && !finished) {
      const q = getCurrentQuestion();
      if (e.key >= "1" && e.key <= "4") {
        const idx = Number(e.key) - 1;
        if (idx < q.choices.length) {
          const btn = answersWrap.querySelectorAll(".quiz-answer-btn")[idx];
          if (btn) handleAnswerClick(idx, btn);
        }
      }
    }
  }

  document.addEventListener("keydown", onKeyDown);

  // Iniciar
  showQuestion();

  return {
    root,
    getState: () => ({
      streak,
      currentIndexPos,
      totalQuestions: indices.length
    })
  };
}

// Para depurar en consola si quieres
if (typeof window !== "undefined") {
  window.startMinijuegoQuizRacha = startMinigame;
}
