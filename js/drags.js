let posicaoInicialId;
let elementoArrastado

const allQuadrados = document.querySelectorAll('.quadrado')
allQuadrados.forEach((quadrado) => {
    quadrado.addEventListener('dragstart', dragStart)
    quadrado.addEventListener('dragover', dragOver)
    quadrado.addEventListener('drop', dragDrop)
    quadrado.addEventListener('touchstart', touchStart);
    quadrado.addEventListener('touchmove', touchMove);
    quadrado.addEventListener('touchend', touchEnd);
})

function dragStart(e) {
    posicaoInicialId = e.target.parentNode.getAttribute('quadrado-id')
    elementoArrastado = e.target
}

function dragOver(e) {
    e.preventDefault()
}

function dragDrop(e) {
    e.stopPropagation();
    const valid = checaValido(e.target);
    const vezCorreta = elementoArrastado.firstChild.classList.contains(vezJogador);
    const vezOponente = vezJogador === "brancas" ? "escuras" : "brancas";
    const temPeca = e.target.classList.contains('piece');
    const temPecaOponente = e.target.firstChild?.classList.contains(vezOponente);
    const draggedPieceId = elementoArrastado.id;

    const origem = document.querySelector(`[quadrado-id='${posicaoInicialId}']`);

    if (vezCorreta) {
        if (temPecaOponente && valid) {
            e.target.parentNode.append(elementoArrastado);
            if (draggedPieceId === 'rei' && isKingInCheck(vezJogador)) {
                alert('Não é possível mover o rei para essa posição, ele ficaria em xeque!');
                origem.append(elementoArrastado);
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
        if (temPeca && !temPecaOponente) {
            audioNegacao.play();
            infoDisplay.textContent = "Não é possível eliminar sua própria peça!";
            setTimeout(() => infoDisplay.textContent = '', 2500);
            return;
        }
        if (valid) {
            e.target.append(elementoArrastado);
            checaVitoria()
            if (draggedPieceId === 'rei' && isKingInCheck(vezJogador, e.target.getAttribute('quadrado-id'))) {
                alert('Não é possível mover o rei para essa posição, ele ficaria em xeque!');
                origem.append(elementoArrastado);
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