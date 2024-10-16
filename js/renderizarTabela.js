const urlParams = new URLSearchParams(window.location.search);
let jogador1 = urlParams.get('jogador1') || 'Jogador 1';
let jogador2 = urlParams.get('jogador2') || 'Jogador 2';

if (jogador1.length > 12) jogador1 = 'Jogador 1'
if (jogador2.length > 12) jogador2 = 'Jogador 2'

const jogadorBranco = Math.random() < 0.5 ? jogador1 : jogador2;
const jogadorPreto = jogadorBranco === jogador1 ? jogador2 : jogador1;
const jogadores = {
    brancas: jogadorBranco,
    escuras: jogadorPreto
};


const tabuleiro = document.querySelector('#gameboard')
const jogadorDaVez = document.querySelector('#player')
const infoDisplay = document.querySelector('#info-display')
const botaoDesistir = document.querySelector('#desistir')
const botaoEmpatar = document.querySelector('#empate')
const tamanho = 8
let vezJogador = 'brancas'
jogadorDaVez.textContent = `${jogadores[vezJogador]} (${vezJogador})`
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
            quadrado.firstChild.firstChild.classList.add('escuras')
        } else if (i >= 48) {
            quadrado.firstChild.firstChild.classList.add('brancas')
        }

    })
}

criarTabuleiro()