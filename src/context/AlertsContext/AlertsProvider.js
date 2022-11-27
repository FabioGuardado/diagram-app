import React, { useReducer } from 'react';
import AlertsContext from './AlertsContext';
import AlertsReducer from './AlertsReducer';

const ESTADO_INICIAL = {
  alertaVisible: false,
  contenidoAlerta: null,
};

const AlertsProvider = ({ children }) => {
  const [alertsState, dispatch] = useReducer(AlertsReducer, ESTADO_INICIAL);

  const mostrarAlerta = contenido => {
    dispatch({ tipo: 'MOSTRAR_ALERTA', payload: contenido });
    setTimeout(() => {
      ocultarAlerta();
    }, 5000);
  };

  const ocultarAlerta = () => {
    dispatch({ tipo: 'OCULTAR_ALERTA' });
  };

  return (
    <AlertsContext.Provider
      value={{
        ...alertsState,
        mostrarAlerta,
        ocultarAlerta,
      }}
    >
      {children}
    </AlertsContext.Provider>
  );
};

export default AlertsProvider;
