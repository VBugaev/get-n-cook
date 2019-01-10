module.exports = (router) => {
    let recipesDAL = require('./dal.js');
    let recipesController = require('./controller.js');
    let multer = require('multer');
    let storage = multer.memoryStorage();
    let upload = multer({ storage: storage });
    let rUpload = upload.fields([{ name: 'previewImage', maxCount: 1 }, { name: 'sideImage1', maxCount: 1 }, { name: 'sideImage2', maxCount: 1 }, { name: 'sideImage3', maxCount: 1 }]);

    router.route('/recipe/:id')
        .get(async (req, res) => {
            try {
                const recipe = await recipesController.getRecipeById(req.params.id);
                res.send(recipe);
            } catch (error) {
                res.status(500).send(error);
            }
        })

    router.route('/recipes')
        .get(async (req, res, next) => {
            try {
                const recipesResult = await recipesDAL.getAllRecipes();
                res.send(recipesResult);
            } catch (error) {
                res.status(500).send(error);
            }
        })
        .post(rUpload, async (req, res, next) => {
            try {
                let recipeData = {};
                const previewImage = {
                    buffer: req.files['previewImage'][0].buffer,
                    originalname: req.files['previewImage'][0].originalname,
                    mimetype: req.files['previewImage'][0].mimetype
                };
                recipeData = {
                    title: req.body.title,
                    difficulty: req.body.difficulty,
                    preparationTime: req.body.preparationTime,
                    previewImage
                };
                if (req.files['sideImage1']) {
                    const sideImage1 = {
                        buffer: req.files['sideImage1'][0].buffer,
                        originalname: req.files['sideImage1'][0].originalname,
                        mimetype: req.files['sideImage1'][0].mimetype
                    };
                    recipeData['sideImage1'] = sideImage1;
                }
                if (req.files['sideImage2']) {
                    const sideImage2 = {
                        buffer: req.files['sideImage2'][0].buffer,
                        originalname: req.files['sideImage2'][0].originalname,
                        mimetype: req.files['sideImage2'][0].mimetype
                    };
                    recipeData['sideImage2'] = sideImage2;
                }
                if (req.files['sideImage3']) {
                    const sideImage3 = {
                        buffer: req.files['sideImage3'][0].buffer,
                        originalname: req.files['sideImage3'][0].originalname,
                        mimetype: req.files['sideImage3'][0].mimetype
                    };
                    recipeData['sideImage3'] = sideImage3;
                }
                if (req.body.step1) {
                    console.log('step added');
                    recipeData['step1'] = req.body.step1;
                }
                if (req.body.step2) {
                    console.log('step added');
                    recipeData['step2'] = req.body.step2;
                }
                if (req.body.step3) {
                    console.log('step added');
                    recipeData['step3'] = req.body.step3;
                }
                if (req.body.step4) {
                    console.log('step added');
                    recipeData['step4'] = req.body.step4;
                }
                if (req.body.step5) {
                    console.log('step added');
                    recipeData['step5'] = req.body.step5;
                }
                if (req.body.category1) {
                    recipeData['category1'] = req.body.category1;
                }
                if (req.body.category2) {
                    recipeData['category2'] = req.body.category2;
                }
                if (req.body.category3) {
                    recipeData['category3'] = req.body.category3;
                }
                if (req.body.category4) {
                    recipeData['category4'] = req.body.category4;
                }
                if (req.body.ingredient1) {
                    recipeData['ingredient1'] = req.body.ingredient1;
                }
                if (req.body.ingredient2) {
                    recipeData['ingredient2'] = req.body.ingredient2;
                }
                if (req.body.ingredient3) {
                    recipeData['ingredient3'] = req.body.ingredient3;
                }
                if (req.body.ingredient4) {
                    recipeData['ingredient4'] = req.body.ingredient4;
                }
                if (req.body.ingredient5) {
                    recipeData['ingredient5'] = req.body.ingredient5;
                }
                if (req.body.ingredient6) {
                    recipeData['ingredient6'] = req.body.ingredient6;
                }
                if (req.body.ingredient7) {
                    recipeData['ingredient7'] = req.body.ingredient7;
                }
                if (req.body.ingredient8) {
                    recipeData['ingredient8'] = req.body.ingredient8;
                }
                if (req.body.ingredient9) {
                    recipeData['ingredient9'] = req.body.ingredient9;
                }
                if (req.body.ingredient10) {
                    recipeData['ingredient10'] = req.body.ingredient10;
                }
                const recipeResult = await recipesController.createRecipe(recipeData);
                res.send(recipeResult);
            } catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        });

}