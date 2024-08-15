const formTodo = document.querySelector("#form-todo");
const inputTarefa = document.querySelector("#input-tarefa");
const formEdit = document.querySelector("#form-edit");
const inputEdit = document.querySelector("#input-edit");
const cancelar = document.querySelector(".cancelar");
const inputPesquisa = document.querySelector("#input-pesquisa");
const limparBtn = document.querySelector("#limpar");
const selectFiltro = document.querySelector("#select-filtro");

let oldValor;

const edit = document.querySelector(".edit");
const check = document.querySelector(".check");
const apagar = document.querySelector(".deletar");

const anotacoes = document.querySelectorAll(".anotacoes");

const notas = document.querySelector("#notas");

/* Funções */

//Função para Adicionar Tarefa
const saveTarefa = (text, done = 0, save = 1) => {
  const div = document.createElement("div");
  div.classList.add("anotacoes");

  const paragrafoAnotacoes = document.createElement("p");
  paragrafoAnotacoes.innerText = text;
  div.appendChild(paragrafoAnotacoes);

  const divButtons = document.createElement("div");
  divButtons.classList.add("buttons-anotacoes");
  div.appendChild(divButtons);

  const check = document.createElement("button");
  check.classList.add("check");
  check.innerHTML = `<i class="fa-solid fa-check check"></i>`;
  divButtons.appendChild(check);

  const edit = document.createElement("button");
  edit.classList.add("edit");
  edit.innerHTML = `<i class="fa-solid fa-pen edit"></i>`;
  divButtons.appendChild(edit);

  const apagar = document.createElement("button");
  apagar.classList.add("deletar");
  apagar.innerHTML = `<i class="fa-solid fa-x deletar"></i>`;
  divButtons.appendChild(apagar);

  //Adicionando a localStorage
  if (done) {
    div.classList.toggle("done");
  }

  if (save) {
    saveAnotacoesLocalStorage({ text, done: 0 });
  }

  notas.appendChild(div);

  inputTarefa.value = "";
  inputTarefa.focus();
};

//Função para Editar Tarefa
const editTarefa = (text) => {
  const anotacoes = document.querySelectorAll(".anotacoes");

  anotacoes.forEach((anotacao) => {
    let nota = anotacao.querySelector("p");

    if (nota.innerText === oldValor) {
      nota.innerText = text;

      editaLocalStorage(oldValor, text)
    }
  });
};

//função para pesquisar tarefa
const pesquisaTarefa = (text) => {
  const anotacoes = document.querySelectorAll(".anotacoes");

  anotacoes.forEach((anotacao) => {
    const nota = anotacao.querySelector("p").innerText.toLowerCase();

    anotacao.style.display = "flex";

    if (!nota.includes(text)) {
      anotacao.style.display = "none";
    }
  });
};

//Função para limpar pesquisa
const limpaPesquisa = () => {
  inputPesquisa.value = "";
  const anotacoes = document.querySelectorAll(".anotacoes");

  anotacoes.forEach((anotacao) => {
    anotacao.style.display = "flex";
  });
};

//Função de filtrar de acordo com o value passdo no evento
const filtroAnotacoes = (value) => {
  const anotacoes = document.querySelectorAll(".anotacoes");

  switch (value) {
    case "todos":
      anotacoes.forEach((anotacao) => (anotacao.style.display = "flex"));

      break;

    case "feitos":
      anotacoes.forEach((anotacao) =>
        anotacao.classList.contains("done")
          ? (anotacao.style.display = "flex")
          : (anotacao.style.display = "none")
      );
      break;

    case "nao-feitos":
      anotacoes.forEach((anotacao) =>
        !anotacao.classList.contains("done")
          ? (anotacao.style.display = "flex")
          : (anotacao.style.display = "none")
      );
      break;

    default:
      break;
  }
};

//Esconde os Formulários
const toggleForm = () => {
  notas.classList.toggle("none");
  formEdit.classList.toggle("none");
  formTodo.classList.toggle("none");
};

/* Eventos */

//Evento de click para cancelar a edição
cancelar.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForm();
  inputEdit.value = "";
});

//Evento de submit no form para adicionar a tarefa
formTodo.addEventListener("submit", (e) => {
  e.preventDefault();

  const tarefa = inputTarefa.value;

  if (tarefa != "") {
    saveTarefa(tarefa);
  }
});

//Evento de clique pegando a posição do mouse para editar, concluir e excluir tarefa
document.addEventListener("click", (e) => {
  const targetElement = e.target;
  const parentElement = targetElement.closest(".anotacoes");
  let nota;

  if (parentElement && parentElement.querySelector("p")) {
    nota = parentElement.querySelector("p").innerText;
  }

  if (targetElement.classList.contains("check")) {
    parentElement.classList.toggle("done");

    atualizaLocalStorage(nota);
  }

  if (targetElement.classList.contains("deletar")) {
    parentElement.remove();

    removeLocalStorage(nota);
  }

  if (targetElement.classList.contains("edit")) {
    toggleForm();

    inputEdit.value = nota;
    oldValor = nota;

    inputEdit.focus();
  }
});

//Evento de submit para edição e envio da edição das tarefas
formEdit.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputvalue = inputEdit.value;

  if (editInputvalue) {
    editTarefa(editInputvalue);
  }

  toggleForm();
});

//Evento  de busca! Para quando digitar um caractere ja buscar o correspondente
inputPesquisa.addEventListener("keyup", (e) => {
  const pesquisa = e.target.value;

  pesquisaTarefa(pesquisa.toLowerCase());
});

//Evento de limpar a pesquisa
limparBtn.addEventListener("click", (e) => {
  e.preventDefault();
  limpaPesquisa();
});

//Evento Select para filtro
selectFiltro.addEventListener("change", (e) => {
  const filtroValue = e.target.value;

  filtroAnotacoes(filtroValue);
});

/* Local Storage */
const pegaAnotacaoLS = () => {
  const anotacoes = JSON.parse(localStorage.getItem("anotacoes")) || [];

  return anotacoes;
};

const carregaAnotacao = () => {
  const anotacoes = pegaAnotacaoLS();

  anotacoes.forEach((anotacao) => {
    saveTarefa(anotacao.text, anotacao.done, 0);
  });
};

const saveAnotacoesLocalStorage = (anotacao) => {
  //pegar todas as anotações da local storage
  const anotacoes = pegaAnotacaoLS();

  //adicionar anotações no array
  anotacoes.push(anotacao);

  localStorage.setItem("anotacoes", JSON.stringify(anotacoes));
};

const removeLocalStorage = (nota) => {
  const anotacoes = pegaAnotacaoLS();

  const filtraAnotacoes = anotacoes.filter(
    (anotacao) => anotacao.text !== nota
  );

  localStorage.setItem("anotacoes", JSON.stringify(filtraAnotacoes));
};

const atualizaLocalStorage = (nota) => {
  const anotacoes = pegaAnotacaoLS();

  anotacoes.map((anotacao) =>
    anotacao.text === nota ? (anotacao.done = !anotacao.done) : null
  );

  localStorage.setItem("anotacoes", JSON.stringify(anotacoes));
};

const editaLocalStorage = (notaVelha, notaNova) => {
  const anotacoes = pegaAnotacaoLS();

  anotacoes.map((anotacao) =>
    anotacao.text === notaVelha ? (anotacao.text = notaNova) : null
  );
  localStorage.setItem("anotacoes", JSON.stringify(anotacoes));
};

carregaAnotacao();
