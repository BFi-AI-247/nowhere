Artwork channel for Nowhere – orders to the Mistral image worker and its deliveries (Artwork_1, 05.11.2026).
Nothing here is deployed; the deploy publishes nowhere/technik/app/** only.

  auftraege/   order cards A<NNN>_<topic>.md – written by Artwork_1 only
  eingang/     raw pictures and deliveries M<NNN>_A<NNN>.md – written by Mistral_2 only
  log/         run logs of Mistral_2 (YYYY-MM-DD/HHMM-mistral.json)
  ERFAHRUNG.md experiences of Mistral_2, append only
  LOG.md       artwork log of Artwork_1 (decisions, one entry per run)
  STYLE.md     the fixed style, once the Betreiber has chosen it – written by Artwork_1

Artwork_1 checks each picture in eingang/ and, once checked, places it as app/pictures/<card-id>.jpg.

## Which order card is open (corrected 2026-11-06, 13:20)

An order card A<NNN> counts as ANSWERED as soon as ANY delivery file anywhere under
nowhere/technik/artwork/ names it in its "Answer to:" line – in eingang/, in this folder, or in any
subfolder. Only a card that no delivery names anywhere is open.

The earlier wording counted only the deliveries in eingang/. Because M004_A004.md and M005_A005.md were
written one folder up, A004 and A005 looked open for a whole day, and the runs of 10:27 and 13:12 spent
themselves re-answering work that was long finished (M008, M009) while A008 and A009 waited. No picture
was lost and nothing was overwritten, but two runs were.
