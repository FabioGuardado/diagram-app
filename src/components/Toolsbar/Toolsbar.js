import React from 'react';
import Divider from '../Divider/Divider';
import ToolButton from './ToolButton';

import './Toolsbar.css';

const herramientas = [
  { nombre: 'Deshacer', icono: 'deshacer.png' },
  { nombre: 'Rehacer', icono: 'rehacer.png' },
  { nombre: 'Eliminar', icono: 'eliminar.png' },
  { nombre: 'Duplicar', icono: 'duplicar.png' },
  { nombre: 'Acercar', icono: 'zoom-in.png' },
  { nombre: 'Alejar', icono: 'zoom-out.png' },
];

const Toolsbar = () => {
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
