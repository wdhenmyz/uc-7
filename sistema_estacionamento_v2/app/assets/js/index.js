document.getElementById("parkingForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Get the form data
    const plate = document.getElementById("plate").value;
    const owner = document.getElementById("owner").value;
    const type = document.querySelector("input[name='value-radio']:checked").value;
  
    try {
      // Send a POST request with the form data
      const response = await fetch("/entrada", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          plate: plate,
          owner: owner,
          "value-radio": type
        })
      });
  
      // Check if the request was successful
      if (response.ok) {
        const result = await response.text();
        alert(result); // Show a success message
      } else {
        alert("Erro ao registrar o veículo. Por favor, tente novamente.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Ocorreu um erro ao enviar os dados.");
    }
  });
  