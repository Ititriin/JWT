const { getUserByUsername } = require('../../models');
const { setTokenToCookie } = require('../../util');
const bcryptjs = require('bcryptjs');

const renderLoginPage = (req, res) => {
    const { username, message } = req.query;
    const { user } = req;

    if (user) {
        res.redirect('/dashboard');
    } else {
        res.render('login', { username, message });
    }
};

const userLogin = (req, res) => {
    const { username, password } = req.body;
    let isAuthenticated = false;
    let authFailedMessage = 'No such user or incorrect password!';
    let user = undefined;

    try {
        user = getUserByUsername(username);
    } catch (error) {
        authFailedMessage = error.message;
    }

    if (user && bcryptjs.compareSync(password, user.password)) {
        const { id, username, email, firstname, lastname } = user;
        setTokenToCookie(res, { userId: id, username });
        isAuthenticated = true;
    }

    if (isAuthenticated) {
        res.redirect('/dashboard');
    } else {
        res.redirect(
            `/login?message=${encodeURIComponent(authFailedMessage)}&username=${encodeURIComponent(username)}`,
        );
    }
};

const logout = (req, res) => {
    res.clearCookie('jwt_token');
    res.redirect(`/login?message=${encodeURIComponent("You've been logged out!")}`);
};

module.exports = {
    renderLoginPage,
    userLogin,
    logout,
};
