function movimentoTorre(startId, targetId, tamanho) {
    for (let i = 1; i < tamanho; i++) { // vertical cima
        if (startId - tamanho * i === Number(targetId)) {
            for (let j = 1; j < i; j++) {
                if (document.querySelector(`[quadrado-id="${startId - tamanho * j}"]`).firstChild) {
                    return false;
                }
            }
            return true;
        }
    }
    for (let i = 1; i < tamanho; i++) { //vertical baixo
        if (startId + tamanho * i === Number(targetId)) {
            for (let j = 1; j < i; j++) {
                if (document.querySelector(`[quadrado-id="${startId + tamanho * j}"]`).firstChild) {
                    return false;
                }
            }
            return true;
        }
    }
    for (let i = 1; i < tamanho; i++) { // horizontal direita
        if (startId + i === Number(targetId) && Math.floor((startId + i) / tamanho) === Math.floor(startId / tamanho)) {
            for (let j = 1; j < i; j++) {
                if (document.querySelector(`[quadrado-id="${startId + j}"]`).firstChild) {
                    return false;
                }
            }
            return true;
        }
    }
    for (let i = 1; i < tamanho; i++) { // horizontal eesquerda
        if (startId - i === Number(targetId) && Math.floor((startId - i) / tamanho) === Math.floor(startId / tamanho)) {
            for (let j = 1; j < i; j++) {
                if (document.querySelector(`[quadrado-id="${startId - j}"]`).firstChild) {
                    return false;
                }
            }
            return true;
        }
    }

    return false;
}
