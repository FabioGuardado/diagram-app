import React, { useState, useContext } from 'react';

import { v4 as uuid } from 'uuid';

import CanvasContext from '../../../context/CanvasContext/CanvasContext';

import openSidebarIcon from '../../../img/open-sidebar.png';

import './Sidebar.css';

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
        <button
          className="crear-cuadro"
          onClick={() => handleClick('cuadro')}
        ></button>
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
