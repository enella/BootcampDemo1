/* jshint esversion: 6 */
//import Player from "/game.js";

const express = require('express');
const mysql = require('mysql'); 
var newPlayer = require('game.js').Player;

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "memorygame"
});

db.connect(err => {
    if (err) throw err;
    console.log("Connected!");
});

//app.use("/static", express.static('./static/'));
//app.use(express.static('public'));

var id = Player.id;
var name = Player.name;
var time = Player.time;
var turns = Player.turns;

var port;
if (process.env.PORT != undefined) {
    port = procress.env.PORT;
} else {
    port = "3001";
}

app.listen(port, function() {
    console.log("App listening on port " + port);
});

app.post("/player_table", function(req, res) {
    if (err) throw err;
    console.log("Connected!");

    var sql = "INSERT INTO 'player_table' ('player_id', 'name', 'playtime', 'moves') VALUES ('" + id + "', '" + name + "', '" + time + "', '" + turns + "')";
    db.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Data send!");
    });
});