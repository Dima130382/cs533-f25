import os
import re
import statistics

folder = "responses"
results = []

for filename in os.listdir(folder):
    with open(os.path.join(folder, filename), "r", encoding="utf-8", errors="ignore") as f:
        text = f.read()
    
    # Find all HTTP status lines
    status_codes = re.findall(r"HTTP/\d(?:\.\d)?\s+(\d+)", text)
    final_status = status_codes[-1] if status_codes else "N/A"

    # Find all Set-Cookie lines
    cookies = re.findall(r"Set-Cookie:(.*)", text, re.IGNORECASE)
    cookie_count = len(cookies)

    # Extract attributes
    httponly = sum("httponly" in c.lower() for c in cookies)
    secure = sum("secure" in c.lower() for c in cookies)
    samesite = sum("samesite" in c.lower() for c in cookies)

    samesite_strict = sum("samesite=strict" in c.lower() for c in cookies)
    samesite_lax = sum("samesite=lax" in c.lower() for c in cookies)
    samesite_none = sum("samesite=none" in c.lower() for c in cookies)

    path_set = sum("path=" in c.lower() for c in cookies)
    path_not_root = sum(("path=" in c.lower() and "path=/" not in c.lower()) for c in cookies)

    results.append({
        "site": filename.replace(".txt", ""),
        "final_status": final_status,
        "cookies": cookie_count,
        "httponly": httponly,
        "secure": secure,
        "samesite": samesite,
        "strict": samesite_strict,
        "lax": samesite_lax,
        "none": samesite_none,
        "path": path_set,
        "path_not_root": path_not_root
    })

# Summary stats
cookie_counts = [r["cookies"] for r in results]
summary = {
    "min": min(cookie_counts),
    "max": max(cookie_counts),
    "mean": statistics.mean(cookie_counts),
    "median": statistics.median(cookie_counts)
}


# Write to CSV
with open("analysis.csv", "w") as out:
    out.write("Site,Final Status,Cookies,HttpOnly,Secure,SameSite,Strict,Lax,None,Path,Path≠/\n")
    for r in results:
        out.write(f"{r['site']},{r['final_status']},{r['cookies']},{r['httponly']},{r['secure']},{r['samesite']},{r['strict']},{r['lax']},{r['none']},{r['path']},{r['path_not_root']}\n")

# Print summary stats
print("Summary Stats:", summary)

