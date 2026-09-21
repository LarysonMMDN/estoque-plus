package br.com.estoquep.repository;

import br.com.estoquep.entity.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {

    Optional<Funcionario> findByCpf(String cpf);

    Optional<Funcionario> findByEmail(String email);
}