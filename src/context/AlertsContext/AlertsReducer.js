const AlertsReducer = (estado, accion) => {
  switch (accion.tipo) {
    case 'MOSTRAR_ALERTA':
      return {
        ...estado,
        alertaVisible: true,
        contenidoAlerta: accion.payload,
      };
    case 'OCULTAR_ALERTA':
      return { ...estado, alertaVisible: false, contenidoAlerta: null };
    default:
      return estado;
  }
};

export default AlertsReducer;
