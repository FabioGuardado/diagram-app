import React, { useContext } from 'react';

import { v4 as uuid } from 'uuid';

import Divider from '../Divider/Divider';
import ToolButton from './ToolButton';

import CanvasContext from '../../context/CanvasContext/CanvasContext';

import './Toolsbar.css';

const ZOOM_MAX = 2;
const ZOOM_MIN = 0.4;

const Toolsbar = () => {
  const {
    cuadroSeleccionado,
    nivelDeZoom,
    eliminarCuadro,
    duplicarCuadro,
    modificarZoom,
  } = useContext(CanvasContext);

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

  const handleZoomIn = () => {
    if (nivelDeZoom < ZOOM_MAX) {
      const nuevoNivelDeZoom = nivelDeZoom + 0.2;
      modificarZoom(Number(nuevoNivelDeZoom.toFixed(1)));
    }
  };

  const handleZoomOut = () => {
    if (nivelDeZoom > ZOOM_MIN) {
      const nuevoNivelDeZoom = nivelDeZoom - 0.2;
      modificarZoom(Number(nuevoNivelDeZoom.toFixed(1)));
    }
  };

  const herramientas = [
    { nombre: 'Deshacer', icono: 'deshacer.png' },
    { nombre: 'Rehacer', icono: 'rehacer.png' },
    { nombre: 'Eliminar', icono: 'eliminar.png', funcion: handleEliminar },
    { nombre: 'Duplicar', icono: 'duplicar.png', funcion: handleDuplicar },
    { nombre: 'Texto', icono: 'texto.png' },
    { nombre: 'Acercar', icono: 'zoom-in.png', funcion: handleZoomIn },
    { nombre: 'Alejar', icono: 'zoom-out.png', funcion: handleZoomOut },
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
