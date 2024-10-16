let posicaoInicialId;
let elementoArrastado

const allQuadrados = document.querySelectorAll('.quadrado')
allQuadrados.forEach((quadrado) => {
    quadrado.addEventListener('dragstart', dragStart)
    quadrado.addEventListener('dragover', dragOver)
    quadrado.addEventListener('drop', dragDrop)
})

function dragStart(e) {
    posicaoInicialId = e.target.parentNode.getAttribute('quadrado-id')
    elementoArrastado = e.target
}

function dragOver(e) {
    e.preventDefault() // evitar bugs de disparar o evento de drag over a cada lugar q passo
}

function dragDrop(e) {
    e.stopPropagation(); // Evita bugs do drag and drop não ser tratado no lugar específico
    const valid = checaValido(e.target);
    const vezCorreta = elementoArrastado.firstChild.classList.contains(vezJogador); // Verifica se a peça mexida tem a classe correta
    const vezOponente = vezJogador === "brancas" ? "escuras" : "brancas";
    const temPeca = e.target.classList.contains('piece'); // Verifica se a casa atual possui alguma peça nela
    const temPecaOponente = e.target.firstChild?.classList.contains(vezOponente);
    const draggedPieceId = elementoArrastado.id; // Verifica se a peça é o rei

    const origem = document.querySelector(`[quadrado-id='${posicaoInicialId}']`);

    if (vezCorreta) {
        if (temPecaOponente && valid) {
            e.target.parentNode.append(elementoArrastado); // Colocando na casa dropada a peça que foi arrastada
            if (draggedPieceId === 'rei' && isKingInCheck(vezJogador)) {
                alert('Não é possível mover o rei para essa posição, ele ficaria em xeque!');
                origem.append(elementoArrastado); // Volta o rei para sua posição original
                return;
            }
            e.target.remove();
            audioCaptura.play();
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
            e.target.append(elementoArrastado);
            checaVitoria()
            if (draggedPieceId === 'rei' && isKingInCheck(vezJogador, e.target.getAttribute('quadrado-id'))) {
                alert('Não é possível mover o rei para essa posição, ele ficaria em xeque!');
                origem.append(elementoArrastado); // Volta o rei para sua posição original
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
    const peca = elementoArrastado.id // pega qual o nome da peça indo pelo seu id (que obviamente tem o nome da peça)
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
    const reis = Array.from(document.querySelectorAll('#rei'));
    const vitoriaDisplay = document.getElementById('vitoria-display');
    const tituloInformacao = document.getElementById('titulo-informacao')
    const mensagemVencedor = document.getElementById('mensagem-vencedor');
    
    // Checa se o rei branco foi capturado
    if (!reis.some(rei => rei.firstChild.classList.contains('brancas'))) {
        tituloInformacao.innerHTML = `Vitória!`;
        mensagemVencedor.innerHTML = `${jogadores.escuras} venceu!`;
        vitoriaDisplay.style.display = 'flex';  
        desabilitarPecas();
        audioVitoria.play()
        return;
    }
    
    // Checa se o rei preto foi capturado
    if (!reis.some(rei => rei.firstChild.classList.contains('escuras'))) {
        tituloInformacao.innerHTML = `Vitória!`;

        mensagemVencedor.innerHTML = `${jogadores.brancas} venceu!`;
        vitoriaDisplay.style.display = 'flex';
        desabilitarPecas();
        audioVitoria.play()
        return;
    }
}

