const ingredientsDAL = require('./dal');
const imagesDAL = require('../images/dal');

const createIngredient = async (title, image) => {
    try {
        const ingredientResult = await ingredientsDAL.createIngredient(title);
        const normalizedObj = {
            buffer: image.buffer,
            originalname: image.originalname,
            mimetype: image.mimetype
        };
        await imagesDAL.uploadImage(normalizedObj, ingredientResult.Id);
        return ingredientResult;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createIngredient
};
