import React, { useRef, useEffect } from 'react';

import './Canvas.css';

import nombreDeLaImagen from '../../../img/pic_the_scream.jpg';

const Canvas = () => {
  const canvas = useRef();
  // contexto del canvas
  let contexto = null;

  const cuadros = [
    { x: 84, y: 133, w: 100, h: 100, r1: [], text: '0' },
    { x: 223, y: 63, w: 100, h: 100, r1: [], text: '1' },
    { x: 499, y: 455, w: 100, h: 100, r1: [], text: '2' },
    { x: 402, y: 73, w: 100, h: 100, r1: [], text: '3' },
    { x: 84, y: 300, w: 100, h: 100, r1: [], text: '4' },
    { x: 100, y: 440, w: 100, h: 100, r1: [], text: '5' },
    { x: 550, y: 40, w: 100, h: 100, r1: [], text: '6' },
    { x: 700, y: 80, w: 100, h: 100, r1: [], text: '7' },
  ];

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
    contexto = elementoCanvas.getContext('2d');
  }, []);

  useEffect(() => {
    dibujar();
  }, []);

  // Dibujar los cuadros
  const dibujar = () => {
    contexto.clearRect(
      0,
      0,
      canvas.current.clientWidth,
      canvas.current.clientHeight,
    );

    const image = new Image(60, 45); // Using optional size for image
    image.onload = drawImageActualSize; // Draw when image has loaded
    image.src = 'pc.png';

    cuadros.map(info => dibujarCuadro(info));
  };

  function drawImageActualSize() {
    // Will draw the image as 300x227, ignoring the custom size of 60x45
    // given in the constructor
    contexto.drawImage(this, 0, 0);

    // To use the custom size we'll have to specify the scale parameters
    // using the element's width and height properties - lets draw one
    // on top in the corner:
    contexto.drawImage(this, 0, 0, this.width, this.height);
  }

  // Funcion para dibujar el cuadro
  const dibujarCuadro = info => {
    const { x, y, w, h, r1, text } = info;
    contexto.beginPath();
    contexto.lineWidth = '2';
    contexto.strokeStyle = 'blue';
    contexto.rect(x, y, w, h);
    contexto.stroke();
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
    objetoApuntado = null;
    estaPresionado = false;
  };

  const sobrepasarMouse = e => {
    levantarClic(e);
  };

  return (
    <>
      <img id="source" src={nombreDeLaImagen} style={{ display: 'none' }} />
      <canvas
        ref={canvas}
        id="canvas"
        className="workspace-canvas"
        onMouseDown={hacerClic}
        onMouseMove={moverMouse}
        onMouseUp={levantarClic}
        onMouseOut={sobrepasarMouse}
      ></canvas>
    </>
  );
};

export default Canvas;
