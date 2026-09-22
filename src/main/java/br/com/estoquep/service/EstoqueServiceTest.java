package br.com.estoquep.service;
//
//import br.com.estoquep.entity.Funcionario;
//import br.com.estoquep.entity.MovimentacaoEstoque;
//import br.com.estoquep.entity.Produto;
//import br.com.estoquep.entity.Categoria;
//import br.com.estoquep.exception.EstoqueInsuficienteException;
//import br.com.estoquep.repository.MovimentacaoEstoqueRepository;
//import br.com.estoquep.repository.ProdutoRepository;
//
//import org.junit.jupiter.api.Test;
//
//import java.math.BigDecimal;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.*;
//
//class EstoqueServiceTest {
//
//    @Test
//    void deveRegistrarEntradaEAumentarEstoque() {
//        // Cria os mocks na mão, igual o exemplo do professor
//        ProdutoRepository produtoRepository = mock(ProdutoRepository.class);
//        MovimentacaoEstoqueRepository movimentacaoRepository = mock(MovimentacaoEstoqueRepository.class);
//        FuncionarioService funcionarioService = mock(FuncionarioService.class);
//
//        // Cria o service passando os mocks no construtor
//        EstoqueService estoqueService = new EstoqueService(produtoRepository, movimentacaoRepository, funcionarioService);
//
//        // Dados de teste
//        Categoria categoria = new Categoria("Parafusos", "Categoria de teste");
//        Produto produto = new Produto("Parafuso 10mm", "Descrição", new BigDecimal("2.50"), 10, 5, categoria);
//        produto.setId(1L);
//        Funcionario funcionario = new Funcionario("João Silva", "12345678900", "Estoquista", "joao@email.com");
//        funcionario.setId(1L);
//
//        // Ensina o mock a responder
//        when(produtoRepository.findById(1L)).thenReturn(Optional.of(produto));
//        when(funcionarioService.buscarPorId(1L)).thenReturn(funcionario);
//        when(produtoRepository.save(any(Produto.class))).thenReturn(produto);
//        when(movimentacaoRepository.save(any(MovimentacaoEstoque.class)))
//                .thenAnswer(inv -> inv.getArgument(0));
//
//        // Executa e confere
//        MovimentacaoEstoque resultado = estoqueService.registrarEntrada(1L, 1L, 5);
//
//        assertEquals(15, produto.getQuantidadeEstoque());
//        assertEquals(5, resultado.getQuantidade());
//    }
//
//    @Test
//    void deveRegistrarSaidaEDiminuirEstoque() {
//        ProdutoRepository produtoRepository = mock(ProdutoRepository.class);
//        MovimentacaoEstoqueRepository movimentacaoRepository = mock(MovimentacaoEstoqueRepository.class);
//        FuncionarioService funcionarioService = mock(FuncionarioService.class);
//        EstoqueService estoqueService = new EstoqueService(produtoRepository, movimentacaoRepository, funcionarioService);
//
//        Categoria categoria = new Categoria("Parafusos", "Categoria de teste");
//        Produto produto = new Produto("Parafuso 10mm", "Descrição", new BigDecimal("2.50"), 10, 5, categoria);
//        produto.setId(1L);
//        Funcionario funcionario = new Funcionario("João Silva", "12345678900", "Estoquista", "joao@email.com");
//        funcionario.setId(1L);
//
//        when(produtoRepository.findById(1L)).thenReturn(Optional.of(produto));
//        when(funcionarioService.buscarPorId(1L)).thenReturn(funcionario);
//        when(produtoRepository.save(any(Produto.class))).thenReturn(produto);
//        when(movimentacaoRepository.save(any(MovimentacaoEstoque.class)))
//                .thenAnswer(inv -> inv.getArgument(0));
//
//        MovimentacaoEstoque resultado = estoqueService.registrarSaida(1L, 1L, 7);
//
//        assertEquals(3, produto.getQuantidadeEstoque());
//        assertEquals(7, resultado.getQuantidade());
//    }
//
//    @Test
//    void deveLancarExcecaoQuandoSaidaMaiorQueEstoque() {
//        ProdutoRepository produtoRepository = mock(ProdutoRepository.class);
//        MovimentacaoEstoqueRepository movimentacaoRepository = mock(MovimentacaoEstoqueRepository.class);
//        FuncionarioService funcionarioService = mock(FuncionarioService.class);
//        EstoqueService estoqueService = new EstoqueService(produtoRepository, movimentacaoRepository, funcionarioService);
//
//        Categoria categoria = new Categoria("Parafusos", "Categoria de teste");
//        Produto produto = new Produto("Parafuso 10mm", "Descrição", new BigDecimal("2.50"), 10, 5, categoria);
//        produto.setId(1L);
//        Funcionario funcionario = new Funcionario("João Silva", "12345678900", "Estoquista", "joao@email.com");
//        funcionario.setId(1L);
//
//        when(produtoRepository.findById(1L)).thenReturn(Optional.of(produto));
//        when(funcionarioService.buscarPorId(1L)).thenReturn(funcionario);
//
//        assertThrows(EstoqueInsuficienteException.class, () ->
//                estoqueService.registrarSaida(1L, 1L, 20)
//        );
//
//        assertEquals(10, produto.getQuantidadeEstoque()); // não mudou
//        verify(produtoRepository, never()).save(any(Produto.class));
//    }
//
//    @Test
//    void deveIdentificarEstoqueAbaixoDoMinimo() {
//        ProdutoRepository produtoRepository = mock(ProdutoRepository.class);
//        MovimentacaoEstoqueRepository movimentacaoRepository = mock(MovimentacaoEstoqueRepository.class);
//        FuncionarioService funcionarioService = mock(FuncionarioService.class);
//        EstoqueService estoqueService = new EstoqueService(produtoRepository, movimentacaoRepository, funcionarioService);
//
//        Categoria categoria = new Categoria("Parafusos", "Categoria de teste");
//        Produto produto = new Produto("Parafuso 10mm", "Descrição", new BigDecimal("2.50"), 3, 5, categoria);
//        produto.setId(1L);
//
//        when(produtoRepository.findById(1L)).thenReturn(Optional.of(produto));
//
//        boolean resultado = estoqueService.estoqueAbaixoDoMinimo(1L);
//
//        assertTrue(resultado);
//    }
//
//    @Test
//    void deveVerificarQueProdutoEMovimentacaoForamSalvosNaEntrada() {
//        ProdutoRepository produtoRepository = mock(ProdutoRepository.class);
//        MovimentacaoEstoqueRepository movimentacaoRepository = mock(MovimentacaoEstoqueRepository.class);
//        FuncionarioService funcionarioService = mock(FuncionarioService.class);
//        EstoqueService estoqueService = new EstoqueService(produtoRepository, movimentacaoRepository, funcionarioService);
//
//        Categoria categoria = new Categoria("Parafusos", "Categoria de teste");
//        Produto produto = new Produto("Parafuso 10mm", "Descrição", new BigDecimal("2.50"), 10, 5, categoria);
//        produto.setId(1L);
//        Funcionario funcionario = new Funcionario("João Silva", "12345678900", "Estoquista", "joao@email.com");
//        funcionario.setId(1L);
//
//        when(produtoRepository.findById(1L)).thenReturn(Optional.of(produto));
//        when(funcionarioService.buscarPorId(1L)).thenReturn(funcionario);
//        when(produtoRepository.save(any(Produto.class))).thenReturn(produto);
//        when(movimentacaoRepository.save(any(MovimentacaoEstoque.class)))
//                .thenAnswer(inv -> inv.getArgument(0));
//
//        estoqueService.registrarEntrada(1L, 1L, 5);
//
//        verify(produtoRepository, times(1)).save(produto);
//        verify(movimentacaoRepository, times(1)).save(any(MovimentacaoEstoque.class));
//    }
//}