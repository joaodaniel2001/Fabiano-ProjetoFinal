
// Importação dos pacotes
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken')

// Importando as informações do db.js
const { pool, connectDB } = require('./db')

const app = express();
const port = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'seu_segredo_jwt_muito_forte_123'

app.use(express.json());
app.use(cors());

// --- Iniciar Servidor e Conexão ao BD ---
(async () => {
  const isConnected = await connectDB();

  if (isConnected) {
    app.listen(port, () => {
      console.log(`Servidor rodando em: http://localhost:${port}`);
    });
  } else {
    process.exit(1);
  }
})();

// 1 ) POST - Login
app.post('/api/autenticacao/login', async (req, res) => {
  const { matricula, senha } = req.body

  if (!matricula || !senha) {
    return res.status(400).json({ status: 'error', message: 'Matricula e senha são campos obrigatórios! ' })
  }

  try {
    // Buscando o usuário pela matricula
    const [users] = await pool.execute(
      `
      SELECT matricula, nome, senha FROM Alunos
      WHERE matricula = ?
      `, [matricula]
    )

    const user = users[0]

    if (!users) {
      return res.status(401).json({ status: 'error', message: 'Matrícula ou senha inválida.' });
    }

    // Comparando as senhas
    const senhaBate = senha === user.senha

    if (senhaBate) {
      // Gerando Token JWT
      const token = jwt.sign(
        { matricula: user.matricula, nome: user.nome },
        JWT_SECRET,
        { expiresIn: '1d' }
      )

      return res.json({
        status: 'success',
        message: 'Login bem-sucedido!',
        user: {
          matricula: user.matricula,
          nome: user.nome
        },
        token: token // Enviado para o Front-end React
      })
    } else {
      return res.status(401).json({ status: 'error', message: 'Matrícula ou senha inválida.' });
    }
  } catch (error) {
    console.error(`Erro na rota de login: ${error.message}`)
    res.status(500).json({ status: 'error', message: 'Erro interno do servidor durante a autenticação.' });
  }
})
