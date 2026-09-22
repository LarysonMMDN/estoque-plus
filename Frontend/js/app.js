async function abrirPagina(pagina) {

    try {

        const resposta =
            await fetch(`pages/${pagina}.html`);

        if (!resposta.ok) {

            throw new Error(
                `Não foi possível carregar a página ${pagina}.`
            );

        }

        const html =
            await resposta.text();

        document.getElementById("conteudo").innerHTML =
            html;

        inicializarPagina(pagina);

    } catch (erro) {

        mostrarErro(erro);

    }

}


function inicializarPagina(pagina) {

    switch (pagina) {

        case "dashboard":
            carregarDashboard();
            break;

        case "produtos":
            inicializarProdutos();
            break;

        case "categorias":
            inicializarCategorias();
            break;

        case "fornecedores":
            inicializarFornecedores();
            break;

        case "funcionarios":
            inicializarFuncionarios();
            break;

        case "estoque":
            inicializarEstoque();
            break;

    }

}


async function carregarDashboard() {

    try {

        const produtos =
            await requisicao("/produtos");

        const categorias =
            await requisicao("/categorias");

        const fornecedores =
            await requisicao("/fornecedores");

        const funcionarios =
            await requisicao("/funcionarios");


        document.getElementById(
            "total-produtos"
        ).textContent =
            produtos.length;


        document.getElementById(
            "total-categorias"
        ).textContent =
            categorias.length;


        document.getElementById(
            "total-fornecedores"
        ).textContent =
            fornecedores.length;


        document.getElementById(
            "total-funcionarios"
        ).textContent =
            funcionarios.length;

    } catch (erro) {

        mostrarErro(erro);

    }

}


document.addEventListener(
    "DOMContentLoaded",
    function () {

        abrirPagina("dashboard");

    }
);
