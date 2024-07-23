const info = document.getElementById('parkingTableBody').innerHTML = '';

function diario() {
    localStorage.setItem('diario', JSON.stringify(data));
    document.getElementById('parkingTableBody').innerHTML = '';
}

const actionsCell = document.createElement('td');
const exitButton = document.createElement('button');
exitButton.textContent = 'Registrar Saída';

exitButton.addEventListener('click', function() {
    diario(data)
});

