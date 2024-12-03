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

router.get('/api/entrada', async (req, res) => {
    const { placa, dono, tipo } = req.query;  // Captura os parâmetros de consulta
  
    try {
      // Inicializando a consulta à coleção 'veiculos'
      let query = vehiclesRef;  // Referência à coleção 'veiculos'
  
      // Condicional para aplicar filtros com base nos parâmetros recebidos
      if (placa) query = query.where('placa', '==', placa);
      if (dono) query = query.where('dono', '==', dono);
      if (tipo) query = query.where('tipo', '==', tipo);
  
      // Executando a consulta
      const snapshot = await query.get();
      
      if (snapshot.empty) {
        return res.status(404).json({ message: 'Nenhum veículo encontrado' });
      }
  
      // Mapear os documentos para um array
      const vehicles = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      // Enviar a resposta com os veículos encontrados
      res.json(vehicles);
    } catch (error) {
      console.error("Erro ao buscar os veículos:", error);
      res.status(500).json({ error: "Erro ao buscar os veículos" });
    }
  });
  
  module.exports = router;