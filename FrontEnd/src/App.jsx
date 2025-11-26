import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';import { AuthProvider } from "./context/AuthContext";

// Componentes
import LeftBar from "./components/Leftbar/Leftbar";
import Navbar from './components/Navbar/Navbar'
import Footer from "./components/Footer/Footer";
import PrivateRoute from "./components/PrivateRoute";

// Páginas
import LoginPage from "./pages/LoginPage/LoginPage";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <div>
      
        <AuthProvider>
          <Routes>

            {/* Página de Login (Rota raiz) */}
            <Route path="/" element={<LoginPage />} />

            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              } />

            {/* Redirecionamento 404 */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AuthProvider>
    </div>
  );
};

export default App;