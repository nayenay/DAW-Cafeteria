const Order = require('../models/Order');

// Renderiza el formulario
exports.getOrderForm = (req, res) => {
  res.render('orderForm');
};

// Guarda el pedido
exports.createOrder = async (req, res) => {
  const { nombre, drink, ounce, shots } = req.body;
  const precio = calcularPrecio(drink, ounce, shots);
  try {
    const order = new Order({ nombre, drink, ounce, shots, precio, estatus: 'Pendiente' });
    await order.save();
    res.redirect('/orders/list');
  } catch (err) {
    res.status(500).send('Error al crear el pedido');
  }
};

// Lista todos los pedidos
exports.listOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.render('orderList', { orders });
  } catch (err) {
    res.status(500).send('Error al obtener pedidos');
  }
};

// Cambia estatus a entregado
exports.markAsDelivered = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, { estatus: 'Entregado' });
    res.redirect('/orders/list');
  } catch (err) {
    res.status(500).send('Error al actualizar estatus');
  }
};

// Cálculo de precio (lógica simple de ejemplo)
function calcularPrecio(drink, ounce, shots) {
  const basePrice = {
    americano: 25,
    cappuccino: 30,
    espresso: 20,
    latte: 28
  };

  const sizeMultiplier = {
    8: 1,
    12: 1.2,
    16: 1.4
  };

  return (
    (basePrice[drink] || 25) * (sizeMultiplier[ounce] || 1) + (shots - 1) * 5
  );
}

