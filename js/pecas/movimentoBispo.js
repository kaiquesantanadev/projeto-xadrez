function movimentoBispo(startId, targetId, tamanho) {
    // Movimento diagonal para cima-direita
    for (let i = 1; i < tamanho; i++) {
        if (startId - tamanho * i + i === Number(targetId)) {
            for (let j = 1; j < i; j++) {
                if (document.querySelector(`[quadrado-id="${startId - tamanho * j + j}"]`).firstChild) {
                    return false; 
                }
            }
            return true; 
        }
    }

    for (let i = 1; i < tamanho; i++) {
        if (startId - tamanho * i - i === Number(targetId)) {
            for (let j = 1; j < i; j++) {
                if (document.querySelector(`[quadrado-id="${startId - tamanho * j - j}"]`).firstChild) {
                    return false; 
                }
            }
            return true; 
        }
    }

    for (let i = 1; i < tamanho; i++) {
        if (startId + tamanho * i + i === Number(targetId)) {
            for (let j = 1; j < i; j++) {
                if (document.querySelector(`[quadrado-id="${startId + tamanho * j + j}"]`).firstChild) {
                    return false; 
                }
            }
            return true; 
        }
    }

    for (let i = 1; i < tamanho; i++) {
        if (startId + tamanho * i - i === Number(targetId)) {
            for (let j = 1; j < i; j++) {
                if (document.querySelector(`[quadrado-id="${startId + tamanho * j - j}"]`).firstChild) {
                    return false; 
                }
            }
            return true; 
        }
    }

    return false;
}
