const express = require('express');
// Criação do roteador do Express
const router = express.Router();
const cors = require('cors');

// Referência à coleção Firestore
const admin = require('firebase-admin');
const { db } = require('../config/conection');
const vehiclesRef = db.collection('veículos'); // Certifique-se de que a coleção existe no Firestore


// Middleware para permitir cross-origin requests
router.use(cors({
  origin: 'http://127.0.0.1:5500' // Apenas essa origem pode acessar
}));

// Route para cadastrar veículos
router.post('/api/entrada', async (req, res) => {
  try {
      const { placa, dono, tipo, entryTime, exitTime, valor } = req.body;

      // Convert entryTime and exitTime to Firebase Timestamps, with fallback to current time if invalid
      const entryTimestamp = entryTime 
          ? admin.firestore.Timestamp.fromDate(new Date(entryTime))
          : admin.firestore.Timestamp.fromDate(new Date()); // default to current time if entryTime is invalid

      const exitTimestamp = exitTime 
          ? admin.firestore.Timestamp.fromDate(new Date(exitTime))
          : null; // keep null if exitTime is not provided

      // Add document to Firestore
      const docRef = await vehiclesRef.add({
          placa,
          dono,
          tipo,
          entrada: entryTimestamp,
          saida: exitTimestamp,
          valor: valor
      });

      res.status(200).json({ id: docRef.id, message: 'veiculo cadastrado com sucesso' });
  } catch (error) {
      console.error("erro ao cadastrar:", error);
      res.status(500).json({ error: 'Failed to add vehicle data' });
  }
});

module.exports = router;