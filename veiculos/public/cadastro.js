// carrega o formulário
const form = document.getElementById('formCadastro');

form.addEventListener('submit', async(e) => {
    e.preventDefault();

    // captura os valores do form
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;   
    const ano = document.getElementById('ano').value;

    const response = await fetch('/veiculos', {
        method: 'POST',
        headers: {
            // define o cabeçalho
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ marca, modelo, ano }),
    })
    const data = await response.json();
    console.log('veiculo cadastrado', data);
})