function inicializarProdutos() {

    const formulario =
        document.getElementById("form-produto");

    if (!formulario) {
        return;
    }

    formulario.addEventListener(
        "submit",
        salvarProduto
    );

    carregarProdutos();

    carregarCategorias();

}

async function carregarProdutos() {

    try {
        console.log(
            "lista-produtos:",
            document.getElementById("lista-produtos")
        );

        console.log(
            "form-produto:",
            document.getElementById("form-produto")
        );

        console.log(
            "produto-categoria:",
            document.getElementById("produto-categoria")
        );


        const produtos =
            await requisicao("/produtos");
        console.log("Produtos recebidos:", produtos);

        const tabela =
            document.getElementById("lista-produtos");
        console.log("Tabela de produtos:", tabela);
        if (!tabela) {
            return;
        }

        tabela.innerHTML = "";

        produtos.forEach(produto => {

            const categoria =
                produto.categoria?.nome || "-";

            const estoqueBaixo =
                produto.quantidadeEstoque <=
                produto.estoqueMinimo;

            tabela.innerHTML += `
                <tr>

                    <td>
                        ${produto.id}
                    </td>

                    <td>
                        ${produto.nome}
                    </td>

                    <td>
                        R$ ${Number(produto.preco).toFixed(2)}
                    </td>

                    <td>
                        ${produto.quantidadeEstoque}
                        ${estoqueBaixo ? "⚠️" : ""}
                    </td>

                    <td>
                        ${produto.estoqueMinimo}
                    </td>

                    <td>
                        ${categoria}
                    </td>

                    <td>

                        <button
                            onclick="editarProduto(${produto.id})">

                            Editar

                        </button>

                        <button
                            onclick="excluirProduto(${produto.id})">

                            Excluir

                        </button>

                    </td>

                </tr>
            `;

        });

        preencherSelectProdutos(produtos);

    } catch (erro) {

        mostrarErro(
            erro,
            "Erro ao carregar produtos"
        );

    }

}

async function salvarProduto(evento) {

    evento.preventDefault();

    const nome =
        document
            .getElementById("produto-nome")
            .value
            .trim();

    const descricao =
        document
            .getElementById("produto-descricao")
            .value
            .trim();

    const preco =
        document
            .getElementById("produto-preco")
            .value;

    const quantidadeEstoque =
        document
            .getElementById("produto-quantidade")
            .value;

    const estoqueMinimo =
        document
            .getElementById("produto-minimo")
            .value;

    const categoriaId =
        document
            .getElementById("produto-categoria")
            .value;


    if (!nome) {

        mostrarErro({
            dados: {
                erro: "Validação",
                mensagem:
                    "O nome do produto é obrigatório."
            }
        });

        return;
    }


    if (!preco || Number(preco) <= 0) {

        mostrarErro({
            dados: {
                erro: "Validação",
                mensagem:
                    "Informe um preço válido."
            }
        });

        return;
    }


    if (
        quantidadeEstoque === "" ||
        Number(quantidadeEstoque) < 0
    ) {

        mostrarErro({
            dados: {
                erro: "Validação",
                mensagem:
                    "Informe uma quantidade de estoque válida."
            }
        });

        return;
    }


    if (
        estoqueMinimo === "" ||
        Number(estoqueMinimo) < 0
    ) {

        mostrarErro({
            dados: {
                erro: "Validação",
                mensagem:
                    "Informe um estoque mínimo válido."
            }
        });

        return;
    }


    if (!categoriaId) {

        mostrarErro({
            dados: {
                erro: "Validação",
                mensagem:
                    "Selecione uma categoria para o produto."
            }
        });

        return;
    }


    const produto = {

        nome,

        descricao,

        preco:
            Number(preco),

        quantidadeEstoque:
            Number(quantidadeEstoque),

        estoqueMinimo:
            Number(estoqueMinimo),

        categoriaId:
            Number(categoriaId)

    };


    try {

        await requisicao(
            "/produtos",
            {
                method: "POST",

                body:
                    JSON.stringify(produto)
            }
        );


        mostrarSucesso(
            "Produto cadastrado com sucesso!"
        );


        fecharFormularioProduto();


        await carregarProdutos();

    } catch (erro) {

        mostrarErro(
            erro,
            "Erro ao cadastrar produto"
        );

    }

}

function abrirFormularioProduto() {

    document
        .getElementById("formulario-produto")
        .classList.remove("oculto");

}

