## Assignment 4, CS 433/533 Web Security, Fall 2025

Due: 2025-10-19

Points available: 15 + 2 (Extra Credit)

### Which public sites are framable? (10 points)

* Using the 100 sites assigned to you in Assignment 3, write HTML pages served by your node.js server (running on localhost) that attempts to render these pages in an iframe.  How many / which ones are framable?  How many / which ones are not framable?  If not, explain how they defeated your attempt to frame them.  

* Place the 100 HTML files in the directory ```Garg/4/framable```, where "Garg" is replaced by your last name.

### Frame Path attack (5 points)

* Demonstrate how that Path attribute for Cookies is not suitable for security.  Demonstrate how a parent page can steal cookies from an iframed page if only the Path attribute is used in ```Set-Cookie```.

* All code, files, etc. necessary for demonstrating this portion of the assignment will be in ```Garg/4/frame-path-attack```, where "Garg" is replaced by your last name.


### Extra credit (up to 10 points, 1 per site)

* From your 100 sites that do not allow themselves to be framed, one point extra credit is available for each site where you can document and demonstrate how you can defeat their attempts to "unframe" themselves.

### Extra credit (2 points)

* Week 5 lecture, slide 65 has a literary reference in its title.  Briefly describe this literary reference (but "Buzz Lightyear" does not count), both the origin and the meaning in the slides.

### Setting up directory "4"

All of the code, scripts, files, HTTP responses, images, etc. you created to do this assignment will be uploaded into directory "4".  When in doubt, ask me on the class email list or just upload it.  You absolutely must include the HTTP responses as part of your submission.  But all of the data that I will read to grade your assignment will be contained in README.md; I will not open separate .pdf, .ppt, etc. files.  The purpose of this is to encourage you to develop good markdown skills for natively documenting your work in GitHub.  

Your "4" directory will have two sub-directories: "framable" and "frame-path-attack", as well a README.md file.  The README.md file will have all the necessary summary information as well as images to support your findings.  

Your README.md file will also point to two Youtube videos, one for "framable" and one for "frame-path-attack".  

