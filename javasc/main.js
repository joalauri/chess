import { functions } from "./let.js";

const f = functions();

let casillas;
const imagenes = f.imagenes;
/* 
*
Condiciones a cumplir!
*
*/

const col1 = [];
const col2 = [];
const col3 = [];
const col4 = [];
const col5 = [];
const col6 = [];
const col7 = [];
const col8 = [];
const row1 = [];
const row2 = [];
const row3 = [];
const row4 = [];
const row5 = [];
const row6 = [];
const row7 = [];
const row8 = [];
const columna = [col1, col2, col3, col4, col5, col6, col7, col8];
const row = [row1, row2, row3, row4, row5, row6, row7, row8];
for (let i = 1; i < 65; i += 8) {
  col1.push(`casillero${i}`);
  col2.push(`casillero${i + 1}`);
  col3.push(`casillero${i + 2}`);
  col4.push(`casillero${i + 3}`);
  col5.push(`casillero${i + 4}`);
  col6.push(`casillero${i + 5}`);
  col7.push(`casillero${i + 6}`);
  col8.push(`casillero${i + 7}`);
}
for (let i = 1; i < 9; i++) {
  row1.push(`casillero${i}`);
  row2.push(`casillero${i + 8}`);
  row3.push(`casillero${i + 16}`);
  row4.push(`casillero${i + 24}`);
  row5.push(`casillero${i + 32}`);
  row6.push(`casillero${i + 40}`);
  row7.push(`casillero${i + 48}`);
  row8.push(`casillero${i + 56}`);
}
const updateTable = () => {
  let html = "";
  const table = document.getElementById("TableroPadre");

  for (let i = 1; i <= 64; i++) {
    let logic =
      i <= 8 ||
      (i > 16 && i <= 24) ||
      (i > 32 && i <= 40) ||
      (i > 48 && i <= 56);

    if (logic) {
      if (i % 2 == 0) {
        html += `
                    <div id="casillero${i}" class="div${i} negras casilla"></div>
                `;
      } else {
        html += `
                    <div id="casillero${i}" class="div${i} blancas casilla"></div>
                `;
      }
    } else {
      if (i % 2 !== 0) {
        html += `
                    <div id="casillero${i}" class="div${i} negras casilla"></div>
                `;
      } else {
        html += `
                    <div id="casillero${i}" class="div${i} blancas casilla"></div>
                `;
      }
    }
  }
  table.innerHTML = html;
};
let contadorInterno = 0;
let modoPrueba = false;
let amenazaARey = 0;
let imagenDeReserva = null;
let espacioDeReserva = null;
let posibilidad1 = [];
let posibilidad2 = [];
let torre1 = 0;
let torre2 = 0;
let torre3 = 0;
let torre4 = 0;
let reyBlancoMove = 0;
let reyNegroMove = 0;
// let contadorPeon = ""

