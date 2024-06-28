function obterParametro(name) {
    let params = new URLSearchParams(window.location.search);
    return params.get(name);
}

window.onload = function() {
    let nome = obterParametro('nome');
    let media = obterParametro('media');
    document.getElementById('resultado').textContent = `${nome}, sua média é: ${media}`;
};