let sql = require('mssql');
let pool = require('../../db.js');

const getAllRecipes = async (filter) => {
    try {
        let connectedPool = await pool;
        const result = await connectedPool.request()
            .execute('GetAllRecipes');

        if (filter) {
            return result.recordset.filter(ingredient => ingredient.Title.includes(filter));
        }
        return result.recordset;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const createRecipe = async (creatorId, title, difficulty, preparationTime) => {
    try {
        let connectedPool = await pool;
        const result = await connectedPool.request()
            .input('CreatorId', sql.UniqueIdentifier, creatorId)
            .input('Title', sql.NVarChar(50), title)
            .input('Difficulty', sql.Int, difficulty)
            .input('PreparationTime', sql.Int, preparationTime)
            .execute('CreateRecipe');
        return result.recordset[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getRecipesByUserId = async (userId) => {
    try {
        let connectedPool = await pool;
        const result = await connectedPool.request()
            .input('UserId', sql.UniqueIdentifier, userId)
            .execute('GetAllRecipesByUserId');
        return result.recordset;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getRecipeById = async (recipeId) => {
    try {
        let connectedPool = await pool;
        const result = await connectedPool.request()
            .input('RecipeId', sql.UniqueIdentifier, recipeId)
            .execute('GetRecipeById');
        return result.recordset[0];
    } catch (error) {
        throw error;
    }
}



const getAllStepsByRecipeId = async (recipeId) => {
    try {
        let connectedPool = await pool;
        const result = await connectedPool.request()
            .input('RecipeId', sql.UniqueIdentifier, recipeId)
            .execute('GetAllRecipeSteps');
        return result.recordset;
    } catch (error) {
        throw error;
    }
}

const createStep = async (desc) => {
    try {
        let connectedPool = await pool;
        let result = await connectedPool.request()
            .input('Description', sql.NVarChar(sql.MAX), desc)
            .execute('CreateStep');
        return result.recordset[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const addStepToRecipe = async (recipeId, stepId, orderNumber) => {
    try {
        let connectedPool = await pool;
        await connectedPool.request()
            .input('RecipeId', sql.UniqueIdentifier, recipeId)
            .input('StepId', sql.UniqueIdentifier, stepId)
            .input('OrderNumber', sql.Int, orderNumber)
            .execute('AddStepToRecipe');
        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const addImageToRecipe = async (recipeId, imageId) => {
    try {
        let connectedPool = await pool;
        await connectedPool.request()
            .input('RecipeId', sql.UniqueIdentifier, recipeId)
            .input('ImageId', sql.UniqueIdentifier, imageId)
            .execute('AddImageToRecipe');
        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
const addCategoryToRecipe = async (recipeId, categoryId) => {
    try {
        let connectedPool = await pool;
        await connectedPool.request()
            .input('RecipeId', sql.UniqueIdentifier, recipeId)
            .input('CategoryId', sql.UniqueIdentifier, categoryId)
            .execute('AddCategoryToRecipe');
        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }

 }
const addIngredientToRecipe = async (recipeId, ingredientId, grammes) => {
    try {
        let connectedPool = await pool;
        await connectedPool.request()
            .input('RecipeId', sql.UniqueIdentifier, recipeId)
            .input('IngredientId', sql.UniqueIdentifier, ingredientId)
            .input('Grammes', sql.Int, grammes)
            .execute('AddIngredientToRecipe');
        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
 }

 const getAllImagesByRecipeId = async (recipeId) => {
    try {
        let connectedPool = await pool;
        let result = await connectedPool.request()
            .input('RecipeId', sql.UniqueIdentifier, recipeId)
            .execute('GetAllImagesByRecipeId');
            return result.recordset;
    } catch (error) {
        console.log(error);
        throw error;
    }
 }

const getAllIngredientsByRecipeId = async (recipeId) => {
    try {
        let connectedPool = await pool;
        let result = await connectedPool.request()
            .input('RecipeId', sql.UniqueIdentifier, recipeId)
            .execute('GetAllRecipeIngredients');
        return result.recordset;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getAllReviewsByRecipeId = async (recipeId) => {
    try {
        let connectedPool = await pool;
        let result = await connectedPool.request()
            .input('RecipeId', sql.UniqueIdentifier, recipeId)
            .execute('GetAllRecipeReviews');
        return result.recordset;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getAllCategoriesByRecipeId = async (recipeId) => {
    try {
        let connectedPool = await pool;
        let result = await connectedPool.request()
            .input('RecipeId', sql.UniqueIdentifier, recipeId)
            .execute('GetAllCategoriesByRecipeId');
            return result.recordset;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    getAllRecipes,
    getRecipesByUserId,
    getRecipeById,
    getAllStepsByRecipeId,
    getAllImagesByRecipeId,
    getAllIngredientsByRecipeId,
    getAllReviewsByRecipeId,
    getAllCategoriesByRecipeId,
    createRecipe,
    createStep,
    addImageToRecipe,
    addStepToRecipe,
    addCategoryToRecipe,
    addIngredientToRecipe
};