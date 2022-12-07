const mysql = require('mysql')

const db = mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'eognsld905!',
    port:3308,
    database:'FullHouse'

})

module.exports = db;
