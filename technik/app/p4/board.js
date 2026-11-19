// Nowhere – Prototype 2 UI: the open board, grouped by place; the team with where everyone is; "next week".
// Tap a card to open it, tap the picture to flip it, choose an option, choose who goes. Swipe left/right between
// Board · Team · Story. Classic script, loaded last. Owner: Spiel_2.

const V = { ai: { msg: '', err: '', key: '', testing: false }, screen: 'loading', tab: 0, open: null, flipped: false, sheet: null, busy: false, note: '', error: '' };
const TABS = ['board', 'team', 'story'];
const app = document.getElementById('app');
const els = {};

function h(tag, attrs, ...children) {
  const el = document.createElement(tag);
  Object.entries(attrs || {}).forEach(([k, v]) => {
    if (v == null || v === false) return;
    if (k.startsWith('on')) el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === 'class') el.className = v;
    else el.setAttribute(k, v === true ? '' : v);
  });
  const add = (c) => { if (c == null || c === false) return; if (Array.isArray(c)) c.forEach(add); else el.append(c.nodeType ? c : document.createTextNode(String(c))); };
  children.forEach(add);
  return el;
}
function cap(s) { return s ? s[0].toUpperCase() + s.slice(1) : ''; }
function personTraits(s, id) { return traitWords(s, id).map((w) => word('traits', w) + ' ' + Math.abs(traitValue(s, id, w))).join(', ') || '—'; }
function first(name) { return String(name || '').split(' ')[0]; }
function nameOf(id) { const c = cardOf(id); return c ? (c.name || c.title) : id; }
function prose(text) {
  const inline = (t) => { const frag = document.createDocumentFragment(); const re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g; let i = 0, m;
    while ((m = re.exec(t))) { if (m.index > i) frag.append(t.slice(i, m.index)); const bold = m[0].startsWith('**'); frag.append(h(bold ? 'b' : 'i', {}, m[0].slice(bold ? 2 : 1, bold ? -2 : -1))); i = m.index + m[0].length; }
    if (i < t.length) frag.append(t.slice(i)); return frag; };
  const out = []; let list = null; let para = [];
  const flush = () => { if (para.length) { out.push(h('p', {}, inline(para.join(' ')))); para = []; } };
  (text || '—').split('\n').forEach((line) => {
    const l = line.trim();
    if (l.startsWith('- ')) { flush(); if (!list) { list = h('ul', { class: 'prose-list' }); out.push(list); } list.append(h('li', {}, inline(l.slice(2)))); return; }
    list = null; if (!l) { flush(); return; }
    if (l.startsWith('**') && l.endsWith('**') && l.indexOf('**', 2) === l.length - 2) { flush(); out.push(h('p', { class: 'prose-head' }, l.slice(2, -2))); return; }
    para.push(l);
  });
  flush(); return out;
}
function placeLabel(s, place) {
  const p = placeName(s, place);
  if (p.key === 'home') return T('home');
  if (p.block) return word('blocks', p.block);
  return p.name;
}
function weeksLabel(n) { return n === 0 ? T('noTime') : n === 1 ? T('oneWeek') : T('nWeeks', { n }); }
function whoLabel(c) {
  const w = whoOf(c);
  if (w === 'self') return T('whoSelf'); if (w === 'anyone') return T('whoAnyone'); if (w === 'self+1') return T('whoPair');
  return T('whoProf', { p: word('professions', w.slice(11)) });
}
// who could go: every person once, free or greyed with the reason (post/spiel/025, Betreiber 11:54)
function doerChips(s, c) {
  const seen = {}; const out = [];
  doersFor(s, c).forEach((d) => d.who.forEach((id) => {
    if (seen[id]) return; seen[id] = 1;
    const p = s.people[id]; const busy = p && p.busy; const noRes = p && p.res < costsOf(c);
    out.push({ id, ok: !!p && !busy && !noRes, why: busy ? T('awayTil', { week: busy.until }) : noRes ? T('noRes') : '' });
  }));
  return out;
}
function whoLine(s, c, big) {
  const chips = doerChips(s, c);
  return h('span', { class: 'who-line' + (big ? ' big' : '') },
    h('span', { class: 'who-label' + (whoOf(c) === 'self' ? ' only' : '') }, whoLabel(c)),
    chips.length ? chips.map((x) => h('span', { class: 'wchip' + (x.ok ? '' : ' off') + (x.id === s.character ? ' me' : ''), title: x.why || '' },
      x.id === s.character ? T('you') : first(nameOf(x.id)), x.why && big ? h('small', {}, ' · ' + x.why) : null))
      : h('span', { class: 'wchip off' }, T('nobodyInTeam', { p: word('professions', whoOf(c).slice(11)) })));
}
function originLabel(s, cond) {
  const p = cond.split(':'); const ch = cardOf(s.character);
  switch (p[0]) {
    case 'always': return '';
    case 'skill': return (has(s.skills, p[1]) ? word('professions', ch.profession) + ' · ' : '') + word('skills', p[1]);
    case 'profession': return word('professions', p[1]);
    case 'trait': return word('traits', p[1]);
    case 'block': return word('blocks', p[1]);
    case 'associate': { const a = s.associates.map((x) => cardOf(x.id)).find((c) => c && c.profession === p[1]); return (a ? first(a.name) + ' · ' : '') + word('professions', p[1]); }
    case 'contact': { const a = s.contacts.map(cardOf).find((c) => c && c.profession === p[1]); return (a ? first(a.name) + ' · ' : '') + word('professions', p[1]); }
    case 'possession': { const c = s.possessions.map(cardOf).find((x) => x && x.type === p[1]); return c ? c.name : word('types', p[1]); }
    case 'status': return T('status') + ' ' + word('blocks', p[1]) + ' ' + p[2];
    case 'flag': return T('earlierChoice');
    case 'month': return T('month') + ' ' + p[1] + '+';
    case 'until': return T('until') + ' ' + T('month').toLowerCase() + ' ' + p[1];
    default: return cond;
  }
}
function costLabel(cost) {
  const parts = [];
  if (cost.money) parts.push('−' + cost.money + ' ' + T('money'));
  if (cost.influence) parts.push('−' + cost.influence + ' ' + T('influence'));
  return parts.join(' · ');
}
// what an option changes, on the front, before choosing (post/spiel/031 item 3: "die Veränderung der Werte ausbauen";
// Betreiber "build" 07.11., 21:46). Flags and follow-ups stay hidden – they are the story's surprise.
function deltaLine(s, o) {
  const out = [];
  const num = (n) => (n > 0 ? '+' + n : '−' + Math.abs(n));
  (o.effects || []).forEach((ef) => {
    const p = String(ef).split(':'); let t = null; let up = true;
    if (p[0] === 'money' || p[0] === 'influence') { const n = parseInt(p[1], 10); if (!n) return; up = n > 0; t = num(n) + ' ' + T(p[0]); }
    else if (p[0] === 'status') { const n = parseInt(p[2], 10); if (!n || p[1] !== s.block) return; up = n > 0; t = num(n) + ' ' + T('status'); }
    else if (p[0] === 'block') { const n = parseInt(p[2], 10); if (!n) return; up = n > 0; t = ((T('values') || {})[p[1]] || word('x', p[1])) + ' ' + num(n); }
    else if (p[0] === 'trait') { up = p[1][0] === '+'; t = (up ? '↑ ' : '↓ ') + word('traits', p[1].slice(1)); }
    else if (p[0] === 'gain' || p[0] === 'lose') { const c = cardOf(p[1]); if (!c) return; up = p[0] === 'gain'; t = (up ? '+ ' : '− ') + (c.name || cardTitle(c)); }
    if (t) out.push(h('span', { class: up ? 'up' : 'down' }, t));
  });
  if (!out.length) return null;
  const parts = []; out.forEach((x, i) => { if (i) parts.push(' · '); parts.push(x); });
  return h('span', { class: 'delta-line' }, o.check ? T('ifSuccess') + ' ' : '', parts);
}
function dots(n, max) { return h('span', { class: 'res-dots', title: T('resource') + ' ' + n + '/' + max }, Array.from({ length: max }, (_, i) => h('i', { class: i < n ? 'on' : '' }))); }

// ---------- pictures ----------
function picture(card, cls) {
  const canvas = h('canvas', { 'data-card': card.id, 'data-kind': card.kind, 'aria-hidden': 'true' });
  let img = null;
  if (card.picture) img = h('img', { src: '../pictures/' + card.picture, alt: '', loading: 'lazy', onError: () => { img.remove(); } });
  return h('div', { class: cls || 'pic' }, canvas, img);
}
function paintPictures(root) {
  (root || app).querySelectorAll('canvas[data-card]').forEach((cv) => { const c = cardOf(cv.dataset.card) || { id: cv.dataset.card, kind: cv.dataset.kind || 'event' }; const box = cv.parentElement.getBoundingClientRect(); if (box.width) drawPicture(cv, c, box.width, box.height); });
}

