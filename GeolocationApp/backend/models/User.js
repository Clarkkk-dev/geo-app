const db = require('../config/db');

const User = {
    create: (email, password, callback) => {
        const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.query(sql, [email, password], (err, results) => {
            callback(err, results);
        });
    },

    findByEmail: (email, callback) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.query(sql, [email], (err, results) => {
            if (err) return callback(err);
            if (results.length === 0) return callback(null, null); // User not found
            return callback(null, results[0]); // Return the user
        });
    },
};

module.exports = User;
