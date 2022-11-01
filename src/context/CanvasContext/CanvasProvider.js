import React, { useReducer } from 'react';
import CanvasContext from './CanvasContext';
import CanvasReducer from './CanvasReducer';

const ESTADO_INICIAL = {
  cuadros: [
    {
      id: 1,
      x: 84,
      y: 133,
      w: 100,
      h: 100,
      r1: [],
      img: 'img/items/escritorio2.png',
    },
    {
      id: 2,
      x: 223,
      y: 63,
      w: 100,
      h: 100,
      r1: [],
      img: 'img/items/enrutador2.png',
    },
    {
      id: 3,
      x: 499,
      y: 455,
      w: 100,
      h: 100,
      r1: [],
      img: 'img/items/telefono2.png',
    },
  ],
  cuadroSeleccionado: null,
  nivelDeZoom: 1,
};

const CanvasProvider = ({ children }) => {
  const [estadoCanvas, dispatch] = useReducer(CanvasReducer, ESTADO_INICIAL);

  const crearCuadro = nuevoCuadro => {
    dispatch({ tipo: 'CREAR_DIBUJO', payload: nuevoCuadro });
  };

  const eliminarCuadro = () => {
    dispatch({ tipo: 'ELIMINAR_DIBUJO' });
  };

  const modificarCuadro = cuadroModificado => {
    dispatch({ tipo: 'MODIFICAR_CUADRO', payload: cuadroModificado });
  };

  const duplicarCuadro = cuadroDuplicado => {
    dispatch({ tipo: 'DUPLICAR_CUADRO', payload: cuadroDuplicado });
  };

  const seleccionarCuadro = cuadro => {
    dispatch({ tipo: 'SELECCIONAR_CUADRO', payload: cuadro });
  };

  const modificarZoom = nuevoNivelDeZoom => {
    dispatch({ tipo: 'MODIFICAR_ZOOM', payload: nuevoNivelDeZoom });
  };

  const restaurarEstado = estado => {
    dispatch({ tipo: 'RESTAURAR_ESTADO', payload: estado });
  };

  return (
    <CanvasContext.Provider
      value={{
        ...estadoCanvas,
        crearCuadro,
        eliminarCuadro,
        modificarCuadro,
        duplicarCuadro,
        seleccionarCuadro,
        modificarZoom,
        restaurarEstado,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export default CanvasProvider;
