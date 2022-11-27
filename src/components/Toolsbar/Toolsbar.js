import React, { useContext } from 'react';

import { v4 as uuid } from 'uuid';

import Divider from '../Divider/Divider';
import ToolButton from './ToolButton';

import CanvasContext from '../../context/CanvasContext/CanvasContext';

import './Toolsbar.css';

const ZOOM_MAX = 2;
const ZOOM_MIN = 0.4;

const Toolsbar = ({
  actualizarHistorial = () => {},
  retroceder = () => {},
  adelantar = () => {},
  toggleCuadroDeTexto = () => {},
}) => {
  const {
    cuadros,
    cuadroSeleccionado,
    nivelDeZoom,
    eliminarCuadro,
    duplicarCuadro,
    modificarZoom,
    conectar,
    actualizarConectar,
    seleccionarCuadro,
  } = useContext(CanvasContext);

  const handleEliminar = () => {
    if (cuadroSeleccionado) {
      eliminarCuadro();
      actualizarHistorial(
        cuadros.filter(cuadro => {
          cuadro.rl = cuadro.rl?.filter(
            relation => relation.id !== cuadroSeleccionado.id,
          );
          return cuadro.id !== cuadroSeleccionado.id;
        }),
      );
    }
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
      actualizarHistorial([...cuadros, cuadroDuplicado]);
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

  const handleConectar = () => {
    seleccionarCuadro(null);
    actualizarConectar(conectar);
  };

  const herramientas = [
    { nombre: 'Deshacer', icono: 'deshacer.png', funcion: retroceder },
    { nombre: 'Rehacer', icono: 'rehacer.png', funcion: adelantar },
    { nombre: 'Eliminar', icono: 'eliminar.png', funcion: handleEliminar },
    { nombre: 'Duplicar', icono: 'duplicar.png', funcion: handleDuplicar },
    { nombre: 'Texto', icono: 'texto.png', funcion: toggleCuadroDeTexto },
    { nombre: 'Acercar', icono: 'zoom-in.png', funcion: handleZoomIn },
    { nombre: 'Alejar', icono: 'zoom-out.png', funcion: handleZoomOut },
    { nombre: 'Conectar', icono: 'conectar.png', funcion: handleConectar },
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
