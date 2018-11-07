
const mysql = require("mysql");
const dotenv = require("dotenv");


const connection = mysql.createConnection(
	{	host: "localhost",
		port: 3306,
		user: "root",
		password: "YYyyT",
		database: "burgers_db"
	});

connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
});

module.exports = connection;