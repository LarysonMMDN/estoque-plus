# Estoque+ (estoquep)

Sistema de controle de estoque desenvolvido para uma ferragista, como trabalho acadêmico do 6º semestre (Senai Fatesg).

O sistema permite gerenciar categorias, produtos, fornecedores e funcionários, além de registrar entradas e saídas de estoque, com controle automático de quantidade e alerta de estoque mínimo.

## Estrutura

```
EstoqueP/
├── Backend/     → API REST (Spring Boot)
└── Frontend/    → Interface web (HTML, CSS, JS)
```

## Tecnologias

- **Backend:** Java 21, Spring Boot, Spring Data JPA, H2 Database, JUnit + Mockito
- **Frontend:** HTML, CSS, JavaScript, Bootstrap

## Funcionalidades principais

- Cadastro de categorias, produtos, fornecedores e funcionários
- Registro de entrada e saída de estoque
- Bloqueio de saídas maiores que o estoque disponível
- Identificação de produtos com estoque abaixo do mínimo
