const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const verifyTokenAndUser = require('../middleware/verifyToken');

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
    password: passwordHash,
    email: req.body.email,
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

router.get('/login', (req, res) => {
  const { email, message } = req.query;
  res.render('login', { email, message });
});

router.post('/login', async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.redirect(`/login?message=${encodeURIComponent('Wrong email!')}&email=${encodeURIComponent(email)}`);
  }

  try {
    if (bcryptjs.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET);
      res.cookie('jwt_token', token, { httpOnly: true });
      res.redirect('/dashboard');
    } else {
      res.redirect(`/login?message=${encodeURIComponent('Wrong password!')}&email=${encodeURIComponent(email)}`);
    }
  } catch {
    res.status(500).send;
  }
});

router.get('/dashboard', verifyTokenAndUser, (req, res) => {
  res.render('dashboard');
});

module.exports = router;