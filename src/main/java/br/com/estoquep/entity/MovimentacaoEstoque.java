package br.com.estoquep.entity;

import br.com.estoquep.enums.TipoMovimentacao;

import java.time.LocalDateTime;

public class MovimentacaoEstoque {
    long id;
    TipoMovimentacao tipo;
    int quantidade;
    LocalDateTime dataHora;
    Produto produto;
    Funcionario funcionario;
}
