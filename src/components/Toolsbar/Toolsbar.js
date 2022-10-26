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
    { nombre: 'Deshacer', icono: 'deshacer.png' },
    { nombre: 'Rehacer', icono: 'rehacer.png' },
    { nombre: 'Eliminar', icono: 'eliminar.png', funcion: handleEliminar },
    { nombre: 'Duplicar', icono: 'duplicar.png', funcion: handleDuplicar },
    { nombre: 'Texto', icono: 'texto.png' },
    { nombre: 'Acercar', icono: 'zoom-in.png' },
    { nombre: 'Alejar', icono: 'zoom-out.png' },
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
