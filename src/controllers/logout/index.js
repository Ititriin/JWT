const userLogout = (req, res) => {
  res.clearCookie("jwt_token");
  res.redirect(`/login?message=${encodeURIComponent("Oled välja logitud!")}`);
};
module.exports = { userLogout };
