import React from 'react';

import './ToolButton.css';

const ToolButton = ({ tool }) => {
  const { nombre, icono } = tool;

  return <button className="toolsbar-button">{nombre}</button>;
};

export default ToolButton;
