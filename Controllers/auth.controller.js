const User = require('../models/User');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. **Removido o código de criptografia com bcrypt**

        // 2. Criar o novo usuário no banco de dados
        const newUser = new User({
            name,
            email,
            password // Salva a senha em texto plano (apenas para teste)
        });

        await newUser.save();

        res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao cadastrar usuário' });
    }
};

module.exports = { register };