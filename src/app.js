/* jshint esversion: 6 */
// import Player from "./game.js";

import express from "express";
import mysql from "mysql";

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

var port;
if (process.env.PORT != undefined) {
    port = procress.env.PORT;
} else {
    port = "3001";
}

app.listen(port, function() {
    console.log("App listening on port " + port);
});

/*app.get("/player_table", function(request, response) {
    console.log('polkua /player_table kutsuttiin');
});*/

var id = localStorage.getItem("testJSON");
var name = localStorage.getItem("testJSON2");
var time = localStorage.getItem("testJSON3");
var turns = localStorage.getItem("testJSON4");

var newId = "", newName = "", newTime = "", newTurns = "";

    var targetP = new Proxy(newId, {
        set: function (target, key, value) {
            //console.log(`${key} set to ${value}`);
            target[key] = value;
            return true;
        }
      });
    newId = JSON.parse(id);
    newName = JSON.parse(name);
    newTime = JSON.parse(time);
    newTurns = JSON.parse(turns);

app.post("/data", function(req, res) {
    if (err) throw err;
    console.log("Connected!");

    var sql = "INSERT INTO 'player_table' ('player_id', 'name', 'playtime', 'moves') VALUES ('" + newId + "', '" + newName + "', '" + newTime + "', '" + newTurns + "')";
    db.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Data send!");
    });
});

//app.use("/static", express.static('./static/'));
//app.use(express.static('public'));
