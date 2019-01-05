module.exports = (router) => {
    let rolesDAL = require('./dal.js');

    router.route('/role')
        .get((req, res, next) => {
            rolesDAL.getRoleByTitle(req.body.title)
                .then(result => res.send(result))
                .catch(err => res.status(500).send(err));
        })
    router.route('/roles')
        .get((req, res, next) => {
            rolesDAL.getAllRoles()
                .then(result => res.send(result))
                .catch(err => res.status(500).send(err));
        })
        .post(async (req, res, next) => {
            rolesDAL.createRole(req.body.title)
                .then(result => res.send(result))
                .catch(err => res.status(500).send(err));
        });
};