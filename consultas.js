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
