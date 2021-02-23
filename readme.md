### step 1
sqlite3 db.sqlite

### step 2
npm install
npm init
npm install express ejs dotenv body-parser jsonwebtoken bcryptjs sqlite3 morgan cookie-parser

### problems
// Faili nimi index.js
// Käivitamiseks: node index.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/db.sqlite');

db.get('SELECT * FROM users WHERE id = ?;', [1], (error, user) => {
    if (error) {
        console.log(error);
    }
    console.log(user);
});

npm install nodemon --save-dev


### uurida
jtw.io debuggerit tokeni osas


### muud võimalused:
- sessiooni kasutamine PHP arendajate poolt (sessioon hoitakse serveris ja cookiesse salvestataksae sessiooniID, mis üles leitakse)
- salvestada, mis IP aadressilt token loodi (kui token varastatakse, siis andmebaasis võrreldakse IP-sid ja öeldakse IP mismatch)