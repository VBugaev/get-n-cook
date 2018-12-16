const passport = require('passport');
const LocalStrategy = require('passport-local');

const users = require('../components/users/controller.js');

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]',
}, (email, password, done) => {
    let loginData = {
        email,
        password
    };
    let user = users.login(loginData);
    if (user) {
        return done(null, user);
    }
    return done(null, false, { errors: { 'email or password': 'is invalid' } });
}));