// Nowhere – UI: one card on a stage, tap = flip, swipe up = next, swipe left = the fan (character, associates,
// contacts, possessions, environment). Pattern: KOMPASS. Classic script; loaded last. Owner: Spiel_2.

const S = { screen: 'loading', startIndex: 0, view: 'event', section: 0, index: 0, flipped: false, dir: '', last: '', sheet: null, error: '' };
const els = {};
const app = document.getElementById('app');
const N_SECTIONS = 5;

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
// the back side: a little Markdown – paragraphs, "- " lists, *italic*, **bold**
function prose(text) {
  const inline = (t) => { const frag = document.createDocumentFragment(); const re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g; let i = 0, m;
    while ((m = re.exec(t))) { if (m.index > i) frag.append(t.slice(i, m.index)); const bold = m[0].startsWith('**'); frag.append(h(bold ? 'b' : 'i', {}, m[0].slice(bold ? 2 : 1, bold ? -2 : -1))); i = m.index + m[0].length; }
    if (i < t.length) frag.append(t.slice(i)); return frag; };
  const out = []; let list = null; let para = [];
  const flush = () => { if (para.length) { out.push(h('p', {}, inline(para.join(' ')))); para = []; } };
  (text || '—').split('\n').forEach((line) => {
    const l = line.trim();
    if (l.startsWith('- ')) { flush(); if (!list) { list = h('ul', { class: 'prose-list' }); out.push(list); } list.append(h('li', {}, inline(l.slice(2)))); return; }
    list = null;
    if (!l) { flush(); return; }
    if (l.startsWith('**') && l.endsWith('**') && l.indexOf('**', 2) === l.length - 2) { flush(); out.push(h('p', { class: 'prose-head' }, l.slice(2, -2))); return; }
    para.push(l);
  });
  flush(); return out;
}
function cap(s) { return s ? s[0].toUpperCase() + s.slice(1) : ''; }
function first(name) { return String(name || '').split(' ')[0]; }
function kindWord(k) { return T('kinds')[k] || k; }
function reachWord(r) { return r.startsWith('block:') ? word('blocks', r.slice(6)) : (T('reach')[r] || r); }

// why an option is there, in the player's words
function originLabel(s, cond) {
  const p = cond.split(':'); const ch = cardOf(s.character);
  switch (p[0]) {
    case 'always': return '';
    case 'skill': return (has(s.skills, p[1]) ? word('professions', ch.profession) + ' · ' : '') + word('skills', p[1]);
    case 'profession': return word('professions', p[1]);
    case 'trait': return word('traits', p[1]);
    case 'block': return word('blocks', p[1]);
    case 'associate': { const a = s.associates.map((x) => cardOf(x.id)).find((c) => c && c.profession === p[1]); return (a ? first(a.name) + ' · ' : '') + word('professions', p[1]); }
    case 'possession': { const c = s.possessions.map(cardOf).find((x) => x && x.type === p[1]); return c ? c.name : word('types', p[1]); }
    case 'status': return T('status') + ' ' + word('blocks', p[1]) + ' ' + p[2];
    case 'flag': return T('earlierChoice');
    case 'contact': { const a = s.contacts.map(cardOf).find((c) => c && c.profession === p[1]); return (a ? first(a.name) + ' · ' : '') + word('professions', p[1]); }
    case 'month': return T('month') + ' ' + p[1] + '+';
    case 'until': return T('until') + ' ' + T('month').toLowerCase() + ' ' + p[1];
    default: return cond;
  }
}
function costLabel(cost) {
  const parts = [];
  if (cost.money) parts.push('−' + cost.money + ' ' + T('money'));
  if (cost.influence) parts.push('−' + cost.influence + ' ' + T('influence'));
  if (extraDraws(cost)) parts.push('−' + cost.draws + ' ' + T('draws'));
  return parts.join(' · ');
}

