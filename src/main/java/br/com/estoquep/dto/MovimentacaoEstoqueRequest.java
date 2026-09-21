package br.com.estoquep.dto;

import br.com.estoquep.enums.TipoMovimentacao;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class MovimentacaoEstoqueRequest {

    @NotNull(message = "O produto é obrigatório")
    private Long produtoId;

    @NotNull(message = "O funcionário é obrigatório")
    private Long funcionarioId;

    @NotNull(message = "O tipo de movimentação é obrigatório")
    private TipoMovimentacao tipo;

    @NotNull(message = "A quantidade é obrigatória")
    @Positive(message = "A quantidade deve ser maior que zero")
    private Integer quantidade;

    public MovimentacaoEstoqueRequest() {
    }

    public Long getProdutoId() {
        return produtoId;
    }

    public void setProdutoId(Long produtoId) {
        this.produtoId = produtoId;
    }

    public Long getFuncionarioId() {
        return funcionarioId;
    }

    public void setFuncionarioId(Long funcionarioId) {
        this.funcionarioId = funcionarioId;
    }

    public TipoMovimentacao getTipo() {
        return tipo;
    }

    public void setTipo(TipoMovimentacao tipo) {
        this.tipo = tipo;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }
}