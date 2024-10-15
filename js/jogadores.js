document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault()

    const player1Name = document.getElementById('player1')
    const player2Name = document.getElementById('player2')

    if (!player1Name.value || !player2Name.value) {
        alert('Os nomes devem ser inseridos obrigatoriamente!')
        return
    }
    
    if (player1Name.value.length > 12 || player2Name.value.length >= 12) {
        alert('O tamanho de cada nome não pode ultrapassar 12 caracteres!')
        player1Name.value = ''
        player2Name.value = ''
        return
    }
    
    window.location.href= `main.html?jogador1=${player1Name.value}&jogador2=${player2Name.value}`
});
