#!/usr/bin/env python3
"""Nowhere – card check. Reads one Markdown file per card, checks the head against the card format
(technik/technik.md, "Card format – draft 2": draft 1 plus the German fields title_de, text_de and a
"--- de ---" line on the back) and writes app/cards.json.

Usage:  python3 technik/tools/cards.py [source-dir] [--out app/cards.json]
Default source: karten/ (written by Spiel_1); if that folder has no cards, technik/karten-test/.
Exit code 1 if any card has an error; cards.json is then not written. Needs PyYAML.

Owner: role Spiel, instance Spiel_2 (digifil-solutions/betrieb/rollen/spiel.md).
"""
import datetime
import json
import os
import re
import subprocess
import sys
from pathlib import Path

try:
    import yaml
except ImportError:  # pragma: no cover
    sys.exit("PyYAML missing: pip install pyyaml")

HERE = Path(__file__).resolve().parent
TECHNIK = HERE.parent
NOWHERE = TECHNIK.parent
SOURCES = [NOWHERE / "karten", TECHNIK / "karten-test"]
OUT = TECHNIK / "app" / "cards.json"

KINDS = {"event", "person", "possession", "character", "place", "goal", "thread"}
# Prototype 4 – the weave (post/spiel/036 item 3, 038): an event names its thread(s) and its part in it
PARTS = {"opens", "continues", "turns", "closes"}
SKILL_RE = re.compile(r"^[a-z][a-z0-9-]*$")   # the skill list is open: new words come with the cards (036 item 2)
SKILLS = {"persuasion", "deception", "intimidation", "insight", "performance", "languages", "stealth", "sleight-of-hand",
          "athletics", "survival", "perception", "technology", "medicine", "science", "history", "investigation", "religion",
          "finance"}
MEASURES = {"money", "influence", "status", "possessions", "contacts", "team", "personal"}
BLOCKS = {"europe", "usa", "russia", "china", "india"}
WHO_RE = re.compile(r"^(self|anyone|self\+1|mate|child|profession:[a-z0-9-]+)$")   # mate/child: the household (P4, 054)
REACH = {"global", "personal"}  # plus block:<name>
ORIGINS = {"always", "skill", "profession", "trait", "block", "associate", "possession", "status", "flag", "contact", "month", "until",
           "acquired", "mate", "child"}   # P4: acquired:<x>, mate:<trait|any>, child:<age> (post/spiel/053, 054)
EFFECTS = {"money", "influence", "status", "block", "trait", "acquired", "associate-to-contact", "gain", "lose",
           "open", "close", "flag", "follow", "join"}   # join:<person> – into the team (P4, post/spiel/044)
COSTS = {"draws", "money", "influence"}
ID_RE = re.compile(r"^[a-z0-9][a-z0-9-]*$")
# trait words: karten/README.md is the source; this list mirrors it (engine.js OPPOSITES too)
TRAITS = {"brave", "craven", "honest", "cunning", "gregarious", "shy", "ambitious", "content", "generous", "greedy",
          "patient", "impatient", "trusting", "suspicious", "just", "arbitrary", "faithful", "cynical", "calm", "wrathful",
          "compassionate", "cruel", "curious", "indifferent", "loyal", "opportunistic", "innovator", "preserver",
          "globalist", "patriot", "wise"}
NAME_RE = re.compile(r"^[a-z0-9][a-z0-9-]*$")


def split(text):
    """Head (YAML between --- lines) and body."""
    m = re.match(r"^---\n(.*?)\n---\n?(.*)$", text, re.S)
    if not m:
        return None, text
    return m.group(1), m.group(2)


