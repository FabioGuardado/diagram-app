import React, { useState } from 'react';

import './Navbar.css';

const Navbar = () => {
  const [isMenuArchivoOpened, setIsMenuArchivoOpened] = useState(false);
  const [isMenuEditarOpened, setIsMenuEditarOpened] = useState(false);

  const toggleMenuArchivoOpened = () =>
    setIsMenuArchivoOpened(!isMenuArchivoOpened);
  const toggleMenuEditarOpened = () =>
    setIsMenuEditarOpened(!isMenuEditarOpened);

  return (
    <>
      <nav className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-logo">LOGO</div>
          <div className="navbar-menu">
            <div className="navbar-menu-element">
              <div className="navbar-button-container">
                <button
                  className="navbar-button button-archivo"
                  onClick={toggleMenuArchivoOpened}
                >
                  Archivo
                </button>
              </div>
              <ul
                className={`navbar-submenu ${
                  isMenuArchivoOpened ? 'submenu-active' : 'submenu-hidden'
                }`}
              >
                <li>Guardar como PDF</li>
                <li>Guardar como JPG</li>
              </ul>
            </div>

            <div className="navbar-menu-element">
              <div className="navbar-button-container">
                <button
                  className="navbar-button button-editar"
                  onClick={toggleMenuEditarOpened}
                >
                  Editar
                </button>
              </div>
              <ul
                className={`navbar-submenu ${
                  isMenuEditarOpened ? 'submenu-active' : 'submenu-hidden'
                }`}
              >
                <li>Seleccionar todo</li>
                <li>Agrupar</li>
                <li>Desagrupar</li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="navbar-divider"></div>
    </>
  );
};

export default Navbar;
