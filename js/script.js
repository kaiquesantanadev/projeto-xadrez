let posicaoInicialId;
let draggedElement

const tabuleiro = document.querySelector('#gameboard')
const jogadorDaVez = document.querySelector('#player')
const infoDisplay = document.querySelector('#info-display')
const tamanho = 8
let vezJogador = 'white'
jogadorDaVez.textContent = vezJogador
const tabuleiroMatriz = [
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
    tabuleiroMatriz.forEach((peca, i) => {
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



function mudarVez() {
    if (vezJogador === 'white') {
        revertIds()
        vezJogador = "black"
        jogadorDaVez.textContent = "black"
    } else {
        reverseIds()
        vezJogador = "white"
        jogadorDaVez.textContent = "white"
    }
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

function dragStart(e) {
    posicaoInicialId = e.target.parentNode.getAttribute('quadrado-id')
    draggedElement = e.target
}

function dragOver(e) {
    e.preventDefault() // evitar bugs de disparar o evento de drag over a cada lugar q passo
}

function dragDrop(e) {
    e.stopPropagation() // evita bugs do drag and drop nao ser tratado no llugar especifico
    const valid = checaValido(e.target)
    const vezCorreta = draggedElement.firstChild.classList.contains(vezJogador) // verifica se a peça mexida tem a classe correta, ou seja vez do jogador black deve mexer uma peça que contem a classe black
    const vezOponente = vezJogador === "white" ? "black" : "white";
    const temPeca = e.target.classList.contains('piece') // verifica se a casa atual possui alguma peça nela
    const temPecaOponente = e.target.firstChild?.classList.contains(vezOponente)

    if (vezCorreta) {
        if (temPecaOponente && valid) { // movimentacao pra uma casa que tem oponente
            e.target.parentNode.append(draggedElement) // colocando na casa dropada a peça que foi arrastada
            e.target.remove()
            audioMovimento.play()
            mudarVez()
            return

        }
        if (temPeca && !temPecaOponente) { // verifica se a peça que foi jogada foi jogada pra um local que existe uma peça e que é do proprio time
            audioNegacao.play();
            infoDisplay.textContent = "Não é possível eliminar sua própria peça!"
            setTimeout(() => infoDisplay.textContent = '', 2500)
            return
        }
        if (valid) { // movimentacao pra uma casa que nao tem oponente
            e.target.append(draggedElement)
            audioMovimento.play()
            mudarVez()
            return
        }
    } else {
        audioNegacao.play();
        infoDisplay.textContent = `Não é possivel fazer esse movimento! É a vez de ${vezJogador}`
        setTimeout(() => infoDisplay.textContent = '', 2500)
    }

}

function checaValido(target) {
    const targetId = Number(target.getAttribute('quadrado-id')) || target.parentNode.getAttribute('quadrado-id') // pega o id do quadrado onde foi dropado
    const startId = Number(posicaoInicialId) // pega o id do quadrado de onde a peça saiu
    const peca = draggedElement.id // pega qual o nome da peça indo pelo seu id (que obviamente tem o nome da peça)
    switch (peca) {
        case 'peao':
            const linhaInicial = [48, 49, 50, 51, 52, 53, 54, 55] // id dos quadrados onde o peao nasce no comeco da partida
            if (
                linhaInicial.includes(startId) && startId - tamanho * 2 === targetId || // verifica se o destino é a mesma caasa a 2 linhas a frente para jogadas iniciais de peao
                startId - tamanho === targetId || // movimenta 1 pra frente
                startId - tamanho - 1 === Number(targetId) && document.querySelector(`[quadrado-id="${startId - tamanho - 1}"]`).firstChild || // diagonal esquerda
                startId - tamanho + 1 === Number(targetId) && document.querySelector(`[quadrado-id="${startId - tamanho + 1}"]`).firstChild // diagonal direita

            ) {
                return true
            } else {
                audioNegacao.play()
            }
            break;
        case 'cavalo':
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
            } else {
                audioNegacao.play()
            }
            break;
        case 'bispo':
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
            } else {
                audioNegacao.play()
            }
            break;
        case 'torre':
            if
                (
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
            } else {
                audioNegacao.play()
            }
            break;
        case "rainha":
            if (

                // movimentos do bispo
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
                startId - tamanho * 7 + 7 === Number(targetId) && !document.querySelector(`[quadrado-id="${startId - tamanho + 1}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 2 + 2}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 3 + 3}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 4 + 4}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 5 + 5}"]`).firstChild && !document.querySelector(`[quadrado-id="${startId - tamanho * 6 + 6}"]`).firstChild ||

                // movimentos de torre

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
            } else {
                audioNegacao.play()
            }
            break;
        case 'rei':
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
            } else {
                audioNegacao.play()
            }
        default:
            audioNegacao.play
            break;

    }

}