const addEvent = (casillas) => {
  for (let i = 1; i <= casillas.length; i++) {
    let casilla = document.getElementById(`casillero${i}`);
    casilla.addEventListener("click", () => {
      if (contadorInterno === 0) {
        if (casilla.childElementCount == 0) {
          // console.log("");
        } else {
          let imagenDentroBase = casilla.firstElementChild.firstElementChild;
          imagenDeReserva = imagenDentroBase.id;
          espacioDeReserva = casilla.id;
          contadorInterno++;
          activarCasilla(espacioDeReserva);
        }
      } else {
        if (casilla.childElementCount == 0) {
          contadorInterno--;
          modificarJugadas(espacioDeReserva, casilla.id, imagenDeReserva);
          desactivarCasilla(espacioDeReserva);
        } else {
          let imagenDentro = casilla.firstElementChild.firstElementChild;
          contadorInterno--;
          modificarJugadas(espacioDeReserva, casilla.id, imagenDeReserva);
          desactivarCasilla(espacioDeReserva);
        }
      }
    });
  }
};
const activarCasilla = function (casillaOrigen) {
  let activar = document.getElementById(casillaOrigen);
  activar.classList.add("active");
};
const desactivarCasilla = function (parametro) {
  let desactivar = document.getElementById(parametro);
  desactivar.classList.remove("active");
};
const modificarJugadas = function (casillaOrig, casillaDest, object) {
  //declaraciones//
  let capturandoLaImagen = document.getElementById(object);
  let corregirURL = capturandoLaImagen.src.slice(21);
  let bynCapturando = document.getElementById(casillaDest);
  let compFinByn = false;
  if (bynCapturando.hasChildNodes() === true) {
    let comparacionCapturada = bynCapturando.firstChild.firstChild;
    let srcBYN = comparacionCapturada.src;
    compFinByn = srcBYN.includes("Blanc");
  }
  let captObjcID = capturandoLaImagen.id;
  let comparacion07 = captObjcID.slice(0, 7);
  let comparacion05 = captObjcID.slice(0, 5);
  let comparacion03 = captObjcID.slice(0, 3);
  let comparacion04 = captObjcID.slice(0, 4);
  let byn = corregirURL.includes("Blanc");
  let eliminarHijoNativo = "";
  let comerPiezaDest = "";
  let casOritInt = parseInt(casillaOrig.slice(9));
  let casDestItn = parseInt(casillaDest.slice(9));
  let tieneNoTiene = 0;
  let count = 0;
  let countFin = 0;
  let cortarDiagonal1 = [];
  let cortarDiagonal2 = [];
  let cortarDiagonal3 = [];
  let cortarDiagonal4 = [];

  casillas.forEach((casillero) => {
    if (casillero.numeroDeCasilla.id === casillaOrig) {
      let eliminarHijo = document.getElementById(casillero.numeroDeCasilla.id);
      eliminarHijoNativo = eliminarHijo;
    }
  });

  casillas.forEach((casillero) => {
    if (casillero.numeroDeCasilla.id === casillaDest) {
      let destino = casillero.numeroDeCasilla.id;
      let eliminarPieza = document.getElementById(casillero.numeroDeCasilla.id);
      comerPiezaDest = eliminarPieza;
      /*
       *
       *
       *
       */
      if (comparacion07 === "caballo") {
        let casillaDeCab = casillaOrig.slice(9);
        let casillaDeCaballo = parseInt(casillaDeCab);
        let cabCont = 0;
        for (let i = 1; i < 2; i++) {
          let cabOpt1;
          let cabOpt2;
          let cabOpt3;
          let cabOpt4;
          let cabOpt5;
          let cabOpt6;
          let cabOpt7;
          let cabOpt8;
          for (let e = 0; e < 9; e++) {
            let cabCol1 = e * 8 + 1;
            let cabCol2 = e * 8 + 2;
            let cabCol3 = e * 8 + 7;
            let cabCol4 = e * 8 + 8;
            if (casillaDeCaballo === cabCol1 && cabCont === 0) {
              cabOpt1 = `casillero${casillaDeCaballo + i * 17}`;
              cabOpt2 = `casillero${casillaDeCaballo + i * 0}`;
              cabOpt3 = `casillero${casillaDeCaballo + i * 0}`;
              cabOpt4 = `casillero${casillaDeCaballo + i * -15}`;
              cabOpt5 = `casillero${casillaDeCaballo + i * 10}`;
              cabOpt6 = `casillero${casillaDeCaballo + i * 0}`;
              cabOpt7 = `casillero${casillaDeCaballo + i * 0}`;
              cabOpt8 = `casillero${casillaDeCaballo + i * -6}`;
              cabCont = 1;
            } else if (casillaDeCaballo === cabCol2 && cabCont === 0) {
              cabOpt1 = `casillero${casillaDeCaballo + i * 17}`;
              cabOpt2 = `casillero${casillaDeCaballo + i * -17}`;
              cabOpt3 = `casillero${casillaDeCaballo + i * 15}`;
              cabOpt4 = `casillero${casillaDeCaballo + i * -15}`;
              cabOpt5 = `casillero${casillaDeCaballo + i * 10}`;
              cabOpt6 = `casillero${casillaDeCaballo + i * 0}`;
              cabOpt7 = `casillero${casillaDeCaballo + i * 0}`;
              cabOpt8 = `casillero${casillaDeCaballo + i * -6}`;
              cabCont = 1;
            } else if (casillaDeCaballo === cabCol3 && cabCont === 0) {
              cabOpt1 = `casillero${casillaDeCaballo + i * 17}`;
              cabOpt2 = `casillero${casillaDeCaballo + i * -17}`;
              cabOpt3 = `casillero${casillaDeCaballo + i * 15}`;
              cabOpt4 = `casillero${casillaDeCaballo + i * -15}`;
              cabOpt5 = `casillero${casillaDeCaballo + i * 0}`;
              cabOpt6 = `casillero${casillaDeCaballo + i * -10}`;
              cabOpt7 = `casillero${casillaDeCaballo + i * 6}`;
              cabOpt8 = `casillero${casillaDeCaballo + i * 0}`;
              cabCont = 1;
            } else if (casillaDeCaballo === cabCol4 && cabCont === 0) {
              cabOpt1 = `casillero${casillaDeCaballo + i * 0}`;
              cabOpt2 = `casillero${casillaDeCaballo + i * -17}`;
              cabOpt3 = `casillero${casillaDeCaballo + i * 15}`;
              cabOpt4 = `casillero${casillaDeCaballo + i * 0}`;
              cabOpt5 = `casillero${casillaDeCaballo + i * 0}`;
              cabOpt6 = `casillero${casillaDeCaballo + i * -10}`;
              cabOpt7 = `casillero${casillaDeCaballo + i * 6}`;
              cabOpt8 = `casillero${casillaDeCaballo + i * 0}`;
              cabCont = 1;
            }
          }
          if (cabCont === 0) {
            cabOpt1 = `casillero${casillaDeCaballo + i * 17}`;
            cabOpt2 = `casillero${casillaDeCaballo + i * -17}`;
            cabOpt3 = `casillero${casillaDeCaballo + i * 15}`;
            cabOpt4 = `casillero${casillaDeCaballo + i * -15}`;
            cabOpt5 = `casillero${casillaDeCaballo + i * 10}`;
            cabOpt6 = `casillero${casillaDeCaballo + i * -10}`;
            cabOpt7 = `casillero${casillaDeCaballo + i * 6}`;
            cabOpt8 = `casillero${casillaDeCaballo + i * -6}`;
            cabCont = 1;
          }
          let arrayDePosiblesCaballo = [
            cabOpt1,
            cabOpt2,
            cabOpt3,
            cabOpt4,
            cabOpt5,
            cabOpt6,
            cabOpt7,
            cabOpt8,
          ];

          arrayDePosiblesCaballo.forEach((element) => {
            if (
              casillaDest === element &&
              casillaOrig != casillaDest &&
              count < 1
            ) {
              let eleInLet = document.getElementById(element);
              let numero1 = element.slice(9);
              let numero = parseFloat(numero1);
              if (element.includes("-") || numero > 64 || numero === 0) {
                // console.log("");
              } else if (eleInLet.hasChildNodes()) {
                if (
                  byn === true &&
                  compFinByn === false &&
                  element === casillaDest &&
                  tieneNoTiene === 0
                ) {
                  if (modoPrueba === true) {
                    amenazaARey++;
                    tieneNoTiene++;
                  } else {
                    count++;
                    kickImgBoardPrev(eliminarHijoNativo);
                    comerPieza(comerPiezaDest);
                    crearImagen(destino, "." + corregirURL);
                  }
                } else if (
                  byn === false &&
                  compFinByn === true &&
                  element === casillaDest &&
                  tieneNoTiene === 0
                ) {
                  if (modoPrueba === true) {
                    amenazaARey++;
                    tieneNoTiene++;
                  } else {
                    count++;
                    kickImgBoardPrev(eliminarHijoNativo);
                    comerPieza(comerPiezaDest);
                    crearImagen(destino, "." + corregirURL);
                  }
                } else if (
                  modoPrueba === true &&
                  byn === true &&
                  compFinByn === true &&
                  tieneNoTiene === 0
                ) {
                  amenazaARey++;
                  tieneNoTiene++;
                } else if (
                  modoPrueba === true &&
                  byn === false &&
                  compFinByn === false &&
                  tieneNoTiene === 0
                ) {
                  amenazaARey++;
                  tieneNoTiene++;
                } else {
                  tieneNoTiene++;
                }
              } else if (
                eleInLet.hasChildNodes() === false &&
                element === casillaDest
              ) {
                if (modoPrueba === true) {
                  amenazaARey++;
                  tieneNoTiene++;
                } else {
                  kickImgBoardPrev(eliminarHijoNativo);
                  comerPieza(comerPiezaDest);
                  crearImagen(destino, "." + corregirURL);
                }
              }
            }
          });
        }
      }
      /*
       *
       *
       *
       */
      if (comparacion05 === "alfil") {
        let casillaDeAlfil = casillaOrig.slice(9);
        let casillaDeAlfilN = parseInt(casillaDeAlfil);
        for (let i = 1; i < 8; i++) {
          let alfilOpt1 = `casillero${casillaDeAlfilN + i * 7}`;
          let alfilOpt2 = `casillero${casillaDeAlfilN + i * -7}`;
          let alfilOpt3 = `casillero${casillaDeAlfilN + i * 9}`;
          let alfilOpt4 = `casillero${casillaDeAlfilN + i * -9}`;
          let arrayDePosiblesAlfil = [
            alfilOpt1,
            alfilOpt2,
            alfilOpt3,
            alfilOpt4,
          ];
          if (cortarDiagonal1.length >= 1) {
            arrayDePosiblesAlfil.splice(0, 1);
            arrayDePosiblesAlfil.splice(0, 0, casillaOrig);
          }
          if (cortarDiagonal2.length >= 1) {
            arrayDePosiblesAlfil.splice(1, 1);
            arrayDePosiblesAlfil.splice(1, 0, casillaOrig);
          }
          if (cortarDiagonal3.length >= 1) {
            arrayDePosiblesAlfil.splice(2, 1);
            arrayDePosiblesAlfil.splice(2, 0, casillaOrig);
          }
          if (cortarDiagonal4.length >= 1) {
            arrayDePosiblesAlfil.splice(3, 1);
            arrayDePosiblesAlfil.splice(3, 0, casillaOrig);
          }

          arrayDePosiblesAlfil.forEach((opt) => {
            let numero1 = opt.slice(9);
            let numero = parseFloat(numero1);
            if (opt.includes("-") || numero > 64 || numero === 0) {
              // console.log("");
            } else {
              let test = document.getElementById(opt);
              if (test.hasChildNodes()) {
                let posicion = arrayDePosiblesAlfil.indexOf(opt);
                if (posicion === 0) {
                  cortarDiagonal1.push("");
                }
                if (posicion === 1) {
                  cortarDiagonal2.push("");
                }
                if (posicion === 2) {
                  cortarDiagonal3.push("");
                }
                if (posicion === 3) {
                  cortarDiagonal4.push("");
                }
              }
            }
          });
          arrayDePosiblesAlfil.forEach((posibilidad) => {
            if (
              casillaDest === posibilidad &&
              casillaOrig != casillaDest &&
              count < 1
            ) {
              let derechoOReves = arrayDePosiblesAlfil.slice();

              if (casOritInt > casDestItn) {
                derechoOReves.reverse();
              } //dar vuelta el resultado para convalidar en orden
              let countOrigen = 0;
              derechoOReves.forEach((element) => {
                if (element != casillaDest && countFin === 0) {
                  countOrigen++;
                } else if (element === casillaDest) {
                  countFin++;
                }
              });
              for (let i = countOrigen; i > 0; i--) {
                derechoOReves.shift();
              }
              derechoOReves.forEach((ele) => {
                if (ele.includes("-")) {
                  // console.log("");
                } else {
                  if (casillaDest === ele) {
                    let eleInLet = document.getElementById(ele);
                    if (eleInLet.hasChildNodes()) {
                      if (
                        byn === true &&
                        compFinByn === false &&
                        ele === casillaDest &&
                        tieneNoTiene === 0
                      ) {
                        if (modoPrueba === true) {
                          amenazaARey++;
                          tieneNoTiene++;
                        } else {
                          count++;
                          kickImgBoardPrev(eliminarHijoNativo);
                          comerPieza(comerPiezaDest);
                          crearImagen(destino, "." + corregirURL);
                        }
                      } else if (
                        byn === false &&
                        compFinByn === true &&
                        ele === casillaDest &&
                        tieneNoTiene === 0
                      ) {
                        if (modoPrueba === true) {
                          amenazaARey++;
                          tieneNoTiene++;
                        } else {
                          count++;
                          kickImgBoardPrev(eliminarHijoNativo);
                          comerPieza(comerPiezaDest);
                          crearImagen(destino, "." + corregirURL);
                        }
                      } else if (
                        modoPrueba === true &&
                        byn === true &&
                        compFinByn === true &&
                        tieneNoTiene === 0
                      ) {
                        amenazaARey++;
                        tieneNoTiene++;
                      } else if (
                        modoPrueba === true &&
                        byn === false &&
                        compFinByn === false &&
                        tieneNoTiene === 0
                      ) {
                        amenazaARey++;
                        tieneNoTiene++;
                      } else {
                        tieneNoTiene++;
                      }
                    } else {
                      if (ele === casillaDest && tieneNoTiene === 0) {
                        if (modoPrueba === true) {
                          amenazaARey++;
                          tieneNoTiene++;
                        } else {
                          count++;
                          kickImgBoardPrev(eliminarHijoNativo);
                          comerPieza(comerPiezaDest);
                          crearImagen(destino, "." + corregirURL);
                        }
                      }
                    }
                  }
                }
              });
            }
          });
        } // cierre del for ---> de diagonal.
      }
      /*
       *
       *
       *
       */
      if (comparacion04 === "peon") {
        let arrayPosiblesPeonB = [];
        let arrayPosiblesPeonN = [];
        for (let i = 1; i < 7; i++) {
          let opcionPeon = casillaOrig.slice(9);
          let opcionPeonN = parseInt(opcionPeon);
          arrayPosiblesPeonB.push(`casillero${opcionPeonN + i * 8}`);
          arrayPosiblesPeonN.push(`casillero${opcionPeonN - i * 8}`);
        }

        if (casOritInt < casDestItn) {
          arrayPosiblesPeonB.forEach((posibilidad) => {
            if (
              casillaDest === posibilidad &&
              casillaOrig != casillaDest &&
              count < 1
            ) {
              let derechoOReves = arrayPosiblesPeonB.slice();
              derechoOReves.forEach((ele) => {
                let numero1 = ele.slice(9);
                let numero = parseFloat(numero1);
                if (ele.includes("-") || numero > 64 || numero === 0) {
                  // console.log("");
                } else {
                  let eleInLet = document.getElementById(ele);
                  if (eleInLet.hasChildNodes()) {
                    tieneNoTiene++;
                  } else {
                    if (ele === casillaDest && tieneNoTiene === 0) {
                      if (casOritInt <= 16) {
                        if (
                          (casDestItn === casOritInt + 8 && count === 0) ||
                          (casDestItn === casOritInt + 16 && count === 0)
                        ) {
                          if (modoPrueba === true) {
                            console.log("imposible");
                          } else {
                            count++;
                            kickImgBoardPrev(eliminarHijoNativo);
                            comerPieza(comerPiezaDest);
                            crearImagen(destino, "." + corregirURL);
                          }
                        }
                      } else {
                        if (casDestItn === casOritInt + 8 && count === 0) {
                          if (modoPrueba === true) {
                            console.log("imposible");
                          } else {
                            count++;
                            kickImgBoardPrev(eliminarHijoNativo);
                            comerPieza(comerPiezaDest);
                            crearImagen(destino, "." + corregirURL);
                          }
                        }
                      }
                    }
                  }
                }
              });
            }
          });
        } else {
          arrayPosiblesPeonN.forEach((posibilidad) => {
            if (
              casillaDest === posibilidad &&
              casillaOrig != casillaDest &&
              count < 1
            ) {
              let derechoOReves = arrayPosiblesPeonN.slice();
              derechoOReves.forEach((ele) => {
                let numero1 = ele.slice(9);
                let numero = parseFloat(numero1);
                if (ele.includes("-") || numero > 64 || numero === 0) {
                  // console.log("");
                } else {
                  let eleInLet = document.getElementById(ele);

                  if (eleInLet.hasChildNodes()) {
                    tieneNoTiene++;
                  } else {
                    if (ele === casillaDest && tieneNoTiene === 0) {
                      if (casOritInt >= 49 && casOritInt <= 64) {
                        if (
                          (casDestItn === casOritInt - 8 && count === 0) ||
                          (casDestItn === casOritInt - 16 && count === 0)
                        ) {
                          if (modoPrueba === true) {
                            console.log("imposible");
                          } else {
                            count++;
                            kickImgBoardPrev(eliminarHijoNativo);
                            comerPieza(comerPiezaDest);
                            crearImagen(destino, "." + corregirURL);
                          }
                        }
                      } else {
                        if (casDestItn === casOritInt - 8 && count === 0) {
                          if (modoPrueba === true) {
                            console.log("imposible");
                          } else {
                            count++;
                            kickImgBoardPrev(eliminarHijoNativo);
                            comerPieza(comerPiezaDest);
                            crearImagen(destino, "." + corregirURL);
                          }
                        }
                      }
                    }
                  }
                }
              });
            }
          });
        }

        let comerPeonB = [];
        let comerPeonN = [];

        let comerPeon = casillaOrig.slice(9);
        let opcionPeonComer = parseInt(comerPeon);

        comerPeonB.push(`casillero${opcionPeonComer + 7}`);
        comerPeonB.push(`casillero${opcionPeonComer + 9}`);
        comerPeonN.push(`casillero${opcionPeonComer - 7}`);
        comerPeonN.push(`casillero${opcionPeonComer - 9}`);

        if (casOritInt < casDestItn && modoPrueba === false) {
          if (bynCapturando.hasChildNodes() === true) {
            comerPeonB.forEach((element) => {
              if (
                byn === true &&
                compFinByn === false &&
                element === casillaDest
              ) {
                count++;
                kickImgBoardPrev(eliminarHijoNativo);
                comerPieza(comerPiezaDest);
                crearImagen(destino, "." + corregirURL);
              }
            });
          }
        } else if (casOritInt > casDestItn && modoPrueba === false) {
          if (bynCapturando.hasChildNodes() === true) {
            comerPeonN.forEach((element) => {
              if (
                byn === false &&
                compFinByn === true &&
                element === casillaDest
              ) {
                count++;
                kickImgBoardPrev(eliminarHijoNativo);
                comerPieza(comerPiezaDest);
                crearImagen(destino, "." + corregirURL);
              }
            });
          }
        } else if (modoPrueba === true) {
          if (casOritInt < casDestItn) {
            comerPeonB.forEach((element) => {
              if (element === casillaDest) {
                amenazaARey++;
              }
            });
          } else {
            comerPeonN.forEach((element) => {
              if (element === casillaDest) {
                amenazaARey++;
              }
            });
          }
        }
      }

      /*
       *
       *
       *
       */
      if (comparacion03 === "rey") {
        if (modoPrueba === false) {
          moverRey(casillaDest, byn);
        }

        let opcionRey = casillaOrig.slice(9);
        let opcionReyN = parseInt(opcionRey);
        let reyMove1 = `casillero${opcionReyN + 1}`;
        let reyMove2 = `casillero${opcionReyN + 7}`;
        let reyMove3 = `casillero${opcionReyN + 8}`;
        let reyMove4 = `casillero${opcionReyN + 9}`;
        let reyMove5 = `casillero${opcionReyN + -1}`;
        let reyMove6 = `casillero${opcionReyN + -7}`;
        let reyMove7 = `casillero${opcionReyN + -8}`;
        let reyMove8 = `casillero${opcionReyN + -9}`;
        let arrayPosiblesRey = [
          reyMove1,
          reyMove2,
          reyMove3,
          reyMove4,
          reyMove5,
          reyMove6,
          reyMove7,
          reyMove8,
        ];

        if (
          casillaDest === "casillero3" &&
          byn === true &&
          modoPrueba === false
        ) {
          let cas2 = document.getElementById("casillero2");
          let cas3 = document.getElementById("casillero3");
          let cas4 = document.getElementById("casillero4");

          if (
            cas2.hasChildNodes() === false &&
            cas3.hasChildNodes() === false &&
            cas4.hasChildNodes() === false
          ) {
            moverRey("casillero2", byn);
            moverRey("casillero3", byn);
            moverRey("casillero4", byn);
            if (amenazaARey === 0 && torre1 === 0 && reyBlancoMove === 0) {
              kickImgBoardPrev(document.getElementById("casillero5"));
              kickImgBoardPrev(document.getElementById("casillero1"));
              crearImagen("casillero3", "./assets/reyBlanco.png");
              crearImagen("casillero4", "./assets/torreBlanca.png");
            }
          }
        } else if (
          casillaDest === "casillero7" &&
          byn === true &&
          modoPrueba === false
        ) {
          let cas6 = document.getElementById("casillero6");
          let cas7 = document.getElementById("casillero7");
          if (
            cas6.hasChildNodes() === false &&
            cas7.hasChildNodes() === false
          ) {
            moverRey("casillero6", byn);
            moverRey("casillero7", byn);
            if (amenazaARey === 0 && torre2 === 0 && reyBlancoMove === 0) {
              kickImgBoardPrev(document.getElementById("casillero5"));
              kickImgBoardPrev(document.getElementById("casillero8"));
              crearImagen("casillero7", "./assets/reyBlanco.png");
              crearImagen("casillero6", "./assets/torreBlanca.png");
            }
          }
        } else if (
          casillaDest === "casillero59" &&
          byn === false &&
          modoPrueba === false
        ) {
          let cas58 = document.getElementById("casillero58");
          let cas59 = document.getElementById("casillero59");
          let cas60 = document.getElementById("casillero60");
          if (
            cas58.hasChildNodes() === false &&
            cas59.hasChildNodes() === false &&
            cas60.hasChildNodes() === false
          ) {
            moverRey("casillero58", byn);
            moverRey("casillero59", byn);
            moverRey("casillero60", byn);
            if (amenazaARey === 0 && torre3 === 0 && reyNegroMove === 0) {
              kickImgBoardPrev(document.getElementById("casillero57"));
              kickImgBoardPrev(document.getElementById("casillero61"));
              crearImagen("casillero59", "./assets/reyNegro.png");
              crearImagen("casillero60", "./assets/torreNegra.png");
            }
          }
        } else if (
          casillaDest === "casillero63" &&
          byn === false &&
          modoPrueba === false
        ) {
          let cas62 = document.getElementById("casillero62");
          let cas63 = document.getElementById("casillero63");
          if (
            cas62.hasChildNodes() === false &&
            cas63.hasChildNodes() === false
          ) {
            moverRey("casillero62", byn);
            moverRey("casillero63", byn);
            if (amenazaARey === 0 && torre4 === 0 && reyNegroMove === 0) {
              kickImgBoardPrev(document.getElementById("casillero64"));
              kickImgBoardPrev(document.getElementById("casillero61"));
              crearImagen("casillero63", "./assets/reyNegro.png");
              crearImagen("casillero62", "./assets/torreNegra.png");
            }
          }
        } else {
          arrayPosiblesRey.forEach((posibilidad) => {
            if (
              casillaDest === posibilidad &&
              casillaOrig != casillaDest &&
              count < 1
            ) {
              let derechoOReves = arrayPosiblesRey.slice();

              if (casOritInt > casDestItn) {
                derechoOReves.reverse();
              } //dar vuelta el resultado para convalidar en orden
              let countOrigen = 0;
              derechoOReves.forEach((element) => {
                if (element != casillaDest && countFin === 0) {
                  countOrigen++;
                } else if (element === casillaDest) {
                  countFin++;
                }
              });
              for (let i = countOrigen; i > 0; i--) {
                derechoOReves.shift();
              }
              derechoOReves.forEach((ele) => {
                let numero1 = ele.slice(9);
                let numero = parseFloat(numero1);
                if (ele.includes("-") || numero > 64 || numero === 0) {
                  // console.log("");
                } else {
                  let eleInLet = document.getElementById(ele);
                  if (eleInLet.hasChildNodes()) {
                    if (
                      byn === true &&
                      compFinByn === false &&
                      ele === casillaDest &&
                      tieneNoTiene === 0
                    ) {
                      if (modoPrueba === true) {
                        amenazaARey++;
                        tieneNoTiene++;
                      } else if (amenazaARey === 0) {
                        count++;
                        kickImgBoardPrev(eliminarHijoNativo);
                        comerPieza(comerPiezaDest);
                        crearImagen(destino, "." + corregirURL);
                        if (byn === true) {
                          reyBlancoMove = 1;
                        } else if (byn === false) {
                          reynegroMove = 1;
                        }
                      }
                    } else if (
                      byn === false &&
                      compFinByn === true &&
                      ele === casillaDest &&
                      tieneNoTiene === 0
                    ) {
                      if (modoPrueba === true) {
                        amenazaARey++;
                        tieneNoTiene++;
                      } else if (amenazaARey === 0) {
                        count++;
                        kickImgBoardPrev(eliminarHijoNativo);
                        comerPieza(comerPiezaDest);
                        crearImagen(destino, "." + corregirURL);
                      }
                    } else if (
                      modoPrueba === true &&
                      byn === true &&
                      compFinByn === true &&
                      tieneNoTiene === 0
                    ) {
                      amenazaARey++;
                      tieneNoTiene++;
                    } else if (
                      modoPrueba === true &&
                      byn === false &&
                      compFinByn === false &&
                      tieneNoTiene === 0
                    ) {
                      amenazaARey++;
                      tieneNoTiene++;
                    } else {
                      tieneNoTiene++;
                    }
                  } else {
                    if (ele === casillaDest && tieneNoTiene === 0) {
                      if (modoPrueba === true) {
                        amenazaARey++;
                        tieneNoTiene++;
                      } else if (amenazaARey === 0) {
                        count++;
                        kickImgBoardPrev(eliminarHijoNativo);
                        comerPieza(comerPiezaDest);
                        crearImagen(destino, "." + corregirURL);
                        if (byn === true) {
                          reyBlancoMove = 1;
                        } else if (byn === false) {
                          reyNegroMove = 1;
                        }
                      }
                    }
                  }
                }
              });
            }
          });
        }

        if (modoPrueba === false) {
          amenazaARey = 0;
        }
      }
      /*
       *
       *
       *
       */
      if (comparacion05 === "reina") {
        let casillaDeReina = casillaOrig.slice(9);
        let casillaDeReinaN = parseInt(casillaDeReina);
        for (let i = 1; i < 8; i++) {
          let reinaOpt1 = `casillero${casillaDeReinaN + i * 7}`;
          let reinaOpt2 = `casillero${casillaDeReinaN + i * -7}`;
          let reinaOpt3 = `casillero${casillaDeReinaN + i * 9}`;
          let reinaOpt4 = `casillero${casillaDeReinaN + i * -9}`;
          let arrayDePosiblesReina = [
            reinaOpt1,
            reinaOpt2,
            reinaOpt3,
            reinaOpt4,
          ];
          if (cortarDiagonal1.length >= 1) {
            arrayDePosiblesReina.splice(0, 1);
            arrayDePosiblesReina.splice(0, 0, casillaOrig);
          }
          if (cortarDiagonal2.length >= 1) {
            arrayDePosiblesReina.splice(1, 1);
            arrayDePosiblesReina.splice(1, 0, casillaOrig);
          }
          if (cortarDiagonal3.length >= 1) {
            arrayDePosiblesReina.splice(2, 1);
            arrayDePosiblesReina.splice(2, 0, casillaOrig);
          }
          if (cortarDiagonal4.length >= 1) {
            arrayDePosiblesReina.splice(3, 1);
            arrayDePosiblesReina.splice(3, 0, casillaOrig);
          }

          arrayDePosiblesReina.forEach((opt) => {
            let numero1 = opt.slice(9);
            let numero = parseFloat(numero1);
            if (opt.includes("-") || numero > 64 || numero === 0) {
              // console.log("");
            } else {
              let test = document.getElementById(opt);
              if (test.hasChildNodes()) {
                let posicion = arrayDePosiblesReina.indexOf(opt);
                if (posicion === 0) {
                  cortarDiagonal1.push("");
                }
                if (posicion === 1) {
                  cortarDiagonal2.push("");
                }
                if (posicion === 2) {
                  cortarDiagonal3.push("");
                }
                if (posicion === 3) {
                  cortarDiagonal4.push("");
                }
              }
            }
          });
          arrayDePosiblesReina.forEach((posibilidad) => {
            if (
              casillaDest === posibilidad &&
              casillaOrig != casillaDest &&
              count < 1
            ) {
              let derechoOReves = arrayDePosiblesReina.slice();

              if (casOritInt > casDestItn) {
                derechoOReves.reverse();
              } //dar vuelta el resultado para convalidar en orden
              let countOrigen = 0;
              derechoOReves.forEach((element) => {
                if (element != casillaDest && countFin === 0) {
                  countOrigen++;
                } else if (element === casillaDest) {
                  countFin++;
                }
              });
              for (let i = countOrigen; i > 0; i--) {
                derechoOReves.shift();
              }
              derechoOReves.forEach((ele) => {
                let numero1 = ele.slice(9);
                let numero = parseFloat(numero1);
                if (ele.includes("-") || numero > 64 || numero === 0) {
                  // console.log("");
                } else {
                  let eleInLet = document.getElementById(ele);

                  if (eleInLet.hasChildNodes()) {
                    if (
                      byn === true &&
                      compFinByn === false &&
                      ele === casillaDest &&
                      tieneNoTiene === 0
                    ) {
                      if (modoPrueba === true) {
                        amenazaARey++;
                        tieneNoTiene++;
                      } else {
                        count++;
                        kickImgBoardPrev(eliminarHijoNativo);
                        comerPieza(comerPiezaDest);
                        crearImagen(destino, "." + corregirURL);
                      }
                    } else if (
                      byn === false &&
                      compFinByn === true &&
                      ele === casillaDest &&
                      tieneNoTiene === 0
                    ) {
                      if (modoPrueba === true) {
                        amenazaARey++;
                        tieneNoTiene++;
                      } else {
                        count++;
                        kickImgBoardPrev(eliminarHijoNativo);
                        comerPieza(comerPiezaDest);
                        crearImagen(destino, "." + corregirURL);
                      }
                    } else if (
                      modoPrueba === true &&
                      byn === true &&
                      compFinByn === true &&
                      tieneNoTiene === 0 &&
                      casillaDest === ele
                    ) {
                      amenazaARey++;
                      tieneNoTiene++;
                    } else if (
                      modoPrueba === true &&
                      byn === false &&
                      compFinByn === false &&
                      tieneNoTiene === 0 &&
                      casillaDest === ele
                    ) {
                      amenazaARey++;
                      tieneNoTiene++;
                    } else {
                      tieneNoTiene++;
                    }
                  } else {
                    if (ele === casillaDest && tieneNoTiene === 0) {
                      if (modoPrueba === true) {
                        amenazaARey++;
                        tieneNoTiene++;
                      } else {
                        count++;
                        kickImgBoardPrev(eliminarHijoNativo);
                        comerPieza(comerPiezaDest);
                        crearImagen(destino, "." + corregirURL);
                      }
                    }
                  }
                }
              });
            }
          });
        } // cierre del for ---> de diagonal.
        columna.forEach((column1a8) => {
          column1a8.forEach((element) => {
            if (element === casillaDest) {
              posibilidad1 = column1a8;
            }
          });
        });
        row.forEach((row1a8) => {
          row1a8.forEach((element) => {
            if (element === casillaDest) {
              posibilidad2 = row1a8;
            }
          });
        });
        posibilidad1.forEach((posibilidad) => {
          if (
            casillaOrig === posibilidad &&
            casillaOrig != casillaDest &&
            count < 1
          ) {
            let derechoOReves = posibilidad1.slice();

            if (casOritInt > casDestItn) {
              derechoOReves.reverse();
            } //dar vuelta el resultado para convalidar en orden
            let countOrigen = 1;
            derechoOReves.forEach((element) => {
              if (element != casillaOrig && countFin === 0) {
                countOrigen++;
              } else if (element === casillaOrig) {
                countFin++;
              }
            });
            for (let i = countOrigen; i > 0; i--) {
              derechoOReves.shift();
            }
            derechoOReves.forEach((ele) => {
              let eleInLet = document.getElementById(ele);
              if (eleInLet.hasChildNodes()) {
                if (
                  byn === true &&
                  compFinByn === false &&
                  ele === casillaDest &&
                  tieneNoTiene === 0
                ) {
                  if (modoPrueba === true) {
                    amenazaARey++;
                    tieneNoTiene++;
                  } else {
                    count++;
                    kickImgBoardPrev(eliminarHijoNativo);
                    comerPieza(comerPiezaDest);
                    crearImagen(destino, "." + corregirURL);
                  }
                } else if (
                  byn === false &&
                  compFinByn === true &&
                  ele === casillaDest &&
                  tieneNoTiene === 0
                ) {
                  if (modoPrueba === true) {
                    amenazaARey++;
                    tieneNoTiene++;
                  } else {
                    count++;
                    kickImgBoardPrev(eliminarHijoNativo);
                    comerPieza(comerPiezaDest);
                    crearImagen(destino, "." + corregirURL);
                  }
                } else if (
                  modoPrueba === true &&
                  byn === true &&
                  compFinByn === true &&
                  tieneNoTiene === 0 &&
                  casillaDest === ele
                ) {
                  amenazaARey++;
                  tieneNoTiene++;
                } else if (
                  modoPrueba === true &&
                  byn === false &&
                  compFinByn === false &&
                  tieneNoTiene === 0 &&
                  casillaDest === ele
                ) {
                  amenazaARey++;
                  tieneNoTiene++;
                } else {
                  tieneNoTiene++;
                }
              } else {
                if (ele === casillaDest && tieneNoTiene === 0) {
                  if (modoPrueba === true) {
                    amenazaARey++;
                    tieneNoTiene++;
                  } else {
                    count++;
                    kickImgBoardPrev(eliminarHijoNativo);
                    comerPieza(comerPiezaDest);
                    crearImagen(destino, "." + corregirURL);
                  }
                }
              }
            });
          }
        });
        posibilidad2.forEach((posibilidad) => {
          if (
            casillaOrig === posibilidad &&
            casillaOrig != casillaDest &&
            count < 1
          ) {
            let derechoOReves = posibilidad2.slice();

            if (casOritInt > casDestItn) {
              derechoOReves.reverse();
            } //dar vuelta el resultado para convalidar en orden
            let countOrigen = 1;
            derechoOReves.forEach((element) => {
              if (element != casillaOrig && countFin === 0) {
                countOrigen++;
              } else if (element === casillaOrig) {
                countFin++;
              }
            });
            for (let i = countOrigen; i > 0; i--) {
              derechoOReves.shift();
            }
            derechoOReves.forEach((ele) => {
              let eleInLet = document.getElementById(ele);
              if (eleInLet.hasChildNodes()) {
                if (
                  byn === true &&
                  compFinByn === false &&
                  ele === casillaDest &&
                  tieneNoTiene === 0
                ) {
                  if (modoPrueba === true) {
                    amenazaARey++;
                    tieneNoTiene++;
                  } else {
                    count++;
                    kickImgBoardPrev(eliminarHijoNativo);
                    comerPieza(comerPiezaDest);
                    crearImagen(destino, "." + corregirURL);
                  }
                } else if (
                  byn === false &&
                  compFinByn === true &&
                  ele === casillaDest &&
                  tieneNoTiene === 0
                ) {
                  if (modoPrueba === true) {
                    amenazaARey++;
                    tieneNoTiene++;
                  } else {
                    count++;
                    kickImgBoardPrev(eliminarHijoNativo);
                    comerPieza(comerPiezaDest);
                    crearImagen(destino, "." + corregirURL);
                  }
                } else if (
                  modoPrueba === true &&
                  byn === true &&
                  compFinByn === true &&
                  tieneNoTiene === 0 &&
                  casillaDest === ele
                ) {
                  amenazaARey++;
                  tieneNoTiene++;
                } else if (
                  modoPrueba === true &&
                  byn === false &&
                  compFinByn === false &&
                  tieneNoTiene === 0 &&
                  casillaDest === ele
                ) {
                  amenazaARey++;
                  tieneNoTiene++;
                } else {
                  tieneNoTiene++;
                }
              } else {
                if (ele === casillaDest && tieneNoTiene === 0) {
                  if (modoPrueba === true) {
                    amenazaARey++;
                    tieneNoTiene++;
                  } else {
                    count++;
                    kickImgBoardPrev(eliminarHijoNativo);
                    comerPieza(comerPiezaDest);
                    crearImagen(destino, "." + corregirURL);
                  }
                }
              }
            });
          }
        });
      }
      /*
       *
       *
       *
       */
      if (comparacion05 === "torre") {
        columna.forEach((column1a8) => {
          column1a8.forEach((element) => {
            if (element === casillaDest) {
              posibilidad1 = column1a8;
            }
          });
        });
        row.forEach((row1a8) => {
          row1a8.forEach((element) => {
            if (element === casillaDest) {
              posibilidad2 = row1a8;
            }
          });
        });

        posibilidad1.forEach((posibilidad) => {
          if (
            casillaOrig === posibilidad &&
            casillaOrig != casillaDest &&
            count < 1
          ) {
            let derechoOReves = posibilidad1.slice();

            if (casOritInt > casDestItn) {
              derechoOReves.reverse();
            } //dar vuelta el resultado para convalidar en orden
            let countOrigen = 1;
            derechoOReves.forEach((element) => {
              if (element != casillaOrig && countFin === 0) {
                countOrigen++;
              } else if (element === casillaOrig) {
                countFin++;
              }
            });
            for (let i = countOrigen; i > 0; i--) {
              derechoOReves.shift();
            }
            derechoOReves.forEach((ele) => {
              let eleInLet = document.getElementById(ele);
              if (eleInLet.hasChildNodes()) {
                if (
                  byn === true &&
                  compFinByn === false &&
                  ele === casillaDest &&
                  tieneNoTiene === 0
                ) {
                  if (modoPrueba === true) {
                    amenazaARey++;
                    tieneNoTiene++;
                  } else {
                    count++;
                    kickImgBoardPrev(eliminarHijoNativo);
                    comerPieza(comerPiezaDest);
                    crearImagen(destino, "." + corregirURL);
                    torreisTrue(casillaOrig);
                  }
                } else if (
                  byn === false &&
                  compFinByn === true &&
                  ele === casillaDest &&
                  tieneNoTiene === 0
                ) {
                  if (modoPrueba === true) {
                    amenazaARey++;
                    tieneNoTiene++;
                  } else {
                    count++;
                    kickImgBoardPrev(eliminarHijoNativo);
                    comerPieza(comerPiezaDest);
                    crearImagen(destino, "." + corregirURL);
                    torreisTrue(casillaOrig);
                  }
                } else if (
                  modoPrueba === true &&
                  byn === true &&
                  compFinByn === true &&
                  tieneNoTiene === 0 &&
                  casillaDest === ele
                ) {
                  amenazaARey++;
                  tieneNoTiene++;
                } else if (
                  modoPrueba === true &&
                  byn === false &&
                  compFinByn === false &&
                  tieneNoTiene === 0 &&
                  casillaDest === ele
                ) {
                  amenazaARey++;
                  tieneNoTiene++;
                } else {
                  tieneNoTiene++;
                }
              } else {
                if (ele === casillaDest && tieneNoTiene === 0) {
                  if (modoPrueba === true) {
                    amenazaARey++;
                    tieneNoTiene++;
                  } else {
                    count++;
                    kickImgBoardPrev(eliminarHijoNativo);
                    comerPieza(comerPiezaDest);
                    crearImagen(destino, "." + corregirURL);
                    torreisTrue(casillaOrig);
                  }
                }
              }
            });
          }
        });
        posibilidad2.forEach((posibilidad) => {
          if (
            casillaOrig === posibilidad &&
            casillaOrig != casillaDest &&
            count < 1
          ) {
            let derechoOReves = posibilidad2.slice();

            if (casOritInt > casDestItn) {
              derechoOReves.reverse();
            } //dar vuelta el resultado para convalidar en orden
            let countOrigen = 1;
            derechoOReves.forEach((element) => {
              if (element != casillaOrig && countFin === 0) {
                countOrigen++;
              } else if (element === casillaOrig) {
                countFin++;
              }
            });
            for (let i = countOrigen; i > 0; i--) {
              derechoOReves.shift();
            }
            derechoOReves.forEach((ele) => {
              let eleInLet = document.getElementById(ele);
              if (eleInLet.hasChildNodes()) {
                if (
                  byn === true &&
                  compFinByn === false &&
                  ele === casillaDest &&
                  tieneNoTiene === 0
                ) {
                  if (modoPrueba === true) {
                    amenazaARey++;
                    tieneNoTiene++;
                  } else {
                    count++;
                    kickImgBoardPrev(eliminarHijoNativo);
                    comerPieza(comerPiezaDest);
                    crearImagen(destino, "." + corregirURL);
                    torreisTrue(casillaOrig);
                  }
                } else if (
                  byn === false &&
                  compFinByn === true &&
                  ele === casillaDest &&
                  tieneNoTiene === 0
                ) {
                  if (modoPrueba === true) {
                    amenazaARey++;
                    tieneNoTiene++;
                  } else {
                    count++;
                    kickImgBoardPrev(eliminarHijoNativo);
                    comerPieza(comerPiezaDest);
                    crearImagen(destino, "." + corregirURL);
                    torreisTrue(casillaOrig);
                  }
                } else if (
                  modoPrueba === true &&
                  byn === true &&
                  compFinByn === true &&
                  tieneNoTiene === 0 &&
                  casillaDest === ele
                ) {
                  amenazaARey++;
                  tieneNoTiene++;
                } else if (
                  modoPrueba === true &&
                  byn === false &&
                  compFinByn === false &&
                  tieneNoTiene === 0 &&
                  casillaDest === ele
                ) {
                  amenazaARey++;
                  tieneNoTiene++;
                } else {
                  tieneNoTiene++;
                }
              } else {
                if (ele === casillaDest && tieneNoTiene === 0) {
                  if (modoPrueba === true) {
                    amenazaARey++;
                    tieneNoTiene++;
                  } else {
                    count++;
                    kickImgBoardPrev(eliminarHijoNativo);
                    comerPieza(comerPiezaDest);
                    crearImagen(destino, "." + corregirURL);
                    torreisTrue(casillaOrig);
                  }
                }
              }
            });
          }
        });
      }
      /*
       *
       *
       *
       */
    }
  });
  tieneNoTiene = 0;
  casOritInt = 0;
  casDestItn = 0;
  countFin = 0;
  count = 0;
  cortarDiagonal1 = [];
  cortarDiagonal2 = [];
  cortarDiagonal3 = [];
  cortarDiagonal4 = [];
};

