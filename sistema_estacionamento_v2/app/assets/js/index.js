document.getElementById("parkingForm").addEventListener("submit", async (event) => {
  event.preventDefault(); // Previne o envio padrão do formulário

  const formData = new FormData(event.target);
  const data = {
      plate: formData.get("plate"),
      owner: formData.get("owner"),
      type: formData.get("value-radio"),
      date: new Date().toISOString() // Adiciona a data atual
  };

  try {
      const response = await fetch("/entrada", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // Converte o objeto em JSON
      });

      if (!response.ok) {
          throw new Error("Erro ao registrar veículo");
      }

      const result = await response.text();
      alert(result); // Alerta com a resposta do servidor
  } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao registrar veículo");
  }
});
