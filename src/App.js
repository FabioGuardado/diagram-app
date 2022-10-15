import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Toolsbar from './components/Toolsbar/Toolsbar';
import Workspace from './components/Workspace/Workspace';

import CanvasProvider from './context/CanvasContext/CanvasProvider';

function App() {
  return (
    <CanvasProvider>
      <Navbar />
      <Toolsbar />
      <Workspace />
    </CanvasProvider>
  );
}

export default App;
