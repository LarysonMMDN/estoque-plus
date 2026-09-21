package br.com.estoquep.controller;

import br.com.estoquep.dto.MovimentacaoEstoqueRequest;
import br.com.estoquep.entity.MovimentacaoEstoque;
import br.com.estoquep.service.EstoqueService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/movimentacoes")
public class MovimentacaoEstoqueController {

    private final EstoqueService estoqueService;

    public MovimentacaoEstoqueController(EstoqueService estoqueService) {
        this.estoqueService = estoqueService;
    }

    @PostMapping("/entrada")
    public ResponseEntity<MovimentacaoEstoque> registrarEntrada(@Valid @RequestBody MovimentacaoEstoqueRequest request) {
        MovimentacaoEstoque movimentacao = estoqueService.registrarEntrada(
                request.getProdutoId(), request.getFuncionarioId(), request.getQuantidade());
        return ResponseEntity.status(201).body(movimentacao);
    }

    @PostMapping("/saida")
    public ResponseEntity<MovimentacaoEstoque> registrarSaida(@Valid @RequestBody MovimentacaoEstoqueRequest request) {
        MovimentacaoEstoque movimentacao = estoqueService.registrarSaida(
                request.getProdutoId(), request.getFuncionarioId(), request.getQuantidade());
        return ResponseEntity.status(201).body(movimentacao);
    }

    @GetMapping("/estoque-baixo/{produtoId}")
    public ResponseEntity<Boolean> verificarEstoqueBaixo(@PathVariable Long produtoId) {
        return ResponseEntity.ok(estoqueService.estoqueAbaixoDoMinimo(produtoId));
    }
}