def check_condition(c, where, errors):
    """Origins and requires: always | <form>:<name>[:<n>]."""
    if not isinstance(c, str):
        errors.append(f"{where}: must be a string, got {c!r}")
        return
    if c == "always":
        return
    if c.startswith("not:"):   # not:flag:<x>, not:acquired:<x> – a condition that something did not happen (053)
        c = c[4:]
    parts = c.split(":")
    form = parts[0]
    if form not in ORIGINS or form == "always":
        errors.append(f"{where}: unknown origin form '{form}' in '{c}'")
        return
    if form == "child":
        if len(parts) != 2 or not parts[1].isdigit():
            errors.append(f"{where}: child needs child:<age>, got '{c}'")
        return
    if len(parts) < 2 or not NAME_RE.match(parts[1]):
        errors.append(f"{where}: '{c}' needs a lowercase name after '{form}:'")
    if form in ("month", "until"):
        if len(parts) != 2 or not parts[1].isdigit() or not 1 <= int(parts[1]) <= 12:
            errors.append(f"{where}: {form} needs {form}:<1–12>, got '{c}'")
        return
    if form == "status":
        if len(parts) != 3 or not parts[2].isdigit():
            errors.append(f"{where}: status needs status:<block>:<min>, got '{c}'")
    elif len(parts) != 2:
        errors.append(f"{where}: '{c}' has too many parts")


def check_effect(e, where, errors):
    if not isinstance(e, str):
        errors.append(f"{where}: must be a string, got {e!r}")
        return
    parts = e.split(":")
    form = parts[0]
    if form not in EFFECTS:
        errors.append(f"{where}: unknown effect '{form}' in '{e}'")
        return
    def num(s):
        return re.fullmatch(r"[+-]?\d+", s) is not None
    ok = True
    if form in ("money", "influence"):
        ok = len(parts) == 2 and num(parts[1])
    elif form in ("status", "block"):
        ok = len(parts) == 3 and NAME_RE.match(parts[1]) and num(parts[2])
    elif form == "trait":
        ok = len(parts) == 2 and re.fullmatch(r"[+-][a-z0-9-]+", parts[1]) is not None
    elif form == "acquired":
        ok = len(parts) == 2 and re.fullmatch(r"\+[a-z0-9-]+", parts[1]) is not None
    elif form == "associate-to-contact":
        ok = len(parts) == 3 and ID_RE.match(parts[1]) and parts[2].isdigit()
    elif form in ("gain", "lose", "open", "close", "flag"):
        ok = len(parts) == 2 and NAME_RE.match(parts[1]) is not None
    elif form == "follow":
        ok = len(parts) == 3 and ID_RE.match(parts[1]) and parts[2].isdigit()
    if not ok:
        errors.append(f"{where}: malformed effect '{e}'")


def thread_length(v, w, errors):
    """length of a thread: a number, or text like "4–6" or "6 beats" – the largest number counts."""
    if isinstance(v, int) and v >= 1:
        return v
    nums = [int(x) for x in re.findall(r"\d+", str(v or ""))]
    if not nums:
        errors.append(f"{w}: length must be a number of cards (or a range like 4–6)")
        return 0
    return max(nums)


def threads_from_tables(errors):
    """Until the thread cards exist (karten/threads/, Spiel_1), the definitions come from the tables in
    threads/*.md: | id | question | endings | length | cards |. Endings are split at ' · '."""
    out = []
    for md in sorted((NOWHERE / "threads").glob("*.md")) if (NOWHERE / "threads").is_dir() else []:
        stack = md.stem
        for line in md.read_text(encoding="utf-8").splitlines():
            cells = [c.strip() for c in line.strip().strip("|").split("|")]
            if len(cells) < 5 or not NAME_RE.match(cells[0]) or cells[0] == "id":
                continue
            endings = [re.sub(r"\s*\(`[^`]*`\)", "", e).strip() for e in cells[2].split(" · ") if e.strip()]
            out.append({"id": cells[0], "kind": "thread", "stack": stack, "title": cells[0].replace("-", " ").capitalize(),
                        "question": cells[1], "endings": endings, "length": thread_length(cells[3], md.name, errors),
                        "from_table": md.name})
    return out


