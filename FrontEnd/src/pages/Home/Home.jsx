// FrontEnd/src/components/Header.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
function Home() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Função que chama o logout e redireciona
    const handleLogout = () => {
        logout();
        // Redireciona para a página de login após o logout
        navigate('/', { replace: true });
    };

    if (!user) {
        // Não mostra nada se o usuário não estiver logado
        return null;
    }

    return (
        <header style={headerStyle}>
            <span style={userStyle}>Bem-vindo, {user.nome}!</span>
            <button
                onClick={handleLogout}
                style={buttonStyle}
            >
                Sair
            </button>
        </header>
    );
}

// Estilos simples para visualização
const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
};

const userStyle = {
    fontWeight: 'bold',
};

const buttonStyle = {
    padding: '8px 15px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
};

export default Home;