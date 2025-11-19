
const mysql2 = require('mysql2/promise')

// Conexão com o MySQL
const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'projeto_fabiano',
    port: 3307
})

// Verificando a conexão com o MySQL
async function connectDB() {
    // Conexão bem-sucedida
    try {
        const connection = await pool.getConnection()
        connection.release()
        console.log(`Conexão bem-sucedida!`)
        return true
    } // Caso contrário
    catch (error) {
        console.error(`Erro ao conectar com o MySQL: ${error.message}`)
        return false
    }
}

// Exportando a pool para o server.js
module.exports = {
    pool,
    connectDB
}