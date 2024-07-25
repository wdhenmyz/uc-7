const cliente = document.getElementById("produto");

async function addRowToTable(e) {
    // previne o comportamento padrão do formulário
    e.preventDefault();

    // pega os dados do formulário
    const nome = document.getElementById("nome").value;
    const fabricante = document.getElementById("fabricante").value;
    const modelo = document.getElementById("modelo").value;
    const ano = document.getElementById("ano").value;
    const descricao = document.getElementById("descricao").value;
    const preco = document.getElementById("preco").value;

    // envia os dados para o servidor
    const response = await fetch('/', {
        method: 'POST',
        headers: {
            // define o cabeçalho
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, fabricante, modelo, ano, descricao, preco }),
    })

    // captura a resposta
    const data = await response.json();
    console.log('produto cadastrado', data);
}