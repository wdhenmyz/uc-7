const express = require('express');
// Criação do roteador do Express
const router = express.Router();
const cors = require('cors');

// Referência à coleção Firestore
const { db } = require('../config/conection');

// Middleware para permitir cross-origin requests
router.use(cors({
  origin: 'http://127.0.0.1:5500' // Apenas essa origem pode acessar
}));

router.post('/api/saida', async (req, res) => {
    try {
        const vehicle = req.body;
  
        // Adiciona os dados na coleção 'saida'
        const docRef = await db.collection('saida').add(vehicle);
  
        res.status(200).json({ id: docRef.id, message: 'Veículo movido para a coleção "saida"' });
    } catch (error) {
        console.error("Erro ao adicionar o veículo à coleção 'saida':", error);
        res.status(500).json({ error: 'Falha ao mover o veículo para a coleção "saida"' });
    }
  })

  module.exports = router
