function loadFromDiario() {
    const data = localStorage.getItem('diario');
    return data ? JSON.parse(data) : [];
}

function addRowToTable(plate, tipo, owner, entryTime, exitTimeActual, value) {
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
    exitTimeCell.textContent =  new Date(exitTimeActual).toLocaleString() ;
    row.appendChild(exitTimeCell);

    // Célula para o valor a pagar
    const valueCell = document.createElement('td');
    valueCell.textContent = value ? 'R$ ' + value.toFixed(2) : '';
    row.appendChild(valueCell);

    tableBody.appendChild(row);
}

window.addEventListener('load', function() {
    const data = loadFromDiario();
    data.forEach(vehicle => {
        addRowToTable(vehicle.plate, vehicle.tipo, vehicle.owner, vehicle.entryTime, vehicle.exitTimeActual, vehicle.value);
    });
});

let contador = 0

// Função para aumentar o tamanho da letra
function aumentarTamanho() {
    if (contador < 1 ) {
        const corpo = document.getElementById('container');
        const estilo = window.getComputedStyle(corpo, null).getPropertyValue('font-size');
        const tamanhoAtual = parseFloat(estilo);
        corpo.style.fontSize = (tamanhoAtual + 3) + 'px';
      
        contador++
    }

    console.log(contador);
    }

// Função para diminuir o tamanho da letra
function diminuirTamanho() {
    if (contador >= 0) {
        const corpo = document.getElementById('container');
        const estilo = window.getComputedStyle(corpo, null).getPropertyValue('font-size');
        const tamanhoAtual = parseFloat(estilo);
        corpo.style.fontSize = (tamanhoAtual - 3) + 'px';

        contador--
    }

    console.log(contador)
}

document.getElementById('vehicleForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const plate = document.getElementById('plate').value.toLowerCase();
    const tipo = document.getElementById('tipo').value.toLowerCase();

    // Retrieve vehicles from Local Storage
    const storedVehicles = JSON.parse(localStorage.getItem('diario')) || [];

    // Filter vehicles based on input
    const VehiclesToday = storedVehicles.filter(vehicle =>
        vehicle.plate.toLowerCase().includes(plate) || vehicle.tipo.toLowerCase().includes(tipo)
    );

    // Store the filtered vehicles in Local Storage
    localStorage.setItem('VehiclesToday', JSON.stringify(VehiclesToday));

    // Display the filtered vehicles in a pop-up
    showPopup(VehiclesToday);
});

document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('popupOverlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
});

function showPopup(VehiclesToday) {
    const VehiclesTodayList = document.getElementById('VehiclesTodayList');
    VehiclesTodayList.innerHTML = '';

    if (VehiclesToday.length === 0) {
        VehiclesTodayList.innerHTML = '<p>Nenhum veículo encontrado</p>';
    } else {
        const list = document.createElement('ul');
        VehiclesToday.forEach(vehicle => {
            const listItem = document.createElement('li');
            listItem.textContent = `Placa: ${vehicle.plate}, Tipo: ${vehicle.tipo}, dono: ${vehicle.owner}, entrada: ${vehicle.entryTime}, saida: ${vehicle.exitTime}`;
            list.appendChild(listItem);
        });
        VehiclesTodayList.appendChild(list);
    }

    document.getElementById('popupOverlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
}

document.getElementById('dailyReport').addEventListener('click', async function(e) {
    e.preventDefault();

    const dataEntries = loadFromDiario(); // Assumes this returns an array of objects
    console.log('Loaded Data Entries:', dataEntries);

    const payload = constructPayload(dataEntries);
    console.log('Payload:', JSON.stringify(payload, null, 2));
    

    try {
        const response = await fetch('/veiculos', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        console.log(result);

        localStorage.removeItem('diario');
    } catch (error) {
        console.error('Error:', error);
    }
});