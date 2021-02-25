const Products = require('../../models/product.model');

const addProduct = async (req, res) => {
  try {
    await Products.create(req.body);
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  addProduct,
};