import express from "express";
import cors from "cors";
import { prepararHATEOAS } from "./consultas.js";
import { encontrarTodos } from "./models/post.model.js";

console.log("SERVER: arrancando archivo server.js");

const app = express();
const PORT = Number(process.env.SERVER_PORT || 3000);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Server alive ⚡"));

app.listen(PORT, () => {
  console.log(`Servidor ON! http://localhost:${PORT}`);
});

app.get("/joyas", async (req, res) => {
  try {
    const joyas = await encontrarTodos();
    console.log("Resultado:", joyas.length);
    const joyasHATEOAS = prepararHATEOAS( joyas, 6);
    res.json(joyasHATEOAS);
  } catch (error) {
    console.log("Error en la ruta:", error.message || error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});