// ---------- layout ----------
function render() {
  if (!els.main) {
    app.textContent = '';
    els.top = h('div', { class: 'top' }); els.tabs = h('div', { class: 'tabs', role: 'tablist' });
    els.strip = h('div', { class: 'team-strip' }); els.bar = h('div', { class: 'p3-bar' });
    els.main = h('main', { class: 'p2-main' }); els.away = h('div', { class: 'away-banner', role: 'status' });
    els.toast = h('div', { class: 'toast' }); els.layer = h('div');
    app.append(els.top, els.strip, els.bar, els.tabs, els.away, els.main, els.toast, els.layer);
    bindSwipe(els.main);
  }
  const s = G2.state;
  els.top.replaceChildren(...renderTop(s));
  const me = V.screen === 'play' && s.people[s.character] && s.people[s.character].busy;
  els.away.textContent = me ? (me.join ? '' : T('youAwayShort', { place: placeLabel(s, me.place), week: me.until, title: cardTitle(cardOf(me.card)) })) : '';
  els.away.title = me && !me.join ? T('youAway', { place: placeLabel(s, me.place), week: me.until, title: cardTitle(cardOf(me.card)) }) : '';
  els.away.hidden = !me;
  els.tabs.replaceChildren(...(V.screen === 'play' ? TABS.map((t, i) => h('button', { type: 'button', role: 'tab', class: 'tab' + (V.tab === i ? ' on' : ''), 'aria-selected': V.tab === i ? 'true' : 'false', onClick: () => { V.tab = i; render(); } }, T(t === 'team' ? 'tab_people' : 'tab_' + t), t === 'board' && s.board.length ? h('span', { class: 'count' }, s.board.length) : null)) : []));
  els.main.replaceChildren(...[renderMain(s)].flat(Infinity).filter((x) => x != null && x !== false));
  if (V.shownTab !== V.tab || V.shownScreen !== V.screen) { els.main.scrollTop = 0; V.shownTab = V.tab; V.shownScreen = V.screen; }
  els.strip.replaceChildren(...(V.screen === 'play' ? renderStrip(s) : []));
  els.bar.replaceChildren(...renderBar(s));
  els.layer.replaceChildren(...(V.open ? [renderCardView(s)] : []), ...(V.sheet ? [renderSheet(s)] : []));
  requestAnimationFrame(() => paintPictures());
}
function renderTop(s) {
  const menu = h('button', { type: 'button', 'aria-label': T('menu'), title: T('menu'), onClick: () => { V.sheet = { t: 'menu' }; render(); } }, '⋯');
  if (V.screen !== 'play' && V.screen !== 'end') return [h('span', {}, h('b', {}, 'Nowhere'), ' · ' + T('p4')), h('span', {}, V.error || ''), menu];
  const res = h('div', { class: 'res' },
    h('span', {}, T('money') + ' ', h('b', {}, s.money)), h('span', {}, T('influence') + ' ', h('b', {}, s.influence)), h('span', {}, T('status') + ' ', h('b', {}, s.status)));
  return [h('span', {}, h('b', {}, T('week') + ' ' + Math.min(s.week, WEEKS)), ' · ' + T('monthNames')[s.month - 1]), res, menu];
}
// the small bar on top (Betreiber 17:14): the author's state and "next week", both small
function renderBar(s) {
  if (V.screen !== 'play') return [];
  if (V.busy) return [h('span', { class: 'sub' }, T('authorWriting')), AUTHOR.cancel ? h('button', { type: 'button', class: 'btn small', onClick: () => AUTHOR.cancel && AUTHOR.cancel() }, T('aiUseRules')) : h('span')];
  const last = s.authorLog.length ? s.authorLog[s.authorLog.length - 1] : null;
  const bg = typeof bgStatus === 'function' ? bgStatus(s) : null;
  const lastErr = last && last.error ? (last.error === 'aiNoCards' ? T('aiUnreadable') : /^timeout/.test(last.error) ? T('aiSlow') : T('aiMissed')) : '';
  const aiTxt = typeof AI !== 'undefined' && AI.ready ? (bg && !bg.done ? '✦ ' + T('aiWritingWeek', { n: bg.week }) : bg && bg.done && !bg.failed ? '✦ ' + T('aiReadyWeek', { n: bg.week }) : lastErr ? '✦ ' + lastErr : '✦ ' + T('aiOwn')) : T('aiNone');
  const aiBad = typeof AI !== 'undefined' && AI.ready && !!lastErr && !(bg && !bg.done);
  return [h('button', { type: 'button', class: 'author-chip' + (aiBad ? ' bad' : ''), title: last && last.error ? last.error : '', onClick: () => { V.sheet = { t: 'ai' }; render(); } }, aiTxt),
    h('button', { type: 'button', class: 'btn primary small next', onClick: nextWeek }, s.week >= WEEKS ? T('finishYear') : T('nextWeek') + ' ›')];
}
// the team on top of the board: faces, where, until when, resource (Betreiber 17:14)
function renderStrip(s) {
  const m = mateOf(s); const order = (m ? [m] : []).concat(team(s).filter((id) => id !== m));   // the partner left (Betreiber 10.11.)
  return order.map((id) => {
    const c = cardOf(id); const p = s.people[id]; const act = p.busy;
    const img = c && c.picture ? h('img', { src: '../pictures/' + c.picture, alt: '', loading: 'lazy' }) : null;
    return h('button', { type: 'button', class: 'face-chip' + (act ? ' away' : '') + (id === m ? ' mate' : ''), title: (c ? c.name : id) + (act ? ' – ' + (act.join ? T('joinsIn', { week: act.until }) : T('onUntil', { title: cardTitle(cardOf(act.card)), week: act.until })) : ''), onClick: () => { V.tab = 1; render(); } },
      h('span', { class: 'face' }, img || h('span', { class: 'initial' }, first(c ? c.name : id).slice(0, 1))),
      h('span', { class: 'fname' }, id === s.character ? T('you') : first(c ? c.name : id)),
      act ? h('span', { class: 'fweek' }, T('weekShort') + ' ' + act.until) : dots(p.res, RES_CAP));
  });
}
function renderMain(s) {
  if (V.screen === 'loading') return [h('p', { class: 'empty' }, V.error || '…')];
  if (V.screen === 'start') return renderStart();
  if (V.screen === 'end') return renderEnd(s);
  if (TABS[V.tab] === 'team') return renderTeam(s);
  if (TABS[V.tab] === 'story') return renderStory(s);
  return renderBoard(s);
}

// ---------- start ----------
function renderStart() {
  const chars = CARDS.all.filter((c) => c.kind === 'character');
  const story = storyChoice(); const lines = storyLines();
  const g = goalOfTheDay(undefined, story); const gc = g && cardOf(g);
  return [lines.length > 1 ? h('div', { class: 'story-pick' }, h('span', { class: 'goal-k' }, T('storyLine')),
      lines.map((k) => h('button', { type: 'button', class: 'btn' + (k === story ? ' primary' : ''), onClick: () => { storySet(k); render(); } }, word('stacks', k)))) : null,
    gc ? h('div', { class: 'goal' }, h('span', { class: 'goal-k' }, T('goalToday')), h('b', {}, cardTitle(gc)), h('span', { class: 'goal-why' }, cardBack(gc) || '')) : null,
    h('h2', { class: 'section' }, T('whoAreYou'), h('span', { class: 'ver' }, CARDS.version ? T('cardsVersion', { v: CARDS.version }) : '')),
    chars.map((c) => h('button', { type: 'button', class: 'tile char', onClick: () => startAs(c.id) },
      picture(c, 'tile-pic'),
      h('span', { class: 'tile-body' }, h('b', {}, c.name), h('span', { class: 'meta' }, word('professions', c.profession) + ' · ' + word('blocks', c.block) + ' · ' + c.age),
        h('span', { class: 'meta' }, T('associates') + ': ' + c.associates.map((id) => first(nameOf(id))).join(', ')))))];
}
function startAs(id) {
  V.busy = true; V.screen = 'play'; V.tab = 0; render();
  loadCards().then(() => act2Start(id)).then(() => { V.busy = false; if (G2.state.goal) V.sheet = { t: 'goal', start: true }; render(); }, (e) => { V.busy = false; V.error = String(e.message || e); render(); });
}

