function isKingInCheck(color) {
    const posicaoRei = Array.from(document.querySelectorAll('.piece')).find(peca => peca.id === 'rei' && peca.firstChild.classList.contains(color)).parentNode.getAttribute('quadrado-id');
    const opponentColor = color === 'brancas' ? 'escuras' : 'brancas';

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