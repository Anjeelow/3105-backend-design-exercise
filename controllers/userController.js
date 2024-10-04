const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key';

const userController = {
    register: (req, res) => {
        const { username, password, email } = req.body;

        fs.readFile(path.join(__dirname, '../data/users.json'), 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to read users' });
            }

            const users = JSON.parse(data);
            const existingUser = users.find(user => user.username === username);
            
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            const newUser = { id: users.length + 1, username, password, email };
            users.push(newUser);

            fs.writeFile(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Failed to save user' });
                }
                return res.status(201).json({ message: 'User registered successfully' });
            });
        });
    },

    login: (req, res) => {
        const { username, password } = req.body;

        fs.readFile(path.join(__dirname, '../data/users.json'), 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to read users' });
            }

            const users = JSON.parse(data);
            const user = users.find(user => user.username === username);

            if (!user || user.password !== password) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
            return res.json({ token });
        });
    },

    getProfile: (req, res) => {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid token' });
            }

            fs.readFile(path.join(__dirname, '../data/users.json'), 'utf8', (err, data) => {
                if (err) {
                    return res.status(500).json({ error: 'Failed to read users' });
                }

                const users = JSON.parse(data);
                const user = users.find(user => user.id === decoded.id);
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                
                return res.json({ username: user.username, email: user.email });
            });
        });
    }
};

module.exports = userController;
