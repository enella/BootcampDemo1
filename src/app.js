/* jshint esversion: 6 */
const express = require('express');
const mysql = require('mysql');

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

const app = express();

var id = Player.id;
var name = Player.name;
var time = Player.time;
var turns = Player.turns;

app.get("/player_table", (req, res) => {
    let post = { id, name, time, turns };
    let sql = "INSERT INTO player_table SET ?";
  
    let query = db.query(sql, post, (err) => {
        if (err) throw err;
        res.send("Player added");
    });
});