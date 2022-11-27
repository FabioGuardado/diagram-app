import React, { useState, useContext } from 'react';

import { v4 as uuid } from 'uuid';

import CanvasContext from '../../../context/CanvasContext/CanvasContext';

import openSidebarIcon from '../../../img/open-sidebar.png';

import './Sidebar.css';

const elementos = [
  {
    tipo: 'Almacenamiento',
    nombre: '/img/items/almacenamiento-de-archivos2.png',
    maxConexiones: 1,
  },
  {
    tipo: 'Base de datos',
    nombre: '/img/items/base-de-datos2.png',
    maxConexiones: 1,
  },
  { tipo: 'Circulo', nombre: '/img/items/circulo2.png', maxConexiones: 1 },
  { tipo: 'Switch', nombre: '/img/items/switch2.png', maxConexiones: 8 },
  {
    tipo: 'Escritorio',
    nombre: '/img/items/escritorio2.png',
    maxConexiones: 1,
  },
  { tipo: 'Fax', nombre: '/img/items/fax2.png', maxConexiones: 1 },
  { tipo: 'Firewall', nombre: '/img/items/firewall2.png', maxConexiones: 2 },
  { tipo: 'Hub', nombre: '/img/items/hub2.png', maxConexiones: 10 },
  { tipo: 'Impresora', nombre: '/img/items/impresora2.png', maxConexiones: 1 },
  { tipo: 'Laptop', nombre: '/img/items/laptop2.png', maxConexiones: 1 },
  {
    tipo: 'Rectangulo',
    nombre: '/img/items/rectangulo2.png',
    maxConexiones: 1,
  },
  { tipo: 'Servidor', nombre: '/img/items/servidor2.png', maxConexiones: 1 },
  {
    tipo: 'Servidor en la nube',
    nombre: '/img/items/servidor-en-la-nube2.png',
    maxConexiones: 1,
  },
  {
    tipo: 'Servidor WWW',
    nombre: '/img/items/servidorwww2.png',
    maxConexiones: 1,
  },
  { tipo: 'Telefono', nombre: '/img/items/telefono2.png', maxConexiones: 1 },
  {
    tipo: 'Router Wifi',
    nombre: '/img/items/wifi-router2.png',
    maxConexiones: 4,
  },
];

const Sidebar = ({ actualizarHistorial = () => {} }) => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);
  const { cuadros, crearCuadro } = useContext(CanvasContext);

  const toggleSidebar = () => setIsSidebarOpened(!isSidebarOpened);

  const handleClick = (imagePath, maxConexiones) => {
    const nuevoCuadro = {
      id: uuid(),
      img: imagePath,
      x: 86,
      y: 138,
      w: 100,
      h: 100,
      rl: [],
      maxConexiones,
      idGrupo: '',
    };
    crearCuadro(nuevoCuadro);
    actualizarHistorial([...cuadros, nuevoCuadro]);
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
              onClick={() =>
                handleClick(elemento.nombre, elemento.maxConexiones)
              }
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
