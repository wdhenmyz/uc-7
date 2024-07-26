const funcionario = document.getElementById("funcionario");

async function addRowToTable(e) {
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
}