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
router.get('/api/login', async (req, res) => {
  const { usuario, senha } = req.query; // Captura 'usuario' e 'senha' dos parâmetros de consulta

  try {
    // Fazendo a busca com os parâmetros 'usuario' e 'senha'
    const snapshot = await usersRef
      .where('usuario', '==', usuario)
      .where('senha', '==', senha)
      .get();

    if (snapshot.empty) {
      return res.status(401).json({ error: 'Usuário ou senha incorretos' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Erro ao buscar o usuário:", error);
    res.status(500).json({ error: "Erro ao buscar o usuário" });
  }
});

// Exportando o roteador
module.exports = router;
