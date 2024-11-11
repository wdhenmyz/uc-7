const express = require('express');
const admin = require('firebase-admin');
const app = express();

// Import your service account key JSON file
var serviceAccount = require("./vaga-rapida-firebase-adminsdk-74g0f-984d2e2197.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vaga-rapida-default-rtdb.firebaseio.com"
});

// Firestore collection reference
const db = admin.firestore();


// Middleware to parse JSON requests
app.use(express.json());

const vehiclesRef = db.collection('veículos');

// Route to add vehicle data
app.post('/api/entrada', async (req, res) => {
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
            valor: 0
        });

        res.status(200).json({ id: docRef.id, message: 'veiculo cadastrado com sucesso' });
    } catch (error) {
        console.error("erro ao cadastrar:", error);
        res.status(500).json({ error: 'Failed to add vehicle data' });
    }
});

// Endpoint GET para buscar todos os veículos
app.get('/api/entrada', async (req, res) => {
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

// Rota GET para buscar um veículo pelo ID
app.get('/api/entrada/:id', async (req, res) => {
    try {
        const { id } = req.params; // Obtém o ID do veículo da URL
        const doc = await vehiclesRef.doc(id).get(); // Busca o documento no Firestore

        if (!doc.exists) {
            return res.status(404).json({ error: 'Veículo não encontrado' });
        }

        // Retorna os dados do veículo encontrado
        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        console.error("Erro ao buscar o veículo:", error);
        res.status(500).json({ error: 'Falha ao buscar o veículo' });
    }
});


app.delete('/api/entrada/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await vehiclesRef.doc(id).delete();
        res.status(200).json({ message: 'Veículo excluído com sucesso' });
    } catch (error) {
        console.error("Erro ao excluir o veículo:", error);
        res.status(500).json({ error: 'Falha ao excluir o veículo' });
    }
});



// Rota POST para mover dados para a coleção 'saida'
app.post('/api/saida', async (req, res) => {
    try {
        const vehicle = req.body;

        // Adiciona os dados na coleção 'saida'
        const docRef = await db.collection('saida').add(vehicle);

        res.status(200).json({ id: docRef.id, message: 'Veículo movido para a coleção "saida"' });
    } catch (error) {
        console.error("Erro ao adicionar o veículo à coleção 'saida':", error);
        res.status(500).json({ error: 'Falha ao mover o veículo para a coleção "saida"' });
    }
});

// Rota GET para buscar todos os veículos da coleção 'saida'
app.get('/api/saida', async (req, res) => {
    try {
        const snapshot = await admin.firestore().collection('saida').get(); // Obtém todos os documentos da coleção 'saida'
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




module.exports = app;