def check_card(path, head, body, errors):
    w = path.name
    if not isinstance(head, dict):
        errors.append(f"{w}: head is not a mapping")
        return None
    cid = head.get("id")
    if not isinstance(cid, str) or not ID_RE.match(cid):
        errors.append(f"{w}: id missing or not lowercase-with-hyphens")
    elif cid != path.stem:
        errors.append(f"{w}: id '{cid}' must equal the file name")
    kind = head.get("kind")
    if kind not in KINDS:
        errors.append(f"{w}: kind must be one of {sorted(KINDS)}")
    if not isinstance(head.get("title"), str) or not head["title"].strip():
        errors.append(f"{w}: title missing")
    if "title_de" in head and (not isinstance(head["title_de"], str) or not head["title_de"].strip()):
        errors.append(f"{w}: title_de must be text (or left out)")
    if "picture" not in head:
        errors.append(f"{w}: picture missing (may be empty)")
    if kind == "goal" and "stack" not in head:
        head["stack"] = "goals"
    if kind == "thread" and "stack" not in head:
        head["stack"] = "threads"
    # the weave: thread (a name or a list of names) and part, on any card that is not a thread itself
    if kind != "thread" and ("thread" in head or "part" in head):
        th = head.get("thread")
        th = [th] if isinstance(th, str) else th
        if not isinstance(th, list) or not th or not all(isinstance(t, str) and NAME_RE.match(t) for t in th):
            errors.append(f"{w}: thread must be a name or a list of names")
        else:
            head["thread"] = th
        pt = head.get("part")
        # a crossing may say its part per thread: part: {the-secret: closes, europe-at-the-table: opens}
        if isinstance(pt, dict):
            if not isinstance(th, list) or set(pt) != set(th) or not all(v in PARTS for v in pt.values()):
                errors.append(f"{w}: part per thread needs every thread of the card, each one of {sorted(PARTS)}")
        elif pt not in PARTS:
            errors.append(f"{w}: part must be one of {sorted(PARTS)} or one per thread (with thread)")
    if not isinstance(head.get("stack"), str) or not NAME_RE.match(head["stack"]):
        errors.append(f"{w}: stack missing or not a lowercase name")
    if "beat" in head and not (isinstance(head["beat"], int) and 1 <= head["beat"] <= 12):
        errors.append(f"{w}: beat must be a month 1–12")
    req = head.get("requires", [])
    if not isinstance(req, list):
        errors.append(f"{w}: requires must be a list")
    else:
        for i, c in enumerate(req):
            check_condition(c, f"{w}: requires[{i}]", errors)

    if kind == "event":
        reach = head.get("reach")
        if not (reach in REACH or (isinstance(reach, str) and re.fullmatch(r"block:[a-z0-9-]+", reach))):
            errors.append(f"{w}: reach must be global | personal | block:<name>")
        imp = head.get("impact")
        if not isinstance(imp, int) or not 1 <= imp <= 5:
            errors.append(f"{w}: impact must be 1–5")
        # format draft 3 (time flow, Prototype 2) – all optional, defaults in the engine
        if "who" in head and not (isinstance(head["who"], str) and WHO_RE.match(head["who"])):
            errors.append(f"{w}: who must be self | anyone | self+1 | mate | child | profession:<x>")
        if "takes" in head and not (isinstance(head["takes"], int) and 0 <= head["takes"] <= 13):
            errors.append(f"{w}: takes must be 0–13 (weeks)")
        # an option may say its own time and strength (P4, post/spiel/052 item 1)
        for i, o in enumerate(head.get("options") or []):
            if isinstance(o, dict) and "takes" in o and not (isinstance(o["takes"], int) and 0 <= o["takes"] <= 13):
                errors.append(f"{w}: option {i + 1} takes must be 0–13 (weeks)")
            if isinstance(o, dict) and "costs" in o and o["costs"] not in (0, 1):
                errors.append(f"{w}: option {i + 1} costs must be 0 or 1")
            # the ending a closing option brings, shown on the thread (post/spiel/061 item 3)
            if isinstance(o, dict) and "ending" in o and not (isinstance(o["ending"], str) and 0 < len(o["ending"]) <= 60):
                errors.append(f"{w}: option {i + 1} ending must be a text of at most 60 characters")
        if "costs" in head and head["costs"] not in (0, 1):
            errors.append(f"{w}: costs must be 0 or 1 (draft resource)")
        if "expires" in head and not (isinstance(head["expires"], int) and 1 <= head["expires"] <= 52):
            errors.append(f"{w}: expires must be 1–52 (weeks on the board)")
        if "arrives" in head and head["arrives"] not in ("board", "draw"):
            errors.append(f"{w}: arrives must be board or draw")
        if "place" in head and not (isinstance(head["place"], str) and NAME_RE.match(head["place"])):
            errors.append(f"{w}: place must be home, a block, a possession id or a place id")
        opts = head.get("options")
        if not isinstance(opts, list) or not opts:
            errors.append(f"{w}: options missing")
        else:
            # the concept's "wait": one option that is always there and costs nothing but the draw
            if not any(isinstance(o, dict) and o.get("origin") == "always"
                       and not any((o.get("cost") or {}).get(k) for k in ("money", "influence")) for o in opts):
                errors.append(f"{w}: needs one option with origin 'always' and no money/influence cost")
            for i, o in enumerate(opts):
                where = f"{w}: options[{i}]"
                if not isinstance(o, dict):
                    errors.append(f"{where}: not a mapping"); continue
                if not isinstance(o.get("text"), str) or not o["text"].strip():
                    errors.append(f"{where}: text missing")
                if "text_de" in o and (not isinstance(o["text_de"], str) or not o["text_de"].strip()):
                    errors.append(f"{where}: text_de must be text (or left out)")
                check_condition(o.get("origin"), f"{where}.origin", errors)
                cost = o.get("cost", {})
                if cost is None:
                    cost = {}
                if not isinstance(cost, dict):
                    errors.append(f"{where}: cost must be a mapping")
                else:
                    for k, v in cost.items():
                        if k not in COSTS or not isinstance(v, int) or v < 0 or (k == "draws" and v < 1):
                            errors.append(f"{where}: cost {k}={v!r} (allowed: money, influence ≥ 0; draws ≥ 1 = total draws incl. the draw itself)")
                o["cost"] = cost
                eff = o.get("effects", [])
                if eff is None:
                    eff = []
                if not isinstance(eff, list):
                    errors.append(f"{where}: effects must be a list")
                else:
                    for j, e in enumerate(eff):
                        check_effect(e, f"{where}.effects[{j}]", errors)
                o["effects"] = eff
                # Prototype 3: a check with chance – success = effects, partial, failure (post/spiel/028)
                if "check" in o:
                    ck = o["check"]
                    if not isinstance(ck, dict) or not (isinstance(ck.get("skill"), str) and SKILL_RE.match(ck["skill"])) or not (isinstance(ck.get("difficulty"), int) and 1 <= ck["difficulty"] <= 5):
                        errors.append(f"{where}: check needs {{skill: <skill>, difficulty: 1-5}} (optional trait)")
                    elif "trait" in ck and ck["trait"] not in TRAITS:
                        errors.append(f"{where}: check trait '{ck['trait']}' is not a trait word")
                for key in ("partial", "failure"):
                    if key in o:
                        if "check" not in o:
                            errors.append(f"{where}: {key} without check")
                        lst = o[key] if isinstance(o[key], list) else None
                        if lst is None:
                            errors.append(f"{where}: {key} must be a list of effects")
                        else:
                            for j, e in enumerate(lst):
                                check_effect(e, f"{where}.{key}[{j}]", errors)
    elif kind in ("person", "character"):
        for f in ("name", "profession", "block"):
            if not isinstance(head.get(f), str) or not head[f].strip():
                errors.append(f"{w}: {f} missing")
        for f in ("skills", "traits"):
            if not isinstance(head.get(f), list) or not all(isinstance(x, str) for x in head[f]):
                errors.append(f"{w}: {f} must be a list of names")
        if kind == "person" and not (2 <= len(head.get("traits") or []) <= 3):
            errors.append(f"{w}: a person has 2–3 traits")
        for t in head.get("traits") or []:
            if isinstance(t, str) and t not in TRAITS:
                errors.append(f"{w}: unknown trait '{t}' (see karten/README.md)")
        if not isinstance(head.get("age"), int):
            errors.append(f"{w}: age must be a number")
        head.setdefault("acquired", [])
        if kind == "character":
            if not isinstance(head.get("associates"), list) or len(head["associates"]) != 3:
                errors.append(f"{w}: character needs exactly 3 associates (ids)")
            if not isinstance(head.get("contacts"), list) or len(head["contacts"]) != 2:
                errors.append(f"{w}: character needs exactly 2 contacts (ids)")
            bv = head.get("block_values")
            if not isinstance(bv, dict) or set(bv) != {"economic", "military", "cultural", "technological"} \
                    or not all(isinstance(v, int) and 1 <= v <= 10 for v in bv.values()):
                errors.append(f"{w}: block_values needs economic, military, cultural, technological (1–10)")
            # two or three (Betreiber 09.11., 21:36: "No third one for USA. The game has to understand 2.")
            if not isinstance(head.get("block_traits"), list) or len(head["block_traits"]) not in (2, 3):
                errors.append(f"{w}: block_traits needs 2 or 3 names")
            for f in ("money", "influence", "status"):
                if not isinstance(head.get(f), int):
                    errors.append(f"{w}: {f} start value missing")
    elif kind == "thread":
        # Prototype 4: a thread is a question the story asks and answers over a few cards (post/spiel/036 item 3)
        if not isinstance(head.get("question"), str) or not head["question"].strip():
            errors.append(f"{w}: question missing")
        en = head.get("endings")
        if not isinstance(en, list) or not en or not all(isinstance(x, str) and x.strip() for x in en):
            errors.append(f"{w}: endings must be a list of texts")
        head["length"] = thread_length(head.get("length"), w, errors)
    elif kind == "goal":
        # Prototype 3: one goal per game – measure + target
        m = head.get("measure")
        if not (m in MEASURES or (isinstance(m, str) and re.fullmatch(r"flag:[a-z0-9-]+", m))):
            errors.append(f"{w}: measure must be one of {sorted(MEASURES)} or flag:<name>")
        if not (isinstance(head.get("target"), int) and head["target"] >= 1):
            errors.append(f"{w}: target must be a whole number ≥ 1")
    elif kind == "place":
        # format draft 3: a place card – Toronto, the submarine; `block` = where it lies (none = outside the blocks)
        if not isinstance(head.get("name"), str) or not head["name"].strip():
            errors.append(f"{w}: name missing")
        if head.get("block") not in BLOCKS | {"none"}:
            errors.append(f"{w}: block must be one of {sorted(BLOCKS)} or none")
    elif kind == "possession":
        for f in ("name", "type"):
            if not isinstance(head.get(f), str) or not head[f].strip():
                errors.append(f"{w}: {f} missing")
        gives = head.get("gives", [])
        if not isinstance(gives, list):
            errors.append(f"{w}: gives must be a list")
        else:
            for i, g in enumerate(gives):
                if not isinstance(g, str) or not re.fullmatch(r"(skill:[a-z0-9-]+|option:.+)", g):
                    errors.append(f"{w}: gives[{i}] must be skill:<name> or option:<text>")
        head["gives"] = gives
    # back side: English, then optionally a line "--- de ---" and the German
    parts = re.split(r"^\s*---\s*de\s*---\s*$", body, maxsplit=1, flags=re.M)
    head["back"] = parts[0].strip()
    if len(parts) > 1:
        head["back_de"] = parts[1].strip()
        if not head["back_de"]:
            errors.append(f"{w}: '--- de ---' with nothing after it")
    return head


