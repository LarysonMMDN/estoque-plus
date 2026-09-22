function inicializarCategorias() {

    const formulario =
        document.getElementById(
            "form-categoria"
        );

    const formularioEdicao =
        document.getElementById(
            "form-edicao-categoria"
        );


    if (formulario) {

        formulario.addEventListener(
            "submit",
            cadastrarCategoria
        );

    }


    if (formularioEdicao) {

        formularioEdicao.addEventListener(
            "submit",
            salvarEdicaoCategoria
        );

    }


    carregarCategorias();

}

async function carregarCategorias() {

    try {

        const categorias =
            await requisicao("/categorias");

        const tabela =
            document.getElementById(
                "lista-categorias"
            );

        const select =
            document.getElementById(
                "produto-categoria"
            );


        if (tabela) {

            tabela.innerHTML = "";

        }


        if (select) {

            select.innerHTML = `
                <option value="">
                    Selecione uma categoria
                </option>
            `;

        }


        categorias.forEach(categoria => {

            if (tabela) {

                const linha =
                    document.createElement("tr");


                const status =
                    categoria.status
                        ? `<span class="status ativo">
                            ● Ativo
                           </span>`
                        : `<span class="status inativo">
                            ● Inativo
                           </span>`;


                linha.innerHTML = `

                    <td>
                        ${status}
                    </td>

                    <td>
                        ${categoria.nome ?? "-"}
                    </td>

                    <td>
                        ${categoria.descricao ?? "-"}
                    </td>

                    <td>

                        <button
                            onclick="abrirCategoria(${categoria.id})">

                            Visualizar

                        </button>

                        <button
                            onclick="editarCategoria(${categoria.id})">

                            Editar

                        </button>

                    </td>

                `;


                tabela.appendChild(linha);

            }


            if (select) {

                const option =
                    document.createElement("option");


                option.value =
                    categoria.id;


                option.textContent =
                    categoria.nome;


                select.appendChild(option);

            }

        });


    } catch (erro) {

        mostrarErro(
            erro,
            "Erro ao carregar categorias"
        );

    }

}


function abrirFormularioCategoria() {

    const formulario =
        document.getElementById(
            "formulario-categoria"
        );

    formulario.classList.remove("oculto");

}

function fecharFormularioCategoria() {

    const formulario =
        document.getElementById(
            "formulario-categoria"
        );

    const form =
        document.getElementById(
            "form-categoria"
        );

    formulario.classList.add("oculto");

    form.reset();

}

async function cadastrarCategoria(evento) {

    evento.preventDefault();

    const nome =
        document
            .getElementById("categoria-nome")
            .value
            .trim();

    const descricao =
        document
            .getElementById("categoria-descricao")
            .value
            .trim();


    if (!nome) {

        mostrarErro({
            dados: {
                erro: "Validação",
                mensagem:
                    "O nome da categoria é obrigatório."
            }
        });

        return;
    }


    if (!descricao) {

        mostrarErro({
            dados: {
                erro: "Validação",
                mensagem:
                    "A descrição da categoria é obrigatória."
            }
        });

        return;
    }


    const categoria = {

        nome: nome,

        descricao: descricao

    };


    try {

        await requisicao(
            "/categorias",
            {
                method: "POST",

                body:
                    JSON.stringify(categoria)
            }
        );


        mostrarSucesso(
            "Categoria cadastrada com sucesso!"
        );


        fecharFormularioCategoria();


        await carregarCategorias();


    } catch (erro) {

        mostrarErro(
            erro,
            "Erro ao cadastrar categoria"
        );

    }

}

async function abrirCategoria(id) {

    try {

        const categoria =
            await requisicao(
                `/categorias/${id}`
            );
            console.log("Categoria recebida:", categoria);
            console.log("Data de cadastro:", formatarData(categoria.dataCadastro));

        document.getElementById(
            "detalhe-categoria-id"
        ).textContent =
            categoria.id;


        document.getElementById(
            "detalhe-categoria-nome"
        ).textContent =
            categoria.nome ?? "-";


        document.getElementById(
            "detalhe-categoria-descricao"
        ).textContent =
            categoria.descricao ?? "-";


        document.getElementById(
            "detalhe-categoria-status"
        ).innerHTML =
            categoria.status
                ? `<span class="status ativo">
                    ● Ativo
                   </span>`
                : `<span class="status inativo">
                    ● Inativo
                   </span>`;


        document
            .getElementById("detalhe-categoria-data")
            .textContent =
                formatarData(
                    categoria.dataCadastro
                );

            

        // document
        //     .getElementById("modal-categoria")
        //     .classList.remove("oculto");
        
        mostrarTelaCategoria("detalhes");


    } catch (erro) {

        mostrarErro(
            erro,
            "Erro ao carregar categoria"
        );

    }

}

