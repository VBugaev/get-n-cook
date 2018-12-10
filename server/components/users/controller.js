let usersDAL = require('./dal.js');
let bcrypt = require('bcrypt');
let saltRounds = 10;

const register = async (userData) => {
    const hash = await bcrypt.hash(userData.password, saltRounds);
    userData.password = hash;
    return usersDAL.createUser(userData)
        .then(result => result)
        .catch(err => { throw err; });
};

module.exports = {
    register
};