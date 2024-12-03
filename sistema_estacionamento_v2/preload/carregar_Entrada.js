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

// Route para pegar todos os veículos
router.get('/api/entrada', async (req, res) => {
  try {
      const snapshot = await vehiclesRef.get();
      const vehicles = [];

      snapshot.forEach(doc => {
          vehicles.push({ id: doc.id, ...doc.data() });
      });

      res.status(200).json(vehicles);
  } catch (error) {
      console.error("Erro ao buscar dados dos veículos:", error);
      res.status(500).json({ error: 'Falha ao buscar dados dos veículos' });
  }
});

module.exports = router;