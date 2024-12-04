const express = require('express');
// Criação do roteador do Express
const router = express.Router();
const cors = require('cors');

// Referência à coleção Firestore
const { db } = require('../config/conection');
const saidaRef = db.collection('saida'); // Certifique-se de que a coleção existe no Firestore

// Middleware para permitir cross-origin requests
router.use(cors({
  origin: 'http://127.0.0.1:5500' // Apenas essa origem pode acessar
}));

// Rota para apagar todos os documentos da coleção `saida`
router.delete('/api/saida', async (req, res) => {

    try {
        const snapshot = await saidaRef.get();;

        if (snapshot.empty) {
            return res.status(200).json({ message: 'Nenhum documento encontrado na coleção "saida".' });
        }

        // Deleta cada documento na coleção
        const deletePromises = snapshot.docs.map(doc => doc.ref.delete());
        await Promise.all(deletePromises);

        res.status(200).json({ message: 'Todos os documentos da coleção "saida" foram apagados com sucesso.' });
    } catch (error) {
        console.error("Erro ao apagar documentos da coleção 'saida':", error);
        res.status(500).json({ error: 'Erro ao apagar documentos da coleção "saida".' });
    }
});

module.exports = router;