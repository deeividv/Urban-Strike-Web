export type SpriteSheet = {
  src: string;
  frames: number;
  frameW: number;
  frameH: number;
  offsetY?: number;
  fps: number;
};

export const SPRITES = {
  swatIdle: { src: "/sprites/swat-idle.png", frames: 7, frameW: 128, frameH: 64, offsetY: 64, fps: 5 },
  swatRun: { src: "/sprites/swat-run.png", frames: 12, frameW: 128, frameH: 64, offsetY: 64, fps: 15 },
  swatShot: { src: "/sprites/swat-shot.png", frames: 4, frameW: 128, frameH: 64, offsetY: 64, fps: 10 },
  swatRecharge: { src: "/sprites/swat-recharge.png", frames: 6, frameW: 128, frameH: 64, offsetY: 64, fps: 5 },
  gangsterIdle: { src: "/sprites/gangster-idle.png", frames: 6, frameW: 128, frameH: 128, fps: 6 },
  gangsterRun: { src: "/sprites/gangster-run.png", frames: 10, frameW: 128, frameH: 128, fps: 12 },
  gangsterShot: { src: "/sprites/gangster-shot.png", frames: 4, frameW: 128, frameH: 128, fps: 10 },
  meleeIdle: { src: "/sprites/melee-idle.png", frames: 4, frameW: 72, frameH: 72, fps: 6 },
  meleeWalk: { src: "/sprites/melee-walk.png", frames: 6, frameW: 72, frameH: 72, fps: 10 },
  rangedIdle: { src: "/sprites/ranged-idle.png", frames: 4, frameW: 96, frameH: 96, fps: 6 },
  rangedWalk: { src: "/sprites/ranged-walk.png", frames: 6, frameW: 96, frameH: 96, fps: 10 },
  battleCarIdle: { src: "/sprites/battlecar-idle.png", frames: 4, frameW: 96, frameH: 96, fps: 6 },
  battleCarWalk: { src: "/sprites/battlecar-walk.png", frames: 4, frameW: 96, frameH: 96, fps: 8 },
  machineKillerIdle: { src: "/sprites/machinekiller-idle.png", frames: 4, frameW: 72, frameH: 72, fps: 6 },
  machineKillerWalk: { src: "/sprites/machinekiller-walk.png", frames: 6, frameW: 72, frameH: 72, fps: 9 },
  carBlueIdle: { src: "/sprites/carblue-idle.png", frames: 4, frameW: 96, frameH: 96, fps: 6 },
  carBlueWalk: { src: "/sprites/carblue-walk.png", frames: 4, frameW: 96, frameH: 96, fps: 8 },
} satisfies Record<string, SpriteSheet>;

export const SPEC = [
  { label: "Motor", value: "Godot 4.4" },
  { label: "Género", value: "Run & Gun 2D" },
  { label: "Plataforma", value: "PC · Windows" },
  { label: "Duración", value: "15–25 min" },
  { label: "Idiomas", value: "ES / EN" },
  { label: "Modo", value: "1 jugador" },
];

export const PILLARS = [
  {
    n: "01",
    title: "Munición finita",
    body: "21 balas por cargador y una recarga de 0,8 s que bloquea el movimiento. Disparar cuesta: hay que decidir cuándo recargar y cuándo entrar a patadas.",
  },
  {
    n: "02",
    title: "Presión por oleadas",
    body: "Los enemigos reaparecen sin descanso. Superado el umbral de bajas se lanzan oleadas de 5 enemigos simultáneos alrededor del jugador.",
  },
  {
    n: "03",
    title: "Jefes telegrafiados",
    body: "Cada nivel termina en una máquina de guerra con patrones propios, líneas rojas de aviso parpadeantes y fases que escalan al bajar de vida.",
  },
  {
    n: "04",
    title: "IA con verticalidad",
    body: "Los enemigos sondean el terreno con raycasts: detectan bordes, muros, plataformas superiores e inferiores, saltan, se dejan caer y retroceden.",
  },
  {
    n: "05",
    title: "Legibilidad de estado",
    body: "Barras de vida flotantes con código de color, anuncios de oleada a pantalla completa y alerta de jefe con pulso rojo y alarma.",
  },
];

