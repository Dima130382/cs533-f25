# Frame Path Attack — Evidence & Explanation

**What I ran:** a small Express server on `http://localhost:4001`.  
- Victim page: `/private/victim.html` — sets a JavaScript-readable cookie `secret=VERY_SECRET_VALUE` with `Path=/private`.  
- Attacker page: `/attack/parent.html` — same-origin page that loads the victim in an `<iframe>` and reads `frame.contentWindow.document.cookie`, then exfiltrates it.

**Summary (conclusion):** The parent page successfully read the cookie from the framed victim and printed/exfiltrated `secret=VERY_SECRET_VALUE`. This demonstrates that the `Path` attribute only controls whether the cookie is sent on requests to certain paths; it does **not** prevent same-origin pages from reading cookies via JavaScript. Therefore `Path` is not a security boundary. To protect sensitive cookies, use `HttpOnly`, `Secure`, `SameSite` (appropriately), and/or separate origins (different subdomain) as part of a defense-in-depth strategy.

**Files included:** `server.js`, `public/private/victim.html`, `public/attack/parent.html`, `evidence/` (curl outputs + server log), `screenshots/` (victim and parent screenshots).

