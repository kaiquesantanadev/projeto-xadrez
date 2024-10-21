function movimentoPeao(startId, targetId, tamanho) {
    const linhaInicial = [48, 49, 50, 51, 52, 53, 54, 55];
    const linhaFinal = [0, 1, 2, 3, 4, 5, 6, 7];
    
    if (
        (linhaInicial.includes(startId) && startId - tamanho * 2 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId - tamanho}"]`).firstChild) ||
        (startId - tamanho === Number(targetId)) ||
        (startId - tamanho - 1 === Number(targetId) && document.querySelector(`[quadrado-id="${startId - tamanho - 1}"]`).firstChild) || // Movimento diagonal esquerda
        (startId - tamanho + 1 === Number(targetId) && document.querySelector(`[quadrado-id="${startId - tamanho + 1}"]`).firstChild) // Movimento diagonal direita
    ) {
        if (linhaFinal.includes(Number(targetId))) {
            const novaPeca = prompt("Escolha a peça para promoção (rainha, torre, bispo, cavalo):").toLowerCase();
            let pecaHtml = '';
            switch (novaPeca) {
                case 'rainha':
                    pecaHtml = rainha;
                    break;
                case 'torre':
                    pecaHtml = torre;
                    break;
                case 'bispo':
                    pecaHtml = bispo;
                    break;
                case 'cavalo':
                    pecaHtml = cavalo;
                    break;
                default:
                    alert('Peça não informada de forma correta, evoluindo peça para cavalo como padrão.')
                    pecaHtml = cavalo;
                    break;
            }
            const quadradoInicial = document.querySelector(`[quadrado-id="${startId}"]`);
            quadradoInicial.innerHTML = '';
            const targetSquare = document.querySelector(`[quadrado-id="${targetId}"]`);
            targetSquare.innerHTML = pecaHtml;
            targetSquare.firstChild.firstChild.classList.add(vezJogador);
            mudarVez()
            return true
        }
        return true;
    }
    return false;
}
