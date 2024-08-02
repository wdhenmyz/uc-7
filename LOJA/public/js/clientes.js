/* garantir que o DOM esteja carregado, antes de carregar o conteúdo
document.addEventListener("DOMContentLoaded", () => {
    carregarClientes();

    // carrega o formulário
    const procurar = document.getElementById('procurar');
    // cria uma função para procurar o cliente
    procurar.addEventListener('submit', async(e) => {
        e.preventDefault();        
        carregarClientes();
    })
});*/

const cliente = document.getElementById('cliente');
console.log(cliente); // Verifica se o elemento foi encontrado

cliente.addEventListener('submit', async (e) => {
    // previne o comportamento padrão do formulário
    e.preventDefault();

    // pega os dados do formulário
    const nome = document.getElementById('nome').value;
    const nascimento = document.getElementById('data_nascimento').value;   
    const endereco = document.getElementById('endereco').value;
    const sexo = document.getElementById('sexo').value;
    const celular = document.getElementById('celular').value;
    
    console.log(nome, nascimento, endereco, celular, sexo);

    // envia os dados para o servidor
    const response = await fetch('/clientes', {
        method: 'POST',
        headers: {
            // define o cabeçalho
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, nascimento, endereco, celular, sexo }),
    });

    // captura a resposta
    const data = await response.json();
    console.log('cliente cadastrado', data);
});



/* traz os clientes
async function carregarClientes() {
    // captura os valores do form
    try {
        const response = await fetch('/loja');
        const data = await response.json();

        // captura a tabela
        const tabelaClientes = document.getElementById('clientes');
        // carrega as informacoes
        tabelaClientes.innerHTML = '';

        // cria uma linha para cada cliente
        data.forEach(cliente => {
            const row = document.createElement('tr');
            // adiciona as informações
            row.innerHTML = `
                <td>${cliente.nome}</td>
                <td>${cliente.nascimento}</td>
                <td>${cliente.celular}</td>
                <td>${cliente.endereco}</td>
                <td>${cliente.sexo}</td>
            `;
            // adiciona na tabela
            tabelaClientes.appendChild(row);
        });
    } catch(error) {
        console.error("Erro ao buscar cliente", error);
    }
}*/