// index.js
import express from "express";
import routes from "./routes/routes.js"; // Importando o arquivo de rotas
import { PORT as port } from "./port.js";

const app = express();

// Configura o servidor para lidar com JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Necessário para capturar dados do formulário

import cors from "cors";
app.use(cors({
  origin: 'http://localhost:3000'  // Substitua pela URL do seu frontend
}));

// Usando as rotas importadas
app.use("/", routes); // Aplique as rotas no caminho base

// Configura o servidor para escutar em uma porta específica
const PORT = port || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
