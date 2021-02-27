const main = require("./main");
const login = require("./login");
const register = require("./register");
const dashboard = require("./dashboard");
const products = require("./products");
const addproduct = require("./addproduct");

module.exports = {
  ...main,
  ...login,
  ...register,
  ...dashboard,
  ...products,
  ...addproduct,
};
