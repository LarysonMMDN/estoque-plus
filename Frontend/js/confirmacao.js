function confirmarAcao(mensagem) {

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
                "btn-confirmar-acao"
            );

        const botaoCancelar =
            document.getElementById(
                "btn-cancelar-confirmacao"
            );


        if (
            !modal ||
            !mensagemElemento ||
            !botaoConfirmar ||
            !botaoCancelar
        ) {

            console.error(
                "Modal de confirmação não encontrado."
            );

            resolve(false);

            return;
        }


        mensagemElemento.textContent =
            mensagem;


        modal.classList.remove("oculto");


        function confirmar() {

            finalizar(true);

        }


        function cancelar() {

            finalizar(false);

        }


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
