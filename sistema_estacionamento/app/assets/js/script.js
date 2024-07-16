// Função para carregar dados do localStorage
function loadFromLocalStorage() {
    const data = localStorage.getItem('parkingData');
    return data ? JSON.parse(data) : [];
}

// Função para salvar dados no localStorage
function saveToLocalStorage(data) {
    localStorage.setItem('parkingData', JSON.stringify(data));
}

let availableSpotsCount = 100; // Total number of parking spots

//função para adicionar uma linha na tabela
async function addRowToTable(plate, tipo, owner, entryTime, exitTime, value) {
    const tableBody = document.getElementById('parkingTableBody');
    const row = document.createElement('tr');

    // Células para a placa e o proprietário
    const plateCell = document.createElement('td');
    plateCell.textContent = plate;
    row.appendChild(plateCell);

    const tipoCell = document.createElement('td');
    tipoCell.textContent = tipo;
    row.appendChild(tipoCell);

    const ownerCell = document.createElement('td');
    ownerCell.textContent = owner;
    row.appendChild(ownerCell);

    // Células para a hora de entrada e saída
    const entryTimeCell = document.createElement('td');
    entryTimeCell.textContent = new Date(entryTime).toLocaleString();
    row.appendChild(entryTimeCell);

    const exitTimeCell = document.createElement('td');
    exitTimeCell.textContent = exitTime ? new Date(exitTime).toLocaleString() : '';
    row.appendChild(exitTimeCell);

    // Célula para o valor a pagar
    const valueCell = document.createElement('td');
    valueCell.textContent = value ? 'R$ ' + value.toFixed(2) : '';
    row.appendChild(valueCell);

    // Célula para o botão de registrar saída
    const actionsCell = document.createElement('td');
    const exitButton = document.createElement('button');
    exitButton.textContent = 'Registrar Saída';

   // Função para atualizar a taxa com base no tipo do veículo
   function updateRate(tipo) {
        if (tipo == 'carro') {
            return 2;
        } else if (tipo == 'moto') {
            return 3;
        } else {
            return 0;
        }
    }

    const valor = updateRate(tipo); // Chama updateRate para definir a taxa inicial
    console.log('Taxa calculada:', valor);
    

    if (exitTime) {
        exitButton.disabled = true;
    } else {
        exitButton.addEventListener('click', function() {
            const exitTime = new Date();
            const diffInMs = exitTime - new Date(entryTime);
            const diffInHours = Math.ceil(diffInMs / (1000 * 60 * 60));
            const value = diffInHours * valor;

            exitTimeCell.textContent = exitTime.toLocaleString();
            valueCell.textContent = 'R$ ' + value.toFixed(2);
            exitButton.disabled = true;

            // Atualiza os dados no localStorage
            const data = loadFromLocalStorage();
            const vehicleIndex = data.findIndex(v => v.plate === plate && v.entryTime === entryTime);
            if (vehicleIndex !== -1) {
                data.splice(vehicleIndex, 1);
                saveToLocalStorage(data);
            }

            // Cria o botão "Pagar"
            const payButton = document.createElement('button');
            payButton.textContent = 'Pagar';
            actionsCell.appendChild(payButton);

            payButton.addEventListener('click', function() {
                // Remove a linha da tabela
                row.remove();

                // Atualiza a quantidade de vagas disponíveis
                availableSpotsCount++;
                const availableSpots = document.getElementById('availableSpots');
                availableSpots.textContent = `Vagas Disponíveis: ${availableSpotsCount}`;
            });
        });
    }

    actionsCell.appendChild(exitButton);
    row.appendChild(actionsCell);

    // Adiciona a linha à tabela
    tableBody.appendChild(row);

    // Atualiza a quantidade de vagas disponíveis
    const availableSpots = document.getElementById('availableSpots');
    const occupiedSpots = tableBody.querySelectorAll('tr').length;
    availableSpotsCount = 100 - occupiedSpots;
    availableSpots.textContent = `Vagas Disponíveis: ${availableSpotsCount}`;
}

// Carrega dados do localStorage e adiciona à tabela ao carregar a página
window.addEventListener('load', function() {
    const data = loadFromLocalStorage();
    data.forEach(vehicle => {
        addRowToTable(vehicle.plate, vehicle.tipo, vehicle.owner, vehicle.entryTime, vehicle.exitTime, vehicle.value);
    });
});

// Lida com o envio do formulário
document.getElementById('parkingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const plate = document.getElementById('plate').value;
    const tipo = document.getElementById('tipo').value;
    const owner = document.getElementById('owner').value;
    const entryTime = new Date().toISOString();
    
    addRowToTable(plate, owner, tipo, entryTime, null, null);

    // Salva os dados no localStorage
    const data = loadFromLocalStorage();
    data.push({ plate, tipo, owner, entryTime });
    saveToLocalStorage(data);
    
    document.getElementById('parkingForm').reset();
});