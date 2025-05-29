const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Formulario para crear pedido
router.get('/nuevo', orderController.getOrderForm);

// Crear nuevo pedido
router.post('/nuevo', orderController.createOrder);

// Listar pedidos
router.get('/lista', orderController.listOrders);

// Actualizar estatus
router.post('/estatus/:id', orderController.markAsDelivered);

module.exports = router;
