// Identificar el evento clic en la figura
export const superficieFigura = (x, y) => {
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
    }
  });
  return estaEncima;
};
