/* =============================================================================
  data.js — Explorador de Artes · Musicala (PRO++ · fuente única de verdad)
  -----------------------------------------------------------------------------
  ✅ assets = TODAS las rutas de imágenes usadas por el catálogo
  ✅ items.img SIEMPRE referencia a assets (cero strings sueltas repetidas)
  ✅ filtros = valores exactos que app.js usa para includes()
  ✅ compatible con tu app.js actual (no rompe nada)
============================================================================= */

(() => {
  "use strict";

  const MUSICALA_DATA = {
    // Rutas centralizadas (única fuente)
    assets: {
      // Branding / covers por área
      logo: "assets/logo.png",
      music: "assets/musica.png",
      dance: "assets/danzas.png",
      arts: "assets/tecnicasmixtas.png",

      // OJO: app.js usa getAsset("theatre") (llave: theatre)
      theatre: "assets/teatro.png",

      // Alias de compatibilidad (por si en algún lugar quedó "teatro")
      teatro: "assets/teatro.png",

      // ===== Música (instrumentos / voces) =====
      flautaDulce: "assets/flautadulce.png",
      flautaTraversa: "assets/flautatraversa.png",
      clarinete: "assets/clarinete.png",
      guitarra: "assets/guitarra.png",
      ukelele: "assets/ukelele.png",
      bajo: "assets/bajo.png",
      cuatro: "assets/cuatro.png",

      violin: "assets/violin.png",
      viola: "assets/viola.png",
      cello: "assets/cello.png",

      bateria: "assets/bateria.png",
      cajon: "assets/cajon.png",

      piano: "assets/piano.png",
      xilofono: "assets/xilofono.png",

      canto: "assets/canto.png",
      coro: "assets/coro.png",

      // ===== Danzas (géneros) =====
      salsa: "assets/salsa.png",
      bachata: "assets/bachata.png",
      merengue: "assets/merengue.png",
      champeta: "assets/champeta.png",

      ballet: "assets/ballet.png",
      contemporaneo: "assets/contemporaneo.png",

      // Exacto como está en tu carpeta
      hiphop: "assets/Hip Hop.png",
      reggaeton: "assets/reggaeton.png",
      dancehall: "assets/dancehall.png",

      tango: "assets/tango.png",
      cumbia: "assets/cumbia.png",

      // ===== Artes plásticas (técnicas) =====
      dibujo: "assets/dibujoenlapiz.png",
      carboncillo: "assets/carboncillo.png",
      acuarela: "assets/acuarela.png",
      oleo: "assets/oleo.png",
      acrilico: "assets/acrilico.png",
      arcilla: "assets/arcilla.png",
      porcelana: "assets/porcelanicron.png",
      mixtas: "assets/tecnicasmixtas.png",

      // Fallback genérico
      fallback: "assets/logo.png",
    },

    // Filtros (valores exactos)
    filters: {
      stage: ["Niños", "Teens", "Adultos", "Familiar"],
      goal: ["Hobby", "Formación", "Escenario", "Bienestar", "Creatividad"],
      mode: ["Sede", "Hogar", "Virtual"],
    },

    // Items (catálogo)
    items: [
      // ======================
      // ===== Música =====
      // ======================
      {
        id: "music-wind-flute-rec",
        area: "Música",
        category: "Viento",
        name: "Flauta dulce",
        tags: ["Instrumento", "Viento", "Todos los géneros"],
        img: null, // se asigna abajo desde assets
        learn: ["Respiración y sonido", "Lectura básica", "Ritmo y musicalidad"],
        forWho: ["Niños", "Teens", "Adultos"],
        mode: ["Sede", "Hogar", "Virtual"],
        goal: ["Hobby", "Formación", "Creatividad"],
      },
      {
        id: "music-wind-flute-tra",
        area: "Música",
        category: "Viento",
        name: "Flauta traversa",
        tags: ["Instrumento", "Viento"],
        img: null,
        learn: ["Embocadura", "Afinación", "Repertorio y técnica"],
        forWho: ["Teens", "Adultos"],
        mode: ["Sede", "Hogar", "Virtual"],
        goal: ["Hobby", "Formación", "Escenario"],
      },
      {
        id: "music-wind-clarinet",
        area: "Música",
        category: "Viento",
        name: "Clarinete",
        tags: ["Instrumento", "Viento"],
        img: null,
        learn: ["Sonido y articulación", "Escalas", "Repertorio"],
        forWho: ["Teens", "Adultos"],
        mode: ["Sede", "Hogar", "Virtual"],
        goal: ["Formación", "Escenario"],
      },
      {
        id: "music-plucked-guitar",
        area: "Música",
        category: "Cuerdas pulsadas",
        name: "Guitarra acústica y eléctrica",
        tags: ["Cuerdas", "Pulsadas", "Todos los géneros"],
        img: null,
        learn: ["Acordes y ritmo", "Técnicas (rasgueo/punteo)", "Repertorio por gustos"],
        forWho: ["Niños", "Teens", "Adultos"],
        mode: ["Sede", "Hogar", "Virtual"],
        goal: ["Hobby", "Formación", "Escenario"],
      },
      {
        id: "music-plucked-ukulele",
        area: "Música",
        category: "Cuerdas pulsadas",
        name: "Ukelele",
        tags: ["Cuerdas", "Pulsadas"],
        img: null,
        learn: ["Acordes fáciles", "Ritmo", "Canciones"],
        forWho: ["Niños", "Teens", "Adultos"],
        mode: ["Sede", "Hogar", "Virtual"],
        goal: ["Hobby", "Creatividad"],
      },
      {
        id: "music-plucked-bass",
        area: "Música",
        category: "Cuerdas pulsadas",
        name: "Bajo eléctrico",
        tags: ["Cuerdas", "Pulsadas"],
        img: null,
        learn: ["Groove", "Técnica mano derecha/izquierda", "Tocar con banda"],
        forWho: ["Teens", "Adultos"],
        mode: ["Sede", "Hogar", "Virtual"],
        goal: ["Formación", "Escenario"],
      },
      {
        id: "music-plucked-cuatro",
        area: "Música",
        category: "Cuerdas pulsadas",
        name: "Cuatro",
        tags: ["Cuerdas", "Pulsadas"],
        img: null,
        learn: ["Ritmos latinoamericanos", "Acordes", "Acompañamiento"],
        forWho: ["Teens", "Adultos"],
        mode: ["Sede", "Hogar", "Virtual"],
        goal: ["Hobby", "Creatividad"],
      },
      {
        id: "music-bowed-violin",
        area: "Música",
        category: "Cuerdas frotadas",
        name: "Violín",
        tags: ["Cuerdas", "Frotadas"],
        img: null,
        learn: ["Postura", "Arco y afinación", "Lectura y repertorio"],
        forWho: ["Niños", "Teens", "Adultos"],
        mode: ["Sede", "Hogar", "Virtual"],
        goal: ["Formación", "Escenario"],
      },
      {
        id: "music-bowed-viola",
        area: "Música",
        category: "Cuerdas frotadas",
        name: "Viola",
        tags: ["Cuerdas", "Frotadas"],
        img: null,
        learn: ["Técnica y sonido", "Ensamble", "Repertorio"],
        forWho: ["Teens", "Adultos"],
        mode: ["Sede", "Hogar", "Virtual"],
        goal: ["Formación", "Escenario"],
      },
      {
        id: "music-bowed-cello",
        area: "Música",
        category: "Cuerdas frotadas",
        name: "Cello",
        tags: ["Cuerdas", "Frotadas"],
        img: null,
        learn: ["Postura y arco", "Afinación", "Repertorio"],
        forWho: ["Teens", "Adultos"],
        mode: ["Sede", "Hogar", "Virtual"],
        goal: ["Formación", "Escenario"],
      },
      {
        id: "music-perc-drums",
        area: "Música",
        category: "Percusión",
        name: "Batería",
        tags: ["Percusión"],
        img: null,
        learn: ["Coordinación", "Grooves", "Tocar con música"],
        forWho: ["Niños", "Teens", "Adultos"],
        mode: ["Sede", "Hogar"],
        goal: ["Hobby", "Escenario"],
      },
      {
        id: "music-perc-cajon",
        area: "Música",
        category: "Percusión",
        name: "Cajón",
        tags: ["Percusión"],
        img: null,
        learn: ["Patrones rítmicos", "Acompañamiento", "Independencia"],
        forWho: ["Niños", "Teens", "Adultos"],
        mode: ["Sede", "Hogar", "Virtual"],
        goal: ["Hobby", "Creatividad"],
      },
      {
        id: "music-keys-piano",
        area: "Música",
        category: "Teclado",
        name: "Piano (incluye organeta y teclado)",
        tags: ["Teclado"],
        img: null,
        learn: ["Lectura y armonía", "Técnica", "Repertorio por gustos"],
        forWho: ["Niños", "Teens", "Adultos"],
        mode: ["Sede", "Hogar", "Virtual"],
        goal: ["Hobby", "Formación", "Escenario"],
      },
      {
        id: "music-keys-xylophone",
        area: "Música",
        category: "Teclado",
        name: "Xilófono",
        tags: ["Teclado", "Percusivo"],
        img: null,
        learn: ["Ritmo y melodía", "Coordinación", "Lectura básica"],
        forWho: ["Niños", "Teens"],
        mode: ["Sede", "Hogar"],
        goal: ["Creatividad", "Hobby"],
      },
      {
        id: "music-vocal",
        area: "Música",
        category: "Técnica Vocal",
        name: "Canto",
        tags: ["Voz"],
        img: null,
        learn: ["Respiración", "Afinación", "Interpretación"],
        forWho: ["Teens", "Adultos"],
        mode: ["Sede", "Virtual"],
        goal: ["Hobby", "Escenario", "Bienestar"],
      },
      {
        id: "music-choir",
        area: "Música",
        category: "Técnica Vocal",
        name: "Coro",
        tags: ["Voz", "Ensamble"],
        img: null,
        learn: ["Afinación grupal", "Armonía", "Trabajo en equipo"],
        forWho: ["Niños", "Teens", "Adultos"],
        mode: ["Sede"],
        goal: ["Escenario", "Bienestar"],
      },

      // ======================
      // ===== Danzas =====
      // ======================
      {
        id: "dance-salsa",
        area: "Danzas",
        category: "Latino",
        name: "Salsa",
        tags: ["Latino"],
        img: null,
        learn: ["Pasos base", "Musicalidad", "Coordinación"],
        forWho: ["Teens", "Adultos"],
        mode: ["Sede"],
        goal: ["Hobby", "Bienestar", "Escenario"],
      },
      {
        id: "dance-bachata",
        area: "Danzas",
        category: "Latino",
        name: "Bachata",
        tags: ["Latino"],
        img: null,
        learn: ["Conexión", "Ritmo", "Técnica base"],
        forWho: ["Teens", "Adultos"],
        mode: ["Sede"],
        goal: ["Hobby", "Bienestar"],
      },
      {
        id: "dance-merengue",
        area: "Danzas",
        category: "Latino",
        name: "Merengue",
        tags: ["Latino"],
        img: null,
        learn: ["Pasos y vueltas", "Resistencia", "Ritmo"],
        forWho: ["Teens", "Adultos"],
        mode: ["Sede"],
        goal: ["Hobby", "Bienestar"],
      },
      {
        id: "dance-champeta",
        area: "Danzas",
        category: "Latino",
        name: "Champeta",
        tags: ["Latino"],
        img: null,
        learn: ["Energía", "Aislamientos", "Flow"],
        forWho: ["Teens", "Adultos"],
        mode: ["Sede"],
        goal: ["Hobby", "Bienestar", "Escenario"],
      },
      {
        id: "dance-ballet",
        area: "Danzas",
        category: "Clásica y contemporánea",
        name: "Ballet",
        tags: ["Clásico"],
        img: null,
        learn: ["Postura", "Técnica", "Disciplina corporal"],
        forWho: ["Niños", "Teens"],
        mode: ["Sede"],
        goal: ["Formación", "Escenario"],
      },
      {
        id: "dance-contemporary",
        area: "Danzas",
        category: "Clásica y contemporánea",
        name: "Danza Contemporánea",
        tags: ["Contemporáneo"],
        img: null,
        learn: ["Expresión", "Técnica", "Movimiento creativo"],
        forWho: ["Teens", "Adultos"],
        mode: ["Sede"],
        goal: ["Creatividad", "Escenario", "Bienestar"],
      },
      {
        id: "dance-hiphop",
        area: "Danzas",
        category: "Urbanos",
        name: "Hip-Hop",
        tags: ["Urbano"],
        img: null,
        learn: ["Groove", "Coordinación", "Rutinas"],
        forWho: ["Niños", "Teens"],
        mode: ["Sede"],
        goal: ["Hobby", "Escenario"],
      },
      {
        id: "dance-reggaeton",
        area: "Danzas",
        category: "Urbanos",
        name: "Reggaetón",
        tags: ["Urbano"],
        img: null,
        learn: ["Flow", "Aislamientos", "Energía"],
        forWho: ["Teens", "Adultos"],
        mode: ["Sede"],
        goal: ["Hobby", "Bienestar", "Escenario"],
      },
      {
        id: "dance-dancehall",
        area: "Danzas",
        category: "Urbanos",
        name: "Dancehall",
        tags: ["Urbano"],
        img: null,
        learn: ["Ritmo", "Técnica", "Actitud escénica"],
        forWho: ["Teens", "Adultos"],
        mode: ["Sede"],
        goal: ["Escenario", "Hobby"],
      },
      {
        id: "dance-tango",
        area: "Danzas",
        category: "Folclóricas",
        name: "Tango",
        tags: ["Folclor"],
        img: null,
        learn: ["Conexión", "Técnica base", "Expresión"],
        forWho: ["Adultos"],
        mode: ["Sede"],
        goal: ["Hobby", "Escenario"],
      },
      {
        id: "dance-cumbia",
        area: "Danzas",
        category: "Folclóricas",
        name: "Cumbia",
        tags: ["Folclor"],
        img: null,
        learn: ["Ritmo", "Pasos tradicionales", "Alegría escénica"],
        forWho: ["Niños", "Teens", "Adultos"],
        mode: ["Sede"],
        goal: ["Hobby", "Bienestar", "Escenario"],
      },

      // ==========================
      // ===== Artes Plásticas =====
      // ==========================
      {
        id: "arts-grafito",
        area: "Artes Plásticas",
        category: "Dibujo",
        name: "Grafito",
        tags: ["Dibujo"],
        img: null,
        learn: ["Línea y control", "Sombreado", "Boceto"],
        forWho: ["Niños", "Teens", "Adultos"],
        mode: ["Sede", "Hogar", "Virtual"],
        goal: ["Creatividad", "Formación", "Hobby"],
      },
      {
        id: "arts-carboncillo",
        area: "Artes Plásticas",
        category: "Dibujo",
        name: "Carboncillo",
        tags: ["Dibujo", "Luz y sombra"],
        img: null,
        learn: ["Contraste", "Volumen", "Drama visual"],
        forWho: ["Teens", "Adultos"],
        mode: ["Sede", "Hogar", "Virtual"],
        goal: ["Formación", "Creatividad"],
      },
      {
        id: "arts-acuarela",
        area: "Artes Plásticas",
        category: "Pintura",
        name: "Acuarela",
        tags: ["Pintura"],
        img: null,
        learn: ["Transparencias", "Manchas", "Control del agua"],
        forWho: ["Niños", "Teens", "Adultos"],
        mode: ["Sede", "Hogar", "Virtual"],
        goal: ["Creatividad", "Bienestar", "Hobby"],
      },
      {
        id: "arts-oleo",
        area: "Artes Plásticas",
        category: "Pintura",
        name: "Óleo",
        tags: ["Pintura"],
        img: null,
        learn: ["Textura", "Mezcla de color", "Detalle fino"],
        forWho: ["Teens", "Adultos"],
        mode: ["Sede", "Hogar"],
        goal: ["Formación", "Creatividad"],
      },
      {
        id: "arts-acrilico",
        area: "Artes Plásticas",
        category: "Pintura",
        name: "Acrílico",
        tags: ["Pintura"],
        img: null,
        learn: ["Color vivo", "Capas rápidas", "Técnicas mixtas"],
        forWho: ["Niños", "Teens", "Adultos"],
        mode: ["Sede", "Hogar", "Virtual"],
        goal: ["Creatividad", "Hobby"],
      },
      {
        id: "arts-arcilla",
        area: "Artes Plásticas",
        category: "Escultura",
        name: "Arcilla",
        tags: ["Escultura"],
        img: null,
        learn: ["Volumen", "Modelado", "Forma 3D"],
        forWho: ["Niños", "Teens", "Adultos"],
        mode: ["Sede", "Hogar"],
        goal: ["Creatividad", "Formación"],
      },

      // ✅ Nuevo (ya tenías el asset, faltaba el item)
      {
        id: "arts-porcelanicron",
        area: "Artes Plásticas",
        category: "Escultura",
        name: "Porcelanicrón",
        tags: ["Escultura", "Detalles", "Manualidades"],
        img: null,
        learn: ["Modelado fino", "Texturas", "Piezas decorativas"],
        forWho: ["Niños", "Teens", "Adultos"],
        mode: ["Sede", "Hogar"],
        goal: ["Creatividad", "Hobby"],
      },

      // ✅ AQUÍ va tu mejora pedida
      {
        id: "arts-mixtas",
        area: "Artes Plásticas",
        category: "Técnicas mixtas",
        name: "Técnicas mixtas",
        tags: ["Mixtas", "Experimental", "3D"],
        img: null,
        learn: [
          "Un enfoque integral que integra dibujo, pintura y construcción creativa en un mismo proceso artístico.",
          "Creemos que el arte no se aprende por partes, sino explorando recursos expresivos de forma consciente y estructurada.",
          "✏️ Dibujo y expresión gráfica: proporción, trazo, composición y observación para fortalecer bases sólidas.",
          "🎨 Pintura y teoría del color: acrílico, acuarela y mezclas cromáticas entendiendo el color como herramienta expresiva y comunicativa.",
          "🖌️ Manualidades y construcción creativa: materiales diversos para desarrollar textura, volumen, diseño y pensamiento tridimensional.",
          "Metodología: desarrollo técnico progresivo, integración de materiales en proyectos completos, obras individuales y colectivas, y acompañamiento personalizado.",
          "Resultados: habilidades integrales, mayor seguridad creativa, capacidad de combinar técnicas en una sola obra y participación en muestras/exposiciones."
        ],
        forWho: ["Teens", "Adultos"],
        mode: ["Sede", "Hogar"],
        goal: ["Creatividad"],
      },

      // ======================
      // ===== Teatro =====
      // ======================
      {
        id: "theatre-acting",
        area: "Teatro",
        category: "Teatro",
        name: "Taller de Teatro",
        tags: ["Actuación", "Expresión"],
        img: null,
        learn: ["Expresión corporal", "Voz y presencia", "Impro y juego escénico"],
        forWho: ["Niños", "Teens", "Adultos"],
        mode: ["Sede"],
        goal: ["Creatividad", "Bienestar", "Escenario"],
      },
    ],
  };

  // ---- Asignación de imágenes desde assets (sin strings sueltas) ----
  const A = MUSICALA_DATA.assets;

  const IMG_BY_ID = {
    "music-wind-flute-rec": A.flautaDulce,
    "music-wind-flute-tra": A.flautaTraversa,
    "music-wind-clarinet": A.clarinete,
    "music-plucked-guitar": A.guitarra,
    "music-plucked-ukulele": A.ukelele,
    "music-plucked-bass": A.bajo,
    "music-plucked-cuatro": A.cuatro,
    "music-bowed-violin": A.violin,
    "music-bowed-viola": A.viola,
    "music-bowed-cello": A.cello,
    "music-perc-drums": A.bateria,
    "music-perc-cajon": A.cajon,
    "music-keys-piano": A.piano,
    "music-keys-xylophone": A.xilofono,
    "music-vocal": A.canto,
    "music-choir": A.coro,

    "dance-salsa": A.salsa,
    "dance-bachata": A.bachata,
    "dance-merengue": A.merengue,
    "dance-champeta": A.champeta,
    "dance-ballet": A.ballet,
    "dance-contemporary": A.contemporaneo,
    "dance-hiphop": A.hiphop,
    "dance-reggaeton": A.reggaeton,
    "dance-dancehall": A.dancehall,
    "dance-tango": A.tango,
    "dance-cumbia": A.cumbia,

    "arts-grafito": A.dibujo,
    "arts-carboncillo": A.carboncillo,
    "arts-acuarela": A.acuarela,
    "arts-oleo": A.oleo,
    "arts-acrilico": A.acrilico,
    "arts-arcilla": A.arcilla,
    "arts-porcelanicron": A.porcelana,
    "arts-mixtas": A.mixtas,

    // ✅ FIX: antes decía A.teatro (no existía). Ahora sí está bien.
    "theatre-acting": A.theatre || A.teatro || A.fallback,
  };

  // Set img (si falta, se deja null y app.js usará fallback por área)
  for (const it of MUSICALA_DATA.items) {
    if (!it) continue;
    it.img = IMG_BY_ID[it.id] || it.img || null;
  }

  // Exponer al window para que app.js lo lea
  window.MUSICALA_DATA = MUSICALA_DATA;
})();
