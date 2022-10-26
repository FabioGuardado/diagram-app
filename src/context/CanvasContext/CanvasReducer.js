const CanvasReducer = (estado, accion) => {
  switch (accion.tipo) {
    case 'CREAR_DIBUJO':
      return {
        ...estado,
        cuadros: [...estado.cuadros, accion.payload],
        redibujarCuadros: true,
      };
    case 'ELIMINAR_DIBUJO':
      return {
        ...estado,
        cuadros: estado.cuadros.filter(
          cuadro => cuadro.id !== estado.cuadroSeleccionado.id,
        ),
        cuadroSeleccionado: null,
        redibujarCuadros: true,
      };
    case 'MODIFICAR_CUADRO':
      return {
        ...estado,
        cuadros: estado.cuadros.map(cuadro =>
          cuadro.id === accion.payload.id ? accion.payload : cuadro,
        ),
      };
    case 'DUPLICAR_CUADRO':
      return {
        ...estado,
        cuadros: [...estado.cuadros, accion.payload],
      };
    case 'SELECCIONAR_CUADRO':
      return {
        ...estado,
        cuadroSeleccionado: accion.payload,
      };
    default:
      return estado;
  }
};

export default CanvasReducer;
