import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Workspace from './components/Workspace/Workspace';
import Alert from './components/Alert/Alert';

import CanvasProvider from './context/CanvasContext/CanvasProvider';
import AlertsProvider from './context/AlertsContext/AlertsProvider';

function App() {
  return (
    <AlertsProvider>
      <Alert />
      <CanvasProvider>
        <Navbar />
        <Workspace />
      </CanvasProvider>
    </AlertsProvider>
  );
}

export default App;
