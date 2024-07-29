const exitButton = document.getElementById('exitButton');

exitButton.addEventListener('click', async function() {
    const data = loadFromLocalStorage();
    localStorage.setItem('diario', JSON.stringify(data));
    document.getElementById('parkingTableBody').innerHTML = '';

    const payButton = document.createElement('button');
    payButton.textContent = 'Pagar';
    actionsCell.appendChild(payButton);
})
