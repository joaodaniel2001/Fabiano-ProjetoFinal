import React, { useState, useEffect } from 'react'; // 👈 Importe useEffect
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './LoginPage.css'

function LoginPage() {
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const { login, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    // 🚀 Lógica de Redirecionamento Corrigida com useEffect
    useEffect(() => {
        // Verifica se o usuário JÁ ESTÁ logado
        if (isLoggedIn) {
            // Chama navigate APÓS a renderização do componente
            navigate('/home', { replace: true });
        }
    }, [isLoggedIn, navigate]); // Dependências: Roda quando isLoggedIn ou navigate mudam

    // Remova o bloco de `if (isLoggedIn)` do corpo principal do componente!

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const result = await login(nomeUsuario, senha);

        if (result.success) {
            // Esta navegação em um manipulador de evento (handleSubmit) está CORRETA.
            navigate('/home');
        } else {
            setError(result.message);
        }
    };

    // Se o useEffect disparar a navegação, o componente será descartado, 
    // mas o JSX abaixo só será renderizado se `isLoggedIn` for `false` inicialmente.
    return (
        <div className='loginPage'>
            {/* ... todo o seu JSX de formulário e layout aqui ... */}
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
                            placeholder="usuario"
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