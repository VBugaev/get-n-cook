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

const getUserByEmail = (email) => {
    return pool.then(pool => {
        return pool.request()
            .input('Email', sql.NVarChar(sql.MAX), email)
            .execute('GetUserByEmail');
    }).then(result => {
        return result.recordset[0];
    })
    .catch(err => {
        sql.close();
        throw err;
    })
};

const getUserById = (id) => {
    return pool.then(pool => {
        return pool.request()
            .input('UserId', sql.UniqueIdentifier, id)
            .execute('GetUserById')
    })
    .then(result => {
        return result.recordset[0];
    })
    .catch(err => {
        throw err;
    });
};

const createUser = async (userData) => {
    try {
        let connectedPool = await pool;
        const result = await connectedPool.request()
        .input('Login', sql.NVarChar(50), userData.login)
        .input('Email', sql.NVarChar(sql.MAX), userData.email)
        .input('Password', sql.NVarChar(sql.MAX), userData.password)
        .input('RoleId', sql.UniqueIdentifier, userData.roleId)
        .input('Name', sql.NVarChar(50), userData.name)
        .input('Surname', sql.NVarChar(50), userData.surname)
        .input('AboutSection', sql.NVarChar(sql.MAX), userData.about)
        .execute('CreateUser');
        return result.recordset[0];
    } catch (err) {
        throw err;
    }
};

const getPasswordById = async (userId) => {
    try {
        let connectedPool = await pool;
        const result = await connectedPool.request()
        .input('UserId', sql.UniqueIdentifier, userId)
        .execute('GetPasswordById');
        return result.recordset[0];
    } catch (err) {
        throw err;
    }
}

const updateUser = (userData) => {
    return pool.then(pool => {
        return pool.request()
            .input('Id', sql.UniqueIdentifier, userData.id)
            .input('Login', sql.NVarChar(50), userData.login)
            .input('Email', sql.NVarChar(sql.MAX), userData.email)
            .input('RoleId', sql.UniqueIdentifier, userData.roleId)
            .input('Name', sql.NVarChar(50), userData.name)
            .input('Surname', sql.NVarChar(50), userData.surname)
            .input('AboutSection', sql.NVarChar(sql.MAX), userData.about)
            .execute('UpdateUserById')
    })
    .then(result => {
        return result.recordset[0];
    })
    .catch(err => {
        throw err;
    });
};

const deleteUser = (id) => {
    return pool.then(pool => {
        return pool.request()
            .input('UserId', sql.UniqueIdentifier, id)
            .execute('DeleteUserById')
    })
    .then(() => {
        return true;
    })
    .catch(err => {
        throw err;
    });
};

const setPassword = (setData) => {
    return pool.then(pool => {
        return pool.request()
            .input('UserId', sql.UniqueIdentifier, setData.userId)
            .input('Password', sql.NVarChar(sql.MAX), setData.password)
            .execute('SetPassword')
    })
    .then(() => {
        return true;
    })
    .catch(err => {
        throw err;
    });
};

const updatePassword = (updData) => {
    return pool.then(pool => {
        return pool.request()
            .input('UserId', sql.UniqueIdentifier, updData.userId)
            .input('Password', sql.NVarChar(sql.MAX), updData.password)
            .execute('UpdatePassword')
    })
    .then(() => {
        return true;
    })
    .catch(err => {
        throw err;
    });
}

module.exports = {
    getAllUsers,
    getUserByEmail,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    setPassword,
    updatePassword,
    getPasswordById
};