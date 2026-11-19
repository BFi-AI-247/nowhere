// Nowhere – bring your own AI (Betreiber 07.11., 00:47: "the bring your own ai approach of kompass. key in the app").
// Pattern: BFi-AI-247/KOMPASS web/ki/anbieter.js, tresor.js, ki-box.js. The key stays on this device, encrypted with a
// non-extractable AES-GCM key in IndexedDB, and is sent only to the provider the player chose.
// Classic script, loaded before week.js. Owner: Spiel_2.

const AI_PRESETS = [
  { id: 'openrouter', label: 'OpenRouter', url: 'https://openrouter.ai/api/v1', model: '', login: true, keyUrl: '' },
  { id: 'mistral', label: 'Mistral', url: 'https://api.mistral.ai/v1', model: 'mistral-small-latest', keyUrl: 'https://console.mistral.ai/api-keys' },
  { id: 'claude', label: 'Claude', url: 'https://api.anthropic.com/v1', model: 'claude-haiku-4-5', keyUrl: 'https://console.anthropic.com/settings/keys' },
  { id: 'openai', label: 'OpenAI', url: 'https://api.openai.com/v1', model: 'gpt-4o-mini', keyUrl: 'https://platform.openai.com/api-keys' },
  { id: 'gemini', label: 'Gemini', url: 'gemini', model: 'gemini-2.5-flash', keyUrl: 'https://aistudio.google.com/apikey' },
  { id: 'ollama', label: 'Ollama', url: 'http://localhost:11434/v1', model: 'llama3.2', keyUrl: '', local: true },
  { id: 'other', label: 'Other', url: '', model: '', keyUrl: '' },
];
const AI_CFG_KEY = 'nowhere.ai';
const AI = { cfg: { preset: '', url: '', model: '' }, key: '', ready: false, models: null };

function aiCfgLoad() { try { Object.assign(AI.cfg, JSON.parse(localStorage.getItem(AI_CFG_KEY) || '{}')); } catch (e) { /* defaults */ } }
function aiCfgSave() { try { localStorage.setItem(AI_CFG_KEY, JSON.stringify(AI.cfg)); } catch (e) { /* ignore */ } }
function aiPreset() { return AI_PRESETS.find((p) => p.id === AI.cfg.preset) || null; }
function aiIsAnthropic() { return /^https:\/\/api\.anthropic\.com\b/i.test(AI.cfg.url || ''); }
function aiConfigured() { const p = aiPreset(); return !!(p && AI.cfg.url && (AI.key || p.local || (p.id === 'other' && /localhost|127\.0\.0\.1/.test(AI.cfg.url)))); }

// ---------- the vault ----------
function aiDb() {
  return new Promise((ok, fail) => { const r = indexedDB.open('nowhere-tresor', 1); r.onupgradeneeded = () => r.result.createObjectStore('v'); r.onsuccess = () => ok(r.result); r.onerror = () => fail(r.error); });
}
async function aiIdb(mode, fn) {
  const db = await aiDb();
  return new Promise((ok, fail) => { const tx = db.transaction('v', mode); const req = fn(tx.objectStore('v')); tx.oncomplete = () => ok(req && req.result); tx.onerror = () => fail(tx.error); });
}
async function aiDeviceKey() {
  let k = await aiIdb('readonly', (st) => st.get('device'));
  if (!k) { k = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']); await aiIdb('readwrite', (st) => st.put(k, 'device')); }
  return k;
}
async function aiKeySave(plain) {
  const k = await aiDeviceKey(); const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, k, new TextEncoder().encode(plain));
  await aiIdb('readwrite', (st) => st.put({ iv, ct, at: Date.now() }, 'key'));
  AI.key = plain;
}
async function aiKeyLoad() {
  try { const rec = await aiIdb('readonly', (st) => st.get('key')); if (!rec) return ''; const k = await aiDeviceKey();
    AI.key = new TextDecoder().decode(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: rec.iv }, k, rec.ct)); return AI.key; } catch (e) { return ''; }
}
async function aiKeyRemove() { AI.key = ''; try { await aiIdb('readwrite', (st) => st.delete('key')); } catch (e) { /* ignore */ } }
async function aiInit() { aiCfgLoad(); await aiKeyLoad(); AI.ready = aiConfigured(); await aiOpenRouterReturn(); }

