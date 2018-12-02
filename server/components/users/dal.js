let sql = require('mssql');
let pool = require('../../db.js');

const getAllUsers = () => {
    return pool.then(pool => {
        return pool.request()
            .execute('GetAllUsers');
    })
        .then(result => {
            return result.recordset;
        })
        .catch(err => {
            sql.close();
            throw err;
        });
};

module.exports = {
    getAllUsers
};