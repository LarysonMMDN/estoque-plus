package br.com.estoquep.service;

import br.com.estoquep.entity.Produto;
import br.com.estoquep.entity.Categoria;
import br.com.estoquep.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;
    private final CategoriaService categoriaService;

    public ProdutoService(ProdutoRepository produtoRepository, CategoriaService categoriaService) {
        this.produtoRepository = produtoRepository;
        this.categoriaService = categoriaService;
    }

    public Produto cadastrar(Produto produto, Long categoriaId) {
        validarProduto(produto);
        Categoria categoria = categoriaService.buscarPorId(categoriaId);
        produto.setCategoria(categoria);
        return produtoRepository.save(produto);
    }

    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    public Produto buscarPorId(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado com id: " + id));
    }

    public Produto atualizar(Long id, Produto dadosAtualizados) {
        validarProduto(dadosAtualizados);
        Produto produto = buscarPorId(id);
        produto.setNome(dadosAtualizados.getNome());
        produto.setDescricao(dadosAtualizados.getDescricao());
        produto.setPreco(dadosAtualizados.getPreco());
        produto.setEstoqueMinimo(dadosAtualizados.getEstoqueMinimo());
        return produtoRepository.save(produto);
    }

    public void excluir(Long id) {
        Produto produto = buscarPorId(id);
        produtoRepository.delete(produto);
    }

    private void validarProduto(Produto produto) {
        if (produto.getPreco() != null && produto.getPreco().signum() < 0) {
            throw new IllegalArgumentException("Preço não pode ser negativo");
        }
        if (produto.getQuantidadeEstoque() != null && produto.getQuantidadeEstoque() < 0) {
            throw new IllegalArgumentException("Quantidade em estoque não pode ser negativa");
        }
        if (produto.getEstoqueMinimo() != null && produto.getEstoqueMinimo() < 0) {
            throw new IllegalArgumentException("Estoque mínimo não pode ser negativo");
        }
    }
}