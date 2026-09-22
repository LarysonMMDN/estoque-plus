package br.com.estoquep.service;

import br.com.estoquep.entity.Categoria;
import br.com.estoquep.repository.CategoriaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public Categoria cadastrar(Categoria categoria) {
        categoria.setStatus(true);
        categoria.setDataCadastro(LocalDateTime.now());
        return categoriaRepository.save(categoria);
    }

    public List<Categoria> listarTodas() {
        return categoriaRepository.findAll();
    }

    public Categoria buscarPorId(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada com id: " + id));
    }

    public Categoria atualizar(Long id, Categoria dadosAtualizados) {
        Categoria categoria = buscarPorId(id);
        categoria.setNome(dadosAtualizados.getNome());
        categoria.setDescricao(dadosAtualizados.getDescricao());
        categoria.setStatus(dadosAtualizados.getStatus());
        return categoriaRepository.save(categoria);
    }

    public void desativar(Long id) {
        Categoria categoria = buscarPorId(id);
        categoria.setStatus(false);
        categoriaRepository.save(categoria);
    }
}