// Nowhere – Prototype 3 copy of p2/ai.js. Bring your own AI (Betreiber 07.11., 00:47: "the bring your own ai approach of kompass. key in the app").
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
  const t0 = Date.now(); AI.last = { preset: c.preset, model: c.model, status: null, finish: null, ms: null, chars: 0, raw: '' };
  // content may be a list of chunks (Mistral's reasoning models: {type: 'thinking'} and {type: 'text'}) – only the text counts
  const textOf = (x) => (Array.isArray(x) ? x.map((p) => (p && (p.type === 'text' || p.type === 'output_text') ? (p.text || '') : typeof p === 'string' ? p : '')).join('') : String(x || ''));
  const done = (status, finish, text) => { const t = textOf(text); Object.assign(AI.last, { status, finish, ms: Date.now() - t0, chars: t.length, raw: t.length > 800 ? t.slice(0, 600) + ' … ' + t.slice(-200) : t }); return t.trim(); };
  const fail = async (r) => { const t = await r.text().catch(() => ''); let m = ''; try { const j = JSON.parse(t); m = (j.error && (j.error.message || j.error)) || j.message || ''; } catch (e) { m = t.slice(0, 160); }
    const err = new Error(r.status === 401 || r.status === 403 ? 'aiKeyRejected' : r.status === 429 ? 'aiQuota' : r.status === 402 ? 'aiNoCredit' : 'HTTP ' + r.status + (m ? ': ' + String(m).slice(0, 120) : ''));
    err.status = r.status; AI.last.status = r.status; AI.last.ms = Date.now() - t0; AI.last.raw = String(t).slice(0, 600); return err; };
  if (c.preset === 'gemini' || c.url === 'gemini') {
    const body = { contents: [{ role: 'user', parts: [{ text: user }] }], systemInstruction: { parts: [{ text: system }] },
      generationConfig: { maxOutputTokens: Math.max(max, 1024), temperature: 0.8, responseMimeType: 'application/json' } };
    const r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + encodeURIComponent(c.model || 'gemini-2.5-flash') + ':generateContent',
      { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': AI.key }, body: JSON.stringify(body), signal });
    if (!r.ok) throw await fail(r);
    const d = await r.json();
    return done(r.status, d.candidates && d.candidates[0] && d.candidates[0].finishReason, ((d.candidates && d.candidates[0] && d.candidates[0].content && d.candidates[0].content.parts) || []).map((p) => p.text || '').join(''));
  }
  if (aiIsAnthropic()) {
    const r = await fetch(c.url.replace(/\/+$/, '') + '/messages', { method: 'POST', signal,
      headers: { 'Content-Type': 'application/json', 'x-api-key': AI.key, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
      body: JSON.stringify({ model: c.model || 'claude-haiku-4-5', max_tokens: max, temperature: 0.8, system: system + '\n\nAnswer with valid JSON only.', messages: [{ role: 'user', content: user }] }) });
    if (!r.ok) throw await fail(r);
    const d = await r.json();
    return done(r.status, d && d.stop_reason, ((d && d.content) || []).filter((x) => x.type === 'text').map((x) => x.text || '').join(''));
  }
  const url = c.url.replace(/\/+$/, '') + '/chat/completions';
  const hd = { 'Content-Type': 'application/json' };
  if (AI.key) hd.Authorization = 'Bearer ' + AI.key;
  if (c.preset === 'openrouter') { hd['HTTP-Referer'] = location.origin + location.pathname; hd['X-Title'] = 'Nowhere'; }
  const body = { model: c.model || (c.preset === 'openrouter' ? 'openrouter/auto' : ''), messages: [{ role: 'system', content: system }, { role: 'user', content: user }], max_tokens: max, temperature: 0.8, response_format: { type: 'json_object' } };
  // Mistral's large model thinks first and the thinking counts against max_tokens – ask it to think little (lowest: "low")
  if (c.preset === 'mistral' || /api\.mistral\.ai/.test(c.url || '')) body.reasoning_effort = 'low';
  let r = await fetch(url, { method: 'POST', headers: hd, body: JSON.stringify(body), signal });
  if (!r.ok && r.status === 400 && body.reasoning_effort) { delete body.reasoning_effort; r = await fetch(url, { method: 'POST', headers: hd, body: JSON.stringify(body), signal }); }
  if (!r.ok && r.status === 400) { delete body.response_format; r = await fetch(url, { method: 'POST', headers: hd, body: JSON.stringify(body), signal }); }
  if (!r.ok) throw await fail(r);
  const d = await r.json();
  if (d.usage) AI.last.tokens = { prompt: d.usage.prompt_tokens, completion: d.usage.completion_tokens };
  const msg = d.choices && d.choices[0] && d.choices[0].message;
  if (msg && Array.isArray(msg.content)) AI.last.chunks = msg.content.map((p) => (p && p.type) || typeof p).join(',');
  return done(r.status, d.choices && d.choices[0] && d.choices[0].finish_reason, (msg && msg.content) || '');
}
function aiErrorText(e) {
  const m = String((e && e.message) || e || '');
  if (e && e.name === 'AbortError') return T('aiCancelled');
  if (/Failed to fetch|NetworkError|Load failed/i.test(m) || (e && e.name === 'TypeError')) return T('aiUnreachable');
  if (m === 'aiKeyRejected' || m === 'aiQuota' || m === 'aiNoCredit' || m === 'aiNoCards') return T(m);
  return m;
}
async function aiAuthorTest(state) {
  const brief = authorBrief(state); const t0 = Date.now();
  let text = '', err = null;
  try { text = await aiChat(aiAuthorSystem(brief), JSON.stringify(brief), { max: 12000 }); } catch (e) { err = e; }
  let j = aiJson(text); let salvaged = false;
  if ((!j || !Array.isArray(j.cards)) && text) { j = aiSalvage(text); salvaged = !!j; }
  return { ok: !err && !!j && Array.isArray(j.cards) && j.cards.length > 0, error: err ? aiErrorText(err) : (j ? '' : 'aiNoCards'), ms: Date.now() - t0,
    status: AI.last && AI.last.status, finish: AI.last && AI.last.finish, chars: text.length, cards: j && j.cards ? j.cards.length : 0,
    notes: j && typeof j.notes === 'string' ? j.notes.length : 0, plan: !!(j && j.plan), salvaged, raw: String(text || (AI.last && AI.last.raw) || '').slice(0, 300),
    tokens: AI.last && AI.last.tokens, chunks: AI.last && AI.last.chunks };
}
async function aiTest() {
  const t = await aiChat('You answer in one short JSON object.', 'Say hello and name your model. Answer as {"hello": "...", "model": "..."}', { max: 80 });
  const j = aiJson(t); return (j && (j.hello || j.model)) ? String(j.hello || '') + (j.model ? ' (' + j.model + ')' : '') : t.slice(0, 120);
}
// the outer {...} or [...] that starts at i, with strings respected; null when it never closes
function aiBlock(t, i) {
  const open = t[i], close = open === '{' ? '}' : ']'; let depth = 0, str = false, esc = false;
  for (let k = i; k < t.length; k++) {
    const ch = t[k];
    if (str) { if (esc) esc = false; else if (ch === '\\') esc = true; else if (ch === '"') str = false; continue; }
    if (ch === '"') str = true; else if (ch === open) depth++; else if (ch === close) { depth--; if (!depth) return t.slice(i, k + 1); }
  }
  return null;
}
// what can be saved from an answer that is not valid JSON: the notes, the plan, every complete card
function aiSalvage(text) {
  const t = aiFixStrings(String(text || '')); const out = { salvaged: true };
  const n = t.match(/"notes"\s*:\s*"((?:[^"\\]|\\.)*)"/); if (n) { try { out.notes = JSON.parse('"' + n[1] + '"'); } catch (e) { out.notes = n[1]; } }
  let after = 0;   // the plan has a "cards" list of its own – the answer's cards come after it
  const p = t.search(/"plan"\s*:\s*\{/); if (p >= 0) { const at = t.indexOf('{', p); const blk = aiBlock(t, at); if (blk) { after = at + blk.length; try { out.plan = JSON.parse(blk); } catch (e) { /* no plan */ } } }
  const rest = t.slice(after).search(/"cards"\s*:\s*\[/); const c = rest >= 0 ? after + rest : -1; out.cards = [];
  if (c >= 0) {
    let k = t.indexOf('[', c) + 1;
    while (k < t.length) {
      const a = t.indexOf('{', k); if (a < 0) break;
      const blk = aiBlock(t, a); if (!blk) break;
      try { out.cards.push(JSON.parse(blk)); } catch (e) { /* a broken card */ }
      k = a + blk.length;
    }
  }
  return out.cards.length ? out : null;
}
// line breaks and tabs written raw inside strings make JSON invalid – escape them (062 item 2)
function aiFixStrings(t) {
  let out = '', str = false, esc = false;
  for (const ch of t) {
    if (str) { if (esc) { esc = false; out += ch; continue; } if (ch === '\\') { esc = true; out += ch; continue; } if (ch === '"') { str = false; out += ch; continue; }
      out += ch === '\n' ? '\\n' : ch === '\r' ? '' : ch === '\t' ? '\\t' : ch; continue; }
    if (ch === '"') str = true; out += ch;
  }
  return out;
}
function aiJson(text) {
  if (!text) return null;
  const t = String(text).replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '');
  try { return JSON.parse(t); } catch (e) { /* raw line breaks? */ }
  try { return JSON.parse(aiFixStrings(t)); } catch (e) { /* try the outermost braces */ }
  const a = t.indexOf('{'), b = t.lastIndexOf('}');
  if (a >= 0 && b > a) { try { return JSON.parse(t.slice(a, b + 1)); } catch (e) { return null; } }
  return null;
}

