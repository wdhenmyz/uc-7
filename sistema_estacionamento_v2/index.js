require("dotenv").config();
const cors = require("cors");
const { PORT } = require("./port");

const http = require("http");
const { registerVehicle, getVehicles } = require("./routes/vehicles"); // Import the register route


const requestHandler = (req, res) => {
    cors()(req, res, () => {
        if (req.method === "POST" && req.url === "/entrada") {
            registerVehicle(req, res); // Chama a função de registro de veículo

        } else if (req.method === "GET" && req.url === "/veiculos") {
            getVehicles(req, res); // Chama a função para obter todos os veículos

        } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Rota não encontrada");
        }
    });
};

http.createServer(requestHandler).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
