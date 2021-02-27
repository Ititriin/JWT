const request = require("request");
const { persistUser } = require("../../models");
const { setTokenToCookie } = require("../../util");
const Product = require("../../models/product.model");

const renderProductsPage = async (req, res) => {
  Product.find({}).exec(function (err, data) {
    if (err) throw err;
    res.render("products", { records: data });
  });
};

const registerUser = async (req, res) => {
  const { firstname, lastname, email, username, password } = req.body;

  try {
    const user = persistUser(username, password, email, firstname, lastname);
    setTokenToCookie(res, { userId: user.id, username });
    res.redirect("/products");
  } catch (error) {
    res.render("register", {
      firstname,
      lastname,
      email,
      username,
      error: error.message,
    });
  }
};

const deleteOneProductByID = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/products");
};

module.exports = {
  renderProductsPage,
  registerUser,
  deleteOneProductByID,
};
