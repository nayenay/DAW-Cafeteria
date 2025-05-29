app.use('/auth', require('./routes/authRoutes'));
app.use('/pedidos', require('./routes/orderRoutes'));
app.use('/reporte', require('./routes/reportRoutes'));

