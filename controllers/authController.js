const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hash });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    res.status(500).send('Error al registrar usuario');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send('Usuario no encontrado');
    
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).send('Contraseña incorrecta');

    // Crear token y redirigir (simplificado, idealmente usar sesiones seguras)
    const token = jwt.sign({ id: user._id }, 'secreto', { expiresIn: '1h' });
    res.cookie('token', token);
    res.redirect('/orders');
  } catch (err) {
    res.status(500).send('Error al iniciar sesión');
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};

