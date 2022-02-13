let nomeUsuario = prompt("Qual o seu nome?")
const chat = document.querySelector("main")


const nome = {
    name: nomeUsuario
}

cadastrarUsuario()

function cadastrarUsuario() {
    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', nome)

    promessa.then(usuarioCadastrado)
    promessa.catch(usuarioNaoCadastrado)
}

function usuarioCadastrado(resposta) {
    console.log(resposta) //retirar depois
}

function usuarioNaoCadastrado(erro) {
    console.log(erro) //retirar depois
    const fundoEscuro = document.querySelector(".fundo-escuro")
    const error400 = document.querySelector(".error-400")

    fundoEscuro.classList.remove("escondido")
    error400.classList.remove("escondido")

    setTimeout(() => {document.location.reload(true)}, 5000)
}

setInterval(manterConexaoDoUsuario, 5000)

function manterConexaoDoUsuario() {
    axios.post('https://mock-api.driven.com.br/api/v4/uol/status', nome)
}

mostrarMensagens()

setInterval(mostrarMensagens, 3000)

function mostrarMensagens() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages')

    promessa.then(buscarMensagens)
}

function buscarMensagens(mensagens) {
    console.log(mensagens.data) // retirar depois
    chat.innerHTML = ""
    
    for (let i = 0; i < mensagens.data.length; i++) {

        if (mensagens.data[i].type === "status") {
            chat.innerHTML += `
            <span class="mensagem__usuario-entrou"><p>(${mensagens.data[i].time}) <strong>&nbsp${mensagens.data[i].from}&nbsp</strong>  ${mensagens.data[i].text}</p></span>
            `
        } else if (mensagens.data[i].type === "message") {
            chat.innerHTML += `
            <span class="mensagem"><p>(${mensagens.data[i].time}) <strong>&nbsp${mensagens.data[i].from}&nbsp</strong> para <strong>&nbsp${mensagens.data[i].to}</strong>: ${mensagens.data[i].text}</p></span>
            `
        } else {
            chat.innerHTML += `
            <span class="mensagem__privada"><p>(${mensagens.data[i].time}) <strong>&nbsp${mensagens.data[i].from}&nbsp</strong> reservadamente para <strong>&nbsp${mensagens.data[i].to}</strong>: ${mensagens.data[i].text}</p></span>
            `
        }

        scrollarAteUltimaMensagem()
    }
}

function scrollarAteUltimaMensagem() {
    const ultimaMensagem = document.querySelector("span:last-of-type")
    ultimaMensagem.scrollIntoView()
}

function enviarMensagem() {
    mensagem = {
        from: nomeUsuario,
        to: "Todos",
        text: document.querySelector("footer input").value,
        type: "message"
    }

    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', mensagem)

    promessa.then(mensagemEnviada)
    promessa.catch(mensagemNaoenviada)
}

function mensagemEnviada(resposta) {
    console.log(resposta)
    mostrarMensagens()
}

function mensagemNaoenviada(erro) {
    console.log(erro)
}