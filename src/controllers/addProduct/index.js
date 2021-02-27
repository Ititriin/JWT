const renderAddProductPage = (req, res) => {
  const { user } = req;

  if (user) {
    res.redirect("/addproduct");
  } else {
    res.render("Logi sisse");
  }
};

const Product = require("../../models/product.model");
const addProduct = async (req, res) => {
  try {
    await Product.create({ type: req.body.type,
      productName: req.body.productName,
      size: req.body.size,
      sizeUnit: req.body.sizeUnit,
      colour: req.body.colour,
      description: req.body.description,
      price: req.body.description });

    res.redirect('/dashboard');
  } catch (error) {
    res.redirect(`/dashboard?message=${encodeURIComponent('Midagi läks valesti!')}`);
  }
};

module.exports = {
  renderAddProductPage,
  addProduct,
}
