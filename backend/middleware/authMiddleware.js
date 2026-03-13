// Authentication middleware
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.isAuthenticated) {
        return next();
    }
    res.status(401).json({ success: false, message: 'Unauthorized. Please login.' });
};

module.exports = isAuthenticated;
