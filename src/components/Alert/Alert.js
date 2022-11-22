import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import AlertsContext from '../../context/AlertsContext/AlertsContext';

import './Alert.css';

const domAlertNode = document.getElementById('alert');

const Alert = () => {
  const { alertaVisible, contenidoAlerta, ocultarAlerta } =
    useContext(AlertsContext);

  if (alertaVisible && contenidoAlerta) {
    return createPortal(
      <div className="alerta">
        <p className="alerta-contenido">{contenidoAlerta}</p>
        <button className="alerta-boton-cerrar" onClick={ocultarAlerta}>
          X
        </button>
      </div>,
      domAlertNode,
    );
  } else {
    return null;
  }
};

export default Alert;