# ---------- rounds.json for the overview page (Betreiber 07.11., 19:07: "Anzahl der gespielten Runden") ----------
ORDINALS = {"first": 1, "second": 2, "third": 3, "fourth": 4, "fifth": 5, "sixth": 6, "seventh": 7, "eighth": 8,
            "ninth": 9, "tenth": 10}


def build_rounds(out_dir):
    """Rounds per prototype: played = the playthroughs written up in the concept (Spiel_1 adds a heading per game the
    Betreiber hands in); tests = the sum of technik/tests/runs.jsonl."""
    protos = {1: {"played": [], "tests": {}}, 2: {"played": [], "tests": {}}, 3: {"played": [], "tests": {}}}
    head = re.compile(r"^##+ (?=.*\bplaythrough\b)(?=.*\bPrototype (?P<n>\d)\b)(?P<rest>.*)$", re.I)
    for md in sorted(NOWHERE.glob("*.md")):
        for line in md.read_text(encoding="utf-8").splitlines():
            m = head.match(line)
            if not m:
                continue
            n = int(m.group("n"))
            date = re.search(r"\((\d{2}\.\d{2}\.\d{4})", m.group("rest") or "")
            who = re.search(r"\d\d:\d\d(?:–\d\d:\d\d)?, ([A-Z][a-zé]+(?: [A-Z][a-z]+)?)", m.group("rest") or "")
            protos.setdefault(n, {"played": [], "tests": {}})["played"].append(
                {"title": line.lstrip("# ").strip(), "date": date.group(1) if date else "", "character": who.group(1) if who else "", "file": md.name})
    ledger = TECHNIK / "tests" / "runs.jsonl"
    if ledger.is_file():
        for line in ledger.read_text(encoding="utf-8").splitlines():
            try:
                r = json.loads(line)
            except ValueError:
                continue
            t = protos.setdefault(int(r.get("prototype", 0)), {"played": [], "tests": {}})["tests"]
            k = r.get("kind", "sim")
            t[k] = t.get(k, 0) + int(r.get("rounds", 0))
            t["runs"] = t.get("runs", 0) + 1
            if r.get("backfill"):
                t["approx"] = True
            t["last"] = max(t.get("last", ""), r.get("at", ""))
    data = {"built": datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%MZ"),
            "prototypes": {str(k): v for k, v in sorted(protos.items())}}
    (out_dir / "rounds.json").write_text(json.dumps(data, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    return data


def main(argv):
    out = OUT
    args = [a for a in argv]
    if "--out" in args:
        i = args.index("--out"); out = Path(args[i + 1]); del args[i:i + 2]
    sources = [Path(args[0])] if args else SOURCES
    src = None
    for s in sources:
        if s.is_dir() and any(s.glob("*.md")):
            src = s; break
    if src is None:
        sys.exit(f"no cards found in {', '.join(str(s) for s in sources)}")
    # one level of subfolders too (goals/ – Prototype 3)
    files = sorted(p for p in list(src.glob("*.md")) + list(src.glob("*/*.md")) if p.name.upper() != "README.MD")
    errors, cards = [], []
    for p in files:
        text = p.read_text(encoding="utf-8")
        head_txt, body = split(text)
        if head_txt is None:
            errors.append(f"{p.name}: no YAML head between --- lines"); continue
        try:
            head = yaml.safe_load(head_txt)
        except yaml.YAMLError as e:
            errors.append(f"{p.name}: YAML error: {e}"); continue
        card = check_card(p, head, body, errors)
        if card:
            cards.append(card)
    ids = [c["id"] for c in cards]
    for d in sorted({i for i in ids if ids.count(i) > 1}):
        errors.append(f"id '{d}' used more than once")
    known = set(ids)
    # trait effects and origins use the same words
    for c in cards:
        for o in c.get("options") or []:
            for e in o["effects"]:
                if e.startswith("trait:") and e[7:] not in TRAITS:
                    errors.append(f"{c['id']}: effect '{e}' uses an unknown trait (see karten/README.md)")
            if str(o.get("origin", "")).startswith("trait:") and o["origin"][6:] not in TRAITS:
                errors.append(f"{c['id']}: origin '{o['origin']}' uses an unknown trait")
        for r in c.get("requires") or []:
            if str(r).startswith("trait:") and r[6:] not in TRAITS:
                errors.append(f"{c['id']}: requires '{r}' uses an unknown trait")
    # a follow: target that only schedules itself can never be drawn
    scheduled_by = {}
    for c in cards:
        for o in c.get("options") or []:
            for e in o["effects"]:
                if e.startswith("follow:"):
                    scheduled_by.setdefault(e.split(":")[1], set()).add(c["id"])
    for target, by in scheduled_by.items():
        if by == {target}:
            errors.append(f"{target}: is a follow-up only of itself, so it can never be drawn")
    beats = {}
    for c in cards:
        if c.get("beat"):
            beats.setdefault((c["stack"], c["beat"]), []).append(c["id"])
    for m, ids in beats.items():
        if len(ids) > 1:
            errors.append(f"{m[0]}: month {m[1]} has more than one beat card: {', '.join(ids)}")
    places_ok = {"home"} | BLOCKS | {c["id"] for c in cards if c["kind"] in ("place", "possession")}
    for c in cards:
        if c.get("place") and c["place"] not in places_ok:
            errors.append(f"{c['id']}: place '{c['place']}' is not home, a block, a possession or a place card")
    for c in cards:
        for f in ("associates", "contacts"):
            for ref in c.get(f) or []:
                if ref not in known:
                    errors.append(f"{c['id']}: {f} refers to unknown card '{ref}'")
        for o in c.get("options") or []:
            for e in o["effects"]:
                parts = e.split(":")
                if parts[0] in ("gain", "lose", "follow", "associate-to-contact") and parts[1] not in known:
                    errors.append(f"{c['id']}: effect '{e}' refers to unknown card '{parts[1]}'")
    # the weave: thread cards (or, until they exist, the tables in threads/) – every thread a card names is defined
    threads = [c for c in cards if c["kind"] == "thread"]
    cards = [c for c in cards if c["kind"] != "thread"]
    if not threads:
        threads = threads_from_tables(errors)
    defined = {t["id"] for t in threads}
    used = set()
    for c in cards:
        for t in c.get("thread") or []:
            used.add(t)
            if defined and t not in defined:
                errors.append(f"{c['id']}: thread '{t}' is not defined (kind: thread in karten/threads/)")
    for t in threads:
        t["cards"] = [c["id"] for c in cards if t["id"] in (c.get("thread") or [])]
    kinds = {k: sum(1 for c in cards if c["kind"] == k) for k in sorted(KINDS)}
    kinds["thread"] = len(threads)
    de = sum(1 for c in cards if c.get("back_de") or c.get("title_de"))
    print(f"source: {src}  cards: {len(cards)}  {kinds}  german: {de}")
    if errors:
        print(f"{len(errors)} error(s):")
        for e in errors:
            print("  " + e)
        return 1
    chars = [c for c in cards if c["kind"] == "character"]
    if len(chars) < 1:
        print("warning: no character card – the app cannot start a game")
    out.parent.mkdir(parents=True, exist_ok=True)
    version = (os.environ.get("GITHUB_SHA") or "")[:7]
    if not version:
        try:
            version = subprocess.run(["git", "-C", str(NOWHERE), "rev-parse", "--short=7", "HEAD"], capture_output=True,
                                     text=True, timeout=5).stdout.strip()
        except Exception:  # pragma: no cover
            version = ""
    built = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%MZ")
    # the author's brief (Spiel_1, autor-brief.md) travels with the cards to the own-AI author (p2/ai.js)
    brief_path = NOWHERE / "autor-brief.md"
    author_brief = ""
    if brief_path.is_file():
        text = brief_path.read_text(encoding="utf-8")
        i = text.find("## ")
        author_brief = (text[i:] if i >= 0 else text).strip()
    rounds = build_rounds(out.parent)
    print("rounds.json: " + ", ".join(f"P{k} played {len(v['played'])}, tests {v['tests'].get('sim', 0)}+{v['tests'].get('browser', 0)}"
                                      for k, v in rounds["prototypes"].items()))
    data = {"source": src.name, "test_data": src.name == "karten-test", "version": version, "built": built,
            "author_brief": author_brief, "threads": threads, "cards": cards}
    out.write_text(json.dumps(data, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    back = json.loads(out.read_text(encoding="utf-8"))
    assert len(back["cards"]) == len(cards), "read-back mismatch"
    print(f"written: {out} ({out.stat().st_size} bytes, read back ok)")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
