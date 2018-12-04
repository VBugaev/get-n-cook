module.exports = (router) => {
    let sql = require('mssql');
    let pool = require('../../db.js');
    let categoriesDAL = require('./dal.js');

    router.route('/categories')
        .get((req, res, next) => {
            categoriesDAL.getAllCategories()
            .then(result => res.send(result))
            .catch(err => res.status(500).send(err));
        })
        .post((req, res, next) => {
            categoriesDAL.createCategory(req.body.title)
            .then(result => res.send(result))
            .catch(err => res.status(500).send(err));
        })
        .delete((req, res, next) => {
            categoriesDAL.deleteCategory(req.body.id)
            .then(result => {
                if (result) {
                    res.status(202).send('Deleted');
                }
            })
            .catch(err => res.status(500).send(err));
        })
        .put((req, res, next) => {
            const updObj = {
                id: req.body.id,
                title: req.body.title
            };
            categoriesDAL.updateCategory(updObj)
            .then(result => res.send(result))
            .catch(err => res.status(500).send(err))
        });
}