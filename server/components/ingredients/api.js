module.exports = (router) => {
    let ingredientsDAL = require('./dal.js');
    let ingredientsController = require('./controller.js');
    let multer = require('multer');
    let storage = multer.memoryStorage();
    let upload = multer({ storage: storage });
 
    router.route('/ingredients')
       .get(async (req, res, next) => {
          try {
            const ingredientsResult = await ingredientsDAL.getAllIngredients();
            res.send(ingredientsResult);
          } catch (error) {
            res.status(500).send(error);
          }
       })
       .post(upload.single('image'), async (req, res, next) => {
           try {
               const ingredientResult = await ingredientsController.createIngredient(req.body.title, req.file);
               res.send(ingredientResult);
           } catch (error) {
            res.status(500).send(error);
           }
       });
 
 }