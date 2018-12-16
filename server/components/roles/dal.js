let sql = require('mssql');
let pool = require('../../db.js');

const getAllRoles = (filter) => {
    return pool.then(pool => {
        return pool.request()
            .execute('GetAllRoles');
    }).then(result => {
        console.log(result.recordset);
        if (filter) {
            return result.recordset
            .filter(el => el.Title.includes(filter));
        }
        return result.recordset;
    })
        .catch(err => {
            sql.close();
            throw err;
        });
};

const createRole = title => {
    return pool.then(pool => {
        return pool.request()
            .input('Title', sql.NVarChar(50), title)
            .execute('CreateRole');
    }).then(result => {
        return result.recordset[0];
    })
        .catch(err => {
            sql.close();
            throw err;
        });
};

module.exports = {
    getAllRoles,
    createRole
};
