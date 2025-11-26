import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('@MyApp:user');
        try {
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            localStorage.removeItem('@MyApp:user');
            return null;
        }
    });

    const [loading, setLoading] = useState(true);

    const login = useCallback(async (nomeUsuario, senha) => {
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/api/autenticacao/login', {
                nomeUsuario,
                senha,
            });

            const { user: userData, token } = response.data;
            const userPayload = { ...userData, token };
            setUser(userPayload);

            return { success: true };

        } catch (error) {
            const message = error.response?.data?.message || 'Falha de conexão ou credenciais inválidas.';
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    const fetchUserInfo = useCallback(async () => {
        if (!user || !user.token) {
            return null;
        }

        try {
            setLoading(true);

            const config = {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            };

            const response = await axios.get('http://localhost:3000/api/usuario/perfil', config);

            const updatedUserData = response.data;
            const newUserPayload = { ...updatedUserData, token: user.token };
            setUser(newUserPayload);

            return newUserPayload;

        } catch (error) {
            return null;
        } finally {
            setLoading(false);
        }
    }, [user]);

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
        fetchUserInfo,
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