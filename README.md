# ToDo-Avancado

Este é um aplicativo simples de gerenciamento de tarefas que permite aos usuários adicionar, editar, excluir, pesquisar e filtrar tarefas. As tarefas são armazenadas no `localStorage` para garantir persistência entre as sessões.

---

## **Funcionalidades**
- **Adicionar Tarefas**: Criação de novas tarefas de forma rápida e prática.
- **Editar Tarefas**: Modificação do texto das tarefas existentes.
- **Marcar como Concluído**: Alternar o estado de conclusão das tarefas.
- **Excluir Tarefas**: Remoção permanente das tarefas.
- **Pesquisar Tarefas**: Busca em tempo real com base no texto digitado.
- **Filtrar Tarefas**: Exibição de tarefas com base no status (`todas`, `feitas`, `não feitas`).
- **Integração com Local Storage**: As tarefas são salvas e recuperadas diretamente do `localStorage`.

---

## **Estrutura do Projeto**
### **Elementos HTML Utilizados**
- **Formulários**:
  - Formulário de Tarefas: `#form-todo`
  - Formulário de Edição: `#form-edit`
- **Inputs**:
  - Input de Tarefa: `#input-tarefa`
  - Input de Edição: `#input-edit`
  - Input de Pesquisa: `#input-pesquisa`
- **Botões**:
  - Cancelar Edição: `.cancelar`
  - Limpar Pesquisa: `#limpar`
- **Contêiner de Tarefas**:
  - Lista de Tarefas: `#notas`
  - Filtro de Tarefas: `#select-filtro`

---

## **Principais Funcionalidades**

### 1. **Adicionar Tarefa**
- **Função**: `saveTarefa`
- Cria um novo elemento de tarefa, adiciona ao DOM e salva no `localStorage`.

### 2. **Editar Tarefa**
- **Função**: `editTarefa`
- Modifica o texto de uma tarefa existente no DOM e no `localStorage`.

### 3. **Pesquisar Tarefas**
- **Função**: `pesquisaTarefa`
- Filtra as tarefas exibidas com base no texto digitado em tempo real.

### 4. **Limpar Pesquisa**
- **Função**: `limpaPesquisa`
- Reseta a exibição para mostrar todas as tarefas.

### 5. **Filtrar Tarefas**
- **Função**: `filtroAnotacoes`
- Filtra tarefas com base no status de conclusão (`todas`, `feitas`, `não feitas`).

### 6. **Alternar Conclusão de Tarefas**
- Alterna a classe `done` para tarefas e atualiza o estado no `localStorage`.

### 7. **Excluir Tarefas**
- **Função**: `removeLocalStorage`
- Remove uma tarefa tanto do DOM quanto do `localStorage`.

### 8. **Persistência com Local Storage**
- As tarefas são salvas, atualizadas e excluídas usando o `localStorage`.

---

## **Principais Eventos**
- **Envio de Formulário**: Gerencia a criação e edição de tarefas.
- **Clique nos Botões**: Lida com edição, exclusão e marcação de tarefas como concluídas.
- **Entrada de Pesquisa**: Filtra tarefas enquanto o usuário digita.
- **Botão Limpar Pesquisa**: Reseta o campo de pesquisa e exibe todas as tarefas.
- **Menu Suspenso de Filtro**: Filtra as tarefas com base no status de conclusão.

---

## **Funções de Local Storage**
- `pegaAnotacaoLS`: Recupera tarefas do `localStorage`.
- `saveAnotacoesLocalStorage`: Salva uma nova tarefa no `localStorage`.
- `removeLocalStorage`: Exclui uma tarefa do `localStorage`.
- `atualizaLocalStorage`: Atualiza o estado de conclusão de uma tarefa no `localStorage`.
- `editaLocalStorage`: Atualiza o texto de uma tarefa no `localStorage`.

---

## **Como Usar**
1. Clone o repositório e abra o projeto no navegador.
2. Use o campo de entrada para adicionar tarefas.
3. Edite tarefas clicando no ícone de lápis.
4. Marque tarefas como concluídas clicando no ícone de check.
5. Exclua tarefas clicando no ícone de X.
6. Pesquise tarefas em tempo real utilizando a barra de pesquisa.
7. Filtre tarefas usando o menu suspenso.

---

## **Dependências**
- Font Awesome para ícones.

---

## **Melhorias Futuras**
- Adicionar níveis de prioridade às tarefas.
- Melhorar o design e a responsividade.
- Sincronizar com um banco de dados externo para acesso em múltiplos dispositivos.
