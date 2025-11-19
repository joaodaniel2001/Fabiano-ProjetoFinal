import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './LoginPage.css'

function LoginPage() {
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const { login, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    // Redirecionamento imediato: Se já estiver logado, não precisa ver o login
    if (isLoggedIn) {
        navigate('/home', { replace: true });
        return null; // Não renderiza nada enquanto redireciona
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpa erros anteriores

        // Chama a função login do AuthContext
        const result = await login(matricula, senha);

        if (result.success) {
            navigate('/home');
        } else {
            // Login Falhou: Exibe a mensagem de erro da API
            setError(result.message);
        }
    };

    return (
        <div className='loginPage'>
            <div className="login-header">
                <img src="./sesi-senai-branca.png" alt="SESISENAI" />
            </div>
            <div className="login-column">
                <div className="login-container">
                    <div style={{ display: 'flex', textAlign: 'center', flexDirection: 'column' }}>
                        <h1>Bem-Vindo</h1>
                        <p>ao site do <b>SESI SENAI</b></p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Matrícula"
                            value={matricula}
                            onChange={(e) => setMatricula(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                        <button type="submit">
                            Entrar
                        </button>
                        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                    </form>
                </div>
            </div>
            <div className="login-column-2">

            </div>
        </div >
    );
}

export default LoginPage;