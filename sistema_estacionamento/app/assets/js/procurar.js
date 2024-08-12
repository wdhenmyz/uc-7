// Função para carregar dados do localStorage
function loadFromLocalStorage() {
    const data = localStorage.getItem('parkingData');
    return data ? JSON.parse(data) : [];
}



function addRowToTable(plate, tipo, owner, entryTime, exitTimeActual, value, totalvalue) {
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

    function updateRate(tipo) {
        if (tipo === 'moto') {
            return 2;
        } else if (tipo === 'carro') {
            return 3;
        } else if (tipo === 'caminhonete') {
            return 4;
        }else if (tipo === 'onibus') {
            return 5;
        }
    }

    const valor = updateRate(tipo); // Chama updateRate para definir a taxa inicial
    console.log('Taxa calculada:', valor);

    // Célula para o valor a pagar
    const valueCell = document.createElement('td');
    valueCell.textContent = valor || totalvalue;
    row.appendChild(valueCell);

    tableBody.appendChild(row);

    if (tipo === 'moto') {
        motospots--;
        vagasmoto.textContent = `Vagas de moto: ${motospots}`
    }    
    if (tipo === 'carro') {
        carspots--;
        vagascarro.textContent = `Vagas de carro: ${carspots}`
    } 
    if (tipo === 'caminhonete') {
        truckspots--;
        vagascaminhonete.textContent = `Vagas de caminhonete: ${truckspots}`
    } 
    if (tipo === 'onibus') {
        busspots--;
        vagasonibus.textContent = `vagas de onibus: ${busspots}`
    } 

    if (motospots === 0) {
        vagasmoto.textContent = 'Vagas de moto: não há vagas disponíveis';
    }

    if (carspots === 0) {
        vagascarro.textContent = 'Vagas de carro: não há vagas disponíveis';       
    }

    if (truckspots === 0) {
        vagascaminhonete.textContent = 'Vagas de caminhonete: não há vagas disponíveis';
    }

    if (busspots === 0) {
        vagasonibus.textContent = 'vagas de onibus: não há vagas disponíveis';        
    }
}

// Carrega dados do localStorage e adiciona à tabela ao carregar a página
window.addEventListener('load', function() {
    const data = loadFromLocalStorage();
    data.forEach(vehicle => {
        addRowToTable(vehicle.plate, vehicle.tipo, vehicle.owner, vehicle.entryTime, vehicle.exitTime, vehicle.value,vehicle.value||vehicle.totalvalue);
    });
});



document.getElementById('vehicleForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Retrieve and parse the data from localStorage
    const storedData = localStorage.getItem('parkingData');
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