// ---------- board ----------
function groupKey(s, b) {
  if (b.beat) return '~beat';
  if (b.personal) return '~personal';
  const c = cardOf(b.card); const p = placeOf(c);
  return p === 'own' ? s.block : p;
}
function goalBox(s) {
  const gp = goalProgress(s); if (!gp) return null;
  const pct = Math.max(0, Math.min(100, Math.round(100 * gp.now / gp.target)));
  return h('button', { type: 'button', class: 'goal' + (gp.done ? ' done' : ''), onClick: () => { V.sheet = { t: 'goal' }; render(); } }, h('span', { class: 'goal-k' }, T('goal')), h('b', {}, cardTitle(gp.goal)),
    h('span', { class: 'goal-bar' }, h('span', { style: 'width:' + pct + '%' })), h('span', { class: 'goal-n' }, (gp.done ? '✓ ' : '') + gp.now + ' / ' + gp.target));
}
function goalLine(s, gp) {
  const m = gp.goal.measure; const label = m === 'status' ? T('status') + ' ' + word('blocks', s.block) : T('measure_' + m);
  return label + ': ' + gp.now + ' / ' + gp.target + (gp.done ? ' ✓' : '');
}
function goalHow(s, gp) { const m = gp.flag ? 'flag' : gp.goal.measure; return T('measureHow_' + m); }
function renderBoard(s) {
  if (!s.board.length) return [goalBox(s), h('p', { class: 'empty' }, T('boardEmpty'))];
  const groups = {};
  s.board.forEach((b) => { (groups[groupKey(s, b)] = groups[groupKey(s, b)] || []).push(b); });
  const order = Object.keys(groups).sort((a, b) => {
    const rank = (k) => (k === '~beat' ? -1 : k === '~personal' ? 0 : k === 'home' ? 1 : k === s.block ? 2 : 3);
    return rank(a) - rank(b) || a.localeCompare(b);
  });
  return [goalBox(s)].concat(order.map((k) => {
    const travel = k.startsWith('~') ? 0 : travelWeeks(s, 'home', k);
    return h('section', { class: 'place' },
      h('h2', { class: 'section' }, k === '~beat' ? T('happening') : k === '~personal' ? T('forYou') : placeLabel(s, k), travel ? h('span', { class: 'travel' }, T('travelWeek')) : null),
      groups[k].map((b) => tile(s, b)));
  }));
}
// travel for you, when the card takes time and lies elsewhere (takes 0 is done from where one is – 057)
function travelNote(s, c) {
  if (!takesOf(c)) return '';
  const t = travelWeeks(s, s.people[s.character] ? s.people[s.character].at : 'home', placeOf(c));
  return t ? ' · +' + t + ' ' + T('travelShort') : '';
}
// which thread a card feeds and how far that thread is (Betreiber 12.11., 22:02: "A simple marker to which thread a
// card belongs and the status of the thread as indication to the player.")
function threadTags(s, c, small) {
  const ids = threadsOf(c).filter((id) => threadDef(s, id).question); if (!ids.length) return null;
  const due = new Set(dueThreads(s).map((d) => d.id));
  return h('span', { class: 'thread-tags' + (small ? ' small' : '') }, ids.map((id) => {
    const d = threadDef(s, id); const r = s.threads[id] || { cards: [] };
    const txt = (d.title || id) + ' · ' + r.cards.length + '/' + (d.length || '?') + (small ? '' : ' · ' + T('part_' + partIn(s, c, id)));
    const open = (e) => { e.stopPropagation(); e.preventDefault(); V.sheet = { t: 'thread', id }; render(); };
    return h('span', { class: 'thread-tag' + (due.has(id) ? ' due' : '') + (r.closed ? ' closed' : r.faded ? ' faded' : ''), role: 'button', tabindex: 0, onClick: open }, '🧵 ' + txt);
  }));
}
function tile(s, b) {
  const c = cardOf(b.card); if (!c) return null;
  const left = b.expires != null ? b.expires - s.week + 1 : null;
  const meta = c.kind === 'event' ? [weeksLabel(takesOf(c)) + travelNote(s, c), costsOf(c) ? T('oneResource') : T('noResource')] : [T('kinds')[c.kind] || c.kind];
  return h('button', { type: 'button', class: 'tile', onClick: () => { V.open = b.inst; V.flipped = false; render(); } },
    picture(c, 'tile-pic'),
    h('span', { class: 'tile-body' },
      h('b', {}, c.kind === 'event' ? cardTitle(c) : (c.name || c.title)),
      c.kind === 'event' ? whoLine(s, c) : null,
      threadTags(s, c, true),
      h('span', { class: 'badges' }, h('span', { class: 'meta' }, meta.join(' · ')),
        b.since === s.week ? h('span', { class: 'badge new' }, T('new')) : null,
        b.ai ? h('span', { class: 'badge ai', title: T('byAuthor') }, '✦') : null,
        c.impact ? h('span', { class: 'badge' }, '●'.repeat(c.impact)) : null,
        left != null ? h('span', { class: 'badge' + (left <= 1 ? ' warn' : '') }, left <= 1 ? T('lastWeek') : T('weeksLeft', { n: left })) : null)));
}

// ---------- the open card ----------
function renderCardView(s) {
  const b = s.board.find((x) => x.inst === V.open);
  if (!b) { V.open = null; return h('span'); }
  const c = cardOf(b.card);
  const close = () => { V.open = null; render(); };
  let front, back;
  if (c.kind === 'event') {
    const free = (op) => isPass(c, op.i);
    const opts = optionsFor(s, c); const sorted = opts.filter((o) => !free(o)).concat(opts.filter(free));
    front = [picture(c), h('div', { class: 'title' }, h('h1', {}, cardTitle(c)),
      h('div', { class: 'meta' }, placeLabel(s, placeOf(c)) + ' · ' + weeksLabel(takesOf(c)) + travelNote(s, c) + ' · ' + (costsOf(c) ? T('oneResource') : T('noResource'))), threadTags(s, c, false), whoLine(s, c, true)),
      h('div', { class: 'body' }, sorted.map((op) => {
        const o = c.options[op.i]; const origin = originLabel(s, op.origin); const cost = costLabel(op.cost);
        const doers = free(op) ? [] : doersFor(s, c, op.i); const can = op.ok && (free(op) || doers.some((d) => d.ok));
        const ownTime = o.takes != null || o.costs != null ? h('span', { class: 'opt-time' }, [o.takes != null ? weeksLabel(o.takes) : null, o.costs != null ? (o.costs ? T('oneResource') : T('noResource')) : null].filter(Boolean).join(' · ')) : null;
        const firstOk = doers.find((d) => d.ok) || doers[0];
        return h('button', { type: 'button', class: 'opt', disabled: !can, title: can ? '' : (op.ok ? T('nobodyFree') : T('cannotAfford')),
          onClick: (e) => { e.stopPropagation(); choose(b, op.i); } },
          h('span', { class: 't' }, free(op) ? T('letPass') + ' – ' + optText(o) : optText(o)), ownTime,
          o.check && !free(op) ? (CHECK_FOR = c, checkLine(s, o, firstOk ? firstOk.who : [s.character])) : null,
          deltaLine(s, o),
          h('span', { class: 'why' }, origin, origin && cost ? ' · ' : '', cost ? h('span', { class: 'cost' }, cost) : null, !can && op.ok ? ' · ' + T('nobodyFree') : ''));
      }), recruitOffer(s, c), h('div', { class: 'hint' }, T('tapStory')))];
    back = [h('div', { class: 'title' }, h('h1', {}, cardTitle(c))), h('div', { class: 'body' }, prose(cardBack(c)), feedbackRow(c, toast))];
  } else {
    const isP = c.kind === 'person';
    front = [picture(c), h('div', { class: 'title' }, h('h1', {}, c.name || c.title),
      h('div', { class: 'meta' }, isP ? word('professions', c.profession) + ' · ' + word('blocks', c.block) + ' · ' + c.age : word('types', c.type))),
      h('div', { class: 'body' },
        isP ? h('div', { class: 'chips' }, (c.skills || []).map((x) => h('span', { class: 'chip on' }, word('skills', x))), (c.traits || []).map((x) => h('span', { class: 'chip' }, word('traits', x)))) : null,
        isP ? [h('button', { type: 'button', class: 'opt primary', disabled: s.influence < 1 + (s.associates.length >= MAX_ASSOCIATES ? SWAP_COST : RECRUIT_COST), onClick: (e) => { e.stopPropagation(); if (s.associates.length >= MAX_ASSOCIATES) { V.sheet = { t: 'swap', inst: b.inst }; render(); } else takeSimple(b, 'team'); } },
            h('span', { class: 't' }, T('intoTeamNow')), h('span', { class: 'why' }, s.associates.length >= MAX_ASSOCIATES ? T('teamFullSwap') : h('span', { class: 'cost' }, '−' + (1 + RECRUIT_COST) + ' ' + T('influence') + ' · ' + T('joinsIn', { week: s.week + 1 })))),
          h('button', { type: 'button', class: 'opt', disabled: s.influence < 1, onClick: (e) => { e.stopPropagation(); takeSimple(b, 'contact'); } }, h('span', { class: 't' }, T('keepInTouch')), h('span', { class: 'why' }, h('span', { class: 'cost' }, '−1 ' + T('influence'))))]
          : h('button', { type: 'button', class: 'opt primary', disabled: s.money < 2, onClick: (e) => { e.stopPropagation(); takeSimple(b, 'possession'); } }, h('span', { class: 't' }, T('acquire')), h('span', { class: 'why' }, h('span', { class: 'cost' }, '−2 ' + T('money')))),
        h('button', { type: 'button', class: 'opt', onClick: (e) => { e.stopPropagation(); takeSimple(b, 'pass'); } }, h('span', { class: 't' }, isP ? T('letGo') : T('decline'))))];
    back = [h('div', { class: 'title' }, h('h1', {}, c.name || c.title)), h('div', { class: 'body' }, prose(cardBack(c)), feedbackRow(c, toast))];
  }
  const card = h('div', { class: 'card p2-card' + (V.flipped ? ' flipped' : ''), onClick: (e) => { if (e.target.closest('button, a, textarea')) return; V.flipped = !V.flipped; card.classList.toggle('flipped', V.flipped); } },
    h('div', { class: 'face front' }, front), h('div', { class: 'face back' }, back));
  return h('div', { class: 'overlay', onClick: (e) => { if (e.target === e.currentTarget) close(); } },
    h('button', { type: 'button', class: 'close', 'aria-label': T('close'), onClick: close }, '×'), card);
}
function choose(b, i) {
  const s = G2.state; const c = cardOf(b.card); const o = c.options[i];
  if (isPass(c, i)) { commit(b, i, []); return; }
  const teams = doersFor(s, c);
  const ok = teams.filter((d) => d.ok);
  if (ok.length === 1 && teams.length === 1) { commit(b, i, ok[0].who); return; }
  V.sheet = { t: 'who', inst: b.inst, option: i }; render();
}
function commit(b, i, who, rolled) {
  const s = G2.state; const before = snap(s); const c = cardOf(b.card); const o = c.options[i];
  if (who && who.length && !rolled) {
    const d = doersFor(s, c).find((x) => JSON.stringify(x.who) === JSON.stringify(who));
    if (d && d.weeks >= 4 && !confirm(T('sureAway', { who: who.map((id) => (id === s.character ? T('you') : first(nameOf(id)))).join(' & '), week: s.week + d.weeks }))) return;
  }
  // a check: the die rolls first, in its own sheet; the take follows with what fell (d20, post/spiel/038 item 2)
  if (o.check && !isPass(c, i) && !rolled) {
    if (!optionsFor(s, c).some((x) => x.i === i && x.ok)) { toast(T('cannotAfford')); return; }
    V.open = null; V.sheet = { t: 'roll', inst: b.inst, option: i, who: who.slice(), dice: rollD20x2(), push: null, shown: false };
    render(); setTimeout(() => { if (V.sheet && V.sheet.t === 'roll') { V.sheet.shown = true; render(); } }, 1000);
    return;
  }
  if (!act2Take(b.inst, i, who, rolled)) { toast(T('cannotAfford')); return; }
  V.open = null; V.sheet = null;
  const act = G2.state.activities.find((a) => a.inst === b.inst);
  if (act) toast(T('isGone', { who: who.map((id) => first(nameOf(id))).join(' & '), week: act.until }));
  else { const d = diffText(before, G2.state); toast('“' + optText(o) + '”' + (d ? ' — ' + d : '')); }
  render();
}
function takeSimple(b, as) {
  const c = cardOf(b.card);
  if (!act2Take(b.inst, as)) { toast(T('cannotAfford')); return; }
  V.open = null; toast(as === 'pass' ? T('let', { name: c.name || c.title }) : as === 'team' ? T('recruited', { name: first(c.name), week: G2.state.week + 1 }) : T(as === 'contact' ? 'keptInTouch' : 'acquired', { name: c.name || c.title })); render();
}

