const produto = document.getElementById('cadastroProduto');

produto.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome_produto').value;
    const fabricante = document.getElementById('fabricante').value;
    const modelo = document.getElementById('modelo').value;
    const ano = document.getElementById('ano').value;
    const descricao= document.getElementById('descricao').value;
    const quantidade = document.getElementById('quantidade').value;
    const preco = document.getElementById('preco').value;

    const response = await fetch('/produto', {
        method: 'POST',
        headers: {

            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, fabricante, modelo, ano,descricao, quantidade, preco }),
    });
    const data = await response.json();

    console.log('Veiculo Cadastrado', data);
});

const cliente = document.getElementById('cadastroCliente');

cliente.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome_cliente').value;
    const data_nascimento = document.getElementById('data_nascimento_cliente').value;
    const numero_telefone = document.getElementById('numero_telefone_cliente').value;
    const endereco = document.getElementById('endereco_cliente').value;
    const sexo= document.getElementById('sexo_cliente').value;

    const response = await fetch('/cliente', {
        method: 'POST',
        headers: {

            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, data_nascimento, numero_telefone, endereco, sexo }),
    });
    const data = await response.json();

    console.log('Veiculo Cadastrado', data);
});

const funcionario = document.getElementById('cadastroFuncionario');

funcionario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome_funcionario').value;
    const data_nascimento = document.getElementById('data_nascimento_funcionario').value;
    const numero_telefone = document.getElementById('numero_telefone_funcionario').value;
    const endereco = document.getElementById('endereco_funcionario').value;
    const sexo= document.getElementById('sexo_funcionario').value;
    const funcao= document.getElementById('funcao').value;

    const response = await fetch('/funcionario', {
        method: 'POST',
        headers: {

            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, data_nascimento, numero_telefone, endereco, sexo, funcao }),
    });
    const data = await response.json();

    console.log('Veiculo Cadastrado', data);
});