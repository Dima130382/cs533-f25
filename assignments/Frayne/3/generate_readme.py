import re
import os
import glob
import statistics
from collections import defaultdict, Counter, OrderedDict

RESP_DIR = "responses"
OUT_README = "README.md"

def parse_response_file(path):
    """
    Returns:
    {
      'site': <basename without .txt>,
      'final_status': <int or None>,
      'set_cookies': [full header strings],
      'parsed_cookies': [
          {'name':..., 'value':..., 'httponly':bool, 'secure':bool, 'samesite': 'Strict'|'Lax'|'None'|None, 'path': <value or None>, 'raw': <raw cookie header>}
      ]
    }
    """
    with open(path, 'r', errors='replace') as f:
        data = f.read()

    status_lines = re.findall(r'HTTP/[0-9.]+[^\r\n]*\r?\n', data, flags=re.IGNORECASE)
    final_status = None
    if status_lines:
        last = status_lines[-1]
        m = re.search(r'HTTP/[0-9.]+\s+(\d{3})', last)
        if m:
            final_status = int(m.group(1))

    set_cookie_headers = re.findall(r'(?im)^\s*Set-Cookie:\s*(.+)$', data, flags=re.MULTILINE)
    parsed = []
    for sc in set_cookie_headers:
        parts = [p.strip() for p in sc.split(';')]
        if len(parts) == 0:
            continue
        name_val = parts[0]
        if '=' in name_val:
            name, value = name_val.split('=', 1)
            name = name.strip()
            value = value.strip()
        else:
            name = name_val.strip()
            value = ''
        attrs = {}
        for attr in parts[1:]:
            if '=' in attr:
                k,v = attr.split('=',1)
                attrs[k.strip().lower()] = v.strip()
            else:
                attrs[attr.strip().lower()] = True

        parsed.append({
            'name': name,
            'value': value,
            'httponly': bool(attrs.get('httponly', False)),
            'secure': bool(attrs.get('secure', False)),
            'samesite': attrs.get('samesite', None) and attrs.get('samesite').capitalize(),
            'path': attrs.get('path', None),
            'raw': sc
        })

    return {
        'site': os.path.basename(path).rsplit('.txt',1)[0],
        'final_status': final_status,
        'set_cookie_headers': set_cookie_headers,
        'parsed_cookies': parsed
    }

