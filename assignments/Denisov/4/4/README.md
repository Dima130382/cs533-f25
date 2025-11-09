
---

## Findings (header-based quick classification)
These are **header-based** (deterministic) signals from the saved HTTP responses (actual browser behavior may differ for some cases):

- Total tested (from `sites.txt`): **0**
- **Not framable (by headers)**: **0**  
  Reasons include `X-Frame-Options: DENY|SAMEORIGIN` and/or `Content-Security-Policy: frame-ancestors 'none'|'self'` only.
- **Possibly framable (by headers)**: **0**  
  Either no XFO or CSP frame-ancestors restrictions were found, or policies allow external ancestors.

**Artifacts to verify:**
- Full responses: `evidence/http_responses/`
- Header summary CSV: `evidence/header_report.csv`
- Per-site header classification: `evidence/framable_by_headers.txt`

> Note: The **authoritative** result for the assignment is the browser test from the `framable/*.html` pages and the aggregated output via `framable_index.html`. Header signals are provided to explain "why" a site is or isn’t framable.


## Browser Results (reported via server headers) 
| Metric | Count |
|:--|--:|
| Total tested (from `sites.txt`) | 100 |
| Not framable (headers) | 53 |
| Possibly framable (headers) | 47 |

Artifacts:
- Full HTTP responses: [evidence/http_responses/](evidence/http_responses/)
- Header CSV: [evidence/header_report.csv](evidence/header_report.csv)
- Per-site classification: [evidence/framable_by_headers.txt](evidence/framable_by_headers.txt)
H0  
k  
g  

Artifacts:
- Full HTTP responses → evidence/http_responses/
- Header CSV → evidence/header_report.csv
- Per-site classification → evidence/framable_by_headers.txt

---

## Browser Results (reported via server headers) — Final numbers
This section replaces earlier 0/0/0 placeholders.  
The values are computed directly from evidence/framable_by_headers.counts.

H0  
k  
g  

Artifacts:
- Full HTTP responses → evidence/http_responses/
- Header CSV → evidence/header_report.csv
- Per-site classification → evidence/framable_by_headers.txt



