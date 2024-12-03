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

// rota para deletar um veículo
router.delete('/api/entrada/:id', async (req, res) => {
  try {
    const { id } = req.params; // Obtem o ID do veículo da URL
    const doc = await vehiclesRef.doc(id).get(); // Busca o documento no Firestore
    if (!doc.exists) {
      return res.status(404).json({ error: 'Veículo nao encontrado' });
    }
    await doc.ref.delete(); // Apaga o documento do Firestore
    res.json({ message: 'Veiculo deletado com sucesso' });
  } catch (error) {
    console.error("Erro ao deletar veiculo:", error);
    res.status(500).json({ error: 'Falha ao deletar veiculo' });
  }
});

module.exports = router;