// ---------- the author's instructions ----------
function aiAuthorSystem(brief) {
  const traits = Object.keys(V_TRAITS).join(', ');
  return [
    // the role line names the year's story-line from main_story, not a fixed one (post/spiel/047)
    'You are the author of "Nowhere", a card game about one year of a person\'s life in a world of five power blocks (europe, usa, russia, china, india).' + (brief.main_story && brief.main_story.title ? ' This year\'s story-line: "' + brief.main_story.title + '" (main_story in the state).' : ''),
    'Each week you write the new cards for this one player, from the game state you are given. Write ' + (brief.lang === 'de' ? 'in German' : 'in English') + '.',
    'Write 1 to 3 cards. Make them follow from what the player did in the last weeks, from the people in the team (by profession), from the places the player owns, and from the open story-lines. Small, personal and concrete beats grand. No real living public figures, no brands.',
    // the author's brief by Spiel_1 (nowhere/autor-brief.md, post/spiel/023): tone, continuity, story-line, examples
    CARDS.authorBrief ? '\n' + CARDS.authorBrief + '\n\nThe format below is binding; the brief above is how to write within it.' : '',
    'Answer with JSON only: {"notes": "your notebook", "plan": plan, "cards": [card, ...]}. Decide the plan first, then write the cards from it. The plan:',
    '{"decisions": {"main_story": {"move": "…", "beat_safety": "… (only when a card serves the main story or the goal)"}, "due_thread": {"id": "<id>", "move": "…"}, "last_choice": {"from": "<week or title from last_weeks>", "move": "…"}},',
    ' "cards": [{"id": "<the card\'s id>", "serves": "main_story" | "goal" | "<thread id>" | "team" | "world", "cause": "what in the state it comes from: flag:<name>, thread:<id>, a person, a week of last_weeks, the phase", "yield": "the one thing the player can win, as an effect, e.g. money:+2", "impact": 1-5}],',
    ' "threads": {"new": [{"id": "…", "endings": ["…", "…"]}], "advance": [{"id": "…", "move": "…", "cards_left_after": n}], "close": [{"id": "…", "ending": "…", "for_good": "…"}]}, "deferred": [{"idea": "…", "waiting_for": "…", "write_when": "…"}]}',
    'The engine checks the plan: a card whose cause points at nothing in the state, or whose yield no option brings, is thrown away. Things on the board are unresolved – they are no cause. A card:',
    '{"id": "short-slug", "kind": "event", "title": "≤ 60 chars", "stack": one of ' + JSON.stringify(brief.story_lines.concat(['personal'])) + ', "reach": "personal" | "global" | "block:<block>", "impact": 1-5,',
    ' "place": "home" | a block | a possession id from the state, "who": "self" | "anyone" | "self+1" | "profession:<a profession in the team>", "takes": weeks 0-13 (at least 1 when the place is not home), "costs": 1 (0 only for a card of impact 1 at home), "expires": weeks on the board 2-8, "arrives": "board" | "draw",',
    ' "requires": [], "options": [option, ...] (2 to 4), "back": "2-5 sentences of story, the card\'s back side"}',
    'An option: {"text": "what the player does, ≤ 70 chars", "origin": condition, "cost": {"money": 0-2, "influence": 0-2}, "effects": [effect, ...]}',
    'Exactly one option must be free: origin "always", cost {} – letting it pass. Other options may use origin "always" with a cost, or a condition the player meets.',
    'Conditions: always · skill:<skill> · profession:<profession> · trait:<trait> · block:<block> · associate:<profession> · contact:<profession> · possession:<type> · flag:<name>.',
    'Effects (small numbers: at most ±2, ±3 only on a card of impact 4 or 5): money:+1 · influence:-1 · status:<block>:+1 · trait:+<trait> · trait:-<trait> · acquired:+<word> · flag:<name> · follow:<card id>:<months> (only ids from the state or your own cards in this answer) · gain:<id> and join:<person id> only with ids from team, contacts, possessions or available_people in the state (join takes the person into the team).',
    'A check must bring something: "effects" (success), "partial" and "failure" are never empty on an option with a check.',
    'Trait words (only these): ' + traits + '.',
    'Skills: persuasion, deception, intimidation, insight, performance, languages, stealth, sleight-of-hand, athletics, survival, perception, technology, medicine, science, history, investigation, religion, finance.',
    'Ids are lowercase with hyphens. A long activity (takes 4-13) means that person is gone that long – use it for things that really take time.',
    // Prototype 3 (post/spiel/028)
    'Checks: an option may carry "check": {"skill": <skill>, "difficulty": 1-5, "trait": <trait word that helps, optional>} plus "partial": [effects] and "failure": [effects]; then "effects" is what happens on success. The doer rolls d20 + skill level + the trait\'s value (+2 with a helper) against 8 · 11 · 14 · 17 · 20 for difficulty 1-5; five over is a strong success. Use checks where the outcome is really uncertain, and say all three outcomes on the back.',
    'Planning: you may add "week": n to a card (from this week up to ' + (brief.week + (brief.plan_ahead_weeks || 3)) + ') to schedule it ahead; the state shows what you planned before ("planned") – revise it by sending cards for those weeks again. Plan returns from long activities for the week they end.',
    'Threads: every card belongs to a thread – "thread": ["<id>"] and "part": "opens" | "continues" | "turns" | "closes". "threads" in the state are the open ones: what each asks, how it can end, how many cards are left. A thread marked "due" waits for its next card – write that one first. Close a thread when "left" is 1 or 0, with one of its endings. A new thread only when a card opens it and carries "thread_question" and "thread_endings" (two or three ways it can end).',
    'Memory: "notes" in the state is your notebook as you wrote it last time. Answer with "notes" too – what you know about this world, its people and where the story goes; keep it current, at most 2000 characters. "recent_taken" and "board" hold the texts of the cards; "main_story.bible" the threads and beats of the story-line; "last_plan" your plan of last time.',
    'Variety: "recent_titles" in the state are the titles of your last twenty cards. A card whose title shares most of its words with one of them is thrown away unread – find a new prop, a new scene, a new sentence shape.',
    brief.goal ? 'The player\'s goal this year: "' + brief.goal.title + '" (' + brief.goal.measure + ' ' + brief.goal.now + ' of ' + brief.goal.target + '). Give him chances toward it – and costs.' : '',
  ].join('\n');
}
// the answer format the author is asked for – in the start entry of every game (064)
const AI_FORMAT = 'notes-plan-cards/2';
async function aiAuthor(brief, signal) {
  // 6000 tokens: notes, plan and three cards did not fit into 2400 – the answer was cut off and unreadable (062, 13.11.)
  const text = await aiChat(aiAuthorSystem(brief), JSON.stringify(brief), { max: 12000, signal });
  let j = aiJson(text);
  if (!j || !Array.isArray(j.cards)) j = aiSalvage(text);
  if (!j || !Array.isArray(j.cards)) { const e = new Error('aiNoCards'); e.diag = Object.assign({}, AI.last); throw e; }
  if (j.salvaged) AI.last.salvaged = true;
  // give the cards ids of their own and rewrite references between them
  const map = {};
  j.cards.forEach((c, i) => { if (c && typeof c === 'object') { const slug = String(c.id || 'card').toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 30) || 'card';
    const id = 'ai-' + brief.game + '-y' + (brief.year || 1) + '-w' + (brief.writing_for_week || brief.week) + '-' + (i + 1) + '-' + slug; if (c.id) map[c.id] = id; c.id = id; c.kind = 'event'; c.requires = Array.isArray(c.requires) ? c.requires : []; } });
  j.cards.forEach((c) => { (c && Array.isArray(c.options) ? c.options : []).forEach((o) => { if (o && Array.isArray(o.effects)) o.effects = o.effects.map((ef) => { const p = String(ef).split(':'); if (map[p[1]]) p[1] = map[p[1]]; return p.join(':'); }); }); });
  if (j.plan && Array.isArray(j.plan.cards)) j.plan.cards.forEach((p) => { if (p && map[p.id]) p.id = map[p.id]; });   // the plan names the cards by their new ids
  return { model: (AI.cfg.preset || 'ai') + (AI.cfg.model ? ' · ' + AI.cfg.model : ''), cards: j.cards, plan: j.plan && typeof j.plan === 'object' ? j.plan : null, notes: typeof j.notes === 'string' ? j.notes : null, diag: Object.assign({}, AI.last) };
}
