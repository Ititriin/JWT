const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyTokenAndUser = require('../middleware/verifyToken');

const { User, Product } = require('.././models');
const { renderLoginPage, userLogin, renderProductsPage, addProduct, deleteOneProductByID } = require('../controllers');

router.get('/', (req, res) => {
  res.renderIndexPage('index');
});

router.get('/register', (req, res) => {
  res.renderRegistrationPage('register');
});


router.post('/register', async (req, res) => {
  const usernameCheck = await User.findOne({ username: req.body.username });
  if (usernameCheck) return res.status(400).send('Kasutajanimi on juba kasutusel!');

  const passwordHash = bcryptjs.hashSync(req.body.password);

  const registrationData = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password: passwordHash,
  });

  const token = jwt.sign({ id: req.body.username }, process.env.JWT_SECRET);
  res.cookie('jwt_token', token, { httpOnly: true });

  try {
    await registrationData.save();
    res.redirect('/dashboard');
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/login', renderLoginPage);
router.post('/login', userLogin);

router.get('/dashboard', verifyTokenAndUser, (req, res) => {
  res.render('dashboard');
});

router.get('/logout', (req, res) => {
  res.clearCookie('jwt_token');
  res.redirect(`/login?message=${encodeURIComponent("Oled välja logitud!")}`);
});


/* router.get('/', function(req, res, next) {
  products.exec(function(err,data){
if(err) throw err;
res.render('index', { title: 'Employee Records', records:data });
  });
  
}); */

router.get('/products', renderProductsPage);

//router.post('/products', verifyTokenAndUser, addProduct);
router.delete('/product/:id', deleteOneProductByID);
//router.delete('/product/:id', deleteOneProductByID);

module.exports = router;