const express = require('express');
const router = express.Router();
const authController = require('../Controllers/auth.controller');
const jwt = require('jsonwebtoken');

// para se cadastrar
router.post('/register', authController.register);

// para fazer login
router.post('/login' ,authController.login );

module.exports = router;