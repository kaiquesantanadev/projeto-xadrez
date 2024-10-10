const tabuleiro = document.querySelector('#gameboard')
const jogadorDaVez = document.querySelector('#player')
const infoDisplay = document.querySelector('#info-display')
const tamanho = 8
const startPieces = [
    torre, cavalo, bispo, rainha, rei, bispo, cavalo, torre,
    peao, peao, peao, peao, peao, peao, peao, peao,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    peao, peao, peao, peao, peao, peao, peao, peao,
    torre, cavalo, bispo, rainha, rei, bispo, cavalo, torre,
]

function criarTabuleiro() {
    startPieces.forEach((peca, i) => {
        const quadrado =document.createElement('div')
        quadrado.setAttribute('quadrado-id', i)
        quadrado.innerHTML = peca
        quadrado.classList.add('quadrado')
        const linha = Math.floor((63 - i) / 8) + 1
        if (linha % 2 === 0) {
            quadrado.classList.add(i % 2 === 0 ? 'claro' : 'escuro')
        } else {
            quadrado.classList.add(i % 2 === 0 ? 'escuro' : 'claro')
        }
        tabuleiro.append(quadrado)
    })
}

criarTabuleiro()