let resultado = document.getElementById('resultado');
let operacao = '';

// Função insert: Adiciona um valor à operação atual e atualiza o conteúdo exibido
function insert(valor) {
    operacao += valor;
    resultado.innerHTML = operacao;
}

// Função clean: Limpa a operação atual e o conteúdo exibido
function clean() {
    operacao = '';
    resultado.innerHTML = operacao;
}

// Função back: Remove o último caractere da operação atual e atualiza o conteúdo exibido
function back() {
    operacao = operacao.slice(0, -1);
    resultado.innerHTML = operacao;
}

// Função calcular: Avalia a operação atual, exibe o resultado e trata erros
function calcular() {
    try {
        let result = eval(operacao);  // Usa a função eval para calcular a operação
        resultado.innerHTML = result.toFixed(2);  // Exibe o resultado com duas casas decimais
        operacao = result.toFixed(2);  // Atualiza a operação com o resultado para futuras operações
    } catch (error) {
        resultado.innerHTML = 'Erro';  // Exibe uma mensagem de erro se a avaliação falhar
    }
}