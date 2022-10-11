import React, { useRef, useEffect } from 'react';

import './Canvas.css';

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

    cuadros[0].r1.push(cuadros[2]);
    cuadros[4].r1.push(cuadros[2]);
    cuadros[1].r1.push(cuadros[2]);
    cuadros[2].r1.push(cuadros[3]);
    cuadros[5].r1.push(cuadros[2]);
    // cuadros[6].r1.push(cuadros[5]);
    // cuadros[6].r1.push(cuadros[2]);

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

    dibujarTexto({ x, y, text });
    r1.map(cuadro => calcularLinea(info, cuadro));
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
    contexto.strokeStyle = 'red';
    contexto.beginPath();
    contexto.moveTo(origenX, origenY);
    contexto.lineTo(destinoX, destinoY);
    contexto.lineWidth = '1.2';
    contexto.cap = 'round';
    contexto.stroke();
  };

  const dibujarTexto = punto => {
    const { x, y, text } = punto;
    contexto.font = '30px serif';
    contexto.fillStyle = 'black';
    contexto.fillText(text, x, y - 5);
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
      <img id="source" src="pic_the_scream.jpg" style={{ display: 'none' }} />
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
