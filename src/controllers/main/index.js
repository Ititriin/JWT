const renderIndexPage = (req, res) => {
  const { user } = req;

  if (user) {
    res.redirect("/dashboard");
  } else {
    res.render("index");
  }
};

module.exports = {
  renderIndexPage,
};
