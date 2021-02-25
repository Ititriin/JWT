const renderDashboardPage = (req, res) => {
    const { user } = req;

    if (!user) {
        res.redirect(`/login?message=${encodeURIComponent('Please log in!')}`);
    } else {
        res.render('dashboard', { user });
    }
};

module.exports = {
    renderDashboardPage,
};
