function movimentoRei(startId, targetId, tamanho) {
    if (
        startId - 1 === Number(targetId) ||
        startId + 1 === Number(targetId) ||
        startId + tamanho === Number(targetId) ||
        startId + tamanho + 1 === Number(targetId) ||
        startId + tamanho - 1 === Number(targetId) ||
        startId - tamanho === Number(targetId) ||
        startId - tamanho + 1 === Number(targetId) ||
        startId - tamanho - 1 === Number(targetId)
    ) {
        return true
    }
    return false
}
