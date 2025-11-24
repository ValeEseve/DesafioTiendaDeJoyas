import {pool} from '../database/connection.js'

export const encontrarTodos = async () => {
  const { rows } = await pool.query("SELECT * FROM joyas");
  return rows;
};