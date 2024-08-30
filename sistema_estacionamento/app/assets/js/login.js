document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const senha = document.getElementById('password').value;
    const usuario = document.getElementById('username').value;
    
    
    
    try {
        const response = await fetch(`https://sheetdb.io/api/v1/mg07naffiti78/search?id=${id}&usuario=${usuario}&senha=${senha}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        const result = await response.json();
        console.log(result);

        if (result.length > 0) {
            async function confirm() {
              let id = prompt("porfavor entre seu id:");

              if (id == null || id.trim() === "") {
                alert("Você não colocou um id válido");
                return;
              }

              try {
                const response = await fetch(`https://sheetdb.io/api/v1/mg07naffiti78/search?&id=${id}`, {
                  method: 'GET',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                });

                const result = await response.json();
                console.log(result);

                if (result.length > 0) {
                    alert('Bem vindo');
                    window.location.href = 'index.html';     
                    return;  
                  
                } else {
                  alert('Você não entrou um id válido');
                }
              } catch (error) {
                console.error('Fetch error:', error);
                alert('Ocorreu um erro ao buscar os dados. Tente novamente mais tarde.');
              }
            }

            confirm()
                
        } else {
            alert('Usuário ou senha inválidos');
        }
        
    } catch (error) {
        console.error('Error:', error);
    }


});