// ---------- layout ----------
function render(animate) {
  if (!els.stage) {
    app.textContent = '';
    els.top = h('div', { class: 'top' }); els.banner = h('div', { class: 'banner' });
    els.stage = h('main', { class: 'stage', 'aria-live': 'polite' });
    els.foot = h('div', { class: 'foot' }); els.toast = h('div', { class: 'toast' }); els.layer = h('div');
    app.append(els.top, els.banner, els.stage, els.foot, els.toast, els.layer);
    bindSwipe(els.stage);
  }
  const s = GAME.state;
  els.top.replaceChildren(...renderTop(s));
  els.banner.textContent = CARDS.testData ? T('testBanner') : '';
  renderStage(animate);
  els.foot.replaceChildren(...renderFoot(s));
  els.layer.replaceChildren(...(S.sheet ? [renderSheet()] : []));
}
function renderTop(s) {
  const menu = h('button', { type: 'button', 'aria-label': T('menu'), title: T('menu'), onClick: () => { S.sheet = 'menu'; render(); } }, '⋯');
  if (S.screen !== 'play' && S.screen !== 'end') return [h('span', {}, h('b', {}, 'Nowhere')), h('span', {}, S.error || ''), menu];
  const res = h('div', { class: 'res' },
    h('span', { class: s.money < 0 ? 'neg' : '' }, T('money') + ' ', h('b', {}, s.money)),
    h('span', {}, T('influence') + ' ', h('b', {}, s.influence)),
    h('span', {}, T('status') + ' ', h('b', {}, s.status)));
  return [h('span', {}, h('b', {}, T('month') + ' ' + Math.min(s.month, MONTHS)), ' · ' + s.draws + ' ' + (s.draws === 1 ? T('draw') : T('draws'))), res, menu];
}
function renderFoot(s) {
  if (S.screen === 'start') {
    const chars = CARDS.all.filter((c) => c.kind === 'character');
    return [h('span', {}, T('swipeChoose')), h('span', { class: 'ver', title: CARDS.built }, CARDS.version ? T('cardsVersion', { v: CARDS.version }) : ''),
      h('button', { type: 'button', class: 'btn primary small', onClick: () => { actStart(chars[S.startIndex].id); S.screen = 'play'; S.view = 'event'; S.flipped = false; render(true); } }, T('play'))];
  }
  if (S.screen === 'end') return [h('span', {}, T('yearOver')), h('button', { type: 'button', class: 'btn small', onClick: () => { S.sheet = 'menu'; render(); } }, T('menu'))];
  if (S.view === 'fan') {
    return [h('button', { type: 'button', class: 'btn small', onClick: () => go('right') }, '‹ ' + (S.section === 0 ? T('backToEvent') : sectionName(S.section - 1))),
      h('div', { class: 'dots' }, T('sections').map((n, i) => h('i', { class: i === S.section ? 'on' : '', title: n }))),
      S.section < N_SECTIONS - 1 ? h('button', { type: 'button', class: 'btn small', onClick: () => go('left') }, sectionName(S.section + 1) + ' ›') : h('span')];
  }
  const kind = h('button', { type: 'button', class: 'btn small', disabled: s.kindChosen || s.draws < 2 || !!s.current, title: s.kindChosen ? T('alreadyChosen') : T('kindHint'), onClick: () => { S.sheet = 'kind'; render(); } }, s.pendingKind ? T('next') + ': ' + kindWord(s.pendingKind) : T('chooseKind'));
  const end = h('button', { type: 'button', class: 'btn small', disabled: !!s.current, onClick: endMonth }, s.month >= MONTHS ? T('finishYear') : T('endMonth'));
  return [kind, h('span', {}, s.current ? T('tapFlip') : (s.draws ? T('swipeDraw') : T('noDraws'))), end];
}

