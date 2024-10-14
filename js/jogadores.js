document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault()

    const player1Name = document.getElementById('player1').value;
    const player2Name = document.getElementById('player2').value;
    
    window.location.href= `main.html?jogador1=${player1Name}&jogador2=${player2Name}`
});
