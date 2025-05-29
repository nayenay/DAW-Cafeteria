const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Formulario de registro
router.get('/register', authController.showRegister);

// Registro de usuario
router.post('/register', authController.register);

// Formulario de login
router.get('/login', authController.showLogin);

// Autenticación de usuario
router.post('/login', authController.login);

// Cierre de sesión
router.get('/logout', authController.logout);

module.exports = router;

