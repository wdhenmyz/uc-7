import { saida } from "./registrarSaida.js";
import { tabela } from "../components/carregar_tabela.js";

async function carregar() {
    try {
        const response = await fetch('http://localhost:3000/api/entrada'); // URL completa do endpoint
        if (!response.ok) {
            throw new Error("Erro ao buscar dados dos veículos");
        }
  
        const vehicles = await response.json();
  
        vehicles.forEach(vehicle => { tabela(vehicle) });
  
        
  
  
        // Adiciona event listeners para os botões de exclusão
        document.querySelectorAll('.saida-button').forEach(button => {
            button.addEventListener('click', async (e) => {
                const vehicleId = e.target.getAttribute('data-id');
                await saida(vehicleId);
                e.target.parentElement.parentElement.remove();
            });
        });
  
    } catch (error) {
        console.error("Erro ao carregar os veículos:", error);
    }
}

export { carregar };