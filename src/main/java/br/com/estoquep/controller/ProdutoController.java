package br.com.estoquep.controller;

import br.com.estoquep.dto.ProdutoRequest;
import br.com.estoquep.entity.Produto;
import br.com.estoquep.entity.Categoria;
import br.com.estoquep.service.ProdutoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @PostMapping
    public ResponseEntity<Produto> cadastrar(@Valid @RequestBody ProdutoRequest request) {
        Produto produto = new Produto();
        produto.setNome(request.getNome());
        produto.setDescricao(request.getDescricao());
        produto.setPreco(request.getPreco());
        produto.setQuantidadeEstoque(request.getQuantidadeEstoque());
        produto.setEstoqueMinimo(request.getEstoqueMinimo());

        Produto salvo = produtoService.cadastrar(produto, request.getCategoriaId());
        return ResponseEntity.status(201).body(salvo);
    }

    @GetMapping
    public ResponseEntity<List<Produto>> listar() {
        return ResponseEntity.ok(produtoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(produtoService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizar(@PathVariable Long id, @Valid @RequestBody ProdutoRequest request) {
        Produto dados = new Produto();
        dados.setNome(request.getNome());
        dados.setDescricao(request.getDescricao());
        dados.setPreco(request.getPreco());
        dados.setEstoqueMinimo(request.getEstoqueMinimo());

        return ResponseEntity.ok(produtoService.atualizar(id, dados));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        produtoService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}