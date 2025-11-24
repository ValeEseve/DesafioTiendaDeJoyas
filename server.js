import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors);
app.use(express.json());

app.listen(PORT, console.log(`Servidor ON! http://localhost:${PORT} `));
