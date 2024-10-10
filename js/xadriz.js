const tJogador1 = document.querySelector('#jogador1')
const tJogador2 = document.querySelector('#jogador2')

const urlParams = new URLSearchParams(window.location.search);
const jogador1 = urlParams.get('jogador1');
const jogador2 = urlParams.get('jogador2');

tJogador1.textContent = jogador1;
tJogador2.textContent = jogador2;
