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

    // Filter the data
    const filteredData = parkingData.filter(item => 
        (placa && item.placa.toLowerCase().includes(placa)) ||
        (tipo && item.tipo.toLowerCase().includes(tipo))
    );

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

