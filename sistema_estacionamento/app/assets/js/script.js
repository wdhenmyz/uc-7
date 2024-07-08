document.getElementById('parkingForm').addEventListener('submit', function(event) {
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
});