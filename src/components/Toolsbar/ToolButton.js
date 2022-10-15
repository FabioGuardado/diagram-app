import React from 'react';

import './ToolButton.css';

const ToolButton = ({ tool }) => {
  const { nombre, icono, funcion } = tool;

  return (
    <button className="toolsbar-button" onClick={funcion}>
      {nombre}
    </button>
  );
};

export default ToolButton;
