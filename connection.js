/*
const mysql = require("mysql");

const connection = mysql.createConnection(
	{	host: "localhost",
		port: 3306,
//		user: process.env.userDB,
//		password: process.env.passwordDB,
//		database: process.env.databaseDB
		user: "root",
		password: "YYyyT",
		database: "recordvitals"
	});

connection.connect(function(err) {
	if (err) {
		console.error("error: " + err.message);
	}

	console.log("Database connected as id " + connection.threadId);
});

module.exports = connection;
*/