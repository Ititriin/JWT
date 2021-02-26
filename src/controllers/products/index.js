// const fetch = require("isomorphic-fetch");
const request = require('request');
const { persistUser } = require("../../models");
const { setTokenToCookie } = require("../../util");

const renderProductsPage = (req, res) => {
  const { firstname, lastname, email, username, error } = req.query;
  const { user } = req;

  if (user) {
    res.redirect("/login");
  } else {
    /* fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((out) => {
      console.log("Output: ", out);
    })
    .catch((err) => console.error(err)); */
    const requestOptions = {
      url: 'http://localhost:3000/api/products',
      method: 'GET',
      json: {},
    };
    request(requestOptions, (err, response, body) => {
      if (err) {
        console.log(err);
      } else if (response.statusCode === 200) {
        console.log(body);
        res.render("products", { title: 'Employee Records', records:body["allProducts"]});
      } else {
        console.log(response.statusCode);
      }
    });
    //allProducts
    //res.render("products", { title: 'Employee Records', records:[{productName: "test toode"}, {productName: "test toode2"}] });
    //res.render("products", { title: 'Employee Records', records:body});
  }
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

const Product = require("../../models/product.model");

const addProduct = async (req, res) => {
  try {
    await Product.create({
      type: req.body.type,
      productName: req.body.productName,
      size: req.body.size,
      sizeUnit: req.body.sizeUnit,
      colour: req.body.colour,
      description: req.body.description,
      price: req.body.description,
    });
  } catch (error) {
    res.redirect(`/products?message=${encodeURIComponent("Oops!")}`);
  }
};

const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/products");
};

module.exports = {
  renderProductsPage,
  registerUser,
  addProduct,
  deleteProduct,
};
