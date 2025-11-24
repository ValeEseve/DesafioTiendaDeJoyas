import express from "express";
import cors from "cors";
import { obtenerJoyas } from "./consultas";
import { encontrarTodos } from "./models/post.model";

const app = express();
const PORT = 3000;

app.use(cors);
app.use(express.json());

app.listen(PORT, console.log(`Servidor ON! http://localhost:${PORT} `));

app.get("/joyas", async (req, res) => {
  try {
    const joyas = await encontrarTodos;
    return res.json(joyas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});
