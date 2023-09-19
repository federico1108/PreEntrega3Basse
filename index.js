const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");
const operacionesArr = [];
const ultimasOperaciones = document.querySelector(".container");
const borrarHistorial = document.querySelector("#historial")

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    botonApretado = boton.textContent;

    if (boton.id === "c") {
      pantalla.textContent = "0";
      return;
    }

    if (boton.id === "borrar") {
      if (
        pantalla.textContent.length === 1 ||
        pantalla.textContent === "Error!"
      ) {
        pantalla.textContent = "0";
      } else {
        pantalla.textContent = pantalla.textContent.slice(0, -1);
      }
      return;
    }

    pantallaAntes = pantalla.textContent;

    if (boton.id === "igual") {
      try {
        pantalla.textContent = eval(pantalla.textContent);
      } catch {
        pantalla.textContent = "Error!";
      }
      ultimaOperacion();
      return;
    }

    if (pantalla.textContent === "0" || pantalla.textContent === "Error!") {
      pantalla.textContent = botonApretado;
    } else {
      pantalla.textContent += botonApretado;
    }
  });
});

borrarHistorial.addEventListener("click",() => {
    ultimasOperaciones.textContent = ""
    localStorage.setItem("operaciones", "")
})

function ultimaOperacion() {
  operacionesArr.push(pantallaAntes + " = " + pantalla.textContent);
  localStorage.setItem("operaciones", JSON.stringify(operacionesArr));
  crearTemplate()
  console.log(localStorage.getItem("Operacion"));
}

document.addEventListener("DOMContentLoaded", () => {
  crearOperaciones();
});

function crearOperaciones() {
  const datos = localStorage.getItem("operaciones");
  if (datos) {
    const datosParseados = JSON.parse(datos);
    datosParseados.forEach((dato) => {
      operacionesArr.push(dato);
    });
    crearTemplate();
  }
}

function crearTemplate() { 
  ultimasOperaciones.innerHTML = "";
  operacionesArr.forEach((dato) => {
    ultimasOperaciones.innerHTML += `
        <div class="contenedor">
        <p> Operacion: ${dato} </p>
        </div>

        `;
  });
}
