let usersDAL = require('./dal.js');
let imagesDAL = require('../images/dal.js');
let rolesDAL = require('../roles/dal.js');
let bcrypt = require('bcrypt');
let tokenHelper = require('./tokenHelper.js');
let saltRounds = 10;

const register = async (userData, userAvatar) => {
    try {
        userData.login = userData.login.toLowerCase();
        const userEmail = await usersDAL.getUserByEmail(userData.email);
        const userlogin = await usersDAL.getUserByLogin(userData.login);
        if (userEmail || userlogin) {
            return {
                error: 'Email или Login уже заняты'
            }
        } else {
            const hash = await bcrypt.hash(userData.password, saltRounds);
            userData.password = hash;
            if (!userData.isCreatedByAdmin) {
                const roleResult = await rolesDAL.getRoleByTitle('User');
                if (roleResult) {
                    
                    userData.roleId = roleResult.Id;
                    let userResult = await usersDAL.createUser(userData);
                    if (userAvatar && userResult.Id) {
                        const normalizedObj = {
                            buffer: userAvatar.buffer,
                            originalname: userAvatar.originalname,
                            mimetype: userAvatar.mimetype
                        };
                        console.log('here');
                        await imagesDAL.uploadImage(normalizedObj, userResult.Id);
                    }
                    return userResult;
                }
            } else {
                return await usersDAL.createUser(userData);
            }
            return {
                error: 'Ошибка при создании юзера'
            };
        }
    } catch (error) {
        console.log(error);
    }
};

const updateUser = async (userData) => {
    try {
        const result = usersDAL.updateUser(userData);
        return result;
    } catch (error) {
        throw error;
    }
}

const login = async (loginData) => {
    const currentUser = await usersDAL.getUserByEmail(loginData.email);
    if (currentUser) {
        const currentPassword = await usersDAL.getPasswordById(currentUser.Id);
        const isMatch = await bcrypt.compare(loginData.password, currentPassword.Hash);
        if (isMatch) {
            return currentUser;
        }
    }
    return false;
}

const toAuthJSON = (userData) => {
    return {
        id: userData.Id,
        email: userData.Email,
        login: userData.Login,
        role: userData.RoleTitle,
        token: tokenHelper.generateToken(userData)
    };
};

module.exports = {
    register,
    login,
    updateUser,
    toAuthJSON
};