// ---------- team ----------
function renderHousehold(s) {
  const ids = s.household || []; if (!ids.length) return [];
  return [h('h2', { class: 'section' }, T('household')), ids.map((id) => {
    const c = cardOf(id); if (!c) return null; const p = s.people[id]; const act = p && p.busy;
    return h('div', { class: 'tile person household' + (act ? ' away' : '') }, picture(c, 'tile-pic small'),
      h('span', { class: 'tile-body' },
        h('b', {}, c.name, h('span', { class: 'you' }, ' · ' + (c.relation === 'mate' ? T('mate') : T('child') + (s.ages[id] != null ? ', ' + T('ageN', { n: s.ages[id] }) : '')))),
        h('span', { class: 'meta' }, (c.profession ? word('professions', c.profession) + ' · ' : '') + (act ? T('onUntil', { title: cardTitle(cardOf(act.card)), week: act.until }) : c.relation === 'mate' ? T('free') : '')),
        h('span', { class: 'chips small' }, Object.entries(s.lv[id] || {}).filter(([, v]) => v > 0).map(([k, v]) => h('span', { class: 'chip on' }, word('skills', k) + ' ' + v)),
          traitWords(s, id).map((w) => h('span', { class: 'chip' }, word('traits', w) + ' ' + Math.abs(traitValue(s, id, w))))),
        p ? h('span', { class: 'tile-row' }, dots(p.res, RES_CAP)) : null));
  })];
}
function renderTeam(s) {
  const mate = mateOf(s);
  const people = team(s).filter((id) => id !== mate).map((id) => {
    const c = cardOf(id); const p = s.people[id]; const act = p.busy;
    return h('div', { class: 'tile person' + (act ? ' away' : '') },
      picture(c, 'tile-pic'),
      h('span', { class: 'tile-body' },
        h('b', {}, c.name, id === s.character ? h('span', { class: 'you' }, ' · ' + T('you')) : null),
        h('span', { class: 'meta' }, word('professions', c.profession) + ' · ' + (act ? T('atPlace', { place: placeLabel(s, act.place) }) : T('atPlace', { place: placeLabel(s, p.at) }))),
        act ? h('span', { class: 'meta away-line' }, act.join ? T('joinsIn', { week: act.until }) : T('onUntil', { title: cardTitle(cardOf(act.card)), week: act.until })) : h('span', { class: 'meta' }, T('free')),
        h('span', { class: 'chips small' }, Object.entries(s.lv[id] || {}).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]).map(([k, v]) => h('span', { class: 'chip on' }, word('skills', k) + ' ' + v)),
          traitWords(s, id).map((w) => h('span', { class: 'chip' }, word('traits', w) + ' ' + Math.abs(traitValue(s, id, w))))),
        h('span', { class: 'tile-row' }, dots(p.res, RES_CAP),
          id !== s.character && !act ? h('button', { type: 'button', class: 'btn small', onClick: () => { if (act2Dismiss(id)) { toast(T('dismissed', { name: first(c.name) })); render(); } } }, T('dismiss')) : null)));
  });
  const seats = MAX_ASSOCIATES - s.associates.length;
  const contactTiles = s.contacts.map((id) => {
    const c = cardOf(id); if (!c) return null;
    const tc = seats <= 0 ? SWAP_COST : RECRUIT_COST;
    const why = s.influence < tc ? T('needInfluence', { n: tc }) : seats <= 0 ? T('teamFullSwap') : '';
    return h('div', { class: 'tile person contact' }, picture(c, 'tile-pic small'),
      h('span', { class: 'tile-body' }, h('b', {}, c.name), h('span', { class: 'meta' }, word('professions', c.profession) + ' ' + profLevel(s, id) + (c.block ? ' · ' + word('blocks', c.block) : '')),
        h('span', { class: 'chips small' }, Object.entries(s.lv[id] || {}).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]).map(([k, v]) => h('span', { class: 'chip on' }, word('skills', k) + ' ' + v)),
          traitWords(s, id).map((w) => h('span', { class: 'chip' }, word('traits', w) + ' ' + Math.abs(traitValue(s, id, w))))),
        c.kind === 'person' ? h('span', { class: 'tile-row' }, h('button', { type: 'button', class: 'btn small', disabled: s.influence < tc, title: why, onClick: () => { if (seats <= 0) { V.sheet = { t: 'swap', contact: id }; render(); return; } if (act2Recruit(id)) { toast(T('recruited', { name: first(c.name), week: G2.state.week + 1 })); render(); } } }, T('recruit', { n: tc })), why ? h('span', { class: 'meta' }, why) : null) : null));
  });
  const list = (label, ids) => ids.length ? [h('h2', { class: 'section' }, label), h('div', { class: 'chips' }, ids.map((id) => h('span', { class: 'chip' }, nameOf(id) + (cardOf(id) && cardOf(id).profession ? ' · ' + word('professions', cardOf(id).profession) : ''))))] : [];
  return [renderHousehold(s), h('h2', { class: 'section' }, T('yourTeam'), h('span', { class: 'travel' }, T('seats', { n: s.associates.length, max: MAX_ASSOCIATES }))), people,
    s.contacts.length ? [h('h2', { class: 'section' }, T('contacts')), h('p', { class: 'sub hint-left' }, T('teamHint', { n: RECRUIT_COST })), contactTiles] : null,
    list(T('possessions'), s.possessions),
    h('h2', { class: 'section' }, T('character')),
    h('div', { class: 'chips' }, s.acquired.map((t) => h('span', { class: 'chip' }, word('traits', t)))),
    h('h2', { class: 'section' }, word('blocks', s.block)),
    h('dl', { class: 'kv' }, ['economic', 'military', 'cultural', 'technological'].map((k) => [h('dt', {}, T('values')[k]), h('dd', { class: 'bar' }, h('span', { class: 'track' }, h('span', { style: 'width:' + (s.blockValues[k] * 10) + '%' })), h('b', {}, s.blockValues[k]))]))];
}
function renderStory(s) {
  const toggle = h('div', { class: 'seg' }, ['weeks', 'threads'].map((k) => h('button', { type: 'button', class: 'btn small' + ((V.storyView || 'weeks') === k ? ' primary' : ''), onClick: () => { V.storyView = k; render(); } }, T('view_' + k))));
  if (V.storyView === 'threads') return [toggle].concat(renderWeave(s));
  if (!s.history.length) return [toggle, h('p', { class: 'empty' }, T('nothingYet'))];
  return [toggle, h('h2', { class: 'section' }, T('storySoFar')), s.history.slice().reverse().map((x) => h('p', { class: 'story-line' },
    h('span', { class: 'wk' }, T('weekShort') + ' ' + x.week), ' ', x.card ? h('b', {}, cardTitle(cardOf(x.card)) || nameOf(x.card)) : null, x.card ? ' — ' : '', (LANG === 'de' && x.text_de) || x.text,
    x.who && x.who.length && !(x.who.length === 1 && x.who[0] === s.character) ? h('span', { class: 'meta' }, ' (' + x.who.map((id) => first(nameOf(id))).join(' & ') + ')') : null,
    historyNotes(s, x).length ? h('span', { class: 'story-notes' }, historyNotes(s, x).join(' · ')) : null))];
}
function renderEnd(s) {
  const ch = cardOf(s.character);
  const gp = goalProgress(s);
  return [h('div', { class: 'endcard' }, h('h1', {}, T('decemberEnds') + (s.year > 1 ? ' · ' + T('yearN', { n: s.year }) : '')), h('p', {}, ch.name + ' · ' + T('cardsPlayed', { n: s.history.length })),
    gp ? h('p', { class: 'goal-end' + (gp.done ? ' done' : '') }, (gp.done ? '✓ ' + T('goalReached') : '✗ ' + T('goalMissed')) + ': ' + cardTitle(gp.goal) + ' (' + gp.now + ' / ' + gp.target + ')') : null,
    h('p', {}, cap(T('money')) + ' ' + s.money + ' · ' + T('influence') + ' ' + s.influence + ' · ' + T('status') + ' ' + s.status),
    h('p', {}, T('traits') + ': ' + personTraits(s, s.character)),
    h('h2', { class: 'section' }, T('nextYearTitle', { n: s.year + 1 })),
    h('div', { class: 'story-pick' }, storyLines().map((k) => h('button', { type: 'button', class: 'btn' + (k === (V.nextStory || storyChoice()) ? ' primary' : ''), onClick: () => { V.nextStory = k; storySet(k); render(); } }, word('stacks', k)))),
    h('div', { class: 'row' }, h('button', { type: 'button', class: 'btn', onClick: exportLog }, T('saveStory')), h('button', { type: 'button', class: 'btn', onClick: newGame }, T('newGame')),
      h('button', { type: 'button', class: 'btn primary', onClick: nextYear }, T('nextYear'))))].concat(renderStory(s));
}
function nextYear() {
  V.busy = true; render();
  act2NextYear(V.nextStory || storyChoice()).then(() => { V.busy = false; V.screen = 'play'; V.tab = 0; V.nextStory = null; if (G2.state.goal) V.sheet = { t: 'goal', start: true }; render(); },
    (e) => { V.busy = false; V.error = String(e.message || e); render(); });
}

