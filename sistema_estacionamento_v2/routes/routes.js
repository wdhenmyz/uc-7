// routes.js
import express from "express";
import { addVehicle, getVehicle, getAllVehicles } from "../config/vehicles.js";

const router = express.Router();

// Rota para registrar a entrada de um veículo
router.post("/entrada", async (req, res) => {
  const { placa, dono, tipo } = req.body;
  const vehicleID = placa; // Usando a placa como ID único do veículo
  const vehicleData = {
    placa,
    dono,
    tipo,
    entrada: new Date().toISOString(), // Hora de entrada
    saida: null, // Ainda não há hora de saída
    valor: 0, // Valor inicial como 0
  };

  try {
    await addVehicle(vehicleID, vehicleData);  // Adiciona o veículo ao banco de dados
    // Envia a resposta de sucesso
    res.status(200).json({ message: "Veículo registrado com sucesso!", placa, dono, tipo });
  } catch (error) {
    // Envia a resposta de erro
    res.status(500).json({ message: "Erro ao registrar veículo", error: error.message });
  }
});


// Rota para obter um veículo específico pelo ID
router.get("/veiculo/:id", async (req, res) => {
  const vehicleID = req.params.id;
  try {
    const vehicleData = await getVehicle(vehicleID);
    if (vehicleData) {
      res.status(200).json(vehicleData);
    } else {
      res.status(404).send("Veículo não encontrado");
    }
  } catch (error) {
    res.status(500).send("Erro ao obter veículo: " + error.message);
  }
});

// Rota para obter todos os veículos
router.get("/veiculos", async (req, res) => {
  try {
    const allVehicles = await getAllVehicles();
    res.status(200).json(allVehicles);
  } catch (error) {
    res.status(500).send("Erro ao obter todos os veículos: " + error.message);
  }
});

export default router;
