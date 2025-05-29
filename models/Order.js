const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  drink: {
    type: String,
    required: true,
    enum: ['americano', 'cappuccino', 'espresso', 'latte']
  },
  ounce: {
    type: Number,
    required: true,
    enum: [8, 12, 16]
  },
  shots: {
    type: Number,
    default: 1,
    min: 1,
    max: 5
  },
  precio: {
    type: Number,
    required: true
  },
  estatus: {
    type: String,
    enum: ['Pendiente', 'Entregado'],
    default: 'Pendiente'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

