// Nowhere – like/dislike on the back of a card (A3). Endpoint by Infra_1: feedback.php next to the app
// (post/spiel/014): POST JSON {card, vote: up|down, text?}; answers {ok} or {ok:false, code}. Same origin only.
// Classic script; needs h() and T() from the page. Owner: Spiel_2.

const FEEDBACK_URL = (document.querySelector('meta[name="nowhere-feedback"]') || {}).content || 'feedback.php';
const VOTED_KEY = 'nowhere.voted';
function votedGet() { try { return JSON.parse(localStorage.getItem(VOTED_KEY) || '{}'); } catch (e) { return {}; } }
function votedSet(id, v) { try { const m = votedGet(); m[id] = v; localStorage.setItem(VOTED_KEY, JSON.stringify(m)); } catch (e) { /* ignore */ } }

function feedbackSend(cardId, vote, text) {
  const body = { card: cardId, vote };
  if (text && text.trim().length >= 2) body.text = text.trim().slice(0, 500);
  return fetch(FEEDBACK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    .then((r) => r.json().catch(() => ({ ok: false, code: 'serverfehler' })))
    .catch(() => ({ ok: false, code: 'offline' }));
}
function feedbackMessage(code) {
  if (code === 'zu-schnell') return T('fbWait');
  if (code === 'tageslimit' || code === 'voll') return T('fbEnough');
  if (code === 'offline') return T('fbOffline');
  return T('fbFailed');
}
// The row of buttons for the back of a card. toast(text) shows a short note.
function feedbackRow(card, toastFn) {
  const id = card.id; const done = votedGet()[id];
  const row = h('div', { class: 'fb' });
  const say = h('textarea', { class: 'fb-text', rows: '2', maxlength: '500', placeholder: T('fbSayMore') });
  const send = (vote) => {
    row.querySelectorAll('button').forEach((b) => { b.disabled = true; });
    feedbackSend(id, vote, say.value).then((res) => {
      if (res && res.ok) { votedSet(id, vote); toastFn(T('fbThanks')); row.replaceChildren(h('span', { class: 'fb-done' }, vote === 'up' ? '👍 ' + T('fbThanks') : '👎 ' + T('fbThanks'))); }
      else { toastFn(feedbackMessage(res && res.code)); row.querySelectorAll('button').forEach((b) => { b.disabled = false; }); }
    });
  };
  if (done) { row.append(h('span', { class: 'fb-done' }, (done === 'up' ? '👍 ' : '👎 ') + T('fbVoted'))); return row; }
  row.append(h('span', { class: 'fb-q' }, T('fbQuestion')),
    h('div', { class: 'fb-btns' },
      h('button', { type: 'button', class: 'btn small', 'aria-label': T('fbUp'), onClick: (e) => { e.stopPropagation(); send('up'); } }, '👍'),
      h('button', { type: 'button', class: 'btn small', 'aria-label': T('fbDown'), onClick: (e) => { e.stopPropagation(); send('down'); } }, '👎')),
    say);
  say.addEventListener('click', (e) => e.stopPropagation());
  return row;
}
