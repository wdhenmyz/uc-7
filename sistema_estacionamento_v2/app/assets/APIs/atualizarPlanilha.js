import { showPopup, hidePopup } from "../components/Popup.js";

async function enviar() {
    try {
        // Exibir mensagem de carregamento
        showPopup("enviando relatório diário, aguarde......");

        // Faz a requisição GET para pegar todos os veículos da coleção 'saida'
        const response = await fetch('http://localhost:3000/api/saida');
        const vehicles = await response.json();

        if (!response.ok) {
                throw new Error("Erro ao buscar os dados da coleção 'saida'");
            }

        console.log("Dados da coleção 'saida':", vehicles);

        const payload = {
        data: vehicles.map(entry => ({
            'placa': entry.placa,
            'proprietário': entry.dono,
            'tipo': entry.tipo,
            'entrada': entry.entrada,
            'saida': entry.saida,
            'valor': entry.valor
            }))
        };


        // Envia os dados da coleção 'saida' para a API SheetDB
        const sheetDbResponse = await fetch('https://sheetdb.io/api/v1/9nlku5fa6cl5i', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });


        if (!sheetDbResponse.ok) {
            throw new Error("Erro ao enviar os dados para o SheetDB");
        }

        // Agora, deleta todos os documentos da coleção 'saida'
        const deleteResponse = await fetch('http://localhost:3000/api/saida', {
            method: 'DELETE',
        });

        if (!deleteResponse.ok) {
            throw new Error("Erro ao deletar os documentos da coleção 'saida'");
        }

        console.log("Dados enviados para o SheetDB e documentos deletados da coleção 'saida' com sucesso");

        // Opcional: Atualize a interface ou mostre uma mensagem de sucesso para o usuário
        showPopup("Relatório diário enviado e dados apagados com sucesso!");
        setTimeout(() => {
            hidePopup();
            window.location.reload();
          }, 2500); // Aguardar 1.5 segundos antes de redirecionar
        
    } catch (error) {
        console.error("Erro ao processar o relatório diário:", error);
        showPopup("Houve um erro ao enviar os dados. Verifique o console para mais informações.");
    }
}

export { enviar };