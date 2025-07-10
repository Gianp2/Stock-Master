const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  deleteProduct,
} = require('../controllers/productController');

const { verifyToken, checkRole } = require('../auth/authMiddleware');

// Rutas públicas (sin autenticación)
router.get('/', getAllProducts);
router.post('/', createProduct);
router.delete('/:id', deleteProduct);

// Rutas protegidas (con autenticación y roles)
router.get('/products', verifyToken, getAllProducts); // cualquier usuario logueado
router.post('/products', verifyToken, checkRole('admin'), createProduct); // solo admin
router.delete('/products/:id', verifyToken, checkRole('admin'), deleteProduct); // solo admin

module.exports = router;
