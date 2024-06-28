document.addEventListener("DOMContentLoaded", function(){
    let linksobre = document.querySelector('#link-sobre');
    if (linksobre) {
        linksobre.addEventListener('click', function(){
            window.api.send('abrir-janela-sobre');
        });
    } 
});

document.addEventListener("DOMContentLoaded", function(){
    // Seleciona o elemento com o ID 'fechar-sobre'
    let linksobre = document.querySelector('#fechar-sobre');
    // Verifica se o elemento existe
    if (linksobre) {
        // Adiciona um ouvinte de evento de clique ao elemento
        linksobre.addEventListener('click', function(){
            // Envia uma mensagem IPC 'fechar-janela-sobre' via window.npi
            window.api.send('fechar-janela-sobre');
        });
    } 
});
