#!/usr/bin/env python3
import re, statistics, csv, pathlib

ROOT = pathlib.Path(__file__).resolve().parent
RESP = ROOT / "responses"
OUT  = ROOT / "out"
OUT.mkdir(exist_ok=True)

# Tolerant status detection (HTTP/x and :status:)
STATUS_HTTP = re.compile(r"HTTP/\d(?:\.\d)?\s+(\d{3})", re.IGNORECASE)
STATUS_H2   = re.compile(r":status:\s*(\d{3})", re.IGNORECASE)
SET_COOKIE  = re.compile(r"set-cookie\s*:\s*(.+)", re.IGNORECASE)

def parse_cookies(h):
    parts = [p.strip() for p in h.split(";")]
    if not parts: return None
    name_val = parts[0]
    name, val = (name_val.split("=",1)+[""])[:2] if "=" in name_val else (name_val,"")
    attrs={}
    for p in parts[1:]:
        if "=" in p:
            k,v = p.split("=",1); attrs[k.strip().lower()] = v.strip()
        else:
            attrs[p.strip().lower()] = True
    if "samesite" in attrs and isinstance(attrs["samesite"], str):
        s = attrs["samesite"].strip().capitalize()
        if s in ("Lax","Strict","None"): attrs["samesite"]=s
    return name.strip(), val.strip(), attrs

def extract_final_status_and_cookies(text):
    final_code = None
    cookies = []
    for line in text.splitlines():
        s = line.strip()
        m1 = STATUS_HTTP.search(s)
        if m1: final_code = int(m1.group(1))
        else:
            m2 = STATUS_H2.search(s)
            if m2: final_code = int(m2.group(1))
        m3 = SET_COOKIE.search(line)
        if m3:
            pc = parse_cookies(m3.group(1))
            if pc: cookies.append(pc)
    return final_code, cookies

def pretty_site(stem):
    s = stem.replace("__","/")
    return re.sub(r'^(www\.)','',s)

def md_table(rows):
    headers = ["#","Site","Final Status","Cookies","HttpOnly","Secure","SameSite (total/Lax/Strict/None)","Path (total/non-/)"]
    out = ["| " + " | ".join(headers) + " |",
           "|---:|---|---:|---:|---:|---:|---:|---:|"]
    for i,r in enumerate(rows,1):
        ss = f'{r["samesite_count"]}/{r["samesite_lax"]}/{r["samesite_strict"]}/{r["samesite_none"]}'
        path = f'{r["path_count"]}/{r["path_nonroot_count"]}'
        out.append(f'| {i} | {r["site"]} | {r["final_status"]} | {r["cookies_count"]} | {r["httponly_count"]} | {r["secure_count"]} | {ss} | {path} |')
    return "\n".join(out)

# Build site & cookie rows
site_rows, cookie_rows = [], []
for p in sorted(RESP.glob("*.txt")):
    text = p.read_text(errors="ignore")
    final_code, cookies = extract_final_status_and_cookies(text)
    site = pretty_site(p.stem)

    httponly = sum(1 for _,_,a in cookies if a.get("httponly") is True)
    secure   = sum(1 for _,_,a in cookies if a.get("secure")   is True)
    ss_vals  = [a.get("samesite","") for _,_,a in cookies if "samesite" in a]
    path_vals= [a.get("path","") for _,_,a in cookies if "path" in a]
    path_nonroot = [v for v in path_vals if v and v.strip() != "/"]

    site_rows.append({
        "site": site,
        "final_status": final_code if final_code is not None else "",
        "cookies_count": len(cookies),
        "httponly_count": httponly,
        "secure_count": secure,
        "samesite_count": len(ss_vals),
        "samesite_lax": ss_vals.count("Lax"),
        "samesite_strict": ss_vals.count("Strict"),
        "samesite_none": ss_vals.count("None"),
        "path_count": len(path_vals),
        "path_nonroot_count": len(path_nonroot),
    })

    for (name, value, attrs) in cookies:
        cookie_rows.append({
            "site": site,
            "name": name,
            "value_preview": (value[:40]+"…") if len(value)>40 else value,
            "httponly": str(attrs.get("httponly") is True),
            "secure":   str(attrs.get("secure")   is True),
            "samesite": attrs.get("samesite",""),
            "path":     attrs.get("path",""),
        })

# Summary
counts = [r["cookies_count"] for r in site_rows]
summary = {}
if counts:
    summary = {
        "min": min(counts),
        "max": max(counts),
        "mean": round(sum(counts)/len(counts), 2),
        "median": statistics.median(counts),
    }

# Outputs
if site_rows:
    with open(OUT/"sites.csv","w",newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(site_rows[0].keys()))
        w.writeheader(); w.writerows(site_rows)
if cookie_rows:
    with open(OUT/"cookies.csv","w",newline="") as f:
        fn = list(cookie_rows[0].keys())
        w = csv.DictWriter(f, fieldnames=fn); w.writeheader()
        for r in cookie_rows: w.writerow(r)

with open(OUT/"table.md","w") as f:
    f.write("# Cookie report (HEAD, follow redirects)\n\n")
    f.write(f'**Summary (cookies/site)**: min={summary.get("min","-")}, max={summary.get("max","-")}, mean={summary.get("mean","-")}, median={summary.get("median","-")}\n\n')
    f.write(md_table(site_rows) + "\n")

print("[✓] Wrote:", OUT/"sites.csv", OUT/"cookies.csv", OUT/"table.md")
