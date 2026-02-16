/* =============================================================================
  app.js — Explorador de Artes · Musicala (Lobby editorial + Filtros) PRO++++++
  -----------------------------------------------------------------------------
  ✅ Tabs + Vista (home lobby + listas por arte)
  ✅ Filtros: etapa/objetivo/modalidad + búsqueda (debounce)
  ✅ Modal accesible: ESC, backdrop, focus trap, restore focus
  ✅ WhatsApp real: 3193529475 (wa.me)
  ✅ Home “Lobby editorial”: 4 cards grandes + Top Picks por área
  ✅ Imágenes: usa MUSICALA_DATA.assets + item.img (PNG reales) + fallbacks por área
  ✅ Auditor opcional (console): detecta incoherencias contra filters
  ✅ No dependencias, GitHub Pages friendly
============================================================================= */

(() => {
  "use strict";

  /* =========================
     Helpers
  ========================= */
  const $  = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  const debounce = (fn, ms=160) => {
    let t = null;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), ms);
    };
  };

  function escapeHtml(str){
    return String(str ?? "")
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  // Para selectores CSS (chips con acentos o símbolos)
  function cssEsc(str){
    if(window.CSS && typeof CSS.escape === "function") return CSS.escape(String(str));
    return String(str).replace(/["\\]/g, "\\$&");
  }

  function shuffleInPlace(arr){
    for(let i = arr.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Normalización para búsqueda (amable con tildes)
  const norm = (s) => String(s ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  function safeText(s, fallback=""){
    const v = String(s ?? "").trim();
    return v ? v : fallback;
  }

  const prefersReducedMotion = () =>
    !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  /* =========================
     WhatsApp
  ========================= */
  const WA_NUMBER = "573193529475"; // +57 3193529475
  const waLink = (text="Hola Musicala 🙂 Quiero info sobre clases y artes disponibles.") =>
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

  /* =========================
     DOM refs
  ========================= */
  const viewEl    = $("#view");
  const qEl       = $("#q");

  const chipStage = $("#chipStage");
  const chipGoal  = $("#chipGoal");
  const chipMode  = $("#chipMode");

  const modal      = $("#modal");
  const modalPanel = modal ? modal.querySelector(".modal__panel") : null;

  const modalTitle = $("#modalTitle");
  const modalMeta  = $("#modalMeta");
  const modalImg   = $("#modalImg");
  const modalBody  = $("#modalBody");
  const modalCTA   = $("#modalCTA");

  const btnClear   = $("#btnClear");
  const btnRandom  = $("#btnRandom");
  const btnCTA     = $("#btnCTA");
  const btnCTA2    = $("#btnCTA2"); // opcional

  /* =========================
     Guards + Data
  ========================= */
  const hasData = !!(window.MUSICALA_DATA && Array.isArray(window.MUSICALA_DATA.items));
  if(!hasData){
    console.warn("MUSICALA_DATA no está cargado. Revisa data.js (debe cargarse antes de app.js).");
  }

  // Assets centralizados (del data.js)
  const A = (hasData && window.MUSICALA_DATA.assets) ? window.MUSICALA_DATA.assets : null;

  // Fallbacks SOLO a assets reales
  const ASSET_FALLBACK = {
    logo: "assets/logo.png",
    music: "assets/musica.png",
    dance: "assets/danzas.png",
    arts: "assets/tecnicasmixtas.png",
    theatre: "assets/teatro.png",
  };

  const getAsset = (key) => (A && A[key]) ? A[key] : (ASSET_FALLBACK[key] || ASSET_FALLBACK.logo);

  /* =========================
     State
  ========================= */
  const state = {
    view: "home",
    stage: null,
    goal: null,
    mode: null,
    q: "",
    lastFocusEl: null,
    modalOpenId: null
  };

  const AREA_MAP = {
    home: null,
    music: "Música",
    dance: "Danzas",
    arts: "Artes Plásticas",
    theatre: "Teatro",
  };

  const VIEW_TITLES = {
    home: "Explorador Musicala",
    music: "Música",
    dance: "Danzas",
    arts: "Artes Plásticas",
    theatre: "Teatro",
  };

  /* =========================
     Data indexes (performance)
  ========================= */
  const ITEMS = hasData ? (window.MUSICALA_DATA.items || []) : [];

  const ITEMS_BY_ID = (() => {
    const m = new Map();
    for(const it of ITEMS){
      if(it && it.id) m.set(it.id, it);
    }
    return m;
  })();

  const ITEMS_BY_AREA = (() => {
    const m = new Map();
    for(const it of ITEMS){
      const k = it.area || "Otros";
      if(!m.has(k)) m.set(k, []);
      m.get(k).push(it);
    }
    return m;
  })();

  // Cache de texto buscable por item
  const SEARCH_HAYSTACK = new Map();
  for(const it of ITEMS){
    const hay = norm([
      it.name, it.area, it.category,
      ...(it.tags || []),
      ...(it.learn || [])
    ].join(" "));
    SEARCH_HAYSTACK.set(it.id, hay);
  }

  /* =========================
     Image fallbacks (por área)
  ========================= */
  function areaFallbackImg(area){
    if(area === "Música") return getAsset("music");
    if(area === "Danzas") return getAsset("dance");
    if(area === "Artes Plásticas") return getAsset("arts");
    if(area === "Teatro") return getAsset("theatre");
    return getAsset("logo");
  }

  function resolveItemImg(item){
    const img = safeText(item?.img, "");
    if(img) return img;
    return areaFallbackImg(item?.area);
  }

  // Blindaje global: si un <img> falla, lo llevamos a fallback por área
  function handleImgError(e){
    const img = e.target;
    if(!img || img.tagName !== "IMG") return;

    // Evita loops infinitos
    if(img.dataset.fallbackDone === "1") return;
    img.dataset.fallbackDone = "1";

    // Si está dentro de un elemento con data-open, podemos deducir el item
    const wrap = img.closest?.("[data-open]");
    const id = wrap?.getAttribute?.("data-open");
    const it = id ? ITEMS_BY_ID.get(id) : null;

    img.src = it ? areaFallbackImg(it.area) : getAsset("logo");
  }

  /* =========================
     Chips
  ========================= */
  function chipGroup(container, values, key){
    if(!container) return;
    container.innerHTML = (values || []).map(v => (
      `<button class="chip" data-key="${escapeHtml(key)}" data-val="${escapeHtml(v)}" type="button" aria-pressed="false">${escapeHtml(v)}</button>`
    )).join("");
  }

  function clearChipStates(container){
    if(!container) return;
    $$(".chip", container).forEach(c => {
      c.classList.remove("is-on");
      c.setAttribute("aria-pressed", "false");
    });
  }

  function setChipOn(key, val){
    if(!val) return;
    const sel = `.chip[data-key="${cssEsc(key)}"][data-val="${cssEsc(val)}"]`;
    const el = $(sel);
    if(el){
      el.classList.add("is-on");
      el.setAttribute("aria-pressed", "true");
    }
  }

  function updateChips(){
    clearChipStates(chipStage);
    clearChipStates(chipGoal);
    clearChipStates(chipMode);

    setChipOn("stage", state.stage);
    setChipOn("goal",  state.goal);
    setChipOn("mode",  state.mode);
  }

  /* =========================
     Tabs / View control
  ========================= */
  function updateTabsAria(){
    $$(".tab").forEach(b => {
      const on = b.dataset.view === state.view;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-current", on ? "page" : "false");
    });
  }

  function setView(v){
    if(!v || state.view === v) return;
    state.view = v;

    updateTabsAria();

    // scroll arriba sin marear
    try{
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    }catch(_){
      window.scrollTo(0,0);
    }

    // título (nice)
    const t = VIEW_TITLES[v] ? `${VIEW_TITLES[v]} · Musicala` : "Explorador · Musicala";
    document.title = t;

    render();
  }

  /* =========================
     Matching / filtering
  ========================= */
  function matches(item, qNorm){
    if(!item) return false;

    // Si no estás en home, filtra por área
    if(state.view !== "home"){
      const needed = AREA_MAP[state.view];
      if(needed && item.area !== needed) return false;
    }

    if(state.stage && !(item.forWho || []).includes(state.stage)) return false;
    if(state.goal  && !(item.goal   || []).includes(state.goal))  return false;
    if(state.mode  && !(item.mode   || []).includes(state.mode))  return false;

    if(qNorm){
      const hay = SEARCH_HAYSTACK.get(item.id) || "";
      if(!hay.includes(qNorm)) return false;
    }
    return true;
  }

  function getFilteredItems(){
    const qNorm = norm((state.q || "").trim());
    const out = [];
    for(const it of ITEMS){
      if(matches(it, qNorm)) out.push(it);
    }
    return out;
  }

  /* =========================
     HTML builders
  ========================= */
  function heroHTML(title, subtitle){
    return `
      <div class="hero">
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(subtitle)}</p>
      </div>
    `;
  }

  function cardHTML(item){
    const tags = (item.tags||[]).slice(0,4).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("");
    const img = resolveItemImg(item);

    return `
      <article class="tile" data-open="${escapeHtml(item.id)}" tabindex="0" role="button" aria-label="Abrir ${escapeHtml(item.name)}">
        <img class="tile__img" src="${escapeHtml(img)}" alt="" loading="lazy" />
        <div class="tile__body">
          <h4 class="tile__title">${escapeHtml(item.name)}</h4>
          <div class="muted">${escapeHtml(item.area)}${item.category ? " · " + escapeHtml(item.category) : ""}</div>
          <div class="tags">${tags}</div>
        </div>
      </article>
    `;
  }

  function miniCardHTML(item){
    const img = resolveItemImg(item);
    return `
      <article class="mini" data-open="${escapeHtml(item.id)}" tabindex="0" role="button" aria-label="Abrir ${escapeHtml(item.name)}">
        <img class="mini__img" src="${escapeHtml(img)}" alt="" loading="lazy" />
        <div class="mini__body">
          <div class="mini__title">${escapeHtml(item.name)}</div>
          <div class="mini__meta">${escapeHtml(item.category || "")}</div>
        </div>
      </article>
    `;
  }

  /* =========================
     HOME (Lobby editorial)
  ========================= */
  function getTopPicks(areaName, count=3){
    const arr = (ITEMS_BY_AREA.get(areaName) || []).slice();
    if(!arr.length) return [];
    shuffleInPlace(arr);
    return arr.slice(0, count);
  }

  function labelToView(label){
    if(label === "Música") return "music";
    if(label === "Danzas") return "dance";
    if(label === "Artes Plásticas") return "arts";
    if(label === "Teatro") return "theatre";
    return "home";
  }

  function renderPickBlock(anchorId, label, picks){
    const safeId = escapeHtml(anchorId);
    const safeLabel = escapeHtml(label);
    const view = labelToView(label);

    const list = (picks || []).length
      ? (picks || []).map(miniCardHTML).join("")
      : `<div class="muted">Pronto más opciones ✍️</div>`;

    return `
      <div class="pickBlock" id="${safeId}">
        <div class="pickBlock__head">
          <div class="pickBlock__title">${safeLabel}</div>
          <button class="linkbtn" type="button" data-goto="${escapeHtml(view)}">Ver todo</button>
        </div>
        <div class="miniGrid">
          ${list}
        </div>
      </div>
    `;
  }

  function renderHome(){
    if(!viewEl) return;

    const sections = [
      {
        id: "music",
        title: "Música 🎵",
        desc: "Instrumentos, canto y géneros. De cero a escenario.",
        img: getAsset("music"),
      },
      {
        id: "dance",
        title: "Danzas 💃",
        desc: "Latino, urbano, clásico y folclor. Técnica + flow.",
        img: getAsset("dance"),
      },
      {
        id: "arts",
        title: "Artes Plásticas 🎨",
        desc: "Dibujo, pintura, escultura y técnicas mixtas.",
        img: getAsset("arts"),
      },
      {
        id: "theatre",
        title: "Teatro 🎭",
        desc: "Expresión, voz, impro y montaje. Presencia total.",
        img: getAsset("theatre"),
      },
    ];

    const picksMusic   = getTopPicks("Música", 3);
    const picksDance   = getTopPicks("Danzas", 3);
    const picksArts    = getTopPicks("Artes Plásticas", 3);
    const picksTheatre = getTopPicks("Teatro", 3);

    viewEl.innerHTML = `
      ${heroHTML(
        "Explorador Musicala",
        "Elige un arte para explorar. Si quieres, filtra por etapa, objetivo o modalidad en el panel."
      )}

      <section class="lobby" aria-label="Artes principales">
        ${sections.map(s => `
          <article class="lobbyCard" data-goto="${escapeHtml(s.id)}" tabindex="0" role="button" aria-label="Ir a ${escapeHtml(s.title)}">
            <img class="lobbyCard__img" src="${escapeHtml(s.img)}" alt="" loading="lazy" />
            <div class="lobbyCard__body">
              <h2 class="lobbyCard__title">${escapeHtml(s.title)}</h2>
              <p class="lobbyCard__desc">${escapeHtml(s.desc)}</p>

              <div class="lobbyCard__actions">
                <button class="btn btn-primary" type="button" data-goto="${escapeHtml(s.id)}">Explorar</button>
                <button class="btn btn-ghost" type="button" data-scrollto="picks-${escapeHtml(s.id)}">Ver opciones</button>
              </div>
            </div>
          </article>
        `).join("")}
      </section>

      <section class="picksWrap" aria-label="Recomendados por área">
        <div class="picksHeader">
          <h3>Top picks (para entrar rápido)</h3>
          <p class="muted">Abre cualquiera para ver detalles y pedir info por WhatsApp.</p>
        </div>

        <div class="picksGrid">
          ${renderPickBlock("picks-music", "Música", picksMusic)}
          ${renderPickBlock("picks-dance", "Danzas", picksDance)}
          ${renderPickBlock("picks-arts", "Artes Plásticas", picksArts)}
          ${renderPickBlock("picks-theatre", "Teatro", picksTheatre)}
        </div>
      </section>
    `;
  }

  /* =========================
     LISTS (por arte)
  ========================= */
  function renderList(){
    const items = getFilteredItems();
    const title = VIEW_TITLES[state.view] || "Explora";

    if(!viewEl) return;

    const hasAnyFilter = !!(state.stage || state.goal || state.mode || (state.q||"").trim());
    const subtitle = hasAnyFilter
      ? `${items.length} resultado(s) con tus filtros. Abre cualquier tarjeta para ver detalles.`
      : `${items.length} opción(es). Usa filtros si quieres afinar.`;

    viewEl.innerHTML = `
      ${heroHTML(title, subtitle)}
      <div class="grid">
        ${items.length ? items.map(cardHTML).join("") : `<div class="card">No hay resultados con esos filtros 😅</div>`}
      </div>
    `;
  }

  function render(){
    if(!viewEl) return;
    if(state.view === "home") renderHome();
    else renderList();
  }

  /* =========================
     MODAL accessibility
  ========================= */
  function getFocusable(el){
    if(!el) return [];
    const sel = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');
    return $$(sel, el).filter(x => x.offsetParent !== null);
  }

  function trapFocus(e){
    if(!modal || !modal.classList.contains("is-open")) return;
    if(e.key !== "Tab") return;

    const focusables = getFocusable(modalPanel || modal);
    if(!focusables.length) return;

    const first = focusables[0];
    const last  = focusables[focusables.length - 1];

    if(e.shiftKey && document.activeElement === first){
      e.preventDefault();
      last.focus();
    } else if(!e.shiftKey && document.activeElement === last){
      e.preventDefault();
      first.focus();
    }
  }

  function openItem(id){
    const item = ITEMS_BY_ID.get(id);
    if(!item || !modal) return;

    state.lastFocusEl = document.activeElement;
    state.modalOpenId = id;

    if(modalTitle) modalTitle.textContent = item.name || "Detalle";
    if(modalMeta){
      const meta = [item.area, item.category].filter(Boolean).join(" · ");
      modalMeta.textContent = meta;
    }

    if(modalImg){
      modalImg.dataset.fallbackDone = "0";
      modalImg.src = resolveItemImg(item);
      modalImg.alt = "";
    }

    const learn = (item.learn || []).map(x => `<li>${escapeHtml(x)}</li>`).join("") || `<li>Aprendizajes en construcción ✍️</li>`;

    const pills = [
      ...(item.forWho || []).map(x => `<span class="tag">${escapeHtml(x)}</span>`),
      ...(item.goal  || []).map(x => `<span class="tag">${escapeHtml(x)}</span>`),
      ...(item.mode  || []).map(x => `<span class="tag">${escapeHtml(x)}</span>`),
    ].join("");

    if(modalBody){
      modalBody.innerHTML = `
        <div class="card soft" style="box-shadow:none; border-radius:18px;">
          <h3>Lo que aprendes</h3>
          <ul class="list">${learn}</ul>
        </div>

        <div class="card" style="box-shadow:none; border-radius:18px; margin-top:12px;">
          <h3>Ideal para</h3>
          <div class="tags">${pills || `<span class="muted">Sin etiquetas aún.</span>`}</div>
        </div>
      `;
    }

    if(modalCTA){
      modalCTA.onclick = () => {
        window.open(waLink(`Hola Musicala 🙂 Quiero aprender: ${item.name} (${item.area}).`), "_blank");
      };
    }

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden","false");

    const focusables = getFocusable(modalPanel || modal);
    const target = modalCTA || focusables[0];
    setTimeout(() => target?.focus?.(), 0);

    document.addEventListener("keydown", trapFocus, true);
  }

  function closeModal(){
    if(!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden","true");
    state.modalOpenId = null;

    document.removeEventListener("keydown", trapFocus, true);

    try{ state.lastFocusEl?.focus?.(); }catch(_){}
  }

  /* =========================
     AUDITOR (opcional, pro)
  ========================= */
  function auditData(){
    if(!hasData) return;

    const F = window.MUSICALA_DATA?.filters || {};
    const validStage = new Set(F.stage || []);
    const validGoal  = new Set(F.goal  || []);
    const validMode  = new Set(F.mode  || []);

    const issues = [];

    for(const it of ITEMS){
      if(!it || !it.id) continue;

      // stage
      for(const s of (it.forWho || [])){
        if(!validStage.has(s)) issues.push({ id: it.id, field: "forWho", value: s });
      }
      // goal
      for(const g of (it.goal || [])){
        if(!validGoal.has(g)) issues.push({ id: it.id, field: "goal", value: g });
      }
      // mode
      for(const m of (it.mode || [])){
        if(!validMode.has(m)) issues.push({ id: it.id, field: "mode", value: m });
      }
      // area sanity (esperadas)
      if(!["Música","Danzas","Artes Plásticas","Teatro"].includes(it.area)){
        issues.push({ id: it.id, field: "area", value: it.area });
      }
    }

    if(issues.length){
      console.groupCollapsed(`⚠️ Musicala Audit: ${issues.length} incoherencia(s) detectada(s)`);
      console.table(issues);
      console.groupEnd();
    } else {
      console.info("✅ Musicala Audit: todo coherente con filters y áreas.");
    }
  }

  /* =========================
     EVENTS
  ========================= */
  function bindGlobalEvents(){
    // Captura errores de imágenes
    document.addEventListener("error", handleImgError, true);

    // Click delegations
    document.addEventListener("click", (e) => {
      // Tabs
      const tab = e.target.closest(".tab");
      if(tab) return setView(tab.dataset.view);

      // Chips
      const chip = e.target.closest(".chip");
      if(chip){
        const key = chip.dataset.key;
        const val = chip.dataset.val;
        if(!["stage","goal","mode"].includes(key)) return;
        state[key] = (state[key] === val) ? null : val;
        updateChips();
        render();
        return;
      }

      // Home: go to section
      const goto = e.target.closest("[data-goto]");
      if(goto){
        const v = goto.dataset.goto;
        if(v) setView(v);
        return;
      }

      // Home: scroll to picks block
      const st = e.target.closest("[data-scrollto]");
      if(st){
        const id = st.dataset.scrollto;
        const el = id ? document.getElementById(id) : null;
        if(el){
          try{ el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" }); }
          catch(_){ el.scrollIntoView(true); }
        }
        return;
      }

      // Open item
      const open = e.target.closest("[data-open]");
      if(open){
        openItem(open.dataset.open);
        return;
      }

      // Close modal
      if(e.target.dataset.close) closeModal();
    });

    // Teclado global
    document.addEventListener("keydown", (e) => {
      // ESC cierra modal
      if(e.key === "Escape"){
        if(modal?.classList.contains("is-open")) closeModal();
        return;
      }

      const isEnter = (e.key === "Enter");
      const isSpace = (e.key === " " || e.key === "Spacebar");
      if(!isEnter && !isSpace) return;

      const active = document.activeElement;
      if(!active) return;

      const openEl = active.closest?.("[data-open]");
      if(openEl){
        e.preventDefault();
        openItem(openEl.dataset.open);
        return;
      }

      const gotoEl = active.closest?.("[data-goto]");
      if(gotoEl){
        e.preventDefault();
        setView(gotoEl.dataset.goto);
        return;
      }
    });

    // Search (debounced)
    qEl?.addEventListener("input", debounce(() => {
      state.q = qEl.value;
      render();
    }, 160));

    // Clear filters
    btnClear?.addEventListener("click", () => {
      state.stage = state.goal = state.mode = null;
      state.q = "";
      if(qEl) qEl.value = "";
      updateChips();
      render();
    });

    // Random (según vista actual + filtros)
    btnRandom?.addEventListener("click", () => {
      const items = getFilteredItems();
      if(!items.length) return;
      const pick = items[Math.floor(Math.random() * items.length)];
      openItem(pick.id);
    });

    // CTA WhatsApp
    const goWA = () => window.open(waLink(), "_blank");
    btnCTA?.addEventListener("click", goWA);
    btnCTA2?.addEventListener("click", goWA);
  }

  /* =========================
     Init
  ========================= */
  function init(){
    if(!hasData){
      if(viewEl){
        viewEl.innerHTML = `
          ${heroHTML("Explorador de Artes", "Ups… falta cargar data.js 😅")}
          <div class="card">
            Revisa que <strong>data.js</strong> esté incluido antes de <strong>app.js</strong> en el HTML.
          </div>
        `;
      }
      return;
    }

    // Chips init
    chipGroup(chipStage, window.MUSICALA_DATA?.filters?.stage || [], "stage");
    chipGroup(chipGoal,  window.MUSICALA_DATA?.filters?.goal  || [], "goal");
    chipGroup(chipMode,  window.MUSICALA_DATA?.filters?.mode  || [], "mode");

    updateChips();
    updateTabsAria();
    bindGlobalEvents();

    // Auditor pro (no molesta al usuario, solo consola)
    auditData();

    render();
  }

  init();
})();
