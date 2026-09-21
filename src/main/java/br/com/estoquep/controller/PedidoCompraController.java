package br.com.estoquep.controller;

import br.com.estoquep.entity.PedidoCompra;
import br.com.estoquep.service.PedidoCompraService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos-compra")
public class PedidoCompraController {

    private final PedidoCompraService pedidoCompraService;

    public PedidoCompraController(PedidoCompraService pedidoCompraService) {
        this.pedidoCompraService = pedidoCompraService;
    }

    @PostMapping
    public ResponseEntity<PedidoCompra> cadastrar(@RequestBody PedidoCompra pedido) {
        return ResponseEntity.status(201).body(pedidoCompraService.cadastrar(pedido));
    }

    @GetMapping
    public ResponseEntity<List<PedidoCompra>> listar() {
        return ResponseEntity.ok(pedidoCompraService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoCompra> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(pedidoCompraService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PedidoCompra> atualizar(@PathVariable Long id, @RequestBody PedidoCompra pedido) {
        return ResponseEntity.ok(pedidoCompraService.atualizar(id, pedido));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        pedidoCompraService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}