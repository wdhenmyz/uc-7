const express = require('express');
const app = express();

// Middleware para JSON
app.use(express.json());

// CONFIGURAÇÃO DAS ROTAS 

// pegar todos os usuários
const usuarios = require('../preload/usuários');
app.use(usuarios);

// Configuração da rota para login
const login = require('../preload/login');
app.use(login);

// Endpoint GET para buscar todos os veículos
const entrada = require('../preload/carregar_Entrada');
app.use(entrada);

// Rota GET para buscar todos os veículos da coleção 'saida'
const saida = require('../preload/carregar_Saida');
app.use(saida);


// Rota POST para cadastrar um novo veículo
const cadastrarEntrada = require('../preload/cadastrar_entrada');
app.use(cadastrarEntrada);



/*
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

app.get('/api/entrada', async (req, res) => {
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

// Rota PATCH para registrar a saída do veículo
app.patch('/api/saida/:id', async (req, res) => {
    const vehicleId = req.params.id;
    const { saida } = req.body;
  
    try {
      // Obter o documento do veículo
      const vehicleDoc = await vehiclesRef.doc(vehicleId).get();
      if (!vehicleDoc.exists) {
        return res.status(404).json({ error: "Veículo não encontrado" });
      }
  
      const vehicleData = vehicleDoc.data();
  
      // Calcular o valor da estadia
      const entrada = vehicleData.entrada.toDate(); // Assumindo que 'entrada' está como Timestamp
      const saidaDate = new Date(saida);
      const diffHours = Math.ceil((saidaDate - entrada) / (1000 * 60 * 60));
  
      let valor;
      switch (vehicleData.tipo) {
        case 'carro':
          valor = diffHours * 10; // exemplo: 10 reais por hora para carros
          break;
        case 'moto':
          valor = diffHours * 5; // exemplo: 5 reais por hora para motos
          break;
        case 'caminhao':
          valor = diffHours * 15; // exemplo: 15 reais por hora para caminhões
          break;
        default:
          valor = diffHours * 8; // valor padrão
      }
  
      // Atualizar o documento com a hora de saída e o valor
      await vehiclesRef.doc(vehicleId).update({
        saida: admin.firestore.Timestamp.fromDate(saidaDate),
        valor: valor
      });
  
      res.status(200).json({ message: "Saída registrada com sucesso", valor });
    } catch (error) {
      console.error("Erro ao registrar a saída do veículo:", error);
      res.status(500).json({ error: "Erro ao registrar a saída do veículo" });
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
*/



/*
// Rota para apagar todos os documentos da coleção `saida`
app.delete('/api/saida', async (req, res) => {
    const saidaRef = db.collection('saida');

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
*/

module.exports = app;
