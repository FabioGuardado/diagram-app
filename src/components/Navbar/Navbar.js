import React, { useState, useContext } from 'react';

import { jsPDF } from 'jspdf';

import Divider from '../Divider/Divider';

import './Navbar.css';
import CanvasContext from '../../context/CanvasContext/CanvasContext';

const Navbar = () => {
  const canvas = document.getElementById('canvas');
  const [isMenuArchivoOpened, setIsMenuArchivoOpened] = useState(false);
  const [isMenuEditarOpened, setIsMenuEditarOpened] = useState(false);
  const {
    seleccionarTodo,
    actualizarSeleccionar,
    actualizarAgrupar,
    agrupar,
    limpiarGrupo,
    desagrupar,
    actualizarDesAgrupar,
  } = useContext(CanvasContext);

  const toggleMenuArchivoOpened = () =>
    setIsMenuArchivoOpened(!isMenuArchivoOpened);
  const toggleMenuEditarOpened = () =>
    setIsMenuEditarOpened(!isMenuEditarOpened);

  const guardarComoJPG = () => {
    const context = canvas.getContext('2d');
    context.save();
    context.globalCompositeOperation = 'destination-over';
    context.fillStyle = '#cad5e8';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.restore();

    const imageURL = canvas.toDataURL('image/jpg');

    const element = document.createElement('a');
    element.href = imageURL;
    element.download = 'draw.jpg';

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const guardarComoPDF = () => {
    const context = canvas.getContext('2d');
    context.globalCompositeOperation = 'destination-over';
    context.fillStyle = '#cad5e8';
    context.fillRect(0, 0, canvas.width, canvas.height);

    const imageURL = canvas.toDataURL('image/jpg');

    const doc = new jsPDF({
      orientation: 'landscape',
    });
    const imgProps = doc.getImageProperties(imageURL);
    const pdfWidth = doc.internal.pageSize.getWidth() - 10;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width - 10;

    doc.addImage(imageURL, 5, 5, pdfWidth, pdfHeight);
    doc.save('draw.pdf');
  };

  const selecciona = () => {
    actualizarSeleccionar(seleccionarTodo);
  };

  const agrupa = () => {
    limpiarGrupo();
    actualizarAgrupar(agrupar);
  };

  const desagrupa = () => {
    actualizarDesAgrupar(desagrupar);
  };

  return (
    <>
      <nav className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-logo">
            <img src="/img/navbar_logo.png" height={60} />
          </div>
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
                <li>
                  <a onClick={guardarComoPDF}>Guardar como PDF</a>
                </li>
                <li>
                  <a onClick={guardarComoJPG}>Guardar como JPG</a>
                </li>
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
                <li>
                  <a onClick={selecciona}>Seleccionar todo</a>
                </li>
                <li>
                  <a onClick={agrupa}>Agrupar</a>
                </li>
                <li>
                  <a onClick={desagrupa}>Desagrupar</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <Divider />
    </>
  );
};

export default Navbar;
