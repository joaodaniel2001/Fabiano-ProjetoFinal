// FrontEnd/src/context/AuthContext.jsx

import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios'; // ⬅️ Não se esqueça de instalar: npm install axios

const AuthContext = createContext(undefined);

/**
 * Hook customizado para usar o Contexto de Autenticação.
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};

/**
 * Provedor de Autenticação.
 */
export const AuthProvider = ({ children }) => {

    // 1. Leitura Inicial (Persistência)
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('@MyApp:user');
        try {
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Erro ao ler dados do usuário do localStorage:", error);
            localStorage.removeItem('@MyApp:user');
            return null;
        }
    });

    const [loading, setLoading] = useState(true);

    // 2. FUNÇÃO DE LOGIN: Conectando ao Back-end
    const login = useCallback(async (matricula, senha) => {
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/api/autenticacao/login', {
                matricula,
                senha,
            });

            const { user: userData, token } = response.data;

            // Cria o Payload com o Token
            const userPayload = { ...userData, token };

            setUser(userPayload);

            return { success: true };

        } catch (error) {
            const message = error.response?.data?.message || 'Falha de conexão ou credenciais inválidas.';
            console.error('Erro de Login na API:', message);

            return { success: false, message };
        } finally {
            setLoading(false);
        }
    }, []);

    // 3. FUNÇÃO DE LOGOUT
    const logout = useCallback(() => {
        setUser(null);
    }, []);

    // 4. EFEITO COLATERAL (Salvar no localStorage)
    useEffect(() => {
        if (user) {
            localStorage.setItem('@MyApp:user', JSON.stringify(user));
        } else {
            localStorage.removeItem('@MyApp:user');
        }
        setLoading(false);
    }, [user]);

    const isLoggedIn = !!user;

    const authContextValue = {
        user,
        isLoggedIn,
        login,
        logout,
        loading,
    };

    if (loading) {
        return <div>Carregando autenticação...</div>;
    }

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};