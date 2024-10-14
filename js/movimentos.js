function movimentoPeao(startId, targetId, tamanho) {
    const linhaInicial = [48, 49, 50, 51, 52, 53, 54, 55];

    if (
        (linhaInicial.includes(startId) && startId - tamanho * 2 === targetId) ||
        (startId - tamanho === targetId) || // Movimenta 1 casa para frente
        (startId - tamanho - 1 === Number(targetId) && document.querySelector(`[quadrado-id="${startId - tamanho - 1}"]`).firstChild) || // Movimento diagonal esquerda
        (startId - tamanho + 1 === Number(targetId) && document.querySelector(`[quadrado-id="${startId - tamanho + 1}"]`).firstChild) // Movimento diagonal direita
    ) {
        return true;
    }
    return false;
}

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

function movimentoBispo(startId, targetId, tamanho) {
    if (
        startId - tamanho * 1 - 1 === Number(targetId) ||
        startId - tamanho * 2 - 2 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId - tamanho - 1}"]`).firstChild ||
        startId - tamanho * 3 - 3 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId - tamanho - 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 2 - 2}"]`).firstChild ||
        startId - tamanho * 4 - 4 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId - tamanho - 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 2 - 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 3 - 3}"]`).firstChild ||
        startId - tamanho * 5 - 5 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId - tamanho - 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 2 - 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 3 - 3}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 4 - 4}"]`).firstChild ||
        startId - tamanho * 6 - 6 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId - tamanho - 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 2 - 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 3 - 3}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 4 - 4}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 5 - 5}"]`).firstChild ||
        startId - tamanho * 7 - 7 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId - tamanho - 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 2 - 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 3 - 3}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 4 - 4}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 5 - 5}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 6 - 6}"]`).firstChild ||

        startId + tamanho * 1 + 1 === Number(targetId) ||
        startId + tamanho * 2 + 2 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId + tamanho + 1}"]`).firstChild ||
        startId + tamanho * 3 + 3 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId + tamanho + 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 2 + 2}"]`).firstChild ||
        startId + tamanho * 4 + 4 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId + tamanho + 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 2 + 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 3 + 3}"]`).firstChild ||
        startId + tamanho * 5 + 5 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId + tamanho + 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 2 + 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 3 + 3}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 4 + 4}"]`).firstChild ||
        startId + tamanho * 6 + 6 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId + tamanho + 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 2 + 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 3 + 3}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 4 + 4}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 5 + 5}"]`).firstChild ||
        startId + tamanho * 7 + 7 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId + tamanho + 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 2 + 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 3 + 3}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 4 + 4}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 5 + 5}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 6 + 6}"]`).firstChild ||

        startId + tamanho * 1 - 1 === Number(targetId) ||
        startId + tamanho * 2 - 2 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId + tamanho - 1}"]`).firstChild ||
        startId + tamanho * 3 - 3 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId + tamanho - 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 2 - 2}"]`).firstChild ||
        startId + tamanho * 4 - 4 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId + tamanho - 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 2 - 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 3 - 3}"]`).firstChild ||
        startId + tamanho * 5 - 5 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId + tamanho - 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 2 - 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 3 - 3}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 4 - 4}"]`).firstChild ||
        startId + tamanho * 6 - 6 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId + tamanho - 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 2 - 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 3 - 3}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 4 - 4}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 5 - 5}"]`).firstChild ||
        startId + tamanho * 7 - 7 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId + tamanho - 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 2 - 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 3 - 3}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 4 - 4}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 5 - 5}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 6 - 6}"]`).firstChild ||

        startId - tamanho * 1 + 1 === Number(targetId) ||
        startId - tamanho * 2 + 2 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId - tamanho + 1}"]`).firstChild ||
        startId - tamanho * 3 + 3 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId - tamanho + 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 2 + 2}"]`).firstChild ||
        startId - tamanho * 4 + 4 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId - tamanho + 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 2 + 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 3 + 3}"]`).firstChild ||
        startId - tamanho * 5 + 5 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId - tamanho + 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 2 + 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 3 + 3}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 4 + 4}"]`).firstChild ||
        startId - tamanho * 6 + 6 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId - tamanho + 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 2 + 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 3 + 3}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 4 + 4}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 5 + 5}"]`).firstChild ||
        startId - tamanho * 7 + 7 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId - tamanho + 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 2 + 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 3 + 3}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 4 + 4}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 5 + 5}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 6 + 6}"]`).firstChild
    ) {
        return true
    }
    return false
}

