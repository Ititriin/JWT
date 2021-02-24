const User = require('../../models/user.model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const renderLoginPage = (req, res) => {
  const { email, message } = req.query;
  res.render('login', { email, message });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).lean();

  if (!user) {
    return res.redirect(`/login?message=${encodeURIComponent('Invalid email!')}&email=${encodeURIComponent(email)}`);
  }

  if (bcryptjs.compareSync(password, user.password)) {
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
    res.cookie('jwt_token', token, { httpOnly: true });
    return res.redirect('/dashboard');
  }

  res.redirect(`/login?message=${encodeURIComponent('Invalid password!')}&email=${encodeURIComponent(email)}`);
};

module.exports = {
  renderLoginPage,
  userLogin,
};
