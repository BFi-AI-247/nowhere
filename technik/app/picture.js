// Nowhere – placeholder picture: drawn from the card's id and kind, the same every time (decision 05.11., 17:55: 3a).
// Owner: role Spiel, instance Spiel_2.

function hashOf(str) {  // FNV-1a, 32 bit
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function rngOf(seed) {  // mulberry32
  let a = seed >>> 0;
  return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const HUES = { event: [200, 20, 340, 160], person: [30, 350, 270, 45], possession: [100, 60, 190, 25], character: [35, 300, 210, 10] };

// Draws into a canvas element; w/h in CSS px. Abstract: a horizon, a few shapes, grain – never a face, never a logo.
function drawPicture(canvas, card, w, h) {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
  canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
  const g = canvas.getContext('2d'); g.scale(dpr, dpr);
  const r = rngOf(hashOf(card.id)); const hues = HUES[card.kind] || HUES.event;
  const hue = hues[Math.floor(r() * hues.length)]; const hue2 = (hue + 140 + r() * 80) % 360;
  const dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const L = dark ? 22 : 78, L2 = dark ? 34 : 64;
  const sky = g.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, `hsl(${hue} 45% ${L + 8}%)`); sky.addColorStop(1, `hsl(${hue2} 40% ${L2}%)`);
  g.fillStyle = sky; g.fillRect(0, 0, w, h);
  // sun or moon
  const sx = w * (0.2 + r() * 0.6), sy = h * (0.15 + r() * 0.35), sr = Math.min(w, h) * (0.08 + r() * 0.1);
  g.fillStyle = `hsl(${(hue + 30) % 360} 80% ${dark ? 70 : 92}% / 0.9)`; g.beginPath(); g.arc(sx, sy, sr, 0, Math.PI * 2); g.fill();
  // horizon layers
  const layers = 2 + Math.floor(r() * 3);
  for (let i = 0; i < layers; i++) {
    const base = h * (0.5 + i * (0.45 / layers) + r() * 0.05);
    g.fillStyle = `hsl(${(hue2 + i * 15) % 360} 35% ${Math.max(8, L2 - 12 - i * 9)}% / 0.9)`;
    g.beginPath(); g.moveTo(0, h);
    const steps = 6 + Math.floor(r() * 6);
    for (let k = 0; k <= steps; k++) g.lineTo((w / steps) * k, base - r() * h * 0.12 * (card.kind === 'possession' ? 1.8 : 1));
    g.lineTo(w, h); g.closePath(); g.fill();
  }
  // shapes by kind
  g.globalAlpha = 0.85;
  if (card.kind === 'person' || card.kind === 'character') {
    const cx = w * (0.35 + r() * 0.3), top = h * 0.3;
    g.fillStyle = `hsl(${hue} 30% ${dark ? 14 : 30}%)`;
    g.beginPath(); g.ellipse(cx, h * 0.95, w * 0.22, h * 0.4, 0, Math.PI, 0); g.fill();   // shoulders
    g.beginPath(); g.ellipse(cx, top + h * 0.12, w * 0.09, h * 0.13, 0, 0, Math.PI * 2); g.fill();  // head
  } else if (card.kind === 'possession') {
    const n = 2 + Math.floor(r() * 4);
    for (let i = 0; i < n; i++) {
      const bw = w * (0.08 + r() * 0.18), bh = h * (0.15 + r() * 0.35), bx = r() * (w - bw);
      g.fillStyle = `hsl(${hue} 25% ${dark ? 12 + i * 3 : 28 + i * 5}%)`; g.fillRect(bx, h - bh, bw, bh);
    }
  } else {
    const n = 3 + Math.floor(r() * 5);
    for (let i = 0; i < n; i++) {
      g.strokeStyle = `hsl(${(hue + 180) % 360} 60% ${dark ? 75 : 95}% / ${0.25 + r() * 0.4})`; g.lineWidth = 1 + r() * 2;
      g.beginPath(); const y = h * (0.2 + r() * 0.5); g.moveTo(0, y); g.bezierCurveTo(w * 0.3, y - r() * 40, w * 0.6, y + r() * 40, w, y - r() * 30); g.stroke();
    }
  }
  g.globalAlpha = 1;
  // grain
  g.fillStyle = dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
  for (let i = 0; i < 160; i++) g.fillRect(r() * w, r() * h, 1.2, 1.2);
}
