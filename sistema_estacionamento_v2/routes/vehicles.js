const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);

// Function to handle registering a vehicle
const registerVehicle = async (req, res) => {
  let body = "";
  req.on("data", chunk => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    const formData = new URLSearchParams(body);
    const plate = formData.get("plate");
    const owner = formData.get("owner");
    const type = formData.get("value-radio");

    try {
      await sql`
        INSERT INTO Veiculos (placa, tipo, proprietario)
        VALUES (${plate}, ${type}, ${owner})
      `;

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Veículo registrado com sucesso.");
    } catch (error) {
      console.error(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Erro ao registrar o veículo.");
    }
  });
};

module.exports = { registerVehicle };
