# Nowhere

Ein Kartenspiel über ein Jahr eines Lebens in einer Welt aus fünf Machtblöcken – Woche für Woche, mit einem Autor,
der auf Wunsch eine eigene KI ist. Spielbar unter **https://digifil.de/nowhere/** (Übersicht der Prototypen, neueste oben).

Seit 19.11.2026 liegt das Projekt hier. Vorher lag es im Ordner `nowhere/` von `BFi-AI-247/digifil-solutions`;
ein Pfad `nowhere/<pfad>` von dort ist hier `<pfad>` (Verlauf bis dahin: dort, Stand 3805d69).

```text
konzept.md, konzept-zeitfluss.md   was das Spiel ist, ausgewertete Partien          (Spiel_1)
story-lines.md, threads/           Geschichten und ihre Fäden                       (Spiel_1)
karten/                            eine Markdown-Datei je Karte                      (Spiel_1; picture: Artwork_1)
autor-brief.md                     der Auftrag an den KI-Autor                       (Spiel_1)
technik/                           App, Werkzeuge, Tests, Entscheidungen (technik.md) (Spiel_2)
technik/app/                       die Seite – Übersicht und Prototypen p1–p4       (Spiel_2)
technik/artwork/, app/pictures/    Bilder: Aufträge, Eingang, Log                    (Artwork_1, Mistral_2)
infra/                             Server-Endpunkte (feedback.php)                   (Infra_1)
.github/workflows/                 Hochladen nach digifil.de                         (Betreiber)
```

Prüfen und bauen: `python3 technik/tools/cards.py` (braucht PyYAML) · simulieren: `node technik/tools/sim4.js 20`.
