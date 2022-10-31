import React, { useRef, useEffect, useContext } from 'react';

import CanvasContext from '../../../context/CanvasContext/CanvasContext';

import './Canvas.css';

import imagen1 from '../../../img/image.png';
import imagen2 from '../../../img/image2.png';
import imagen3 from '../../../img/image3.png';
import imagen6 from '../../../img/image6.png';
import imagen7 from '../../../img/image7.png';
import { dibujarCuadro } from './canvas.dibujar';

const Canvas = ({ actualizarHistorial = () => {} }) => {
  const canvas = useRef();
  const contexto = useRef(null);
  const { cuadros, nivelDeZoom, modificarCuadro, seleccionarCuadro } =
    useContext(CanvasContext);
  // contexto del canvas

  const figuras = [
    { x: 84, y: 133, w: 200, h: 200, r1: [], img: imagen1 },
    { x: 223, y: 63, w: 100, h: 100, r1: [], img: imagen2 },
    { x: 499, y: 455, w: 100, h: 100, r1: [], img: imagen3 },
    { x: 402, y: 73, w: 100, h: 100, r1: [], img: imagen6 },
    { x: 84, y: 300, w: 100, h: 100, r1: [], img: imagen7 },
    { x: 100, y: 440, w: 100, h: 100, r1: [], img: imagen1 },
    { x: 100, y: 440, w: 50, h: 50, r1: [], img: imagen2 },
  ];
  cuadros.push(...figuras);

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
  }, [cuadros, nivelDeZoom]);

  // Dibujar los cuadros
  const dibujar = () => {
    contexto.current.save();
    contexto.current.clearRect(
      0,
      0,
      canvas.current.clientWidth,
      canvas.current.clientHeight,
    );

    // cuadros[0].r1.push(cuadros[2]);
    // cuadros[4].r1.push(cuadros[2]);
    // cuadros[1].r1.push(cuadros[2]);
    // cuadros[2].r1.push(cuadros[3]);
    // cuadros[5].r1.push(cuadros[2]);

    // cuadros.map(info => dibujarCuadro(info, contexto));

    contexto.current.scale(nivelDeZoom, nivelDeZoom);
    cuadros.map(info => dibujarCuadro(info, contexto.current));
    contexto.current.restore();
  };

  // Identificar el evento clic en la figura
  const superficieFigura = (x, y) => {
    let estaEncima = null;
    cuadros.forEach(figura => {
      const { x: figX, y: figY, w: figW, h: figH } = figura;
      // Si el cursor esta dentro de la figura en el eje X:
      const rangoX = x >= figX && x <= figX + figW;
      // Si el cursor esta dentro de la figura en el eje Y:
      const rangoY = y >= figY && y <= figY + figH;
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
      seleccionarCuadro(objetoApuntado);
      actualizarHistorial(cuadros);
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
