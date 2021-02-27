const request = require("request");
const { persistUser } = require("../../models");
const { setTokenToCookie } = require("../../util");
const Product = require("../../models/product.model");

/* const renderProductsPage = (req, res) => {
  const { user } = req;

  if (user) {
    res.redirect("/login");
  } else {
    const requestOptions = {
      url: "http://localhost:8081/products",
      method: "GET",
      json: {},
    };
    request(requestOptions, (err, response, body) => {
      if (err) {
        console.log(err);
      } else if (response.statusCode === 200) {
        console.log(body);
        res.render("/products", {
          records: body["allProducts"],
        });
      } else {
        console.log(response.statusCode);
      }
    });
  }
}; */

const renderProductsPage = async (req, res) => {
  Product.find({}).exec(function (err, data) {
    if (err) throw err;
    res.render('products', { records: data });
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

/* const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/products/:id");
}; */

/* const deleteProduct = async function (req, res) {
  try {
    const product = await Product.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}; */

const deleteOneProductByID = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/products");
};


/* function deleting(value) {
  fetch("/delete", { method: "POST", data: { buttonId: value } })
    .then(function (response) {
      if (response.ok) {
        console.log("Delete was recorded");
        return;
      }
      throw new Error("Request failed.");
    })
    .catch(function (error) {
      console.log(error);
    });
} */

/* const db = require('../db');
const Products = db.Products;

module.exports = async function (req, res) {
  try {
    const product = await Products.deleteOne({ _id: req.params.id });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}; */

module.exports = {
  renderProductsPage,
  registerUser,
  deleteOneProductByID,
};
