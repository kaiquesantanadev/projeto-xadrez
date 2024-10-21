function mudarVez() {
    const allPieces = document.querySelectorAll('.piece');

    if (vezJogador === 'brancas') {
        revertIds()
        vezJogador = 'escuras'
    } else {
        reverseIds()
        vezJogador = "brancas"
    }
    jogadorDaVez.textContent = `${jogadores[vezJogador]} (${vezJogador})`;

    allPieces.forEach(piece => {
        if (piece.firstChild.classList.contains(vezJogador)) {
            piece.firstChild.style.opacity = '1'; // Peças do jogador ativo em cor normal
        } else {
            piece.firstChild.style.opacity = '0.5'; // Peças do oponente menos destacáveis
        }
    });
}

function reverseIds() {
    const allQuadrados = document.querySelectorAll('.quadrado')
    allQuadrados.forEach((quadrado, i) => {
        quadrado.setAttribute('quadrado-id', i)  // atribui IDs de 0 a 63 para a perspectiva preta
    })
}

function revertIds() {
    const allQuadrados = document.querySelectorAll('.quadrado')
    allQuadrados.forEach((quadrado, i) => {
        quadrado.setAttribute('quadrado-id', (tamanho * tamanho - 1) - i)  // atribui IDs de 63 a 0 para a perspectiva branca
    })
}