function movimentoTorre(startId, targetId, tamanho) {
    if (
        startId - tamanho === Number(targetId) ||
        startId - tamanho * 2 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId - tamanho}"]`).firstChild ||
        startId - tamanho * 3 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId - tamanho}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 2}"]`).firstChild ||
        startId - tamanho * 4 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId - tamanho}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 3}"]`).firstChild ||
        startId - tamanho * 5 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId - tamanho}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 3}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 4}"]`).firstChild ||
        startId - tamanho * 6 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId - tamanho}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 3}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 4}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 5}"]`).firstChild ||
        startId - tamanho * 7 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId - tamanho}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 3}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 4}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 5}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 6}"]`).firstChild ||

        startId + tamanho === Number(targetId) ||
        startId + tamanho * 2 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId + tamanho}"]`).firstChild ||
        startId + tamanho * 3 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId + tamanho}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 2}"]`).firstChild ||
        startId + tamanho * 4 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId + tamanho}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 3}"]`).firstChild ||
        startId + tamanho * 5 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId + tamanho}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 3}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 4}"]`).firstChild ||
        startId + tamanho * 6 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId + tamanho}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 3}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 4}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 5}"]`).firstChild ||
        startId + tamanho * 7 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId + tamanho}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 3}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 4}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 5}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + tamanho * 6}"]`).firstChild ||

        startId + 1 === Number(targetId) ||
        startId + 2 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId + 1}"]`).firstChild ||
        startId + 3 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId + 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + 2}"]`).firstChild ||
        startId + 4 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId + 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + 3}"]`).firstChild ||
        startId + 5 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId + 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + 3}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + 4}"]`).firstChild ||
        startId + 6 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId + 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + 3}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + 4}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + 5}"]`).firstChild ||
        startId + 7 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId + 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + 3}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + 4}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + 5}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId + 6}"]`).firstChild ||

        startId - 1 === Number(targetId) ||
        startId - 2 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId - 1}"]`).firstChild ||
        startId - 3 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId - 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - 2}"]`).firstChild ||
        startId - 4 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId - 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - 3}"]`).firstChild ||
        startId - 5 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId - 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - 3}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - 4}"]`).firstChild ||
        startId - 6 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId - 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - 3}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - 4}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - 5}"]`).firstChild ||
        startId - 7 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId - 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - 3}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - 4}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - 5}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - 6}"]`).firstChild
    ) {
        return true
    }
    return false
}


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

function isKingInCheck(color) {
    const posicaoRei = Array.from(document.querySelectorAll('.piece')).find(peca => peca.id === 'rei' && peca.firstChild.classList.contains(color)).parentNode.getAttribute('quadrado-id');
    const opponentColor = color === 'white' ? 'black' : 'white';
    const cavaleiroMoves = [
        Number(posicaoRei) - tamanho * 2 - 1,
        Number(posicaoRei) - tamanho * 2 + 1,
        Number(posicaoRei) - tamanho * 1 - 2,
        Number(posicaoRei) - tamanho * 1 + 2,
        Number(posicaoRei) + tamanho * 2 - 1,
        Number(posicaoRei) + tamanho * 2 + 1,
        Number(posicaoRei) + tamanho * 1 - 2,
        Number(posicaoRei) + tamanho * 1 + 2
    ];

    return cavaleiroMoves.some(move => {
        const targetSquare = document.querySelector(`[quadrado-id="${move}"]`);
        return targetSquare && targetSquare.firstChild && targetSquare.firstChild.id === 'cavalo' && targetSquare.firstChild.firstChild.classList.contains(opponentColor);
    });
}