const kickImgBoardPrev = function (saliente) {
  saliente.removeChild(saliente.firstChild);
};
const comerPieza = function (piezaComida) {
  if (piezaComida.hasChildNodes()) {
    //acá comienzan las declaraciones de qué piezas se pueden comer.
    piezaComida.removeChild(piezaComida.firstChild);
  }
};

function iniciarJuego() {
  updateTable();
  casillas = f.obtenerCasillas();

  casillas.forEach((element) => {
    // console.log(element.numeroDeCasilla);

    let numCasilla = element.numeroDeCasilla.id.slice(9);

    if (numCasilla === "1") {
      crearImagen(element.numeroDeCasilla.id, imagenes.torreBlanca);
    } else if (numCasilla === "2") {
      crearImagen(element.numeroDeCasilla.id, imagenes.caballoBlanco);
    } else if (numCasilla === "3") {
      crearImagen(element.numeroDeCasilla.id, imagenes.alfilBlanco);
    } else if (numCasilla === "4") {
      crearImagen(element.numeroDeCasilla.id, imagenes.reinaBlanca);
    } else if (numCasilla === "5") {
      crearImagen(element.numeroDeCasilla.id, imagenes.reyBlanco);
    } else if (numCasilla === "6") {
      crearImagen(element.numeroDeCasilla.id, imagenes.alfilBlanco);
    } else if (numCasilla === "7") {
      crearImagen(element.numeroDeCasilla.id, imagenes.caballoBlanco);
    } else if (numCasilla === "8") {
      crearImagen(element.numeroDeCasilla.id, imagenes.torreBlanca);
    } else if (
      numCasilla === "9" ||
      numCasilla === "10" ||
      numCasilla === "11" ||
      numCasilla === "12" ||
      numCasilla === "13" ||
      numCasilla === "14" ||
      numCasilla === "15" ||
      numCasilla === "16"
    ) {
      crearImagen(element.numeroDeCasilla.id, imagenes.peonBlanco1);
    } else if (
      numCasilla === "49" ||
      numCasilla === "50" ||
      numCasilla === "51" ||
      numCasilla === "52" ||
      numCasilla === "53" ||
      numCasilla === "54" ||
      numCasilla === "55" ||
      numCasilla === "56"
    ) {
      crearImagen(element.numeroDeCasilla.id, imagenes.peonNegro1);
    } else if (numCasilla === "58") {
      crearImagen(element.numeroDeCasilla.id, imagenes.caballoNegro);
    } else if (numCasilla === "59") {
      crearImagen(element.numeroDeCasilla.id, imagenes.alfilNegro);
    } else if (numCasilla === "60") {
      crearImagen(element.numeroDeCasilla.id, imagenes.reinaNegra);
    } else if (numCasilla === "61") {
      crearImagen(element.numeroDeCasilla.id, imagenes.reyNegro);
    } else if (numCasilla === "62") {
      crearImagen(element.numeroDeCasilla.id, imagenes.alfilNegro);
    } else if (numCasilla === "63") {
      crearImagen(element.numeroDeCasilla.id, imagenes.caballoNegro);
    } else if (numCasilla === "64") {
      crearImagen(element.numeroDeCasilla.id, imagenes.torreNegra);
    } else if (numCasilla === "57") {
      crearImagen(element.numeroDeCasilla.id, imagenes.torreNegra);
    }
  });

  addEvent(casillas);
}

