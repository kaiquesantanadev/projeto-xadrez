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
    e.stopPropagation(); // Evita bugs do drag and drop não ser tratado no lugar específico
    const valid = checaValido(e.target); // Ignorando checaValido conforme solicitado
    const vezCorreta = draggedElement.firstChild.classList.contains(vezJogador); // Verifica se a peça mexida tem a classe correta
    const vezOponente = vezJogador === "white" ? "black" : "white";
    const temPeca = e.target.classList.contains('piece'); // Verifica se a casa atual possui alguma peça nela
    const temPecaOponente = e.target.firstChild?.classList.contains(vezOponente);
    const draggedPieceId = draggedElement.id; // Verifica se a peça é o rei

    const origem = document.querySelector(`[quadrado-id='${posicaoInicialId}']`);

    if (vezCorreta) {

        if (temPecaOponente && valid) {
            e.target.parentNode.append(draggedElement); // Colocando na casa dropada a peça que foi arrastada
            if (draggedPieceId === 'rei' && isKingInCheck(vezJogador)) {
                alert('Não é possível mover o rei para essa posição, ele ficaria em xeque!');
                origem.append(draggedElement); // Volta o rei para sua posição original
                return;
            }
            e.target.remove();
            

            audioMovimento.play();
            if (isKingInCheck(vezOponente)) {
                alert(`Xeque no rei ${vezOponente}!`);
            }
            mudarVez();
            return;
        }


        if (temPeca && !temPecaOponente) { // Verifica se a peça que foi jogada foi jogada pra um local que existe uma peça e que é do próprio time
            audioNegacao.play();
            infoDisplay.textContent = "Não é possível eliminar sua própria peça!";
            setTimeout(() => infoDisplay.textContent = '', 2500);
            return;
        }


        if (valid) { // Movimentação pra uma casa que não tem oponente
            e.target.append(draggedElement);
            if (draggedPieceId === 'rei' && isKingInCheck(vezJogador, e.target.getAttribute('quadrado-id'))) {
                alert('Não é possível mover o rei para essa posição, ele ficaria em xeque!');
                origem.append(draggedElement); // Volta o rei para sua posição original
                return;
            }
            audioMovimento.play();
            if (isKingInCheck(vezOponente)) {
                alert(`Xeque no rei ${vezOponente}!`);
            }
            mudarVez();
            return;
        }

        
    } else {
        audioNegacao.play();
        infoDisplay.textContent = `Não é possível fazer esse movimento! É a vez de ${vezJogador}`;
        setTimeout(() => infoDisplay.textContent = '', 2500);
    }
}


function checaValido(target) {
    const targetId = Number(target.getAttribute('quadrado-id')) || target.parentNode.getAttribute('quadrado-id') // pega o id do quadrado onde foi dropado
    const startId = Number(posicaoInicialId) // pega o id do quadrado de onde a peça saiu
    const peca = draggedElement.id // pega qual o nome da peça indo pelo seu id (que obviamente tem o nome da peça)
    switch (peca) {
        case 'peao':
            if (movimentoPeao(startId, targetId, tamanho)) {
                return true
            } else {
                audioNegacao.play()
            }
            break;
        case 'cavalo':
            if (movimentoCavalo(startId, targetId, tamanho)) {
                return true
            } else {
                audioNegacao.play()
            }
            break;
        case 'bispo':
            if (movimentoBispo(startId, targetId, tamanho)) {
                return true
            } else {
                audioNegacao.play()
            }
            break;
        case 'torre':
            if (movimentoTorre(startId, targetId, tamanho)) {
                return true
            } else {
                audioNegacao.play()
            }
            break;
        case "rainha":
            if (movimentoBispo(startId, targetId, tamanho) || movimentoTorre(startId, targetId, tamanho)) {
                return true
            } else {
                audioNegacao.play()
            }
            break;
        case 'rei':
            if (movimentoRei(startId, targetId, tamanho)) {
                return true
            } else {
                audioNegacao.play()
            }
        default:
            audioNegacao.play()
            break;

    }

}



