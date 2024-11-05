const { neon } = require("@neondatabase/serverless");
const { sql } = neon(process.env.DATABASE_URL);

const registerVehicle = async (req, res) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString(); // Concatena os dados recebidos
    });

    req.on('end', async () => {
        const params = new URLSearchParams(body);
        
        const plate = params.get('plate');
        const owner = params.get('owner');
        const type = params.get('value-radio');
        const currentDateTime = new Date();
        const value = calculateValue(type); // Função para calcular o valor baseado no tipo

        // Consulta para inserir os dados na tabela Veiculos
        const insertQuery = `
            INSERT INTO Veiculos (placa, tipo, proprietario, hora_entrada, valor) 
            VALUES ($1, $2, $3, $4, $5)
        `;
        
        try {
            await sql `${insertQuery}`([plate, type, owner, currentDateTime, value]);
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Vehicle registered successfully");
        } catch (error) {
            console.error("Error inserting data: ", error);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Error registering vehicle");
        }
    });
};

// Função para determinar o valor baseado no tipo de veículo
const calculateValue = (type) => {
    switch (type) {
        case 'carro':
            return 4.00; // Exemplo de valor para carro
        case 'moto':
            return 3.00;  // Exemplo de valor para moto
        case 'onibus':
            return 6.00; // Exemplo de valor para ônibus
        case 'caminhonete':
            return 7.00; // Exemplo de valor para caminhonete
        default:
            return 0; // Valor padrão se o tipo não for reconhecido
    }
};

// Função para obter todos os veículos
const getVehicles = async (req, res) => {
    try {
        // Consulta para obter todos os veículos
        const result = await sql`SELECT * FROM Veiculos`;

        // Verifica se existem veículos
        if (result.length === 0) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "No vehicles found." }));
            return;
        }

        // Responde com os dados dos veículos
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
    } catch (error) {
        console.error("Erro ao executar a consulta:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal server error." }));
    }
};


// Exporta as funções
module.exports = { registerVehicle, getVehicles };