// ---------- stage ----------
function renderStage(animate) {
  const stage = els.stage;
  const old = [...stage.querySelectorAll('.card')].filter((x) => !/out-/.test(x.className)).pop();
  const next = currentCardElement();
  if (animate && S.dir && old) {
    const map = { up: ['out-up', 'in-up'], down: ['out-down', 'in-down'], left: ['out-left', 'in-left'], right: ['out-right', 'in-right'] };
    old.classList.add(map[S.dir][0]); next.classList.add(map[S.dir][1]);
    stage.appendChild(next); setTimeout(() => old.remove(), 380);
  } else { stage.querySelectorAll('.card').forEach((x) => x.remove()); stage.appendChild(next); }
  S.dir = '';
  stage.querySelectorAll('.vdots').forEach((x) => x.remove());
  if (S.screen === 'start') {  // vertical dots for a vertical swipe (T3)
    const n = CARDS.all.filter((c) => c.kind === 'character').length;
    stage.appendChild(h('div', { class: 'vdots', 'aria-hidden': 'true' }, Array.from({ length: n }, (_, i) => h('i', { class: i === S.startIndex ? 'on' : '' }))));
  }
  requestAnimationFrame(() => paintPictures(next));
}
function paintPictures(root) {
  root.querySelectorAll('canvas[data-card]').forEach((cv) => { const c = cardOf(cv.dataset.card) || { id: cv.dataset.card, kind: cv.dataset.kind || 'event' }; const box = cv.parentElement.getBoundingClientRect(); if (box.width) drawPicture(cv, c, box.width, box.height); });
}
function currentCardElement() {
  const s = GAME.state;
  if (S.screen === 'start') { const chars = CARDS.all.filter((c) => c.kind === 'character'); return cardElement(chars[S.startIndex], { start: true }); }
  if (S.screen === 'end') return endCard(s);
  if (S.view === 'fan') return fanCard(s);
  if (s.current) return cardElement(cardOf(s.current.card), { play: true, instance: s.current.instance });
  return deckCard(s);
}
function flipWrap(front, back, extraClass) {
  const card = h('div', { class: 'card' + (S.flipped ? ' flipped' : '') + (extraClass ? ' ' + extraClass : ''), onClick: (e) => { if (e.target.closest('button, a')) return; S.flipped = !S.flipped; card.classList.toggle('flipped', S.flipped); } },
    h('div', { class: 'face front' }, front), h('div', { class: 'face back' }, back));
  return card;
}
// the picture: a file named on the card (app/pictures/<file>, T5), or the drawn placeholder
function picture(card, tagText, impact) {
  const canvas = h('canvas', { 'data-card': card.id, 'data-kind': card.kind, 'aria-hidden': 'true' });
  let img = null;
  if (card.picture) {
    img = h('img', { src: '../pictures/' + card.picture, alt: '', loading: 'lazy', onError: () => { img.remove(); } });
  }
  return h('div', { class: 'pic' }, canvas, img,
    h('span', { class: 'tag' }, tagText),
    impact ? h('span', { class: 'impact', title: T('impact', { n: impact }) }, [1, 2, 3, 4, 5].map((i) => h('i', { class: i <= impact ? 'on' : '' }))) : null);
}
function cardElement(card, o) {
  const s = GAME.state;
  if (card.kind === 'event') {
    const free = (op) => op.origin === 'always' && !op.cost.money && !op.cost.influence;
    const opts = optionsFor(s, card).filter((op) => !free(op)).concat(optionsFor(s, card).filter(free));  // the free option last
    const front = [picture(card, reachWord(card.reach), card.impact),
      h('div', { class: 'title' }, h('h1', {}, cardTitle(card)), h('div', { class: 'meta' }, T('month') + ' ' + s.month + ' · ' + word('stacks', card.stack) + (o.instance ? ' · ' + o.instance : ''))),
      h('div', { class: 'body' }, opts.map((op) => { const origin = originLabel(s, op.origin), cost = costLabel(op.cost);
        return h('button', { type: 'button', class: 'opt', disabled: !op.ok, title: op.ok ? '' : T('cannotAfford'), onClick: () => choose(op.i) },
          h('span', { class: 't' }, optText(op)), h('span', { class: 'why' }, origin, origin && cost ? ' · ' : '', cost ? h('span', { class: 'cost' }, cost) : null)); }),
        h('div', { class: 'hint' }, T('tapStory')))];
    const back = [h('div', { class: 'title' }, h('h1', {}, cardTitle(card))), h('div', { class: 'body' }, prose(cardBack(card)), feedbackRow(card, toast))];
    return flipWrap(front, back);
  }
  if (card.kind === 'person' || card.kind === 'character') {
    const isChar = card.kind === 'character';
    const live = isChar && S.screen !== 'start' && s.character === card.id;
    const liveTraits = live ? s.traits : card.traits;
    const liveAcq = live ? s.acquired : card.acquired || [];
    const role = !isChar && S.screen === 'play' ? (s.associates.some((a) => a.id === card.id) ? 'Associate' : has(s.contacts, card.id) ? 'Contact' : 'Person') : (isChar ? 'Character' : 'Person');
    const op = !isChar && S.screen === 'play' ? opinionOf(s, card.id) : null;
    const front = [picture(card, T('roles')[role], 0),
      h('div', { class: 'title' }, h('h1', {}, card.name), h('div', { class: 'meta' }, word('professions', card.profession) + ' · ' + word('blocks', card.block) + ' · ' + card.age)),
      h('div', { class: 'body' },
        h('div', { class: 'chips' }, card.skills.map((x) => h('span', { class: 'chip on' }, word('skills', x)))),
        h('div', { class: 'chips' }, liveTraits.map((x) => h('span', { class: 'chip' }, word('traits', x))), liveAcq.map((x) => h('span', { class: 'chip', style: 'font-style:italic' }, word('traits', x)))),
        o.play ? [h('button', { type: 'button', class: 'opt primary', disabled: s.influence < 1, onClick: () => take('contact') }, h('span', { class: 't' }, T('keepInTouch')), h('span', { class: 'why' }, h('span', { class: 'cost' }, '−1 ' + T('influence')))),
          h('button', { type: 'button', class: 'opt', onClick: pass }, h('span', { class: 't' }, T('letGo')))] : null,
        op != null ? h('p', {}, h('i', {}, cap(T(opinionWord(op))))) : null)];
    const back = [h('div', { class: 'title' }, h('h1', {}, card.name)), h('div', { class: 'body' },
      prose(cardBack(card)),
      op != null ? h('dl', { class: 'kv' }, h('dt', {}, T('opinionOfYou')), h('dd', {}, T(opinionWord(op)) + ' (' + op + ')')) : null,
      isChar && S.screen === 'start' ? h('dl', { class: 'kv' }, h('dt', {}, cap(T('money'))), h('dd', {}, card.money), h('dt', {}, cap(T('influence'))), h('dd', {}, card.influence), h('dt', {}, cap(T('status'))), h('dd', {}, card.status),
        h('dt', {}, T('associates')), h('dd', {}, card.associates.map((id) => (cardOf(id) || { name: id }).name).join(', ')), h('dt', {}, T('contacts')), h('dd', {}, card.contacts.map((id) => (cardOf(id) || { name: id }).name).join(', '))) : null,
      S.screen !== 'start' ? feedbackRow(card, toast) : null)];
    return flipWrap(front, back);
  }
  // possession
  const front = [picture(card, word('types', card.type), 0),
    h('div', { class: 'title' }, h('h1', {}, card.name), h('div', { class: 'meta' }, T('possession') + ' · ' + word('stacks', card.stack))),
    h('div', { class: 'body' }, h('div', { class: 'chips' }, (card.gives || []).map((g) => h('span', { class: 'chip on' }, g.startsWith('skill:') ? word('skills', g.slice(6)) : g.slice(7)))),
      o.play ? [h('button', { type: 'button', class: 'opt primary', disabled: s.money < 2, onClick: () => take('possession') }, h('span', { class: 't' }, T('acquire')), h('span', { class: 'why' }, h('span', { class: 'cost' }, '−2 ' + T('money')))),
        h('button', { type: 'button', class: 'opt', onClick: pass }, h('span', { class: 't' }, T('decline')))] : null)];
  const back = [h('div', { class: 'title' }, h('h1', {}, card.name)), h('div', { class: 'body' }, prose(cardBack(card)), feedbackRow(card, toast))];
  return flipWrap(front, back);
}
function deckCard(s) {
  const canDraw = s.draws > 0;
  return h('div', { class: 'card deck', onClick: (e) => { if (!e.target.closest('button')) draw(); } },
    h('div', { class: 'face front' },
      h('div', { class: 'sub' }, T('month') + ' ' + s.month + ' ' + T('of') + ' ' + MONTHS),
      h('div', { class: 'big' }, s.draws), h('div', { class: 'sub' }, s.draws === 1 ? T('drawLeft') : T('drawsLeft')),
      S.last ? h('div', { class: 'last' }, S.last) : null,
      canDraw ? h('button', { type: 'button', class: 'btn primary', onClick: draw }, s.pendingKind ? T('drawA', { kind: kindWord(s.pendingKind) }) : T('drawBtn')) : h('div', { class: 'sub' }, T('endToGoOn'))));
}
function endCard(s) {
  const ch = cardOf(s.character);
  return h('div', { class: 'card deck' }, h('div', { class: 'face front' },
    h('h1', {}, T('decemberEnds')), h('div', { class: 'sub' }, ch.name + ' · ' + T('cardsPlayed', { n: s.history.length })),
    h('div', { class: 'last' }, cap(T('money')) + ' ' + s.money + ' · ' + T('influence') + ' ' + s.influence + ' · ' + T('status') + ' ' + s.status),
    h('div', { class: 'last' }, T('traits') + ': ' + s.traits.map((t) => word('traits', t)).join(', ') + (s.acquired.length ? ' · ' + s.acquired.map((t) => word('traits', t)).join(', ') : '')),
    h('div', { class: 'row' }, h('button', { type: 'button', class: 'btn', onClick: exportLog }, T('saveStory')), h('button', { type: 'button', class: 'btn primary', onClick: newGame }, T('newGame')))));
}
// the fan: character · associates · contacts · possessions · environment
function fanItems(s) {
  return [[s.character], s.associates.map((a) => a.id), s.contacts.slice(), s.possessions.slice(), ['block']];
}
function fanCard(s) {
  const items = fanItems(s)[S.section];
  if (!items.length) return h('div', { class: 'card deck' }, h('div', { class: 'face front' }, h('h1', {}, sectionName(S.section)), h('div', { class: 'sub' }, T('nothingHere'))));
  S.index = Math.max(0, Math.min(S.index, items.length - 1));
  const id = items[S.index];
  if (id === 'block') return blockCard(s);
  return cardElement(cardOf(id), {});
}
function blockCard(s) {
  const vals = s.blockValues;
  const bar = (k) => h('dd', { class: 'bar' }, h('span', { class: 'track' }, h('span', { style: 'width:' + (vals[k] * 10) + '%' })), h('b', {}, vals[k]));
  const front = [picture({ id: 'block-' + s.block, kind: 'event' }, T('yourBlock'), 0),
    h('div', { class: 'title' }, h('h1', {}, word('blocks', s.block)), h('div', { class: 'meta' }, cap(T('status')) + ' ' + s.status + ' · ' + Object.keys(s.stacks).filter((k) => s.stacks[k]).map((k) => word('stacks', k)).join(' · '))),
    h('div', { class: 'body' }, h('div', { class: 'chips' }, s.blockTraits.map((t) => h('span', { class: 'chip on' }, word('traits', t)))),
      h('dl', { class: 'kv' }, ['economic', 'military', 'cultural', 'technological'].map((k) => [h('dt', {}, T('values')[k]), bar(k)])))];
  const back = [h('div', { class: 'title' }, h('h1', {}, T('storySoFar'))), h('div', { class: 'body' },
    s.history.length ? s.history.map((x) => h('p', {}, 'M' + x.month + ' · ' + cardTitle(cardOf(x.card)) + ' — ' + x.text)) : h('p', {}, T('nothingYet')))];
  return flipWrap(front, back);
}
function renderSheet() {
  const close = () => { S.sheet = null; render(); };
  let box;
  if (S.sheet === 'kind') {
    box = [h('h2', {}, T('kindTitle')), h('p', { class: 'sub' }, T('kindCost')),
      ['event', 'person', 'possession'].map((k) => h('button', { type: 'button', class: 'btn', onClick: () => { actChooseKind(k); S.sheet = null; render(); } }, cap(kindWord(k)))),
      h('button', { type: 'button', class: 'btn small', onClick: close }, T('cancel'))];
  } else {
    const langBtn = (l, label) => h('button', { type: 'button', class: 'btn small' + (LANG === l ? ' primary' : ''), onClick: () => { langSet(l); S.sheet = null; render(); } }, label);
    box = [h('h2', {}, 'Nowhere · Prototype 1'),
      h('p', { class: 'sub' }, (CARDS.testData ? T('testCards') : '') + T('aboutCards', { n: CARDS.all.length })),
      h('div', { class: 'row left' }, h('span', { class: 'sub' }, T('language') + ':'), langBtn('en', 'English'), langBtn('de', 'Deutsch')),
      S.screen === 'play' || S.screen === 'end' ? h('button', { type: 'button', class: 'btn', onClick: () => { exportLog(); close(); } }, T('saveLog')) : null,
      h('button', { type: 'button', class: 'btn', onClick: () => importLog(close) }, T('loadLog')),
      h('a', { class: 'btn', href: '../' }, T('toHub')),
      S.screen !== 'start' ? h('button', { type: 'button', class: 'btn', onClick: () => { if (confirm(T('confirmNew'))) { newGame(); } close(); } }, T('newGame')) : null,
      !window.matchMedia('(display-mode: standalone)').matches ? h('p', { class: 'sub' }, T('install')) : null,
      h('button', { type: 'button', class: 'btn small', onClick: close }, T('close'))];
  }
  return h('div', { class: 'sheet', onClick: (e) => { if (e.target === e.currentTarget) close(); } }, h('div', { class: 'box' }, box));
}

