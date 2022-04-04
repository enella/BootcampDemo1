var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "memorygame"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  app.listen('3000', () => {
    console.log("Server Started on port 3000");
  });