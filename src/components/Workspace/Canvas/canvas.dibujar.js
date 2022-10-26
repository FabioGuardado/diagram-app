// Funcion para dibujar el cuadro
export const dibujarCuadro = (info, contexto) => {
  const { x, y, w, h, r1, text } = info;
  // contexto.beginPath();
  // contexto.lineWidth = '2';
  // contexto.strokeStyle = 'blue';
  // contexto.rect(x, y, w, h);
  // contexto.stroke();

  dibujarImagen(info, contexto);
  dibujarPropTexto({ x, y, text }, contexto);
  r1.map(cuadro => calcularLinea(info, cuadro, contexto));
};

const calcularLinea = (origen, destino, contexto) => {
  if (!destino) return;

  const { x: forma1X, y: forma1Y, w: origenW, h: origenH } = origen;
  const { x: forma2X, y: forma2Y, w: destinoW, h: destinoH } = destino;
  const linea = {
    origenX: origenW / 2 + forma1X,
    origenY: origenH / 2 + forma1Y,
    destinoX: destinoW / 2 + forma2X,
    destinoY: destinoH / 2 + forma2Y,
  };
  dibujarLinea(linea, contexto);
};

const dibujarLinea = (linea, contexto) => {
  const { origenX, origenY, destinoX, destinoY } = linea;
  contexto.beginPath();
  contexto.moveTo(origenX, origenY);
  contexto.lineTo(destinoX, destinoY);
  contexto.strokeStyle = 'red';
  contexto.lineWidth = '1.2';
  contexto.cap = 'round';
  contexto.stroke();
};

const dibujarPropTexto = (punto, contexto) => {
  const { x, y, text } = punto;
  contexto.font = '30px serif';
  contexto.fillStyle = 'black';
  contexto.fillText(text, x, y - 5);
};

const dibujarImagen = (imagen, contexto) => {
  const { x, y, w, h, img } = imagen;
  const imagenCuadro = new Image();
  imagenCuadro.src = img;
  contexto.drawImage(imagenCuadro, x, y, w, h);
};
