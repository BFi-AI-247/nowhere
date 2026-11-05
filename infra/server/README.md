# infra/server – der Feedback-Endpunkt von Nowhere

Bereich der Rolle Infra (Rollendatei: `digifil-solutions/betrieb/rollen/infra.md`).
Die App gehört Spiel_2 und liegt woanders; hier steht nur, was auf dem Server läuft.

## Was hier liegt

```text
feedback.php       der Endpunkt – nimmt eine Stimme zu einer Karte entgegen und schreibt sie weg
test_feedback.py   Prüfung: startet einen lokalen PHP-Server und prüft jeden Fall (26 Prüfungen)
```

## Wo es auf dem Server landet

| Was | Wohin | Öffentlich? |
|---|---|---|
| `feedback.php` | `/web/nowhere/feedback.php` | ja – muss es sein, sonst erreicht die App ihn nicht |
| die Stimmen | `/privat/nowhere/feedback.jsonl` | **nein** – `/privat` liegt außerhalb des Web-Roots |
| geheimes Salz | `/privat/nowhere/salz.php` | nein – entsteht beim ersten Aufruf, nur für den Besitzer lesbar |
| Bremse | `/privat/nowhere/feedback-bremse.json` | nein – hält nur die letzten Sekunden |

Hochgeladen wird `feedback.php` vom Workflow `.github/workflows/nowhere-infra-deploy.yml`.
Die Prüfung und diese Datei bleiben im Repo und gehen nie auf den Server.

## Die Schnittstelle (für die App)

`POST https://digifil.de/nowhere/feedback.php`, Körper als JSON:

```json
{"card": "the-wedding", "vote": "up", "text": "beste Karte bisher"}
```

- `card` – die Id der Karte, kleine Buchstaben, Ziffern, Bindestriche, höchstens 64 Zeichen. Pflicht.
- `vote` – `"up"` oder `"down"`. Pflicht.
- `text` – freiwillig, höchstens 500 Zeichen. Kürzer als zwei Zeichen zählt als kein Text;
  die Stimme zählt trotzdem.
- `web` – verstecktes Feld. Die App lässt es weg oder leer. Ist es gefüllt, antwortet der Endpunkt
  freundlich und schreibt nichts (einfache Bots).

Antwort immer JSON:

```json
{"ok": true}
{"ok": false, "code": "zu-schnell"}
```

Kennungen: `kein-post` · `fremde-herkunft` · `unvollstaendig` · `karte-ungueltig` ·
`stimme-ungueltig` · `zu-schnell` · `tageslimit` · `voll` · `serverfehler`.
Die App übersetzt die Kennung selbst (`i18n.js`), damit die Meldung in der Sprache des Spielers
erscheint. Der Server kennt keine Sprachen.

HTTP-Status: 201 bei Erfolg · 400 bei falschen Feldern · 403 fremde Herkunft · 405 kein POST ·
429 Bremse · 507 Datei voll · 503 Serverproblem.

## Wie Sie die Rückmeldungen lesen

Per SFTP `/privat/nowhere/feedback.jsonl` holen – dieselben Zugangsdaten wie der Deploy.
Eine Zeile je Stimme:

```
{"t":"2026-11-05T22:17:39+01:00","card":"the-wedding","vote":"up","text":"beste Karte bisher"}
```

Auszählen von Hand geht mit jedem Texteditor. Wer lieber rechnet:

```bash
# Stimmen je Karte
python3 -c "
import json,collections,sys
z=collections.Counter()
for l in open('feedback.jsonl',encoding='utf-8'):
    e=json.loads(l); z[(e['card'],e['vote'])]+=1
for (k,v),n in sorted(z.items()): print(f'{n:4}  {v:4}  {k}')
"
```

## Was der Endpunkt schützt und was nicht

**Es wird keine IP-Adresse gespeichert.** Für das Zeitfenster dient ein Einweg-Fingerabdruck
(Adresse + geheimes Salz, HMAC-SHA256, 16 Zeichen). Er steht nur in der Bremsdatei und nur, solange
das Fenster läuft – alles Ältere wird bei jedem Aufruf verworfen. In `feedback.jsonl` steht er nie.

Eingestellt in `feedback.php`, oben als Konstanten:

- `NW_FENSTER` 5 Sekunden zwischen zwei Stimmen desselben Besuchers
- `NW_TAGESLIMIT` 2000 Stimmen pro Tag insgesamt
- `NW_MAXTEXT` 500 Zeichen Freitext
- `NW_MAXDATEI` 8 MiB – darüber nimmt der Endpunkt nichts mehr an

Was er **nicht** kann: Er unterscheidet keine Personen. Wer eine Karte zehnmal lobt, wird zehnmal
gezählt (im Abstand von fünf Sekunden). Für eine Stimmungsanzeige unter Freunden reicht das; eine
Abstimmung mit einer Stimme je Person wäre etwas anderes und bräuchte Anmeldung.

## Prüfen

Auf dem eigenen Rechner (braucht `php`):

```bash
python3 infra/server/test_feedback.py
```

Auf dem Server nach dem Upload: `https://digifil.de/nowhere/feedback.php` im Browser öffnen.
Da muss `{"ok":false,"code":"kein-post"}` stehen. Das ist der Beweis, dass PHP läuft und der
Endpunkt antwortet – ein blankes Aufrufen ist kein POST und wird richtig abgewiesen.
