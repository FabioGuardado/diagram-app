import React from 'react';

import './ToolButton.css';

const ToolButton = ({ tool }) => {
  const { nombre, icono, funcion } = tool;

  return (
    <button className="toolsbar-button" onClick={funcion}>
      <img src={`/img/tools/${icono}`} height="22px" />
    </button>
  );
};

export default ToolButton;