export const PLAYER_STATS = [
  { label: "Vida máxima", value: "10", unit: "PV" },
  { label: "Cargador", value: "21", unit: "balas" },
  { label: "Velocidad", value: "150", unit: "px/s" },
  { label: "Con carrera", value: "240", unit: "px/s" },
  { label: "Cadencia", value: "0.15", unit: "s" },
  { label: "Recarga", value: "0.8", unit: "s" },
  { label: "Daño de bala", value: "1", unit: "dmg" },
  { label: "Daño de patada", value: "2", unit: "dmg" },
  { label: "Alcance patada", value: "60", unit: "px" },
  { label: "Invencibilidad", value: "1.0", unit: "s" },
];

export const CONTROLS: { key: string; action: string; wide?: boolean }[] = [
  { key: "A", action: "Moverse a la izquierda" },
  { key: "D", action: "Moverse a la derecha" },
  { key: "ESPACIO", action: "Saltar", wide: true },
  { key: "SHIFT", action: "Correr (x1.6)", wide: true },
  { key: "S", action: "Agacharse + disparo automático" },
  { key: "R", action: "Recargar" },
  { key: "CLIC IZQ", action: "Disparar (mantén para automático)", wide: true },
  { key: "CLIC DER", action: "Patada", wide: true },
];

export const LOOP_STEPS = [
  {
    phase: "IDLE",
    title: "Reaparición continua",
    detail: "Cada punto de aparición mantiene un enemigo vivo. Cuando cae, vuelve entre 8 y 11 s después.",
    hud: "PRÓXIMA OLA: 2 BAJAS",
    tone: "ash" as const,
  },
  {
    phase: "OLEADA 1",
    title: "Cinco enemigos a la vez",
    detail: "Anuncio a pantalla completa y spawn a 280–630 px del jugador, alternando lados.",
    hud: "OLEADA 1/3 · 5 restantes",
    tone: "amber" as const,
  },
  {
    phase: "BETWEEN",
    title: "Respiro con presión",
    detail: "Vuelve la reaparición continua, pero ahora bastan 2 bajas para disparar la siguiente ola.",
    hud: "PRÓXIMA OLA: 2 BAJAS",
    tone: "ash" as const,
  },
  {
    phase: "OLEADA 2 · 3",
    title: "Escalada",
    detail: "Dos oleadas más de 5 enemigos. En total hacen falta 21 bajas para invocar al jefe.",
    hud: "OLEADA 3/3 · 2 restantes",
    tone: "amber" as const,
  },
  {
    phase: "DONE",
    title: "Alerta de jefe final",
    detail: "Viñeta roja a pantalla completa, cuatro pulsos y alarma. El mapa se limpia y el jefe entra en escena.",
    hud: "JEFE FINAL",
    tone: "blood" as const,
  },
];

export type Unit = {
  id: string;
  name: string;
  role: string;
  level: string;
  hp: number;
  idle: SpriteSheet;
  move: SpriteSheet;
  scale: number;
  stats: { label: string; value: string }[];
  brief: string;
  tactic: string;
};

