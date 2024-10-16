function movimentoCavalo(startId, targetId, tamanho) {
    if (
        startId - tamanho * 2 - 1 === Number(targetId) ||
        startId - tamanho * 2 + 1 === Number(targetId) ||
        startId - tamanho * 1 - 2 === Number(targetId) ||
        startId - tamanho * 1 + 2 === Number(targetId) ||
        startId + tamanho * 2 - 1 === Number(targetId) ||
        startId + tamanho * 2 + 1 === Number(targetId) ||
        startId + tamanho * 1 - 2 === Number(targetId) ||
        startId + tamanho * 1 + 2 === Number(targetId)
    ) {
        return true
    }
    return false
}