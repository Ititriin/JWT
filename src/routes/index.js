const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyTokenAndUser = require('../middleware/verifyToken');

const { User, Product } = require('.././models');
const { renderLoginPage, userLogin } = require('../controllers');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const emailCheck = await User.findOne({ email: req.body.email });
  if (emailCheck) return res.status(400).send('Email already in use!');

  const passwordHash = bcryptjs.hashSync(req.body.password);

  const registrationData = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: passwordHash,
  });

  const token = jwt.sign({ id: req.body.email }, process.env.JWT_SECRET);
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
  Product.find({}).exec(function (err, data) {
    if (err) throw err;
    res.render('dashboard', { title: 'Title', records: data });
  });
});

router.get('/logout', (req, res) => {
  res.clearCookie('jwt_token');
  res.redirect(`/login?message=${encodeURIComponent("You have been logged out!")}`);
});

module.exports = router;
