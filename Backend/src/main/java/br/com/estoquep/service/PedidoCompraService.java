package br.com.estoquep.service;

import br.com.estoquep.entity.PedidoCompra;
import br.com.estoquep.repository.PedidoCompraRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidoCompraService {

    private final PedidoCompraRepository pedidoCompraRepository;

    public PedidoCompraService(PedidoCompraRepository pedidoCompraRepository) {
        this.pedidoCompraRepository = pedidoCompraRepository;
    }

    public PedidoCompra cadastrar(PedidoCompra pedido) {
        return pedidoCompraRepository.save(pedido);
    }

    public List<PedidoCompra> listarTodos() {
        return pedidoCompraRepository.findAll();
    }

    public PedidoCompra buscarPorId(Long id) {
        return pedidoCompraRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido de compra não encontrado com id: " + id));
    }

    public PedidoCompra atualizar(Long id, PedidoCompra dadosAtualizados) {
        PedidoCompra pedido = buscarPorId(id);
        pedido.setStatus(dadosAtualizados.getStatus());
        pedido.setObservacao(dadosAtualizados.getObservacao());
        pedido.setValorTotal(dadosAtualizados.getValorTotal());
        return pedidoCompraRepository.save(pedido);
    }

    public void excluir(Long id) {
        PedidoCompra pedido = buscarPorId(id);
        pedidoCompraRepository.delete(pedido);
    }
}