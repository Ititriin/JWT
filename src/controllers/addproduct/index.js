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