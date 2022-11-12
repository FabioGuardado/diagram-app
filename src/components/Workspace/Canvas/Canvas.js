import React, { useRef, useEffect, useContext } from 'react';

import CanvasContext from '../../../context/CanvasContext/CanvasContext';

import './Canvas.css';
import { dibujarCuadro, crearLineas, dibujarBorde } from './canvas.dibujar';

const Canvas = ({ actualizarHistorial = () => {} }) => {
  const canvas = useRef();
  const contexto = useRef(null);
  const {
    cuadros,
    nivelDeZoom,
    modificarCuadro,
    seleccionarCuadro,
    conectar,
    actualizarOrigen,
    cuadroOrigen,
    actualizarConectar,
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
  }, [cuadros, nivelDeZoom, cuadroOrigen, conectar]);

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
    cuadros.map(info => dibujarCuadro(info, contexto.current));
    if (conectar && cuadroOrigen) dibujarBorde(cuadroOrigen, contexto.current);

    contexto.current.restore();
  };

  // Identificar el evento clic en la figura
  const superficieFigura = (x, y) => {
    let estaEncima = null;
    cuadros.forEach(figura => {
      const { x: figX, y: figY, w: figW, h: figH, text } = figura;
      if (text) {
        const rangoX =
          x >= figX * nivelDeZoom && x <= (figX + figW) * nivelDeZoom;
        // Si el cursor esta dentro de la figura en el eje Y:
        const rangoY =
          y <= figY * nivelDeZoom && y >= (figY - figH) * nivelDeZoom;
        // Si el cursor esta dentro del rango X e Y, entonces esta encima de nuestra figura
        if (rangoX && rangoY) {
          objetoApuntado = figura;
          estaEncima = true;
          return estaEncima;
        }
      } else {
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
      }
    });
    return estaEncima;
  };

  const hacerClic = e => {
    inicioX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    inicioY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
    estaPresionado = superficieFigura(inicioX, inicioY);
  };

  const moverMouse = e => {
    if (!estaPresionado) return;
    const mouseX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    const mouseY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
    const dx = mouseX - inicioX;
    const dy = mouseY - inicioY;
    inicioX = mouseX;
    inicioY = mouseY;
    objetoApuntado.x += dx / nivelDeZoom;
    objetoApuntado.y += dy / nivelDeZoom;
    dibujar();
  };

  const validarConexiones = (origen, destino) => {
    const conectadoOrigen = origen.rl.find(cuadro => cuadro.id === destino.id);
    const conectadoDestino = destino.rl.find(cuadro => cuadro.id === origen.id);
    return conectadoOrigen || conectadoDestino;
  };

  const crearConexion = () => {
    if (!cuadroOrigen) {
      actualizarOrigen(objetoApuntado);
    } else if (objetoApuntado.id !== cuadroOrigen.id) {
      const validado = validarConexiones(cuadroOrigen, objetoApuntado);
      if (!validado) cuadroOrigen.rl.push(objetoApuntado);
      actualizarOrigen(null);
      actualizarConectar(conectar);
    }
  };

  const levantarClic = e => {
    if (objetoApuntado) {
      seleccionarCuadro(objetoApuntado);
      actualizarHistorial(cuadros);
      modificarCuadro(objetoApuntado);
      if (conectar) crearConexion();
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
