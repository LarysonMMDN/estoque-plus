package br.com.estoquep.service;

import br.com.estoquep.entity.Fornecedor;
import br.com.estoquep.repository.FornecedorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FornecedorService {

    private final FornecedorRepository fornecedorRepository;

    public FornecedorService(FornecedorRepository fornecedorRepository) {
        this.fornecedorRepository = fornecedorRepository;
    }

    public Fornecedor cadastrar(Fornecedor fornecedor) {
        return fornecedorRepository.save(fornecedor);
    }

    public List<Fornecedor> listarTodos() {
        return fornecedorRepository.findAll();
    }

    public Fornecedor buscarPorId(Long id) {
        return fornecedorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fornecedor não encontrado com id: " + id));
    }

    public Fornecedor atualizar(Long id, Fornecedor dadosAtualizados) {
        Fornecedor fornecedor = buscarPorId(id);
        fornecedor.setRazaoSocial(dadosAtualizados.getRazaoSocial());
        fornecedor.setNomeFantasia(dadosAtualizados.getNomeFantasia());
        fornecedor.setTelefone(dadosAtualizados.getTelefone());
        fornecedor.setEmail(dadosAtualizados.getEmail());
        return fornecedorRepository.save(fornecedor);
    }

    public void excluir(Long id) {
        Fornecedor fornecedor = buscarPorId(id);
        fornecedorRepository.delete(fornecedor);
    }
}