// ---------- OpenRouter sign-in (PKCE), as in KOMPASS ----------
function b64url(buf) { return btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
async function aiOpenRouterStart() {
  const verifier = b64url(crypto.getRandomValues(new Uint8Array(48)));
  const challenge = b64url(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier)));
  const state = b64url(crypto.getRandomValues(new Uint8Array(12)));
  sessionStorage.setItem('nowhere.or', JSON.stringify({ verifier, state }));
  const cb = location.origin + location.pathname;
  location.href = 'https://openrouter.ai/auth?callback_url=' + encodeURIComponent(cb) + '&code_challenge=' + challenge + '&code_challenge_method=S256&state=' + state + '&key_label=Nowhere';
}
async function aiOpenRouterReturn() {
  const q = new URLSearchParams(location.search); const code = q.get('code'); if (!code) return;
  let saved = {}; try { saved = JSON.parse(sessionStorage.getItem('nowhere.or') || '{}'); } catch (e) { /* empty */ }
  sessionStorage.removeItem('nowhere.or'); history.replaceState(null, '', location.pathname);
  if (!saved.verifier || (q.get('state') && q.get('state') !== saved.state)) { AI.notice = 'orMismatch'; return; }
  try {
    const r = await fetch('https://openrouter.ai/api/v1/auth/keys', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code, code_verifier: saved.verifier, code_challenge_method: 'S256' }) });
    const d = await r.json().catch(() => ({}));
    if (!r.ok || !d.key) throw new Error((d.error && d.error.message) || 'HTTP ' + r.status);
    await aiKeySave(d.key); AI.cfg.preset = 'openrouter'; AI.cfg.url = 'https://openrouter.ai/api/v1'; aiCfgSave();
    await aiOpenRouterModels(); AI.ready = aiConfigured(); AI.notice = 'orConnected';
  } catch (e) { AI.notice = 'orFailed'; AI.error = e.message; }
}
async function aiOpenRouterModels() {
  try {
    const d = await (await fetch('https://openrouter.ai/api/v1/models')).json();
    const free = (d.data || []).filter((m) => m && m.id && !/image|audio|embed/i.test(m.id) && m.pricing && Number(m.pricing.prompt) === 0 && Number(m.pricing.completion) === 0);
    const good = /mistral|llama-3\.3-70b|gemma-3|deepseek|qwen/i;
    free.sort((a, b) => (good.test(b.id) - good.test(a.id)) || ((b.context_length || 0) - (a.context_length || 0)));
    AI.models = free.map((m) => ({ id: m.id, name: (m.name || m.id).replace(/\s*\(free\)\s*$/i, '') }));
    if (!AI.cfg.model && AI.models.length) { AI.cfg.model = AI.models[0].id; aiCfgSave(); }
  } catch (e) { AI.models = []; }
}

