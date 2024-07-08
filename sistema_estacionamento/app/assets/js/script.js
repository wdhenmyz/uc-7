/*document.getElementById('parkingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário tradicional
    
    // Obtém os valores dos campos do formulário
    var plate = document.getElementById('plate').value;
    var owner = document.getElementById('owner').value;
    var entryTime = new Date().toISOString(); // Obtém a data e hora atuais em formato ISO
    
    // Obtém a referência ao corpo da tabela
    var tableBody = document.getElementById('parkingTableBody');
    var row = document.createElement('tr'); // Cria uma nova linha na tabela
    
    // Cria e preenche a célula para a placa do veículo
    var plateCell = document.createElement('td');
    plateCell.textContent = plate;
    row.appendChild(plateCell);
    
    // Cria e preenche a célula para o nome do proprietário
    var ownerCell = document.createElement('td');
    ownerCell.textContent = owner;
    row.appendChild(ownerCell);
    
    // Cria e preenche a célula para a hora de entrada
    var entryTimeCell = document.createElement('td');
    entryTimeCell.textContent = new Date(entryTime).toLocaleString();
    row.appendChild(entryTimeCell);
    
    // Cria a célula para a hora de saída (inicialmente vazia)
    var exitTimeCell = document.createElement('td');
    exitTimeCell.textContent = '';
    row.appendChild(exitTimeCell);
    
    // Cria a célula para o valor a pagar (inicialmente vazia)
    var valueCell = document.createElement('td');
    valueCell.textContent = '';
    row.appendChild(valueCell);
    
    // Cria a célula para as ações (botão de registrar saída)
    var actionsCell = document.createElement('td');
    var exitButton = document.createElement('button');
    exitButton.textContent = 'Registrar Saída';
    exitButton.addEventListener('click', function() {
        var exitTime = new Date(); // Registra a hora de saída
        exitTimeCell.textContent = exitTime.toLocaleString();
        
        // Calcula o valor a pagar
        var diffInMs = new Date(exitTime) - new Date(entryTime);
        var diffInHours = Math.ceil(diffInMs / (1000 * 60 * 60)); // Diferença em horas, arredondada para cima
        var value = diffInHours * 2; // Calcula o valor com base na tarifa de R$ 2 por hora
        
        valueCell.textContent = 'R$ ' + value.toFixed(2); // Exibe o valor a pagar
        
        exitButton.disabled = true; // Desabilita o botão após o registro da saída
    });
    actionsCell.appendChild(exitButton);
    row.appendChild(actionsCell);
    
    // Adiciona a nova linha ao corpo da tabela
    tableBody.appendChild(row);
    
    // Reseta os campos do formulário
    document.getElementById('parkingForm').reset();
});*/

// Função para carregar dados do localStorage
function loadFromLocalStorage() {
    const data = localStorage.getItem('parkingData');
    return data ? JSON.parse(data) : [];
}

// Função para salvar dados no localStorage
function saveToLocalStorage(data) {
    localStorage.setItem('parkingData', JSON.stringify(data));
}

// Função para adicionar uma linha na tabela
function addRowToTable(plate, owner, entryTime, exitTime, value) {
    const tableBody = document.getElementById('parkingTableBody');
    const row = document.createElement('tr');
    
    // Células para a placa e o proprietário
    const plateCell = document.createElement('td');
    plateCell.textContent = plate;
    row.appendChild(plateCell);
    
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
    if (exitTime) {
        exitButton.disabled = true;
    } else {
        exitButton.addEventListener('click', function() {
            const exitTime = new Date();
            const diffInMs = new Date(exitTime) - new Date(entryTime);
            const diffInHours = Math.ceil(diffInMs / (1000 * 60 * 60));
            const value = diffInHours * 2;
            
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
        });
    }
    actionsCell.appendChild(exitButton);
    row.appendChild(actionsCell);
    
    // Adiciona a linha à tabela
    tableBody.appendChild(row);
}

// Carrega dados do localStorage e adiciona à tabela ao carregar a página
window.addEventListener('load', function() {
    const data = loadFromLocalStorage();
    data.forEach(vehicle => {
        addRowToTable(vehicle.plate, vehicle.owner, vehicle.entryTime, vehicle.exitTime, vehicle.value);
    });
});

// Lida com o envio do formulário
document.getElementById('parkingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const plate = document.getElementById('plate').value;
    const owner = document.getElementById('owner').value;
    const entryTime = new Date().toISOString();
    
    addRowToTable(plate, owner, entryTime, null, null);

    // Salva os dados no localStorage
    const data = loadFromLocalStorage();
    data.push({ plate, owner, entryTime });
    saveToLocalStorage(data);
    
    document.getElementById('parkingForm').reset();
});