function inicializarEstoque() {

const formulario =
    document.getElementById(
        "form-movimentacao"
    );


if (!formulario) {
    return;
}


formulario.addEventListener(
    "submit",
    registrarMovimentacao
);


carregarProdutosMovimentacao();

carregarFuncionariosMovimentacao();

carregarProdutosConsulta();


}

async function carregarProdutosMovimentacao() {

try {

    const produtos =
        await requisicao(
            "/produtos"
        );


    const select =
        document.getElementById(
            "movimentacao-produto"
        );


    if (!select) {
        return;
    }


    select.innerHTML = `
        <option value="">
            Selecione um produto
        </option>
    `;


    produtos.forEach(
        function (produto) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                produto.id;


            option.textContent =
                `${produto.id} - ${produto.nome}`;


            select.appendChild(
                option
            );

        }
    );


} catch (erro) {

    mostrarErro(
        erro,
        "Erro ao carregar produtos"
    );

}


}

async function carregarFuncionariosMovimentacao() {

try {

    const funcionarios =
        await requisicao(
            "/funcionarios"
        );


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
                document.createElement(
                    "option"
                );


            option.value =
                funcionario.id;


            option.textContent =
                `${funcionario.id} - ${funcionario.nome}`;


            select.appendChild(
                option
            );

        }
    );


} catch (erro) {

    mostrarErro(
        erro,
        "Erro ao carregar funcionários"
    );

}


}

async function carregarProdutosConsulta() {

try {

    const produtos =
        await requisicao(
            "/produtos"
        );


    const select =
        document.getElementById(
            "produto-consulta"
        );


    if (!select) {
        return;
    }


    select.innerHTML = `
        <option value="">
            Selecione um produto
        </option>
    `;


    produtos.forEach(
        function (produto) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                produto.id;


            option.textContent =
                `${produto.id} - ${produto.nome}`;


            select.appendChild(
                option
            );

        }
    );


} catch (erro) {

    mostrarErro(
        erro,
        "Erro ao carregar produtos para consulta"
    );

}


}

async function registrarMovimentacao(evento) {

evento.preventDefault();


const produtoId =
    Number(
        document.getElementById(
            "movimentacao-produto"
        ).value
    );


const funcionarioId =
    Number(
        document.getElementById(
            "movimentacao-funcionario"
        ).value
    );


const quantidade =
    Number(
        document.getElementById(
            "movimentacao-quantidade"
        ).value
    );


const tipo =
    document.getElementById(
        "movimentacao-tipo"
    ).value;


console.log(
    "Movimentação:",
    {
        produtoId,
        funcionarioId,
        quantidade,
        tipo
    }
);


if (!produtoId) {

    mostrarErro({

        dados: {

            erro: "Validação",

            mensagem:
                "Selecione um produto."

        }

    });

    return;

}


if (!funcionarioId) {

    mostrarErro({

        dados: {

            erro: "Validação",

            mensagem:
                "Selecione um funcionário."

        }

    });

    return;

}


if (
    !Number.isInteger(quantidade) ||
    quantidade <= 0
) {

    mostrarErro({

        dados: {

            erro: "Validação",

            mensagem:
                "Informe uma quantidade válida."

        }

    });

    return;

}


if (!tipo) {

    mostrarErro({

        dados: {

            erro: "Validação",

            mensagem:
                "Selecione o tipo de movimentação."

        }

    });

    return;

}


if (
    tipo !== "ENTRADA" &&
    tipo !== "SAIDA"
) {

    mostrarErro({

        dados: {

            erro: "Validação",

            mensagem:
                "Tipo de movimentação inválido."

        }

    });

    return;

}


const dados = {

    produtoId:
        produtoId,

    funcionarioId:
        funcionarioId,

    quantidade:
        quantidade,

    tipo:
        tipo

};


console.log(
    "Dados enviados:",
    dados
);


const endpoint =
    tipo === "ENTRADA"
        ? "/movimentacoes/entrada"
        : "/movimentacoes/saida";


try {

    await requisicao(
        endpoint,
        {
            method: "POST",

            body:
                JSON.stringify(
                    dados
                )
        }
    );


    mostrarSucesso(
        tipo === "ENTRADA"
            ? "Entrada registrada com sucesso!"
            : "Saída registrada com sucesso!"
    );


    document
        .getElementById(
            "form-movimentacao"
        )
        .reset();


    await carregarProdutosMovimentacao();

    await carregarProdutosConsulta();


} catch (erro) {

    mostrarErro(
        erro,
        tipo === "ENTRADA"
            ? "Erro ao registrar entrada"
            : "Erro ao registrar saída"
    );

}


}

async function verificarEstoqueBaixo() {

const produtoId =
    document.getElementById(
        "produto-consulta"
    ).value;


if (!produtoId) {

    mostrarErro({

        dados: {

            erro: "Validação",

            mensagem:
                "Selecione um produto."

        }

    });

    return;

}


try {

    const resultado =
        await requisicao(
            `/movimentacoes/estoque-baixo/${produtoId}`
        );


    const elemento =
        document.getElementById(
            "resultado-estoque"
        );


    if (resultado === true) {

        elemento.textContent =
            "⚠️ O estoque deste produto está abaixo do mínimo.";

    } else {

        elemento.textContent =
            "✓ O estoque deste produto está adequado.";

    }


} catch (erro) {

    mostrarErro(
        erro,
        "Erro ao consultar estoque"
    );

}


}