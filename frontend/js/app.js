import {
    construirGasto,
    agregarGasto,
    obtenerGastos,
    obtenerGastoPorId,
    actualizarGasto,
    eliminarGasto,
    calcularTotalGastos
} from "./gastos.js";

const formulario = document.querySelector("#form-gasto");
const listaGastos = document.querySelector("#lista-gastos");
const totalGastos = document.querySelector("#total-gastos");
const botonFormulario = formulario.querySelector("button[type='submit']");
const botonCancelarEdicion = document.querySelector("#btn-cancelar-edicion");


let idGastoEditando = null;

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const datosFormulario = obtenerDatosFormulario();

  guardarGasto(datosFormulario);

  restablecerFormulario();

  renderizarGastos();

});

botonCancelarEdicion.addEventListener("click", function () {
  restablecerFormulario();
});


export function obtenerDatosFormulario() {
  const descripcion = document.querySelector("#descripcion").value;
  const cantidad = Number(document.querySelector("#cantidad").value);
  const categoria = document.querySelector("#categoria").value;
  const fecha = document.querySelector("#fecha").value;

  return {
    descripcion: descripcion,
    cantidad: cantidad,
    categoria: categoria,
    fecha: fecha,
  };
}

function cargarGastoEnFormulario(id) {
  const gasto = obtenerGastoPorId(id);

  if (!gasto) {
    return;
  }

  idGastoEditando = id;
  botonFormulario.textContent = "Guardar cambios";
  botonCancelarEdicion.hidden = false;

  document.querySelector("#descripcion").value = gasto.descripcion;
  document.querySelector("#cantidad").value = gasto.cantidad;
  document.querySelector("#categoria").value = gasto.categoria;
  document.querySelector("#fecha").value = gasto.fecha;
}

function restablecerFormulario() {
  idGastoEditando = null;

  formulario.reset();

  botonFormulario.textContent = "Agregar gasto";
  botonCancelarEdicion.hidden = true;
}


function crearElementoGasto(gasto) {
  const item = document.createElement("li");

  item.textContent =
    gasto.descripcion +
    " - $" +
    gasto.cantidad.toFixed(2) +
    " - " +
    gasto.categoria +
    " - " +
    gasto.fecha;

  const botonEditar = document.createElement("button");

  botonEditar.textContent = "Editar";

  botonEditar.addEventListener("click", function () {
    cargarGastoEnFormulario(gasto.id);
  });

  item.appendChild(botonEditar);

  const botonEliminar = document.createElement("button");

  botonEliminar.textContent = "Eliminar";

 botonEliminar.addEventListener("click", function () {
    procesarEliminacion(gasto.id);
});

  item.appendChild(botonEliminar);

  return item;
}

function guardarGasto(datosFormulario) {
  if (idGastoEditando === null) {
    const gasto = construirGasto(datosFormulario);

    agregarGasto(gasto);
  } else {
    actualizarGasto(idGastoEditando, datosFormulario);
  }
}

function actualizarTotal() {
    const total = calcularTotalGastos();

    totalGastos.textContent = "$" + total.toFixed(2);
}

function procesarEliminacion(id) {
    const eliminado = eliminarGasto(id);

    if (!eliminado) {
        return;
    }

    if (idGastoEditando === id) {
        restablecerFormulario();
    }

    renderizarGastos();
}

function renderizarGastos() {
  listaGastos.innerHTML = "";

  const gastos = obtenerGastos();
  gastos.forEach(function (gasto) {
    const item = crearElementoGasto(gasto);

    listaGastos.appendChild(item);
  });

 actualizarTotal();
}
