import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './LoginPage.css';

function LoginPage() {
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const { login, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    if (isLoggedIn) {
        navigate('/home', { replace: true });
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const result = await login(matricula, senha);
        if (result.success) navigate('/home');
        else setError(result.message);
    };

    return (
        <div className="login-wrapper">

            <img className="login-logo" src="./sesi-senai-branca.png" alt="SESI SENAI" />

            <div className="login-left">
                <div className="login-box">
                    
                    <h1>Bem-Vindo</h1>
                    <p>ao site do <b>SESI SENAI</b></p>

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

                        <button type="submit">Entrar</button>

                        {error && <p className="error">{error}</p>}

                    </form>
                </div>
            </div>

            <div className="login-right"></div>

        </div>
    );
}

export default LoginPage;
