const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'mi-secreto-jwt-2024';

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.clearCookie('token');
        return res.redirect('/login');
    }
};

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, nombre: user.nombre },
        JWT_SECRET,
        { expiresIn: '24h' }
    );
};

module.exports = { authenticateToken, generateToken, JWT_SECRET };
