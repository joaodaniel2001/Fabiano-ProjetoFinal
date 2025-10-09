import React from "react";

import LeftBar from "./components/Leftbar/Leftbar";
import Navbar from './components/Navbar/Navbar'
import Footer from "./components/Footer/Footer";

import { Route, Routes } from "react-router-dom";

import Dados from "./pages/Dados/Dados";
import Home from "./pages/Home/Home";
import Desempenho from './pages/Desempenho/Desempenho'


const App = () => {
  return (
    <div>
      <Navbar />

      {/* NOVO WRAPPER: Agrupa a barra lateral e o conteúdo rolável */}
      <div className="content-wrapper">
        <LeftBar /> {/* Fixo na lateral */}

        {/* Este é o div que precisa das MARGENS para NÃO FICAR SOBREPOSTO */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dados" element={<Dados />} />
            <Route path="/desempenho" element={<Desempenho />} />
          </Routes>
        </div>
      </div>

      <Footer /> 
    </div>
  );
};

export default App;