function fecharModalCategoria() {

    document
        .getElementById("modal-categoria")
        .classList.add("oculto");

}

async function editarCategoria(id) {

    try {

        const categoria =
            await requisicao(
                `/categorias/${id}`
            );


        document.getElementById(
            "edicao-categoria-id"
        ).value =
            categoria.id;


        document.getElementById(
            "edicao-categoria-nome"
        ).value =
            categoria.nome ?? "";


        document.getElementById(
            "edicao-categoria-descricao"
        ).value =
            categoria.descricao ?? "";


        document.getElementById(
            "edicao-categoria-status"
        ).value =
            String(categoria.status);


        mostrarTelaCategoria("edicao");

    } catch (erro) {

        mostrarErro(
            erro,
            "Erro ao carregar categoria"
        );

    }

}

async function excluirCategoria(id) {

    const confirmar =
        confirm(
            "Deseja realmente desativar esta categoria?"
        );


    if (!confirmar) {
        return;
    }


    try {

        await requisicao(
            `/categorias/${id}`,
            {
                method: "DELETE"
            }
        );


        mostrarSucesso(
            "Categoria desativada com sucesso!"
        );


        await carregarCategorias();


    } catch (erro) {

        mostrarErro(
            erro,
            "Erro ao desativar categoria"
        );

    }

}

function formatarData(data) {

    if (!data) {
        return "-";
    }


    const dataObj =
        new Date(data);


    if (Number.isNaN(dataObj.getTime())) {
        return data;
    }


    return dataObj.toLocaleString(
        "pt-BR"
    );

}

async function salvarEdicaoCategoria(evento) {
    console.log("SALVAR EDIÇÃO FOI CHAMADO");

    evento.preventDefault();


    const id =
        document.getElementById(
            "edicao-categoria-id"
        ).value;


    const nome =
        document.getElementById(
            "edicao-categoria-nome"
        ).value.trim();


    const descricao =
        document.getElementById(
            "edicao-categoria-descricao"
        ).value.trim();


    const status =
        document.getElementById(
            "edicao-categoria-status"
        ).value === "true";


    if (!nome) {

        mostrarErro({
            dados: {
                erro: "Validação",
                mensagem:
                    "O nome da categoria é obrigatório."
            }
        });

        return;
    }


    if (!descricao) {

        mostrarErro({
            dados: {
                erro: "Validação",
                mensagem:
                    "A descrição da categoria é obrigatória."
            }
        });

        return;
    }


    const dados = {

        nome: nome,

        descricao: descricao,

        status: status

    };


    try {

        await requisicao(
            `/categorias/${id}`,
            {
                method: "PUT",

                body:
                    JSON.stringify(dados)
            }
        );


        mostrarSucesso(
            "Categoria atualizada com sucesso!"
        );


        await carregarCategorias();

        mostrarTelaCategoria("lista");

    } catch (erro) {

        mostrarErro(
            erro,
            "Erro ao atualizar categoria"
        );

    }

}

function mostrarTelaCategoria(tela) {

    const lista =
        document.getElementById(
            "lista-categorias-container"
        );

    const detalhes =
        document.getElementById(
            "detalhes-categoria"
        );

    const edicao =
        document.getElementById(
            "edicao-categoria"
        );

    lista.classList.add("oculto");

    detalhes.classList.add("oculto");

    edicao.classList.add("oculto");


    if (tela === "lista") {

        lista.classList.remove("oculto");

    }


    if (tela === "detalhes") {

        detalhes.classList.remove("oculto");

    }


    if (tela === "edicao") {

        edicao.classList.remove("oculto");

    }

}

function voltarListaCategorias() {

    mostrarTelaCategoria("lista");

}

function formatarData(data) {
    if (!data) return "-";

    const dataFormatada = new Date(
        data.replace(/\.\d+$/, "")
    );

    if (isNaN(dataFormatada.getTime())) {
        return "-";
    }

    return dataFormatada.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}
