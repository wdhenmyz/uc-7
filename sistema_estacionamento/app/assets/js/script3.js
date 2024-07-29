function loadFromDiario() {
    const data = localStorage.getItem('diario');
    return data ? JSON.parse(data) : [];
}

document.getElementById('dailyReport').addEventListener('click', async function(e) {
    e.preventDefault();

    const data = loadFromDiario();
    console.log(data);

    const { plate, owner, tipo, entryTime, exitTimeActual, value } = data;

    const payload = {
        data: [
            {
                'placa': plate,
                'proprietário': owner,
                'tipo': tipo,
                'entrada': entryTime,
                'saida': exitTimeActual,
                'valor': value
            }
        ]
    };

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
    } catch (error) {
        console.error('Error:', error);
    }
});

