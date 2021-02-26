
const renderDashboardPage = (req, res) => {
    const { user } = req;
    console.log(user);

    if (!user) {
        res.redirect(`/login?message=${encodeURIComponent('Please log in!')}`);
    } else {
        
        res.render('dashboard', { user });
    }
};

module.exports = {
    renderDashboardPage,
};
