const cartsDAL = require('./dal');


const createCart = async (cartData) => {
    try {
       const cartResult = await cartsDAL.createCart(cartData.userId, cartData.title, cartData.text);
       cartData.recipes.forEach(async recipeCart => {
            const recipeCartResult = await cartsDAL.addRecipeToCart(cartResult.Id, recipeCart.value, recipeCart.portionsCount);
       });
       return cartResult;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    createCart
};