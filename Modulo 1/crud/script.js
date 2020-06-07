// Variável responsavel pelos nomes do vetor
var globalNames = ['Um', 'Dois', 'Três', 'Quatro'];
var inputName = null;

window.addEventListener('load', function() {
  // Define o campo responsavel por digitar os nomes.
  inputName = document.querySelector('#inputName');

  // responsavel por não deixar a página recarregar
  preventFormSubmit();
  activateInput();
});

function preventFormSubmit() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  var form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);
}

function activateInput() {
  inputName.focus();
}