import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <h1>Olá João, seja bem-vindo(a)!</h1>
      <div className="header-contents">
        <div className="header-contents-text">
          <h2>Meus Cursos</h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
