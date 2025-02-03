const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// para fazer login
const login = async (req,res) => {
    try {
        const { email, password } = req.body;

        // validação
        if( !email || !password ) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios'})
        }

        // verificando se o usuario ja esta no banco de dados
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(401).json({ message: 'Credenciais inválidas'});
        }
        // comparando com a senha salva no banco de dados 
        const scerta = await bcrypt.compare(password, user.password);

        if(!scerta){
            return res.status(401).json({ message: 'Credenciais inválidas'});
        }

        //token awt
        const token = jwt.sign({ userId: user._id }, 'suaChaveSecreta', { expiresIn: '1h' });

        res.status(302).redirect('/menu.html');
        
    }
        catch(error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao fazer login'})
        }
}



// para se cadastrar
const register = async (req, res) => {
    try {
        const { nome, email, password } = req.body;

        // nome do usuario
        if (!nome || nome.trim() === "") {
            return res.status(400).json({ message: "O campo name é obrigatório." });
        }

        if (!email || email.trim() === "") {
            return res.status(400).json({ message: "O campo email é obrigatório." });
        }
        if (!password || password.trim() === "") {
            return res.status(400).json({ message: "O campo password é obrigatório." });
        }
        
        // Verificando se o usuario já existe 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Já existe um usuário com este email." });
        }

        // Criptografia da senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Criação do novo usuário
        const newUser = new User({
            nome,
            email,
            password: hashedPassword,
             
        });

        await newUser.save();

        res.status(302).redirect('/index.html');
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao cadastrar usuário' });
    }
};



module.exports = { register, login };