let sql = require('mssql');
let pool = require('../../db.js');

const createCart = async (userId, title, text) => {
    try {
        let connectedPool = await pool;
        const result = await connectedPool.request()
            .input('UserId', sql.UniqueIdentifier, userId)
            .input('Title', sql.NVarChar(50), title)
            .input('Text', sql.NVarChar(100), text)
            .execute('CreateCart');
        return result.recordset[0];
    } catch (error) {
        throw error;
    }
};

const getAllCartsByUserId = async (userId) => {
    try {
        let connectedPool = await pool;
        const result = await connectedPool.request()
            .input('UserId', sql.UniqueIdentifier, userId)
            .execute('GetAllCartsByUserId');
        return result.recordset;
    } catch (error) {
        throw error;
    }

};

const getIngredientListByCart = async (cartId) => {
    try {
        let connectedPool = await pool;
        const result = await connectedPool.request()
            .input('CartId', sql.UniqueIdentifier, cartId)
            .execute('GetIngredientsListByCart');
        return result.recordset;
    } catch (error) {
        throw error;
    }
}

const getAllRecipesByCartId = async (cartId) => {
    try {
        let connectedPool = await pool;
        const result = await connectedPool.request()
            .input('CartId', sql.UniqueIdentifier, cartId)
            .execute('GetAllRecipesByCartId');
            return result.recordset;
    } catch (error) {
        throw error;
    }
};

const addRecipeToCart = async (cartId, recipeId, portionsCount) => {
    try {
        let connectedPool = await pool;
        const result = await connectedPool.request()
            .input('CartId', sql.UniqueIdentifier, cartId)
            .input('RecipeId', sql.UniqueIdentifier, recipeId)
            .input('PortionsCount', sql.Int, portionsCount)
            .execute('AddRecipeToCart');
        return true;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    addRecipeToCart,
    createCart,
    getAllCartsByUserId,
    getAllRecipesByCartId,
    getIngredientListByCart
};