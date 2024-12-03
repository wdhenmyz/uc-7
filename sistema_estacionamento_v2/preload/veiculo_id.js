const express = require('express');
// Criação do roteador do Express
const router = express.Router();
const cors = require('cors');

// Referência à coleção Firestore
const { db } = require('../config/conection');
const vehiclesRef = db.collection('veículos'); // Certifique-se de que a coleção existe no Firestore

// Middleware para permitir cross-origin requests
router.use(cors({
  origin: 'http://127.0.0.1:5500' // Apenas essa origem pode acessar
}));

// Rota GET para buscar um veículo pelo ID
router.get('/api/entrada/:id', async (req, res) => {
  try {
      const { id } = req.params; // Obtém o ID do veículo da URL
      const doc = await vehiclesRef.doc(id).get(); // Busca o documento no Firestore
      const vehicle = doc.data(); // Obtém os dados do veículo
      res.json(vehicle); // Retorna os dados do veículo
  } catch (error) {
      console.error("Erro ao buscar veículo:", error);
      res.status(500).json({ error: 'Falha ao buscar veículo' });
  }
});

module.exports = router;