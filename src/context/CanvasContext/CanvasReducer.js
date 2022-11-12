const CanvasReducer = (estado, accion) => {
  switch (accion.tipo) {
    case 'CREAR_DIBUJO':
      return {
        ...estado,
        cuadros: [...estado.cuadros, accion.payload],
      };
    case 'ELIMINAR_DIBUJO':
      const { cuadroSeleccionado } = estado;
      return {
        ...estado,
        cuadros: estado.cuadros.filter(cuadro => {
          cuadro.rl = cuadro.rl.filter(
            relation => relation.id !== cuadroSeleccionado.id,
          );
          return cuadro.id !== cuadroSeleccionado.id;
        }),
        cuadroSeleccionado: null,
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
    case 'MODIFICAR_ZOOM':
      return {
        ...estado,
        nivelDeZoom: accion.payload,
      };
    case 'RESTAURAR_ESTADO':
      return {
        ...estado,
        cuadros: accion.payload,
      };
    case 'CONECTAR_CUADROS':
      return {
        ...estado,
        conectar: !accion.payload,
      };
    case 'ACTUALIZAR_ORIGEN':
      return {
        ...estado,
        cuadroOrigen: accion.payload,
      };
    default:
      return estado;
  }
};

export default CanvasReducer;
