const db = require('../db/database');

// Crear tabla si no existe
const createTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT,
      stock INTEGER DEFAULT 0,
      min_stock INTEGER DEFAULT 0,
      price REAL DEFAULT 0,
      supplier TEXT
    )
  `;

  db.run(sql, (err) => {
    if (err) {
      console.error('Error creando tabla products:', err.message);
    } else {
      console.log('Tabla products creada o ya existe.');
    }
  });
};

// Crear nuevo producto
const createProduct = (product, callback) => {
  const { name, category, stock, min_stock, price, supplier } = product;
  const sql = `
    INSERT INTO products (name, category, stock, min_stock, price, supplier)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const params = [name, category, stock, min_stock, price, supplier];

  db.run(sql, params, function (err) {
    callback(err, this?.lastID);
  });
};

module.exports = {
  createTable,
  createProduct
};
