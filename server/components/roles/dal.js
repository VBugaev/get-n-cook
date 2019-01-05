let sql = require('mssql');
let pool = require('../../db.js');

const getAllRoles = (filter) => {
    return pool.then(pool => {
        return pool.request()
            .execute('GetAllRoles');
    }).then(result => {
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

const getRoleByTitle = async (title) => {
    try {
        let connectedPool = await pool;
        let result = await connectedPool.request()
        .input('Title', sql.NVarChar(50), title)
        .execute('GetRoleByTitle')
        return result.recordset[0];
    } catch (error) {
        throw error;
    }
}

const createRole = async (title) => {
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
    createRole,
    getRoleByTitle
};
