Assignment 6 – Browser Fingerprinting (Denisov)

This folder contains my solution for Assignment 6 (CS 433/533 Web Security, Fall 2025).

Code

server.js – Express server that fingerprints clients.

fingerprints.log – Log of NEW and RETURNING clients.

fingerprints.json – Simple database storing known fingerprints.

How to run the server
cd /Users/dima13/Denisov/6
node server.js


The server starts at:

Desktop: http://localhost:5500

Phone/tablet: http://192.168.1.237:5500/

Fingerprinting algorithm (short description)

The server uses the following headers to create a fingerprint:

User-Agent

Accept-Language

Accept-Encoding

DNT

Client IP

Fingerprint = MD5(UserAgent + Language + Encoding + DNT + IP)

If fingerprint is new → mark as NEW and save.
If fingerprint exists → mark as RETURNING and increment counter.

All events are saved in fingerprints.log.

Browsers/Devices Used (6 total)

curl (terminal)

Safari on Mac

Chrome on Mac

Firefox on Mac

Chrome on iPhone

Safari on iPhone

Screenshots

Screenshots show:

fingerprints.log with NEW + RETURNING entries

Browser pages being served

YouTube Video

Demonstration video includes:

Running the server

Connecting with different browsers/devices

Watching fingerprints recognized
## Screenshots

### Screenshot 1 —6 


(Video link : https://youtu.be/KUzGXPebXqs)