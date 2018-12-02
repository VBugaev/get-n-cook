module.exports = (router) => {
   let usersDAL = require('./dal.js');

   router.route('/users')
      .get((req, res, next) => {
         usersDAL.getAllUsers()
         .then(result => {
            res.send(result);
         })
         .catch(err => {
            res.status(500).send(err);
         });
      });
}