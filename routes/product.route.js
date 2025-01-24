const express = require("express");
const router = express.Router();
const Product = ("../models/product.model.js");

const {getProducts,getProduct,addProduct,deleteProduct,updateProduct} = require('../Controllers/product.controller');

// todos produtos
router.get('/',getProducts); 

// pelo id
router.get("/:id",getProduct);

// adicionar produtos

router.post("/", addProduct);

// excluindo produtos
router.delete('/:id', deleteProduct);



// atualizando produtos
router.put('/:id', updateProduct);


module.exports = router;
