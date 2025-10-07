# Favorite Things Express App

## Overview
This project is a simple **Node.js + Express** web application that demonstrates:
- Setting and reading cookies for different favorite categories (Personality, Place, Book, Movie).
- Serving static content with `express`.


The app runs locally on **http://localhost:4000** and provides four routes:
- `/personality` → Sets and displays your favorite personality.
- `/place` → Sets and displays your favorite place.
- `/book` → Sets and displays your favorite book.
- `/movie` → Sets and displays your favorite movie.

Each route also sets a cookie with the respective favorite item.

## Features
1. **Cookie Handling**  
   - Uses `cookie-parser` to manage cookies.
   - Stores user’s favorites when visiting each route.

2. **Express Setup**  
   - Minimal server that demonstrates middleware and routing.

## Installation & Running
1. Clone or download this repository.  
2. Install dependencies:
   ```bash
   npm install express cookie-parser serve-favicon
    ```
3. Run the server:
    ```bash
    node server.js
    ```
4. Open your browser and go to:

- http://localhost:4000/personality
- http://localhost:4000/place
- http://localhost:4000/book
- http://localhost:4000/movie

## Demo Video

👉 [Watch the video on YouTube](https://youtu.be/2njNsIcrU4o)