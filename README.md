# ♟️ **Projeto Xadrez - Kaique Santana** 
Bem-vindo ao meu projeto de xadrez! Este projeto foi desenvolvido para trazer uma experiência completa de xadrez diretamente para o seu navegador, utilizando **HTML**, **CSS** e **JavaScript**. Desafie seus amigos jogando de forma local!

## 🧑‍💻 Tecnologias Utilizadas
- **HTML5:** Estrutura semântica do tabuleiro e interface.
- **CSS3:** Design responsivo e visual atrativo.
- **JavaScript:** Lógica do jogo e manipulação dinâmica das peças.
- **Docker:** Facilita o processo de rodar o projeto em qualquer ambiente.

## 🚀 **Sobre o Projeto**

Este projeto é um **jogo de xadrez funcional** desenvolvido para proporcionar uma interface amigável e intuitiva. Nesse projeto, existe funcionalidades incluindo:
- Movimentos válidos para todas as peças ♔ ♕ ♖ ♗ ♘ ♙
- Captura de peças 💥

Tudo isso foi implementado com **JavaScript**, aproveitando o poder do DOM para manipular o tabuleiro e as peças. A interface foi estilizada com **CSS**, garantindo uma experiência visual agradável e responsiva.

## 🛠️ **Como rodar o projeto**

Siga os passos abaixo para rodar o projeto localmente utilizando **Git** e **Docker**:

### 1. Clonar o repositório

Primeiro, você precisará clonar o repositório para a sua máquina local. Abra o terminal e execute o seguinte comando:

```bash
git clone https://github.com/kaiquevieira/projetoxadrez.git
```

### 2. Rodar com Docker

- [Clique aqui para aprender como instalar e configurar o docker](https://docs.docker.com/engine/install/)

Assim que o repositório estiver clonado, entre no repositório onde o clone foi feito e faça o build da imagem executando o comando abaixo no terminal:

```bash
docker build -t projetoxadrez .
```

E então, execute um container com essa imagem para enfim rodar a aplicação:

```bash
docker run -d -p 8080:80 projetoxadrez:latest
```

(Substitua a porta 8080 por uma de sua escolha caso necessário)

### 3. Jogar 

Uma vez que o container esteja rodando, é só abrir o link do localhost no browser na pporta 8080 (ou na que você substituiu caso tenha feito).

```bash
http://localhost:8080
```
🎉 Pronto! O jogo de xadrez estará rodando em sua máquina e no seu aguardo :) .

