export function functions () {

  const obtenerCasillas = () => {
    let casillas = [];
    for (let i = 1; i <= 64; i++) {
      let numeroDeCasilla = `casillero${i}`;
      let casilla = document.getElementById(numeroDeCasilla);

      casillas.push({
        numeroDeCasilla: casilla,
      });
    }

    return casillas;
  };

  const imagenes = {
    peonBlanco1: "./assets/peonBlanco.png",

    peonNegro1: "./assets/peonNegro.png",

    reyNegro: "./assets/reyNegro.png",

    reyBlanco: "./assets/reyBlanco.png",

    reinaBlanca: "./assets/reinaBlanca.png",

    reinaNegra: "./assets/reinaNegra.png",

    caballoBlanco: "./assets/caballoBlanco.png",

    caballoNegro: "./assets/caballoNegro.png",

    alfilBlanco: "./assets/alfilBlanco.png",

    alfilNegro: "./assets/alfilNegro.png",

    torreBlanca: "./assets/torreBlanca.png",

    torreNegra: "./assets/torreNegra.png",
  };

  return{
    obtenerCasillas,
    imagenes
  }

};
