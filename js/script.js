const urlParams = new URLSearchParams(window.location.search);
let jogador1 = urlParams.get('jogador1') || 'Jogador 1';
let jogador2 = urlParams.get('jogador2') || 'Jogador 2';

if (jogador1.length > 12) jogador1 = 'Jogador 1'
if (jogador2.length > 12) jogador2 = 'Jogador 2'

const jogadorBranco = Math.random() < 0.5 ? jogador1 : jogador2;
const jogadorPreto = jogadorBranco === jogador1 ? jogador2 : jogador1;
const jogadores = {
    white: jogadorBranco,
    black: jogadorPreto
};


const tabuleiro = document.querySelector('#gameboard')
const jogadorDaVez = document.querySelector('#player')
const infoDisplay = document.querySelector('#info-display')
const botaoDesistir = document.querySelector('#desistir')
const botaoEmpatar = document.querySelector('#empate')
const tamanho = 8
let vezJogador = 'white'
jogadorDaVez.textContent = jogadores[vezJogador]
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

let posicaoInicialId;
let draggedElement

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
        vezJogador = 'black'
        jogadorDaVez.textContent = jogadores[vezJogador];
    } else {
        reverseIds()
        vezJogador = "white"
        jogadorDaVez.textContent = jogadores[vezJogador];
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
    const valid = checaValido(e.target);
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
            checaVitoria()
            if (isKingInCheck(vezOponente)) {
                alert(`Xeque no rei de ${jogadores[vezOponente]}!`);
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
            checaVitoria()
            if (draggedPieceId === 'rei' && isKingInCheck(vezJogador, e.target.getAttribute('quadrado-id'))) {
                alert('Não é possível mover o rei para essa posição, ele ficaria em xeque!');
                origem.append(draggedElement); // Volta o rei para sua posição original
                return;
            }
            audioMovimento.play();
            if (isKingInCheck(vezOponente)) {
                alert(`Xeque no rei de ${jogadores[vezOponente]}!`);
            }
            mudarVez();
            return;
        }
    } else {
        audioNegacao.play();
        infoDisplay.textContent = `Não é possível fazer esse movimento! É a vez de ${jogadores[vezJogador]}`;
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

function checaVitoria() {
    const reis = Array.from(document.querySelectorAll('#rei'))
    console.log(reis)
    if (!reis.some(rei => rei.firstChild.classList.contains('white'))) {
        infoDisplay.innerHTML = `${jogadores.black} venceu a partida!`
        const allQuadrados = document.querySelectorAll('.quadrado')
        allQuadrados.forEach(quadrado => {
            quadrado.firstChild?.setAttribute('draggable', false)
        })
        return
    }
    
    if (!reis.some(rei => rei.firstChild.classList.contains('black'))) {
        infoDisplay.innerHTML = `${jogadores.white} venceu a partida!`
        const allQuadrados = document.querySelectorAll('.quadrado')
        allQuadrados.forEach(quadrado => {
            quadrado.firstChild?.setAttribute('draggable', false)
        })
        return
    }
}

function checaVitoria() {
    const reis = Array.from(document.querySelectorAll('#rei'));
    const vitoriaDisplay = document.getElementById('vitoria-display');
    const tituloInformacao = document.getElementById('titulo-informacao')
    const mensagemVencedor = document.getElementById('mensagem-vencedor');
    
    // Checa se o rei branco foi capturado
    if (!reis.some(rei => rei.firstChild.classList.contains('white'))) {
        tituloInformacao.innerHTML = `Vitória!`;
        mensagemVencedor.innerHTML = `${jogadores.black} venceu!`;
        vitoriaDisplay.style.display = 'flex';  
        desabilitarPecas();
        return;
    }
    
    // Checa se o rei preto foi capturado
    if (!reis.some(rei => rei.firstChild.classList.contains('black'))) {
        tituloInformacao.innerHTML = `Vitória!`;

        mensagemVencedor.innerHTML = `${jogadores.white} venceu!`;
        vitoriaDisplay.style.display = 'flex';
        desabilitarPecas();
        return;
    }
}

function desabilitarPecas() {
    const allQuadrados = document.querySelectorAll('.quadrado');
    allQuadrados.forEach(quadrado => {
        quadrado.firstChild?.setAttribute('draggable', false);  // Desativa as peças
    });
}

function reiniciarJogo() {
    window.location.reload();  
}


botaoDesistir.addEventListener('click', desistirPartida) 
botaoEmpatar.addEventListener('click', empatarPartida)

function desistirPartida() {
    const vitoriaDisplay = document.getElementById('vitoria-display');
    const tituloInformacao = document.getElementById('titulo-informacao')
    const mensagemVencedor = document.getElementById('mensagem-vencedor');
    const vezOponente = vezJogador === "white" ? "black" : "white";
    const confirmacaoDesistencia = window.confirm(`Tem certeza que deseja desistir da partida? Isso dará a vitória automaticamente para ${jogadores[vezOponente]}.`)

    if (confirmacaoDesistencia === true) {
        tituloInformacao.innerHTML = `Desistência!`;
        mensagemVencedor.innerHTML = `${jogadores[vezJogador]} desistiu da partida, ${jogadores[vezOponente]} venceu!`;
        vitoriaDisplay.style.display = 'flex';  
        desabilitarPecas();
    }
}

function empatarPartida() {
    const vitoriaDisplay = document.getElementById('vitoria-display');
    const tituloInformacao = document.getElementById('titulo-informacao')
    const mensagemVencedor = document.getElementById('mensagem-vencedor');
    const vezOponente = vezJogador === "white" ? "black" : "white";
    const empateProposto = window.confirm(`${jogadores[vezJogador]}, tem certeza que deseja propor o empate da partida? Caso ${jogadores[vezOponente]} aceite, a partida finalizará sem vencedores.`)

    if (empateProposto) {
        const empateProposto = window.confirm(`${jogadores[vezOponente]}, ${jogadores[vezJogador]} te propôs um empate. Deseja aceitar? Caso aceite, a partida finalizará sem vencedores.`)
        if (empateProposto) {
            tituloInformacao.innerHTML = `Empate!`;
            mensagemVencedor.innerHTML = `${jogadores[vezJogador]} e ${jogadores[vezOponente]} concordaram em empatar a partida.`;
            vitoriaDisplay.style.display = 'flex';  
            desabilitarPecas();
        }
    }
}