function crearImagen(element, imagen) {
  let creacion = document.createElement(`div`);
  creacion.setAttribute("class", "contenedorDeImagenes");
  creacion.innerHTML = `<img id="${imagen
    .replace("./assets/", "")
    .replace(".png", "")}${element.replace(
    "casillero",
    ""
  )}" class="maximoEspacio" src=${imagen} alt="${imagen
    .replace("./assets/", "")
    .replace(".png", "")}${element.replace("casillero", "")}">`;
  document.getElementById(element).appendChild(creacion);
}

function moverRey(destino, byn) {
  for (let i = 1; i < 65; i++) {
    let probabilidad = document.getElementById(`casillero${i}`);

    if (probabilidad.hasChildNodes() === true) {
      let casilleroID = `casillero${i}`;
      let objDe = probabilidad.firstChild.firstChild;
      let objeDeAmenaza = objDe.id;
      let objDeAmenazaBYN = objeDeAmenaza.includes("Blanc");
      modoPrueba = true;

      if (objDeAmenazaBYN === true && byn === false) {
        modificarJugadas(casilleroID, destino, objeDeAmenaza);
      } else if (objDeAmenazaBYN === false && byn === true) {
        modificarJugadas(casilleroID, destino, objeDeAmenaza);
      }
    }
  }
  modoPrueba = false;
}

function torreisTrue(casilla) {
  if (casilla === "casillero1") {
    torre1 = 1;
  } else if (casilla === "casillero8") {
    torre2 = 1;
  } else if (casilla === "casillero57") {
    torre3 = 1;
  } else if (casilla === "casillero64") {
    torre4 = 1;
  }
}

iniciarJuego();

// function limpiarTablero() { }
// const moverPiezas = () => { };
// function comerPiezas() { }
// function coronarPeonBlanco() { }
// function coronarPeonNegro() { }
// function darJacke() { }
// function enrocar() { }
// function darMate() { }
// function relojJugadores() { }
// function turnero() { }
