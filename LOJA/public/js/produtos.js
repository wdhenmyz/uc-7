const produto = document.getElementById('produto');

/*async function addRowToTable(e) {
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
    const response = await fetch('/loja', {
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
}*/

produto.addEventListener('submit', async (e) => {
    // previne o comportamento padrão do formulário
    e.preventDefault(); 

    // pega os dados do formulário
    const nome = document.getElementById("nome").value;
    const fabricante = document.getElementById("fabricante").value;
    const modelo = document.getElementById("modelo").value;
    const ano = document.getElementById("ano").value;
    const descricao = document.getElementById("descricao").value;
    const preco = document.getElementById("preco").value;

    console.log(nome, fabricante, modelo, ano, descricao, preco);

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
                        'nome': nome,
                        'fabricante': fabricante,
                        'modelo': modelo,
                        'ano': ano,
                        'descriçao': descricao,
                        'preço': preco
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
