const bcrypt = require('bcryptjs');
const db = require('../database/db');

// Login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Username and password are required' });
        }

        let admin = null;

        try {
            const [rows] = await db.query('SELECT * FROM admins WHERE username = ?', [username]);
            admin = rows[0];
        } catch (e) {
            // Fallback to in-memory store
            const store = db.getStore();
            admin = store.admins.find(a => a.username === username);
        }

        if (!admin) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Set session
        req.session.isAuthenticated = true;
        req.session.adminId = admin.id;
        req.session.username = admin.username;

        res.json({
            success: true,
            message: 'Login successful',
            data: { username: admin.username }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Logout
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Logout failed' });
        }
        res.json({ success: true, message: 'Logged out successfully' });
    });
};

// Check authentication status
exports.checkAuth = (req, res) => {
    if (req.session && req.session.isAuthenticated) {
        res.json({
            success: true,
            data: { username: req.session.username }
        });
    } else {
        res.status(401).json({ success: false, message: 'Not authenticated' });
    }
};
