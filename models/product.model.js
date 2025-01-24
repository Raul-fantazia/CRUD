const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "informe o nome por favor"]
  },
  preco: {
    type: Number,
    required: [true, "Informe o preço por favor"]
  },
  quantidade: {
    type: Number,
    required: [true, "Informe a quantidade por favor"],
    default: 0
  }
});

const Product = mongoose.model('Product', productSchema); 

module.exports = Product;