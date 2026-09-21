package br.com.estoquep.entity;

import br.com.estoquep.enums.StatusPedidoCompra;

import java.math.BigDecimal;
import java.time.LocalDate;

// Um pedido de compra pertence a um fornecedor.
public class PedidoCompra {
    long id;
    LocalDate dataPedido;
    StatusPedidoCompra status;
    BigDecimal valorTotal;
    String observacao;
    Fornecedor fornecedor;
}
