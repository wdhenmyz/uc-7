const express = require('express');
// Criação do roteador do Express
const router = express.Router();
const cors = require('cors');

// Referência à coleção Firestore
const { db } = require('../config/conection');
const saida = db.collection('saida'); // Certifique-se de que a coleção existe no Firestore



// Middleware para permitir cross-origin requests
router.use(cors({
  origin: 'http://127.0.0.1:5500' // Apenas essa origem pode acessar
}));

// Route para pegar todos os veículos
router.get('/api/saida', async (req, res) => {
    try {
        const snapshot = await saida.get(); // Obtém todos os documentos da coleção 'saida'
        const vehicles = [];

        snapshot.forEach(doc => {
            vehicles.push({ id: doc.id, ...doc.data() });
        });

        res.status(200).json(vehicles); // Retorna os dados dos veículos
    } catch (error) {
        console.error("Erro ao buscar dados dos veículos na coleção 'saida':", error);
        res.status(500).json({ error: 'Falha ao buscar dados dos veículos na coleção "saida"' });
    }
});

module.exports = router;