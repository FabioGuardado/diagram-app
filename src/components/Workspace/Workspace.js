import React, { useState, useContext } from 'react';
import { v4 as uuid } from 'uuid';

import Toolsbar from '../Toolsbar/Toolsbar';
import Sidebar from './Sidebar/Sidebar';
import Canvas from './Canvas/Canvas';

import useHistoryLogger from '../../hooks/useHistoryLogger';
import CanvasContext from '../../context/CanvasContext/CanvasContext';
import './Workspace.css';

const Workspace = () => {
  const { cuadros, crearCuadro } = useContext(CanvasContext);
  const [isCuadroDeTextoVisible, setIsCuadroDeTextoVisible] = useState(false);
  const [contenidoCuadroDeTexto, setContenidoCuadroDeTexto] = useState('');
  const { actualizarHistorial, retroceder, adelantar } = useHistoryLogger();

  const toggleCuadroDeTexto = () => {
    setIsCuadroDeTextoVisible(!isCuadroDeTextoVisible);
    setContenidoCuadroDeTexto('');
  };

  const handleCuadroDeTextoChange = e => {
    setContenidoCuadroDeTexto(e.target.value);
  };

  const handleCrearTexto = () => {
    if (contenidoCuadroDeTexto.trim() !== '') {
      const texto = {
        id: uuid(),
        text: contenidoCuadroDeTexto,
        x: 86,
        y: 138,
        w: 20,
        h: 30,
      };
      crearCuadro(texto);
      actualizarHistorial([...cuadros, texto]);
      toggleCuadroDeTexto();
    }
  };

  return (
    <>
      <Toolsbar
        actualizarHistorial={actualizarHistorial}
        retroceder={retroceder}
        adelantar={adelantar}
        toggleCuadroDeTexto={toggleCuadroDeTexto}
      />
      <div className="workspace-container">
        <Sidebar actualizarHistorial={actualizarHistorial} />
        <Canvas actualizarHistorial={actualizarHistorial} />
        {isCuadroDeTextoVisible ? (
          <div className="floating-input-container">
            <input
              name="input-crear-texto"
              placeholder="Ingrese texto"
              type="text"
              maxLength={15}
              onChange={handleCuadroDeTextoChange}
              className="floating-input"
            />
            <button
              className="floating-input-continuar"
              onClick={handleCrearTexto}
            >
              <img src="/img/tools/continuar.png" height={32} />
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Workspace;
