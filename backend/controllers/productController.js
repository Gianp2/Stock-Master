const db = require('../db/database');
const productController = require('../controllers/productController');

// Obtener todos los productos
const getAllProducts = (req, res) => {
  const sql = 'SELECT * FROM products';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
};

// Crear un producto nuevo
const createProduct = (req, res) => {
  const { name, category, stock, min_stock, price, supplier } = req.body;
  const sql = `
    INSERT INTO products (name, category, stock, min_stock, price, supplier)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const params = [name, category, stock, min_stock, price, supplier];

  db.run(sql, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: this.lastID, ...req.body });
    }
  });
};

// Actualizar producto por ID
const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, category, stock, min_stock, price, supplier } = req.body;

  const sql = `
    UPDATE products
    SET name = ?, category = ?, stock = ?, min_stock = ?, price = ?, supplier = ?
    WHERE id = ?
  `;
  const params = [name, category, stock, min_stock, price, supplier, id];

  db.run(sql, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Producto no encontrado' });
    } else {
      res.json({ message: 'Producto actualizado' });
    }
  });
};

// Eliminar producto por ID
const deleteProduct = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM products WHERE id = ?';

  db.run(sql, [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Producto no encontrado' });
    } else {
      res.json({ message: 'Producto eliminado' });
    }
  });
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
