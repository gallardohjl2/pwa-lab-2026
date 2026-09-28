export const gastos = [];

export function agregarGasto(gasto) {
    gastos.push(gasto);
}


export function obtenerGastoPorId(id) {
  return gastos.find(function (gasto) {
    return gasto.id === id;
  });
}

export function obtenerGastos() {
    return gastos;
}


export function actualizarGasto(id, datosActualizados) {
  const gasto = obtenerGastoPorId(id);

  if (!gasto) {
    return;
  }

  gasto.descripcion = datosActualizados.descripcion;
  gasto.cantidad = datosActualizados.cantidad;
  gasto.categoria = datosActualizados.categoria;
  gasto.fecha = datosActualizados.fecha;
}

export function eliminarGasto(id) {
  const indice = gastos.findIndex(function (gasto) {
        return gasto.id === id;
    });

    if (indice === -1) {
        return false;
    }

    gastos.splice(indice, 1);

    return true;
}

export function construirGasto(datos) {
  return {
    id: crypto.randomUUID(),
    descripcion: datos.descripcion,
    cantidad: datos.cantidad,
    categoria: datos.categoria,
    fecha: datos.fecha,
  };
}

export function calcularTotalGastos() {
  return gastos.reduce(function (total, gasto) {
    return total + gasto.cantidad;
  }, 0);
}