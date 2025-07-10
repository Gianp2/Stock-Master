const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  // lógica de login
  res.send('Login');
});

router.post('/register', (req, res) => {
  // lógica de registro
  res.send('Register');
});

module.exports = router;
