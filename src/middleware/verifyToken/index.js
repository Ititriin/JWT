const jwt = require('jsonwebtoken');
const fs = require('fs');

const verifyTokenAndUser = (req, res, next) => {
    const token = req.cookies['jwt_token'];
    let isAuthenticated = false;
    let authFailedMessage = 'Authentication failed, please log in again!';

    try {
        if (token) {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const { userId, username } = decodedToken;
            if (fs.existsSync(process.env.DB_NAME)) {
                const existingUsers = JSON.parse(fs.readFileSync(process.env.DB_NAME));
                const user = existingUsers.find((user) => user.id === userId && user.username === username);

                if (user) {
                    req.user = user;
                    isAuthenticated = true;
                }
            }
        }
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            authFailedMessage = 'Session has expired, please log in!';
        }
        authFailedMessage = 'Unexpected error, please try logging in again!';
    }

    if (isAuthenticated) {
        next();
    } else {
        res.redirect(`/login?message=${encodeURIComponent(authFailedMessage)}`);
    }
};

module.exports = verifyTokenAndUser;
