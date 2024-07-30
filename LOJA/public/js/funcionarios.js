const funcionario = document.getElementById("funcionario");

/*async function addRowToTable(e) {
    // previne o comportamento padrão do formulário
    e.preventDefault();

    // pega os dados do formulário
    const nome = document.getElementById("nome").value;
    const nascimento = document.getElementById("data_nascimento").value;
    const celular = document.getElementById("celular").value;
    const endereco = document.getElementById("endereco").value;
    const sexo = document.getElementById("sexo").value;
    const funcao = document.getElementById("funcao").value;

    // envia os dados para o servidor
    const response = await fetch('/loja', {
        method: 'POST',
        headers: {
            // define o cabeçalho
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, nascimento, celular, endereco, sexo, funcao }),
    })

    // captura a resposta
    const data = await response.json();
    console.log('funcionário cadastrado', data);
}*/


funcionario.addEventListener('submit', async (e) => {
    // previne o comportamento padrão do formulário
    e.preventDefault(); 

    // pega os dados do formulário
    const nome = document.getElementById('nome').value;
    const nascimento = document.getElementById('data_nascimento').value;   
    const endereco = document.getElementById('endereco').value;
    const sexo = document.getElementById('sexo').value;
    const celular = document.getElementById('celular').value;
    const funcao = document.getElementById('funcao').value;
    
    console.log(nome, nascimento, celular, endereco, sexo, funcao);

    try {
        const response = await fetch('https://sheetdb.io/api/v1/mg07naffiti78', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: [
                    {
                        'id_funcionario': "INCREMENT",
                        'nome': nome,
                        'data de nascimento': nascimento,
                        'celular': celular,
                        'endereço': endereco,
                        'sexo': sexo,
                        'função': funcao
                    }
                ]
            })
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
});


document.getElementById("procurar").addEventListener('submit', async(e) => {
    e.preventDefault();

    try {
        const response = await fetch('https://sheetdb.io/api/v1/mg07naffiti78');
        const data = await response.json();

        console.log(data);

        const tabelaFuncionarios = document.getElementById('funcionarios').getElementsByTagName('tbody')[0];
        tabelaFuncionarios.innerHTML = ''; // Clear the table body before adding new rows
        
        data.forEach(funcionario => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${funcionario.id}</td>
                <td>${funcionario.nome}</td>
                <td>${funcionario.nascimento}</td>
                <td>${funcionario.celular}</td>
                <td>${funcionario.endereco}</td>
                <td>${funcionario.sexo}</td>
                <td>${funcionario.funcao}</td>
            `;
            tabelaProdutos.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});