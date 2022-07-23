import { functions } from "./let.js";

const f = functions();

let casillas;
const imagenes = f.imagenes;

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

const addEvent = (casillas) => {
  for (let i = 1; i <= casillas.length; i++) {
    let casilla = document.getElementById(`casillero${i}`);

    casilla.addEventListener("mousedown", () => {
      if (casilla.childElementCount == 0) {
        console.log(
          `Casilla N° ${casilla.id.replace("casillero", "")} is Empty`
        );
      } else {
        let tokenContainer = casilla.firstElementChild;
        tokenContainer.classList.toggle("selected");
        
        let token = tokenContainer.firstElementChild;
        document.addEventListener("mousedown", () => {
            tokenContainer.classList.remove("selected");
        });
      }
    });
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
    } else if(numCasilla === "57"){
        crearImagen(element.numeroDeCasilla.id, imagenes.torreNegra);
    }
  });

  addEvent(casillas);
}

function crearImagen(element, imagen) {
  let creacion = document.createElement(`div`);
  creacion.setAttribute("class", "contenedorDeImagenes");
  creacion.innerHTML = `<img class="maximoEspacio" src=${imagen} alt="${imagen
    .replace("./assets/", "")
    .replace(".png", "")}">`;
  document.getElementById(element).appendChild(creacion);
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
// function movimientoTorre() { }
// function movimientoRey() { }
// function movimientoPeon() { }
// function movimientoDama() { }
// function movimientoCaballo() { }
// function movimientoAlfil() { }
// function relojJugadores() { }
// function turnero() { }
