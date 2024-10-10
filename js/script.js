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
        const quadrado = document.createElement('div')
        quadrado.setAttribute('quadrado-id', i)
        quadrado.innerHTML = peca

        // verifica se o quadrado tem uma peça, se tiver deixa draggable
        quadrado.firstChild && quadrado.firstChild.setAttribute('draggable', true) 

        quadrado.classList.add('quadrado')
        const linha = Math.floor((63 - i) / 8) + 1

        // renderiza a linha em malha
        if (linha % 2 === 0) {
            quadrado.classList.add(i % 2 === 0 ? 'claro' : 'escuro')
        } else {
            quadrado.classList.add(i % 2 === 0 ? 'escuro' : 'claro')
        }
        tabuleiro.append(quadrado)

        // coloca cores pras peças
        if (i <= 15) {
            quadrado.firstChild.firstChild.classList.add('pecas-escuras')
        } else if (i >= 48 ) {
            quadrado.firstChild.firstChild.classList.add('pecas-claras')
        }


        

    })
}

criarTabuleiro()

const allQuadrados = document.querySelectorAll('#gameboard .quadrado')

allQuadrados.forEach((quadrado) => {
    quadrado.addEventListener('dragstart', dragStart)
    quadrado.addEventListener('dragover', dragOver)
    quadrado.addEventListener('drop', dragDrop)
})

let posicaoInicialId;
let draggedElement

function dragStart(e) {
    posicaoInicialId = e.target.parentNode.getAttribute('quadrado-id')
    draggedElement = e.target
}

function dragOver(e) {
    e.preventDefault() 
}

function dragDrop(e) {
    e.stopPropagation()
    e.target.parentNode.append(draggedElement)
    e.target.remove()
    
    // pegando a casa e dando append nela a peça draggada
}