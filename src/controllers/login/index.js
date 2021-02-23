const renderLoginPage = (req, res) => {
    const { username, message } = req.query;
    res.render('login', { username, message });
};

const userLogin = (req, res) => {
    const { username, password } = req.body;
    let isAuthenticated = false;
    let authFailedMessage = 'Oops! Something went wrong!';

    try {
        if (fs.existsSync(process.env.DB_NAME)) {
            const existingUsers = JSON.parse(fs.readFileSync(process.env.DB_NAME));
            const user = existingUsers.find((user) => user.username === username);

            if (user && bcryptjs.compareSync(password, user.password)) {
                const { id, username, email, firstname, lastname } = user;
                setTokenToCookie(res, { userId: id, username, email, firstname, lastname });
                isAuthenticated = true;
            }
        }
    } catch (error) { }

    if (isAuthenticated) {
        res.redirect('/dashboard');
    } else {
        res.redirect(
            `/login?message=${encodeURIComponent(authFailedMessage)}&username=${encodeURIComponent(username)}`,
        );
    }
};

module.exports = {
    renderLoginPage,
    userLogin,
};