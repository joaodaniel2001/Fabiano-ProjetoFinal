import React from "react";
import './index.css'
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Calendario from "./pages/Calendario/Calendario";
import Footer from "./components/Footer/Footer";
import Aluno from "./pages/Aluno/Aluno";
import Suporte from "./pages/Suporte/Suporte";
import LeftBar from "./components/Leftbar/Leftbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <LeftBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dados" element={<Calendario />} />
        <Route path="/identificacao-estudantil" element={<Aluno />} />
        <Route path="/suporte" element={<Suporte />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
