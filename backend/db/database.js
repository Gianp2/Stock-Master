// backend/db/database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'stockmaster.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite en:', dbPath);

    // ESTO ES CLAVE: CREACIÓN DE LA TABLA AQUÍ
    db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      category TEXT,
      stock INTEGER NOT NULL,
      min_stock INTEGER NOT NULL,
      price REAL NOT NULL,
      supplier TEXT
    )`, (err) => {
      if (err) {
        console.error('Error al crear la tabla products:', err.message);
      } else {
        console.log('Tabla products verificada/creada con éxito.');
      }
    });
  }
});

module.exports = db;