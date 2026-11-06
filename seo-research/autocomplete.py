"""Expand seed keywords with Google autocomplete (real queries people type).

Usage: python -I autocomplete.py seeds.txt autocomplete.csv
Free, no login. Polite: one request every ~0.4 s.
"""
import csv
import json
import sys
import time
import urllib.parse
import urllib.request

PATTERNS = ["{s}", "{s} for", "{s} vs", "how to {s}", "best {s}", "{s} cost", "{s} services"]
URL = "https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=us&q="


def suggest(q):
    req = urllib.request.Request(URL + urllib.parse.quote(q), headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=10) as r:
        return json.loads(r.read().decode("utf-8", "replace"))[1]


def main(seed_file, out_file):
    seeds = [l.strip() for l in open(seed_file, encoding="utf-8") if l.strip()]
    rows, seen = [], set()
    for seed in seeds:
        for p in PATTERNS:
            q = p.format(s=seed)
            try:
                results = suggest(q)
            except Exception as e:  # keep going on a single failure
                print("fail", q, e, file=sys.stderr)
                results = []
            for kw in results:
                kw = kw.strip().lower()
                if kw and kw not in seen:
                    seen.add(kw)
                    rows.append({"keyword": kw, "seed": seed, "query": q})
            time.sleep(0.4)
    with open(out_file, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["keyword", "seed", "query"])
        w.writeheader()
        w.writerows(rows)
    print(f"{len(rows)} unique suggestions from {len(seeds)} seeds")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
