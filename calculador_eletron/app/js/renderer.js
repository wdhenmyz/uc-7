document.addEventListener("DOMContentLoaded", function(){
    let resultado = document.querySelector('#resultado');
    if (resultado) {
        resultado.addEventListener('click', function(){
            window.api.send('mostrar-resultado')
        });
    }
});