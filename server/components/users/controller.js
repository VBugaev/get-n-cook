let usersDAL = require('./dal.js');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let tokenHelper = require('./tokenHelper.js');
let saltRounds = 10;

const register = async (userData) => {
    const hash = await bcrypt.hash(userData.password, saltRounds);
    userData.password = hash;
    return usersDAL.createUser(userData)
        .then(result => result)
        .catch(err => { throw err; });
};

const login = async (loginData) => {
    const currentUser = await usersDAL.getUserByEmail(loginData.email);
    if (currentUser) {
        const currentPassword = usersDAL.getPasswordById(currentUser.Id);
        const isMatch = await bcrypt.compare(loginData.password, currentPassword);
        if (isMatch) {
            return currentUser;
        }
    }
    return false;
}

const toAuthJSON = (userData) => {
    return {
        _id: userData.Id,
        email: userData.Email,
        role: userData.RoleTitle,
        token: tokenHelper.generateToken(userData)
    };
};

module.exports = {
    register,
    login,
    toAuthJSON
};