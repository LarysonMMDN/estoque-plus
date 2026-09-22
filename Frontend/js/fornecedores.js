function inicializarFornecedores() {

const formulario =
    document.getElementById(
        "form-fornecedor"
    );


const formularioEdicao =
    document.getElementById(
        "form-edicao-fornecedor"
    );


if (formulario) {

    formulario.addEventListener(
        "submit",
        salvarFornecedor
    );

}


if (formularioEdicao) {

    formularioEdicao.addEventListener(
        "submit",
        salvarEdicaoFornecedor
    );

}


carregarFornecedores();


}

async function carregarFornecedores() {

try {

    const fornecedores =
        await requisicao(
            "/fornecedores"
        );


    const tabela =
        document.getElementById(
            "lista-fornecedores"
        );


    if (tabela) {

        tabela.innerHTML = "";

    }


    fornecedores.forEach(
        function (fornecedor) {

            if (!tabela) {
                return;
            }


            const linha =
                document.createElement("tr");


            linha.innerHTML = `

                <td>
                    ${fornecedor.id ?? "-"}
                </td>


                <td>
                    ${fornecedor.razaoSocial ?? "-"}
                </td>


                <td>
                    ${fornecedor.nomeFantasia ?? "-"}
                </td>


                <td>
                    ${fornecedor.cnpj ?? "-"}
                </td>


                <td>
                    ${fornecedor.telefone ?? "-"}
                </td>


                <td>
                    ${fornecedor.email ?? "-"}
                </td>


                <td>

                    <button
                        onclick="
                            editarFornecedor(
                                ${fornecedor.id}
                            )
                        ">

                        Editar

                    </button>


                    <button
                        onclick="
                            excluirFornecedor(
                                ${fornecedor.id}
                            )
                        ">

                        Excluir

                    </button>

                </td>

            `;


            tabela.appendChild(linha);

        }
    );


} catch (erro) {

    mostrarErro(
        erro,
        "Erro ao carregar fornecedores"
    );

}


}

async function salvarFornecedor(evento) {

evento.preventDefault();


const razaoSocial =
    document
        .getElementById(
            "fornecedor-razao-social"
        )
        .value
        .trim();


const nomeFantasia =
    document
        .getElementById(
            "fornecedor-nome-fantasia"
        )
        .value
        .trim();


const cnpj =
    document
        .getElementById(
            "fornecedor-cnpj"
        )
        .value
        .trim();


const telefone =
    document
        .getElementById(
            "fornecedor-telefone"
        )
        .value
        .trim();


const email =
    document
        .getElementById(
            "fornecedor-email"
        )
        .value
        .trim();


if (!razaoSocial) {

    mostrarErro({

        dados: {

            erro: "Validação",

            mensagem:
                "A razão social é obrigatória."

        }

    });

    return;

}


if (!cnpj) {

    mostrarErro({

        dados: {

            erro: "Validação",

            mensagem:
                "O CNPJ é obrigatório."

        }

    });

    return;

}


const fornecedor = {

    razaoSocial:
        razaoSocial,

    nomeFantasia:
        nomeFantasia,

    cnpj:
        cnpj,

    telefone:
        telefone,

    email:
        email

};


try {

    await requisicao(
        "/fornecedores",
        {
            method: "POST",

            body:
                JSON.stringify(
                    fornecedor
                )
        }
    );


    mostrarSucesso(
        "Fornecedor cadastrado com sucesso!"
    );


    fecharFormularioFornecedor();


    await carregarFornecedores();


} catch (erro) {

    mostrarErro(
        erro,
        "Erro ao cadastrar fornecedor"
    );

}


}

function abrirFormularioFornecedor() {

const formulario =
    document.getElementById(
        "formulario-fornecedor"
    );


formulario.classList.remove(
    "oculto"
);


}

function fecharFormularioFornecedor() {

const formulario =
    document.getElementById(
        "formulario-fornecedor"
    );


const form =
    document.getElementById(
        "form-fornecedor"
    );


formulario.classList.add(
    "oculto"
);


form.reset();


}

