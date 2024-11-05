require("dotenv").config();
const cors = require("cors");

const http = require("http");
const { registerVehicle } = require("./routes/vehicles"); // Import the register route
const { PORT } = require("./port");

const requestHandler = (req, res) => {
    cors()(req, res, () => {
        if (req.method === "POST" && req.url === "/entrada") {
        registerVehicle(req, res); // Chama a função de registro de veículo

        } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Rota não encontrada");
        }
    });
};

http.createServer(requestHandler).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
