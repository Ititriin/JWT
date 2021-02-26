const User = require('../../models/user.model');
const username = require('../../models/user.model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const renderLoginPage = (req, res) => {
  const { username, message } = req.query;
  console.log(req.query);
  res.render('login', { username, message });
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).lean();

  if (!user) {
    return res.redirect(`/login?message=${encodeURIComponent('Invalid username!')}&username=${encodeURIComponent(username)}`);
  }

  if (bcryptjs.compareSync(password, user.password)) {
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
    res.cookie('jwt_token', token, { httpOnly: true });
    return res.redirect('/dashboard');
  }
  res.redirect(`/login?message=${encodeURIComponent('Invalid password!')}&password=${encodeURIComponent(username)}`);
};

module.exports = {
  renderLoginPage,
  userLogin,
};
