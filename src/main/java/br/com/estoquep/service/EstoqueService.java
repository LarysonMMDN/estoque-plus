package br.com.estoquep.service;

import br.com.estoquep.entity.Produto;
import br.com.estoquep.entity.Funcionario;
import br.com.estoquep.entity.MovimentacaoEstoque;
import br.com.estoquep.enums.TipoMovimentacao;
import br.com.estoquep.exception.EstoqueInsuficienteException;
import br.com.estoquep.exception.RecursoNaoEncontradoException;
import br.com.estoquep.repository.ProdutoRepository;
import br.com.estoquep.repository.MovimentacaoEstoqueRepository;
import org.springframework.stereotype.Service;

@Service
public class EstoqueService {

    private final ProdutoRepository produtoRepository;
    private final MovimentacaoEstoqueRepository movimentacaoRepository;
    private final FuncionarioService funcionarioService;

    public EstoqueService(ProdutoRepository produtoRepository,
                          MovimentacaoEstoqueRepository movimentacaoRepository,
                          FuncionarioService funcionarioService) {
        this.produtoRepository = produtoRepository;
        this.movimentacaoRepository = movimentacaoRepository;
        this.funcionarioService = funcionarioService;
    }

    public MovimentacaoEstoque registrarEntrada(Long produtoId, Long funcionarioId, Integer quantidade) {
        validarQuantidade(quantidade);

        Produto produto = buscarProduto(produtoId);
        Funcionario funcionario = funcionarioService.buscarPorId(funcionarioId);

        produto.setQuantidadeEstoque(produto.getQuantidadeEstoque() + quantidade);
        produtoRepository.save(produto);

        MovimentacaoEstoque movimentacao =
                new MovimentacaoEstoque(TipoMovimentacao.ENTRADA, quantidade, produto, funcionario);

        return movimentacaoRepository.save(movimentacao);
    }

    public MovimentacaoEstoque registrarSaida(Long produtoId, Long funcionarioId, Integer quantidade) {
        validarQuantidade(quantidade);

        Produto produto = buscarProduto(produtoId);
        Funcionario funcionario = funcionarioService.buscarPorId(funcionarioId);

        if (quantidade > produto.getQuantidadeEstoque()) {
            throw new EstoqueInsuficienteException(
                    "Estoque insuficiente. Disponível: " + produto.getQuantidadeEstoque() + ", solicitado: " + quantidade
            );
        }

        produto.setQuantidadeEstoque(produto.getQuantidadeEstoque() - quantidade);
        produtoRepository.save(produto);

        MovimentacaoEstoque movimentacao =
                new MovimentacaoEstoque(TipoMovimentacao.SAIDA, quantidade, produto, funcionario);

        return movimentacaoRepository.save(movimentacao);
    }

    public boolean estoqueAbaixoDoMinimo(Long produtoId) {
        Produto produto = buscarProduto(produtoId);
        return produto.getQuantidadeEstoque() < produto.getEstoqueMinimo();
    }

    private Produto buscarProduto(Long produtoId) {
        return produtoRepository.findById(produtoId)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Produto não encontrado com id: " + produtoId));
    }

    private void validarQuantidade(Integer quantidade) {
        if (quantidade == null || quantidade <= 0) {
            throw new IllegalArgumentException("Quantidade deve ser maior que zero");
        }
    }
}