import React, { useContext } from 'react';

import { v4 as uuid } from 'uuid';

import Divider from '../Divider/Divider';
import ToolButton from './ToolButton';

import CanvasContext from '../../context/CanvasContext/CanvasContext';

import './Toolsbar.css';

const Toolsbar = () => {
  const { cuadroSeleccionado, eliminarCuadro, duplicarCuadro } =
    useContext(CanvasContext);

  const handleEliminar = () => {
    if (cuadroSeleccionado) eliminarCuadro();
  };

  const handleDuplicar = () => {
    if (cuadroSeleccionado) {
      const cuadroDuplicado = {
        ...cuadroSeleccionado,
        id: uuid(),
        x: cuadroSeleccionado.x - 30,
        y: cuadroSeleccionado.y - 30,
      };

      duplicarCuadro(cuadroDuplicado);
    }
  };

  const herramientas = [
    { nombre: 'Deshacer', icono: '' },
    { nombre: 'Rehacer', icono: '' },
    { nombre: 'Eliminar', icono: '', funcion: handleEliminar },
    { nombre: 'Duplicar', icono: '', funcion: handleDuplicar },
    { nombre: 'Acercar', icono: '' },
    { nombre: 'Alejar', icono: '' },
  ];
  return (
    <>
      <div className="toolsbar-container">
        <div className="toolsbar-content">
          {herramientas.map(herramienta => (
            <ToolButton key={herramienta.nombre} tool={herramienta} />
          ))}
        </div>
      </div>

      <Divider />
    </>
  );
};

export default Toolsbar;
