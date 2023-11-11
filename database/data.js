const mysql = require("mysql2");

const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    database:'products',
    password:'12345678'
})

module.exports=db.promise();