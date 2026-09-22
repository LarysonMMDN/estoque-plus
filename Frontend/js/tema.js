function inicializarTema() {

    const tema =
        localStorage.getItem("tema") || "dark";

    aplicarTema(tema);

}


function aplicarTema(tema) {

    document.documentElement.setAttribute(
        "data-theme",
        tema
    );

    atualizarBotaoTema(tema);

}


function alternarTema() {

    const temaAtual =
        document.documentElement.getAttribute(
            "data-theme"
        );

    const novoTema =
        temaAtual === "dark"
            ? "light"
            : "dark";


    aplicarTema(novoTema);


    localStorage.setItem(
        "tema",
        novoTema
    );

}


function atualizarBotaoTema(tema) {

    const icone =
        document.getElementById(
            "icone-tema"
        );

    const texto =
        document.getElementById(
            "texto-tema"
        );


    if (!icone || !texto) {
        return;
    }


    if (tema === "dark") {

        icone.textContent = "☀️";

        texto.textContent = "Tema claro";

    } else {

        icone.textContent = "🌙";

        texto.textContent = "Tema escuro";

    }

}


document.addEventListener(
    "DOMContentLoaded",
    inicializarTema
);
