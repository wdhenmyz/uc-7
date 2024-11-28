async function loadModal(vehicleData) {
    console.log("Dados do veículo enviados para modal:", vehicleData); // Verifique se os dados aparecem aqui
    const vehicleDataString = encodeURIComponent(JSON.stringify(vehicleData));
    window.open(`modal.html?vehicleData=${vehicleDataString}`, 'VeiculoInfo', 'width=400,height=400');
  }

export { loadModal }