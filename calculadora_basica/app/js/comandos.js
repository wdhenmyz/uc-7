let resultado = document.getElementById('resultado');
        let operacao = '';

        function insert(valor) {
            operacao += valor;
            resultado.innerHTML = operacao;
        }

        function clean() {
            operacao = '';
            resultado.innerHTML = operacao;
        }

        function back() {
            operacao = operacao.slice(0, -1);
            resultado.innerHTML = operacao;
        }

        function calcular() {
            try {
                let result = eval(operacao);
                resultado.innerHTML = result.toFixed(2);
                operacao = result.toFixed(2);
            } catch (error) {
                resultado.innerHTML = 'Erro';
            }
        }