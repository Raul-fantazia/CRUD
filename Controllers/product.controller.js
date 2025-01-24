

const Product = require('../models/product.model.js');


//exibindo todos os produtos 

const getProducts = async (req,res) =>{
    try {
        const products =  await Product.find({});
        
        res.status(200).json(products);
       } 
        catch (error){
         
        res.status(500).json({message: error.message});
       }
    }

    

    // exibindo pelo id 

    const getProduct = async (req,res) => {
        try {
            const { id } = req.params;
           
            const product = await Product.findById(id);
           
            res.status(200).json(product);
        } 
        
          catch (error) {
          res.status(500).json({message: error.message});
        }
    }

    // para adcionar produtos

    const addProduct = async (req, res) => {
        try {
          const product = await Product.create(req.body);
          res.status(200).json(product); // Corrected line
        } 
        
            catch (error) {
          
            res.status(500).json({ message: error.message });
        }
    }

    // para excluir
    const deleteProduct = async (req, res) => {
      try {
        const { id } = req.params;
    
        const product = await Product.findByIdAndDelete(id);
    
        if (!product) {
          return res.status(404).json({ message: "Produto não encontrado" });
        }
    
        res.status(200).json({ message: "Produto apagado com sucesso!" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
   
    // para atualizar 
    const updateProduct = async (req,res) => {
      try{
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        
        // caso não encontre
        if(!product){
          return res.status(404).json({message: "Produto não encontrado"});
        }
        
        const produtoatualizado = await Product.findById(id);

        res.status(200).json(produtoatualizado);

      } catch(error){
        res.status(500).json({ message: error.message});
      }
    }

    module.exports = {
      getProducts,
      getProduct,
      addProduct,
      deleteProduct,
      updateProduct
  };