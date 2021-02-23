const express = require('express');
const bcryptjs = require('bcryptjs');
const fs = require('fs');

const verifyTokenAndUser = require('../middleware/verifyToken');
const { setTokenToCookie } = require('../util');

const { renderIndexPage, renderLoginPage, userLogin } = require('../controllers');

const router = express.Router();

router.get('/', renderIndexPage);

router.get('/login', renderLoginPage);

router.post('/login', userLogin);

router.get('/register', (req, res) => {
    const { firstname, lastname, email, username, error } = req.query;
    res.render('register', { firstname, lastname, email, username, error });
});

router.post('/register', (req, res) => {
    const { firstname, lastname, email, username, password } = req.body;
    let registrationSuccessful = false;
    let existingUsers = [];
    let error = undefined;

    try {
        let newUserID = 1;
        if (fs.existsSync(process.env.DB_NAME)) {
            existingUsers = JSON.parse(fs.readFileSync(process.env.DB_NAME));
            const isUnique = existingUsers.find((user) => user.email === email || user.username === username) === undefined;

            if (!isUnique) {
                error = 'Given e-mail address and/or username is already taken!';
            }
            newUserID = existingUsers.length > 0 ? existingUsers[existingUsers.length - 1].id + 1 : 1;
        }

        const passwordHash = bcryptjs.hashSync(password);
        const user = { id: newUserID, firstname, lastname, email, username, password: passwordHash };

        existingUsers.push(user);
        fs.writeFileSync(process.env.DB_NAME, JSON.stringify(existingUsers));
        setTokenToCookie(res, { userId: newUserID, firstname, lastname, email, username });
        registrationSuccessful = true;
    } catch (error) { }

    if (registrationSuccessful) {
        res.redirect('/dashboard');
    } else {
        res.render('register', {
            firstname,
            lastname,
            email,
            username,
            error,
        });
    }
});

router.get('/dashboard', verifyTokenAndUser, (req, res) => {
    const { user } = req;
    res.render('dashboard', { user });
});

router.get('/logout', (req, res) => {
    res.clearCookie('jwt_token');
    res.redirect(`/login?message=${encodeURIComponent("You've been logged out!")}`);
});

module.exports = router;