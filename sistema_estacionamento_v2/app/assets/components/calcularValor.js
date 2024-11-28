const carro = 4;
const moto = 2;
const caminhonete = 6;
const onibus = 8;


// Função para calcular o valor com base no tipo de veículo
function calcularValor(tipo) {
  let valor = 0;
  
  // Define valores baseados no tipo do veículo
  switch (tipo) {
      case 'carro':
          valor = carro;  // Exemplo de valor fixo para carros
          break;
      case 'moto':
          valor = moto;  // Exemplo de valor fixo para motos
          break;
      case 'caminhonete':
          valor = caminhonete;  // Exemplo de valor fixo para caminhões
          break;
      case 'onibus':
          valor = onibus;  // Exemplo de valor fixo para caminhões
          break;
      default:
          valor = 0;  // Valor padrão para tipos não definidos
          break;
  }

  return valor;
}
  export { calcularValor };