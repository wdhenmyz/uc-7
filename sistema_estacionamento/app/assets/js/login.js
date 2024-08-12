document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const senha = document.getElementById('password').value;
    const usuario = document.getElementById('username').value;
    
    try {
        const response = await fetch(`https://sheetdb.io/api/v1/mg07naffiti78/search?usuario=${usuario}&senha=${senha}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        const result = await response.json();
        console.log(result);

        if (result.length > 0) {
            window.location.href = 'index.html';
        } else {
            alert('Usuário ou senha inválidos');
        }
        
    } catch (error) {
        console.error('Error:', error);
    }


});