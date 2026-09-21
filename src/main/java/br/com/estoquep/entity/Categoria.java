package br.com.estoquep.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categoria")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String nome;

    private String descricao;

    private Boolean status;

    private LocalDateTime dataCadastro;

    @OneToMany(mappedBy = "categoria", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Produto> produtos = new ArrayList<>();

    public Categoria(){}

    public Categoria(String nome, String descricao) {
        this.nome = nome;
        this.descricao = descricao;
        this.status = true;
        this.dataCadastro = LocalDateTime.now();
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public LocalDateTime getDataCasdastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDateTime dataCasdastro) {
        this.dataCadastro = dataCasdastro;
    }
}
