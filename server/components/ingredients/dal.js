let sql = require('mssql');
let pool = require('../../db.js');

const getAllIngredients = async (filter) => {
    try {
        let connectedPool = await pool;
        const result = await connectedPool.request()
                            .execute('GetAllIngredients');
        
        if (filter) {
            return result.recordset.filter(ingredient => ingredient.Title.includes(filter));
        }
        return result.recordset;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getIngredientById = async (id) => {
    try {
        let connectedPool = await pool;
        const result = await connectedPool.request()
                            .input('IngredientId', sql.UniqueIdentifier, id)
                            .execute('GetIngredientById');
        return result.recordset[0];
    } catch (error) {
        throw error;
    }
};

const createIngredient = async (title) => {
    try {
        let connectedPool = await pool;
        const result = await connectedPool.request()
                            .input('Title', sql.NVarChar(50), title.trim())
                            .execute('CreateIngredient');
        return result.recordset[0];
    } catch (error) {
        throw error;
    }
};

const deleteIngredient = async (id) => {
    try {
        let connectedPool = await pool;
        const result = await connectedPool.request()
                            .input('IngredientId', sql.UniqueIdentifier, id)
                            .execute('DeleteIngredient');
        return true;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllIngredients,
    getIngredientById,
    createIngredient,
    deleteIngredient
};