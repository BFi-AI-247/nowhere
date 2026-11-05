<?php
// Nowhere – Rückmeldungen von der Kartenrückseite (nur POST).
// Nimmt: card (Karten-Id), vote ("up" | "down"), text (freiwillig, höchstens 500 Zeichen).
// Schreibt je Eintrag eine Zeile nach <privat>/nowhere/feedback.jsonl – außerhalb des Web-Roots.
// Öffentlich, ohne Anmeldung. Darum: nur von der eigenen Seite, verstecktes Feld, Zeitfenster je
// Besucher, Tageslimit, Längen- und Größengrenzen.
// Es wird KEINE IP-Adresse gespeichert. Für das Zeitfenster dient ein Einweg-Fingerabdruck
// (IP + geheimes Salz), der nur für die Dauer des Fensters in der Bremsdatei steht und danach
// verfällt. Das Salz liegt in <privat>/nowhere/salz.php und entsteht beim ersten Aufruf.
// Antwort immer JSON: {"ok":true} oder {"ok":false,"code":"<kennung>"} – die App übersetzt die
// Kennung (i18n.js), damit die Meldung in der Sprache des Spielers erscheint.
// Anderer privater Ordner für lokale Tests: Umgebungsvariable NW_PRIVAT.
// Instanz: Infra_1
declare(strict_types=1);
date_default_timezone_set('Europe/Berlin');

const NW_FENSTER   = 5;        // Sekunden zwischen zwei Rückmeldungen desselben Besuchers
const NW_TAGESLIMIT = 2000;    // höchstens so viele Rückmeldungen pro Tag insgesamt
const NW_MAXTEXT   = 500;      // Zeichen Freitext
const NW_MAXDATEI  = 8388608;  // 8 MiB – darüber nimmt der Endpunkt nichts mehr an

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: same-origin');

function antwort(int $code, array $d): void
{
    http_response_code($code);
    echo json_encode($d, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
function fehler(int $code, string $kennung): void { antwort($code, ['ok' => false, 'code' => $kennung]); }

/** Privater Ordner: /privat/nowhere – Geschwister von /web auf dem Strato-Paket. */
function privat(): string
{
    $p = getenv('NW_PRIVAT');
    return is_string($p) && $p !== '' ? $p : __DIR__ . '/../../privat/nowhere';
}

/** Anfrage kommt von derselben Seite (Origin-Host = Host dieser Seite). */
function eigene_herkunft(string $herkunft): bool
{
    $h = parse_url($herkunft, PHP_URL_HOST);
    $hier = (string)preg_replace('/:\d+$/', '', (string)($_SERVER['HTTP_HOST'] ?? ''));
    return is_string($h) && $hier !== '' && strcasecmp($h, $hier) === 0;
}

/** Geheimes Salz, einmal erzeugt und im privaten Ordner gehalten. */
function salz(string $ordner): string
{
    $datei = $ordner . '/salz.php';
    $s = @include $datei;
    if (is_array($s) && is_string($s['salz'] ?? null) && strlen($s['salz']) >= 32) return $s['salz'];
    $neu = bin2hex(random_bytes(32));
    @file_put_contents($datei, "<?php return ['salz' => '" . $neu . "'];\n", LOCK_EX);
    @chmod($datei, 0600);
    return $neu;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') fehler(405, 'kein-post');

// nur von der eigenen Seite; ein fehlender Origin-Kopf wird durchgelassen (manche Browser senden keinen).
// Die Prüfung gilt immer – auch bei gesetztem NW_PRIVAT, damit der Test sie wirklich prüft.
$herkunft = (string)($_SERVER['HTTP_ORIGIN'] ?? '');
if ($herkunft !== '' && !eigene_herkunft($herkunft)) fehler(403, 'fremde-herkunft');

$roh = file_get_contents('php://input', false, null, 0, 8000);
$d = json_decode((string)$roh, true);
if (!is_array($d)) fehler(400, 'unvollstaendig');

// verstecktes Feld: Menschen lassen es leer, einfache Bots füllen es aus.
// Still bestätigen, damit der Bot nichts lernt.
if (trim((string)($d['web'] ?? '')) !== '') antwort(201, ['ok' => true]);

$karte = (string)($d['card'] ?? '');
if (!preg_match('/^[a-z0-9][a-z0-9-]{0,63}$/', $karte)) fehler(400, 'karte-ungueltig');

$stimme = (string)($d['vote'] ?? '');
if ($stimme !== 'up' && $stimme !== 'down') fehler(400, 'stimme-ungueltig');

$text = trim((string)($d['text'] ?? ''));
$text = (string)preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $text);
if (mb_strlen($text) < 2) $text = '';                 // ein Zeichen ist kein Text – Stimme zählt trotzdem
$text = mb_substr($text, 0, NW_MAXTEXT);

$ordner = privat();
if (!@mkdir($ordner, 0700, true) && !is_dir($ordner)) fehler(503, 'serverfehler');

// Bremse: Zeitfenster je Besucher (als verfallender Fingerabdruck) und Tageslimit insgesamt
$abdruck = substr(hash_hmac('sha256', (string)($_SERVER['REMOTE_ADDR'] ?? ''), salz($ordner)), 0, 16);
$bremse = @fopen($ordner . '/feedback-bremse.json', 'c+');
if ($bremse) {
    flock($bremse, LOCK_EX);
    $st = json_decode((string)stream_get_contents($bremse), true);
    if (!is_array($st)) $st = [];
    $heute = date('Y-m-d');
    if (($st['tag'] ?? '') !== $heute) $st = ['tag' => $heute, 'anzahl' => 0, 'letzte' => []];
    $jetzt = time();
    // alles älter als das Fenster verfällt – die Datei hält nie mehr als die letzten Sekunden
    $letzte = [];
    foreach ((array)($st['letzte'] ?? []) as $k => $t) {
        if (is_string($k) && $jetzt - (int)$t < NW_FENSTER) $letzte[$k] = (int)$t;
    }
    $zu_schnell = isset($letzte[$abdruck]);
    $voll = (int)($st['anzahl'] ?? 0) >= NW_TAGESLIMIT;
    if (!$zu_schnell && !$voll) {
        $letzte[$abdruck] = $jetzt;
        $st['anzahl'] = (int)($st['anzahl'] ?? 0) + 1;
    }
    $st['letzte'] = $letzte;
    ftruncate($bremse, 0);
    rewind($bremse);
    fwrite($bremse, (string)json_encode($st));
    fflush($bremse);
    flock($bremse, LOCK_UN);
    fclose($bremse);
    if ($zu_schnell) fehler(429, 'zu-schnell');
    if ($voll) fehler(429, 'tageslimit');
}

$datei = $ordner . '/feedback.jsonl';
if (is_file($datei) && filesize($datei) > NW_MAXDATEI) fehler(507, 'voll');

$zeile = json_encode([
    't' => date('c'),
    'card' => $karte,
    'vote' => $stimme,
    'text' => $text,
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
if (!is_string($zeile)) fehler(500, 'serverfehler');

if (@file_put_contents($datei, $zeile . "\n", FILE_APPEND | LOCK_EX) === false) fehler(503, 'serverfehler');
@chmod($datei, 0600);

antwort(201, ['ok' => true]);
