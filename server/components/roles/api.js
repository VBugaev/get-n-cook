module.exports = (router) => {
    let sql = require('mssql');
    let pool = require('../../db.js');

    router.route('/roles')
        .get((req, res, next) => {
            pool.then(pool => {
                return pool.request()
                    .execute('GetAllRoles');
            }).then(result => {
                res.send(result.recordset);
            })
                .catch(err => {
                    pool.close();
                    res.status(500).send(err);
                });
        });
};