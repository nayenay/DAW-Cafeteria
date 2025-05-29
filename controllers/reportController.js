const Order = require('../models/Order');

exports.getDailyReport = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const orders = await Order.find({ createdAt: { $gte: today } });

    const total = orders.length;
    const totalIngresos = orders.reduce((sum, order) => sum + order.precio, 0);

    res.render('report', { total, totalIngresos });
  } catch (err) {
    res.status(500).send('Error al generar el reporte');
  }
};

