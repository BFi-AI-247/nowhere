#!/usr/bin/env python3
"""Prüfung für feedback.php – startet einen lokalen PHP-Server und prüft jeden Fall.

    python3 infra/server/test_feedback.py

Braucht php auf dem Rechner. Schreibt nur in einen temporären Ordner, nie auf den Server.
Instanz: Infra_1
"""
import json
import os
import shutil
import socket
import subprocess
import sys
import tempfile
import time
import urllib.error
import urllib.request

HIER = os.path.dirname(os.path.abspath(__file__))
FENSTER = 5  # muss zu NW_FENSTER in feedback.php passen

fehler = []


def pruefe(name, bedingung, zusatz=""):
    if bedingung:
        print(f"  ok    {name}")
    else:
        print(f"  FEHLER {name} {zusatz}")
        fehler.append(name)


def sende(url, daten=None, methode="POST", herkunft=None):
    """Gibt (status, json) zurück."""
    leib = None if daten is None else json.dumps(daten).encode()
    a = urllib.request.Request(url, data=leib, method=methode)
    a.add_header("Content-Type", "application/json")
    if herkunft:
        a.add_header("Origin", herkunft)
    try:
        with urllib.request.urlopen(a, timeout=10) as r:
            return r.status, json.loads(r.read().decode() or "{}")
    except urllib.error.HTTPError as e:
        leib_a = e.read().decode()
        try:
            return e.code, json.loads(leib_a or "{}")
        except json.JSONDecodeError:
            return e.code, {"roh": leib_a}


