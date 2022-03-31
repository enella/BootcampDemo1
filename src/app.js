const express = require('express');
const mysql = require('express');

// luodaan yhteys

const db = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: ''
});

// yhdistä

db.connect((err) => {
    if (err) {
        console.log("Erroooorr");
        throw err;
    }
    console.log("MySQL toimii!");
});

const app = express();

app.get("/createdb", (req, res) => {
    let sql = "CREATE DATABASE MemorySQL";
    db.query(sql, (err, result) => {
        if (err) {
            throw err; console.log("Errooor");
        }
        console.log(result);
        res.send('database created...');
    });
});

app.listen('3306', () => {
    console.log('Server running');
});