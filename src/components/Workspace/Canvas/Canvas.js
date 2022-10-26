import React, { useRef, useEffect, useContext } from 'react';

import CanvasContext from '../../../context/CanvasContext/CanvasContext';

import './Canvas.css';

const Canvas = () => {
  const canvas = useRef();
  const contexto = useRef(null);
  const { cuadros, modificarCuadro, seleccionarCuadro } =
    useContext(CanvasContext);
  // contexto del canvas
  console.log(contexto);

  /* const cuadros = [
    { x: 84, y: 133, w: 200, h: 200, r1: [] },
    { x: 223, y: 63, w: 100, h: 100, r1: [] },
    { x: 499, y: 455, w: 100, h: 100, r1: [] },
    { x: 402, y: 73, w: 100, h: 100, r1: [] },
    { x: 84, y: 300, w: 100, h: 100, r1: [] },
    { x: 100, y: 440, w: 100, h: 100, r1: [] },
    { x: 100, y: 440, w: 50, h: 50, r1: [] },
  ]; */

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
  }, [cuadros]);

  // Dibujar los cuadros
  const dibujar = () => {
    contexto.current.clearRect(
      0,
      0,
      canvas.current.clientWidth,
      canvas.current.clientHeight,
    );
    cuadros.map(info => drawFillRect(info));
  };

  // Funcion para dibujar el cuadro
  const drawFillRect = (info, style = {}) => {
    const { x, y, w, h, r1 } = info;
    const { backgroundColor = 'blue' } = style;

    contexto.current.beginPath();
    contexto.current.lineWidth = '2';
    contexto.current.strokeStyle = backgroundColor;
    contexto.current.scale(1, 1);
    contexto.current.rect(x, y, w, h);
    contexto.current.stroke();

    if (r1) r1.map(cuadro => calcularLinea(info, cuadro));
  };

  const calcularLinea = (origen, destino) => {
    if (!destino) return;

    const { x: forma1X, y: forma1Y, w: origenW, h: origenH } = origen;
    const { x: forma2X, y: forma2Y, w: destinoW, h: destinoH } = destino;
    const linea = {
      origenX: origenW / 2 + forma1X,
      origenY: origenH / 2 + forma1Y,
      destinoX: destinoW / 2 + forma2X,
      destinoY: destinoH / 2 + forma2Y,
    };

    dibujarLinea(linea);
  };

  const dibujarLinea = linea => {
    const { origenX, origenY, destinoX, destinoY } = linea;
    contexto.current.strokeStyle = 'red';
    contexto.current.beginPath();
    contexto.current.moveTo(origenX, origenY);
    contexto.current.lineTo(destinoX, destinoY);
    contexto.current.lineWidth = '1.6';
    contexto.current.cap = 'round';
    contexto.current.stroke();
  };

  // Identificar el evento clic en la figura
  const superficieFigura = (x, y) => {
    let estaEncima = null;

    cuadros.forEach(cuadro => {
      if (
        x >= cuadro.x &&
        x <= cuadro.x + cuadro.w &&
        y >= cuadro.y &&
        y <= cuadro.y + cuadro.h
      ) {
        objetoApuntado = cuadro;
        estaEncima = true;
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
    objetoApuntado.x += dx;
    objetoApuntado.y += dy;
    dibujar();
  };

  const levantarClic = e => {
    if (objetoApuntado) {
      console.log({ cuadros, objetoApuntado });
      seleccionarCuadro(objetoApuntado);
      modificarCuadro(objetoApuntado);
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
