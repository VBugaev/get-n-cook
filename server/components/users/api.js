module.exports = (router) => {
   let usersDAL = require('./dal.js');
   let usersController = require('./controller.js');

   router.route('/users')
      .get((req, res, next) => {
         usersDAL.getAllUsers()
         .then(result => {
            res.send(result);
         })
         .catch(err => {
            res.status(500).send(err);
         });
      })
      .delete((req, res, next) => {
         usersDAL.deleteUser(req.body.id)
         .then(() => res.status(200).send('Deleted'))
         .catch(err => res.status(500).send(err));
      });
   router.route('/register')
      .post((req, res, next) => {
         usersController.register(req.body)
            .then(result => {
               res.send(usersController.toAuthJSON(result));
            })
            .catch(err => {
               res.status(500).send(err);
            })

      });

      router.route('/login')
      .post(async (req, res, next) => {
         try {
            const result = await usersController.login(req.body);
            if (result) {
               res.send(usersController.toAuthJSON(result));
            } else {
               res.send({
                  authenticated: false,
                  error: 'invalid username of password'
               });
            }
         } catch (error) {
            res.status(500).send(error);
         }
      });
}