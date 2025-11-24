import format from "pg-format";
import { pool } from "./database/connection.js";

export const prepararHATEOAS = (elementos, limite = 5) => {
  let totalStock = 0
  const total = Array.isArray(elementos) ? elementos.length : 0;
  const results = elementos
    .map((j) => {
      const stock = Number(j.stock) || 0
      totalStock += stock
      return { name: j.nombre, href: `/joyas/joya/${j.id}` };
    })
    .slice(0, limite);

  return { total, totalStock, results };
};

export const obtenerJoyas = async ({ limits = 10, order_by = "id_ASC", page = 0 } = {}) => {
  const offset = page * limits;
  const [campo, direccion] = order_by.split("_");
  const consultaFormateada = format(
    "SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s",
    campo,
    direccion,
    limits,
    offset
  );
  const { rows: joyas } = await pool.query(consultaFormateada);
  return joyas;
};

export const obtenerJoyasPorFiltros = async ({
  precio_min,
  precio_max,
  categoria,
  metal
}) => {
  let filtros = []
  let values = []
  let contador = 1

  if (precio_min) {
    filtros.push(`precio >= $${contador++}`)
    values.push(precio_min)
  }

  if (precio_max) {
    filtros.push(`precio <= $${contador++}`)
    values.push(precio_max)
  }

  if (categoria) {
    filtros.push(`categoria = $${contador++}`)
    values.push(categoria)
  }

  if (metal) {
    filtros.push(`metal = $${contador++}`)
    values.push(metal)
  }

  let consulta = "SELECT * FROM inventario"

  if (filtros.length > 0) {
    consulta += " WHERE " + filtros.join(" AND ")
  }

  const { rows } = await pool.query(consulta, values)

  return rows
}

