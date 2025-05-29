const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Mostrar formulario de registro
router.get('/register', authController.showRegisterForm);

// Procesar registro de usuario
router.post('/register', authController.register);

// Mostrar formulario de login
router.get('/login', authController.showLoginForm);

// Procesar inicio de sesión
router.post('/login', authController.login);

// Cerrar sesión
router.get('/logout', authController.logout);

module.exports = router;
