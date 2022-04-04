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

app.post('/memorygame', function(req, res, next) {
    var post_id = req.body.id;
    var post_name = req.body.name;
    var post_time = req.body.time;
    var post_turns = req.body.turns;
   
    var sql = `INSERT INTO memorygame (player_id, name, playtime, moves) VALUES ("${post_id}", "${post_name}", "${post_time}", "${post_turns}"`;
    db.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record inserted');
      req.flash('success', 'Data added successfully!');
      res.redirect('/');
    });
});