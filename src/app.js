const express = require('express');
const mysql = require('express');

// luodaan yhteys

const db = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: '',
    database: 'memorySQL'
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

app.listen('3306', () => {
    console.log('Server running');
});