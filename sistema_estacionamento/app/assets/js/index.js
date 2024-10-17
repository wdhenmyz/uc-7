// Função para carregar dados do localStorage
function loadFromLocalStorage() {
    const data = localStorage.getItem('parkingData');
    return data ? JSON.parse(data) : [];
}

// Função para salvar dados no localStorage
function saveToLocalStorage(data) {
    localStorage.setItem('parkingData', JSON.stringify(data));
}


// Função para adicionar uma linha na tabela
async function addRowToTable(plate, tipo, owner, entryTime, exitTime) {
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
        exitTimeCell.textContent = exitTime ? new Date(exitTime).toLocaleString() : '';
        row.appendChild(exitTimeCell);

        // Função para atualizar a taxa com base no tipo do veículo
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
        valueCell.textContent = valor;
        row.appendChild(valueCell);

        // Célula para o botão de registrar saída
        const actionsCell = document.createElement('td');
        const exitButton = document.createElement('button');
        exitButton.textContent = 'Registrar Saída';
        exitButton.id = "exitButton"; 

        actionsCell.appendChild(exitButton);
        row.appendChild(actionsCell);
        
            exitButton.addEventListener('click', function(e)  {
                e.preventDefault();

                const exitTimeActual = new Date();
                const diffInMs = exitTimeActual - new Date(entryTime);
                const diffInHours = Math.ceil(diffInMs / (1000 * 60 * 60));
                const totalvalue = diffInHours * valor;

                exitTimeCell.textContent = exitTimeActual.toLocaleString();
                valueCell.textContent = 'valor final R$ ' + totalvalue.toFixed(2);
                exitButton.disabled = true;

                // Atualiza os dados no localStorage
                const data = loadFromLocalStorage();
                const vehicleIndex = data.findIndex(v => v.plate === plate && v.entryTime === entryTime);
                if (vehicleIndex !== -1) {
                    data[vehicleIndex].exitTime = exitTimeActual.toISOString();
                    data[vehicleIndex].totalvalue = totalvalue;
                    saveToLocalStorage(data);
                }

               

                // Cria o botão "Pagar"
                const payButton = document.createElement('button');
                payButton.textContent = 'Pagar';
                actionsCell.appendChild(payButton);

                payButton.addEventListener('click', async function(e) {    
                    e.preventDefault();

                     // Armazena os dados no diario 
                    function diario(data) {
                        const existingData = JSON.parse(localStorage.getItem('diario')) || [];
                        existingData.push(data);
                        localStorage.setItem('diario', JSON.stringify(existingData));
                    }
                
                    // Call the diario function with the appropriate data
                    diario({ plate, tipo, owner, entryTime, exitTimeActual, totalvalue });
                    
                    // Remove a linha da tabela
                    row.remove();
                    
                    // Remove o veículo do localStorage
                    const data = loadFromLocalStorage();
                    const vehicleIndex = data.findIndex(v => v.plate === plate && v.entryTime === entryTime);
                    if (vehicleIndex !== -1) {
                        data.splice(vehicleIndex, 1);
                        saveToLocalStorage(data);
                    }

                    // Atualiza a quantidade de vagas disponíveis
                    availableSpotsCount++;
                    const availableSpots = document.getElementById('availableSpots');
                    availableSpots.textContent = `Vagas Disponíveis: ${availableSpotsCount}`;

                    const vagascarro = document.getElementById('vagas_carro');
                    const vagasmoto = document.getElementById('vagas_moto');
                    const vagascaminhonete = document.getElementById('vagas_caminhonete');
                    const vagasonibus = document.getElementById('vagas_onibus');

                    if (tipo === 'moto') {
                        motospots++;
                        vagasmoto.textContent = `Vagas de moto: ${motospots}`
                    }    
                    if (tipo === 'carro') {
                        carspots++;
                        vagascarro.textContent = `Vagas de carro: ${carspots}`
                    } 
                    if (tipo === 'caminhonete') {
                        truckspots++;
                        vagascaminhonete.textContent = `Vagas de caminhonete: ${truckspots}`
                    } 
                    if (tipo === 'onibus') {
                        busspots++;
                        vagasonibus.textContent = `vagas de onibus: ${busspots}`
                    } 
                    
                    window.location.reload();
                });
            
                
            });

        actionsCell.appendChild(exitButton);
        row.appendChild(actionsCell);

        // Adiciona a linha à tabela
        tableBody.appendChild(row);

        // Atualiza a quantidade de vagas disponíveis
        availableSpotsCount--;
        const availableSpots = document.getElementById('availableSpots');
        availableSpots.textContent = `Vagas Disponíveis: ${availableSpotsCount}`;


        const vagascarro = document.getElementById('vagas_carro');
        const vagasmoto = document.getElementById('vagas_moto');
        const vagascaminhonete = document.getElementById('vagas_caminhonete');
        const vagasonibus = document.getElementById('vagas_onibus');


        if (tipo === 'moto' && motospots > 0) {
            motospots--;
            vagasmoto.textContent = `Vagas de moto: ${motospots}`
        }    
        if (tipo === 'carro' && carspots > 0) {
            carspots--;
            vagascarro.textContent = `Vagas de carro: ${carspots}`
        } 
        if (tipo === 'caminhonete' && truckspots > 0) {
            truckspots--;
            vagascaminhonete.textContent = `Vagas de caminhonete: ${truckspots}`
        } 
        if (tipo === 'onibus' && busspots > 0) {
            busspots--;
            vagasonibus.textContent = `vagas de onibus: ${busspots}`
        }


        if (motospots === 0) {
            vagasmoto.textContent = 'Vagas de moto: não há vagas disponíveis';     
            alert('Vagas de moto esgotadas');
        } else if (motospots === -1) {
            
            
        }

        if (carspots === 0) {
            vagascarro.textContent = 'Vagas de carro: não há vagas disponíveis';  
            alert('Vagas de carro esgotadas');
        } else if (carspots === -1) {
            
            
        }

        if (truckspots === 0) {
            vagascaminhonete.textContent = 'Vagas de caminhonete: não há vagas disponíveis';        
            alert('Vagas de caminhonete esgotadas');
        } else if (truckspots === -1) {
            
            
        }

        if (busspots === 0) {
            vagasonibus.textContent = 'vagas de onibus: não há vagas disponíveis';
            alert('Vagas de onibus esgotadas');
        } else if (busspots === -1) {
            
            
        }
}

