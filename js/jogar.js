document.addEventListener('submit', (e) => {
    e.preventDefault()

    const jogador1 = document.getElementById('jogador1')
    const jogador2 = document.getElementById('jogador2')

    if (!jogador1.value || !jogador2.value) {
        alert('O nome dos dois jogadores são obrigatórios.')
        return
    }

    window.location.href = `xadrez.html?jogador1=${jogador1.value}&jogador2=${jogador2.value}`
})