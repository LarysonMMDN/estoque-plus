function inicializarFuncionarios() {

    const formulario =
        document.getElementById(
            "form-funcionario"
        );

    const formularioEdicao =
        document.getElementById(
            "form-edicao-funcionario"
        );


    if (formulario) {

        formulario.addEventListener(
            "submit",
            salvarFuncionario
        );

    }


    if (formularioEdicao) {

        formularioEdicao.addEventListener(
            "submit",
            salvarEdicaoFuncionario
        );

    }


    carregarFuncionarios();

}


async function carregarFuncionarios() {

    try {

        const funcionarios =
            await requisicao("/funcionarios");


        const tabela =
            document.getElementById(
                "lista-funcionarios"
            );


        if (tabela) {

            tabela.innerHTML = "";

        }


        funcionarios.forEach(
            function (funcionario) {

                if (tabela) {

                    const linha =
                        document.createElement("tr");


                    const status =
                        funcionario.status
                            ? `<span class="status ativo">
                                ● Ativo
                               </span>`
                            : `<span class="status inativo">
                                ● Inativo
                               </span>`;


                    linha.innerHTML = `

                        <td>
                            ${funcionario.id}
                        </td>

                        <td>
                            ${funcionario.nome ?? "-"}
                        </td>

                        <td>
                            ${funcionario.cpf ?? "-"}
                        </td>

                        <td>
                            ${funcionario.cargo ?? "-"}
                        </td>

                        <td>
                            ${funcionario.email ?? "-"}
                        </td>

                        <td>
                            ${funcionario.status
                                ? `<span class="status ativo">
                                    ● Ativo
                                </span>`
                                : `<span class="status inativo">
                                    ● Inativo
                                </span>`
                            }
                        </td>

                        <td>

                            <button
                                onclick="editarFuncionario(${funcionario.id})">

                                Editar

                            </button>

                            <button
                                onclick="excluirFuncionario(${funcionario.id})">

                                Excluir

                            </button>

                        </td>

                    `;

                    tabela.appendChild(linha);

                }

            }
        );


        preencherSelectFuncionarios(
            funcionarios
        );


    } catch (erro) {

        mostrarErro(
            erro,
            "Erro ao carregar funcionários"
        );

    }

}


async function salvarFuncionario(evento) {

    evento.preventDefault();


    const nome =
        document
            .getElementById("funcionario-nome")
            .value
            .trim();


    const cpf =
        document
            .getElementById("funcionario-cpf")
            .value
            .trim();


    const cargo =
        document
            .getElementById("funcionario-cargo")
            .value
            .trim();


    const email =
        document
            .getElementById("funcionario-email")
            .value
            .trim();


    if (!nome) {

        mostrarErro({
            dados: {
                erro: "Validação",
                mensagem:
                    "O nome do funcionário é obrigatório."
            }
        });

        return;
    }


    if (!cpf) {

        mostrarErro({
            dados: {
                erro: "Validação",
                mensagem:
                    "O CPF do funcionário é obrigatório."
            }
        });

        return;
    }


    if (!cargo) {

        mostrarErro({
            dados: {
                erro: "Validação",
                mensagem:
                    "O cargo do funcionário é obrigatório."
            }
        });

        return;
    }


    if (!email) {

        mostrarErro({
            dados: {
                erro: "Validação",
                mensagem:
                    "O email do funcionário é obrigatório."
            }
        });

        return;
    }


    const funcionario = {

        nome: nome,

        cpf: cpf,

        cargo: cargo,

        email: email

    };


    try {

        await requisicao(
            "/funcionarios",
            {
                method: "POST",

                body:
                    JSON.stringify(funcionario)
            }
        );


        mostrarSucesso(
            "Funcionário cadastrado com sucesso!"
        );


        fecharFormularioFuncionario();


        await carregarFuncionarios();


    } catch (erro) {

        mostrarErro(
            erro,
            "Erro ao cadastrar funcionário"
        );

    }

}


function abrirFormularioFuncionario() {

    const formulario =
        document.getElementById(
            "formulario-funcionario"
        );


    formulario.classList.remove("oculto");

}


function fecharFormularioFuncionario() {

    const formulario =
        document.getElementById(
            "formulario-funcionario"
        );


    const form =
        document.getElementById(
            "form-funcionario"
        );


    formulario.classList.add("oculto");

    form.reset();

}


function preencherSelectFuncionarios(
    funcionarios
) {

    const select =
        document.getElementById(
            "movimentacao-funcionario"
        );


    if (!select) {
        return;
    }


    select.innerHTML = `

        <option value="">
            Selecione um funcionário
        </option>

    `;


    funcionarios.forEach(
        function (funcionario) {

            if (!funcionario.status) {
                return;
            }


            const option =
                document.createElement("option");


            option.value =
                funcionario.id;


            option.textContent =
                `${funcionario.id} - ${funcionario.nome}`;


            select.appendChild(option);

        }
    );

}


