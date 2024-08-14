function loadFromDiario() {
    const data = localStorage.getItem('diario');
    return data ? JSON.parse(data) : [];
}

function addRowToTable(plate, tipo, owner, entryTime, exitTimeActual, totalvalue) {
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
    valueCell.textContent = totalvalue;
    row.appendChild(valueCell);

    tableBody.appendChild(row);
}

window.addEventListener('load', function() {
    let totalValue = 0;
    const data = loadFromDiario();
    data.forEach(vehicle => {
        addRowToTable(vehicle.plate, vehicle.tipo, vehicle.owner, vehicle.entryTime, vehicle.exitTimeActual, vehicle.totalvalue);
        totalValue += vehicle.totalvalue;
    });
    document.getElementById('valordiario').textContent = `R$ ${totalValue.toFixed(2)}`;
});


document.getElementById('vehicleForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Retrieve and parse the data from localStorage
    const storedData = localStorage.getItem('diario');
    if (!storedData) {
        console.error('No data found in localStorage');
        return;
    }
    const parkingData = JSON.parse(storedData);

    // Get the form values
    const placa = document.getElementById("plate").value.toLowerCase();
    const tipo = document.getElementById("tipo").value.toLowerCase();

    // Filter the data based on the form values
    const filteredData = parkingData.filter(item => {
        const matchesPlaca = placa ? item.plate.toLowerCase().includes(placa) : true;
        const matchesTipo = tipo ? item.tipo.toLowerCase().includes(tipo) : true;
        return matchesPlaca && matchesTipo;
    });

    // Clear the table body
    const tableBody = document.getElementById('parkingTableBody');
    tableBody.innerHTML = '';

    // Populate the table with filtered data
    filteredData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.plate}</td>
            <td>${item.tipo}</td>
            <td>${item.owner}</td>
            <td>${item.entryTime}</td>
            <td>${item.exitTimeActual}</td>
            <td>${item.value}</td>
        `;
        tableBody.appendChild(row);
    });
});

document.getElementById('dailyReport').addEventListener('click', async function(e) {
    e.preventDefault();

    const dataEntries = loadFromDiario(); // Assumes this returns an array of objects
    console.log('Loaded Data Entries:', dataEntries);

    const payload = {
        data: dataEntries.map(entry => ({
            'placa': entry.plate,
            'proprietário': entry.owner,
            'tipo': entry.tipo,
            'entrada': entry.entryTime,
            'saida': entry.exitTimeActual,
            'valor': entry.totalvalue
        }))
    };

    console.log('Payload:', JSON.stringify(payload, null, 2));

    try {
        const response = await fetch('https://sheetdb.io/api/v1/9nlku5fa6cl5i', {
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
        window.location.reload();
    } catch (error) {
        console.error('Error:', error);
    }
});