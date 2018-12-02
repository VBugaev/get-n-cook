module.exports = (router) => {
    let sql = require('mssql');
    let pool = require('../../db.js');

    router.route('/categories')
        .get((req, res, next) => {
            pool.then(pool => {
                return pool.request()
                    .execute('GetAllCategories');
            }).then(result => {
                res.send(result.recordset);
            })
                .catch(err => {
                    pool.close();
                    res.status(500).send('Internal server error');
                });
        })
        .post((req, res, next) => {
            pool.then(pool => {
                return pool.request()
                    .input('Title', sql.NVarChar(100), req.body.title)
                    .execute('CreateCategory');
            }).then(result => {
                res.send(result.recordset);
            })
                .catch(err => {
                    pool.close();
                    res.status(500).send(err);
                });
        })
        .delete((req, res, next) => {
            pool.then(pool => {
                return pool.request()
                    .input('CategoryId', sql.UniqueIdentifier, req.body.id)
                    .execute('DeleteCategoryById');
            }).then(result => {
                res.status(200).send('Category Deleted');
            })
                .catch(err => {
                    pool.close();
                    res.status(500).send(err);
                });
        })
        .put((req, res, next) => {
            pool.then(pool => {
                return pool.request()
                    .input('CategoryId', sql.UniqueIdentifier, req.body.id)
                    .input('Title', sql.NVarChar(100), req.body.title)
                    .execute('UpdateCategoryById');
            }).then(result => {
                res.send(result.recordset);
            })
                .catch(err => {
                    pool.close();
                    res.status(500).send(err);
                });
        });
}