// ---------- actions ----------
function snapshot(s) { return { money: s.money, influence: s.influence, status: s.status, traits: s.traits.slice(), acquired: s.acquired.slice(), poss: s.possessions.slice(), contacts: s.contacts.slice(), assoc: s.associates.map((a) => a.id), stacks: Object.assign({}, s.stacks) }; }
function diffText(a, s) {
  const out = [];
  const d = (k) => { const v = s[k] - a[k]; if (v) out.push((v > 0 ? '+' : '') + v + ' ' + T(k)); };
  d('money'); d('influence'); d('status');
  const came = s.traits.filter((t) => !has(a.traits, t)), went = a.traits.filter((t) => !has(s.traits, t));
  came.forEach((t) => {
    const opp = went.find((w) => OPP[t] === w);
    if (opp) { out.push(T('replaces', { a: word('traits', t), b: word('traits', opp) })); remove(went, opp); }
    else { const old = went.length ? went.shift() : null; out.push(old ? T('pushesOut', { a: word('traits', t), b: word('traits', old) }) : T('now', { t: word('traits', t) })); }
  });
  went.forEach((t) => out.push(T('noLonger', { t: word('traits', t) })));
  s.acquired.filter((t) => !has(a.acquired, t)).forEach((t) => out.push(word('traits', t)));
  s.possessions.filter((t) => !has(a.poss, t)).forEach((t) => out.push(T('got', { name: cardOf(t).name })));
  s.contacts.filter((t) => !has(a.contacts, t) && !has(a.assoc, t)).forEach((t) => out.push(T('newContact', { name: first(cardOf(t).name) })));
  a.assoc.filter((t) => !s.associates.some((x) => x.id === t)).forEach((t) => out.push(T('nowContact', { name: first(cardOf(t).name) })));
  Object.keys(s.stacks).forEach((k) => { if (s.stacks[k] && !a.stacks[k]) out.push(T('opened', { s: word('stacks', k) })); if (!s.stacks[k] && a.stacks[k]) out.push(T('closed', { s: word('stacks', k) })); });
  return out.join(' · ');
}
function choose(i) {
  const s = GAME.state; const card = cardOf(s.current.card); const before = snapshot(s); const text = optText(card.options[i]);
  if (!actChoose(i)) return;
  const d = diffText(before, GAME.state);
  S.last = '“' + text + '”' + (d ? ' — ' + d : ''); S.dir = 'up'; S.flipped = false; render(true);
  if (d) toast(d);
}
function take(as) { const s = GAME.state; const card = cardOf(s.current.card); const before = snapshot(s); if (!actTake(as)) return; S.last = T(as === 'contact' ? 'keptInTouch' : 'acquired', { name: card.name }); S.dir = 'up'; S.flipped = false; render(true); const d = diffText(before, GAME.state); if (d) toast(d); }
function pass() { const card = cardOf(GAME.state.current.card); if (!actPass()) return; S.last = T('let', { name: card.name || cardTitle(card) }); S.dir = 'up'; S.flipped = false; render(true); }
function draw() {
  const s = GAME.state; if (s.current) { toast(T('chooseFirst')); return; }
  if (s.draws < 1) { toast(T('noDrawsEnd')); return; }
  const id = actDraw();
  if (!id) { toast(T('nothingToDraw')); return; }
  S.dir = 'up'; S.flipped = false; S.last = ''; render(true);
}
function endMonth() {
  const s = GAME.state; if (s.current) { toast(T('chooseFirst')); return; }
  const before = snapshot(s);
  if (!actEndMonth()) return;
  if (GAME.state.ended) { S.screen = 'end'; S.dir = 'up'; render(true); return; }
  const d = diffText(before, GAME.state);
  S.last = T('newMonth') + (d ? ' ' + d : ''); S.dir = 'up'; S.flipped = false; render(true);
}
function newGame() {
  gameReset(); S.screen = 'start'; S.view = 'event'; S.section = 0; S.index = 0; S.startIndex = 0; S.flipped = false; S.last = ''; S.dir = '';
  // a new game takes the cards as they are now, not the ones loaded when the app was opened (post/spiel/016)
  loadCards().then(() => render(true), () => render(true));
}
function loadCards() {
  return fetch('../cards.json', { cache: 'no-cache' }).then((r) => { if (!r.ok) throw new Error('cards.json ' + r.status); return r.json(); }).then((data) => { cardsLoad(data); return data; });
}
function exportLog() {
  const blob = new Blob([gameExport()], { type: 'application/json' });
  const a = h('a', { href: URL.createObjectURL(blob), download: 'nowhere-' + (GAME.state.game || 'game') + '.json' }); document.body.append(a); a.click(); a.remove();
  toast(T('saved'));
}
function importLog(done) {
  const inp = h('input', { type: 'file', accept: 'application/json,.json' });
  inp.addEventListener('change', () => {
    const f = inp.files[0]; if (!f) return;
    f.text().then((t) => { gameImport(t); const s = GAME.state; S.screen = s.ended ? 'end' : s.character ? 'play' : 'start'; S.view = 'event'; S.flipped = false; S.last = T('storyLoaded'); render(true); toast(T('loaded')); })
      .catch((e) => toast(T('couldNotLoad') + e.message)).then(done);
  });
  inp.click();
}
let toastTimer = 0;
function toast(text) { els.toast.textContent = text; els.toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => els.toast.classList.remove('show'), 2600); }

