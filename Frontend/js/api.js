const API_URL = "http://localhost:8080/api";


/*
 * Faz requisições para o backend
 */
async function requisicao(endpoint, opcoes = {}) {

    try {

        const resposta = await fetch(
            `${API_URL}${endpoint}`,
            {
                headers: {
                    "Content-Type": "application/json"
                },

                ...opcoes
            }
        );


        /*
         * Se a resposta for um erro HTTP,
         * vamos tentar pegar o JSON enviado pelo backend.
         */
        if (!resposta.ok) {

            let dadosErro = null;

            try {

                dadosErro = await resposta.json();

            } catch {

                dadosErro = null;

            }


            /*
             * Criamos um erro especial para o frontend.
             *
             * Guardamos a resposta inteira do backend
             * dentro do objeto.
             */
            const erro = new Error(
                obterMensagemErro(dadosErro, resposta.status)
            );


            erro.status = resposta.status;

            erro.dados = dadosErro;


            throw erro;
        }


        /*
         * DELETE normalmente retorna 204
         * e não possui JSON.
         */
        if (resposta.status === 204) {

            return null;

        }


        return await resposta.json();


    } catch (erro) {

        console.error(
            "Erro na API:",
            erro
        );

        throw erro;

    }

}


/*
 * Extrai a mensagem correta enviada
 * pelo backend.
 */
function obterMensagemErro(dados, status) {

    if (!dados) {

        return `Erro na comunicação com o servidor. Código: ${status}`;

    }


    /*
     * Caso seja uma exceção normal:
     *
     * {
     *     "erro": "Estoque insuficiente",
     *     "mensagem": "Estoque insuficiente..."
     * }
     */
    if (dados.mensagem) {

        return dados.mensagem;

    }


    /*
     * Caso seja erro de validação:
     *
     * {
     *     "erro": "Erro de validação",
     *     "campos": {
     *         "nome": "...",
     *         "preco": "..."
     *     }
     * }
     */
    if (dados.campos) {

        const mensagens =
            Object.values(dados.campos);


        return mensagens.join("\n");

    }


    /*
     * Caso o backend tenha apenas "erro".
     */
    if (dados.erro) {

        return dados.erro;

    }


    return `Erro na comunicação com o servidor. Código: ${status}`;

}


/*
 * Mostra o erro de forma amigável na interface.
 */
function mostrarErro(erro, titulo = "Ocorreu um erro") {

    const dados = erro?.dados;


    /*
     * Remove mensagens anteriores.
     */
    removerMensagemErro();


    /*
     * Cria o container.
     */
    const alerta =
        document.createElement("div");


    alerta.id = "mensagem-erro";

    alerta.className =
        "mensagem-erro";


    /*
     * Título.
     */
    const tituloElemento =
        document.createElement("strong");


    tituloElemento.textContent =
        dados?.erro || titulo;


    alerta.appendChild(
        tituloElemento
    );


    /*
     * Se tiver erros de campos,
     * mostra cada um separadamente.
     */
    if (
        dados?.campos &&
        Object.keys(dados.campos).length > 0
    ) {

        const lista =
            document.createElement("ul");


        Object.entries(dados.campos)
            .forEach(
                ([campo, mensagem]) => {

                    const item =
                        document.createElement("li");


                    item.textContent =
                        `${formatarNomeCampo(campo)}: ${mensagem}`;


                    lista.appendChild(item);

                }
            );


        alerta.appendChild(lista);

    }


    /*
     * Se tiver uma mensagem normal.
     */
    else if (dados?.mensagem) {

        const texto =
            document.createElement("p");


        texto.textContent =
            dados.mensagem;


        alerta.appendChild(texto);

    }


    /*
     * Caso não tenhamos conseguido obter
     * nada específico.
     */
    else {

        const texto =
            document.createElement("p");


        texto.textContent =
            erro?.message ||
            "Não foi possível realizar a operação.";


        alerta.appendChild(texto);

    }


    /*
     * Botão para fechar.
     */
    const fechar =
        document.createElement("button");


    fechar.textContent = "×";

    fechar.className =
        "fechar-mensagem";


    fechar.onclick =
        removerMensagemErro;


    alerta.appendChild(fechar);


    /*
     * Coloca a mensagem no topo da página.
     */
    document.body.prepend(alerta);


    /*
     * Rola para o topo.
     */
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/*
 * Converte:
 *
 * quantidadeEstoque
 *
 * para:
 *
 * Quantidade Estoque
 */
function formatarNomeCampo(campo) {

    if (!campo) {
        return "Campo";
    }


    return campo
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, letra => letra.toUpperCase());

}


/*
 * Remove mensagem existente.
 */
function removerMensagemErro() {

    const mensagem =
        document.getElementById(
            "mensagem-erro"
        );


    if (mensagem) {

        mensagem.remove();

    }

}
function mostrarSucesso(mensagem) { removerMensagemSucesso(); const alerta = document.createElement("div"); alerta.id = "mensagem-sucesso"; alerta.className = "mensagem-sucesso"; const texto = document.createElement("span"); texto.textContent = mensagem; alerta.appendChild(texto); const fechar = document.createElement("button"); fechar.textContent = "×"; fechar.className = "fechar-mensagem"; fechar.onclick = removerMensagemSucesso; alerta.appendChild(fechar); document.body.prepend(alerta); /* * Remove automaticamente depois de 4 segundos. */ setTimeout( removerMensagemSucesso, 4000 ); } function removerMensagemSucesso() { const mensagem = document.getElementById( "mensagem-sucesso" ); if (mensagem) { mensagem.remove(); } }