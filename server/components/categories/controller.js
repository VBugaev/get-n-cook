let categoriesDAL = require('./dal.js');

const createCategory = async (title) => {
    try {
        let updatedTitle = title.toLowerCase();
        let catResult = await categoriesDAL.getCategoryByTitle(updatedTitle);
        if (catResult) {
            return { error: 'Категория с таким именем уже существует' };
        }
        let result = await categoriesDAL.createCategory(updatedTitle);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const updateCategory = async (id, title) => {
    let updatedTitle = title.toLowerCase();
    let catResult = await categoriesDAL.getCategoryByTitle(updatedTitle);
    if (catResult) {
        return { error: 'Категория с таким именем уже существует' };
    }
    let result = await categoriesDAL.updateCategory({ id, title });
    return result;
};

module.exports = {
    createCategory,
    updateCategory
}
