function movimentoPeao(startId, targetId, tamanho) {
    const linhaInicial = [48, 49, 50, 51, 52, 53, 54, 55];

    if (
        (linhaInicial.includes(startId) && startId - tamanho * 2 === Number(targetId)) && !document.querySelector(`[quadrado-id="${startId - tamanho}"]`).firstChild ||
        (startId - tamanho === Number(targetId)) ||
        (startId - tamanho - 1 === Number(targetId) && document.querySelector(`[quadrado-id="${startId - tamanho - 1}"]`).firstChild) || // Movimento diagonal esquerda
        (startId - tamanho + 1 === Number(targetId) && document.querySelector(`[quadrado-id="${startId - tamanho + 1}"]`).firstChild) // Movimento diagonal direita
    ) {
        // promoverPeao(targetId);
        return true;
    }
    return false;
}

function promoverPeao(targetId) {
    const linhaFinal = [0, 1, 2, 3, 4, 5, 6, 7];

    if (linhaFinal.includes(Number(targetId))) {
        while (true) {
            const escolha = prompt("Escolha uma peça para promoção: dama, torre, cavalo, bispo");
            switch (escolha) {
                case 'dama':
                    console.log('dama teste')
                    break;
                case 'torre':
                    console.log('dama teste')
                    break;

                case 'cavalo':
                    console.log('dama teste')
                    break;

                case 'bispo':
                    console.log('dama teste')
                    break;
                default:
                    alert('Insira uma peça válida.')
                    continue;
            }
            break;
        }
    }
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

    // Movimentos do cavalo
    const cavaloMoves = [
        Number(posicaoRei) - tamanho * 2 - 1,
        Number(posicaoRei) - tamanho * 2 + 1,
        Number(posicaoRei) - tamanho * 1 - 2,
        Number(posicaoRei) - tamanho * 1 + 2,
        Number(posicaoRei) + tamanho * 2 - 1,
        Number(posicaoRei) + tamanho * 2 + 1,
        Number(posicaoRei) + tamanho * 1 - 2,
        Number(posicaoRei) + tamanho * 1 + 2
    ];

    // Movimentos do peão
    const peaoMoves = [
        Number(posicaoRei) + tamanho - 1,
        Number(posicaoRei) + tamanho + 1,
        Number(posicaoRei) - tamanho - 1,
        Number(posicaoRei) - tamanho + 1
    ];

    // Movimentos da torre 
    // (coloca todos os movimentos possiveis da torre num array )
    const torreMoves = [];
    for (let i = 1; i < tamanho; i++) {
        if (Number(posicaoRei) - tamanho * i >= 0) { // vertical cima
            torreMoves.push(Number(posicaoRei) - tamanho * i);
            if (document.querySelector(`[quadrado-id="${Number(posicaoRei) - tamanho * i}"]`).firstChild) break;
        } else break;
    }
    for (let i = 1; i < tamanho; i++) {
        if (Number(posicaoRei) + tamanho * i < tamanho * tamanho) {         // Vertical baixo
            torreMoves.push(Number(posicaoRei) + tamanho * i);
            if (document.querySelector(`[quadrado-id="${Number(posicaoRei) + tamanho * i}"]`).firstChild) break;
        } else break;
    }
    for (let i = 1; i < tamanho; i++) {
        if (Number(posicaoRei) - i >= 0 && (Number(posicaoRei) - i) % tamanho !== tamanho - 1) {
            torreMoves.push(Number(posicaoRei) - i);
            if (document.querySelector(`[quadrado-id="${Number(posicaoRei) - i}"]`).firstChild) break;
        } else break;
    }
    for (let i = 1; i < tamanho; i++) {
        if (Number(posicaoRei) + i < tamanho * tamanho && (Number(posicaoRei) + i) % tamanho !== 0) {
            torreMoves.push(Number(posicaoRei) + i);
            if (document.querySelector(`[quadrado-id="${Number(posicaoRei) + i}"]`).firstChild) break;
        } else break;
    }

    const reiMoves = [
        Number(posicaoRei) - 1,
        Number(posicaoRei) + 1,
        Number(posicaoRei) + tamanho,
        Number(posicaoRei) + tamanho + 1,
        Number(posicaoRei) + tamanho - 1,
        Number(posicaoRei) - tamanho,
        Number(posicaoRei) - tamanho + 1,
        Number(posicaoRei) - tamanho - 1
    ];

    const bispoMoves = [];
    for (let i = 1; i < tamanho; i++) {
        // Diagonal superior esquerda
        if (Number(posicaoRei) - tamanho * i - i >= 0 && (Number(posicaoRei) - tamanho * i - i) % tamanho !== tamanho - 1) {
            bispoMoves.push(Number(posicaoRei) - tamanho * i - i);
            if (document.querySelector(`[quadrado-id="${Number(posicaoRei) - tamanho * i - i}"]`).firstChild) break;
        } else break;
    }
    for (let i = 1; i < tamanho; i++) {
        // Diagonal superior direita
        if (Number(posicaoRei) - tamanho * i + i >= 0 && (Number(posicaoRei) - tamanho * i + i) % tamanho !== 0) {
            bispoMoves.push(Number(posicaoRei) - tamanho * i + i);
            if (document.querySelector(`[quadrado-id="${Number(posicaoRei) - tamanho * i + i}"]`).firstChild) break;
        } else break;
    }
    for (let i = 1; i < tamanho; i++) {
        // Diagonal inferior esquerda
        if (Number(posicaoRei) + tamanho * i - i < tamanho * tamanho && (Number(posicaoRei) + tamanho * i - i) % tamanho !== tamanho - 1) {
            bispoMoves.push(Number(posicaoRei) + tamanho * i - i);
            if (document.querySelector(`[quadrado-id="${Number(posicaoRei) + tamanho * i - i}"]`).firstChild) break;
        } else break;
    }
    for (let i = 1; i < tamanho; i++) {
        // Diagonal inferior direita
        if (Number(posicaoRei) + tamanho * i + i < tamanho * tamanho && (Number(posicaoRei) + tamanho * i + i) % tamanho !== 0) {
            bispoMoves.push(Number(posicaoRei) + tamanho * i + i);
            if (document.querySelector(`[quadrado-id="${Number(posicaoRei) + tamanho * i + i}"]`).firstChild) break;
        } else break;
    }

    const rainhaMoves = [...torreMoves, ...bispoMoves]

    // cada some ve se o movimento resulta numa peça inimiga, ou seja, se o cavalomove resulta num cavalo inimigo e blabla
    return cavaloMoves.some(move => {
        const targetSquare = document.querySelector(`[quadrado-id="${move}"]`);
        return targetSquare && targetSquare.firstChild && targetSquare.firstChild.id === 'cavalo' && targetSquare.firstChild.firstChild.classList.contains(opponentColor);
    }) || peaoMoves.some(move => {
        const targetSquare = document.querySelector(`[quadrado-id="${move}"]`);
        return targetSquare && targetSquare.firstChild && targetSquare.firstChild.id === 'peao' && targetSquare.firstChild.firstChild.classList.contains(opponentColor);
    }) || torreMoves.some(move => {
        const targetSquare = document.querySelector(`[quadrado-id="${move}"]`);
        return targetSquare && targetSquare.firstChild && targetSquare.firstChild.id === 'torre' && targetSquare.firstChild.firstChild.classList.contains(opponentColor);
    }) || reiMoves.some(move => {
        const targetSquare = document.querySelector(`[quadrado-id="${move}"]`);
        return targetSquare && targetSquare.firstChild && targetSquare.firstChild.id === 'rei' && targetSquare.firstChild.firstChild.classList.contains(opponentColor);
    }) || bispoMoves.some(move => {
        const targetSquare = document.querySelector(`[quadrado-id="${move}"]`);
        return targetSquare && targetSquare.firstChild && targetSquare.firstChild.id === 'bispo' && targetSquare.firstChild.firstChild.classList.contains(opponentColor);
    }) || rainhaMoves.some(move => {
        const targetSquare = document.querySelector(`[quadrado-id="${move}"]`);
        return targetSquare && targetSquare.firstChild && targetSquare.firstChild.id === 'rainha' && targetSquare.firstChild.firstChild.classList.contains(opponentColor);
    });;
    ;
}