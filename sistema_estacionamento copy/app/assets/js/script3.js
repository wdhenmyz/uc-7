function loadFromDiario() {
    const data = localStorage.getItem('diario');
    return data ? JSON.parse(data) : [];
}

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