// ---------- navigation ----------
function go(dir) {
  const s = GAME.state;
  if (S.sheet) return;
  if (S.screen === 'start') {
    const n = CARDS.all.filter((c) => c.kind === 'character').length;
    if (dir === 'up') S.startIndex = (S.startIndex + 1) % n; else if (dir === 'down') S.startIndex = (S.startIndex + n - 1) % n; else return;
    S.dir = dir; S.flipped = false; render(true); return;
  }
  if (S.screen !== 'play') return;
  if (S.view === 'event') {
    if (dir === 'up') { if (s.current) toast(T('chooseFirst')); else draw(); return; }
    if (dir === 'left') { S.view = 'fan'; S.section = 0; S.index = 0; S.dir = 'left'; S.flipped = false; render(true); }
    return;
  }
  // fan
  if (dir === 'left') { if (S.section < N_SECTIONS - 1) { S.section++; S.index = 0; S.dir = 'left'; S.flipped = false; render(true); } return; }
  if (dir === 'right') { if (S.section > 0) { S.section--; S.index = 0; } else S.view = 'event'; S.dir = 'right'; S.flipped = false; render(true); return; }
  const items = fanItems(s)[S.section]; if (items.length < 2) return;
  if (dir === 'up') S.index = (S.index + 1) % items.length; else S.index = (S.index + items.length - 1) % items.length;
  S.dir = dir; S.flipped = false; render(true);
}
function bindSwipe(stage) {
  let x0 = null, y0 = null, scroller = null, st0 = 0;
  const start = (x, y, target) => { x0 = x; y0 = y; scroller = target.closest && target.closest('.body'); st0 = scroller ? scroller.scrollTop : 0; };
  const end = (x, y) => {
    if (x0 == null) return; const dx = x - x0, dy = y - y0; x0 = y0 = null;
    if (Math.abs(dx) < 50 && Math.abs(dy) < 50) return;
    if (Math.abs(dx) > Math.abs(dy)) { go(dx < 0 ? 'left' : 'right'); return; }
    if (scroller) {
      const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2, atTop = scroller.scrollTop <= 0 && st0 <= 0;
      if (dy < 0 && !atBottom) return; if (dy > 0 && !atTop) return;
    }
    go(dy < 0 ? 'up' : 'down');
  };
  stage.addEventListener('touchstart', (e) => start(e.touches[0].clientX, e.touches[0].clientY, e.target), { passive: true });
  stage.addEventListener('touchend', (e) => end(e.changedTouches[0].clientX, e.changedTouches[0].clientY), { passive: true });
  stage.addEventListener('pointerdown', (e) => { if (e.pointerType === 'mouse' && !e.target.closest('button, a')) start(e.clientX, e.clientY, e.target); });
  stage.addEventListener('pointerup', (e) => { if (e.pointerType === 'mouse') end(e.clientX, e.clientY); });
  stage.addEventListener('wheel', (e) => {
    const sc = e.target.closest && e.target.closest('.body'); if (sc && sc.scrollHeight > sc.clientHeight + 2) return;
    if (Math.abs(e.deltaY) < 30 || stage._lock) return; stage._lock = true; setTimeout(() => { stage._lock = false; }, 500);
    go(e.deltaY > 0 ? 'up' : 'down');
  }, { passive: true });
}
document.addEventListener('keydown', (e) => {
  if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
  if (S.sheet) { if (e.key === 'Escape') { S.sheet = null; render(); } return; }
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  switch (e.key) {
    case 'ArrowDown': case 'j': case ' ': e.preventDefault(); go('up'); break;
    case 'ArrowUp': case 'k': e.preventDefault(); go('down'); break;
    case 'ArrowLeft': go('left'); break;
    case 'ArrowRight': go('right'); break;
    case 'f': { const c = els.stage.querySelector('.card .face'); if (c) { S.flipped = !S.flipped; c.parentElement.classList.toggle('flipped', S.flipped); } break; }
    case 'e': if (S.screen === 'play' && S.view === 'event') endMonth(); break;
    case '1': case '2': case '3': case '4': case '5': { const b = els.stage.querySelectorAll('.opt:not([disabled])')[Number(e.key) - 1]; if (b) b.click(); break; }
    default:
  }
});
window.addEventListener('resize', () => paintPictures(els.stage));
if (window.matchMedia) window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => paintPictures(els.stage));

// ---------- start ----------
langLoad();
if ('serviceWorker' in navigator) { navigator.serviceWorker.register('../sw.js').catch(() => { /* offline later, not now */ }); }
loadCards().then(() => {
  gameLoad();
  const s = GAME.state;
  S.screen = s.ended ? 'end' : s.character ? 'play' : 'start';
  render(true);
}).catch((e) => { S.error = 'Could not load the cards: ' + e.message; render(); });
