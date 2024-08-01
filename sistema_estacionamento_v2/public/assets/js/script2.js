const info = document.getElementById('parkingTableBody').innerHTML = '';

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
    const storedVehicles = JSON.parse(localStorage.getItem('parkingData')) || [];

    // Filter vehicles based on input
    const filteredVehicles = storedVehicles.filter(vehicle =>
        vehicle.plate.toLowerCase().includes(plate) || vehicle.tipo.toLowerCase().includes(tipo)
    );

    // Store the filtered vehicles in Local Storage
    localStorage.setItem('filteredVehicles', JSON.stringify(filteredVehicles));

    // Display the filtered vehicles in a pop-up
    showPopup(filteredVehicles);
});

document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('popupOverlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
});

function showPopup(filteredVehicles) {
    const filteredVehiclesList = document.getElementById('filteredVehiclesList');
    filteredVehiclesList.innerHTML = '';

    if (filteredVehicles.length === 0) {
        filteredVehiclesList.innerHTML = '<p>Nenhum veículo encontrado</p>';
    } else {
        const list = document.createElement('ul');
        filteredVehicles.forEach(vehicle => {
            const listItem = document.createElement('li');
            listItem.textContent = `Placa: ${vehicle.plate}, Tipo: ${vehicle.tipo}, dono: ${vehicle.owner}, entrada: ${vehicle.entryTime}, saida: ${vehicle.exitTime}`;
            list.appendChild(listItem);
        });
        filteredVehiclesList.appendChild(list);
    }

    document.getElementById('popupOverlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
}