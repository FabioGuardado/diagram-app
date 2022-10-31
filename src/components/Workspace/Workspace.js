import React from 'react';

import Toolsbar from '../Toolsbar/Toolsbar';
import Sidebar from './Sidebar/Sidebar';
import Canvas from './Canvas/Canvas';

import './Workspace.css';
import useHistoryLogger from '../../hooks/useHistoryLogger';

const Workspace = () => {
  const { actualizarHistorial, retroceder, adelantar } = useHistoryLogger();
  return (
    <>
      <Toolsbar
        actualizarHistorial={actualizarHistorial}
        retroceder={retroceder}
        adelantar={adelantar}
      />
      <div className="workspace-container">
        <Sidebar />
        <Canvas actualizarHistorial={actualizarHistorial} />
      </div>
    </>
  );
};

export default Workspace;
