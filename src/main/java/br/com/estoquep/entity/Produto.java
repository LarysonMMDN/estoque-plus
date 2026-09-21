package br.com.estoquep.entity;

import java.math.BigDecimal;

public class Produto {
    long id;
    String nome;
    String descricao;
    BigDecimal preco;
    int quantidadeEstoque;
    int estoqueMinimo;
    Categoria categoria;
}
