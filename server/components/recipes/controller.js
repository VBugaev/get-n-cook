const recipesDAL = require('./dal');
const imagesDAL = require('../images/dal');

/* recipeData
{
    title: string,
    difficulty: int,
    preparationTime: int,
    category1: catId1 string,
    category2: catId2 string,
    category3: catId3 string,
    category4: catId4 string,
    ingredient1: iId1-iGrammes1 string,
    ingredient2: iId2-iGrammes2 string,
    ingredient3: iId3-iGrammes3 string,
    ingredient4: iId4-iGrammes4 string,
    ingredient5: iId5-iGrammes5 string,
    ingredient6: iId6-iGrammes6 string,
    ingredient7: iId7-iGrammes7 string,
    ingredient8: iId8-iGrammes8 string,
    ingredient9: iId9-iGrammes9 string,
    ingredient10: iId10-iGrammes10 string,
    previewImage: file,
    sideImage1: file,
    sideImage2: file,
    sideImage3: file
}

*/

const createRecipe = async (recipeData) => {
    try {
        let ingredientsData = [];
        const mockCreatorId = '15093F5F-0284-4D42-8817-CF2CB0F75306';
        const recipeResult = await recipesDAL.createRecipe(mockCreatorId, recipeData.title, recipeData.difficulty, recipeData.preparationTime);
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
        if (recipeData.ingredient1) {
            ingredientsData = recipeData.ingredient1.split(':');
            console.log(ingredientsData);
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
}

module.exports = {
    createRecipe
};