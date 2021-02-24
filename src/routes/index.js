const express = require('express');

const verifyTokenAndUser = require('../middleware/verifyToken');

const { renderIndexPage, renderLoginPage, userLogin, renderRegistrationPage, registerUser } = require('../controllers');

const router = express.Router();

router.get('/', renderIndexPage);

router.get('/login', renderLoginPage);
router.post('/login', userLogin);

router.get('/register', renderRegistrationPage);
router.post('/register', registerUser);

router.get('/dashboard', verifyTokenAndUser, (req, res) => {
    const { user } = req;
    res.render('dashboard', { user });
});

router.get('/logout', (req, res) => {
    res.clearCookie('jwt_token');
    res.redirect(`/login?message=${encodeURIComponent("You've been logged out!")}`);
});

module.exports = router;