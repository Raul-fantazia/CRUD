const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    nome: { type: String, required: true },
   
    email: { type: String, required: true, unique: true },
    
    password: { type: String, required: true } // Importante: Criptografar antes de salvar
});

module.exports = mongoose.model('User', userSchema);