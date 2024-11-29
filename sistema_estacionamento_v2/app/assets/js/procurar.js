import { procurar } from '../APIs/procurar_Veiculos.js';
import { carregar } from '../APIs/carregarEntrada.js';

// carregar todos os veículos na tabela
document.addEventListener('DOMContentLoaded', async () => {
  await carregar();
});


document.getElementById('vehicleForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  // Pegando os valores dos campos do formulário
  const placa = document.getElementById('plate').value;
  const dono = document.getElementById('owner').value;
  const tipo = document.querySelector('input[name="value-radio"]:checked')?.value;

  // Montando a query dinâmica
  const query = [];

  if (placa) query.push(`placa=${encodeURIComponent(placa)}`);
  if (dono) query.push(`dono=${encodeURIComponent(dono)}`);
  if (tipo) query.push(`tipo=${encodeURIComponent(tipo)}`);

  // Construindo a URL com base nos campos preenchidos
  const queryString = query.length ? '?' + query.join('&') : '';

  procurar(queryString);
});

