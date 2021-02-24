const main = require('./main');
const login = require('./login');
const register = require('./register');

module.exports = {
    ...main,
    ...login,
    ...register,
};