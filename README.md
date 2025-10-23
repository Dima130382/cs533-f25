# ODU CS 433/533 Web Security, Fall 2025

Instructor: [Kritika Garg](https://kritikagarg.github.io/)

Email: kgarg001@odu.edu

Syllabus: [Syllabus.pdf](WebSecurity-Syllabus-Fall2025.pdf)

Class Canvas: https://canvas.odu.edu/courses/187687

Class Announcements: https://canvas.odu.edu/courses/187687/announcements

**Office Hours**: Fridays, 12-2pm via Zoom or In-person (ECSB 3102) or email for an appointment. 

**Class Timings**: This is an asynchronous course offered online through Canvas. This course does not have any required lecture times. 

## Course Objectives

The goal of this course is to review common web security vulnerabilities and exploits, along with the defenses designed to counter them. We will explore the ongoing tension between the web as a "simple document reader" and the web as an "application environment". As the web ecosystem grows in functionality, so too do its vulnerabilities"

### What You’ll Learn
By the end of this course, you’ll understand the core principles of web security and how different attacks and defenses work. Topics include the browser security model, web application vulnerabilities, injection, denial-of-service, TLS attacks, privacy, fingerprinting, the same-origin policy, cross-site scripting, authentication, JavaScript security, emerging threats, defense-in-depth, writing secure code, web archiving, and rehosting.

You’ll also get hands-on experience with key technologies such as Git and GitHub, DOM and JavaScript, the command line interface (CLI), Node.js, and utilize platforms like X (Twitter) and YouTube.

Prerequisites: Unix/Linux, Web, HTML


## Course Inspiration

This course builds upon the foundation established by [Dr. Michael L. Nelson](http://www.cs.odu.edu/~mln/), who originally designed and previously taught the course. We will continue to benefit from his contributions by using the recorded video lectures and slides he developed as part of the weekly learning materials.  

The design and inspiration for this course also draw from **[CS 253: Web Security, Stanford, Fall 2019](https://web.stanford.edu/class/cs253/)**. A special thanks to **[Feross Aboukhadijeh](https://feross.org/)** for generously sharing his course resources (though any mistakes remain my own).  


## WEEKLY OVERVIEW
(subject to change; slides will be updated prior to class)

### Week 01 - Introduction and Administrivia, Document Object Model, Javascript, HTTP, Security fundamentals
   * Git/GitHub [1](https://guides.github.com/introduction/git-handbook/), [2](https://www.youtube.com/watch?v=0fKg7e37bQE#t=4m20s), [3](https://education.github.com/git-cheat-sheet-education.pdf)
   * Markdown [1](https://guides.github.com/features/mastering-markdown/), [2](https://www.markdownguide.org/cheat-sheet/)
   * [Node.js](https://nodejs.org/)
   * Document Object Model: [Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction), [Easy Way to Understand How the DOM Works](https://www.youtube.com/watch?v=2Tld4yyN_tw)
   * [JavaScript Crash Course, JavaScript DOM Crash Course Parts 1--4](https://www.youtube.com/playlist?list=PLillGF-RfqbbnEGy3ROiLWk7JMCuSyQtX)
   * [A Re-Introduction to JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)
   * [The Missing Semester of Your CS Education](https://missing.csail.mit.edu/)
   * Inside look at modern web browser: [1](https://developers.google.com/web/updates/2018/09/inside-browser-part1), [2](https://developers.google.com/web/updates/2018/09/inside-browser-part2), [3](https://developers.google.com/web/updates/2018/09/inside-browser-part3)
   * [Architecture of the World Wide Web, Volume One](https://www.w3.org/TR/webarch/)
   * [Class slides](https://docs.google.com/presentation/d/1zX3S6VLJPYU5Em_nvbPye7Lk5ueKZQTzio8tOYtxVR4/edit?usp=sharing)
   

### Week 02 - Cookies, Sessions
   * [An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
   * [HTTP Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
   * [HTTP Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
   * [Class slides](https://docs.google.com/presentation/d/1xWjpIO2qa4ODR_WtnEPca09QLJR53Tg342tgaSHOvlc/edit)

### Week 03 - Cross-Site Request Forgery, Same Origin Policy
   * [SameSite Cookies Explained](https://web.dev/samesite-cookies-explained/)
   * [Incrementally Better Cookies](https://tools.ietf.org/html/draft-west-cookie-incrementalism-01#section-4.1)
   * [CSRF Is Dead](https://scotthelme.co.uk/csrf-is-dead/)
   * [Same Origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)
   * [Cross-Site Request Forgery Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
   * [Origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin)
   * [Class slides](https://docs.google.com/presentation/d/1iq7VzvbNLPmX-NacqP9rxtcu5t9KzNsoDOEH5DD_QLI/edit)

### Week 04 - Exceptions to the Same Origin Policy
   * [X-Frame-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options), [RFC 7034](https://tools.ietf.org/html/rfc7034)
   * [Frame Hijacking](https://seclab.stanford.edu/websec/frames/)
   * [Busting Frame Busting](https://seclab.stanford.edu/websec/framebusting/)
   * [Class slides](https://docs.google.com/presentation/d/1Plnj7daapSkTP_asfJSS3EKoI7VZ2gGapaTPFQX9M1g/edit)

###  Week 05 - Cross-Site Scripting (XSS)
   * [Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
   * [XSS Filter Evasion Cheat Sheet](https://owasp.org/www-community/xss-filter-evasion-cheatsheet)
   * [Class slides](https://docs.google.com/presentation/d/1ba-AcmEJpOBz33qlDne6Re0d4hhwflil1WnlW_z_Rh8/edit)

###  Week 06 - XSS and Content Security Policy (CSP)
   * [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 
   * [CSP Is Dead, Long Live CSP! On the Insecurity of Whitelists and the Future of Content Security Policy](https://research.google/pubs/pub45542/)
   * [Defence in Depth: The medieval castle approach to internet security](https://medstack.co/blog/defence-in-depth-the-medieval-castle-approach-to-internet-security/)
   * [Class slides](https://docs.google.com/presentation/d/1m9aiIwfehu37zgkfMXaN1nI2VYO8AisGc_4dsZLYIrg/edit)

###   Week 07 - Fingerprinting and Privacy
   * [Browser Fingerprinting: An Introduction and the Challenges Ahead](https://blog.torproject.org/browser-fingerprinting-introduction-and-challenges-ahead)
   * [Class slides (2019)](/slides/pete-snyder-brave-online-tracking-2019.pdf), [(2021 version)](/slides/pete-snyder-brave-online-tracking-2021.pdf)


### Week 08 - Transport Layer Security
* [Looking back at the Snowden revelations](https://blog.cryptographyengineering.com/2019/09/24/looking-back-at-the-snowden-revelations/)
* [HTTPS encryption on the web](https://transparencyreport.google.com/https/overview)
* [Class slides](https://docs.google.com/presentation/d/17k2wy3MlP5fdTLL7QzQwNIThtfVaPASyhYvcqTeVSJI/edit#)

###   Week 09 - HSTS, Certificate Transparency
* [Strict-Transport-Security](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)
* [Protecting Against HSTS Abuse](https://webkit.org/blog/8146/protecting-against-hsts-abuse/)
* [HTTP Public Key Pinning (HPKP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Public_Key_Pinning) (now redirects to [Certificate Transparency](https://developer.mozilla.org/en-US/docs/Web/Security/Certificate_Transparency); [archived version](http://web.archive.org/web/20220329000600/https://developer.mozilla.org/en-US/docs/Web/HTTP/Public_Key_Pinning); [Wikipedia HPKP](https://en.wikipedia.org/wiki/HTTP_Public_Key_Pinning))
* [Certificate Transparency](https://tools.ietf.org/html/rfc6962)
* [Class slides](slides/stark-palmer-https-2019.pdf)

###   Week 10 - Authentication
* [Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
* [Class slides](https://docs.google.com/presentation/d/1dS0WQ4l6vaZozTOwXZH0dlLqCzTA6lH0yJYFrnd6f4Y/edit)

###   Week 11 - Local HTTP Server Security
* [Zoom Zero Day: 4+ Million Webcams & maybe an RCE? Just get them to visit your website!](https://infosecwriteups.com/zoom-zero-day-4-million-webcams-maybe-an-rce-just-get-them-to-visit-your-website-ac75c83f4ef5)
* [Class slides](https://docs.google.com/presentation/d/1bY4q_uOauOXA65IcwxBpJmCCwUvcQQUh78kdp3l9JmU/edit)

###   Week 12 - DNS rebinding attacks
* [Millions of Streaming Devices Are Vulnerable to a Retro Web Attack](https://www.wired.com/story/chromecast-roku-sonos-dns-rebinding-vulnerability/)
* [Protecting Browsers from DNS Rebinding Attacks](https://crypto.stanford.edu/dns/dns-rebinding.pdf)
* [Class slides](https://docs.google.com/presentation/d/1yH2gE2jwMF-ySg44qflwttsHh7rqFKepfdokYuySGS0/edit)

### Week 13 - UI Denial-of-service, Phishing, Side Channels
* [The Annoying Site](https://github.com/feross/theannoyingsite.com)
* [Phishing with Unicode Domains](https://www.xudongz.com/blog/2017/idn-phishing/)
* [The inception bar: a new phishing method](https://jameshfisher.com/2019/04/27/the-inception-bar-a-new-phishing-method/)
* [Class slides](https://docs.google.com/presentation/d/1yLOAAMgyweGspggK9R7ZlDBH11G7VRu5yT19QOgPYAA/edit)

###  Week 14 - Thanksgiving -- no classes

###  Week 15 - Rehosting, Web Archiving
* [Rewriting History: Changing the Archived Web from the Present](https://rewritinghistory.cs.washington.edu/) ([slides](slides/Lerner-ACM-CCS-2017.pdf), [video](https://www.youtube.com/watch?v=Pn65m3l0Zw8), [DSHR blog post](https://blog.dshr.org/2017/09/attacking-users-of-wayback-machine.html))
* [Thinking like a hacker: Security Considerations for High-Fidelity Web Archives](http://labs.rhizome.org/presentations/security.html) ([DSHR blog post](https://blog.dshr.org/2017/06/wac2017-security-issues-for-web-archives.html))
* [Melting Pot of Origins: Compromising the Intermediary Web Services that Rehost Websites](https://www.ndss-symposium.org/ndss-paper/melting-pot-of-origins-compromising-the-intermediary-web-services-that-rehost-websites/) ([slides](https://www.ndss-symposium.org/wp-content/uploads/24140-slides.pdf), [video](https://www.youtube.com/watch?v=uhA_KGTQXP0))

### Week 16 - Exam Week (no class) 

## Assignments

* Weekly review of current events related to web security on social media (Use #cs533f25): 
    * Canvas Discusssion Forum   

* Assignment 1: Basics of HTML, Javascript, and Node
   * [Due: September 7](/assignments/assignment-1.md)

* Assignment 2: Getting Started with Node.js, Express, and Cookies
   * [Due: September 21](/assignments/assignment-2.md)

* Assignment 3: Cookie Report
   * [Due: October 5](/assignments/assignment-3.md)

* Assignment 4: Frames
   * [Due: October 19](/assignments/assignment-4.md)

* Assignment 5: Same-origin Policy, CORS, CSP
   * [Due: November 9](/assignments/assignment-5.md)
