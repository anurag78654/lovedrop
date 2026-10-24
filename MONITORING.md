# LoveDrop — SEO Monitoring Playbook (SEO-5)

> Two routines: a **10-minute weekly check** and a **20-minute monthly review**.
> Automation: `npm run seo:check` validates the live site (robots, sitemap, every page, assets).

---

## Weekly (10 min) — every Sunday

1. `npm run seo:check` → must end with **"All checks passed"**
2. GSC → **Indexing → Pages** → is "Page indexed" trending up?
3. GSC → **Performance** → any new queries with impressions?
4. Done. Do not chase rankings yet.

**Rule:** don't request indexing for a URL more than once every 2 weeks.

---

## Monthly (20 min) — first Sunday of the month

1. **Indexed pages** — GSC → Pages. Compare vs. previous month. Growing = good.
2. **Performance report** — export/look at:
   - Queries with **impressions but position 8–20** → these are your best upgrade targets (edit the page: add a section, answer the query in an H2)
   - Queries with **position 1–5** → leave alone
   - High impressions + low CTR (<2%) → rewrite title/description
3. **Sitemap** — GSC → Sitemaps → "Last read" date recent?
4. **Core Web Vitals** — GSC → Experience → any URLs "Poor"? (usually none on a static site)
5. **Content** — publish 1–2 new posts from `CONTENT_PLAN.md`
6. Log the month in the table below.

---

## How to read the numbers

| Metric | Meaning | What to do |
|---|---|---|
| **Impressions** | Times your page appeared in search | Rising = Google trusts you more |
| **Clicks** | Visits from search | Rising = titles are working |
| **CTR** | Clicks ÷ impressions | <2% with good position → rewrite title/description |
| **Position** | Average rank | 8–20 = closest to page 1 → improve that page |
| **Indexed pages** | Pages in Google's index | Should approach sitemap count (17 URLs) |

### Decision rules
- **Position 8–20 + impressions** → expand the page (add an H2 answering the exact query, add internal links)
- **Page not indexed after 4 weeks** → check GSC URL Inspection for the reason (noindex? canonical? soft 404?)
- **"Crawled – not indexed"** → usually site trust; publish more content, wait
- **"Excluded by noindex"** for `/letter/...` → ✅ correct, that's privacy working

---

## Red flags → fixes

| Symptom | Likely cause | Fix |
|---|---|---|
| `seo:check` fails on a URL | Deploy incomplete or route removed | Check Cloudflare deploy, route in `App.jsx` |
| Sitemap "could not be read" | Google fetched before deploy | Remove + re-add entry, wait 48–72h |
| All pages "Discovered – not indexed" | New site, low authority | Wait + keep publishing + internal links |
| Letter page indexed by Google | Regression in `seo.js` | Check `applyLetterMeta` robots noindex |
| Sudden impression drop | Algorithm update or broken page | Run `seo:check`, check GSC Errors |

---

## Monthly log (fill one row per month)

| Month | Indexed | Impressions | Clicks | Top query | Action taken |
|---|---|---|---|---|---|
| Oct 2026 | | | | | Site launched; 17 URLs submitted |
| Nov 2026 | | | | | |
| Dec 2026 | | | | | Valentine content live |
| Jan 2027 | | | | | |
| Feb 2027 | | | | | Valentine peak |

---

## Cadence summary

- **Weekly:** `npm run seo:check` + glance at GSC Pages/Performance
- **Monthly:** full review above + 1–2 new posts
- **Quarterly:** refresh the two oldest posts, re-check keyword map, prune anything thin
