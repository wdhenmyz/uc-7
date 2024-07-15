async function addRowToTable(plate, owner, entryTime, exitTime, value) {
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

    // Variáveis para armazenar as taxas de carro e moto
    let valor = 0;
    const carCheckbox = document.getElementById('carCheckbox');
    const motoCheckbox = document.getElementById('motoCheckbox');

    function updateRate() {
        if (motoCheckbox.checked && !carCheckbox.checked) {
            valor = 2;
        } else if (!motoCheckbox.checked && carCheckbox.checked) {
            valor = 3;
        } else {
            valor = 0;
        }
    }

    carCheckbox.addEventListener('change', updateRate);
    motoCheckbox.addEventListener('change', updateRate);
    updateRate();

    if (exitTime) {
        exitButton.disabled = true;
    } else {
        exitButton.addEventListener('click', async function() {
            const exitTime = new Date();
            const diffInMs = exitTime - new Date(entryTime);
            const diffInHours = Math.ceil(diffInMs / (1000 * 60 * 60));
            const value = diffInHours * valor;

            exitTimeCell.textContent = exitTime.toLocaleString();
            valueCell.textContent = 'R$ ' + value.toFixed(2);
            exitButton.disabled = true;

            // Atualiza os dados no banco de dados
            const response = await fetch(`/vehicles/${row.dataset.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    exitTime: exitTime,
                    value: value
                })
            });
            const updatedVehicle = await response.json();

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

    // Salva o veículo no banco de dados
    const response = await fetch('/vehicles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            plate: plate,
            owner: owner,
            entryTime: entryTime,
            exitTime: exitTime,
            value: value
        })
    });
    const newVehicle = await response.json();
    row.dataset.id = newVehicle.id; // Guarda o ID do veículo no dataset da linha

    // Atualiza a quantidade de vagas disponíveis
    const availableSpots = document.getElementById('availableSpots');
    const occupiedSpots = tableBody.querySelectorAll('tr').length;
    availableSpotsCount = 100 - occupiedSpots;
    availableSpots.textContent = `Vagas Disponíveis: ${availableSpotsCount}`;
}

// Exemplo de uso da função
addRowToTable('ABC-1234', 'João Silva', new Date().toISOString(), null, null);