// Carrega dados do localStorage e adiciona à tabela ao carregar a página
window.addEventListener('load', function() {    
    const data = loadFromLocalStorage();
    data.forEach(vehicle => {
        addRowToTable(vehicle.plate, vehicle.tipo, vehicle.owner, vehicle.entryTime, vehicle.exitTime, vehicle.value);
    });
});

window.addEventListener('load', function() {    
    let totalValue = 0;
    function loadFromDiario() {
        const data = localStorage.getItem('diario');
        return data ? JSON.parse(data) : [];
    }
    const data2 = loadFromDiario();
    data2.forEach(vehicle => {
        totalValue += Number(vehicle.totalvalue); // Ensure totalvalue is treated as a number
    });
    document.getElementById('valordiario').textContent = `R$ ${totalValue.toFixed(2)}`;
});

// Lida com o envio do formulário
document.getElementById('parkingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const plate = document.getElementById('plate').value;
    const tipo = document.getElementById('tipo').value;
    const owner = document.getElementById('owner').value;
    const entryTime = new Date().toISOString();

    if (plate ) {
        
    }
    // se plate for igual a um existente, alerta e retorna
    const data = loadFromLocalStorage();
    if (data.some(vehicle => vehicle.plate === plate)) {
        alert('Placa ja existente');
        return;
    } else {
        addRowToTable(plate, tipo, owner,  entryTime, null, null);
        // Salva os dados no localStorage
        const data = loadFromLocalStorage();
        data.push({ plate, tipo, owner, entryTime});
        saveToLocalStorage(data);
        
        document.getElementById('parkingForm').reset();
    }   
});