async function abrirFuncionario(id) {

    try {

        const funcionario =
            await requisicao(
                `/funcionarios/${id}`
            );


        document.getElementById(
            "detalhe-funcionario-id"
        ).textContent =
            funcionario.id;


        document.getElementById(
            "detalhe-funcionario-nome"
        ).textContent =
            funcionario.nome ?? "-";


        document.getElementById(
            "detalhe-funcionario-cpf"
        ).textContent =
            funcionario.cpf ?? "-";


        document.getElementById(
            "detalhe-funcionario-cargo"
        ).textContent =
            funcionario.cargo ?? "-";


        document.getElementById(
            "detalhe-funcionario-email"
        ).textContent =
            funcionario.email ?? "-";


        document.getElementById(
            "detalhe-funcionario-status"
        ).innerHTML =
            funcionario.status
                ? `<span class="status ativo">
                    ● Ativo
                   </span>`
                : `<span class="status inativo">
                    ● Inativo
                   </span>`;


        mostrarTelaFuncionario(
            "detalhes"
        );


    } catch (erro) {

        mostrarErro(
            erro,
            "Erro ao carregar funcionário"
        );

    }

}


async function editarFuncionario(id) {

    try {

        const funcionario =
            await requisicao(
                `/funcionarios/${id}`
            );


        document.getElementById(
            "edicao-funcionario-id"
        ).value =
            funcionario.id;


        document.getElementById(
            "edicao-funcionario-nome"
        ).value =
            funcionario.nome ?? "";


        document.getElementById(
            "edicao-funcionario-cpf"
        ).value =
            funcionario.cpf ?? "";


        document.getElementById(
            "edicao-funcionario-cargo"
        ).value =
            funcionario.cargo ?? "";


        document.getElementById(
            "edicao-funcionario-email"
        ).value =
            funcionario.email ?? "";


        document.getElementById(
            "edicao-funcionario-status"
        ).value =
            String(funcionario.status);


        mostrarTelaFuncionario(
            "edicao"
        );


    } catch (erro) {

        mostrarErro(
            erro,
            "Erro ao carregar funcionário"
        );

    }

}


async function salvarEdicaoFuncionario(
    evento
) {

    evento.preventDefault();


    const id =
        document.getElementById(
            "edicao-funcionario-id"
        ).value;


    const nome =
        document.getElementById(
            "edicao-funcionario-nome"
        ).value
        .trim();


    const cpf =
        document.getElementById(
            "edicao-funcionario-cpf"
        ).value
        .trim();


    const cargo =
        document.getElementById(
            "edicao-funcionario-cargo"
        ).value
        .trim();


    const email =
        document.getElementById(
            "edicao-funcionario-email"
        ).value
        .trim();


    const status =
        document.getElementById(
            "edicao-funcionario-status"
        ).value === "true";


    if (!nome) {

        mostrarErro({
            dados: {
                erro: "Validação",
                mensagem:
                    "O nome do funcionário é obrigatório."
            }
        });

        return;
    }


    if (!cpf) {

        mostrarErro({
            dados: {
                erro: "Validação",
                mensagem:
                    "O CPF do funcionário é obrigatório."
            }
        });

        return;
    }


    if (!cargo) {

        mostrarErro({
            dados: {
                erro: "Validação",
                mensagem:
                    "O cargo do funcionário é obrigatório."
            }
        });

        return;
    }


    if (!email) {

        mostrarErro({
            dados: {
                erro: "Validação",
                mensagem:
                    "O email do funcionário é obrigatório."
            }
        });

        return;
    }


    const dados = {

        nome: nome,

        cpf: cpf,

        cargo: cargo,

        email: email,

        status: status

    };


    try {

        await requisicao(
            `/funcionarios/${id}`,
            {
                method: "PUT",

                body:
                    JSON.stringify(dados)
            }
        );


        mostrarSucesso(
            "Funcionário atualizado com sucesso!"
        );


        await carregarFuncionarios();


        mostrarTelaFuncionario(
            "lista"
        );


    } catch (erro) {

        mostrarErro(
            erro,
            "Erro ao atualizar funcionário"
        );

    }

}


async function excluirFuncionario(id) {

    const confirmar =
    await confirmarAcao(
        "Deseja realmente excluir este funcionário?"
    );

    if (!confirmar) {
        return;
    }



    try {

        await requisicao(
            `/funcionarios/${id}`,
            {
                method: "DELETE"
            }
        );


        mostrarSucesso(
            "Funcionário excluído com sucesso!"
        );


        await carregarFuncionarios();


    } catch (erro) {

        mostrarErro(
            erro,
            "Erro ao excluir funcionário"
        );

    }

}


function mostrarTelaFuncionario(tela) {

    const lista =
        document.getElementById(
            "lista-funcionarios-container"
        );


    const detalhes =
        document.getElementById(
            "detalhes-funcionario"
        );


    const edicao =
        document.getElementById(
            "edicao-funcionario"
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


function voltarListaFuncionarios() {

    mostrarTelaFuncionario(
        "lista"
    );

}