def analyze_all():
    files = sorted(glob.glob(os.path.join(RESP_DIR, '*.txt')))
    results = []
    for f in files:
        results.append(parse_response_file(f))

    rows = []
    agg_cookies = []  
    cnt_httponly = 0
    cnt_secure = 0
    cnt_samesite = 0
    cnt_samesite_strict = 0
    cnt_samesite_lax = 0
    cnt_samesite_none = 0
    cnt_has_path = 0
    cnt_path_not_root = 0

    for r in results:
        unique_by_name = OrderedDict()
        for c in r['parsed_cookies']:
            if c['name'] not in unique_by_name:
                unique_by_name[c['name']] = c

        cookie_list = list(unique_by_name.values())
        num_cookies = len(cookie_list)
        agg_cookies.append(num_cookies)

        for c in cookie_list:
            if c['httponly']:
                cnt_httponly += 1
            if c['secure']:
                cnt_secure += 1
            if c['samesite']:
                cnt_samesite += 1
                st = c['samesite'].lower()
                if st == 'strict':
                    cnt_samesite_strict += 1
                elif st == 'lax':
                    cnt_samesite_lax += 1
                elif st == 'none':
                    cnt_samesite_none += 1
            if c['path'] is not None:
                cnt_has_path += 1
                if c['path'] != '/':
                    cnt_path_not_root += 1

        if num_cookies == 0:
            cookie_md = ''
        else:
            lines = []
            for c in cookie_list:
                attrs = []
                if c['httponly']:
                    attrs.append('HttpOnly')
                if c['secure']:
                    attrs.append('Secure')
                if c['samesite']:
                    attrs.append(f"SameSite={c['samesite']}")
                if c['path']:
                    attrs.append(f"Path={c['path']}")
                attrs_str = '; '.join(attrs) if attrs else '(no attrs)'
                # Truncate value for readability (not necessary but keeps table tidy)
                val = c['value']
                if len(val) > 32:
                    val = val[:29] + '...'
                lines.append(f"- **{c['name']}** = `{val}` — {attrs_str}")
            cookie_md = '\n'.join(lines)

        rows.append({
            'site': r['site'],
            'status': r['final_status'] if r['final_status'] is not None else 'N/A',
            'num_cookies': num_cookies,
            'cookies_md': cookie_md,
            'raw_count_set_cookie_headers': len(r['set_cookie_headers'])
        })

    if agg_cookies:
        min_c = min(agg_cookies)
        max_c = max(agg_cookies)
        mean_c = statistics.mean(agg_cookies)
        median_c = statistics.median(agg_cookies)
    else:
        min_c = max_c = mean_c = median_c = 0

    with open(OUT_README, 'w') as out:
        out.write("# Cookie analysis for 100 sites\n\n")
        out.write("This README was generated by `generate_readme.py` from the `responses/` files.\n\n")
        out.write("**Important assumptions / notes**\n\n")
        out.write("- All responses were captured using `curl -ILsk` (HEAD, follow redirects, allow invalid certs).\n")
        out.write("- The **terminating status code** is taken to be the last HTTP status line present in each response file.\n")
        out.write("- \"Number of different cookies set\" is counted as the number of **distinct cookie names** set across the HEAD response(s) for that site (including those set on redirects).\n")
        out.write("\n---\n\n")

        out.write("## Summary statistics (cookie-level and site-level)\n\n")
        out.write(f"- Total sites analyzed: {len(rows)}\n")
        out.write(f"- Cookies with HttpOnly flag set: **{cnt_httponly}**\n")
        out.write(f"- Cookies with Secure flag set: **{cnt_secure}**\n")
        out.write(f"- Cookies with SameSite set: **{cnt_samesite}** (Strict: {cnt_samesite_strict}, Lax: {cnt_samesite_lax}, None: {cnt_samesite_none})\n")
        out.write(f"- Cookies that set a Path attribute: **{cnt_has_path}** (of those, Path != \"/\": {cnt_path_not_root})\n")
        out.write("\n")
        out.write(f"- Per-site cookie count: min={min_c}, max={max_c}, mean={mean_c:.2f}, median={median_c}\n")
        out.write("\n---\n\n")

        out.write("## Giant table: per-site cookie summary\n\n")
        out.write("| Site | Terminating status | # distinct cookies (by name) | Cookies (name = value — attributes) |\n")
        out.write("| --- | ---: | ---: | --- |\n")

        rows_sorted = sorted(rows, key=lambda r: r['site'].lower())
        for r in rows_sorted:
            cookie_cell = r['cookies_md'].replace('|', '\\|')
            if cookie_cell.strip() == '':
                cookie_cell = "(none)"
            cookie_cell = cookie_cell.replace('\n', '<br>')
            out.write(f"| `{r['site']}` | {r['status']} | {r['num_cookies']} | {cookie_cell} |\n")

        out.write("\n---\n\n")
        out.write("## How to reproduce\n\n")
        out.write("1. Run `./fetch.sh` to collect HEAD responses into `responses/`.\n")
        out.write("2. Run `py generate_readme.py` to regenerate this README.md.\n\n")
        out.write("## Raw response files\n\n")
        out.write("All raw HTTP HEAD responses are included in the `responses/` directory (one file per site). These were used as the authoritative source for the table above.\n")

    print(f"Wrote {OUT_README} with {len(rows)} sites summarized.")
    return results, rows, {
        'cnt_httponly': cnt_httponly,
        'cnt_secure': cnt_secure,
        'cnt_samesite': cnt_samesite,
        'cnt_samesite_strict': cnt_samesite_strict,
        'cnt_samesite_lax': cnt_samesite_lax,
        'cnt_samesite_none': cnt_samesite_none,
        'cnt_has_path': cnt_has_path,
        'cnt_path_not_root': cnt_path_not_root,
        'min_c': min_c,
        'max_c': max_c,
        'mean_c': mean_c,
        'median_c': median_c
    }

if __name__ == "__main__":
    if not os.path.isdir(RESP_DIR):
        print("responses/ directory not found. Run fetch.sh first.")
        exit(1)
    analyze_all()