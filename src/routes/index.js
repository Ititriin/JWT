const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyTokenAndUser = require("../middleware/verifyToken");

const { User, Product } = require(".././models");
const {
  renderLoginPage,
  userLogin,
  renderProductsPage,
  renderRegistrationPage,
  deleteOneProductByID,
} = require("../controllers");

router.get("/", (req, res) => {
  res.renderIndexPage("index");
});

router.post("/register", async (req, res) => {
  const usernameCheck = await User.findOne({ username: req.body.username });
  if (usernameCheck)
    return res.status(400).send("Kasutajanimi on juba kasutusel!");

  const passwordHash = bcryptjs.hashSync(req.body.password);

  const registrationData = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password: passwordHash,
  });

  const token = jwt.sign({ id: req.body.username }, process.env.JWT_SECRET);
  res.cookie("jwt_token", token, { httpOnly: true });

  try {
    await registrationData.save();
    res.redirect("/dashboard");
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/addproduct", async (req, res) => {
  const addProduct = new Product({
    type: req.body.type,
    productName: req.body.productName,
    size: req.body.size,
    sizeUnit: req.body.sizeUnit,
    colour: req.body.colour,
    description: req.body.description,
    price: req.body.price,
  });
  try {
    await addProduct.save();
    res.redirect("/products");
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/login", renderLoginPage);
router.post("/login", userLogin);

router.get("/register", renderRegistrationPage);

router.get('/addproduct', verifyTokenAndUser, (req, res) => {
  res.render("addproduct");
});

router.get("/dashboard", verifyTokenAndUser, (req, res) => {
  res.render("dashboard");
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwt_token");
  res.redirect(`/login?message=${encodeURIComponent("Oled välja logitud!")}`);
});

router.get("/products", renderProductsPage);
router.delete("/product/:id", deleteOneProductByID);

router.get('/addproduct', verifyTokenAndUser, (req, res) => {
  res.render("addproduct");
});

module.exports = router;
