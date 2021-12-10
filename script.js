const paragrafo = document.querySelector('#funcionamento');
const input = document.querySelector('#texto-tarefa');
const button = document.querySelector('#criar-tarefa');
const listaOrdenada = document.querySelector('#lista-tarefas');

// Função que adiciona id ou classe no elemento
function tag(elem, tipo) {
  elem.setAttribute(tipo[0], tipo[1]);
}

// Função que adiciona o texto na li
function adicionaTexto(elem) {
  elem.innerText = input.value;
  input.value = '';
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
}

/*
  5 =>
*/
button.addEventListener('click', () => {
  criaElementos('#lista-tarefas', 'li');
});
