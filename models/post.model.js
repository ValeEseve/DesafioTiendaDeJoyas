import { pool } from "../database/connection.js";

export const encontrarTodos = async () => {
  console.log("Model: ejecutar SELECT * FROM inventario");
  const { rows } = await pool.query("SELECT * FROM inventario");
  console.log("Model: filas obtenidas:", rows.length);
  return rows;
};

