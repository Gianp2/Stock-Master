const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { createTable } = require('./models/productModel');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

const authRoutes = require('./auth/authRoutes');
app.use('/api/auth', authRoutes);


app.use(cors());
app.use(express.json());

// Crear tabla productos
createTable();

// Servir archivos estáticos desde la carpeta 'frontend'
app.use(express.static('frontend'));

// Ruta raíz para servir index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontend/index.html');
});

// Rutas de la API
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});