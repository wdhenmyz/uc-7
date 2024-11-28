async function entrada(vehicleData) {
    try {
        // Send the data to the server
        const response = await fetch('http://localhost:3000/api/entrada', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vehicleData)
        });
  
        if (response.ok) {
            console.log("veiculo cadastrado com sucesso");
            // Refresh the parking table or handle UI updates as needed
            window.location.reload();
        } else {
            console.error("falha ao cadastrar veiculo");
        }
  
  
    } catch (error) {
        console.error("falha ao enviar dados:", error);
    }
}

export { entrada };