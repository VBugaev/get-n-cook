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

   router.route('/user')
      .post(async (req, res, next) => {
         try {
            const result = await usersController.register(req.body);
            res.send(result);
         } catch (error) {
            res.status(500).send(error);
         }
      })
      .put(async (req, res, next) => {
         try {
            console.log(req.body);
            const result = await usersController.updateUser(req.body);
            if (result.error) {
               res.send(result);
            } else {
               if (req.body.isUpdatedByAdmin) {
                  res.send(result);
               } else {
                  res.send(usersController.toAuthJSON(result));
               }
            }
         } catch (error) {
            console.log(error);
            res.status(500).send(error);
         }
      });
   router.route('/register')
      .post(async (req, res, next) => {
         try {
            console.log(req.body);
            const result = await usersController.register(req.body);
            if (result.error) {
               res.send(result);
            } else {
               if (req.body.isCreatedByAdmin) {
                  console.log(result);
                  res.send(result);
               } else {
                  res.send(usersController.toAuthJSON(result));
               }
            }
         } catch (error) {
            res.status(500).send(error);
         }
      });

   router.route('/login')
      .post(async (req, res, next) => {
         try {
            const result = await usersController.login(req.body);
            if (result) {

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