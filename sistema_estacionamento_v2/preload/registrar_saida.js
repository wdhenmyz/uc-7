const express = require('express');
// Criação do roteador do Express
const router = express.Router();
const cors = require('cors');

// Referência à coleção Firestore
const admin = require('firebase-admin');

// Middleware para permitir cross-origin requests
router.use(cors({
  origin: 'http://127.0.0.1:5500' // Apenas essa origem pode acessar
}));

router.patch('/api/saida/:id', async (req, res) => {
    const vehicleId = req.params.id;
    const { saida } = req.body;
  
    try {
      // Obter o documento do veículo
      const vehicleDoc = await vehiclesRef.doc(vehicleId).get();
      if (!vehicleDoc.exists) {
        return res.status(404).json({ error: "Veículo não encontrado" });
      }
  
      const vehicleData = vehicleDoc.data();
  
      // Calcular o valor da estadia
      const entrada = vehicleData.entrada.toDate(); // Assumindo que 'entrada' está como Timestamp
      const saidaDate = new Date(saida);
      const diffHours = Math.ceil((saidaDate - entrada) / (1000 * 60 * 60));
  
      let valor;
      switch (vehicleData.tipo) {
        case 'carro':
          valor = diffHours * 10; // exemplo: 10 reais por hora para carros
          break;
        case 'moto':
          valor = diffHours * 5; // exemplo: 5 reais por hora para motos
          break;
        case 'caminhao':
          valor = diffHours * 15; // exemplo: 15 reais por hora para caminhões
          break;
        default:
          valor = diffHours * 8; // valor padrão
      }
  
      // Atualizar o documento com a hora de saída e o valor
      await vehiclesRef.doc(vehicleId).update({
        saida: admin.firestore.Timestamp.fromDate(saidaDate),
        valor: valor
      });
  
      res.status(200).json({ message: "Saída registrada com sucesso", valor });
    } catch (error) {
      console.error("Erro ao registrar a saída do veículo:", error);
      res.status(500).json({ error: "Erro ao registrar a saída do veículo" });
    }
  });

  module.exports = router