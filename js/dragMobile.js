function touchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    posicaoInicialId = touch.target.parentNode.getAttribute('quadrado-id');
    elementoArrastado = touch.target;
}

function touchMove(e) {
    e.preventDefault();
}

function touchEnd(e) {
    e.preventDefault();
    const touch = e.changedTouches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    touchDrop(target);
}

function touchDrop(target) {
    const valid = checaValido(target);
    const vezCorreta = elementoArrastado.firstChild.classList.contains(vezJogador);
    const vezOponente = vezJogador === "brancas" ? "escuras" : "brancas";
    const temPeca = target.classList.contains('piece');
    const temPecaOponente = target.firstChild?.classList.contains(vezOponente);
    const draggedPieceId = elementoArrastado.id;
    const origem = document.querySelector(`[quadrado-id='${posicaoInicialId}']`);

    if (vezCorreta) {
        if (temPecaOponente && valid) {
            target.parentNode.append(elementoArrastado);
            if (draggedPieceId === 'rei' && isKingInCheck(vezJogador)) {
                alert('Não é possível mover o rei para essa posição, ele ficaria em xeque!');
                origem.append(elementoArrastado);
                return;
            }
            target.remove();
            audioCaptura.play();
            checaVitoria();
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
            target.append(elementoArrastado);
            checaVitoria();
            if (draggedPieceId === 'rei' && isKingInCheck(vezJogador, target.getAttribute('quadrado-id'))) {
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