// ---------- one call for every provider ----------
async function aiChat(system, user, opt) {
  opt = opt || {}; const c = AI.cfg; const max = opt.max || 2000; const signal = opt.signal;
  const fail = async (r) => { const t = await r.text().catch(() => ''); let m = ''; try { const j = JSON.parse(t); m = (j.error && (j.error.message || j.error)) || j.message || ''; } catch (e) { m = t.slice(0, 160); }
    const err = new Error(r.status === 401 || r.status === 403 ? 'aiKeyRejected' : r.status === 429 ? 'aiQuota' : r.status === 402 ? 'aiNoCredit' : 'HTTP ' + r.status + (m ? ': ' + String(m).slice(0, 120) : ''));
    err.status = r.status; return err; };
  if (c.preset === 'gemini' || c.url === 'gemini') {
    const body = { contents: [{ role: 'user', parts: [{ text: user }] }], systemInstruction: { parts: [{ text: system }] },
      generationConfig: { maxOutputTokens: Math.max(max, 1024), temperature: 0.8, responseMimeType: 'application/json' } };
    const r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + encodeURIComponent(c.model || 'gemini-2.5-flash') + ':generateContent',
      { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': AI.key }, body: JSON.stringify(body), signal });
    if (!r.ok) throw await fail(r);
    const d = await r.json();
    return ((d.candidates && d.candidates[0] && d.candidates[0].content && d.candidates[0].content.parts) || []).map((p) => p.text || '').join('').trim();
  }
  if (aiIsAnthropic()) {
    const r = await fetch(c.url.replace(/\/+$/, '') + '/messages', { method: 'POST', signal,
      headers: { 'Content-Type': 'application/json', 'x-api-key': AI.key, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
      body: JSON.stringify({ model: c.model || 'claude-haiku-4-5', max_tokens: max, temperature: 0.8, system: system + '\n\nAnswer with valid JSON only.', messages: [{ role: 'user', content: user }] }) });
    if (!r.ok) throw await fail(r);
    const d = await r.json();
    return ((d && d.content) || []).filter((x) => x.type === 'text').map((x) => x.text || '').join('').trim();
  }
  const url = c.url.replace(/\/+$/, '') + '/chat/completions';
  const hd = { 'Content-Type': 'application/json' };
  if (AI.key) hd.Authorization = 'Bearer ' + AI.key;
  if (c.preset === 'openrouter') { hd['HTTP-Referer'] = location.origin + location.pathname; hd['X-Title'] = 'Nowhere'; }
  const body = { model: c.model || (c.preset === 'openrouter' ? 'openrouter/auto' : ''), messages: [{ role: 'system', content: system }, { role: 'user', content: user }], max_tokens: max, temperature: 0.8, response_format: { type: 'json_object' } };
  let r = await fetch(url, { method: 'POST', headers: hd, body: JSON.stringify(body), signal });
  if (!r.ok && r.status === 400) { delete body.response_format; r = await fetch(url, { method: 'POST', headers: hd, body: JSON.stringify(body), signal }); }
  if (!r.ok) throw await fail(r);
  const d = await r.json();
  return String((d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content) || '').trim();
}
function aiErrorText(e) {
  const m = String((e && e.message) || e || '');
  if (e && e.name === 'AbortError') return T('aiCancelled');
  if (/Failed to fetch|NetworkError|Load failed/i.test(m) || (e && e.name === 'TypeError')) return T('aiUnreachable');
  if (m === 'aiKeyRejected' || m === 'aiQuota' || m === 'aiNoCredit' || m === 'aiNoCards') return T(m);
  return m;
}
async function aiTest() {
  const t = await aiChat('You answer in one short JSON object.', 'Say hello and name your model. Answer as {"hello": "...", "model": "..."}', { max: 80 });
  const j = aiJson(t); return (j && (j.hello || j.model)) ? String(j.hello || '') + (j.model ? ' (' + j.model + ')' : '') : t.slice(0, 120);
}
function aiJson(text) {
  if (!text) return null;
  const t = String(text).replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '');
  try { return JSON.parse(t); } catch (e) { /* try the outermost braces */ }
  const a = t.indexOf('{'), b = t.lastIndexOf('}');
  if (a >= 0 && b > a) { try { return JSON.parse(t.slice(a, b + 1)); } catch (e) { return null; } }
  return null;
}

// ---------- the author's instructions ----------
function aiAuthorSystem(brief) {
  const traits = Object.keys(V_TRAITS).join(', ');
  return [
    'You are the author of "Nowhere", a card game about one year of a person\'s life in a world of five power blocks (europe, usa, russia, china, india) during "the last boom" of an AI economy.',
    'Each week you write the new cards for this one player, from the game state you are given. Write ' + (brief.lang === 'de' ? 'in German' : 'in English') + '.',
    'Write 1 to 3 cards. Make them follow from what the player did in the last weeks, from the people in the team (by profession), from the places the player owns, and from the open story-lines. Small, personal and concrete beats grand. No real living public figures, no brands.',
    // the author's brief by Spiel_1 (nowhere/autor-brief.md, post/spiel/023): tone, continuity, story-line, examples
    CARDS.authorBrief ? '\n' + CARDS.authorBrief + '\n\nThe format below is binding; the brief above is how to write within it.' : '',
    'Answer with JSON only: {"cards": [card, ...]}. A card:',
    '{"id": "short-slug", "kind": "event", "title": "≤ 60 chars", "stack": one of ' + JSON.stringify(brief.story_lines.concat(['personal'])) + ', "reach": "personal" | "global" | "block:<block>", "impact": 1-5,',
    ' "place": "home" | a block | a possession id from the state, "who": "self" | "anyone" | "self+1" | "profession:<a profession in the team>", "takes": weeks 0-13, "costs": 0 | 1, "expires": weeks on the board 2-8, "arrives": "board" | "draw",',
    ' "requires": [], "options": [option, ...] (2 to 4), "back": "2-5 sentences of story, the card\'s back side"}',
    'An option: {"text": "what the player does, ≤ 70 chars", "origin": condition, "cost": {"money": 0-2, "influence": 0-2}, "effects": [effect, ...]}',
    'Exactly one option must be free: origin "always", cost {} – letting it pass. Other options may use origin "always" with a cost, or a condition the player meets.',
    'Conditions: always · skill:<skill> · profession:<profession> · trait:<trait> · block:<block> · associate:<profession> · contact:<profession> · possession:<type> · flag:<name>.',
    'Effects (small numbers, at most ±2): money:+1 · influence:-1 · status:<block>:+1 · trait:+<trait> · trait:-<trait> · acquired:+<word> · flag:<name> · follow:<card id>:<months> (only ids from the state or your own cards in this answer) · gain:<card id> (only known ids).',
    'Trait words (only these): ' + traits + '.',
    'Skills: persuasion, deception, intimidation, insight, performance, languages, stealth, sleight-of-hand, athletics, survival, perception, technology, medicine, science, history, investigation, religion, finance.',
    'Ids are lowercase with hyphens. A long activity (takes 4-13) means that person is gone that long – use it for things that really take time.',
  ].join('\n');
}
async function aiAuthor(brief, signal) {
  const text = await aiChat(aiAuthorSystem(brief), JSON.stringify(brief), { max: 2400, signal });
  const j = aiJson(text);
  if (!j || !Array.isArray(j.cards)) throw new Error('aiNoCards');
  // give the cards ids of their own and rewrite references between them
  const map = {};
  j.cards.forEach((c, i) => { if (c && typeof c === 'object') { const slug = String(c.id || 'card').toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 30) || 'card';
    const id = 'ai-' + brief.game + '-w' + brief.week + '-' + (i + 1) + '-' + slug; if (c.id) map[c.id] = id; c.id = id; c.kind = 'event'; c.requires = Array.isArray(c.requires) ? c.requires : []; } });
  j.cards.forEach((c) => { (c && Array.isArray(c.options) ? c.options : []).forEach((o) => { if (o && Array.isArray(o.effects)) o.effects = o.effects.map((ef) => { const p = String(ef).split(':'); if (map[p[1]]) p[1] = map[p[1]]; return p.join(':'); }); }); });
  return { model: (AI.cfg.preset || 'ai') + (AI.cfg.model ? ' · ' + AI.cfg.model : ''), cards: j.cards };
}
