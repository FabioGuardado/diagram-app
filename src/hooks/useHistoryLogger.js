import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';

import CanvasContext from '../context/CanvasContext/CanvasContext';

const useHistoryLogger = () => {
  const { restaurarEstado } = useContext(CanvasContext);
  const [historial, setHistorial] = useState([]);
  const [numEntradasDelHistorial, setNumEntradasDelHistorial] = useState(0);
  const [posicionActual, setPosicionActual] = useState(0);

  useEffect(() => {
    const actualizarEstados = () => {
      setNumEntradasDelHistorial(historial.length);
      setPosicionActual(historial.length - 1);
    };

    if (historial.length) {
      actualizarEstados();
    }
  }, [historial]);

  const actualizarHistorial = (estadoActual = []) => {
    const copiaDelEstadoActual = cloneDeep(estadoActual);
    setHistorial(historialPrevio => [...historialPrevio, copiaDelEstadoActual]);
  };

  const retroceder = () => {
    if (posicionActual === 0) {
      return;
    }

    const copiaDelEstadoParaRestaurar = cloneDeep(
      historial[posicionActual - 1],
    );
    restaurarEstado(copiaDelEstadoParaRestaurar);
    setPosicionActual(posicionActual - 1);
  };

  const adelantar = () => {
    if (posicionActual + 1 === numEntradasDelHistorial) {
      return;
    }

    const copiaDelEstadoParaRestaurar = cloneDeep(
      historial[posicionActual + 1],
    );
    restaurarEstado(copiaDelEstadoParaRestaurar);
    setPosicionActual(posicionActual + 1);
  };

  return { actualizarHistorial, retroceder, adelantar };
};

export default useHistoryLogger;
