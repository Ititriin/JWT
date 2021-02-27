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
      price: req.body.price,
    });
    res.redirect("/addproduct");
  } catch (error) {
    res.redirect(
      `/addproduct?message=${encodeURIComponent("Something went wrong")}`
    );
  }
};

module.exports = {
  addProduct,
};

/* module.exports = {
  renderAddProductPage,
  addProduct,
};
 */
/* const { Product } = require("../../models");

const renderAddProductPage = (req, res) => {
  const { user } = req;

  if (user) {
      res.redirect('/dashboard');
  } else {
      res.render('addproduct', { firstname, lastname, email, username, error });
  }
};

const addProduct = async (req, res) => {
  const addProduct = new Product ({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password: passwordHash,
  });
  res.render(addproduct);
};

module.exports = {
  renderAddProductPage,
  addProduct,
}; */
