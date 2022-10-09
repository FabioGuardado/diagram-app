import React from 'react';
import Divider from '../Divider/Divider';
import ToolButton from './ToolButton';

import './Toolsbar.css';

const herramientas = [
  { nombre: 'Deshacer', icono: '' },
  { nombre: 'Rehacer', icono: '' },
  { nombre: 'Eliminar', icono: '' },
  { nombre: 'Acercar', icono: '' },
  { nombre: 'Alejar', icono: '' },
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
