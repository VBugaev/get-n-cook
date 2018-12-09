module.exports = (router) => {
    let sql = require('mssql');
    let pool = require('../../db.js');
    let cartsDAL = require('./dal.js');

    router.route('/carts')
        .get((req, res, next) => {
            cartsDAL.getAllCategories()
            .then(result => res.send(result))
            .catch(err => res.status(500).send(err));
        });
};