async function editarFornecedor(id) {

try {

    const fornecedor =
        await requisicao(
            `/fornecedores/${id}`
        );


    document.getElementById(
        "edicao-fornecedor-id"
    ).value =
        fornecedor.id;


    document.getElementById(
        "edicao-fornecedor-razao-social"
    ).value =
        fornecedor.razaoSocial ?? "";


    document.getElementById(
        "edicao-fornecedor-nome-fantasia"
    ).value =
        fornecedor.nomeFantasia ?? "";


    document.getElementById(
        "edicao-fornecedor-cnpj"
    ).value =
        fornecedor.cnpj ?? "";


    document.getElementById(
        "edicao-fornecedor-telefone"
    ).value =
        fornecedor.telefone ?? "";


    document.getElementById(
        "edicao-fornecedor-email"
    ).value =
        fornecedor.email ?? "";


    mostrarTelaFornecedor(
        "edicao"
    );


} catch (erro) {

    mostrarErro(
        erro,
        "Erro ao carregar fornecedor"
    );

}


}

async function salvarEdicaoFornecedor(
evento
) {

evento.preventDefault();


const id =
    document.getElementById(
        "edicao-fornecedor-id"
    ).value;


const razaoSocial =
    document.getElementById(
        "edicao-fornecedor-razao-social"
    ).value
    .trim();


const nomeFantasia =
    document.getElementById(
        "edicao-fornecedor-nome-fantasia"
    ).value
    .trim();


const cnpj =
    document.getElementById(
        "edicao-fornecedor-cnpj"
    ).value
    .trim();


const telefone =
    document.getElementById(
        "edicao-fornecedor-telefone"
    ).value
    .trim();


const email =
    document.getElementById(
        "edicao-fornecedor-email"
    ).value
    .trim();


if (!razaoSocial) {

    mostrarErro({

        dados: {

            erro: "Validação",

            mensagem:
                "A razão social é obrigatória."

        }

    });

    return;

}


if (!cnpj) {

    mostrarErro({

        dados: {

            erro: "Validação",

            mensagem:
                "O CNPJ é obrigatório."

        }

    });

    return;

}


const dados = {

    razaoSocial:
        razaoSocial,

    nomeFantasia:
        nomeFantasia,

    cnpj:
        cnpj,

    telefone:
        telefone,

    email:
        email

};


try {

    await requisicao(
        `/fornecedores/${id}`,
        {
            method: "PUT",

            body:
                JSON.stringify(
                    dados
                )
        }
    );


    mostrarSucesso(
        "Fornecedor atualizado com sucesso!"
    );


    await carregarFornecedores();


    mostrarTelaFornecedor(
        "lista"
    );


} catch (erro) {

    mostrarErro(
        erro,
        "Erro ao atualizar fornecedor"
    );

}


}

async function excluirFornecedor(id) {

const confirmar =
    await confirmarAcao(
        "Deseja realmente excluir este fornecedor?"
    );


if (!confirmar) {
    return;
}


try {

    await requisicao(
        `/fornecedores/${id}`,
        {
            method: "DELETE"
        }
    );


    mostrarSucesso(
        "Fornecedor excluído com sucesso!"
    );


    await carregarFornecedores();


} catch (erro) {

    mostrarErro(
        erro,
        "Erro ao excluir fornecedor"
    );

}


}

function mostrarTelaFornecedor(tela) {

const lista =
    document.getElementById(
        "lista-fornecedores-container"
    );


const edicao =
    document.getElementById(
        "edicao-fornecedor"
    );


lista.classList.add(
    "oculto"
);


edicao.classList.add(
    "oculto"
);


if (tela === "lista") {

    lista.classList.remove(
        "oculto"
    );

}


if (tela === "edicao") {

    edicao.classList.remove(
        "oculto"
    );

}


}

function voltarListaFornecedores() {

mostrarTelaFornecedor(
    "lista"
);


}