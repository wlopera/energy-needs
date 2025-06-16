import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav
      className="navbar navbar-expand navbar-dark bg-dark"
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 10, // asegura que quede encima del contenido
      }}
    >
      <div className="container">
        <span className="navbar-brand">NECESIDADES ENERGÉTICAS</span>
        <div className="navbar-nav">
          <Link className="nav-link" to="/information">
            Información
          </Link>
          <Link className="nav-link" to="/calculations">
            Cálculos
          </Link>
          <Link className="nav-link" to="/about">
            Acerca de...
          </Link>
          <Link className="nav-link" to="/logout">
            Salir
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
