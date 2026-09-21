package br.com.estoquep.repository;

import br.com.estoquep.entity.PedidoCompra;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PedidoCompraRepository extends JpaRepository<PedidoCompra, Long> {

    List<PedidoCompra> findByFornecedorId(Long fornecedorId);
}