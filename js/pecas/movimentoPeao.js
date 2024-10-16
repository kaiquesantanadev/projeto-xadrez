function movimentoPeao(startId, targetId, tamanho) {
    const linhaInicial = [48, 49, 50, 51, 52, 53, 54, 55];

    if (
        (linhaInicial.includes(startId) && startId - tamanho * 2 === Number(targetId)) && !document.querySelector(`[quadrado-id="${startId - tamanho}"]`).firstChild ||
        (startId - tamanho === Number(targetId)) ||
        (startId - tamanho - 1 === Number(targetId) && document.querySelector(`[quadrado-id="${startId - tamanho - 1}"]`).firstChild) || // Movimento diagonal esquerda
        (startId - tamanho + 1 === Number(targetId) && document.querySelector(`[quadrado-id="${startId - tamanho + 1}"]`).firstChild) // Movimento diagonal direita
    ) {
        return true;
    }
    return false;
}
