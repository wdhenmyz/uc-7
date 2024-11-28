import { getVehiclesFromExit } from "../APIs/saidaDeVeiculos.js";
import { enviar } from "../APIs/atualizarPlanilha.js";

// Chama a função para carregar os dados quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    getVehiclesFromExit();
});

document.getElementById('dailyReport').addEventListener('click', async () => {
    enviar();
});
