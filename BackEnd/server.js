// Importação dos pacotes
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken')
// Se você estiver usando MySQL e o pacote mysql2
// const bcrypt = require('bcryptjs'); // Descomente e instale se for usar hash seguro

// Importando as informações do db.js
const { pool, connectDB } = require('./db')

const app = express();
const port = 3000;
// Use um .env para a chave secreta em produção
const JWT_SECRET = process.env.JWT_SECRET || 'seu_segredo_jwt_muito_forte_123'

// Middlewares
app.use(express.json());
app.use(cors());

// --- 1 ) POST - Rota de Login ---
app.post('/api/autenticacao/login', async (req, res) => {
    // 1. Receber nomeUsuario e senha do corpo da requisição
    const { nomeUsuario, senha } = req.body

    if (!nomeUsuario || !senha) {
        return res.status(400).json({ status: 'error', message: 'Nome de Usuário e senha são campos obrigatórios!' })
    }

    try {
        // 2. Buscando o usuário pelo nome_usuario
        const [users] = await pool.execute(
            `
            SELECT * FROM Usuarios
            WHERE nome_usuario = ?
            `, [nomeUsuario]
        )

        const user = users[0] // Pega o primeiro resultado

        // 3. Verifica se o usuário foi encontrado e se a senha bate
        const credenciaisInvalidas = () => {
             return res.status(401).json({ status: 'error', message: 'Credenciais inválidas.' });
        }

        if (!user) {
            return credenciaisInvalidas();
        }

        // 4. Comparando as senhas (Comparação Direta - NÃO RECOMENDADO EM PRODUÇÃO)
        // Se estiver usando hash, use `await bcrypt.compare(senha, user.senha);`
        const senhaBate = senha === user.senha

        if (senhaBate) {
            // 5. Gerando Token JWT
            const token = jwt.sign(
                { matricula: user.matricula, nome_usuario: user.nome_usuario },
                JWT_SECRET,
                { expiresIn: '1d' }
            )

            // 6. Resposta de sucesso
            return res.json({
                status: 'success',
                message: 'Login bem-sucedido!',
                user: {
                    matricula: user.matricula,
                    nome_usuario: user.nome_usuario
                },
                token: token
            })
        } else {
            // 7. Resposta de erro se a senha não bater
            return credenciaisInvalidas();
        }
    } catch (error) {
        console.error(`Erro na rota de login: ${error.message}`)
        res.status(500).json({ status: 'error', message: 'Erro interno do servidor durante a autenticação.' });
    }
})

// --- Rota Simples de Teste (Exemplo) ---
app.get('/', (req, res) => {
    res.json({ message: 'API rodando...' });
});


// --- Iniciar Servidor e Conexão ao BD ---
(async () => {
    const isConnected = await connectDB();

    if (isConnected) {
        app.listen(port, () => {
            console.log(`Servidor rodando em: http://localhost:${port}`);
        });
    } else {
        console.error('Falha na conexão com o banco de dados. O servidor não será iniciado.');
        process.exit(1);
    }
})();