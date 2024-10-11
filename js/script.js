const tabuleiro = document.querySelector('#gameboard')
const jogadorDaVez = document.querySelector('#player')
const infoDisplay = document.querySelector('#info-display')
const tamanho = 8
let vezJogador = 'white'
jogadorDaVez.textContent = vezJogador


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
            quadrado.firstChild.firstChild.classList.add('black')
        } else if (i >= 48) {
            quadrado.firstChild.firstChild.classList.add('white')
        }

    })
}

criarTabuleiro()

const allQuadrados = document.querySelectorAll('.quadrado')

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
    console.log(draggedElement)
    const vezCorreta = draggedElement.firstChild.classList.contains(vezJogador) // verifica se a peça mexida tem a classe correta, ou seja vez do jogador black deve mexer uma peça que contem a classe black
    const vezOponente = vezJogador === "white" ? "black": "white";
    const temPeca = e.target.classList.contains('piece') // verifica se a casa atual possui alguma peça nela
    const temPecaOponente = e.target.firstChild?.classList.contains(vezOponente)

    if (vezCorreta) {
         if (temPecaOponente) {
              e.target.parentNode.append(draggedElement) // colocando na casa dropada a peça que foi arrastada
              e.target.remove()
              mudarVez()
              return

        }
        if (temPeca && !temPecaOponente) { // verifica se a peça que foi jogada foi jogada pra um local que existe uma peça e que é do proprio time
            audioNegacao.play();
            infoDisplay.textContent = "Não é possível eliminar sua própria peça!"
            setTimeout(() => infoDisplay.textContent = '', 2500)
            return
        }
    } else {
        audioNegacao.play();
        infoDisplay.textContent = `Não é possivel fazer esse movimento! É a vez de ${vezJogador}`
        setTimeout(() => infoDisplay.textContent = '', 2500)
    }

}

function mudarVez() {
    if (vezJogador === 'white') {
        reverseIds()
        vezJogador = "black"
        jogadorDaVez.textContent = "black"
    } else {
        revertIds()
        vezJogador = "white"
        jogadorDaVez.textContent = "white"
    }
}

function reverseIds() {
    const allQuadrados = document.querySelectorAll('.quadrado')
    allQuadrados.forEach((quadrado, i) => {
        quadrado.setAttribute('quadrado-id', (tamanho * tamanho - 1) - i)
    })
}

function revertIds() {
    const allQuadrados = document.querySelectorAll('.quadrado')
    allQuadrados.forEach((quadrado, i) => { quadrado.setAttribute('quadrado-id', i) })
}
