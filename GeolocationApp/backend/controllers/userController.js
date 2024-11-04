const User = require('../models/User');
const bcrypt = require('bcrypt');
const generateToken = require('../config/auth'); 

const registerUser = (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    User.create(email, hashedPassword, (err) => {
        if (err) {
            console.error('Error registering user:', err);
            return res.status(500).json({ message: 'Error registering user' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
};

const loginUser = (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email, (err, user) => {
        if (err) {
            console.error('Error finding user:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        if (!user) {
            console.log('User not found:', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = bcrypt.compareSync(password, user.password);
        console.log('Password match:', isMatch); 
        if (!isMatch) {
            console.log('Invalid password for user:', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user.id);
        res.json({ token });
    });
};


module.exports = { registerUser, loginUser };
