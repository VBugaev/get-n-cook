const sql = require('mssql');
const dbConfig = require('./configs/dbConfig.js');
const pool = new sql.ConnectionPool(dbConfig);

module.exports = pool;