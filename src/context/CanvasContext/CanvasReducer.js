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
          cuadro.rl = cuadro.rl?.filter(
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
    case 'SELECCIONAR_TODOS':
      return {
        ...estado,
        seleccionarTodo: !accion.payload,
      };
    case 'BANDERA_AGRUPAR':
      return {
        ...estado,
        agrupar: !accion.payload,
      };
    case 'AGRUPAR':
      return {
        ...estado,
        grupo: [...estado.grupo, accion.payload],
      };
    case 'LIMPIAR_GRUPO':
      const { grupo, idGrupo } = estado;
      if (grupo.length > 1) grupo.map(element => (element.idGrupo = idGrupo));
      return {
        ...estado,
        grupo: [],
        idGrupo: '',
      };
    case 'ACTUALIZAR_ID_GRUPO':
      return {
        ...estado,
        idGrupo: accion.payload,
      };
    case 'DESAGRUPAR':
      return {
        ...estado,
        desagrupar: !accion.payload,
      };
    default:
      return estado;
  }
};

export default CanvasReducer;