function fecharFormularioProduto() {

    document
        .getElementById("formulario-produto")
        .classList.add("oculto");

    document
        .getElementById("form-produto")
        .reset();

}

async function excluirProduto(id) {

    const confirmar =
        await confirmarAcao(
            "Deseja realmente excluir este produto?"
        );


    if (!confirmar) {

        return;

    }


    try {

        await requisicao(
            `/produtos/${id}`,
            {
                method: "DELETE"
            }
        );


        mostrarSucesso(
            "Produto excluído com sucesso!"
        );


        await carregarProdutos();

    } catch (erro) {

        mostrarErro(
            erro,
            "Erro ao excluir produto"
        );

    }

}



async function editarProduto(id) {

    try {

        const produto =
            await requisicao(
                `/produtos/${id}`
            );


        const nome =
            prompt(
                "Nome do produto:",
                produto.nome
            );


        if (nome === null) {
            return;
        }


        const descricao =
            prompt(
                "Descrição:",
                produto.descricao || ""
            );


        if (descricao === null) {
            return;
        }


        const preco =
            prompt(
                "Preço:",
                produto.preco
            );


        if (preco === null) {
            return;
        }


        const estoqueMinimo =
            prompt(
                "Estoque mínimo:",
                produto.estoqueMinimo
            );


        if (estoqueMinimo === null) {
            return;
        }


        const categoriaId =
            produto.categoria?.id;


        const dados = {

            nome:
                nome.trim(),

            descricao:
                descricao.trim(),

            preco:
                Number(preco),

            estoqueMinimo:
                Number(estoqueMinimo),

            categoriaId

        };


        if (!dados.nome) {

            mostrarErro({
                dados: {
                    erro: "Validação",
                    mensagem:
                        "O nome do produto é obrigatório."
                }
            });

            return;
        }


        if (
            !Number.isFinite(dados.preco) ||
            dados.preco <= 0
        ) {

            mostrarErro({
                dados: {
                    erro: "Validação",
                    mensagem:
                        "Informe um preço válido."
                }
            });

            return;
        }


        if (
            !Number.isInteger(
                dados.estoqueMinimo
            ) ||
            dados.estoqueMinimo < 0
        ) {

            mostrarErro({
                dados: {
                    erro: "Validação",
                    mensagem:
                        "Informe um estoque mínimo válido."
                }
            });

            return;
        }


        await requisicao(
            `/produtos/${id}`,
            {
                method: "PUT",

                body:
                    JSON.stringify(dados)
            }
        );


        mostrarSucesso(
            "Produto atualizado com sucesso!"
        );


        await carregarProdutos();

    } catch (erro) {

        mostrarErro(
            erro,
            "Erro ao editar produto"
        );

    }

}

function preencherSelectProdutos(produtos) {

    const selects = [

        document.getElementById(
            "movimentacao-produto"
        ),

        document.getElementById(
            "produto-consulta"
        )

    ];


    selects.forEach(select => {

        if (!select) {
            return;
        }


        select.innerHTML = `
            <option value="">
                Selecione um produto
            </option>
        `;


        produtos.forEach(produto => {

            const option =
                document.createElement("option");


            option.value =
                produto.id;


            option.textContent =
                `${produto.id} - ${produto.nome}`;


            select.appendChild(option);

        });

    });

}

function abrirConfirmacao(mensagem) {

    return new Promise(resolve => {

        const modal =
            document.getElementById(
                "modal-confirmacao"
            );

        const mensagemElemento =
            document.getElementById(
                "mensagem-confirmacao"
            );

        const botaoConfirmar =
            document.getElementById(
                "btn-confirmar-exclusao"
            );

        const botaoCancelar =
            document.getElementById(
                "btn-cancelar-confirmacao"
            );


        mensagemElemento.textContent =
            mensagem;


        modal.classList.remove("oculto");


        function finalizar(resultado) {

            modal.classList.add("oculto");

            botaoConfirmar.removeEventListener(
                "click",
                confirmar
            );

            botaoCancelar.removeEventListener(
                "click",
                cancelar
            );

            resolve(resultado);

        }


        function confirmar() {

            finalizar(true);

        }


        function cancelar() {

            finalizar(false);

        }


        botaoConfirmar.addEventListener(
            "click",
            confirmar
        );


        botaoCancelar.addEventListener(
            "click",
            cancelar
        );

    });

}
