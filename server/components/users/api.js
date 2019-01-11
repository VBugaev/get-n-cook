module.exports = (router) => {
   let usersDAL = require('./dal.js');
   let usersController = require('./controller.js');
   let multer = require('multer');
   let storage = multer.memoryStorage();
   let upload = multer({ storage: storage });

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
   

      router.route('/user/:id')
      .get(async (req, res, next) => {
         try {
            const result = await usersDAL.getUserById(req.params.id);
            res.send(result);
         } catch (error) {
            res.status(500).send(error);
         }
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
      .post(upload.single('avatar'), async (req, res, next) => {
         try {
            const result = await usersController.register(req.body, req.file);
            if (result.error) {
               res.send(result);
            } else {
               if (req.body.isCreatedByAdmin) {
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
            console.log(req.body)
            const result = await usersController.login(req.body);
            if (result) {
               res.send(usersController.toAuthJSON(result));
            } else {
               res.send({
                  authenticated: false,
                  error: 'Неверный email или пароль'
               });
            }
         } catch (error) {
            res.status(500).send(error);
         }
      });
}