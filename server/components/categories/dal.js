let sql = require('mssql');
let pool = require('../../db.js');

const getAllCategories = (filterTitle) => {
    return pool.then(pool => {
        return pool.request()
            .execute('GetAllCategories');
    }).then(result => {
        if (filterTitle) {
            return result.recordset
            .filter(el => el.Title.includes(filterTitle));
        }
        return result.recordset;
    })
        .catch(err => {
            sql.close();
            throw err;
        });
};

const createCategory = title => {
    return pool.then(pool => {
        return pool.request()
            .input('Title', sql.NVarChar(100), title.trim())
            .execute('CreateCategory');
    }).then(result => {
        return result.recordset[0];
    })
        .catch(err => {
            sql.close();
            throw err;
        });
}

const deleteCategory = id => {
    return pool.then(pool => {
        return pool.request()
            .input('CategoryId', sql.UniqueIdentifier, id)
            .execute('DeleteCategoryById');
    }).then(result => {
        return true;
    })
        .catch(err => {
            sql.close();
            throw err;
        });
};

const getCategoryByTitle = async title => {
    try {
        console.log(title);
        let connectedPool = await pool;
        let result = await connectedPool.request()
        .input('Title', title)
        .execute('GetCategoryByTitle');
        return result.recordset[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateCategory = (updObj) => {
    return pool.then(pool => {
        return pool.request()
            .input('CategoryId', sql.UniqueIdentifier, updObj.id)
            .input('Title', sql.NVarChar(100), updObj.title.trim())
            .execute('UpdateCategoryById');
    }).then(result => {
        return result.recordset[0];
    })
        .catch(err => {
            sql.close();
            throw err;
        });
};

module.exports = {
    getAllCategories,
    createCategory,
    deleteCategory,
    updateCategory,
    getCategoryByTitle
};