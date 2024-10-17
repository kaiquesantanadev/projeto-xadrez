document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault()

    const player1Nome = document.getElementById('player1')
    const player2Nome = document.getElementById('player2')

    if (!player1Nome.value || !player2Nome.value) {
        alert('Os nomes devem ser inseridos obrigatoriomente!')
        return
    }
    
    if (player1Nome.value.length > 12 || player2Nome.value.length >= 12) {
        alert('O tamanho de cada nome não pode ultrapassar 12 caracteres!')
        player1Nome.value = ''
        player2Nome.value = ''
        return
    }
    
    window.location.href= `main.html?jogador1=${player1Nome.value}&jogador2=${player2Nome.value}`
});