export const ENEMIES: Unit[] = [
  {
    id: "gangster",
    name: "Gangster",
    role: "Tirador",
    level: "Nivel 1 — El Gueto",
    hp: 5,
    idle: SPRITES.gangsterIdle,
    move: SPRITES.gangsterShot,
    scale: 2,
    brief:
      "El arquetipo a distancia. Se detiene a 300 px y suelta ráfagas de 3 balas; si te acercas a menos de 120 px retrocede para conservar su distancia de tiro.",
    tactic: "Rompe la ráfaga acercándote: por debajo de 120 px prioriza retroceder antes que disparar.",
    stats: [
      { label: "Vida", value: "5" },
      { label: "Velocidad", value: "120 px/s" },
      { label: "Ataque", value: "Ráfaga x3 · 1 dmg" },
      { label: "Alcance de tiro", value: "300 px" },
      { label: "Persecución", value: "620 px" },
      { label: "Enfriamiento", value: "1.5 s" },
    ],
  },
  {
    id: "melee",
    name: "Matón",
    role: "Cuerpo a cuerpo",
    level: "Nivel 2 — Zona Industrial",
    hp: 5,
    idle: SPRITES.meleeIdle,
    move: SPRITES.meleeWalk,
    scale: 2.6,
    brief:
      "La IA más sofisticada del juego. Salta a plataformas superiores e inferiores, se ancla a su punto de aparición y se burla de ti (animación Sneer) antes del primer ataque.",
    tactic: "Aléjate más de 180 px de su spawn y volverá caminando a su puesto en lugar de perseguirte.",
    stats: [
      { label: "Vida", value: "5" },
      { label: "Velocidad", value: "90 / 150 px/s" },
      { label: "Ataque", value: "Golpe · 1 dmg" },
      { label: "Alcance", value: "48 px" },
      { label: "Detección", value: "360 px" },
      { label: "Enfriamiento", value: "1.5 s" },
    ],
  },
  {
    id: "ranged",
    name: "Francotirador láser",
    role: "Híbrido",
    level: "Nivel 3 — Central Eléctrica",
    hp: 5,
    idle: SPRITES.rangedIdle,
    move: SPRITES.rangedWalk,
    scale: 2,
    brief:
      "Dos ataques según la distancia: golpe a quemarropa por debajo de 72 px y rayo láser entre 104 y 300 px. Mientras dispara queda inmóvil, encarándote.",
    tactic: "Entre 72 y 104 px hay un hueco muerto: ni golpea ni dispara, solo persigue. Esa es tu ventana.",
    stats: [
      { label: "Vida", value: "5" },
      { label: "Velocidad", value: "100 px/s" },
      { label: "Ataque cercano", value: "1 dmg · 1.2 s" },
      { label: "Láser", value: "1 dmg · 2.0 s" },
      { label: "Alcance láser", value: "104–300 px" },
      { label: "Persecución", value: "650 px" },
    ],
  },
];

export const BOSSES: Unit[] = [
  {
    id: "battlecar",
    name: "Battle Car",
    role: "Jefe del Nivel 1",
    level: "El coche de guerra de la banda callejera",
    hp: 30,
    idle: SPRITES.battleCarIdle,
    move: SPRITES.battleCarWalk,
    scale: 2.6,
    brief:
      "Máquina de cinco estados (Patrulla, Carga, Ráfaga, Retirada, Embestida) y el único jefe que telegrafía: una línea roja de 440 px parpadea 0,85 s antes de cada ráfaga de torreta.",
    tactic:
      "Genera 3 barriles explosivos en su arena. Detonarlos le quita 5 de vida cada uno: 15 de sus 30 PV sin gastar una bala.",
    stats: [
      { label: "Vida", value: "30" },
      { label: "Ráfaga", value: "4 balas · 2 dmg" },
      { label: "Granada", value: "4 dmg · cada 7–12 s" },
      { label: "Embestida", value: "460 px/s · 4 dmg" },
      { label: "Fase final", value: "con 8 PV o menos" },
      { label: "Suelta botiquines", value: "3 (a 21 / 12 / 5 PV)" },
    ],
  },
  {
    id: "machinekiller",
    name: "Machine Killer",
    role: "Jefe del Nivel 2",
    level: "La unidad automatizada que custodia la planta",
    hp: 28,
    idle: SPRITES.machineKillerIdle,
    move: SPRITES.machineKillerWalk,
    scale: 3.2,
    brief:
      "Sin máquina de estados ni avisos: puro reflejo por distancia. Alterna en cada disparo entre un láser de 1000 px y una ráfaga de 8 balas blancas a 560 px/s.",
    tactic: "Avanza mientras dispara. Corta la ráfaga de metralleta saliendo de su rango: la secuencia se interrumpe.",
    stats: [
      { label: "Vida", value: "28" },
      { label: "Láser", value: "1000 px · 1 dmg" },
      { label: "Metralleta", value: "8 balas · 1 dmg" },
      { label: "Alcance de tiro", value: "280 px" },
      { label: "Detección", value: "500 px" },
      { label: "Enfriamiento", value: "1.8 s" },
    ],
  },
  {
    id: "carblue",
    name: "Car Killer",
    role: "Jefe final",
    level: "El prototipo blindado con armamento láser",
    hp: 85,
    idle: SPRITES.carBlueIdle,
    move: SPRITES.carBlueWalk,
    scale: 2.6,
    brief:
      "Casi el triple de vida que cualquier otro jefe. Rota tres láseres en ciclo (inferior, diagonal a ±30° y superior) y su embestida llega sin ningún aviso previo.",
    tactic:
      "Su láser superior potenciado hace 8 de daño: con 10 PV máximos, dos impactos te matan. No compartas plataforma con él más de lo imprescindible.",
    stats: [
      { label: "Vida", value: "85" },
      { label: "Láser en ciclo", value: "4 dmg" },
      { label: "Láser superior", value: "8 dmg" },
      { label: "Embestida", value: "8 dmg · sin aviso" },
      { label: "Detección", value: "440 px" },
      { label: "Estados", value: "5" },
    ],
  },
];

