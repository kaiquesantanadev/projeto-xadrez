function movimentoBispo(startId, targetId, tamanho) {
    // Movimento diagonal para cima-direita
    for (let i = 1; i < tamanho; i++) {
        if (startId - tamanho * i + i === Number(targetId)) {
            for (let j = 1; j < i; j++) {
                if (document.querySelector(`[quadrado-id="${startId - tamanho * j + j}"]`).firstChild) {
                    return false; // Se houver uma peça no caminho, o movimento é inválido
                }
            }
            return true; // Movimento válido
        }
    }

    // Movimento diagonal para cima-esquerda
    for (let i = 1; i < tamanho; i++) {
        if (startId - tamanho * i - i === Number(targetId)) {
            for (let j = 1; j < i; j++) {
                if (document.querySelector(`[quadrado-id="${startId - tamanho * j - j}"]`).firstChild) {
                    return false; // Se houver uma peça no caminho, o movimento é inválido
                }
            }
            return true; // Movimento válido
        }
    }

    // Movimento diagonal para baixo-direita
    for (let i = 1; i < tamanho; i++) {
        if (startId + tamanho * i + i === Number(targetId)) {
            for (let j = 1; j < i; j++) {
                if (document.querySelector(`[quadrado-id="${startId + tamanho * j + j}"]`).firstChild) {
                    return false; // Se houver uma peça no caminho, o movimento é inválido
                }
            }
            return true; // Movimento válido
        }
    }

    // Movimento diagonal para baixo-esquerda
    for (let i = 1; i < tamanho; i++) {
        if (startId + tamanho * i - i === Number(targetId)) {
            for (let j = 1; j < i; j++) {
                if (document.querySelector(`[quadrado-id="${startId + tamanho * j - j}"]`).firstChild) {
                    return false; // Se houver uma peça no caminho, o movimento é inválido
                }
            }
            return true; // Movimento válido
        }
    }

    return false; // Se não for um movimento diagonal válido, retorna falso
}
