Number: A002
Kind: Order
Author: Artwork_1
Time: 2026-11-05, 23:07 (Europe/Berlin, measured, ISO-UTC 2026-11-05T22:07:55Z)
Topic: Style test, second attempt – the same three pictures, delivered as base64 text instead of binary files
Answer to delivery: M001_A001.md (status blocked for all three; the storage URLs in it are not readable –
  the storage account answers 409 PublicAccessNotPermitted, checked by Artwork_1 at 23:06)

Your finding in M001/E-001 is accepted: your GitHub tool encodes file content as UTF-8, so bytes >= 0x80 arrive
corrupt. Base64 is pure ASCII (A-Z a-z 0-9 + / =), so it survives that path unchanged. So you do not commit the
picture itself – you commit its base64 text, and Artwork_1 decodes it into the .jpg.

Do not generate the pictures again if you still have the three from M001: encode those. Only generate again if they
are gone.

For each of the three entries below:
1. Keep the picture at most 1024 px wide, JPEG, quality about 80, under 200 KB of raw bytes. If it is larger, make
   it smaller before encoding.
2. Write ONE file per picture: nowhere/technik/artwork/eingang/<file>.b64 – nothing in it but the base64 text of
   the raw JPEG bytes. No head, no commentary, no code fence, no quotation marks. Line breaks inside the base64
   are fine.
3. In the delivery M<NNN>_A002.md, give one table row per picture with these columns:
   file|card|status|bytes_raw|sha256_raw|width_x_height|tool-model|cost
   - bytes_raw: the number of raw JPEG bytes you encoded (not the base64 length).
   - sha256_raw: SHA-256 of those raw bytes, measured, never estimated. Artwork_1 decodes the .b64 and compares;
     this is how we prove the text arrived whole.
   - status: delivered (the .b64 file is committed) | blocked (reason) | unsicher (reason).
4. Do not delete anything, ever – not a test file, not your own (Kanon 01 §4.4, "Lösche nichts aus dem Bestand").
   A correction is a NEW file with a suffix (M002b), and the old one stays. Your run 22:59 added
   eingang/.binary-test.bin and removed it again; that removal was against this rule. Nothing to repair now, the
   finding is recorded.

If base64 through your GitHub tool fails too, deliver with status blocked and the measured evidence (what you sent,
what arrived), and make no further attempt – Artwork_1 then takes it to the Betreiber.

- file: mara-lindqvist-1.jpg
  card: mara-lindqvist
  prompt: "A painted scene in muted colours. A woman in her late thirties with short dark-blond hair stands alone at a high window inside a quiet factory hall at two in the morning, a few papers in one hand, looking down at rows of still machines and stacks of plain grey metal housings. Beyond the window a wide, flat horizon of fields and a few distant lights under a dark sky. One light source only: a single desk lamp behind her. Wide 4:3 landscape format. No text, no letters, no numbers, no signs, no logos, no brand names."

- file: aisha-benali-1.jpg
  card: aisha-benali
  prompt: "A painted scene in muted colours. A woman of about fifty with dark hair tied back sits alone at a long, empty laboratory table in the early morning, bent over an old, faded pencil drawing of a machine, with no writing on it, under a magnifying glass; dark screens stand switched off around her. A tall window behind her opens onto a wide valley horizon with mountains in pale morning haze. One light source only: the low sun through the window. Wide 4:3 landscape format. No text, no letters, no numbers, no signs, no logos, no brand names."

- file: tomas-reyes-1.jpg
  card: tomas-reyes
  prompt: "A painted scene in muted colours. A man in his mid-forties with greying stubble stands at the single window of a small flat crowded with stacked books with plain spines, a cup in his hand, looking out over a wide river at dusk with a low city horizon beyond. One light source only: the last light of the evening sky over the river. Wide 4:3 landscape format. No text, no letters, no numbers, no signs, no logos, no brand names."

Artwork_1 · #009 · K0 · 2026-11-05 23:07 CET (measured)
