import React, { useReducer } from 'react';
import CanvasContext from './CanvasContext';
import CanvasReducer from './CanvasReducer';

const ESTADO_INICIAL = {
  cuadros: [],
  cuadroSeleccionado: null,
  nivelDeZoom: 1,
  conectar: false,
  seleccionarTodo: false,
  agrupar: false,
  grupo: [],
  idGrupo: '',
  desagrupar: false,
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
    cuadroDuplicado.rl = [];
    cuadroDuplicado.idGrupo = '';
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

  const actualizarConectar = valor => {
    dispatch({ tipo: 'CONECTAR_CUADROS', payload: valor });
  };

  const actualizarOrigen = cuadroOrigen => {
    dispatch({ tipo: 'ACTUALIZAR_ORIGEN', payload: cuadroOrigen });
  };

  const actualizarSeleccionar = valor => {
    dispatch({ tipo: 'SELECCIONAR_TODOS', payload: valor });
  };

  const actualizarAgrupar = valor => {
    dispatch({ tipo: 'BANDERA_AGRUPAR', payload: valor });
  };

  const actualizarGrupo = cuadro => {
    dispatch({ tipo: 'AGRUPAR', payload: cuadro });
  };

  const limpiarGrupo = () => {
    dispatch({ tipo: 'LIMPIAR_GRUPO' });
  };

  const actualizarIdGrupo = id => {
    dispatch({ tipo: 'ACTUALIZAR_ID_GRUPO', payload: id });
  };

  const actualizarDesAgrupar = valor => {
    dispatch({ tipo: 'DESAGRUPAR', payload: valor });
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
        actualizarConectar,
        actualizarOrigen,
        actualizarSeleccionar,
        actualizarAgrupar,
        actualizarGrupo,
        limpiarGrupo,
        actualizarIdGrupo,
        actualizarDesAgrupar,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export default CanvasProvider;
