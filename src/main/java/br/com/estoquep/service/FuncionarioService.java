package br.com.estoquep.service;

import br.com.estoquep.entity.Funcionario;
import br.com.estoquep.repository.FuncionarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FuncionarioService {

    private final FuncionarioRepository funcionarioRepository;

    public FuncionarioService(FuncionarioRepository funcionarioRepository) {
        this.funcionarioRepository = funcionarioRepository;
    }

    public Funcionario cadastrar(Funcionario funcionario) {
        funcionario.setStatus(true);
        return funcionarioRepository.save(funcionario);
    }

    public List<Funcionario> listarTodos() {
        return funcionarioRepository.findAll();
    }

    public Funcionario buscarPorId(Long id) {
        return funcionarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado com id: " + id));
    }

    public Funcionario atualizar(Long id, Funcionario dadosAtualizados) {
        Funcionario funcionario = buscarPorId(id);
        funcionario.setNome(dadosAtualizados.getNome());
        funcionario.setCargo(dadosAtualizados.getCargo());
        funcionario.setEmail(dadosAtualizados.getEmail());
        return funcionarioRepository.save(funcionario);
    }

    public void excluir(Long id) {
        Funcionario funcionario = buscarPorId(id);
        funcionarioRepository.delete(funcionario);
    }
}