import React, { useRef, useEffect, useContext } from 'react';
import AlertsContext from '../../../context/AlertsContext/AlertsContext';

import CanvasContext from '../../../context/CanvasContext/CanvasContext';

import './Canvas.css';
import { dibujarCuadro, crearLineas, dibujarBorde } from './canvas.dibujar';

const Canvas = ({ actualizarHistorial = () => {} }) => {
  const canvas = useRef();
  const contexto = useRef(null);
  const { mostrarAlerta } = useContext(AlertsContext);
  const {
    cuadros,
    nivelDeZoom,
    modificarCuadro,
    seleccionarCuadro,
    conectar,
    actualizarOrigen,
    cuadroOrigen,
    actualizarConectar,
    seleccionarTodo,
    actualizarAgrupar,
    actualizarGrupo,
    limpiarGrupo,
    grupo,
    agrupar,
  } = useContext(CanvasContext);

  let estaPresionado = false;
  let objetoApuntado = null;
  let inicioX = null;
  let inicioY = null;

  // Inicio del contexto del canvas
  useEffect(() => {
    // Asignamos el ancho y alto segun la pantalla
    const elementoCanvas = canvas.current;
    elementoCanvas.width = elementoCanvas.clientWidth;
    elementoCanvas.height = elementoCanvas.clientHeight;
    // Obtenemos el contexto del canvas
    contexto.current = elementoCanvas.getContext('2d');
  }, []);

  useEffect(() => {
    if (contexto.current) dibujar();
  }, [cuadros, nivelDeZoom, conectar, seleccionarTodo]);

  // Dibujar los cuadros
  const dibujar = () => {
    contexto.current.save();
    contexto.current.clearRect(
      0,
      0,
      canvas.current.clientWidth,
      canvas.current.clientHeight,
    );

    contexto.current.scale(nivelDeZoom, nivelDeZoom);
    cuadros.map(cuadro => crearLineas(cuadro, contexto.current));
    cuadros.map(cuadro =>
      dibujarCuadro(cuadro, contexto.current, seleccionarTodo),
    );
    if (objetoApuntado) dibujarBorde(objetoApuntado, contexto.current, 'black');
    if (conectar && cuadroOrigen) dibujarBorde(cuadroOrigen, contexto.current);
    contexto.current.restore();
  };

  // Identificar el evento clic en la figura
  const superficieFigura = (x, y) => {
    let estaEncima = null;
    cuadros.forEach(figura => {
      const { x: figX, y: figY, w: figW, h: figH } = figura;
      // Si el cursor esta dentro de la figura en el eje X:
      const rangoX =
        x >= figX * nivelDeZoom && x <= (figX + figW) * nivelDeZoom;
      // Si el cursor esta dentro de la figura en el eje Y:
      const rangoY =
        y >= figY * nivelDeZoom && y <= (figY + figH) * nivelDeZoom;
      // Si el cursor esta dentro del rango X e Y, entonces esta encima de nuestra figura
      if (rangoX && rangoY) {
        objetoApuntado = figura;
        estaEncima = true;
        return estaEncima;
      }
    });
    return estaEncima;
  };

  const hacerClic = e => {
    inicioX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    inicioY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
    estaPresionado = superficieFigura(inicioX, inicioY);
  };

  const moverTodos = (dx, dy) => {
    cuadros.map(cuadro => {
      cuadro.x += dx;
      cuadro.y += dy;
    });
  };

  const moverMouse = e => {
    if (!estaPresionado || conectar) return;
    const mouseX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    const mouseY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
    const dx = (mouseX - inicioX) / nivelDeZoom;
    const dy = (mouseY - inicioY) / nivelDeZoom;
    inicioX = mouseX;
    inicioY = mouseY;
    if (seleccionarTodo) moverTodos(dx, dy);
    else {
      objetoApuntado.x += dx;
      objetoApuntado.y += dy;
    }

    dibujar();
  };

  const calcularLimite = buscando => {
    const vinculados = cuadros.filter(cuadro =>
      cuadro.rl.find(relation => relation.id === buscando.id),
    );
    const totalConexiones = buscando?.rl?.length + vinculados.length;
    return buscando?.maxConexiones <= totalConexiones;
  };

  const validarConexiones = (origen, destino) => {
    const limiteOrigen = calcularLimite(origen);
    const limiteDestino = calcularLimite(destino);
    const llegoAlLimiteDeConexiones = limiteOrigen || limiteDestino;

    if (llegoAlLimiteDeConexiones) {
      const maxConexionesParaAlerta = limiteOrigen
        ? origen?.maxConexiones
        : destino?.maxConexiones;
      mostrarAlerta(
        `Este equipo superó el número de conexiones máxima (${maxConexionesParaAlerta}).`,
      );
      return true;
    }

    const conectadoOrigen = origen.rl.find(cuadro => cuadro.id === destino.id);
    const conectadoDestino = destino.rl.find(cuadro => cuadro.id === origen.id);

    return conectadoOrigen || conectadoDestino;
  };

  const crearConexion = () => {
    if (cuadroOrigen?.text || objetoApuntado?.text) return;
    if (!cuadroOrigen) {
      actualizarOrigen(objetoApuntado);
    } else if (objetoApuntado.id !== cuadroOrigen.id) {
      const validado = validarConexiones(cuadroOrigen, objetoApuntado);
      if (!validado) cuadroOrigen.rl.push(objetoApuntado);
      actualizarOrigen(null);
      // En caso que quieran que sea conexion continua, omitir actualizar la bandera:
      actualizarConectar(conectar);
    }
  };

  const agregarAlGrupo = () => {
    console.log('Se agregara: ', objetoApuntado);
    return;
  };

  const levantarClic = e => {
    if (objetoApuntado) {
      seleccionarCuadro(objetoApuntado);
      actualizarHistorial(cuadros);
      modificarCuadro(objetoApuntado);
      if (conectar) crearConexion();
      if (agrupar) agregarAlGrupo();
    }
    objetoApuntado = null;
    estaPresionado = false;
  };

  const sobrepasarMouse = e => {
    levantarClic(e);
  };

  return (
    <canvas
      ref={canvas}
      id="canvas"
      className="workspace-canvas"
      onMouseDown={hacerClic}
      onMouseMove={moverMouse}
      onMouseUp={levantarClic}
      onMouseOut={sobrepasarMouse}
    ></canvas>
  );
};

export default Canvas;
