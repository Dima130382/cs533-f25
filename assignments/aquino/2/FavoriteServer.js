//const{createServer} = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const port = 4000;

const app = express();
app.use(cookieParser());

// Get for the server original location
app.get("/", async(request, response) =>{
    // Reads the index.html file which is the page format for the original server location
    fs.readFile('index.html', function(error, data){
        if(error){
            response.writeHead(404);
            response.write('File does not exist');
        }
        else{
            response.write(data);
        }
        response.end();
    });
});


// Get for favorite game
app.get("/DarkestDungeon.html", (request, response) =>{
    fs.readFile('DarkestDungeon.html', function(error, data){
        if(error){
            response.writeHead(404);
            response.write('File does not exist');
        }
        else{
            response.write(data);
        }
        response.end();
    });

    //Creates a cookie for darkest dungeon
    response.cookie('GameCookie', 'Darkest-Dungeon-Visited');
});

// Get for favorite song
app.get("/MarriageDAmour.html", (request, response) =>{
    fs.readFile('MarriageDAmour.html', function(error, data){
        if(error){
            response.writeHead(404);
            response.write('File does not exist');
        }
        else{
            response.write(data);
        }
        response.end();
    });

    //Creates a cookie for Marriage d'Amour
    response.cookie('SongCookie', "Marriage-d'Amour-Visited");
});

// Get for favorite meal
app.get("/ChickenParmesan.html", (request, response) =>{
    fs.readFile('ChickenParmesan.html', function(error, data){
        if(error){
            response.writeHead(404);
            response.write('File does not exist');
        }
        else{
            response.write(data);
        }
        response.end();
    });

    // Creates a cookie for Chicken parmesan
    response.cookie('MealCookie', 'Chicken-Parmesan-Visited')
});

// Get for favorite dated joke
app.get("/TheGame.html", (request, response) =>{
    fs.readFile('TheGame.html', function(error, data){
        if(error){
            response.writeHead(404);
            response.write('File does not exist');
        }
        else{
            response.write(data);
        }
        response.end();
    });

    // Creates a cookie for The Game
    response.cookie('JokeCookie', 'You-Just-Lost-the-Game-Visited');
});





app.listen(port, function(error){
    if(error){
        console.log('Error', error);
    }
    else{
        console.log('Server is listening on localhost:' + port);
    }
});






/*
app.get('/GameCookie', function(request, response){
    response.cookie('GameCookie', {path: './DarkestDungeon.html', maxAge:1000, httpOnly:true});
    response.send('Cookie created for favorite game')
});





*/