botaoDesistir.addEventListener('click', desistirPartida) 
botaoEmpatar.addEventListener('click', empatarPartida)

function desistirPartida() {
    const vitoriaDisplay = document.getElementById('vitoria-display');
    const tituloInformacao = document.getElementById('titulo-informacao')
    const mensagemVencedor = document.getElementById('mensagem-vencedor');
    const vezOponente = vezJogador === "brancas" ? "escuras" : "brancas";
    const confirmacaoDesistencia = window.confirm(`Tem certeza que deseja desistir da partida? Isso dará a vitória automaticamente para ${jogadores[vezOponente]}.`)

    if (confirmacaoDesistencia === true) {
        audioDesistencia.play()
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
    const vezOponente = vezJogador === "brancas" ? "escuras" : "brancas";
    const empateProposto = window.confirm(`${jogadores[vezJogador]}, tem certeza que deseja propor o empate da partida? Caso ${jogadores[vezOponente]} aceite, a partida finalizará sem vencedores.`)

    if (empateProposto) {
        const empateProposto = window.confirm(`${jogadores[vezOponente]}, ${jogadores[vezJogador]} te propôs um empate. Deseja aceitar? Caso aceite, a partida finalizará sem vencedores.`)
        if (empateProposto) {
            audioEmpate.play();
            tituloInformacao.innerHTML = `Empate!`;
            mensagemVencedor.innerHTML = `${jogadores[vezJogador]} e ${jogadores[vezOponente]} concordaram em empatar a partida.`;
            vitoriaDisplay.style.display = 'flex';  
            desabilitarPecas();
        }
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