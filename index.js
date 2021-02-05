/* const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/db.sqlite');

db.get('SELECT * FROM users WHERE id = ?;', [1], (error, user) => {
    if (error) {
        console.log(error);
    }
    console.log(user);
}); */

const createApp = require('./src/app');
require('dotenv').config();

const PORT = process.env.SERVER_PORT || 3000;

const app = createApp();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));