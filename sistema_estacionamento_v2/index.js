require("dotenv").config();

const http = require("http");
const { registerVehicle } = require("./routes/vehicles"); // Import the register route
const { PORT } = require("./port");

const requestHandler = (req, res) => {
  if (req.method === "POST" && req.url === "/entrada") {
    registerVehicle(req, res);

  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route not found");
  }
};

http.createServer(requestHandler).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
