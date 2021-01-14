var mysql = require("mysql2");
var http = require("http");

console.log("Hello World!");


// how to connect to a database and show on console / web page
var local_dbhost = {
    host: "localhost", // 127.0.0.1
    port: "3306",
    user: "root",
    password: "pap1997sql!",
    database: "cb12ptjs"
};

var remote_dbhost = {
    host: "ra1.anystream.eu", // 127.0.0.1
    port: "5420",
    user: "user",
    password: "pap1997sql!",
    database: "cb12ptjs"
};

var sql = "SELECT * FROM `cb12ptjs`.`users`;";
var sql2 = "SELECT * FROM `cb12ptjs`.`customersssss`;";

// make a connection to the database server
// var connection = mysql.createConnection(local_dbhost);
var connection = mysql.createConnection(local_dbhost);

// check if connection is ok
// console.log(connection);

connection.connect(function(err) {
    // Houston we do have a problem!!!
    if(err) {
        console.log("Error connecting");
        console.log(err);
    } 
    // Houston we don't have a problem!!!
    // data are coming
    else {
        console.log("Connected!!!");
        connection.query(sql, function(ee, result, fields) {
            // data are finally HERE!!!!!
            // console.log("result: ", result);
            
            // all records with selective fields (excluded id)
            // Object.keys(result).forEach(function(key) {
            //     var row = result[key];
            //     console.log(row.firstname);
            //     console.log(row.lastname);
            //     console.log(row.telephone);
            // });

            var data0 = Object.assign({}, result[0]);
            var server = http.createServer(function(request, response) {
                response.writeHead(200, {});
                response.write("You made it!!!!\n");
                response.write(`ID: ${Object.values(data0)[0].toString()} \n`);
                response.write(`First Name: ${Object.values(data0)[1].toString()} \n`);
                response.write(`Last Name: ${Object.values(data0)[2].toString()} \n`);
                response.write(`Telephone: ${Object.values(data0)[3].toString()} \n`);
                response.end("End");
            }).listen(8000);

            /* 
                http://localhost:8000
                Id: .....
                First Name: .....
                Last Name: .....
                Telephone: .....
            */

        });
        // console.log("1. after query");
        connection.end();
    }
    // console.log("2. outside if inside connect");
});

