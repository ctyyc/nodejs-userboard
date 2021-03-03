const mysql      = require('mysql');
const pwInfo     = require('./pwInfo');

const db = mysql.createConnection({
    host     : pwInfo.host,
    port     : pwInfo.port,
    user     : pwInfo.user,
    password : pwInfo.password,
    database : pwInfo.database
});

db.connect();

module.exports = db;