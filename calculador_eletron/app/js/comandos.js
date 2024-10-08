function reiniciar() {
    window.location.reload()
}

function fecharjanela() {
    window.close()
}

function calcularMedia() {
    // Obter o nome do aluno
    let nome = document.getElementById('nome').value;

    // Obter os valores das notas
    let nota1 = parseFloat(document.getElementById('nota1').value);
    let nota2 = parseFloat(document.getElementById('nota2').value);
    let nota3 = parseFloat(document.getElementById('nota3').value);
    let nota4 = parseFloat(document.getElementById('nota4').value);

    // Verificar se as notas são válidas
    if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || isNaN(nota4)) {
        alert('Por favor, insira valores numéricos válidos para todas as notas.');
        return;
    }

    // Calcular a média das notas
    let media = (nota1 + nota2 + nota3 + nota4) / 4;
    // Verificar se o aluno passou ou reprovou
    let resultadoTexto = `Aluno/a ${nome}, sua média é: ${media.toFixed(2)}. Você `;
    resultadoTexto += (media >= 7) ? "passou." : "reprovou.";

    // Exibir a média e o nome do aluno
    document.getElementById('resultado').textContent = resultadoTexto;
}