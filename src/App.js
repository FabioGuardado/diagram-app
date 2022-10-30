import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Workspace from './components/Workspace/Workspace';

import CanvasProvider from './context/CanvasContext/CanvasProvider';

function App() {
  return (
    <CanvasProvider>
      <Navbar />
      <Workspace />
    </CanvasProvider>
  );
}

export default App;
