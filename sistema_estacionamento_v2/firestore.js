const express = require('express');
const app = express();

// Importa as rotas
const routesEntrada = require('./config/routes');

// Usar as rotas no app
app.use(routesEntrada);
//app.use(routesSaida);

// Define a porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
