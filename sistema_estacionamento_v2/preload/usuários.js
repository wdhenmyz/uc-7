const express = require('express');
// Criação do roteador do Express
const router = express.Router();
const cors = require('cors');

// Referência à coleção Firestore
const { db } = require('../config/conection');
const usersRef = db.collection('usuário'); // Certifique-se de que a coleção existe no Firestore

// Middleware para permitir cross-origin requests
router.use(cors({
  origin: 'http://127.0.0.1:5500' // Apenas essa origem pode acessar
}));

// Rota de login
router.get('/api/usuarios', async (req, res) => {
  try {
      const snapshot = await usersRef.get();
      const users = [];

      snapshot.forEach(doc => {
        users.push({ id: doc.id, ...doc.data() });
      });

      res.status(200).json(users);
  } catch (error) {
      console.error("Erro ao buscar dados dos usuários:", error);
      res.status(500).json({ error: 'Falha ao buscar dados dos usuários' });
  }
});

module.exports = router;