def freier_port():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def main():
    if not shutil.which("php"):
        print("php fehlt – Prüfung nicht möglich")
        return 2

    privat = tempfile.mkdtemp(prefix="nowhere-privat-")
    port = freier_port()
    url = f"http://127.0.0.1:{port}/feedback.php"
    umgebung = dict(os.environ, NW_PRIVAT=privat)
    server = subprocess.Popen(
        ["php", "-S", f"127.0.0.1:{port}", "-t", HIER],
        env=umgebung, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    try:
        for _ in range(50):
            time.sleep(0.1)
            try:
                sende(url, None, "GET")
                break
            except Exception:
                continue

        print("Syntax")
        p = subprocess.run(["php", "-l", os.path.join(HIER, "feedback.php")],
                           capture_output=True, text=True)
        pruefe("php -l ohne Fehler", p.returncode == 0, p.stdout.strip())

        print("Abgewiesene Anfragen")
        s, d = sende(url, None, "GET")
        pruefe("GET → 405 kein-post", s == 405 and d.get("code") == "kein-post", f"{s} {d}")

        s, d = sende(url, {"card": "the-wedding", "vote": "up"}, herkunft="https://boeser-ort.example")
        pruefe("fremder Origin → 403", s == 403 and d.get("code") == "fremde-herkunft", f"{s} {d}")
        pruefe("fremder Origin schreibt nichts", not os.path.isfile(os.path.join(privat, "feedback.jsonl")))

        s, d = sende(url, {"card": "the-wedding", "vote": "up"}, herkunft=f"http://127.0.0.1:{port}")
        pruefe("eigener Origin → 201", s == 201 and d.get("ok") is True, f"{s} {d}")
        os.remove(os.path.join(privat, "feedback.jsonl"))   # dieser Fall ist geprüft, Datei zurücksetzen

        s, d = sende(url, {"vote": "up"})
        pruefe("ohne card → 400 karte-ungueltig", s == 400 and d.get("code") == "karte-ungueltig", f"{s} {d}")

        s, d = sende(url, {"card": "Die Hochzeit!", "vote": "up"})
        pruefe("card mit Sonderzeichen → 400", s == 400 and d.get("code") == "karte-ungueltig", f"{s} {d}")

        s, d = sende(url, {"card": "the-wedding", "vote": "vielleicht"})
        pruefe("vote falsch → 400 stimme-ungueltig", s == 400 and d.get("code") == "stimme-ungueltig", f"{s} {d}")

        print("Angenommene Rückmeldung")
        time.sleep(FENSTER + 1)
        s, d = sende(url, {"card": "the-wedding", "vote": "up", "text": "beste Karte bisher – schöner Text"})
        pruefe("gültige Stimme → 201 ok", s == 201 and d.get("ok") is True, f"{s} {d}")

        datei = os.path.join(privat, "feedback.jsonl")
        pruefe("Datei angelegt", os.path.isfile(datei))
        zeilen = open(datei, encoding="utf-8").read().strip().splitlines()
        pruefe("genau eine Zeile", len(zeilen) == 1, f"{len(zeilen)}")
        e = json.loads(zeilen[0])
        pruefe("Felder richtig", e["card"] == "the-wedding" and e["vote"] == "up"
               and e["text"] == "beste Karte bisher – schöner Text", str(e))
        pruefe("Zeitstempel vorhanden", isinstance(e.get("t"), str) and e["t"].startswith("20"), str(e.get("t")))
        pruefe("Umlaute und Gedankenstrich heil", "schöner" in e["text"] and "–" in e["text"], repr(e["text"]))

        print("Bremse")
        s, d = sende(url, {"card": "a-child", "vote": "down"})
        pruefe("zweite Stimme sofort → 429 zu-schnell", s == 429 and d.get("code") == "zu-schnell", f"{s} {d}")
        bremsdatei = os.path.join(privat, "feedback-bremse.json")
        vor_abweisung = json.load(open(bremsdatei, encoding="utf-8")).get("anzahl")
        sende(url, {"card": "a-child", "vote": "quatsch"})
        sende(url, None, "GET")
        pruefe("abgewiesene Anfragen zählen nicht auf das Tageslimit",
               json.load(open(bremsdatei, encoding="utf-8")).get("anzahl") == vor_abweisung,
               f"{vor_abweisung} → {json.load(open(bremsdatei, encoding='utf-8')).get('anzahl')}")
        st = json.load(open(bremsdatei, encoding="utf-8"))
        pruefe("Bremsdatei hat Fingerabdrücke, keine Adressen",
               all(len(k) == 16 and k.isalnum() for k in st.get("letzte", {})) and "127.0.0.1" not in open(bremsdatei, encoding="utf-8").read(),
               str(st))

        print(f"  … warte {FENSTER + 1} s, bis das Fenster verfallen ist")
        time.sleep(FENSTER + 1)
        s, d = sende(url, {"card": "a-child", "vote": "down"})
        pruefe("nach dem Fenster → 201 ok", s == 201 and d.get("ok") is True, f"{s} {d}")
        st = json.load(open(bremsdatei, encoding="utf-8"))
        pruefe("alter Fingerabdruck verfallen (höchstens einer)", len(st.get("letzte", {})) <= 1, str(st))

        print("Verstecktes Feld und Grenzen")
        time.sleep(FENSTER + 1)
        vorher = len(open(datei, encoding="utf-8").read().strip().splitlines())
        s, d = sende(url, {"card": "a-child", "vote": "up", "web": "http://spam.example"})
        pruefe("Bot-Feld → 201, aber nichts geschrieben",
               s == 201 and len(open(datei, encoding="utf-8").read().strip().splitlines()) == vorher, f"{s} {d}")

        time.sleep(FENSTER + 1)
        lang = "A" * 900
        s, d = sende(url, {"card": "a-quiet-sunday", "vote": "up", "text": lang})
        letzte = json.loads(open(datei, encoding="utf-8").read().strip().splitlines()[-1])
        pruefe("Text auf 500 Zeichen gekürzt", s == 201 and len(letzte["text"]) == 500, str(len(letzte["text"])))

        time.sleep(FENSTER + 1)
        s, d = sende(url, {"card": "a-shooting-star", "vote": "down", "text": "Zeile1\x00\x07Zeile2"})
        letzte = json.loads(open(datei, encoding="utf-8").read().strip().splitlines()[-1])
        pruefe("Steuerzeichen entfernt", "\x00" not in letzte["text"] and "\x07" not in letzte["text"], repr(letzte["text"]))

        time.sleep(FENSTER + 1)
        s, d = sende(url, {"card": "an-old-friend", "vote": "up", "text": "x"})
        letzte = json.loads(open(datei, encoding="utf-8").read().strip().splitlines()[-1])
        pruefe("ein Zeichen Text → Stimme zählt, Text leer",
               s == 201 and letzte["text"] == "" and letzte["card"] == "an-old-friend", str(letzte))

        print("Keine Adressen in den Daten")
        inhalt = open(datei, encoding="utf-8").read()
        pruefe("keine IP in feedback.jsonl", "127.0.0.1" not in inhalt and "REMOTE_ADDR" not in inhalt)
        salz = os.path.join(privat, "salz.php")
        pruefe("Salz angelegt und nur für den Besitzer lesbar",
               os.path.isfile(salz) and (os.stat(salz).st_mode & 0o077) == 0,
               oct(os.stat(salz).st_mode) if os.path.isfile(salz) else "fehlt")

        print(f"\nZeilen in der Datei am Ende: {len(inhalt.strip().splitlines())}")
        print("Beispielzeile:", inhalt.strip().splitlines()[0])
    finally:
        server.terminate()
        server.wait(timeout=5)
        shutil.rmtree(privat, ignore_errors=True)

    if fehler:
        print(f"\nFEHLER in {len(fehler)} Prüfung(en): {', '.join(fehler)}")
        return 1
    print("\nAlle Prüfungen bestanden.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
