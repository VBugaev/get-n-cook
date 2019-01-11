module.exports = (router) => {
    let sql = require('mssql');
    let pool = require('../../db.js');
    let cartsDAL = require('./dal.js');
    let cartsController = require('./controller');

    router.route('/carts')
        .post(async (req, res) => {
            try {
                const result = await cartsController.createCart(req.body);
                console.log(result);
                res.send(result);
            } catch (error) {
                res.status(500).send(error);
            }
        });
        router.route('/cart/:id')
        .get(async (req, res, next) => {
            try {
                const result = await cartsDAL.getAllRecipesByCartId(req.params.id);
                console.log(result);
                res.send(result);
            } catch (error) {
                res.status(500).send(error);
            }
        });
        router.route('/carts/:id')
        .get(async (req, res, next) => {
            try {
                const result = await cartsDAL.getAllCartsByUserId(req.params.id);
                console.log(result);
                res.send(result);
            } catch (error) {
                res.status(500).send(error);
            }
        });
};