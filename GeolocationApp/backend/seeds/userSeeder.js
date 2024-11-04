const db = require('../config/db.js'); 
const bcrypt = require('bcrypt');

const seedUsers = () => {
    const users = [
        { email: 'user1@example.com', password: 'password1' },
        { email: 'user2@example.com', password: 'password2' },
    ];

    users.forEach(user => {
        const hashedPassword = bcrypt.hashSync(user.password, 10);
        const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.query(sql, [user.email, hashedPassword], (err) => {
            if (err) console.log('Error seeding user:', err);
            else console.log('User seeded:', user.email);
        });
    });
};

seedUsers();
