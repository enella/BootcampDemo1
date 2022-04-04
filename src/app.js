/* jshint esversion: 6 */
const express = require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const bookRouter=require('./routes/book.js');
const exampleRouter=require('./routes/example');
const basicAuth = require('express-basic-auth');
const loginRouter=require('./routes/login');

const app = express();

app.use(cors());
dotenv.config();
app.use(express.urlencoded({extended:false}));
app.use('/example',exampleRouter);
app.use('/login',loginRouter);
app.use(basicAuth( { authorizer: myAuthorizer, authorizeAsync:true, } ));
app.use('/book',bookRouter);

/*const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "memorygame"
});*/

db.connect(err => {
    if (err) throw err;
    console.log("Connected!");
});

app.use(express.static('public'));

var port;
if (process.env.PORT != undefined) {
    port = procress.env.PORT;
} else {
    port = "3001";
}

app.listen(port, function() {
    console.log("App listening on port " + port);
});

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