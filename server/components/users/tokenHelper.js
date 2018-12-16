const jwt = require('jsonwebtoken');
const secret = 'secret';

const generateToken = (user) => {
    return jwt.sign({
        _id: user.Id,
        name: user.Email,
        role: user.RoleName,
    }, secret, { expiresIn: '3h' });
};

const verifyToken = (token) => {
    try {
        const user = jwt.verify(token, secret);
        return user;
    } catch (err) {
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken
};