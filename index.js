
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const routes = require('./routes/product.route.js');
require('dotenv').config();



// middlewares
app.use(express.json());

app.use('/api/products', routes);



  // conectando ao banco de dados

  mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado ao MongoDB');

   
    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000");
    });
  })
  .catch(err => console.error('Erro ao conectar:', err));





