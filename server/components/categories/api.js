module.exports = (router) => {
    let categoriesDAL = require('./dal.js');
    let categoriesController = require('./controller.js');

    router.route('/category')
        .get(async (req, res) => {
            let catResult = await categoriesDAL.getCategoryByTitle(req.body.title);
            res.send(catResult);
        })

    router.route('/categories')
        .get((req, res, next) => {
            categoriesDAL.getAllCategories()
            .then(result => res.send(result))
            .catch(err => res.status(500).send(err));
        })
        .post((req, res, next) => {
            console.log(req.body);
            categoriesController.createCategory(req.body.title)
            .then(result => res.send(result))
            .catch(err => res.status(500).send(err));
        })
        .delete((req, res, next) => {
            categoriesDAL.deleteCategory(req.query.id)
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
            categoriesController.updateCategory(updObj.id, updObj.title)
            .then(result => res.send(result))
            .catch(err => res.status(500).send(err));
        });
};