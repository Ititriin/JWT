const main = require('./main');
const login = require('./login');
const register = require('./register');
const dashboard = require('./dashboard');

module.exports = {
    ...main,
    ...login,
    ...register,
    ...dashboard,
};
