import React from 'react';

import './ToolButton.css';

const ToolButton = ({ tool }) => {
  const { nombre, icono } = tool;

  return (
    <button className="toolsbar-button">
      <img src={`/img/tools/${icono}`} height="22px" />
    </button>
  );
};

export default ToolButton;
