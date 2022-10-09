import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import Canvas from './Canvas/Canvas';

import './Workspace.css';

const Workspace = () => {
  return (
    <div className="workspace-container">
      <Sidebar />
      <Canvas />
    </div>
  );
};

export default Workspace;