export const LEVELS = [
  {
    n: "01",
    name: "El Gueto",
    tone: "Urbano nocturno, decadente",
    enemy: "Gangster tirador",
    boss: "Battle Car · 30 PV",
    spawns: 8,
    accent: "amber" as const,
    detail:
      "Calles con basura, contenedores, coches abandonados y farolas con luz propia. Los puntos de aparición se reparten en tres bandas de altura: te disparan desde arriba y desde abajo.",
  },
  {
    n: "02",
    name: "Zona Industrial",
    tone: "Fábrica abandonada, opresivo",
    enemy: "Matón cuerpo a cuerpo",
    boss: "Machine Killer · 28 PV",
    spawns: 11,
    accent: "ice" as const,
    detail:
      "El nivel más grande y más vertical: 500 px de desnivel y 1.800 px de ancho. El jugador lleva su propia linterna porque el mapa está a oscuras.",
  },
  {
    n: "03",
    name: "Central Eléctrica",
    tone: "Tecnológico, hostil, clímax",
    enemy: "Enemigo con láser",
    boss: "Car Killer · 85 PV",
    spawns: 8,
    accent: "blood" as const,
    detail:
      "Generadores, tanques, tuberías y antenas. Los spawns se concentran en una arena inferior donde se libra el grueso del combate y el duelo final.",
  },
];

export const DAMAGE_TABLE = [
  { source: "Bala del Gangster", dmg: 1, note: "Ráfagas de 3" },
  { source: "Golpe cuerpo a cuerpo", dmg: 1, note: "Matón / Francotirador" },
  { source: "Láser del Francotirador", dmg: 1, note: "Instantáneo" },
  { source: "Contacto con un jefe", dmg: 2, note: "Enfriamiento 1.8–2.0 s" },
  { source: "Bala del Battle Car", dmg: 2, note: "3 en fase final" },
  { source: "Granada del Battle Car", dmg: 4, note: "Explosión a 280 px" },
  { source: "Embestida del Battle Car", dmg: 4, note: "Con knockback" },
  { source: "Barril explosivo", dmg: 4, note: "5 a los enemigos" },
  { source: "Láser del Car Killer", dmg: 4, note: "Ciclo de 3 ángulos" },
  { source: "Láser superior del Car Killer", dmg: 8, note: "80 % de tu vida" },
  { source: "Embestida del Car Killer", dmg: 8, note: "Sin aviso previo" },
];

export const TECH_NOTES = [
  {
    title: "Barrido por raycast en las balas",
    body: "Cada bala traza un rayo desde su posición anterior a la nueva en lugar de fiarse de body_entered. Así los disparos a quemarropa nunca se pierden.",
  },
  {
    title: "Ajuste al suelo en el spawn",
    body: "Al instanciar un enemigo se lanza un rayo vertical y se reposiciona según la forma de su collider (cápsula, rectángulo o círculo) para que apoye exacto.",
  },
  {
    title: "Parallax sin duplicar nodos",
    body: "Cuatro capas a velocidades 0.06 / 0.2 / 0.4 / 0.6 con una región de 10.000 px centrada en la cámara: repetición infinita con un solo sprite por capa.",
  },
  {
    title: "Barras de vida generadas por código",
    body: "Cada enemigo construye su panel con borde azul (dorado si es jefe) y relleno verde, ámbar o rojo según el porcentaje restante.",
  },
  {
    title: "HUD por frames, no por ProgressBar",
    body: "Vida y munición son sprites animados detenidos cuyo frame se fija a mano: frame = 10 − vida. Permite arte pixel-perfect por estado.",
  },
  {
    title: "Niveles configurados desde el inspector",
    body: "El enlace entre niveles vive en las propiedades exportadas del EnemySpawner: enemy_scene, boss_scene_path y next_scene_path.",
  },
];
