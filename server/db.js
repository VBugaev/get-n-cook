const sql = require('mssql');
const dbConfig = require('./configs/dbConfig.js');
const pool = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => pool)
    .catch(err => err);

module.exports = pool;