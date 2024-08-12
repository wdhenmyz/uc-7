
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