// ---------- the weave: one line per thread, the cards taken as knots, a card in two threads ties the lines (036 item 5) ----------
function svgEl(tag, attrs, ...kids) {
  const e = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.entries(attrs || {}).forEach(([k, v]) => { if (k.startsWith('on')) e.addEventListener(k.slice(2).toLowerCase(), v); else if (v != null) e.setAttribute(k, v); });
  kids.flat(Infinity).forEach((k) => { if (k != null && k !== false) e.append(k.nodeType ? k : document.createTextNode(String(k))); });
  return e;
}
function weaveData(s) {
  const ids = Object.keys(s.threads).filter((id) => s.threads[id].cards.length || s.threads[id].faded || s.threads[id].closed)
    .sort((a, b) => (s.threads[a].opened || 0) - (s.threads[b].opened || 0));
  const weekOf = {}; const textOf = {};
  s.history.forEach((x) => { if (x.card && cardOf(x.card) && cardOf(x.card).kind === 'event' && weekOf[x.card] == null) { weekOf[x.card] = x.week; textOf[x.card] = (LANG === 'de' && x.text_de) || x.text; } });
  return { ids, weekOf, textOf };
}
function renderWeave(s) {
  const { ids, weekOf, textOf } = weaveData(s);
  if (!ids.length) return [h('p', { class: 'empty' }, T('noThreads'))];
  const X = (w) => 16 + (Math.max(1, Math.min(52, w)) - 1) * 11, ROW = 44, TOP = 22, W = X(52) + 16, H = TOP + ids.length * ROW;
  const rowY = (i) => TOP + i * ROW + 22;
  const parts = [];
  // month ticks
  for (let m = 1; m <= 12; m++) { const x = X((m - 1) * 52 / 12 + 1); parts.push(svgEl('line', { x1: x, y1: 12, x2: x, y2: H, class: 'wv-tick' }), svgEl('text', { x: x + 2, y: 11, class: 'wv-month' }, monthShort(m))); }
  const knots = {};
  ids.forEach((id, i) => {
    const r = s.threads[id]; const d = threadDef(s, id); const y = rowY(i);
    const ws = r.cards.map((cid) => weekOf[cid]).filter((w) => w != null);
    const x0 = X(r.opened || (ws.length ? Math.min(...ws) : 1)); const x1 = X(r.closed || r.faded || (ws.length ? Math.max(...ws) : r.opened || 1));
    parts.push(svgEl('text', { x: x0, y: y - 9, class: 'wv-title' }, d.title || id));
    parts.push(svgEl('line', { x1: x0, y1: y, x2: Math.max(x1, x0 + 4), y2: y, class: 'wv-line' + (r.closed ? ' closed' : r.faded ? ' faded' : '') }));
    r.cards.forEach((cid) => { if (weekOf[cid] == null) return; (knots[cid] = knots[cid] || []).push({ y, x: X(weekOf[cid]), part: partIn(s, cardOf(cid), id) }); });
    if (r.closed) parts.push(svgEl('text', { x: X(r.closed) + 6, y: y + 4, class: 'wv-end' }, '✓'));
    else if (r.faded) parts.push(svgEl('text', { x: X(r.faded) + 6, y: y + 4, class: 'wv-end faded' }, '…'));
  });
  Object.entries(knots).forEach(([cid, ks]) => {
    if (ks.length > 1) parts.push(svgEl('line', { x1: ks[0].x, y1: Math.min(...ks.map((k) => k.y)), x2: ks[0].x, y2: Math.max(...ks.map((k) => k.y)), class: 'wv-cross' }));
    ks.forEach((k) => parts.push(svgEl('circle', { cx: k.x, cy: k.y, r: V.weaveSel === cid ? 8 : 6, class: 'wv-knot ' + k.part + (V.weaveSel === cid ? ' sel' : ''), tabindex: 0, role: 'button',
      onClick: () => { V.weaveSel = V.weaveSel === cid ? null : cid; render(); } }, svgEl('title', {}, cardTitle(cardOf(cid))))));
  });
  const sel = V.weaveSel && cardOf(V.weaveSel);
  return [h('div', { class: 'weave' }, svgEl('svg', { width: W, height: H, viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': T('view_threads') }, parts)),
    sel ? h('p', { class: 'weave-sel' }, h('span', { class: 'wk' }, T('weekShort') + ' ' + weekOf[V.weaveSel]), ' ', h('b', {}, cardTitle(sel)), ' — ', textOf[V.weaveSel] || '') : h('p', { class: 'sub' }, T('weaveHint')),
    h('div', { class: 'weave-legend' }, ids.map((id) => { const r = s.threads[id]; const d = threadDef(s, id);
      const due = dueThreads(s).some((x) => x.id === id);
      return h('p', { role: 'button', onClick: () => { V.sheet = { t: 'thread', id }; render(); } }, h('b', {}, d.title || id), ' – ', d.question || '', h('span', { class: 'meta' }, ' · ' + r.cards.length + '/' + (d.length || '?') + ' · ' + (r.closed ? T('thrClosed') : r.faded ? T('thrFaded') : due ? T('thrDue') : r.entered ? T('thrOpen', { n: r.cards.length }) : T('thrMet')))); }))];
}
function monthShort(m) { const n = T('monthNames'); return Array.isArray(n) && n[m - 1] ? n[m - 1].slice(0, 3) : String(m); }

// ---------- sheets ----------
function renderSheet(s) {
  const close = () => { V.sheet = null; render(); };
  let box;
  if (V.sheet.t === 'week') return renderWeekReport(s, V.sheet.rep);
  if (V.sheet.t === 'thread') {
    // the thread explains itself: its question, how it can end, how far it is, the cards taken (059 item 2)
    const id = V.sheet.id; const d = threadDef(s, id); const r = s.threads[id] || { cards: [] };
    const due = dueThreads(s).some((x) => x.id === id);
    const state = r.closed ? T('thrClosedIn', { week: r.closed }) + (r.ending ? ' – ' + T('thrEndedWith', { ending: r.ending }) : '') : r.faded ? T('thrFaded') : due ? T('thrDue') : r.entered ? T('thrOpen', { n: r.cards.length }) : T('thrMet');
    return h('div', { class: 'sheet', onClick: (e) => { if (e.target === e.currentTarget) close(); } }, h('div', { class: 'box' },
      h('p', { class: 'sub' }, T('threadWord')), h('h2', {}, d.title || id), h('p', { class: 'thr-q' }, d.question || ''),
      h('p', { class: 'goal-line' }, r.cards.length + ' / ' + (d.length || '?') + ' · ' + state),
      d.endings && d.endings.length ? [h('p', { class: 'sub' }, T('thrEndings')), h('ul', { class: 'thr-endings' }, d.endings.map((x) => h('li', {}, x)))] : null,
      r.cards.length ? [h('p', { class: 'sub' }, T('thrTaken')), h('ul', {}, r.cards.map((cid) => h('li', {}, cardTitle(cardOf(cid)) || cid)))] : null,
      h('button', { type: 'button', class: 'btn primary', onClick: close }, T('close'))));
  }
  if (V.sheet.t === 'swap') {
    // the team is full: let one go and take the new one in, in one step; the one who goes becomes a contact (041)
    const S = V.sheet; const b = S.inst && s.board.find((x) => x.inst === S.inst);
    const newId = S.contact || (b && b.card); const nc = cardOf(newId);
    const swap = (out) => {
      const cost = S.contact ? SWAP_COST : 1 + SWAP_COST;
      if (G2.state.influence < cost) { toast(T('cannotAfford')); return; }
      if (!act2Dismiss(out)) { toast(T('isAway')); return; }
      const ok = S.contact ? act2Recruit(S.contact, true) : act2Take(S.inst, 'team', null, 'swap');
      V.sheet = null; V.open = null;
      toast(ok ? T('swapped', { out: first(nameOf(out)), name: first(nc ? nc.name : newId), week: G2.state.week + 1 }) : T('cannotAfford')); render();
    };
    box = [h('h2', {}, T('swapTitle', { name: nc ? nc.name : newId })), h('p', { class: 'swap-cost' }, T('swapCost', { n: S.contact ? SWAP_COST : 1 + SWAP_COST, have: s.influence })), h('p', { class: 'sub' }, T('swapHint')),
      s.associates.map((a) => { const p = s.people[a.id]; const busy = p && p.busy;
        return h('button', { type: 'button', class: 'btn who', disabled: !!busy, onClick: () => swap(a.id) }, h('b', {}, T('letGoName', { name: nameOf(a.id) })),
          h('span', { class: 'meta' }, busy ? T('isAway') : word('professions', profOf(a.id)) + ' ' + profLevel(s, a.id))); }),
      h('button', { type: 'button', class: 'btn small', onClick: close }, T('cancel'))];
    return h('div', { class: 'sheet', onClick: (e) => { if (e.target === e.currentTarget) close(); } }, h('div', { class: 'box' }, box));
  }
  if (V.sheet.t === 'roll') {
    // the die: a second of rolling, then the line – roll, modifier, outcome, who rolled; push once for one energy
    const R = V.sheet; const b = s.board.find((x) => x.inst === R.inst); const c = b && cardOf(b.card); const o = c && c.options[R.option];
    if (!o) { V.sheet = null; return null; }
    const r = d20Result(s, c, o, R.who, R.push || R.dice); const p = r.parts;
    const by = p.who === s.character ? T('you') : first(nameOf(p.who));
    const go = () => { const roll = { dice: R.dice, push: R.push }; V.sheet = null; commit(b, R.option, R.who, roll); };
    const push = () => { R.push = rollD20x2(); R.shown = false; render(); setTimeout(() => { if (V.sheet === R) { R.shown = true; render(); } }, 1000); };
    const die = R.shown ? String(r.nat) : '?';
    box = [h('p', { class: 'sub' }, cardTitle(c)), h('p', {}, optText(o)),
      h('div', { class: 'd20' + (R.shown ? ' shown out-' + r.outcome : ' rolling') }, h('span', { class: 'face' }, die),
        (p.adv || p.dis) && R.shown ? h('span', { class: 'other' }, (p.adv ? T('advantage') : T('disadvantage')) + ': ' + (R.push || R.dice).join(' / ')) : null),
      h('p', { class: 'roll-line' }, 'd20' + (R.shown ? ' ' + r.nat : '') + ' + ' + p.mod + (R.shown ? ' = ' + r.total : '') + ' ' + T('vs') + ' ' + p.dc + ' · ' + by),
      h('p', { class: 'roll-parts sub' }, modText(p)),
      R.shown ? h('p', { class: 'roll-out' }, T('out_' + r.outcome) + (r.fumble ? ' – ' + T('fumble') : '')) : null,
      R.shown ? h('div', { class: 'row' },
        !R.push && canPush(s, c, r) ? h('button', { type: 'button', class: 'btn', onClick: push }, T('pushRoll', { who: by })) : null,
        h('button', { type: 'button', class: 'btn primary', onClick: go }, T('rollGo'))) : null];
    return h('div', { class: 'sheet' }, h('div', { class: 'box' }, box));
  }
  if (V.sheet.t === 'goal') {
    // the goal explains itself: its back, the number and where it comes from (post/spiel/033 item 2)
    const gp = goalProgress(s);
    box = gp ? [V.sheet.start ? h('p', { class: 'sub' }, T('goalThisYear')) : null, h('h2', {}, cardTitle(gp.goal)),
      h('p', {}, cardBack(gp.goal) || ''),
      h('p', { class: 'goal-line' }, gp.flag ? (gp.done ? '✓ ' + T('goalDone') : T('goalNotYet')) : goalLine(s, gp)),
      h('p', { class: 'sub' }, goalHow(s, gp)),
      h('button', { type: 'button', class: 'btn primary', onClick: close }, V.sheet.start ? T('goalGo') : T('close'))] : [h('button', { type: 'button', class: 'btn', onClick: close }, T('close'))];
  } else if (V.sheet.t === 'who') {
    const b = s.board.find((x) => x.inst === V.sheet.inst); const c = cardOf(b.card); const o = c.options[V.sheet.option];
    // the skills that matter for this card, per person, and the best chance marked (post/spiel/040; Betreiber 20:17)
    const teams = doersFor(s, c, V.sheet.option);
    CHECK_FOR = c; const odds = teams.map((d) => (d.ok && o && o.check ? checkOdds(s, o, d.who, c) : null)); CHECK_FOR = null;
    const bestI = odds.reduce((bi, od, i) => (od && (bi < 0 || od.success > odds[bi].success) ? i : bi), -1);
    box = [h('h2', {}, T('whoGoes')), h('p', { class: 'sub' }, cardTitle(c) + ' · ' + placeLabel(s, placeOf(c))),
      teams.map((d, di) => h('button', { type: 'button', class: 'btn who' + (di === bestI && teams.length > 1 ? ' best' : ''), disabled: !d.ok, onClick: () => { const bb = b; const i = V.sheet.option; V.sheet = null; commit(bb, i, d.who); } },
        h('b', {}, d.who.map((id) => first(nameOf(id))).join(' & '), di === bestI && teams.length > 1 ? h('span', { class: 'best-mark' }, ' ★ ' + T('bestChance')) : null),
        h('span', { class: 'who-skills' }, whoSkills(s, c, o, d.who)),
        h('span', { class: 'meta' }, d.ok ? (d.weeks ? T('backIn', { week: s.week + d.weeks }) + (d.travel ? ' · +' + d.travel + ' ' + T('travelShort') : '') : T('rightNow')) : d.busy ? T('isAway') : T('noResourceLeft')),
        c.options[V.sheet.option] && c.options[V.sheet.option].check ? checkLine(s, c.options[V.sheet.option], d.who) : null)),
      h('button', { type: 'button', class: 'btn small', onClick: close }, T('cancel'))];
  } else if (V.sheet.t === 'ai') {
    box = renderAiSheet(close);
  } else {
    const langBtn = (l, label) => h('button', { type: 'button', class: 'btn small' + (LANG === l ? ' primary' : ''), onClick: () => { langSet(l); V.sheet = null; render(); } }, label);
    box = [h('h2', {}, 'Nowhere · ' + T('p4')),
      h('p', { class: 'sub' }, T('aboutP2', { n: CARDS.all.length, author: G2.state.author === 'rules' ? T('authorRules') : G2.state.author })),
      h('div', { class: 'row left' }, h('span', { class: 'sub' }, T('language') + ':'), langBtn('en', 'English'), langBtn('de', 'Deutsch')),
      h('button', { type: 'button', class: 'btn', onClick: () => { V.sheet = { t: 'ai' }; render(); } }, '✦ ' + T('aiTitle') + (AI.ready ? ' · ' + T('aiConnected') : '')),
      V.screen !== 'start' ? h('button', { type: 'button', class: 'btn', onClick: () => { exportLog(); close(); } }, T('saveLog')) : null,
      h('button', { type: 'button', class: 'btn', onClick: () => importLog(close) }, T('loadLog')),
      V.screen !== 'start' ? h('button', { type: 'button', class: 'btn', onClick: () => { if (confirm(T('confirmNew'))) newGame(); close(); } }, T('newGame')) : null,
      h('a', { class: 'btn', href: '../' }, T('toHub')),
      h('a', { class: 'btn', href: '../p1/' }, T('toP1')),
      h('button', { type: 'button', class: 'btn small', onClick: close }, T('close'))];
  }
  return h('div', { class: 'sheet', onClick: (e) => { if (e.target === e.currentTarget) close(); } }, h('div', { class: 'box' }, box));
}

// ---------- actions ----------
// what happened while the week turned: one card per thing that came back, then the totals (Betreiber 09.11., 22:12:
// "Ich möchte die On Return Meldung bestätigen und ich möchte die größer und strukturierter … Mach die im Karten-Stil")
function weekReport(before, ending, s) {
  const fresh = s.history.slice(before.hist);
  const used = new Set();
  const items = ending.filter((a) => a.card).map((a) => {
    const i = fresh.findIndex((x, k) => !used.has(k) && x.card === a.card); if (i >= 0) used.add(i);
    const x = i >= 0 ? fresh[i] : {};
    return { card: a.card, who: a.who.slice(), place: a.place, text: (LANG === 'de' && x.text_de) || x.text || '', check: x.check || null,
      notes: historyNotes(s, Object.assign({}, x, { check: null })) };
  });
  const notes = [];
  fresh.forEach((x, k) => { if (used.has(k)) return; if (x.income) { notes.unshift((LANG === 'de' && x.text_de) || x.text); return; } if (!x.card) return; if (x.rise || x.changes) notes.push(...historyNotes(s, Object.assign({}, x, { check: null }))); else if (x.text && !cardOf(x.card)?.options) notes.push(first(nameOf(x.card)) + ': ' + ((LANG === 'de' && x.text_de) || x.text)); });
  if (AUTHOR.error) notes.push(T('aiFellBack') + (/^timeout/.test(AUTHOR.error) ? T('aiSlow') : AUTHOR.error));
  const totals = [];
  ['money', 'influence', 'status'].forEach((k) => { const v = s[k] - before[k]; if (v) totals.push({ k, v }); });
  return { week: s.week, month: s.month, items, totals, notes };
}
function renderWeekReport(s, R) {
  const done = () => { V.sheet = null; render(); };
  const signed = (v) => (v > 0 ? '+' : '−') + Math.abs(v);
  return h('div', { class: 'sheet' }, h('div', { class: 'box report' },
    h('h2', {}, T('weekStarts', { n: R.week })),
    R.totals.length ? h('div', { class: 'rep-totals' }, R.totals.map((t) => h('span', { class: 'rep-total ' + (t.v > 0 ? 'up' : 'down') }, h('b', {}, signed(t.v)), ' ' + T(t.k)))) : null,
    R.items.map((it) => { const c = cardOf(it.card); const ck = it.check;
      return h('div', { class: 'rep-card' }, picture(c, 'rep-pic'),
        h('div', { class: 'rep-body' },
          h('span', { class: 'rep-who' }, it.who.map((id) => (id === s.character ? T('you') : first(nameOf(id)))).join(' & ') + (it.place && it.place !== 'home' ? ' · ' + T('backFrom', { place: placeLabel(s, it.place) }) : '')),
          h('b', {}, cardTitle(c)),
          it.text ? h('span', { class: 'rep-choice' }, '„' + it.text + '“') : null,
          ck ? h('span', { class: 'rep-check out-' + ck.outcome }, '🎲 ' + ck.roll + ' + ' + ck.mod + ' = ' + (ck.roll + ck.mod) + ' ' + T('vs') + ' ' + ck.dc + ' → ' + T('out_' + ck.outcome)) : null,
          it.notes.map((n) => h('span', { class: 'rep-note' }, n)))); }),
    R.notes.length ? h('div', { class: 'rep-notes' }, R.notes.map((n) => h('p', {}, n))) : null,
    h('button', { type: 'button', class: 'btn primary rep-ok', onClick: done }, T('rollGo'))));
}
function snap(s) { return { money: s.money, influence: s.influence, status: s.status, traits: s.traits.slice(), hist: s.history.length }; }
function diffText(a, s) {
  const out = [];
  const d = (k) => { const v = s[k] - a[k]; if (v) out.push((v > 0 ? '+' : '') + v + ' ' + T(k)); };
  d('money'); d('influence'); d('status');
  s.history.slice(a.hist).forEach((x) => out.push(...historyNotes(s, x)));
  return out.join(' · ');
}
// a check, a trait moved, a skill learned – in words
function checkText(c) {
  if (!c) return '';
  return '🎲 ' + word('skills', c.skill) + ': d20 ' + c.roll + ' + ' + c.mod + ' = ' + (c.roll + c.mod) + ' ' + T('vs') + ' ' + c.dc + ' → ' + T('out_' + c.outcome) +
    (c.pushed ? ' (' + T('pushedFrom', { out: T('out_' + c.pushed.first) }) + ')' : '');
}
function historyNotes(s, x) {
  const out = [];
  if (x.check) out.push(checkText(x.check));
  if (x.rise) out.push(T('learned', { who: x.card === s.character ? T('you') : first(nameOf(x.card)), skill: x.rise.skill.startsWith('profession:') ? word('professions', x.rise.skill.slice(11)) : word('skills', x.rise.skill), from: x.rise.from, to: x.rise.to }));
  (x.changes || []).forEach((ch) => {
    const who = ch.id === s.character ? T('you') : first(nameOf(ch.id));
    if (ch.full) out.push(T('noRoom', { who, t: word('traits', ch.full) }));
    else out.push(who + ': ' + axisText(ch.from) + ' → ' + axisText(ch.to));
  });
  return out;
}
function axisText(t) { if (t === '0') return '0'; const p = t.split(' '); return word('traits', p[0]) + ' ' + p[1]; }
function oddsWord(p) { return p >= 0.67 ? T('oddsLikely') : p >= 0.34 ? T('oddsEven') : T('oddsLong'); }
function checkLine(s, o, who) {
  const od = checkOdds(s, o, who, CHECK_FOR); if (!od) return null;
  const p = od.parts; const by = p.who === s.character ? T('you') : first(nameOf(p.who));
  return h('span', { class: 'check-line' }, '🎲 ' + word('skills', p.skill) + ': d20 + ' + p.mod + ' ' + T('vs') + ' ' + p.dc + ' · ' + Math.round(100 * od.success) + ' %' +
    (p.adv ? ' · ' + T('advantage') : p.dis ? ' · ' + T('disadvantage') : '') + ' (' + by + ')');
}
let CHECK_FOR = null;   // the card whose check line is drawn (profession bonus)
function modText(p) {
  const bits = [T('level') + ' ' + p.lv];
  if (p.trait) bits.push(word('traits', p.trait) + ' ' + (p.axis >= 0 ? '+' : '−') + Math.abs(p.axis));
  if (p.help) bits.push(T('help') + ' +2');
  if (p.prof) bits.push(T('profession') + ' +' + p.prof);
  return word('skills', p.skill) + ': ' + bits.join(' · ');
}
// per person: the checked skill with its level and the check's trait with its value; on a card without a check the
// skills, professions and traits from the options' origins the person has (post/spiel/040)
function whoSkills(s, c, o, who) {
  return who.map((id) => {
    const bits = [];
    if (o && o.check) {
      bits.push(word('skills', o.check.skill) + ' ' + levelOf(s, id, o.check.skill));
      if (o.check.trait) { const v = traitValue(s, id, o.check.trait); bits.push(word('traits', o.check.trait) + ' ' + (v >= 0 ? '+' : '−') + Math.abs(v)); }
      const pb = profBonus(s, c, id); if (pb) bits.push(word('professions', profOf(id)) + ' +' + pb);
    } else {
      const seen = new Set();
      c.options.forEach((x) => {
        const p = String(x.origin || '').split(':'); const k = p[0] + ':' + p[1]; if (seen.has(k)) return; seen.add(k);
        if (p[0] === 'skill' && levelOf(s, id, p[1]) >= 1) bits.push(word('skills', p[1]) + ' ' + levelOf(s, id, p[1]));
        if (p[0] === 'profession' && profOf(id) === p[1]) bits.push(word('professions', p[1]) + ' ' + profLevel(s, id));
        if (p[0] === 'trait' && traitValue(s, id, p[1]) >= 1) bits.push(word('traits', p[1]) + ' ' + traitValue(s, id, p[1]));
      });
      if (!bits.length && profOf(id)) bits.push(word('professions', profOf(id)) + ' ' + profLevel(s, id));
    }
    return h('span', { class: 'who-line' }, (who.length > 1 ? first(nameOf(id)) + ': ' : '') + (bits.join(' · ') || '–'));
  });
}
// the background author has finished: show it in the bar (042)
function onAuthorReady() { if (V.screen === 'play' && !V.sheet) render(); }
// "Take <name> into the team – 2 influence" right on a card that needs a profession only a contact has (Betreiber 17:10)
function recruitOffer(s, c) {
  const w = whoOf(c); if (!w.startsWith('profession:')) return null;
  const prof = w.slice(11);
  if (s.associates.some((a) => { const p = cardOf(a.id); return p && p.profession === prof; })) return null;
  const cand = s.contacts.map(cardOf).filter((p) => p && p.kind === 'person' && p.profession === prof);
  if (!cand.length) return null;
  const full = s.associates.length >= MAX_ASSOCIATES, poor = s.influence < (full ? SWAP_COST : RECRUIT_COST);
  return cand.slice(0, 2).map((p) => h('button', { type: 'button', class: 'opt recruit', disabled: poor, onClick: (e) => { e.stopPropagation(); if (full) { V.sheet = { t: 'swap', contact: p.id }; render(); return; } if (act2Recruit(p.id)) { toast(T('recruited', { name: first(p.name), week: G2.state.week + 1 })); render(); } } },
    h('span', { class: 't' }, T('takeIntoTeam', { name: p.name })), h('span', { class: 'why' }, full ? T('teamFullSwap') : h('span', { class: 'cost' }, '−' + RECRUIT_COST + ' ' + T('influence') + ' · ' + T('joinsIn', { week: s.week + 1 })))));
}
function nextWeek() {
  if (V.busy) return;
  const s = G2.state; const before = snap(s); const ending = s.activities.filter((a) => a.until <= s.week + 1);
  V.busy = true; render();
  act2Next().then(() => {
    V.busy = false;
    if (G2.state.ended) { V.screen = 'end'; render(); return; }
    const rep = weekReport(before, ending, G2.state);
    if (rep.items.length || rep.totals.length || rep.notes.length) V.sheet = { t: 'week', rep };
    else toast(T('weekStarts', { n: G2.state.week }));
    render();
  }, () => { V.busy = false; render(); });
}
function newGame() { game2Reset(); V.screen = 'start'; V.tab = 0; V.open = null; loadCards().then(render, render); }
function loadCards() {
  return fetch('../cards.json', { cache: 'no-cache' }).then((r) => { if (!r.ok) throw new Error('cards.json ' + r.status); return r.json(); }).then((data) => { cardsLoad(data); return data; });
}
function exportLog() {
  const blob = new Blob([game2Export()], { type: 'application/json' });
  const a = h('a', { href: URL.createObjectURL(blob), download: 'nowhere-p2-' + (G2.state.game || 'game') + '.json' }); document.body.append(a); a.click(); a.remove();
  toast(T('saved'));
}
function importLog(done) {
  const inp = h('input', { type: 'file', accept: 'application/json,.json' });
  inp.addEventListener('change', () => {
    const f = inp.files[0]; if (!f) return;
    f.text().then((t) => { game2Import(t); V.screen = G2.state.ended ? 'end' : G2.state.character ? 'play' : 'start'; render(); toast(T('loaded')); })
      .catch((e) => toast(T('couldNotLoad') + e.message)).then(done);
  });
  inp.click();
}
let toastTimer = 0;
function toast(text) { els.toast.textContent = text; els.toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => els.toast.classList.remove('show'), 3200); }

// ---------- swipe and keys ----------
function bindSwipe(el) {
  let x0 = null, y0 = null;
  el.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  el.addEventListener('touchend', (e) => {
    if (x0 == null || V.screen !== 'play') return; const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    V.tab = Math.max(0, Math.min(TABS.length - 1, V.tab + (dx < 0 ? 1 : -1))); render();
  }, { passive: true });
}
document.addEventListener('keydown', (e) => {
  if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
  if (e.key === 'Escape') { if (V.sheet) V.sheet = null; else if (V.open) V.open = null; render(); return; }
  if (V.sheet || V.screen !== 'play' || e.metaKey || e.ctrlKey || e.altKey) return;
  if (V.open) {
    if (e.key === 'f') { V.flipped = !V.flipped; const c = app.querySelector('.p2-card'); if (c) c.classList.toggle('flipped', V.flipped); }
    if (/^[1-5]$/.test(e.key)) { const b = app.querySelectorAll('.p2-card .front .opt:not([disabled])')[Number(e.key) - 1]; if (b) b.click(); }
    return;
  }
  if (e.key === 'ArrowLeft') { V.tab = Math.max(0, V.tab - 1); render(); }
  if (e.key === 'ArrowRight') { V.tab = Math.min(TABS.length - 1, V.tab + 1); render(); }
  if (e.key === 'n') nextWeek();
});
window.addEventListener('resize', () => paintPictures());

// ---------- start ----------
langLoad();
if ('serviceWorker' in navigator) { navigator.serviceWorker.register('../sw.js').catch(() => { /* offline later */ }); }
Promise.resolve(typeof aiInit === 'function' ? aiInit().catch(() => {}) : null).then(() => loadCards()).then(() => {
  if (AI.notice) setTimeout(() => toast(T(AI.notice) + (AI.error ? ': ' + AI.error : '')), 400);
  if (AI.notice === 'orConnected') V.sheet = { t: 'ai' };
  game2Load();
  const s = G2.state;
  V.screen = s.ended ? 'end' : s.character ? 'play' : 'start';
  render();
}).catch((e) => { V.error = T('couldNotLoad') + e.message; V.screen = 'loading'; render(); });

// ---------- your own AI (bring your own, as in KOMPASS) ----------
function renderAiSheet(close) {
  const c = AI.cfg; const p = aiPreset(); const u = V.ai;
  const pick = (pr) => { c.preset = pr.id; c.url = pr.url === 'gemini' ? 'gemini' : pr.url; c.model = pr.model; u.msg = ''; u.err = ''; aiCfgSave(); AI.ready = aiConfigured(); if (pr.id === 'openrouter' && AI.key && !AI.models) aiOpenRouterModels().then(render); render(); };
  const test = () => { u.testing = true; u.msg = ''; u.err = ''; render();
    aiTest().then((t) => { u.msg = '✓ ' + t; }, (e) => { u.err = aiErrorText(e); }).then(() => { u.testing = false; AI.ready = aiConfigured(); render(); }); };
  const status = [u.testing ? h('p', { class: 'sub' }, T('aiTesting')) : null, u.msg ? h('p', { class: 'ai-ok' }, u.msg) : null, u.err ? h('p', { class: 'ai-err' }, u.err) : null];
  // "Autor testen": one real author call with the state of the running game – after every deploy, before playing (065)
  const authorTest = () => {
    if (!G2.state || !G2.state.character) { u.atest = { ok: false, error: T('aiTestNeedsGame') }; render(); return; }
    u.atesting = true; u.atest = null; render();
    aiAuthorTest(G2.state).then((r) => { u.atest = r; }, (e) => { u.atest = { ok: false, error: aiErrorText(e) }; }).then(() => { u.atesting = false; render(); });
  };
  const at = u.atest;
  const atestBox = AI.ready ? [h('div', { class: 'row left' }, h('button', { type: 'button', class: 'btn small', disabled: !!u.atesting, onClick: authorTest }, u.atesting ? T('aiAuthorTesting') : T('aiAuthorTest'))),
    at ? h('div', { class: 'ai-atest ' + (at.ok ? 'ok' : 'bad') },
      h('b', {}, at.ok ? '✓ ' + T('aiAuthorTestOk', { n: at.cards }) : '✗ ' + (at.error || T('aiNoCards'))),
      at.ms != null ? h('span', {}, 'HTTP ' + (at.status || '–') + ' · ' + Math.round(at.ms / 100) / 10 + ' s · ' + at.chars + ' ' + T('chars') + (at.finish ? ' · ' + at.finish : '') + (at.salvaged ? ' · ' + T('aiSalvaged') : '') + (at.notes ? ' · notes ' + at.notes : '') + (at.plan ? ' · plan' : '') + (at.tokens ? ' · tokens ' + at.tokens.completion : '') + (at.chunks ? ' · ' + at.chunks : '')) : null,
      at.raw ? h('code', {}, at.raw) : null) : null] : null;
  let detail = [];
  if (p && p.id === 'openrouter') {
    detail = AI.key && c.preset === 'openrouter' ? [
      h('label', { class: 'sub', for: 'ai-model' }, T('aiModelFree')),
      AI.models && AI.models.length ? h('select', { id: 'ai-model', class: 'ai-input', onChange: (e) => { c.model = e.target.value; aiCfgSave(); } },
        AI.models.map((m) => h('option', { value: m.id, selected: m.id === c.model ? 'selected' : null }, m.name))) : h('p', { class: 'sub' }, AI.models ? (c.model || 'openrouter/auto') : T('aiLoadingModels')),
      h('div', { class: 'row left' }, h('button', { type: 'button', class: 'btn small primary', onClick: test }, T('aiTest')),
        h('button', { type: 'button', class: 'btn small', onClick: () => { aiKeyRemove().then(() => { AI.ready = false; u.msg = T('aiRemoved'); render(); }); } }, T('aiRemove')))]
      : [h('button', { type: 'button', class: 'btn primary', onClick: aiOpenRouterStart }, T('aiOrSignIn')), h('p', { class: 'sub' }, T('aiOrNote'))];
    if (AI.key && c.preset === 'openrouter' && !AI.models) aiOpenRouterModels().then(render);
  } else if (p) {
    detail = [
      p.keyUrl ? h('a', { class: 'sub', href: p.keyUrl, target: '_blank', rel: 'noopener' }, T('aiGetKey', { name: p.label }) + ' ↗') : (p.local ? h('p', { class: 'sub' }, T('aiLocalNote', { origin: location.origin })) : null),
      p.id !== 'gemini' ? [h('label', { class: 'sub', for: 'ai-url' }, T('aiAddress')), h('input', { id: 'ai-url', class: 'ai-input', value: c.url || '', placeholder: 'https://…/v1', autocomplete: 'off', spellcheck: 'false', onChange: (e) => { c.url = e.target.value.trim(); aiCfgSave(); } })] : null,
      h('label', { class: 'sub', for: 'ai-model' }, T('aiModel')),
      h('input', { id: 'ai-model', class: 'ai-input', onFocus: (e) => setTimeout(() => e.target.scrollIntoView({ block: 'center' }), 300), value: c.model || '', autocomplete: 'off', spellcheck: 'false', onChange: (e) => { c.model = e.target.value.trim(); aiCfgSave(); } }),
      h('label', { class: 'sub', for: 'ai-key' }, T('aiKey')),
      h('input', { id: 'ai-key', class: 'ai-input', type: 'password', onFocus: (e) => setTimeout(() => e.target.scrollIntoView({ block: 'center' }), 300), value: u.key, placeholder: AI.key ? T('aiKeySaved') : (p.local ? T('aiKeyNone') : ''), autocomplete: 'off', onInput: (e) => { u.key = e.target.value.trim(); } }),
      h('div', { class: 'row left' },
        h('button', { type: 'button', class: 'btn small primary', onClick: () => { const k = u.key; u.key = ''; (k ? aiKeySave(k) : Promise.resolve()).then(() => { AI.ready = aiConfigured(); test(); }); } }, T('aiSaveTest')),
        AI.key ? h('button', { type: 'button', class: 'btn small', onClick: () => { aiKeyRemove().then(() => { AI.ready = aiConfigured(); u.msg = T('aiRemoved'); render(); }); } }, T('aiRemove')) : null)];
  }
  return [h('h2', {}, '✦ ' + T('aiTitle')), h('p', { class: 'sub' }, T('aiIntro')),
    h('div', { class: 'ai-presets', role: 'group' }, AI_PRESETS.map((pr) => h('button', { type: 'button', class: 'btn small' + (c.preset === pr.id ? ' primary' : ''), onClick: () => pick(pr) }, pr.id === 'other' ? T('aiOther') : pr.label))),
    detail, status, atestBox,
    h('p', { class: 'sub' }, T('aiPrivacy')),
    h('button', { type: 'button', class: 'btn small', onClick: close }, T('close'))];
}
