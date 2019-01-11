const recipesDAL = require('./dal');
const imagesDAL = require('../images/dal');

const createRecipe = async (recipeData) => {
    try {
        let ingredientsData = [];
        const recipeResult = await recipesDAL.createRecipe(recipeData.userId, recipeData.title, recipeData.difficulty, recipeData.preparationTime);
        await imagesDAL.uploadImage(recipeData.previewImage, recipeResult.Id);
        if (recipeData.sideImage1) {
            const sideImage1Result = await imagesDAL.uploadImage(recipeData.sideImage1);
            await recipesDAL.addImageToRecipe(recipeResult.Id, sideImage1Result.Id);
        }
        if (recipeData.sideImage2) {
            const sideImage2Result = await imagesDAL.uploadImage(recipeData.sideImage2);
            await recipesDAL.addImageToRecipe(recipeResult.Id, sideImage2Result.Id);
        }
        if (recipeData.sideImage3) {
            const sideImage3Result = await imagesDAL.uploadImage(recipeData.sideImage3);
            await recipesDAL.addImageToRecipe(recipeResult.Id, sideImage3Result.Id);
        }
        if (recipeData.category1) {
            await recipesDAL.addCategoryToRecipe(recipeResult.Id, recipeData.category1);
        }
        if (recipeData.category2) {
            await recipesDAL.addCategoryToRecipe(recipeResult.Id, recipeData.category2);    
        }
        if (recipeData.category3) {
            await recipesDAL.addCategoryToRecipe(recipeResult.Id, recipeData.category3);
        }
        if (recipeData.category4) {
            await recipesDAL.addCategoryToRecipe(recipeResult.Id, recipeData.category4);
        }
        if (recipeData.step1) {
            let step1result = await recipesDAL.createStep(recipeData.step1);
            await recipesDAL.addStepToRecipe(recipeResult.Id, step1result.Id, 1)
        }
        if (recipeData.step2) {
            let step2result = await recipesDAL.createStep(recipeData.step2);
            await recipesDAL.addStepToRecipe(recipeResult.Id, step2result.Id, 2)
        }
        if (recipeData.step3) {
            let step3result = await recipesDAL.createStep(recipeData.step3);
            await recipesDAL.addStepToRecipe(recipeResult.Id, step3result.Id, 3)
        }
        if (recipeData.step4) {
            let step4result = await recipesDAL.createStep(recipeData.step4);
            await recipesDAL.addStepToRecipe(recipeResult.Id, step4result.Id, 4)
        }
        if (recipeData.step5) {
            let step5result = await recipesDAL.createStep(recipeData.step5);
            await recipesDAL.addStepToRecipe(recipeResult.Id, step5result.Id, 5)
        }
        if (recipeData.ingredient1) {
            ingredientsData = recipeData.ingredient1.split(':');
            await recipesDAL.addIngredientToRecipe(recipeResult.Id, ingredientsData[0], +ingredientsData[1]);
        }
        if (recipeData.ingredient2) {
            ingredientsData = recipeData.ingredient2.split(':');
            await recipesDAL.addIngredientToRecipe(recipeResult.Id, ingredientsData[0], +ingredientsData[1]);
        }
        if (recipeData.ingredient3) {
            ingredientsData = recipeData.ingredient3.split(':');
            await recipesDAL.addIngredientToRecipe(recipeResult.Id, ingredientsData[0], +ingredientsData[1]);
        }
        if (recipeData.ingredient4) {
            ingredientsData = recipeData.ingredient4.split(':');
            await recipesDAL.addIngredientToRecipe(recipeResult.Id, ingredientsData[0], +ingredientsData[1]);
        }
        if (recipeData.ingredient5) {
            ingredientsData = recipeData.ingredient5.split(':');
            await recipesDAL.addIngredientToRecipe(recipeResult.Id, ingredientsData[0], +ingredientsData[1]);
        }
        if (recipeData.ingredient6) {
            ingredientsData = recipeData.ingredient6.split(':');
            await recipesDAL.addIngredientToRecipe(recipeResult.Id, ingredientsData[0], +ingredientsData[1]);
        }
        if (recipeData.ingredient7) {
            ingredientsData = recipeData.ingredient7.split(':');
            await recipesDAL.addIngredientToRecipe(recipeResult.Id, ingredientsData[0], +ingredientsData[1]);
        }
        if (recipeData.ingredient8) {
            ingredientsData = recipeData.ingredient8.split(':');
            await recipesDAL.addIngredientToRecipe(recipeResult.Id, ingredientsData[0], +ingredientsData[1]);
        }
        if (recipeData.ingredient9) {
            ingredientsData = recipeData.ingredient9.split(':');
            await recipesDAL.addIngredientToRecipe(recipeResult.Id, ingredientsData[0], +ingredientsData[1]);
        }
        if (recipeData.ingredient10) {
            ingredientsData = recipeData.ingredient10.split(':');
            await recipesDAL.addIngredientToRecipe(recipeResult.Id, ingredientsData[0], +ingredientsData[1]);
        }
        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getRecipeById = async (recipeId) => {
    try {
        const recipeResult = await recipesDAL.getRecipeById(recipeId);
        const recipeCategories = await recipesDAL.getAllCategoriesByRecipeId(recipeId);
        const recipeIngredients = await recipesDAL.getAllIngredientsByRecipeId(recipeId);
        const recipeReviews = await recipesDAL.getAllReviewsByRecipeId(recipeId);
        const recipeImages = await recipesDAL.getAllImagesByRecipeId(recipeId);
        const recipeSteps = await recipesDAL.getAllStepsByRecipeId(recipeId);
        
        return {
            ...recipeResult,
            Categories: recipeCategories || [],
            Ingredients: recipeIngredients || [],
            Images: recipeImages || [],
            Reviews: recipeReviews || [],
            Steps: recipeSteps || []
        };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createRecipe,
    getRecipeById
};