import React, { useState, useContext } from 'react';

import { v4 as uuid } from 'uuid';

import CanvasContext from '../../../context/CanvasContext/CanvasContext';

import openSidebarIcon from '../../../img/open-sidebar.png';

import './Sidebar.css';

const elementos = [
  {
    tipo: 'Almacenamiento',
    nombre: '/img/items/almacenamiento-de-archivos2.png',
  },
  { tipo: 'Base de datos', nombre: '/img/items/base-de-datos2.png' },
  { tipo: 'Circulo', nombre: '/img/items/circulo2.png' },
  { tipo: 'Enrutador', nombre: '/img/items/enrutador2.png' },
  { tipo: 'Escritorio', nombre: '/img/items/escritorio2.png' },
  { tipo: 'Fax', nombre: '/img/items/fax2.png' },
  { tipo: 'Firewall', nombre: '/img/items/firewall2.png' },
  { tipo: 'Hub', nombre: '/img/items/hub2.png' },
  { tipo: 'Impresora', nombre: '/img/items/impresora2.png' },
  { tipo: 'Laptop', nombre: '/img/items/laptop2.png' },
  { tipo: 'Modem', nombre: '/img/items/modem2.png' },
  { tipo: 'Rectangulo', nombre: '/img/items/rectangulo2.png' },
  { tipo: 'Servidor', nombre: '/img/items/servidor2.png' },
  {
    tipo: 'Servidor en la nube',
    nombre: '/img/items/servidor-en-la-nube2.png',
  },
  { tipo: 'Servidor WWW', nombre: '/img/items/servidorwww2.png' },
  { tipo: 'Telefono', nombre: '/img/items/telefono2.png' },
  { tipo: 'Router Wifi', nombre: '/img/items/wifi-router2.png' },
];

const Sidebar = () => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);
  const { crearCuadro } = useContext(CanvasContext);

  const toggleSidebar = () => setIsSidebarOpened(!isSidebarOpened);

  const handleClick = imagePath => {
    const nuevoCuadro = {
      id: uuid(),
      img: imagePath,
      x: 86,
      y: 138,
      w: 100,
      h: 100,
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
            <button
              key={elemento.tipo}
              className="sidebar-panel-item"
              onClick={() => handleClick(elemento.nombre)}
            >
              <img src={elemento.nombre} height="120px" />
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
