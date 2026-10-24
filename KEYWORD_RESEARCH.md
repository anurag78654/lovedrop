# LoveDrop — Keyword Research (SEO-2)

> Method: Google autocomplete harvesting (suggestqueries API) — suggestions are ranked by
> real query popularity, so they reveal what people actually type. Volume/Difficulty tiers are
> **estimates**; verify exact numbers free in Google Ads Keyword Planner before committing.

---

## 1. The 5 concepts (learning)

| Concept | Meaning | Why it matters |
|---|---|---|
| **Search intent** | Why someone searches: *do* (make a letter), *learn* (ideas/examples), *buy* (gift) | A "maker" page must let them create instantly; an "ideas" page must inform |
| **Volume** | Searches/month | High volume = traffic, but usually harder to rank |
| **Difficulty** | How strong the competing pages are | New sites should start with Low difficulty |
| **Long-tail** | 4+ word phrases (`open when letters for boyfriend long distance`) | Lower volume, but **much** easier to rank + higher conversion |
| **Cluster** | Group of keywords around one topic → one page | One strong page beats ten thin pages |

**Rule for a new site:** rank for 10 low-difficulty long-tails first. Authority grows → head terms follow.

---

## 2. Keyword map (from real autocomplete data)

### Cluster A — Generic "virtual letter maker" (HIGH priority)
| Keyword | Intent | Est. volume | Est. difficulty |
|---|---|---|---|
| virtual love letter | Do | High | Medium |
| virtual love letter maker free | Do | Medium | Low |
| virtual love letter website free | Do | Medium | Low |
| digital love letter website free | Do | Low-Med | **Very low** |
| digital love letter maker online free | Do | Low | **Very low** |
| love letter maker online free | Do | High | Medium |
| love letter maker online free with music | Do | Medium | **Low** |
| send letter online free | Do | High | Medium-High |
| send letter online in india | Do | Medium | Low-Med |

→ **Pages:** `/` (home) + `/love-letter-maker`

### Cluster B — "Open when" letters (BIGGEST opportunity)
| Keyword | Intent | Est. volume | Est. difficulty |
|---|---|---|---|
| open when letters | Learn+Do | Very high | High (Pinterest dominates) |
| open when letters website | Do | Medium | **Low** |
| open when letters online | Do | Medium | **Low** |
| open when letters for him | Do | High | Medium |
| open when letters for boyfriend long distance | Do | Medium | **Very low** |
| open when letters ideas | Learn | High | Medium |
| open when letter ideas for him | Learn | Medium | Low |

→ **Pages:** `/open-when` (tool page) + blog post "100 Open When Letter Ideas"

### Cluster C — Long distance (QUICK WINS)
| Keyword | Intent | Est. volume | Est. difficulty |
|---|---|---|---|
| long distance letter website | Do | Low-Med | **Very low** |
| long distance letter online | Do | Low | **Very low** |
| long distance letter for him / for her | Do | Medium | Low |
| long distance letter to boyfriend | Do | Medium | Low |
| long distance letter ideas | Learn | Medium | Low |

→ **Pages:** `/long-distance` + blog post "Long Distance Letter Ideas"

### Cluster D — Occasion pages (seasonal gold)
| Keyword | Intent | Est. volume | Est. difficulty |
|---|---|---|---|
| valentine letter online free | Do | High (seasonal) | Medium |
| valentine card online link | Do | Medium | Low-Med |
| birthday letter online free | Do | Medium | Low |
| birthday wishes online link | Do | Medium | Low |
| friendship letter online | Do | Low | **Very low** |
| letter for best friend online | Do | Low | **Very low** |

→ **Pages:** `/valentine`, `/birthday`, `/friendship`

### Cluster E — Emotional niches (low competition, high share-ability)
| Keyword | Intent | Est. volume | Est. difficulty |
|---|---|---|---|
| anonymous love letter website | Do | Low-Med | **Low** |
| letter to crush online | Do | Low | **Very low** |
| letter to crush expressing feelings | Learn | Medium | Low |
| sorry letter online free | Do | Medium | Low-Med |
| apology letter to girlfriend | Learn | High | Medium |
| letters to future self website | Do | Low | **Very low** |

→ **Pages:** `/anonymous-letter`, `/sorry-letter` + blog posts (crush, apology examples)

### Cluster F — Feature keywords (differentiators = few competitors)
| Keyword | Intent | Est. volume | Est. difficulty |
|---|---|---|---|
| letter with music website free | Do | Low | **Very low** |
| virtual letter with music free | Do | Low | **Very low** |
| letter with music notes | Learn | Low | Very low |

→ **Page:** `/letter-with-music` (feature landing page)

---

## 3. Page architecture (blueprint for SEO-3)

| URL | Target cluster | H1 idea |
|---|---|---|
| `/` | A (brand + broad) | Send a Beautiful Virtual Letter — Free |
| `/love-letter-maker` | A | Free Love Letter Maker — Create Yours in 2 Minutes |
| `/open-when` | B | Open When Letters — Create Yours Online |
| `/long-distance` | C | Letters for Long Distance Relationships |
| `/valentine` | D | Free Valentine Letter Online |
| `/birthday` | D | Free Birthday Letter Online |
| `/friendship` | D | Letter for Your Best Friend |
| `/anonymous-letter` | E | Send an Anonymous Love Letter |
| `/sorry-letter` | E | Free Sorry / Apology Letter |
| `/letter-with-music` | F | Send a Letter With Music |

Each page: unique title/meta (60/155 chars), single H1, 300–500 words of helpful copy,
one CTA to `/create`, internal links to 2–3 related pages.

---

## 4. Priority order (difficulty first = fastest wins)

**Wave 1 (weeks 1–4):** `/long-distance`, `/letter-with-music`, `/open-when`, `/anonymous-letter`
**Wave 2 (months 1–2):** `/love-letter-maker`, `/birthday`, `/friendship`, `/sorry-letter`
**Wave 3 (before Dec for Valentine's):** `/valentine` + Valentine blog content
**Ongoing:** content posts from clusters B, C, E (they feed traffic to the tools)

---

## 5. Verify volumes free (do this yourself, 10 min)
1. https://ads.google.com/home/tools/keyword-planner/ (free, no campaign needed) → paste keywords → see Avg. monthly searches + Competition
2. https://trends.google.com → compare seasonal interest (e.g. "valentine letter" spikes in Feb)
3. After 2–4 weeks: Search Console → **Performance** → see which queries actually bring impressions

## 6. Technical note
These landing pages are client-rendered in a React SPA. Google renders JS, so they can rank, but
for maximum reliability we may later add build-time prerendering of these static marketing pages.
Decide in SEO-3 after the first pages are live.
