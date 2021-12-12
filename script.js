// const paragrafo = document.querySelector('#funcionamento');
const input = document.querySelector('#texto-tarefa');
const button = document.querySelector('#criar-tarefa');
const listaOrdenada = document.querySelector('#lista-tarefas');
const tarefas = document.getElementsByClassName('tarefas');
const apagaTudo = document.querySelector('#apaga-tudo');
const removerFinalizados = document.querySelector('#remover-finalizados');
const salvarTarefas = document.querySelector('#salvar-tarefas');
const removerSelecionado = document.querySelector('#remover-selecionado');
const up = document.querySelector('#mover-cima');
const down = document.querySelector('#mover-baixo');
const alvo = document.getElementsByClassName('selecionado');

// Adiciona tarefa ao apertar enter! NÃO FOI PEDIDO ISSO, COLOQUEI POR VONTADE PROPIA => 13 = codigo do ENTER
input.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    criaElementos('#lista-tarefas', 'li', ['class', 'tarefas']);
  }
});

// Função que adiciona id ou classe no elemento
function tag(elem, tipo) {
  elem.setAttribute(tipo[0], tipo[1]);
}

window.onload = () => {};

// Função que adiciona o texto na li
function adicionaTexto(elem) {
  const elemento = elem;
  elemento.innerText = input.value;
  input.value = '';
}

function escutador(elem) {
  elem.addEventListener('click', seleciona);
  elem.addEventListener('dblclick', completo);
}

// Função que cria elementos
function criaElementos(paramPai, paramFilho, tipo) {
  const filho = document.createElement(paramFilho);
  const pai = document.querySelector(paramPai);
  pai.appendChild(filho);
  if (tipo !== undefined) {
    tag(filho, tipo);
  }
  adicionaTexto(filho);
  escutador(filho);
}

//  5 =>

// Chama a função que cria a li e atualiza para remover a class selecionado de todos li
button.addEventListener('click', () => {
  criaElementos('#lista-tarefas', 'li', ['class', 'tarefas']);
});

//  7 - 8 =>

// remove selecionado das li
function desseleciona() {
  for (let i = 0; i < tarefas.length; i += 1) {
    tarefas[i].classList.remove('selecionado');
    tarefas[i].style.backgroundColor = '';
  }
}

// seleciona li
function seleciona(e) {
  desseleciona();
  e.target.classList.add('selecionado');
  e.target.style.backgroundColor = 'rgb(128, 128, 128)';
}

// 9 =>
//  https://www.javascripttutorial.net/dom/css/check-if-an-element-contains-a-class/
// coloca class completed apos duplo clique, e remove se já tiver
// tambem coloca e remove o riscado na letra
function completo(e) {
  if (e.target.classList.contains('completed')) {
    e.target.classList.remove('completed');
    e.target.style.textDecoration = '';
  } else {
    e.target.classList.add('completed');
    e.target.style.textDecoration = 'line-through';
  }
}

// 10 =>
// Apaga toda a lista
apagaTudo.addEventListener('click', () => {
  listaOrdenada.innerHTML = '';
});

// 11 =>
// Apaga todos completos da lista
removerFinalizados.addEventListener('click', () => {
  for (let i = 0; i < tarefas.length; i += 1) {
    if (tarefas[i].classList.contains('completed')) {
      tarefas[i].remove();
      i -= 1;
    }
  }
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//  ################## BONUS ##########################
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// 12
// Salva lista no localStorage
salvarTarefas.addEventListener('click', () => {
  localStorage.setItem('backup', listaOrdenada.innerHTML);
});

// Coloca lista salva no localStorage dentro da ol no load
window.onload = () => {
  if (localStorage.getItem('backup')) {
    listaOrdenada.innerHTML += localStorage.getItem('backup');
  }
  // coloca evento seleciona e completo novamente apos criados no load
  for (let i = 0; i < listaOrdenada.children.length; i += 1) {
    listaOrdenada.children[i].addEventListener('click', seleciona);
    listaOrdenada.children[i].addEventListener('dblclick', completo);
  }
};

// 13
// https://developer.mozilla.org/pt-BR/docs/Web/API/Node/insertBefore

// move selecionado para cima
up.addEventListener('click', () => {
  if (alvo[0] === undefined) {
    return;
  }
  // verifica se esta no topo da lista para ele não voltar de baixo
  if (alvo[0] === listaOrdenada.firstChild) {
    return;
  }
  listaOrdenada.insertBefore(alvo[0], alvo[0].previousElementSibling);
});

// move selecionado para baixo
down.addEventListener('click', () => {
  if (alvo[0] === undefined) {
    return;
  }
  const alvoAnterior = alvo[0].nextElementSibling;
  // verifica se ainda existe item na lista abaixo do selecionado
  if (alvoAnterior === null) {
    return;
  }
  listaOrdenada.insertBefore(alvo[0], alvoAnterior.nextElementSibling);
});

// 14
// Remove quem estiver selecionado
removerSelecionado.addEventListener('click', () => {
  alvo[0].remove();
});
