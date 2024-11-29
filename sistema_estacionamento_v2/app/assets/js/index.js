import { entrada } from '../APIs/entradaDeVeiculos.js';
import { calcularValor } from '../components/calcularValor.js';
import { carregar } from '../APIs/carregarEntrada.js';

document.getElementById('parkingForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the form from submitting the traditional way

  // Get form data
  const placa = document.getElementById('plate').value;
  const dono = document.getElementById('owner').value;
  const tipo = document.querySelector('input[name="value-radio"]:checked').value;
  
  // Calcular o valor do estacionamento com base no tipo de veículo
  const valor = calcularValor(tipo);

  // Create an object for vehicle data
  const vehicleData = {
      placa,
      dono,
      tipo,
      entrada: new Date().toISOString(), // Save entry time as ISO string
      saida: null,                      // Exit time is null initially
      valor                            // Placeholder for the value, to be calculated later
  };

  console.log(vehicleData);

  entrada(vehicleData);
});

// carregar todos os veículos na tabela
document.addEventListener('DOMContentLoaded', async () => {
  await carregar();
});

