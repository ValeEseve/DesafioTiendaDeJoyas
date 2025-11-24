import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } = process.env;
const { Pool } = pkg;

export const pool = new Pool({
  host: DB_HOST || "localhost",
  user: DB_USER || "postgres",
  password: DB_PASSWORD || "postgres",
  database: DB_DATABASE || "joyas",
  port: Number(DB_PORT) || 5432,
  allowExitOnIdle: true,
});

const test = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Conectado a Postgres:", res.rows);
  } catch (err) {
    console.log("Error conexión Postgres:", err.message);
  }
};

test();
