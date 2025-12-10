const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const { authenticateToken } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/auth', authRoutes);
app.use('/api/products', authenticateToken, productRoutes);

// Pages
app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/dashboard', authenticateToken, (req, res) => {
    res.render('dashboard', { user: req.user });
});

// Initialize database and start server
const { initDB } = require('./config/database');

initDB().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log('='.repeat(50));
        console.log('✅ Servidor corriendo correctamente');
        console.log(`🌐 URL: http://localhost:${PORT}`);
        console.log(`📦 Login: http://localhost:${PORT}/login`);
        console.log(`📝 Registro: http://localhost:${PORT}/register`);
        console.log('='.repeat(50));
    });
}).catch(err => {
    console.error('❌ Error inicializando la base de datos:', err);
    process.exit(1);
});
