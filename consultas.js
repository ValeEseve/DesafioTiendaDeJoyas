import format from "pg-format"
import { pool } from "./database/connection.js"

export const obtenerJoyas = async ({limits = 10, order_by = "id_ASC", page = 0}) => {
    const offset = page * limits
    const [campo, direccion] = order_by.split("_")
    const consultaFormateada = format(`SELECT * FROM joyas ORDER BY %s %s LIMIT %s`, campo, direccion, limits)
    const {rows: joyas} = await pool.query(consultaFormateada)
    return joyas
}