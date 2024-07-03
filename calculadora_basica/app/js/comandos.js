function insert(num) {
    document.getElementById('resultado').innerText += num;
}

function clean() {
    document.getElementById('resultado').innerText = "";
}

function back() {
    let resultado = document.getElementById('resultado').innerText;
    document.getElementById('resultado').innerText = resultado.substring(0, resultado.length - 1);
}

function calcular() {
    let resultado = document.getElementById('resultado').innerText;
    if(resultado) {
        document.getElementById('resultado').innerText = eval(resultado.replace('X', '*'));
    }
}

function percent() {
    const resultado = document.getElementById('resultado').innerText;
    if (resultado) {
        document.getElementById('resultado').innerText = eval(resultado) / 100;
    }
}