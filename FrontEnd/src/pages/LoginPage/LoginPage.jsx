import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './LoginPage.css';

function LoginPage() {
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const { login, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    // 🚀 Lógica de Redirecionamento com useEffect (CORRETA)
    // Redireciona o usuário para a home se ele JÁ estiver logado.
    useEffect(() => {
        if (isLoggedIn) {
            // Chama navigate APÓS a renderização do componente
            navigate('/home', { replace: true });
        }
    }, [isLoggedIn, navigate]); // Dependências: Roda quando isLoggedIn ou navigate mudam

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const result = await login(nomeUsuario, senha);

        if (result.success) {
            // Esta navegação em um manipulador de evento (após o login) está CORRETA.
            navigate('/home');
        } else {
            setError(result.message);
        }
    };

    // O JSX só será renderizado se `isLoggedIn` for `false` inicialmente (ou no primeiro render).
    // O useEffect se encarregará de redirecionar se o estado for `true`.
    return (
        <div className="login-wrapper"> {/* Mantive uma classe de wrapper comum */}

            <img className="login-logo" src="./sesi-senai-branca.png" alt="SESI SENAI" />

            {/* Consolidando o layout do formulário */}
            <div className="login-box-container"> 
                <div className="login-container">
                    <div style={{ display: 'flex', textAlign: 'center', flexDirection: 'column' }}>
                        <h1>Bem-Vindo</h1>
                        <p>ao site do <b>SESI SENAI</b></p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="usuário"
                            value={nomeUsuario}
                            onChange={(e) => setNomeUsuario(e.target.value)}
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

        </div>
    );
}

export default LoginPage;