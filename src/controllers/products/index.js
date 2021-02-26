const { persistUser } = require('../../models');
const { setTokenToCookie } = require('../../util');

const renderProductsPage = (req, res) => {
    const { firstname, lastname, email, username, error } = req.query;
    const { user } = req;

    if (user) {
        res.redirect('/products');
    } else {
        res.render('register', { firstname, lastname, email, username, error });
    }
};

const registerUser = async (req, res) => {
    const { firstname, lastname, email, username, password } = req.body;

    try {
        const user = persistUser(username, password, email, firstname, lastname);
        setTokenToCookie(res, { userId: user.id, username });
        res.redirect('/products');
    } catch (error) {
        res.render('register', {
            firstname,
            lastname,
            email,
            username,
            error: error.message,
        });
    }
};

module.exports = {
    renderProductsPage,
    registerUser,
};
