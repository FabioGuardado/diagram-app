import React, { useState, useContext } from 'react';

import { v4 as uuid } from 'uuid';

import CanvasContext from '../../../context/CanvasContext/CanvasContext';

import openSidebarIcon from '../../../img/open-sidebar.png';

import './Sidebar.css';

const elementos = [
  { tipo: 'Almacenamiento', nombre: 'almacenamiento-de-archivos2.png' },
  { tipo: 'Base de datos', nombre: 'base-de-datos2.png' },
  { tipo: 'Circulo', nombre: 'circulo2.png' },
  { tipo: 'Enrutador', nombre: 'enrutador2.png' },
  { tipo: 'Escritorio', nombre: 'escritorio2.png' },
  { tipo: 'Fax', nombre: 'fax2.png' },
  { tipo: 'Firewall', nombre: 'firewall2.png' },
  { tipo: 'Hub', nombre: 'hub2.png' },
  { tipo: 'Impresora', nombre: 'impresora2.png' },
  { tipo: 'Laptop', nombre: 'laptop2.png' },
  { tipo: 'Modem', nombre: 'modem2.png' },
  { tipo: 'Rectangulo', nombre: 'rectangulo2.png' },
  { tipo: 'Servidor', nombre: 'servidor2.png' },
  { tipo: 'Servidor en la nube', nombre: 'servidor-en-la-nube2.png' },
  { tipo: 'Servidor WWW', nombre: 'servidorwww2.png' },
  { tipo: 'Telefono', nombre: 'telefono2.png' },
  { tipo: 'Router Wifi', nombre: 'wifi-router2.png' },
];

const Sidebar = () => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);
  const { crearCuadro } = useContext(CanvasContext);

  const toggleSidebar = () => setIsSidebarOpened(!isSidebarOpened);

  const handleClick = tipoDeDibujo => {
    const nuevoCuadro = {
      id: uuid(),
      tipo: tipoDeDibujo,
      x: 86,
      y: 138,
      w: 200,
      h: 200,
    };
    crearCuadro(nuevoCuadro);
    toggleSidebar();
  };

  return (
    <div className="sidebar-container">
      <div
        className={`sidebar-panel ${
          isSidebarOpened ? 'sidebar-panel-active' : 'sidebar-panel-hidden'
        }`}
      >
        <div className="sidebar-panel-grid">
          {elementos.map(elemento => (
            <button key={elemento.tipo} className="sidebar-panel-item">
              <img src={`/img/items/${elemento.nombre}`} height="120px" />
            </button>
          ))}
        </div>
      </div>
      <button className="sidebar-toggler" onClick={toggleSidebar}>
        <img
          src={openSidebarIcon}
          height="24px"
          className={`sidebar-toggler-icon ${
            isSidebarOpened && 'sidebar-toggler-icon-reversed'
          }`}
        />
      </button>
    </div>
  );
};

export default Sidebar;
